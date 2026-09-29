const encoder = new TextEncoder()

function adminEmails() {
  const raw = process.env.ADMIN_EMAILS || 'alonem1111@gmail.com,shiran8198@gmail.com,drshiransamocha@gmail.com'
  return raw
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

function sessionSecret() {
  return process.env.ADMIN_PASSWORD || process.env.SESSION_SECRET || ''
}

async function hmac(message, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(message))
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function timingSafeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false
  const max = Math.max(a.length, b.length)
  let out = a.length === b.length ? 0 : 1
  for (let i = 0; i < max; i++) {
    out |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0)
  }
  return out === 0
}

function toB64Url(str) {
  const bytes = encoder.encode(str)
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function fromB64Url(str) {
  const pad = '='.repeat((4 - (str.length % 4)) % 4)
  const b64 = (str + pad).replace(/-/g, '+').replace(/_/g, '/')
  const bin = atob(b64)
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export function isAllowedAdminEmail(email) {
  if (!email) return false
  return adminEmails().includes(String(email).trim().toLowerCase())
}

export async function verifyAdminPassword(password) {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  return timingSafeEqual(String(password || ''), expected)
}

export async function createSessionToken(email) {
  const secret = sessionSecret()
  if (!secret) throw new Error('ADMIN_PASSWORD missing')
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 14 // 14 days
  // Encode email as base64url so dots in gmail.com cannot break the token
  const body = toB64Url(JSON.stringify({ e: email.toLowerCase(), exp }))
  const sig = await hmac(body, secret)
  return `${body}.${sig}`
}

export async function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return null
  const dot = token.lastIndexOf('.')
  if (dot <= 0) return null
  const body = token.slice(0, dot)
  const sig = token.slice(dot + 1)
  if (!body || !sig) return null

  const secret = sessionSecret()
  if (!secret) return null
  const expected = await hmac(body, secret)
  if (!timingSafeEqual(sig, expected)) return null

  let payload
  try {
    payload = JSON.parse(fromB64Url(body))
  } catch {
    return null
  }

  const email = String(payload?.e || '').toLowerCase()
  if (!isAllowedAdminEmail(email)) return null
  if (Number(payload?.exp) < Date.now()) return null
  return email
}

export function bearerFrom(req) {
  const h = req.headers.get('authorization') || ''
  const m = h.match(/^Bearer\s+(.+)$/i)
  return m ? m[1].trim() : null
}

export async function requireAdmin(req) {
  const token = bearerFrom(req)
  const email = await verifySessionToken(token)
  if (!email) return null
  return email
}

export function randomToken() {
  const bytes = new Uint8Array(24)
  crypto.getRandomValues(bytes)
  return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('')
}
