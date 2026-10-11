const beforeAfter = [
  { image: 'images/before-after/forehead-lines.png', tag: 'בוטוקס', title: 'החלקת קמטי מצח' },
  { image: 'images/before-after/forehead-frown.png', tag: 'בוטוקס', title: 'החלקת קמטי הבעה' },
  { image: 'images/before-after/lower-face.png', tag: 'עיצוב שפתיים', title: 'עיצוב שפתיים' },
  { image: 'images/before-after/jawline.png', tag: 'פיסול פנים עדין', title: 'חידוד קו לסת וסנטר' },
  { image: 'images/before-after/profile.png', tag: 'פיסול אף', title: 'פיסול אף' },
]

const treatments = [
  {
    title: 'איכות העור',
    description: 'טיפולים מתקדמים לשיפור מרקם העור, החזרת לחות וזוהר טבעי. מזותרפיה, ויטמינים, חומצות אמינו ופפטידים — לעור בריא, קורן ורענן.',
    image: 'https://placehold.co/600x400/E8DFD4/8B7355?text=Skin+Quality',
    suitable: 'למי שמרגישה שהעור עייף, יבש, חסר זוהר או לא אחיד — ורוצה מראה רענן ובריא בלי לשנות תווי פנים.',
    areas: 'פנים, צוואר ולעיתים מחשוף — לפי הצורך והערכת העור.',
    feelAfter: 'עור רך יותר, זוהר עדין ותחושת רעננות. התוצאה נבנית בהדרגה ומרגישה טבעית לגמרי.',
    process: 'היכרות והערכת עור → התאמת פרוטוקול אישי → טיפול עדין בקליניקה → הנחיות בית להמשך התוצאה.',
    painRecovery: 'אי נוחות קלה בלבד. ייתכנו אדמומיות או רגישות קלה ליום–יומיים. בדרך כלל חוזרים לשגרה מיד.',
  },
  {
    title: 'בוטוקס',
    description: 'החלקת קמטי הבעה בעדינות — במצח, בין הגבות וסביב העיניים. תוצאה טבעית שמרעננת את המראה מבלי לשנות את תווי הפנים.',
    image: 'https://placehold.co/600x400/E8DFD4/8B7355?text=Botox',
    suitable: 'למי שמבחינה בקמטי הבעה במנוחה או בתנועה, ורוצה מראה רגוע ורענן — בלי מראה "קפוא".',
    areas: 'מצח, בין הגבות (קמט כעס), רגלי עורב סביב העיניים — ולפי הצורך גם אזורים נוספים.',
    feelAfter: 'תוך כמה ימים המצח וההבעה נראים רכים יותר. תרגישי שנחה ויותר רעננה — ועדיין נראית כמו את.',
    process: 'ייעוץ והתאמה → סימון נקודות מדויק → הזרקות עדינות → הנחיות קצרות אחרי הטיפול.',
    painRecovery: 'דקירות קלות לכמה רגעים. בדרך כלל בלי החלמה. אפשר לחזור לעבודה באותו יום; להימנע מעיסוי האזור לכמה שעות.',
  },
  {
    title: 'עיצוב שפתיים',
    description: 'הדגשה והעצמה עדינה של השפתיים בחומצה היאלורונית. פיסול מדויק שמשמר פרופורציות הרמוניות ומעניק מראה טבעי ואלגנטי.',
    image: 'https://placehold.co/600x400/E8DFD4/8B7355?text=Lip+Design',
    suitable: 'למי שרוצה שפתיים מודגשות בעדינות, תיקון אסימטריה, או החזרת נפח שנעלם — בלי מראה מוגזם.',
    areas: 'שפתיים עליונה ותחתונה, קו מתאר השפה, ולעיתים אזור מעל השפה לפי מבנה הפנים.',
    feelAfter: 'שפתיים מלאות יותר, רכות והרמוניות עם הפנים. תרגישי בטוחה יותר בחיוך ובתמונות.',
    process: 'התאמת צורה וכמות → אלחוש לפי הצורך → הזרקה מדויקת → עיצוב ובדיקת סימטריה → הנחיות אחרי.',
    painRecovery: 'עם אלחוש התחושה נסבלת מאוד. נפיחות או רגישות ליום–יומיים זה נורמלי. התוצאה הסופית נראית אחרי שהנפיחות יורדת.',
  },
  {
    title: 'פיסול אף',
    description: 'שיפור פרופיל האף ללא ניתוח — תיקון גבה, קצה או אסימטריה בעזרת חומצה היאלורונית. תוצאה מיידית, עדינה ומותאמת אישית.',
    image: 'https://placehold.co/600x400/E8DFD4/8B7355?text=Nose+Sculpting',
    suitable: 'למי שרוצה לשפר גבנון קטן, קצה אף או פרופיל — בלי ניתוח ובלי זמן החלמה ארוך.',
    areas: 'גשר האף, קצה האף ואזורים שדורשים איזון בפרופיל.',
    feelAfter: 'פרופיל חלק ומאוזן יותר. לרוב תרגישי שהאף "נעלם" מהמחשבות ומתמזג יפה עם הפנים.',
    process: 'הערכת פרופיל ומבנה → תכנון עדין → הזרקה מדויקת בשכבות → בדיקת תוצאה מכל הזוויות.',
    painRecovery: 'אי נוחות קלה בזמן הטיפול. ייתכנו רגישות או נפיחות קלה ליום–יומיים. אין צורך בהחלמה משמעותית.',
  },
  {
    title: 'פיסול פנים עדין',
    description: 'הדגשת עצמות לחיים, קו לסת וסנטר ליצירת מראה הרמוני ומחודד. גישה עדינה שמדגישה את היופי הטבעי שלך.',
    image: 'https://placehold.co/600x400/E8DFD4/8B7355?text=Facial+Contouring',
    suitable: 'למי שמרגישה שהפנים איבדו הגדרה, שהלחיים שקעו, או שרוצה קו לסת וסנטר מחודדים יותר — בעדינות.',
    areas: 'לחיים, קו לסת, סנטר ולעיתים רקות — לפי מבנה הפנים והיעד האסתטי.',
    feelAfter: 'מראה מפוסל ומורם בעדינות. תרגישי שהפנים נראות יותר מוגדרות ובריאות, בלי שינוי דרמטי.',
    process: 'מיפוי פנים → בחירת נקודות הדגשה → הזרקה הדרגתית → איזון סימטריה → הנחיות אחרי הטיפול.',
    painRecovery: 'דקירות ונפיחות קלה אפשריות ליום–שלושה. רוב המטופלות חוזרות לשגרה מיד.',
  },
  {
    title: 'חומצה היאלורונית',
    description: 'מילוי קמטים, החזרת נפח והידרציה לעור הפנים. חומר בטוח וטבעי שמעניק תוצאה מיידית ומחמיאה.',
    image: 'https://placehold.co/600x400/E8DFD4/8B7355?text=Hyaluronic+Acid',
    suitable: 'למי שרוצה למלא קמטים, להחזיר נפח שאבד עם הגיל, או לרענן אזורים שנראים עייפים.',
    areas: 'קמטי הבעה עמוקים, קפלי הבעה סביב הפה, לחיים ואזורים שדורשים נפח — לפי התאמה אישית.',
    feelAfter: 'עור מלא יותר, רך ומחמיא. תרגישי שהפנים נראות רעננות ומטופלות — לא "עשויות".',
    process: 'ייעוץ ובחירת אזורים → התאמת סוג החומר → הזרקה מדויקת → עיצוב עדין → מעקב והנחיות.',
    painRecovery: 'אי נוחות קלה; לעיתים נפיחות או שטף דם קטן לכמה ימים. לרוב בלי צורך בהחלמה ארוכה.',
  },
]

