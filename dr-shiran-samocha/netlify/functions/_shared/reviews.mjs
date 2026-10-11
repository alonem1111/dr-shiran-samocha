import { getStore } from '@netlify/blobs'

export const SEED_REVIEWS = [
  {
    id: 'seed-1',
    name: 'מטופלת',
    text: 'ממליצה בחום על ד״ר שירן! קשובה מאוד ומסבירה בסבלנות על הטיפול שמתבצע. עשינו טיפול בוטוקס.',
    date: '2026-03-29T19:04:00.000Z',
  },
  {
    id: 'seed-2',
    name: 'מירב אדן',
    text: 'הגעתי לשירן אחרי המון המלצות ששמעתי עליה. עשיתי בוטוקס ושפתיים. חזרתי עשר שנים אחורה.',
    date: '2026-03-29T16:52:00.000Z',
  },
  {
    id: 'seed-3',
    name: 'לירונה',
    text: 'אני רוצה להמליץ מכל הלב על הטיפול של דוקטור שירן ❤️ עשיתי אצלה בוטוקס ועיצוב שפתיים.',
    date: '2026-03-29T16:44:00.000Z',
  },
  {
    id: 'seed-4',
    name: 'מרינה אברהם',
    text: 'ממליצה מכל הלב! ❤️ עשיתי מילוי שפתיים ובוטוקס ואני ממש מרוצה מהתוצאה! ❤️',
    date: '2026-03-29T16:32:00.000Z',
  },
]

function store() {
  return getStore({ name: 'clinic-reviews', consistency: 'strong' })
}

export async function listReviews() {
  const raw = await store().get('all', { type: 'json' })
  if (Array.isArray(raw) && raw.length > 0) {
    return [...raw].sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')))
  }
  await store().set('all', JSON.stringify(SEED_REVIEWS))
  return [...SEED_REVIEWS]
}

export async function addReview({ name, text }) {
  const review = {
    id: `r-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    text,
    date: new Date().toISOString(),
  }
  const existing = await listReviews()
  const next = [review, ...existing]
  await store().set('all', JSON.stringify(next))
  return review
}
