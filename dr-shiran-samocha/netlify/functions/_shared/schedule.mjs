/** Sunday=0 … Saturday=6 (JS getDay) — Israel clinic week */
export const DAY_NAMES_HE = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']

export const DEFAULT_WEEKLY = {
  0: { start: '09:00', end: '18:00' }, // א׳
  1: { start: '09:00', end: '18:00' }, // ב׳
  2: { start: '09:00', end: '18:00' }, // ג׳
  3: { start: '09:00', end: '18:00' }, // ד׳
  4: { start: '09:00', end: '18:00' }, // ה׳
  5: null, // ו׳
  6: null, // ש׳
}

const SLOT_STEP = 30

export function timeToMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export function minutesToTime(mins) {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export function addMinutes(hhmm, mins) {
  return minutesToTime(timeToMinutes(hhmm) + mins)
}

/** YYYY-MM-DD in Asia/Jerusalem */
export function israelToday() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jerusalem',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}

export function parseDateParts(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return { y, m, d }
}

export function weekdayOf(dateStr) {
  const { y, m, d } = parseDateParts(dateStr)
  // Noon UTC avoids DST edge cases for calendar day in Israel
  return new Date(Date.UTC(y, m - 1, d, 12, 0, 0)).getUTCDay()
}

export function monthKey(dateStr) {
  return dateStr.slice(0, 7)
}

export function datesInMonth(yearMonth) {
  const [y, m] = yearMonth.split('-').map(Number)
  const days = new Date(Date.UTC(y, m, 0)).getUTCDate()
  const out = []
  for (let d = 1; d <= days; d++) {
    out.push(`${yearMonth}-${String(d).padStart(2, '0')}`)
  }
  return out
}

/**
 * Resolve open hours for a date.
 * monthOverride: { closedDates: string[], dayHours: { [date]: {start,end}|null } }
 * weekly: DEFAULT_WEEKLY shape
 */
export function hoursForDate(dateStr, weekly, monthOverride) {
  const closed = monthOverride?.closedDates || []
  if (closed.includes(dateStr)) return null

  if (monthOverride?.dayHours && Object.prototype.hasOwnProperty.call(monthOverride.dayHours, dateStr)) {
    return monthOverride.dayHours[dateStr]
  }

  const wd = String(weekdayOf(dateStr))
  const template = weekly?.[wd] ?? weekly?.[Number(wd)]
  return template || null
}

export function rangesOverlap(aStart, aEnd, bStart, bEnd) {
  return timeToMinutes(aStart) < timeToMinutes(bEnd) && timeToMinutes(bStart) < timeToMinutes(aEnd)
}

export function bookingBlocksSlot(booking, slotStart, slotEnd) {
  if (booking.status !== 'pending' && booking.status !== 'approved') return false
  return rangesOverlap(booking.start, booking.end, slotStart, slotEnd)
}

/**
 * Build available start times for a date given duration (30 or 60).
 * Grid is always 30 minutes; 60-min needs two free consecutive cells.
 */
export function availableStarts(dateStr, durationMin, weekly, monthOverride, bookings) {
  const hours = hoursForDate(dateStr, weekly, monthOverride)
  if (!hours) return []

  const open = timeToMinutes(hours.start)
  const close = timeToMinutes(hours.end)
  if (close - open < durationMin) return []

  const dayBookings = (bookings || []).filter(
    (b) => b.date === dateStr && (b.status === 'pending' || b.status === 'approved'),
  )

  const starts = []
  for (let t = open; t + durationMin <= close; t += SLOT_STEP) {
    const start = minutesToTime(t)
    const end = minutesToTime(t + durationMin)
    const blocked = dayBookings.some((b) => bookingBlocksSlot(b, start, end))
    if (!blocked) starts.push(start)
  }

  // Hide past times for today
  const today = israelToday()
  if (dateStr === today) {
    const nowParts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jerusalem',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(new Date())
    const hh = nowParts.find((p) => p.type === 'hour').value
    const mm = nowParts.find((p) => p.type === 'minute').value
    const nowMins = timeToMinutes(`${hh}:${mm}`) + 30 // buffer
    return starts.filter((s) => timeToMinutes(s) >= nowMins)
  }

  return starts
}

export function normalizeWeekly(input) {
  const base = { ...DEFAULT_WEEKLY }
  if (!input || typeof input !== 'object') return base
  for (let i = 0; i <= 6; i++) {
    const key = String(i)
    const val = input[key] ?? input[i]
    if (val === null) base[i] = null
    else if (val && val.start && val.end) base[i] = { start: val.start, end: val.end }
  }
  // Also expose string keys for JSON round-trip
  const out = {}
  for (let i = 0; i <= 6; i++) out[String(i)] = base[i]
  return out
}
