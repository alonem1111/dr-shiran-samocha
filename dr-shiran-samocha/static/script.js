const treatments = [
  {
    title: 'איכות העור',
    description: 'טיפולים שמחזירים לעור לחות, מרקם נעים וזוהר. מזותרפיה, ויטמינים ופפטידים, לפי מה שהעור שלך באמת צריך.',
    media: [
      { type: 'image', src: 'images/treatments-media/skin-01.jpg' },
    ],
    suitable: 'אם העור מרגיש עייף, יבש או בלי זוהר, ואת רוצה להיראות רעננה בלי לשנות את הפנים.',
    areas: 'פנים, צוואר ולפעמים גם מחשוף, לפי מה שמתאים לך.',
    feelAfter: 'העור נעים יותר למגע, עם זוהר עדין. לא דרמה ביום אחד, אלא שיפור שמרגיש טבעי.',
    process: 'קודם מבינים את העור שלך, בוחרים יחד מה נכון, עושים את הטיפול, ואז מקבלת הנחיות פשוטות הביתה.',
    painRecovery: 'בדרך כלל רק אי נוחות קלה. לפעמים אדמומיות ליום או יומיים, ואפשר לחזור לשגרה מיד.',
  },
  {
    title: 'בוטוקס',
    description: 'מרכך קמטי הבעה ומרענן את הפנים, בלי להקפיא את ההבעה ובלי לשנות מי שאת.',
    media: [
      { type: 'image', src: 'images/treatments-media/botox-01.jpg' },
      { type: 'image', src: 'images/treatments-media/botox-02.jpg' },
      { type: 'image', src: 'images/treatments-media/botox-03.jpg' },
      { type: 'video', src: 'images/treatments-media/botox-video.mp4' },
      { type: 'image', src: 'images/treatments-media/botox-04.jpg' },
      { type: 'image', src: 'images/treatments-media/botox-05.jpg' },
      { type: 'image', src: 'images/treatments-media/botox-06.jpg' },
      { type: 'image', src: 'images/treatments-media/botox-07.jpg' },
      { type: 'image', src: 'images/treatments-media/botox-08.jpg' },
      { type: 'image', src: 'images/treatments-media/botox-09.jpg' },
      { type: 'image', src: 'images/treatments-media/botox-10.jpg' },
    ],
    suitable: 'אם את רואה קמטים במצח, בין הגבות או סביב העיניים, או מרגישה שהפנים נראות עייפות או מתוחות יותר ממה שאת מרגישה מבפנים.',
    areas: `
      <p><strong>שליש עליון:</strong> מצח, בין הגבות, רגלי עורב סביב העיניים, וגם קמטוטי אף (באני ליינס).</p>
      <p><strong>שליש אמצעי:</strong> חיוך שחושף חניכיים, הרמת קצה האף, וצמצום התרחבות יתר של הנחיריים בהבעות.</p>
      <p><strong>שליש תחתון וצוואר:</strong> סנטר תפוז או גומות בסנטר, קמטוטים עדינים מעל ומתחת לשפתיים, קפלי מריונטה וזוויות פה שנמשכות למטה, ורצועות בצוואר עם חידוד עדין של קו הלסת.</p>
    `,
    feelAfter: 'תוך כמה ימים ההבעה נראית רגועה יותר. את עדיין נראית כמו את, רק יותר רעננה ונחה.',
    process: 'מדברות על מה שמפריע לך, מסמנות נקודות, עושות הזרקות עדינות, ומקבלת כמה הנחיות קצרות להמשך היום.',
    painRecovery: 'דקירות קלות לכמה רגעים, בלי החלמה אמיתית. אפשר לחזור לעבודה באותו יום, רק בלי לעסות את האזור כמה שעות.',
  },
  {
    title: 'עיצוב שפתיים',
    description: 'הדגשה עדינה של השפתיים, עם שמירה על פרופורציות טבעיות שמתאימות לפנים שלך.',
    media: [
      { type: 'image', src: 'images/treatments-media/lips-07.jpg' },
      { type: 'image', src: 'images/treatments-media/lips-01.jpg' },
      { type: 'image', src: 'images/treatments-media/lips-05.jpg' },
      { type: 'video', src: 'images/treatments-media/lips-video.mp4' },
      { type: 'image', src: 'images/treatments-media/lips-02.jpg' },
      { type: 'image', src: 'images/treatments-media/lips-06.jpg' },
      { type: 'image', src: 'images/treatments-media/lips-03.jpg' },
      { type: 'image', src: 'images/treatments-media/lips-04.jpg' },
    ],
    suitable: 'אם את רוצה שפתיים מודגשות בעדינות, לתקן אסימטריה, או להחזיר נפח שנעלם, בלי מראה מוגזם.',
    areas: 'שפה עליונה ותחתונה, קו המתאר, ולפעמים גם האזור מעל השפה לפי מבנה הפנים.',
    feelAfter: 'שפתיים רכות ומלאות יותר, שמשתלבות עם הפנים. הרבה נשים מרגישות בטוחות יותר בחיוך ובתמונות.',
    process: 'מחליטות יחד על הצורה והכמות, עושות אלחוש אם צריך, מזריקות בעדינות ובודקות סימטריה לפני שאת הולכת.',
    painRecovery: 'עם אלחוש זה נסבל מאוד. נפיחות או רגישות ליום או יומיים זה לגמרי נורמלי. התוצאה האמיתית נראית אחרי שהנפיחות יורדת.',
  },
  {
    title: 'פיסול אף',
    description: 'שיפור עדין של פרופיל האף בלי ניתוח. אפשר ליישר גבנון קטן, לרכך קצה או לאזן אסימטריה.',
    media: [
      { type: 'image', src: 'images/treatments-media/nose-01.jpg' },
    ],
    suitable: 'אם משהו קטן בפרופיל מפריע לך, ואת רוצה שיפור בלי ניתוח ובלי שבוע של החלמה.',
    areas: 'גשר האף, קצה האף, ולפעמים נקודות נוספות שעוזרות לפרופיל להיראות מאוזן יותר.',
    feelAfter: 'הפרופיל נראה חלק יותר. הרבה פעמים פתאום פחות חושבות על האף, כי הוא פשוט משתלב יפה.',
    process: 'מסתכלות על הפרופיל ביחד, מתכננות מה נכון, מזריקות בעדינות ובודקות מכל הזוויות.',
    painRecovery: 'אי נוחות קלה בזמן הטיפול. לפעמים רגישות או נפיחות קלה ליום או יומיים, בלי החלמה ארוכה.',
  },
  {
    title: 'פיסול פנים עדין',
    description: 'חידוד עדין של לחיים, קו לסת וסנטר, כדי שהפנים ייראו מוגדרות יותר ועדיין טבעיות.',
    media: [
      { type: 'image', src: 'images/treatments-media/jawline-01.jpg' },
      { type: 'image', src: 'images/treatments-media/jawline-02.jpg' },
    ],
    suitable: 'אם מרגיש לך שהפנים איבדו הגדרה, שהלחיים שקעו, או שאת רוצה קו לסת וסנטר ברורים יותר.',
    areas: 'לחיים, קו לסת, סנטר ולפעמים גם רקות, לפי מבנה הפנים שלך.',
    feelAfter: 'הפנים נראות מוגדרות ובריאות יותר. לא שינוי דרמטי, פשוט גרסה יותר חדה ומטופחת של עצמך.',
    process: 'ממפים את הפנים, בוחרים איפה באמת צריך הדגשה, מזריקים בהדרגה ובודקים איזון.',
    painRecovery: 'דקירות ונפיחות קלה אפשריות ליום עד שלושה. רוב הבנות חוזרות לשגרה מיד.',
  },
  {
    title: 'ביוסטימולטורים',
    description: 'טיפול שמעודד את העור לייצר קולגן בעצמו, מחזיר נפח ומשפר איכות עור לאורך זמן.',
    media: [
      { type: 'image', src: 'https://placehold.co/600x400/E8DFD4/8B7355?text=' + encodeURIComponent('ביוסטימולטורים') },
    ],
    suitable: 'אם את רוצה מראה רענן יותר, עם שיפור הדרגתי בנפח ובאיכות העור, ולא רק מילוי נקודתי.',
    areas: 'לחיים, אזורים שאיבדו נפח, וקווי פנים שצריכים תמיכה עדינה, לפי התאמה אישית.',
    feelAfter: 'עם הזמן העור מרגיש עבה ואיכותי יותר, והפנים נראות רעננות בלי מראה עשוי.',
    process: 'מדברות על המטרה, בוחרות אזורים, מזריקות במדויק, ומסבירות מה לצפות בשבועות שאחרי.',
    painRecovery: 'אי נוחות קלה. לפעמים נפיחות או שטף דם קטן לכמה ימים. לרוב בלי החלמה ארוכה.',
  },
]

