import { getStore } from '@netlify/blobs'
import { DEFAULT_WEEKLY, normalizeWeekly, monthKey } from './schedule.mjs'

function store() {
  return getStore({ name: 'clinic-booking', consistency: 'strong' })
}

export async function getWeeklyTemplate() {
  const raw = await store().get('weekly-template', { type: 'json' })
  return normalizeWeekly(raw || DEFAULT_WEEKLY)
}

export async function setWeeklyTemplate(weekly) {
  const normalized = normalizeWeekly(weekly)
  await store().set('weekly-template', JSON.stringify(normalized))
  return normalized
}

export async function getMonthOverride(yearMonth) {
  const raw = await store().get(`month:${yearMonth}`, { type: 'json' })
  return raw || { closedDates: [], dayHours: {} }
}

export async function setMonthOverride(yearMonth, data) {
  const payload = {
    closedDates: Array.isArray(data.closedDates) ? data.closedDates : [],
    dayHours: data.dayHours && typeof data.dayHours === 'object' ? data.dayHours : {},
  }
  await store().set(`month:${yearMonth}`, JSON.stringify(payload))
  return payload
}

export async function getBookingsForMonth(yearMonth) {
  const raw = await store().get(`bookings:${yearMonth}`, { type: 'json' })
  return Array.isArray(raw) ? raw : []
}

export async function getBookingsForDate(dateStr) {
  return getBookingsForMonth(monthKey(dateStr))
}

export async function saveBooking(booking) {
  const key = `bookings:${monthKey(booking.date)}`
  const list = await getBookingsForMonth(monthKey(booking.date))
  list.push(booking)
  await store().set(key, JSON.stringify(list))
  return booking
}

export async function updateBooking(bookingId, mutator) {
  // Search current + nearby months (pending tokens)
  const now = new Date()
  const months = []
  for (let offset = -1; offset <= 2; offset++) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + offset, 1))
    months.push(`${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`)
  }

  for (const ym of months) {
    const list = await getBookingsForMonth(ym)
    const idx = list.findIndex((b) => b.id === bookingId)
    if (idx === -1) continue
    const updated = mutator({ ...list[idx] })
    if (!updated) return null
    list[idx] = updated
    await store().set(`bookings:${ym}`, JSON.stringify(list))
    return updated
  }
  return null
}

export async function findBookingByToken(token) {
  const now = new Date()
  for (let offset = -1; offset <= 2; offset++) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + offset, 1))
    const ym = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`
    const list = await getBookingsForMonth(ym)
    const found = list.find((b) => b.decideToken === token)
    if (found) return found
  }
  return null
}

export async function listRecentBookings() {
  const now = new Date()
  const all = []
  for (let offset = -1; offset <= 2; offset++) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + offset, 1))
    const ym = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`
    all.push(...(await getBookingsForMonth(ym)))
  }
  return all.sort((a, b) => `${b.date}${b.start}`.localeCompare(`${a.date}${a.start}`))
}
