import { json, handleOptions } from './_shared/cors.mjs'
import { listReviews, SEED_REVIEWS } from './_shared/reviews.mjs'

export default async (req) => {
  const preflight = handleOptions(req)
  if (preflight) return preflight
  if (req.method !== 'GET') return json({ error: 'method not allowed' }, 405)

  try {
    const reviews = await listReviews()
    return json({ reviews })
  } catch {
    return json({ reviews: SEED_REVIEWS })
  }
}
