import { handleOptions, json, readJson } from './_shared/cors.mjs'
import {
  createSessionToken,
  isAllowedAdminEmail,
  verifyAdminPassword,
} from './_shared/auth.mjs'

export default async (req) => {
  const preflight = handleOptions(req)
  if (preflight) return preflight
  if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405)

  if (!process.env.ADMIN_PASSWORD) {
    return json({ error: 'ADMIN_PASSWORD לא הוגדר ב-Netlify' }, 500)
  }

  const body = await readJson(req)
  const email = String(body?.email || '')
    .trim()
    .toLowerCase()
  const password = String(body?.password || '')

  if (!isAllowedAdminEmail(email) || !(await verifyAdminPassword(password))) {
    return json({ error: 'אימייל או סיסמה שגויים' }, 401)
  }

  const token = await createSessionToken(email)
  return json({ ok: true, token, email })
}
