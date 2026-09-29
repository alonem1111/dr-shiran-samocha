const API = '/.netlify/functions'

const state = {
  step: 1,
  identity: 'phone',
  name: '',
  phone: '',
  email: '',
  services: [],
  service: null,
  month: '',
  daysWithSlots: [],
  selectedDate: '',
  slots: [],
  selectedStart: '',
}

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

const WEEKDAYS_HE = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳']

function $(sel) {
  return document.querySelector(sel)
}

function showError(id, msg) {
  const el = $(id)
  if (!msg) {
    el.hidden = true
    el.textContent = ''
    return
  }
  el.hidden = false
  el.textContent = msg
}

function goStep(n) {
  state.step = n
  document.querySelectorAll('.panel').forEach((p) => {
    const step = p.dataset.step
    const active = String(step) === String(n)
    p.hidden = !active
    p.classList.toggle('is-active', active)
  })
  document.querySelectorAll('[data-step-btn]').forEach((btn) => {
    const s = Number(btn.dataset.stepBtn)
    btn.classList.toggle('is-active', s === n)
    btn.disabled = s > n && !(n === 'done')
    if (n === 'done') btn.disabled = true
  })
  if (n !== 'done') {
    document.querySelectorAll('[data-step-btn]').forEach((btn) => {
      const s = Number(btn.dataset.stepBtn)
      btn.disabled = s > n
    })
  }
}

async function loadServices() {
  const res = await fetch(`${API}/booking-services`)
  if (!res.ok) throw new Error('services')
  const data = await res.json()
  state.services = data.services || []
  const root = $('#services')
  root.innerHTML = state.services
    .map(
      (s) => `
    <button type="button" class="service" data-id="${s.id}">
      <div class="service__top">
        <span class="service__title">${s.title}</span>
        <span class="service__badge ${s.durationMin === 60 ? 'service__badge--long' : ''}">${s.durationMin} דק׳</span>
      </div>
      <p class="service__desc">${s.description || ''}</p>
    </button>`,
    )
    .join('')

  root.querySelectorAll('.service').forEach((btn) => {
    btn.addEventListener('click', async () => {
      state.service = state.services.find((s) => s.id === btn.dataset.id)
      root.querySelectorAll('.service').forEach((b) => b.classList.remove('is-selected'))
      btn.classList.add('is-selected')
      showError('#step2-error', '')
      const now = new Date()
      state.month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
      state.selectedDate = ''
      state.selectedStart = ''
      $('#selected-service-label').textContent =
        `${state.service.title} · משבצת של ${state.service.durationMin} דקות`
      goStep(3)
      await loadMonth()
    })
  })
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

async function loadMonth() {
  $('#month-label').textContent = monthLabel(state.month)
  $('#calendar').innerHTML = '<p class="panel__sub">טוען ימים פנויים...</p>'
  $('#slots-wrap').hidden = true
  state.selectedDate = ''
  state.selectedStart = ''
  $('#submit-booking').disabled = true

  const res = await fetch(
    `${API}/booking-slots?serviceId=${encodeURIComponent(state.service.id)}&month=${state.month}`,
  )
  if (!res.ok) {
    $('#calendar').innerHTML = '<p class="panel__error">לא ניתן לטעון את היומן כרגע.</p>'
    return
  }
  const data = await res.json()
  state.daysWithSlots = data.days || []
  renderCalendar()
}

function renderCalendar() {
  const [y, m] = state.month.split('-').map(Number)
  const first = new Date(y, m - 1, 1)
  const startPad = first.getDay()
  const daysInMonth = new Date(y, m, 0).getDate()
  const available = new Set(state.daysWithSlots.map((d) => d.date))

  let html = WEEKDAYS_HE.map((d) => `<div class="cal-head">${d}</div>`).join('')
  for (let i = 0; i < startPad; i++) html += `<div></div>`

  for (let day = 1; day <= daysInMonth; day++) {
    const date = `${state.month}-${String(day).padStart(2, '0')}`
    const ok = available.has(date)
    html += `<button type="button" class="cal-day ${ok ? 'is-available' : ''} ${
      state.selectedDate === date ? 'is-selected' : ''
    }" data-date="${date}" ${ok ? '' : 'disabled'}>${day}</button>`
  }

  const root = $('#calendar')
  root.innerHTML = html
  root.querySelectorAll('.cal-day.is-available').forEach((btn) => {
    btn.addEventListener('click', () => selectDate(btn.dataset.date))
  })
}

async function selectDate(date) {
  state.selectedDate = date
  state.selectedStart = ''
  $('#submit-booking').disabled = true
  renderCalendar()
  $('#slots-wrap').hidden = false
  $('#slots-date-label').textContent = formatDateHe(date)
  $('#slots-duration-note').textContent =
    state.service.durationMin === 60
      ? 'תור ייעוץ / ארוך — נחסמות שתי משבצות של 30 דקות ברצף'
      : 'משבצות של 30 דקות'
  $('#slots').innerHTML = '<p class="panel__sub">טוען שעות...</p>'

  const res = await fetch(
    `${API}/booking-slots?serviceId=${encodeURIComponent(state.service.id)}&date=${date}`,
  )
  if (!res.ok) {
    $('#slots').innerHTML = '<p class="panel__error">שגיאה בטעינת השעות</p>'
    return
  }
  const data = await res.json()
  state.slots = data.slots || []
  if (!state.slots.length) {
    $('#slots').innerHTML = '<p class="panel__sub">אין שעות פנויות ביום זה</p>'
    return
  }
  $('#slots').innerHTML = state.slots
    .map((s) => `<button type="button" class="slot" data-start="${s}">${s}</button>`)
    .join('')
  $('#slots').querySelectorAll('.slot').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.selectedStart = btn.dataset.start
      $('#slots').querySelectorAll('.slot').forEach((b) => b.classList.remove('is-selected'))
      btn.classList.add('is-selected')
      $('#submit-booking').disabled = false
      showError('#step3-error', '')
    })
  })
}

