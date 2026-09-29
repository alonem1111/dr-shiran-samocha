export const SERVICES = [
  { id: 'consult', title: 'ייעוץ והיכרות', durationMin: 60, description: 'פגישת היכרות והתאמת תוכנית טיפול' },
  { id: 'skin', title: 'איכות העור', durationMin: 30, description: 'טיפולים לשיפור מרקם, לחות וזוהר' },
  { id: 'botox', title: 'בוטוקס', durationMin: 30, description: 'החלקת קמטי הבעה בעדינות' },
  { id: 'lips', title: 'עיצוב שפתיים', durationMin: 30, description: 'הדגשה עדינה בחומצה היאלורונית' },
  { id: 'nose', title: 'פיסול אף', durationMin: 30, description: 'שיפור פרופיל האף ללא ניתוח' },
  { id: 'face', title: 'פיסול פנים עדין', durationMin: 30, description: 'לחיים, קו לסת וסנטר' },
  { id: 'ha', title: 'חומצה היאלורונית', durationMin: 30, description: 'מילוי קמטים והחזרת נפח' },
]

export function getService(id) {
  return SERVICES.find((s) => s.id === id) || null
}
