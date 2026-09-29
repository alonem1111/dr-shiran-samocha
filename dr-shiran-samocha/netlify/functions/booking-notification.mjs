// Runs on every verified Netlify form submission and forwards booking
// requests to the clinic's WhatsApp through CallMeBot.

const CALLMEBOT_ENDPOINT = 'https://api.callmebot.com/whatsapp.php'

export default {
  async formSubmitted(event) {
    const data = event.data || {}
    const phoneField = data['טלפון']
    const treatmentField = data['טיפול מבוקש']

    // The reviews form fires the same event; only booking requests carry a phone.
    if (!phoneField && !treatmentField) return

    const phone = process.env.NOTIFY_WHATSAPP_PHONE
    const apikey = process.env.CALLMEBOT_APIKEY

    // Netlify has already stored the submission, so a failed notification
    // must never throw.
    if (!phone || !apikey) {
      console.error('Missing NOTIFY_WHATSAPP_PHONE or CALLMEBOT_APIKEY env var')
      return
    }

    const text = [
      '🗓️ *פנייה חדשה מהאתר*',
      '',
      `שם: ${data['שם מלא'] || '—'}`,
      `טלפון: ${phoneField || '—'}`,
      `טיפול: ${treatmentField || '—'}`,
      `זמן מועדף: ${data['זמן מועדף'] || '—'}`,
      data['הערות'] ? `הערות: ${data['הערות']}` : null,
    ]
      .filter((line) => line !== null)
      .join('\n')

    const url = `${CALLMEBOT_ENDPOINT}?phone=${encodeURIComponent(phone)}&apikey=${encodeURIComponent(apikey)}&text=${encodeURIComponent(text)}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        console.error('CallMeBot error', response.status, await response.text())
      }
    } catch (error) {
      console.error('WhatsApp notification failed', error)
    }
  },
}
