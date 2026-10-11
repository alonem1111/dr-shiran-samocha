import { json, handleOptions, readJson } from './_shared/cors.mjs'
import { addReview } from './_shared/reviews.mjs'

export default async (req) => {
  const preflight = handleOptions(req)
  if (preflight) return preflight
  if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405)

  const body = await readJson(req)
  const name = String(body?.name || '').trim().slice(0, 60)
  const text = String(body?.text || body?.review || '').trim().slice(0, 500)

  if (!name || !text) {
    return json({ error: 'שם וחוות דעת הם שדות חובה' }, 400)
  }

  try {
    const review = await addReview({ name, text })
    return json({ ok: true, review })
  } catch (err) {
    return json({ error: String(err?.message || err) }, 500)
  }
}
