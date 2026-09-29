function siteUrl() {
  return (process.env.URL || process.env.SITE_URL || 'https://www.dr-shirans-esthetics.com').replace(/\/$/, '')
}

function notifyList() {
  const raw = process.env.NOTIFY_EMAIL || 'shiran8198@gmail.com'
  return raw
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

export async function sendEmail({ to, subject, html, text }) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM || 'Dr. Shiran Samocha <onboarding@resend.dev>'
  const recipients = (Array.isArray(to) ? to : [to]).map((e) => String(e).trim()).filter(Boolean)

  if (!apiKey) {
    console.error('RESEND_API_KEY missing — email skipped:', subject, '→', recipients.join(', '))
    return { ok: false, skipped: true }
  }

  const results = await Promise.allSettled(
    recipients.map(async (address) => {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ from, to: [address], subject, html, text }),
      })
      if (!response.ok) {
        console.error('Resend error', address, response.status, await response.text())
        throw new Error(`Resend failed for ${address}`)
      }
    }),
  )

  const ok = results.some((r) => r.status === 'fulfilled')
  return { ok }
}

function wrap(body) {
  return `<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f7f3ee;font-family:Heebo,Arial,sans-serif;color:#3d3530;">
  <div style="max-width:520px;margin:24px auto;background:#fff;border-radius:16px;padding:28px 24px;border:1px solid #e8dfd4;">
    <p style="margin:0 0 8px;font-size:13px;letter-spacing:.12em;color:#b8956a;">DR. SHIRAN SAMOCHA</p>
    ${body}
    <p style="margin:28px 0 0;font-size:12px;color:#7a6f66;">www.Dr-Shirans-Esthetics.com</p>
  </div>
</body></html>`
}

export async function emailNewBookingToClinic(booking) {
  const notify = notifyList()
  const base = siteUrl()
  const approveUrl = `${base}/.netlify/functions/booking-decide?token=${encodeURIComponent(booking.decideToken)}&action=approve`
  const rejectUrl = `${base}/.netlify/functions/booking-decide?token=${encodeURIComponent(booking.decideToken)}&action=reject`

  const rows = [
    ['שם', booking.name],
    ['טלפון', booking.phone || '—'],
    ['אימייל', booking.email || '—'],
    ['שירות', booking.serviceTitle],
    ['תאריך', booking.date],
    ['שעה', `${booking.start}–${booking.end}`],
    ['משך', `${booking.durationMin} דקות`],
  ]

  const table = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 0;color:#7a6f66;width:110px;">${k}</td><td style="padding:8px 0;font-weight:500;">${v}</td></tr>`,
    )
    .join('')

  const html = wrap(`
    <h1 style="margin:0 0 16px;font-size:22px;font-weight:500;">בקשת תור חדשה</h1>
    <p style="margin:0 0 16px;color:#7a6f66;">ממתינה לאישור שלך. השעה חסומה זמנית עד שתאשרי או תדחי.</p>
    <table style="width:100%;border-collapse:collapse;">${table}</table>
    <div style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap;">
      <a href="${approveUrl}" style="display:inline-block;background:#b8956a;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:500;">אישור התור</a>
      <a href="${rejectUrl}" style="display:inline-block;background:#fff;color:#b4413c;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:500;border:1px solid #e8b4b0;">דחיית התור</a>
    </div>
    <p style="margin:20px 0 0;font-size:13px;color:#7a6f66;">אפשר גם לנהל הכל במסך הניהול: <a href="${base}/admin/" style="color:#8b7355;">${base}/admin/</a></p>
  `)

  return sendEmail({
    to: notify,
    subject: `בקשת תור חדשה — ${booking.name} · ${booking.date} ${booking.start}`,
    html,
    text: `בקשת תור חדשה מ${booking.name}. ${booking.date} ${booking.start}-${booking.end}. אשר: ${approveUrl}`,
  })
}

export async function emailBookingReceivedToCustomer(booking) {
  if (!booking.email) return { ok: false, skipped: true }
  const html = wrap(`
    <h1 style="margin:0 0 16px;font-size:22px;font-weight:500;">הבקשה התקבלה</h1>
    <p style="margin:0 0 12px;">שלום ${booking.name},</p>
    <p style="margin:0 0 12px;color:#7a6f66;">בקשת התור שלך ל־<strong>${booking.serviceTitle}</strong> ב־${booking.date} בשעה ${booking.start} התקבלה וממתינה לאישור.</p>
    <p style="margin:0;color:#7a6f66;">נחזור אליך במייל ברגע שהתור יאושר.</p>
  `)
  return sendEmail({
    to: booking.email,
    subject: 'בקשת התור התקבלה — ממתינה לאישור',
    html,
    text: `שלום ${booking.name}, בקשת התור ל${booking.serviceTitle} ב${booking.date} ${booking.start} ממתינה לאישור.`,
  })
}

export async function emailBookingDecisionToCustomer(booking, approved) {
  if (!booking.email) return { ok: false, skipped: true }
  if (approved) {
    const html = wrap(`
      <h1 style="margin:0 0 16px;font-size:22px;font-weight:500;">התור אושר</h1>
      <p style="margin:0 0 12px;">שלום ${booking.name},</p>
      <p style="margin:0 0 12px;">התור שלך ל־<strong>${booking.serviceTitle}</strong> אושר.</p>
      <p style="margin:0;font-size:18px;font-weight:500;">${booking.date} · ${booking.start}</p>
    `)
    return sendEmail({
      to: booking.email,
      subject: `התור אושר — ${booking.date} ${booking.start}`,
      html,
      text: `התור אושר: ${booking.serviceTitle}, ${booking.date} ${booking.start}.`,
    })
  }

  const html = wrap(`
    <h1 style="margin:0 0 16px;font-size:22px;font-weight:500;">השעה אינה זמינה</h1>
    <p style="margin:0 0 12px;">שלום ${booking.name},</p>
    <p style="margin:0 0 12px;color:#7a6f66;">לצערנו לא הצלחנו לאשר את המועד ${booking.date} בשעה ${booking.start}. אפשר לבחור מועד אחר באתר.</p>
    <p style="margin:16px 0 0;"><a href="${siteUrl()}/booking/" style="color:#8b7355;">בחירת מועד חדש</a></p>
  `)
  return sendEmail({
    to: booking.email,
    subject: 'עדכון לגבי בקשת התור',
    html,
    text: `לא הצלחנו לאשר את המועד ${booking.date} ${booking.start}. אפשר לבחור מועד אחר באתר.`,
  })
}
