import { handleOptions, json } from './_shared/cors.mjs'
import { getService } from './_shared/services.mjs'
import {
  availableStarts,
  datesInMonth,
  hoursForDate,
  israelToday,
  monthKey,
} from './_shared/schedule.mjs'
import { getBookingsForMonth, getMonthOverride, getWeeklyTemplate } from './_shared/store.mjs'

export default async (req) => {
  const preflight = handleOptions(req)
  if (preflight) return preflight
  if (req.method !== 'GET') return json({ error: 'method not allowed' }, 405)

  const url = new URL(req.url)
  const serviceId = url.searchParams.get('serviceId')
  const date = url.searchParams.get('date')
  const month = url.searchParams.get('month')

  const service = getService(serviceId)
  if (!service) return json({ error: 'שירות לא תקין' }, 400)

  const weekly = await getWeeklyTemplate()
  const today = israelToday()

  if (date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return json({ error: 'תאריך לא תקין' }, 400)
    if (date < today) return json({ date, slots: [] })

    const ym = monthKey(date)
    const [override, bookings] = await Promise.all([getMonthOverride(ym), getBookingsForMonth(ym)])
    const slots = availableStarts(date, service.durationMin, weekly, override, bookings)
    return json({ date, durationMin: service.durationMin, slots })
  }

  const yearMonth = month || today.slice(0, 7)
  if (!/^\d{4}-\d{2}$/.test(yearMonth)) return json({ error: 'חודש לא תקין' }, 400)

  const [override, bookings] = await Promise.all([
    getMonthOverride(yearMonth),
    getBookingsForMonth(yearMonth),
  ])

  const days = []
  for (const d of datesInMonth(yearMonth)) {
    if (d < today) continue
    const hours = hoursForDate(d, weekly, override)
    if (!hours) continue
    const slots = availableStarts(d, service.durationMin, weekly, override, bookings)
    if (slots.length) days.push({ date: d, slotsCount: slots.length })
  }

  return json({ month: yearMonth, durationMin: service.durationMin, days })
}
