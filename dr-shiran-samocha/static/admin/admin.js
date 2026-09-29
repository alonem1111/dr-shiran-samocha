const API = '/.netlify/functions'
const TOKEN_KEY = 'dr-shiran-admin-token'
const EMAIL_KEY = 'dr-shiran-admin-email'

const DAY_NAMES = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
const MONTHS_HE = [
  'ינואר',
  'פברואר',
  'מרץ',
  'אפריל',
  'מאי',
  'יוני',
  'יולי',
  'אוגוסט',
  'ספטמבר',
  'אוקטובר',
  'נובמבר',
  'דצמבר',
]

let token = localStorage.getItem(TOKEN_KEY) || ''
let email = localStorage.getItem(EMAIL_KEY) || ''
let bookings = []
let weekly = {}
let month = ''
let monthOverride = { closedDates: [], dayHours: {} }

function $(sel) {
  return document.querySelector(sel)
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

async function api(path, options = {}) {
  const res = await fetch(`${API}/${path}`, {
    ...options,
    headers: { ...authHeaders(), ...(options.headers || {}) },
  })
  const data = await res.json().catch(() => ({}))
  if (res.status === 401) {
    logout(false)
    throw new Error('יש להתחבר מחדש')
  }
  if (!res.ok) throw new Error(data.error || 'שגיאה')
  return data
}

function showLogin() {
  $('#login-view').hidden = false
  $('#app-view').hidden = true
}

function showApp() {
  $('#login-view').hidden = true
  $('#app-view').hidden = false
  $('#admin-email-label').textContent = email
}

function logout(clear = true) {
  if (clear) {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(EMAIL_KEY)
  }
  token = ''
  email = ''
  showLogin()
}

$('#login-btn').addEventListener('click', async () => {
  const err = $('#login-error')
  err.hidden = true
  try {
    const res = await fetch(`${API}/admin-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: $('#login-email').value.trim(),
        password: $('#login-password').value,
      }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'התחברות נכשלה')
    token = data.token
    email = data.email
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(EMAIL_KEY, email)
    showApp()
    await refreshAll()
  } catch (e) {
    err.hidden = false
    err.textContent = e.message
  }
})

$('#logout-btn').addEventListener('click', () => logout(true))

document.querySelectorAll('.tabs__btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tabs__btn').forEach((b) => b.classList.remove('is-active'))
    btn.classList.add('is-active')
    const tab = btn.dataset.tab
    document.querySelectorAll('.tab-panel').forEach((p) => {
      const on = p.dataset.panel === tab
      p.hidden = !on
      p.classList.toggle('is-active', on)
    })
  })
})

function statusBadge(status) {
  const map = {
    pending: ['ממתין', 'badge--pending'],
    approved: ['מאושר', 'badge--approved'],
    rejected: ['נדחה', 'badge--rejected'],
  }
  const [label, cls] = map[status] || [status, '']
  return `<span class="badge ${cls}">${label}</span>`
}

function formatDate(date) {
  const [y, m, d] = date.split('-')
  return `${d}.${m}.${y}`
}

function renderBooking(b, withActions) {
  return `
    <article class="item" data-id="${b.id}">
      <div class="item__top">
        <div class="item__name">${b.name}</div>
        ${statusBadge(b.status)}
      </div>
      <div class="item__meta">
        <div><strong>${b.serviceTitle}</strong> · ${formatDate(b.date)} · ${b.start}–${b.end} (${b.durationMin} דק׳)</div>
        <div>${b.phone ? `📞 ${b.phone}` : ''} ${b.email ? `· ✉️ ${b.email}` : ''}</div>
      </div>
      ${
        withActions && b.status === 'pending'
          ? `<div class="item__actions">
              <button type="button" class="btn btn-sm" data-approve="${b.id}">אישור</button>
              <button type="button" class="btn btn-sm btn-danger" data-reject="${b.id}">דחייה</button>
            </div>`
          : ''
      }
    </article>`
}

function bindActions(root) {
  root.querySelectorAll('[data-approve]').forEach((btn) => {
    btn.addEventListener('click', () => decide(btn.dataset.approve, 'approve'))
  })
  root.querySelectorAll('[data-reject]').forEach((btn) => {
    btn.addEventListener('click', () => decide(btn.dataset.reject, 'reject'))
  })
}

async function decide(id, action) {
  if (!confirm(action === 'approve' ? 'לאשר את התור?' : 'לדחות את התור?')) return
  await api('admin-bookings', {
    method: 'POST',
    body: JSON.stringify({ id, action }),
  })
  await loadBookings()
}

async function loadBookings() {
  const data = await api('admin-bookings')
  bookings = data.bookings || []
  const pending = bookings.filter((b) => b.status === 'pending')
  const pendingRoot = $('#pending-list')
  const allRoot = $('#all-list')

  pendingRoot.innerHTML = pending.length
    ? pending.map((b) => renderBooking(b, true)).join('')
    : '<div class="empty">אין בקשות ממתינות כרגע</div>'
  allRoot.innerHTML = bookings.length
    ? bookings.map((b) => renderBooking(b, true)).join('')
    : '<div class="empty">עדיין אין תורים</div>'

  bindActions(pendingRoot)
  bindActions(allRoot)
}

function monthLabel(ym) {
  const [y, m] = ym.split('-').map(Number)
  return `${MONTHS_HE[m - 1]} ${y}`
}

function shiftMonth(ym, delta) {
  const [y, m] = ym.split('-').map(Number)
  const d = new Date(y, m - 1 + delta, 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function renderWeekly() {
  const root = $('#weekly-editor')
  root.innerHTML = DAY_NAMES.map((name, i) => {
    const key = String(i)
    const val = weekly[key]
    const open = !!val
    return `
      <div class="weekly__row" data-day="${key}">
        <strong>${name}</strong>
        <input type="time" data-start ${open ? '' : 'disabled'} value="${open ? val.start : '09:00'}" />
        <input type="time" data-end ${open ? '' : 'disabled'} value="${open ? val.end : '18:00'}" />
        <label class="check"><input type="checkbox" data-open ${open ? 'checked' : ''}/> פתוח</label>
      </div>`
  }).join('')

  root.querySelectorAll('.weekly__row').forEach((row) => {
    const box = row.querySelector('[data-open]')
    const start = row.querySelector('[data-start]')
    const end = row.querySelector('[data-end]')
    box.addEventListener('change', () => {
      start.disabled = !box.checked
      end.disabled = !box.checked
    })
  })
}

function collectWeekly() {
  const out = {}
  $('#weekly-editor').querySelectorAll('.weekly__row').forEach((row) => {
    const day = row.dataset.day
    const open = row.querySelector('[data-open]').checked
    out[day] = open
      ? {
          start: row.querySelector('[data-start]').value,
          end: row.querySelector('[data-end]').value,
        }
      : null
  })
  return out
}

function datesInMonth(ym) {
  const [y, m] = ym.split('-').map(Number)
  const n = new Date(y, m, 0).getDate()
  const out = []
  for (let d = 1; d <= n; d++) out.push(`${ym}-${String(d).padStart(2, '0')}`)
  return out
}

function renderMonthEditor() {
  $('#admin-month-label').textContent = monthLabel(month)
  const closed = new Set(monthOverride.closedDates || [])
  const dayHours = monthOverride.dayHours || {}
  const root = $('#month-editor')
  root.innerHTML = datesInMonth(month)
    .map((date) => {
      const custom = dayHours[date]
      const isClosed = closed.has(date)
      const [y, m, d] = date.split('-')
      const wd = DAY_NAMES[new Date(Number(y), Number(m) - 1, Number(d)).getDay()]
      return `
        <div class="month-day" data-date="${date}">
          <strong>${d}.${m} · ${wd}</strong>
          <label class="check"><input type="checkbox" data-closed ${isClosed ? 'checked' : ''}/> סגור</label>
          <input type="time" data-start value="${custom?.start || ''}" placeholder="התחלה" ${isClosed ? 'disabled' : ''} />
          <input type="time" data-end value="${custom?.end || ''}" placeholder="סיום" ${isClosed ? 'disabled' : ''} />
        </div>`
    })
    .join('')

  root.querySelectorAll('.month-day').forEach((row) => {
    const closedBox = row.querySelector('[data-closed]')
    closedBox.addEventListener('change', () => {
      row.querySelector('[data-start]').disabled = closedBox.checked
      row.querySelector('[data-end]').disabled = closedBox.checked
    })
  })
}

function collectMonthOverride() {
  const closedDates = []
  const dayHours = {}
  $('#month-editor').querySelectorAll('.month-day').forEach((row) => {
    const date = row.dataset.date
    if (row.querySelector('[data-closed]').checked) {
      closedDates.push(date)
      return
    }
    const start = row.querySelector('[data-start]').value
    const end = row.querySelector('[data-end]').value
    if (start && end) dayHours[date] = { start, end }
  })
  return { closedDates, dayHours }
}

async function loadSchedule() {
  if (!month) {
    const now = new Date()
    month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  }
  const data = await api(`admin-schedule?month=${month}`)
  weekly = data.weekly || {}
  monthOverride = data.monthOverride || { closedDates: [], dayHours: {} }
  renderWeekly()
  renderMonthEditor()
}

$('#save-weekly').addEventListener('click', async () => {
  await api('admin-schedule', {
    method: 'PUT',
    body: JSON.stringify({ weekly: collectWeekly() }),
  })
  const ok = $('#weekly-ok')
  ok.hidden = false
  setTimeout(() => {
    ok.hidden = true
  }, 2000)
  await loadSchedule()
})

$('#save-month').addEventListener('click', async () => {
  await api('admin-schedule', {
    method: 'PUT',
    body: JSON.stringify({ month, monthOverride: collectMonthOverride() }),
  })
  const ok = $('#month-ok')
  ok.hidden = false
  setTimeout(() => {
    ok.hidden = true
  }, 2000)
  await loadSchedule()
})

$('#admin-month-prev').addEventListener('click', async () => {
  month = shiftMonth(month, -1)
  await loadSchedule()
})
$('#admin-month-next').addEventListener('click', async () => {
  month = shiftMonth(month, 1)
  await loadSchedule()
})

async function refreshAll() {
  await Promise.all([loadBookings(), loadSchedule()])
}

if (token && email) {
  showApp()
  refreshAll().catch(() => logout(true))
} else {
  showLogin()
}