const faqs = [
  { question: 'למי מיועדים טיפולי אסתטיקה רפואית?', answer: 'הטיפולים שלנו מיועדים לנשים ולגברים המעוניינים לשפר את מראה הפנים בצורה עדינה, טבעית ולא פולשנית — בלי לשנות את תווי הפנים, אלא לרענן ולחדד אותם. מתאים למי שמחפשים תוצאות הרמוניות, מקצועיות ובטוחות.' },
  { question: 'האם הטיפולים מתאימים גם למי שזו הפעם הראשונה?', answer: 'בהחלט. אנחנו מתחילים בגישה אישית והדרגתית, כך שתרגישו בנוח ומלווים בכל שלב. הפגישה הראשונה מיועדת להיכרות, לשאלות ולהתאמה מדויקת — בלי לחץ, בקצב שלכם.' },
  { question: 'מה ההבדל בין בוטוקס לפילרים?', answer: 'בוטוקס מחליש זמנית שרירים שיוצרים קמטי הבעה (כמו קמטי מצח), בעוד פילרים — לרוב חומצה היאלורונית — מוסיפים נפח לאזורים שדקו או דורשים הדגשה עדינה (כמו שפתיים, לחיים או קו לסת).' },
  { question: 'כמה זמן מחזיקים הטיפולים?', answer: 'בוטוקס — 3 עד 6 חודשים. חומצה היאלורונית — 6 עד 12 חודשים (תלוי באזור ובסוג העור). טיפולי איכות עור — משך ההשפעה משתנה לפי סוג הטיפול ותוכנית הטיפולים האישית.' },
  { question: 'מתי רואים תוצאות?', answer: 'בוטוקס — תוצאות נראות תוך 3–7 ימים. פילרים — תוצאה מיידית, עם שיפור נוסף לאחר מספר ימים. טיפולי איכות עור — זוהר ושיפור במרקם העור ניכרים בהדרגה לאורך סדרת הטיפולים.' },
  { question: 'האם הטיפולים כואבים?', answer: 'רוב הטיפולים מלווים בתחושת דקירה קלה בלבד. נעשה שימוש בחומרי אלחוש לפי הצורך כדי להפחית אי נוחות. ד״ר שירן סמוכה מתמחה בגישה עדינה ולא פולשנית.' },
  { question: 'האם יש זמן החלמה?', answer: 'בדרך כלל אין צורך בזמן החלמה משמעותי. יתכנו נפיחות או אדמומיות קלה שחולפת בתוך יום–יומיים. ניתן לחזור לשגרה כמעט מיד לאחר רוב הטיפולים.' },
  { question: 'האם ניתן לשלב מספר טיפולים באותו מפגש?', answer: 'בהחלט. לעיתים משלבים טיפולים — כמו בוטוקס עם חומצה היאלורונית או טיפולי איכות עור — לפי התאמה אישית והערכה מקצועית של ד״ר שירן סמוכה.' },
  { question: 'מי לא יכול לעבור טיפולים?', answer: 'לא מומלץ לבצע טיפולים במהלך הריון או הנקה, או במקרים של מחלות אוטואימוניות פעילות, זיהומים או אלרגיה לחומרי הטיפול. בכל מקרה תתבצע הערכה רפואית לפני כל טיפול.' },
  { question: 'מה כולל מפגש ייעוץ?', answer: 'מפגש הייעוץ כולל היכרות אישית, שאלון רפואי מלא, הערכה מקצועית של מבנה הפנים, בניית תוכנית טיפול מותאמת אישית ודיון ברור על הציפיות והתוצאות הצפויות.' },
  { question: 'האם אפשר רק להתייעץ בלי להתחייב לטיפול?', answer: 'בהחלט. הפגישה הראשונה מיועדת להיכרות, לשאלות ולהתאמה מדויקת — בלי לחץ, בקצב שלך.' },
  { question: 'איך נקבעת תוכנית הטיפול?', answer: 'במהלך פגישת הייעוץ תתבצע הערכה מקצועית ואישית של מבנה הפנים והצרכים שלך — והתוכנית תיבנה יחד איתך.' },
  { question: 'אני מפחד.ת מהזרקות — יש אופציות עדינות?', answer: 'כן! כל טיפול מותאם לרמת הרגישות שלך, ובמקרה הצורך נעשה שימוש בחומרי אלחוש. ד״ר שירן סמוכה מתמחה בגישה עדינה ולא פולשנית.' },
  { question: 'איך אפשר ליצור קשר הכי מהר?', answer: 'הכי מהיר לקבוע תור באשף הזימון באתר, או להשאיר פרטים בטופס — ואחזור אליכם בהקדם.' },
]

