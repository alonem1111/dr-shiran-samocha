import { handleOptions, json, readJson } from './_shared/cors.mjs'
import { requireAdmin } from './_shared/auth.mjs'
import { listRecentBookings, updateBooking } from './_shared/store.mjs'
import { emailBookingDecisionToCustomer } from './_shared/email.mjs'

export default async (req) => {
  const preflight = handleOptions(req)
  if (preflight) return preflight

  const email = await requireAdmin(req)
  if (!email) return json({ error: 'יש להתחבר' }, 401)

  if (req.method === 'GET') {
    const bookings = await listRecentBookings()
    return json({ bookings })
  }

  if (req.method === 'POST') {
    const body = await readJson(req)
    const id = body?.id
    const action = body?.action
    if (!id || (action !== 'approve' && action !== 'reject')) {
      return json({ error: 'בקשה לא תקינה' }, 400)
    }

    const approved = action === 'approve'
    const updated = await updateBooking(id, (b) => {
      if (b.status !== 'pending') return null
      return {
        ...b,
        status: approved ? 'approved' : 'rejected',
        decidedAt: new Date().toISOString(),
        decidedBy: email,
      }
    })

    if (!updated) return json({ error: 'לא ניתן לעדכן את הבקשה' }, 409)
    await emailBookingDecisionToCustomer(updated, approved).catch(() => {})
    return json({ ok: true, booking: updated })
  }

  return json({ error: 'method not allowed' }, 405)
}
