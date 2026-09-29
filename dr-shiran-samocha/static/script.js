const beforeAfter = [
  { image: 'images/before-after/forehead-lines.png', tag: 'בוטוקס', title: 'החלקת קמטי מצח' },
  { image: 'images/before-after/forehead-frown.png', tag: 'בוטוקס', title: 'החלקת קמטי הבעה' },
  { image: 'images/before-after/lower-face.png', tag: 'עיצוב שפתיים', title: 'עיצוב שפתיים' },
  { image: 'images/before-after/jawline.png', tag: 'פיסול פנים עדין', title: 'חידוד קו לסת וסנטר' },
  { image: 'images/before-after/profile.png', tag: 'פיסול אף', title: 'פיסול אף' },
]

const treatments = [
  { title: 'איכות העור', description: 'טיפולים מתקדמים לשיפור מרקם העור, החזרת לחות וזוהר טבעי. מזותרפיה, ויטמינים, חומצות אמינו ופפטידים — לעור בריא, קורן ורענן.', image: 'https://placehold.co/600x400/E8DFD4/8B7355?text=Skin+Quality' },
  { title: 'בוטוקס', description: 'החלקת קמטי הבעה בעדינות — במצח, בין הגבות וסביב העיניים. תוצאה טבעית שמרעננת את המראה מבלי לשנות את תווי הפנים.', image: 'https://placehold.co/600x400/E8DFD4/8B7355?text=Botox' },
  { title: 'עיצוב שפתיים', description: 'הדגשה והעצמה עדינה של השפתיים בחומצה היאלורונית. פיסול מדויק שמשמר פרופורציות הרמוניות ומעניק מראה טבעי ואלגנטי.', image: 'https://placehold.co/600x400/E8DFD4/8B7355?text=Lip+Design' },
  { title: 'פיסול אף', description: 'שיפור פרופיל האף ללא ניתוח — תיקון גבה, קצה או אסימטריה בעזרת חומצה היאלורונית. תוצאה מיידית, עדינה ומותאמת אישית.', image: 'https://placehold.co/600x400/E8DFD4/8B7355?text=Nose+Sculpting' },
  { title: 'פיסול פנים עדין', description: 'הדגשת עצמות לחיים, קו לסת וסנטר ליצירת מראה הרמוני ומחודד. גישה עדינה שמדגישה את היופי הטבעי שלך.', image: 'https://placehold.co/600x400/E8DFD4/8B7355?text=Facial+Contouring' },
  { title: 'חומצה היאלורונית', description: 'מילוי קמטים, החזרת נפח והידרציה לעור הפנים. חומר בטוח וטבעי שמעניק תוצאה מיידית ומחמיאה.', image: 'https://placehold.co/600x400/E8DFD4/8B7355?text=Hyaluronic+Acid' },
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
  { question: 'איך אפשר ליצור קשר הכי מהר?', answer: 'הכי מהיר להשאיר פרטים בטופס קביעת התור באתר — אחזור אליכם בהקדם. אפשר כמובן גם להתקשר ישירות.' },
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

document.getElementById('treatments-grid').innerHTML = treatments.map(t => `
  <article class="treatment-card">
    <div class="treatment-card__image-wrap"><img src="${t.image}" alt="${t.title}" loading="lazy" /></div>
    <div class="treatment-card__body"><h3>${t.title}</h3><p>${t.description}</p></div>
  </article>
`).join('')

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

// Lightbox
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
  if (lightbox.hidden) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') navigateLightbox(1)
  if (e.key === 'ArrowLeft') navigateLightbox(-1)
})

// Reviews
const REVIEWS_KEY = 'dr-shiran-reviews'

function loadReviews() {
  try {
    return JSON.parse(localStorage.getItem(REVIEWS_KEY) || '[]')
  } catch {
    return []
  }
}

function saveReviews(reviews) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews))
}

function renderReviews() {
  const reviews = loadReviews()
  const list = document.getElementById('reviews-list')
  const empty = document.getElementById('reviews-empty')

  if (reviews.length === 0) {
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

document.getElementById('review-form').addEventListener('submit', async (e) => {
  e.preventDefault()
  const nameInput = document.getElementById('review-name')
  const textInput = document.getElementById('review-text')
  const name = nameInput.value.trim()
  const text = textInput.value.trim()

  if (!name || !text) return

  const reviews = loadReviews()
  reviews.unshift({ name, text, date: new Date().toISOString() })
  saveReviews(reviews)
  renderReviews()

  nameInput.value = ''
  textInput.value = ''

  const success = document.getElementById('review-success')
  success.hidden = false
  setTimeout(() => { success.hidden = true }, 4000)

  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'form-name': 'reviews',
        name,
        review: text,
      }),
    })
  } catch {
    // local display still works without Netlify
  }
})

renderReviews()

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

  // Empty fields would show up as blank rows in the notification email.
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