const FALLBACK_REVIEWS = [
  {
    name: 'מטופלת',
    text: 'ממליצה בחום על ד״ר שירן! קשובה מאוד ומסבירה בסבלנות על הטיפול שמתבצע. עשינו טיפול בוטוקס.',
  },
  {
    name: 'מירב אדן',
    text: 'הגעתי לשירן אחרי המון המלצות ששמעתי עליה. עשיתי בוטוקס ושפתיים. חזרתי עשר שנים אחורה.',
  },
  {
    name: 'לירונה',
    text: 'אני רוצה להמליץ מכל הלב על הטיפול של דוקטור שירן ❤️ עשיתי אצלה בוטוקס ועיצוב שפתיים.',
  },
  {
    name: 'מרינה אברהם',
    text: 'ממליצה מכל הלב! ❤️ עשיתי מילוי שפתיים ובוטוקס ואני ממש מרוצה מהתוצאה! ❤️',
  },
]

document.getElementById('results-grid').innerHTML = beforeAfter.map((item, i) => `
  <article class="result-card" data-index="${i}" tabindex="0" role="button" aria-label="${item.title}">
    <div class="result-card__image-wrap">
      <img src="${item.image}" alt="${item.title} — לפני ואחרי" loading="lazy" />
    </div>
    <div class="result-card__body">
      <span class="result-card__tag">${item.tag}</span>
      <h3 class="result-card__title">${item.title}</h3>
    </div>
  </article>
`).join('')

