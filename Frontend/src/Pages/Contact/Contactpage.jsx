import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Contactpage.module.css'
import {
  FiPhone, FiMail, FiMapPin, FiClock, FiMessageCircle,
  FiCheckCircle, FiArrowRight, FiGlobe, FiLinkedin,
  FiTwitter, FiInstagram, FiYoutube, FiChevronDown,
  FiZap, FiShield, FiUsers, FiAward, FiHeadphones,
  FiStar, FiTrendingUp, FiBriefcase, FiCode, FiCloud
} from 'react-icons/fi'

// ── Wave Canvas ──────────────────────────────────────────────
const WaveCanvas = () => {
  const ref = useRef(null)
  const raf = useRef(null)
  const t   = useRef(0)

  useEffect(() => {
    const cv  = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    let W, H

    const resize = () => {
      W = cv.width  = cv.offsetWidth
      H = cv.height = cv.offsetHeight
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const waves = [
        { yR: 0.22, amp: 36, freq: 0.009, sp: 0.016, a: 0.12 },
        { yR: 0.45, amp: 28, freq: 0.012, sp: 0.022, a: 0.09 },
        { yR: 0.65, amp: 22, freq: 0.015, sp: 0.030, a: 0.07 },
        { yR: 0.82, amp: 16, freq: 0.010, sp: 0.018, a: 0.06 },
      ]
      waves.forEach(({ yR, amp, freq, sp, a }) => {
        ctx.beginPath()
        ctx.moveTo(0, H * yR)
        for (let x = 0; x <= W; x += 3) {
          const y = H * yR
            + Math.sin(x * freq + t.current * sp * 60) * amp
            + Math.sin(x * freq * 1.7 + t.current * sp * 35) * (amp * 0.35)
          ctx.lineTo(x, y)
        }
        ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath()
        ctx.fillStyle = `rgba(37,99,235,${a})`
        ctx.fill()
      })
      // dots
      for (let i = 0; i < 20; i++) {
        const x = (i * 143.7 + t.current * 9) % W
        const y = (i * 91.3  + t.current * 6) % H
        ctx.beginPath()
        ctx.arc(x, y, 1.4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(59,130,246,0.22)'
        ctx.fill()
      }
      t.current += 0.016
      raf.current = requestAnimationFrame(draw)
    }

    resize(); draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={ref} className={styles.waveCanvas} />
}

// ── Data ─────────────────────────────────────────────────────
const OFFICES = [
  {
    city: 'UK',
    country: 'UK (HQ)',
    address: '6 Headingley Mount, headingley, Leeds, LS63EL',
    phone: '+44 7713 675964',
    email: 'info.intechzone@gmail.com',
    hours: 'Mon–Fri: 9 AM – 6 PM',
    icon: '🏢',
    primary: true,
  },
  {
  city: 'Dubai',
  country: 'United Arab Emirates',
  address: 'Dubai Internet City\nAl Sufouh 2\nDubai, UAE',
  phone: '+916232685820',
  email: 'info.intechzone@gmail.com',
  hours: 'Mon–Fri: 9 AM – 6 PM',
  icon: '🏙️',
  primary: false,
},
  {
    city: 'Indore',
    country: 'India',
    address: 'P13-14, Metro Tower, Vijay Nagar, Indore (M.P.)',
    phone: '+916232685820',
    email: 'info.intechzone@gmail.com',
    hours: 'Sun–Thu: 9 AM – 6 PM',
    icon: '🌍',
    primary: false,
  },
]

const SERVICES_LIST = [
  { icon: FiCode,  label: 'Web Development',   path: '/services/web-development' },
  { icon: FiCloud, label: 'Cloud Solutions',    path: '/services/cloud-solutions' },
  { icon: FiBriefcase, label: 'IT Consulting',  path: '/services/it-consulting' },
  { icon: FiShield,  label: 'Cybersecurity',    path: '/services/cybersecurity' },
  { icon: FiTrendingUp, label: 'Digital Marketing', path: '/services/digital-marketing' },
  { icon: FiUsers, label: 'IT Training',        path: '/services/it-training' },
]

const FAQ = [
  { q: 'How quickly do you respond to inquiries?', a: 'We respond to all inquiries within 24 business hours. For urgent matters, call us directly and our team will assist you immediately.' },
  { q: 'Do you offer free consultations?', a: 'Yes! We offer a free 30-minute discovery call to understand your requirements and explore how we can help your business grow.' },
  { q: 'Can you work with international clients?', a: 'Absolutely. We work with clients across 15+ countries. Our team accommodates different time zones and communication preferences.' },
  { q: 'What is your typical project timeline?', a: 'Timelines vary by scope. A typical website takes 4–8 weeks; a complex enterprise app may take 3–6 months. We share a detailed roadmap after the discovery phase.' },
  { q: 'Do you provide post-launch support?', a: 'Yes. All our projects include a 30-day post-launch support window. Ongoing maintenance and AMC plans are also available.' },
  { q: 'What industries do you specialize in?', a: 'We have deep expertise in fintech, e-commerce, healthcare, SaaS, education, and manufacturing. Our team adapts quickly to any industry domain.' },
]

const TRUST = [
  { icon: FiAward,      val: '15+',   label: 'Industry Awards' },
  { icon: FiUsers,      val: '500+',  label: 'Happy Clients' },
  { icon: FiStar,       val: '4.9',   label: 'Average Rating' },
  { icon: FiHeadphones, val: '24/7',  label: 'Support Available' },
]

const SOCIAL = [
  { icon: FiLinkedin,  href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FiTwitter,   href: 'https://twitter.com',  label: 'Twitter' },
  { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FiYoutube,   href: 'https://youtube.com',  label: 'YouTube' },
]

// ── Component ─────────────────────────────────────────────────
export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i)

  return (
    <div className={styles.page}>

      {/* ══ TRUST STRIP ══════════════════════════════════════ */}
      <section className={styles.trustStrip}>
        <div className={styles.container}>
          <div className={styles.trustGrid}>
            {TRUST.map((t, i) => (
              <div key={i} className={styles.trustItem}>
                <t.icon size={20} className={styles.trustIcon} />
                <span className={styles.trustVal}>{t.val}</span>
                <span className={styles.trustLabel}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OFFICE CARDS ═════════════════════════════════════ */}
      <section className={styles.offices}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.badge}>Our Locations</span>
            <h2 className={styles.sectionTitle}>
              Find Us <span className={styles.blue}>Worldwide</span>
            </h2>
            <p className={styles.sectionDesc}>
              Offices across India and UAE — serving clients in 15+ countries
            </p>
          </div>

          <div className={styles.officeGrid}>
            {OFFICES.map((o, i) => (
              <div key={i} className={`${styles.officeCard} ${o.primary ? styles.officePrimary : ''}`}>
                {o.primary && <div className={styles.hqBadge}><FiZap size={11} /> Headquarters</div>}
                <div className={styles.officeEmoji}>{o.icon}</div>
                <div className={styles.officeCity}>{o.city}</div>
                <div className={styles.officeCountry}>{o.country}</div>
                <div className={styles.officeDivider} />
                <div className={styles.officeRow}>
                  <FiMapPin size={13} className={styles.officeRowIcon} />
                  <span style={{ whiteSpace: 'pre-line' }}>{o.address}</span>
                </div>
                <div className={styles.officeRow}>
                  <FiPhone size={13} className={styles.officeRowIcon} />
                  <a href={`tel:${o.phone}`} className={styles.officeLink}>{o.phone}</a>
                </div>
                <div className={styles.officeRow}>
                  <FiMail size={13} className={styles.officeRowIcon} />
                  <a href={`mailto:${o.email}`} className={styles.officeLink}>{o.email}</a>
                </div>
                <div className={styles.officeRow}>
                  <FiClock size={13} className={styles.officeRowIcon} />
                  <span>{o.hours}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MAP + SERVICES ═══════════════════════════════════ */}
      <section className={styles.mapSection}>
        <div className={styles.container}>
          <div className={styles.mapSplit}>

            {/* Map Embed */}
            <div className={styles.mapWrap}>
              <div className={styles.mapHeader}>
                <FiMapPin size={16} className={styles.blue} />
                <span className={styles.mapLabel}>Bhopal HQ — MP Nagar, Zone-II</span>
              </div>
              <iframe
                className={styles.mapIframe}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.3!2d77.4385!3d23.2320!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDE0JzE1LjIiTiA3N8KwMjYnMTguNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Intech Zone HQ"
              />
            </div>

            {/* Services Quick Links */}
            <div className={styles.servicesPanel}>
              <span className={styles.badge}>Quick Links</span>
              <h3 className={styles.servicesPanelTitle}>
                Our <span className={styles.blue}>Services</span>
              </h3>
              <p className={styles.servicesPanelDesc}>
                Explore what we do best — click a service to learn more.
              </p>
              <div className={styles.servicesList}>
                {SERVICES_LIST.map((s, i) => (
                  <Link key={i} to={s.path} className={styles.serviceItem}>
                    <div className={styles.serviceItemIcon}>
                      <s.icon size={16} />
                    </div>
                    <span className={styles.serviceItemLabel}>{s.label}</span>
                    <FiArrowRight size={14} className={styles.serviceItemArrow} />
                  </Link>
                ))}
              </div>
              <Link to="/services" className={styles.allServicesBtn}>
                View All Services <FiArrowRight size={14} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════════ */}
      <section className={styles.faq}>
        <WaveCanvas />
        <div className={styles.container}>
          <div className={styles.faqSplit}>

            <div className={styles.faqLeft}>
              <span className={styles.badge}>FAQ</span>
              <h2 className={styles.sectionTitle}>
                Got <span className={styles.blue}>Questions?</span>
              </h2>
              <p className={styles.sectionDesc} style={{ marginBottom: 28 }}>
                Everything you need to know before reaching out.
                Can't find your answer? Chat with us directly.
              </p>
              <div className={styles.faqContactBox}>
                <FiMessageCircle size={22} className={styles.blue} />
                <div>
                  <div className={styles.faqContactTitle}>Still have questions?</div>
                  <div className={styles.faqContactSub}>Our team replies within 24 hours</div>
                </div>
                <a href="mailto:hello@intechzone.in" className={styles.faqContactBtn}>
                  Email Us
                </a>
              </div>

              {/* Social */}
              <div className={styles.socialRow}>
                {SOCIAL.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className={styles.socialIcon} aria-label={s.label}>
                    <s.icon size={17} />
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.faqList}>
              {FAQ.map((item, i) => (
                <div
                  key={i}
                  className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ''}`}
                >
                  <button
                    className={styles.faqQ}
                    onClick={() => toggleFaq(i)}
                  >
                    <span>{item.q}</span>
                    <FiChevronDown
                      size={16}
                      className={`${styles.faqChevron} ${openFaq === i ? styles.faqChevronOpen : ''}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className={styles.faqA}>{item.a}</div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

     

    </div>
  )
}