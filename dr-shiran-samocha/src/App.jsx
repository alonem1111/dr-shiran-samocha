import { useState, useEffect } from 'react'
import { site, about, treatments, beforeAfter, faqs } from './data/content'
import './App.css'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#about', label: 'עליי' },
    { href: '#treatments', label: 'טיפולים' },
    { href: '#results', label: 'לפני ואחרי' },
    { href: '#reviews', label: 'ביקורות' },
    { href: '#faq', label: 'שאלות נפוצות' },
    { href: '#contact', label: 'צור קשר' },
  ]

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <a href="#" className="header__logo">
          <img src={site.logo} alt={`${site.nameEn} — ${site.specialtyEn}`} className="header__logo-img" />
        </a>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>

        <a href="/booking/" className="btn btn-primary header__cta">
          קביעת תור
        </a>

        <button
          className={`header__burger ${menuOpen ? 'header__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="תפריט"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" />
      <div className="container hero__content fade-in">
        <img src={site.logo} alt={`${site.nameEn} — ${site.specialtyEn}`} className="hero__logo" />
        <p className="hero__tagline-he">{site.taglineHe}</p>
        <div className="hero__actions">
          <a href="/booking/" className="btn btn-primary">
            קביעת תור
          </a>
          <a href="#treatments" className="btn btn-outline">
            הטיפולים שלי
          </a>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        <div className="about__image-wrap">
          <img
            src={site.aboutImage}
            alt="ד״ר שירן סמוכה בטיפול בקליניקה"
            className="about__image"
          />
          <div className="about__image-accent" />
          <p className="about__image-caption">ד״ר שירן סמוכה בטיפול בקליניקה</p>
        </div>
        <div className="about__text">
          <p className="section-label">קצת עליי</p>
          <h2 className="section-title">{site.nameEn}</h2>
          {about.split('\n\n').map((p, i) => (
            <p key={i} className="about__paragraph">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

function Treatments() {
  return (
    <section id="treatments" className="section treatments">
      <div className="container">
        <p className="section-label">מה אני מציעה</p>
        <h2 className="section-title">הטיפולים שלי</h2>
        <p className="section-subtitle">
          טיפולי אסתטיקה רפואית מתקדמים, מותאמים אישית לכל מטופל ומטופלת
        </p>
        <div className="treatments__grid">
          {treatments.map((t) => (
            <article key={t.title} className="treatment-card">
              <div className="treatment-card__image-wrap">
                <img src={t.image} alt={t.title} loading="lazy" />
              </div>
              <div className="treatment-card__body">
                <h3>{t.title}</h3>
                <p>{t.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Results() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    if (lightboxIndex === null) {
      document.body.style.overflow = ''
      return
    }
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % beforeAfter.length)
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + beforeAfter.length) % beforeAfter.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex])

  const item = lightboxIndex !== null ? beforeAfter[lightboxIndex] : null

  return (
    <section id="results" className="section results">
      <div className="container">
        <p className="section-label">תוצאות אמיתיות</p>
        <h2 className="section-title">לפני ואחרי</h2>
        <p className="section-subtitle">תוצאות טבעיות ועדינות — כל טיפול מותאם אישית לפי צרכי המטופל</p>
        <div className="results__grid">
          {beforeAfter.map((result, i) => (
            <article
              key={result.image}
              className="result-card"
              onClick={() => setLightboxIndex(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setLightboxIndex(i)
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={result.title}
            >
              <div className="result-card__image-wrap">
                <img src={result.image} alt={`${result.title} — לפני ואחרי`} loading="lazy" />
              </div>
              <div className="result-card__body">
                <span className="result-card__tag">{result.tag}</span>
                <h3 className="result-card__title">{result.title}</h3>
              </div>
            </article>
          ))}
        </div>
        <p className="results__note">* התוצאות עשויות להשתנות בין מטופל למטופל. התמונות מוצגות בהסכמת המטופלים.</p>
      </div>

      {item && (
        <div className="lightbox" onClick={(e) => e.target === e.currentTarget && setLightboxIndex(null)}>
          <button className="lightbox__close" onClick={() => setLightboxIndex(null)} aria-label="סגור">×</button>
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={() => setLightboxIndex((i) => (i + 1) % beforeAfter.length)}
            aria-label="הקודם"
          >
            ‹
          </button>
          <img className="lightbox__img" src={item.image} alt={item.title} />
          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={() => setLightboxIndex((i) => (i - 1 + beforeAfter.length) % beforeAfter.length)}
            aria-label="הבא"
          >
            ›
          </button>
          <p className="lightbox__caption">{item.tag} · {item.title}</p>
        </div>
      )}
    </section>
  )
}

const REVIEWS_KEY = 'dr-shiran-reviews'

function Reviews() {
  const [reviews, setReviews] = useState([])
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    try {
      setReviews(JSON.parse(localStorage.getItem(REVIEWS_KEY) || '[]'))
    } catch {
      setReviews([])
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmedName = name.trim()
    const trimmedText = text.trim()
    if (!trimmedName || !trimmedText) return

    const newReview = { name: trimmedName, text: trimmedText, date: new Date().toISOString() }
    const updated = [newReview, ...reviews]
    setReviews(updated)
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(updated))
    setName('')
    setText('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 4000)

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'reviews',
          name: trimmedName,
          review: trimmedText,
        }),
      })
    } catch {
      // local display still works
    }
  }

  return (
    <section id="reviews" className="section reviews">
      <div className="container">
        <p className="section-label">מה אומרות המטופלות</p>
        <h2 className="section-title">ביקורות</h2>
        <p className="section-subtitle">שתפו את החוויה שלכם — רק שם וחוות דעת, בלי הרשמה</p>

        <div className="reviews__layout">
          <div className="reviews__list-wrap">
            {reviews.length === 0 ? (
              <p className="reviews__empty">עדיין אין ביקורות — תהיו הראשונות לשתף!</p>
            ) : (
              <div className="reviews__list">
                {reviews.map((r, i) => (
                  <article key={`${r.date}-${i}`} className="review-card">
                    <p className="review-card__text">&ldquo;{r.text}&rdquo;</p>
                    <p className="review-card__author">— {r.name}</p>
                  </article>
                ))}
              </div>
            )}
          </div>

          <form className="review-form" onSubmit={handleSubmit}>
            <h3>כתבו ביקורת</h3>
            <label>
              <span>שם</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="השם שלך"
                maxLength={60}
              />
            </label>
            <label>
              <span>חוות דעת</span>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                placeholder="ספרו על החוויה שלכם..."
                rows={4}
                maxLength={500}
              />
            </label>
            <button type="submit" className="btn btn-primary">פרסום ביקורת</button>
            {success && <p className="review-form__note">תודה! הביקורת נוספה בהצלחה.</p>}
          </form>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" className="section faq">
      <div className="container">
        <p className="section-label">שאלות נפוצות</p>
        <h2 className="section-title">כל מה שרציתם לדעת</h2>
        <p className="section-subtitle">
          שאלות ותשובות — אסתטיקה רפואית עם ד״ר שירן סמוכה
        </p>
        <div className="faq__list">
          {faqs.map((item, i) => (
            <div key={i} className={`faq__item ${openIndex === i ? 'faq__item--open' : ''}`}>
              <button
                className="faq__question"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span>{item.question}</span>
                <span className="faq__icon">{openIndex === i ? '−' : '+'}</span>
              </button>
              <div className="faq__answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    const form = e.target

    // Empty fields would show up as blank rows in the notification email.
    const fields = new URLSearchParams()
    for (const [key, value] of new FormData(form).entries()) {
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
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container contact__inner">
        <div className="contact__text">
          <p className="section-label">בואו נדבר</p>
          <h2 className="section-title">קביעת תור</h2>
          <p>
            אפשר לקבוע תור באשף הזימון, או להשאיר פרטים בטופס ואחזור אליכם. אפשר כמובן גם להתקשר ישירות.
          </p>
          <div className="contact__details">
            <a href="/booking/" className="contact__link">
              🗓️ קביעת תור ביומן
            </a>
            <a href={`tel:${site.phone}`} className="contact__link">
              📞 {site.phoneDisplay}
            </a>
          </div>
          <p className="contact__cta-tagline">{site.taglineEn}</p>
        </div>

        <form className="booking-form" name="booking" method="POST" onSubmit={handleSubmit}>
          <input type="hidden" name="form-name" value="booking" />
          <p className="booking-form__bot" hidden>
            <label>
              אל תמלאו שדה זה <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>
          <h3>השאירו פרטים ואחזור אליכם</h3>
          <label>
            <span>שם מלא</span>
            <input type="text" name="שם מלא" required placeholder="השם שלך" maxLength={60} autoComplete="name" />
          </label>
          <label>
            <span>טלפון</span>
            <input
              type="tel"
              name="טלפון"
              required
              placeholder="050-0000000"
              maxLength={20}
              inputMode="tel"
              autoComplete="tel"
            />
          </label>
          <label>
            <span>הטיפול שמעניין אתכם</span>
            <select name="טיפול מבוקש" required defaultValue="">
              <option value="">בחרו טיפול</option>
              <option>ייעוץ והיכרות</option>
              {treatments.map((t) => (
                <option key={t.title}>{t.title}</option>
              ))}
              <option>עדיין לא בטוח/ה — אשמח להתייעץ</option>
            </select>
          </label>
          <label>
            <span>מתי נוח שאחזור אליכם?</span>
            <select name="זמן מועדף" defaultValue="גמיש — בכל שעה">
              <option>גמיש — בכל שעה</option>
              <option>בוקר</option>
              <option>צהריים</option>
              <option>ערב</option>
            </select>
          </label>
          <label>
            <span>הערות (לא חובה)</span>
            <textarea name="הערות" rows={3} maxLength={500} placeholder="משהו שחשוב שאדע מראש?" />
          </label>
          <input type="hidden" name="subject" data-remove-prefix="" value="פנייה חדשה לקביעת תור מהאתר" />
          <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'שולח...' : 'שליחת הפרטים'}
          </button>
          {status === 'success' && (
            <p className="booking-form__note">תודה! הפרטים התקבלו ואחזור אליכם בהקדם.</p>
          )}
          {status === 'error' && (
            <p className="booking-form__error">
              אירעה תקלה בשליחה. אפשר לנסות שוב או להתקשר ל-{site.phoneDisplay}.
            </p>
          )}
          <p className="booking-form__privacy">
            הפרטים נשלחים ישירות לד״ר שירן סמוכה בלבד ואינם מועברים לגורם שלישי.
          </p>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src={site.logo} alt={site.nameEn} className="footer__logo" />
        </div>
        <p className="footer__domain">{site.domain}</p>
        <div className="footer__links">
          <a href={site.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="/booking/">קביעת תור</a>
          <a href={`tel:${site.phone}`}>טלפון</a>
        </div>
        <p className="footer__copy">
          © {new Date().getFullYear()} {site.nameEn} · {site.domain} · כל הזכויות שמורות.
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Treatments />
        <Results />
        <Reviews />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <a href="/booking/" className="book-float">
        קביעת תור
      </a>
    </>
  )
}