document.getElementById('treatments-grid').innerHTML = treatments.map((t, i) => `
  <article class="treatment-card" data-index="${i}" tabindex="0" role="button" aria-label="פרטים על ${t.title}">
    <div class="treatment-card__image-wrap"><img src="${t.image}" alt="${t.title}" loading="lazy" /></div>
    <div class="treatment-card__body">
      <h3>${t.title}</h3>
      <p>${t.description}</p>
      <span class="treatment-card__more">לחצי לפרטים ←</span>
    </div>
  </article>
`).join('')

const treatmentModal = document.getElementById('treatment-modal')
const treatmentModalBody = document.getElementById('treatment-modal-body')

function openTreatmentModal(index) {
  const t = treatments[index]
  if (!t || !treatmentModal) return
  treatmentModalBody.innerHTML = `
    <p class="treatment-modal__label">הטיפול</p>
    <h2 class="treatment-modal__title" id="treatment-modal-title">${t.title}</h2>
    <p class="treatment-modal__lead">${t.description}</p>
    <dl class="treatment-modal__details">
      <div>
        <dt>למי זה מתאים</dt>
        <dd>${t.suitable}</dd>
      </div>
      <div>
        <dt>באילו אזורים בפנים</dt>
        <dd>${t.areas}</dd>
      </div>
      <div>
        <dt>איך תרגישי בסוף</dt>
        <dd>${t.feelAfter}</dd>
      </div>
      <div>
        <dt>פירוט התהליך</dt>
        <dd>${t.process}</dd>
      </div>
      <div>
        <dt>כאבים והחלמה</dt>
        <dd>${t.painRecovery}</dd>
      </div>
    </dl>
    <a href="/booking/" class="btn btn-primary treatment-modal__cta">אני רוצה להרגיש יותר יפה</a>
  `
  treatmentModal.hidden = false
  document.body.style.overflow = 'hidden'
}

function closeTreatmentModal() {
  if (!treatmentModal) return
  treatmentModal.hidden = true
  document.body.style.overflow = ''
}

document.querySelectorAll('.treatment-card').forEach((card) => {
  const open = () => openTreatmentModal(Number(card.dataset.index))
  card.addEventListener('click', open)
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      open()
    }
  })
})

document.getElementById('treatment-modal-close')?.addEventListener('click', closeTreatmentModal)
treatmentModal?.addEventListener('click', (e) => {
  if (e.target === treatmentModal) closeTreatmentModal()
})

document.getElementById('faq-list').innerHTML = faqs.map((item, i) => `
  <div class="faq__item" data-index="${i}">
    <button class="faq__question" aria-expanded="false">
      <span>${item.question}</span>
      <span class="faq__icon">+</span>
    </button>
    <div class="faq__answer"><p>${item.answer}</p></div>
  </div>
`).join('')

document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq__item')
    const isOpen = item.classList.contains('faq__item--open')
    document.querySelectorAll('.faq__item').forEach(el => {
      el.classList.remove('faq__item--open')
      el.querySelector('.faq__icon').textContent = '+'
      el.querySelector('.faq__question').setAttribute('aria-expanded', 'false')
    })
    if (!isOpen) {
      item.classList.add('faq__item--open')
      item.querySelector('.faq__icon').textContent = '−'
      btn.setAttribute('aria-expanded', 'true')
    }
  })
})

window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('header--scrolled', window.scrollY > 40)
})

const burger = document.getElementById('burger')
const nav = document.getElementById('nav')
burger.addEventListener('click', () => {
  burger.classList.toggle('header__burger--open')
  nav.classList.toggle('header__nav--open')
})
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('header__burger--open')
  nav.classList.remove('header__nav--open')
}))

// lightbox
const lightbox = document.getElementById('lightbox')
const lightboxImg = document.getElementById('lightbox-img')
const lightboxCaption = document.getElementById('lightbox-caption')
let lightboxIndex = 0