const faqs = [
  { question: 'למי מיועדים טיפולי אסתטיקה רפואית?', answer: 'לנשים ולגברים שרוצים לרענן את הפנים בעדינות, בלי לשנות את תווי הפנים. המטרה היא מראה טבעי, מדויק ובטוח.' },
  { question: 'האם הטיפולים מתאימים גם למי שזו הפעם הראשונה?', answer: 'בטח. מתחילים לאט, עם שיחה והתאמה אישית. הפגישה הראשונה היא להכיר, לשאול שאלות ולהבין מה נכון לך, בלי לחץ.' },
  { question: 'מה ההבדל בין בוטוקס לביוסטימולטורים?', answer: 'בוטוקס מרכך שרירים שיוצרים קמטי הבעה, כמו במצח. ביוסטימולטורים מעודדים ייצור קולגן ועוזרים להחזיר נפח ואיכות עור לאורך זמן.' },
  { question: 'כמה זמן מחזיקים הטיפולים?', answer: 'בוטוקס בדרך כלל בין 3 ל־6 חודשים. ביוסטימולטורים נבנים בהדרגה וההשפעה יכולה להחזיק חודשים ארוכים יותר, לפי סוג הטיפול והעור. באיכות עור זה משתנה לפי התוכנית.' },
  { question: 'מתי רואים תוצאות?', answer: 'בבוטוקס רואים שינוי תוך כמה ימים. בביוסטימולטורים השיפור מורגש בהדרגה. בטיפולי עור הזוהר נבנה לאורך סדרת טיפולים.' },
  { question: 'האם הטיפולים כואבים?', answer: 'רוב הזמן זו דקירה קלה בלבד. אם צריך, משתמשים באלחוש. הגישה של ד״ר שירן היא עדינה ונעימה ככל האפשר.' },
  { question: 'האם יש זמן החלמה?', answer: 'בדרך כלל לא. לפעמים יש נפיחות או אדמומיות קלה ליום או יומיים, ואפשר לחזור לשגרה כמעט מיד.' },
  { question: 'האם ניתן לשלב מספר טיפולים באותו מפגש?', answer: 'כן, לפעמים. למשל בוטוקס עם ביוסטימולטורים או טיפול עור, רק אם זה באמת מתאים אחרי הערכה מקצועית.' },
  { question: 'מי לא יכול לעבור טיפולים?', answer: 'לא מומלץ בהריון או בהנקה, ובמקרים של מחלות אוטואימוניות פעילות, זיהומים או אלרגיה לחומרים. תמיד עושים הערכה רפואית לפני.' },
  { question: 'מה כולל מפגש ייעוץ?', answer: 'היכרות, שאלון רפואי, הסתכלות על מבנה הפנים, בניית תוכנית שמתאימה לך ושיחה כנה על ציפיות ותוצאות.' },
  { question: 'האם אפשר רק להתייעץ בלי להתחייב לטיפול?', answer: 'כן. אפשר לבוא רק לדבר ולהבין מה האפשרויות, בלי להתחייב לכלום.' },
  { question: 'איך נקבעת תוכנית הטיפול?', answer: 'ביחד. מסתכלות על הפנים, על מה שמפריע לך, ובונות תוכנית שמרגישה לך נכונה.' },
  { question: 'אני מפחדת מהזרקות, יש אופציות עדינות?', answer: 'כן. מתאימים את הקצב ואת רמת הרגישות שלך, ועם אלחוש אם צריך. אפשר להתחיל בעדינות ממש.' },
  { question: 'איך אפשר ליצור קשר הכי מהר?', answer: 'הכי מהיר לקבוע תור באתר, או להשאיר פרטים בטופס ואחזור אליך בהקדם.' },
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

const HERO_PHOTOS = Array.from({ length: 14 }, (_, i) =>
  `images/hero-work/work-${String(i + 1).padStart(2, '0')}.jpg`
)

const heroBg = document.getElementById('hero-bg')
if (heroBg) {
  heroBg.innerHTML = HERO_PHOTOS.map((src, i) =>
    `<img class="hero__photo${i === 0 ? ' is-active' : ''}" src="${src}" alt="">`
  ).join('') + '<div class="hero__wash"></div>'

  const heroSlides = [...heroBg.querySelectorAll('.hero__photo')]
  let heroIndex = 0
  setInterval(() => {
    heroSlides[heroIndex].classList.remove('is-active')
    heroIndex = (heroIndex + 1) % heroSlides.length
    heroSlides[heroIndex].classList.add('is-active')
  }, 5000)
}

const SLIDE_MS = 4000

function slideHtml(item, title, isActive) {
  const active = isActive ? ' is-active' : ''
  if (item.type === 'video') {
    return `<div class="treatment-card__slide${active}"><video src="${item.src}" muted playsinline preload="metadata" aria-label="${title}"></video></div>`
  }
  return `<div class="treatment-card__slide${active}"><img src="${item.src}" alt="${title}" loading="lazy" /></div>`
}

function startCardSlideshow(wrap) {
  const slides = [...wrap.querySelectorAll('.treatment-card__slide')]
  if (slides.length < 2) return

  let index = 0
  let timer = null

  function show(next) {
    clearTimeout(timer)
    slides[index].classList.remove('is-active')
    const prevVideo = slides[index].querySelector('video')
    if (prevVideo) {
      prevVideo.pause()
      prevVideo.currentTime = 0
    }

    index = next
    slides[index].classList.add('is-active')
    const video = slides[index].querySelector('video')
    if (video) {
      const goNext = () => schedule((index + 1) % slides.length)
      video.onended = goNext
      const play = video.play()
      if (play && typeof play.catch === 'function') play.catch(() => schedule((index + 1) % slides.length, SLIDE_MS))
    } else {
      schedule((index + 1) % slides.length, SLIDE_MS)
    }
  }

  function schedule(next, delay = 0) {
    clearTimeout(timer)
    timer = setTimeout(() => show(next), delay)
  }

  const firstVideo = slides[0].querySelector('video')
  if (firstVideo) {
    firstVideo.onended = () => show(1 % slides.length)
    const play = firstVideo.play()
    if (play && typeof play.catch === 'function') play.catch(() => schedule(1, SLIDE_MS))
  } else {
    schedule(1, SLIDE_MS)
  }
}

document.getElementById('treatments-grid').innerHTML = treatments.map((t, i) => {
  const media = t.media && t.media.length ? t.media : []
  const slides = media.map((item, mi) => slideHtml(item, t.title, mi === 0)).join('')
  return `
  <article class="treatment-card" data-index="${i}" tabindex="0" role="button" aria-label="פרטים על ${t.title}">
    <div class="treatment-card__image-wrap">${slides}</div>
    <div class="treatment-card__body">
      <h3>${t.title}</h3>
      <p>${t.description}</p>
      <span class="treatment-card__more">לחצי לפרטים →</span>
    </div>
  </article>`
}).join('')

document.querySelectorAll('.treatment-card__image-wrap').forEach(startCardSlideshow)

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
        <dd class="treatment-modal__areas">${t.areas}</dd>
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
    <a href="/booking/" class="btn btn-primary treatment-modal__cta">שירן בואי נתאם ייעוץ</a>
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

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !treatmentModal?.hidden) closeTreatmentModal()
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
      <p class="review-card__author">${r.name}</p>
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
