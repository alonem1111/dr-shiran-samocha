import { handleOptions, json, readJson } from './_shared/cors.mjs'
import { getService } from './_shared/services.mjs'
import { addMinutes, availableStarts, israelToday, monthKey } from './_shared/schedule.mjs'
import { getBookingsForMonth, getMonthOverride, getWeeklyTemplate, saveBooking } from './_shared/store.mjs'
import { randomToken } from './_shared/auth.mjs'
import { emailBookingReceivedToCustomer, emailNewBookingToClinic } from './_shared/email.mjs'

function normalizePhone(raw) {
  const digits = String(raw || '').replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('972')) return `+${digits}`
  if (digits.startsWith('0') && digits.length === 10) return `+972${digits.slice(1)}`
  return `+${digits}`
}

function isValidIlMobile(phone) {
  return /^\+9725\d{8}$/.test(phone)
}

export default async (req) => {
  const preflight = handleOptions(req)
  if (preflight) return preflight
  if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405)

  const body = await readJson(req)
  if (!body) return json({ error: 'גוף בקשה לא תקין' }, 400)

  const name = String(body.name || '').trim()
  const serviceId = body.serviceId
  const date = String(body.date || '').trim()
  const start = String(body.start || '').trim()
  const identity = body.identity === 'email' ? 'email' : 'phone'
  const phone = normalizePhone(body.phone)
  const email = String(body.email || '')
    .trim()
    .toLowerCase()

  if (!name || name.length < 2) return json({ error: 'נא להזין שם מלא' }, 400)

  const service = getService(serviceId)
  if (!service) return json({ error: 'שירות לא תקין' }, 400)

  if (identity === 'phone') {
    if (!isValidIlMobile(phone)) return json({ error: 'מספר טלפון לא תקין' }, 400)
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'כתובת אימייל לא תקינה' }, 400)
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < israelToday()) {
    return json({ error: 'תאריך לא זמין' }, 400)
  }
  if (!/^\d{2}:\d{2}$/.test(start)) return json({ error: 'שעה לא תקינה' }, 400)

  const weekly = await getWeeklyTemplate()
  const ym = monthKey(date)
  const [override, bookings] = await Promise.all([getMonthOverride(ym), getBookingsForMonth(ym)])

  const slots = availableStarts(date, service.durationMin, weekly, override, bookings)
  if (!slots.includes(start)) {
    return json({ error: 'השעה שנבחרה כבר לא פנויה. בחרו מועד אחר.' }, 409)
  }

  const pendingSame = bookings.filter(
    (b) =>
      b.status === 'pending' &&
      ((identity === 'phone' && b.phone === phone) || (identity === 'email' && b.email === email)),
  )
  if (pendingSame.length >= 3) {
    return json({ error: 'יש כבר כמה בקשות ממתינות. נחזור אליכם בהקדם.' }, 429)
  }

  const booking = {
    id: crypto.randomUUID(),
    name,
    phone: identity === 'phone' ? phone : '',
    email: identity === 'email' ? email : email || '',
    identity,
    serviceId: service.id,
    serviceTitle: service.title,
    date,
    start,
    end: addMinutes(start, service.durationMin),
    durationMin: service.durationMin,
    status: 'pending',
    decideToken: randomToken(),
    createdAt: new Date().toISOString(),
  }

  await saveBooking(booking)
  await Promise.allSettled([emailNewBookingToClinic(booking), emailBookingReceivedToCustomer(booking)])

  return json({
    ok: true,
    booking: {
      id: booking.id,
      date: booking.date,
      start: booking.start,
      end: booking.end,
      serviceTitle: booking.serviceTitle,
      status: booking.status,
    },
  })
}
