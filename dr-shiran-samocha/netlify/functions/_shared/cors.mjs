const DEFAULT_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
  'Content-Type': 'application/json; charset=utf-8',
}

export function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...DEFAULT_HEADERS, ...extraHeaders },
  })
}

export function noContent() {
  return new Response(null, { status: 204, headers: DEFAULT_HEADERS })
}

export function handleOptions(req) {
  if (req.method === 'OPTIONS') return noContent()
  return null
}

export async function readJson(req) {
  try {
    return await req.json()
  } catch {
    return null
  }
}
