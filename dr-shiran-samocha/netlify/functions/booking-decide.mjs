import { findBookingByToken, updateBooking } from './_shared/store.mjs'
import { emailBookingDecisionToCustomer } from './_shared/email.mjs'

function htmlPage({ title, body, ok }) {
  const accent = ok ? '#8b7355' : '#b4413c'
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <style>
    body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f7f3ee;font-family:Heebo,sans-serif;color:#3d3530;padding:24px}
    .card{background:#fff;border:1px solid #e8dfd4;border-radius:16px;padding:2rem;max-width:420px;text-align:center;box-shadow:0 8px 32px rgba(61,53,48,.08)}
    h1{font-size:1.4rem;font-weight:500;margin:0 0 1rem;color:${accent}}
    p{color:#7a6f66;line-height:1.7;margin:0 0 1rem}
    a{color:#8b7355}
  </style>
</head>
<body>
  <div class="card">
    <h1>${title}</h1>
    ${body}
    <p><a href="/admin/">למסך הניהול</a> · <a href="/">חזרה לאתר</a></p>
  </div>
</body>
</html>`
}

export default async (req) => {
  const url = new URL(req.url)
  const token = url.searchParams.get('token') || ''
  const action = url.searchParams.get('action')

  if (!token || (action !== 'approve' && action !== 'reject')) {
    return new Response(
      htmlPage({
        title: 'קישור לא תקין',
        body: '<p>הקישור לאישור או לדחייה אינו תקין.</p>',
        ok: false,
      }),
      { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
    )
  }

  const existing = await findBookingByToken(token)
  if (!existing) {
    return new Response(
      htmlPage({
        title: 'הבקשה לא נמצאה',
        body: '<p>ייתכן שהקישור כבר נוצל או שפג תוקפו.</p>',
        ok: false,
      }),
      { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
    )
  }

  if (existing.status !== 'pending') {
    return new Response(
      htmlPage({
        title: 'כבר טופל',
        body: `<p>הסטטוס הנוכחי: <strong>${existing.status === 'approved' ? 'מאושר' : 'נדחה'}</strong>.</p>`,
        ok: existing.status === 'approved',
      }),
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
    )
  }

  const approved = action === 'approve'
  const updated = await updateBooking(existing.id, (b) => ({
    ...b,
    status: approved ? 'approved' : 'rejected',
    decidedAt: new Date().toISOString(),
  }))

  if (updated) {
    await emailBookingDecisionToCustomer(updated, approved).catch(() => {})
  }

  return new Response(
    htmlPage({
      title: approved ? 'התור אושר' : 'התור נדחה',
      body: approved
        ? `<p>אושר תור ל־${existing.name}<br/>${existing.date} · ${existing.start}</p>`
        : `<p>נדחתה הבקשה של ${existing.name}. השעה התפנתה שוב ביומן.</p>`,
      ok: approved,
    }),
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  )
}