function formatDateHe(date) {
  const [y, m, d] = date.split('-').map(Number)
  return `${d}.${m}.${y}`
}

function validateStep1() {
  const name = $('#name').value.trim()
  if (name.length < 2) return 'נא להזין שם מלא'
  if (state.identity === 'phone') {
    const phone = $('#phone').value.trim()
    const digits = phone.replace(/\D/g, '')
    if (!(digits.length === 10 && digits.startsWith('05')) && !(digits.length === 12 && digits.startsWith('9725'))) {
      return 'נא להזין מספר נייד תקין'
    }
  } else {
    const email = $('#email').value.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'נא להזין אימייל תקין'
  }
  return ''
}

document.querySelectorAll('[data-identity]').forEach((btn) => {
  btn.addEventListener('click', () => {
    state.identity = btn.dataset.identity
    document.querySelectorAll('[data-identity]').forEach((b) => {
      const on = b === btn
      b.classList.toggle('is-active', on)
      b.setAttribute('aria-selected', on ? 'true' : 'false')
    })
    $('#phone-field').hidden = state.identity !== 'phone'
    $('#email-field').hidden = state.identity !== 'email'
    showError('#step1-error', '')
  })
})

$('#to-step-2').addEventListener('click', async () => {
  const err = validateStep1()
  if (err) return showError('#step1-error', err)
  state.name = $('#name').value.trim()
  state.phone = $('#phone').value.trim()
  state.email = $('#email').value.trim()
  showError('#step1-error', '')
  goStep(2)
  if (!state.services.length) {
    try {
      await loadServices()
    } catch {
      showError('#step2-error', 'לא ניתן לטעון את רשימת השירותים. בדקו שהאתר פורסם עם Functions.')
    }
  }
})

document.querySelectorAll('[data-back]').forEach((btn) => {
  btn.addEventListener('click', () => goStep(Number(btn.dataset.back)))
})

$('#month-prev').addEventListener('click', async () => {
  state.month = shiftMonth(state.month, -1)
  await loadMonth()
})
$('#month-next').addEventListener('click', async () => {
  state.month = shiftMonth(state.month, 1)
  await loadMonth()
})

$('#submit-booking').addEventListener('click', async () => {
  const btn = $('#submit-booking')
  btn.disabled = true
  btn.textContent = 'שולח...'
  showError('#step3-error', '')

  try {
    const res = await fetch(`${API}/booking-create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: state.name,
        identity: state.identity,
        phone: state.phone,
        email: state.email,
        serviceId: state.service.id,
        date: state.selectedDate,
        start: state.selectedStart,
      }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.error || 'שגיאה בשליחה')

    $('#done-summary').textContent =
      `${data.booking.serviceTitle} · ${formatDateHe(data.booking.date)} בשעה ${data.booking.start}`
    goStep('done')
  } catch (e) {
    showError('#step3-error', e.message || 'שגיאה בשליחה')
    btn.disabled = false
    btn.textContent = 'שליחת בקשת תור'
  }
})

goStep(1)
