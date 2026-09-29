import { SERVICES } from './_shared/services.mjs'
import { handleOptions, json } from './_shared/cors.mjs'

export default async (req) => {
  const preflight = handleOptions(req)
  if (preflight) return preflight
  if (req.method !== 'GET') return json({ error: 'method not allowed' }, 405)
  return json({ services: SERVICES })
}
