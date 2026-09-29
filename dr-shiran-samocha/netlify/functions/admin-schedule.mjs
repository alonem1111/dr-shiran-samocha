import { handleOptions, json, readJson } from './_shared/cors.mjs'
import { requireAdmin } from './_shared/auth.mjs'
import {
  getMonthOverride,
  getWeeklyTemplate,
  setMonthOverride,
  setWeeklyTemplate,
} from './_shared/store.mjs'
import { DAY_NAMES_HE, DEFAULT_WEEKLY, israelToday } from './_shared/schedule.mjs'

export default async (req) => {
  const preflight = handleOptions(req)
  if (preflight) return preflight

  const email = await requireAdmin(req)
  if (!email) return json({ error: 'יש להתחבר' }, 401)

  if (req.method === 'GET') {
    const url = new URL(req.url)
    const month = url.searchParams.get('month') || israelToday().slice(0, 7)
    const [weekly, monthOverride] = await Promise.all([
      getWeeklyTemplate(),
      getMonthOverride(month),
    ])
    return json({
      weekly,
      month,
      monthOverride,
      dayNames: DAY_NAMES_HE,
      defaults: DEFAULT_WEEKLY,
    })
  }

  if (req.method === 'PUT') {
    const body = await readJson(req)
    if (!body) return json({ error: 'גוף בקשה לא תקין' }, 400)

    if (body.weekly) {
      const weekly = await setWeeklyTemplate(body.weekly)
      return json({ ok: true, weekly })
    }

    if (body.month && body.monthOverride) {
      const monthOverride = await setMonthOverride(body.month, body.monthOverride)
      return json({ ok: true, month: body.month, monthOverride })
    }

    return json({ error: 'אין מה לשמור' }, 400)
  }

  return json({ error: 'method not allowed' }, 405)
}