function openLightbox(index) {
  lightboxIndex = index
  const item = beforeAfter[index]
  lightboxImg.src = item.image
  lightboxImg.alt = item.title
  lightboxCaption.textContent = `${item.tag} · ${item.title}`
  lightbox.hidden = false
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightbox.hidden = true
  document.body.style.overflow = ''
}

function navigateLightbox(dir) {
  lightboxIndex = (lightboxIndex + dir + beforeAfter.length) % beforeAfter.length
  openLightbox(lightboxIndex)
}

document.querySelectorAll('.result-card').forEach(card => {
  card.addEventListener('click', () => openLightbox(Number(card.dataset.index)))
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      openLightbox(Number(card.dataset.index))
    }
  })
})

document.getElementById('lightbox-close').addEventListener('click', closeLightbox)
document.getElementById('lightbox-prev').addEventListener('click', () => navigateLightbox(1))
document.getElementById('lightbox-next').addEventListener('click', () => navigateLightbox(-1))
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox() })
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (!treatmentModal?.hidden) closeTreatmentModal()
    if (!lightbox.hidden) closeLightbox()
  }
  if (lightbox.hidden) return
  if (e.key === 'ArrowRight') navigateLightbox(1)
  if (e.key === 'ArrowLeft') navigateLightbox(-1)
})

// Reviews — loaded from server so everyone sees them
function renderReviews(reviews) {
  const list = document.getElementById('reviews-list')
  const empty = document.getElementById('reviews-empty')

  if (!reviews.length) {
    list.innerHTML = ''
    empty.hidden = false
    return
  }

  empty.hidden = true
  list.innerHTML = reviews.map(r => `
    <article class="review-card">
      <p class="review-card__text">"${r.text}"</p>
      <p class="review-card__author">— ${r.name}</p>
    </article>
  `).join('')
}

async function loadReviewsFromServer() {
  try {
    const res = await fetch('/.netlify/functions/reviews-list')
    if (!res.ok) throw new Error('bad status')
    const data = await res.json()
    const reviews = Array.isArray(data.reviews) ? data.reviews : []
    if (reviews.length) {
      renderReviews(reviews)
      return
    }
  } catch {
    // fallback below
  }
  renderReviews(FALLBACK_REVIEWS)
}

document.getElementById('review-form').addEventListener('submit', async (e) => {
  e.preventDefault()
  const nameInput = document.getElementById('review-name')
  const textInput = document.getElementById('review-text')
  const name = nameInput.value.trim()
  const text = textInput.value.trim()
  const submitBtn = e.target.querySelector('button[type="submit"]')

  if (!name || !text) return

  submitBtn.disabled = true
  submitBtn.textContent = 'מפרסם...'

  try {
    const res = await fetch('/.netlify/functions/reviews-submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, review: text }),
    })
    if (!res.ok) throw new Error('submit failed')

    nameInput.value = ''
    textInput.value = ''
    const success = document.getElementById('review-success')
    success.hidden = false
    setTimeout(() => { success.hidden = true }, 4000)
    await loadReviewsFromServer()

    // Keep Netlify Forms as backup archive
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'form-name': 'reviews', name, review: text }),
    }).catch(() => {})
  } catch {
    alert('לא הצלחנו לפרסם את הביקורת. נסי שוב בעוד רגע.')
  } finally {
    submitBtn.disabled = false
    submitBtn.textContent = 'פרסום ביקורת'
  }
})

loadReviewsFromServer()

// Booking form
const bookingForm = document.getElementById('booking-form')
const bookingSubmit = document.getElementById('booking-submit')
const bookingSuccess = document.getElementById('booking-success')
const bookingError = document.getElementById('booking-error')

bookingForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  bookingSuccess.hidden = true
  bookingError.hidden = true
  bookingSubmit.disabled = true
  bookingSubmit.textContent = 'שולח...'

  const fields = new URLSearchParams()
  for (const [key, value] of new FormData(bookingForm).entries()) {
    const trimmed = String(value).trim()
    if (trimmed) fields.append(key, trimmed)
  }

  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: fields,
    })
    if (!response.ok) throw new Error(`Netlify responded ${response.status}`)
    bookingForm.reset()
    bookingSuccess.hidden = false
  } catch {
    bookingError.hidden = false
  } finally {
    bookingSubmit.disabled = false
    bookingSubmit.textContent = 'שליחת הפרטים'
  }
})
