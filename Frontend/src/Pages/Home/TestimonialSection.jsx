import React, { useState, useEffect } from 'react'
import styles from './TestimonialSection.module.css'
import { FaStar, FaStarHalfAlt, FaQuoteRight, FaChevronLeft, FaChevronRight, FaUserCircle } from 'react-icons/fa'
import WaveCanvas from './Wavecanvas'

const TESTIMONIALS = [
  { id: 1,  name: 'Nick Weimann',   position: 'District Directors Representative', company: '',                  rating: 5,   category: 'consulting', date: 'March 2024',    text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.' },
  { id: 2,  name: 'Priya Mehta',    position: 'CEO',                                company: 'TechStart India',   rating: 5,   category: 'web',        date: 'February 2024', text: 'Intech Zone transformed our business with their innovative solutions. Their team helped us launch our platform 2 months ahead of schedule.' },
  { id: 3,  name: 'Amit Kumar',     position: 'CTO',                                company: 'Digital Vibes',    rating: 5,   category: 'cloud',      date: 'January 2024',  text: 'Working with Intech Zone has been a game-changer. Their cloud migration strategy saved us 40% in operational costs while improving performance.' },
  { id: 4,  name: 'Sarah Johnson',  position: 'Product Manager',                    company: 'Innovate Solutions',rating: 5,   category: 'mobile',     date: 'December 2023', text: 'The mobile app developed by Intech Zone exceeded our expectations. User engagement increased by 150% within the first month.' },
  { id: 5,  name: 'Rajesh Sharma',  position: 'Founder',                            company: 'GrowthX',          rating: 4.5, category: 'consulting', date: 'November 2023', text: 'Exceptional IT consulting services. They helped us streamline operations and implement best practices that scaled our business efficiently.' },
  { id: 6,  name: 'Michael Chen',   position: 'IT Director',                        company: 'SecureNet Systems', rating: 5,   category: 'security',   date: 'October 2023',  text: 'Their cybersecurity solutions provided us peace of mind. The team identified vulnerabilities and implemented robust security measures.' },
  { id: 7,  name: 'Neha Gupta',     position: 'Marketing Head',                     company: 'BrandBoost',        rating: 5,   category: 'software',   date: 'September 2023',text: 'The custom software they built for our marketing automation has saved us countless hours. Intuitive, powerful, and exactly what we needed.' },
  { id: 8,  name: 'David Wilson',   position: 'Operations Director',                company: 'Global Logistics',  rating: 5,   category: 'software',   date: 'August 2023',   text: "Intech Zone's solutions streamlined our entire supply chain. Real-time tracking and analytics improved efficiency by 60%." },
  { id: 9,  name: 'Anita Desai',    position: 'Creative Director',                  company: 'Design Studio',     rating: 4.5, category: 'web',        date: 'July 2023',     text: 'Their web design team is incredibly talented. They understood our vision perfectly and delivered a website that truly represents our brand.' },
  { id: 10, name: 'John Martinez',  position: 'CEO',                                company: 'FinTech Solutions',  rating: 5,   category: 'software',   date: 'June 2023',     text: 'The financial software they developed has revolutionized how we handle transactions. Secure, fast, and reliable.' },
]

const CATEGORIES = [
  { id: 'all',       label: 'All Reviews'    },
  { id: 'web',       label: 'Web Dev'        },
  { id: 'mobile',    label: 'Mobile Apps'    },
  { id: 'cloud',     label: 'Cloud'          },
  { id: 'consulting',label: 'Consulting'     },
  { id: 'security',  label: 'Security'       },
  { id: 'software',  label: 'Custom Software'},
]

const STATS = [
  { number: '200+', label: 'Happy Clients'     },
  { number: '4.9',  label: 'Average Rating'    },
  { number: '95%',  label: 'Client Retention'  },
  { number: '500+', label: 'Projects Completed'},
]

const Stars = ({ rating }) => {
  const full = Math.floor(rating)
  const half = rating % 1 !== 0
  return (
    <span className={styles.stars}>
      {Array.from({ length: full }, (_, i) => <FaStar key={i} />)}
      {half && <FaStarHalfAlt />}
      {Array.from({ length: 5 - Math.ceil(rating) }, (_, i) => (
        <FaStar key={`e${i}`} className={styles.starEmpty} />
      ))}
    </span>
  )
}

export default function TestimonialSection() {
  const [idx, setIdx]         = useState(0)
  const [filter, setFilter]   = useState('all')
  const [paused, setPaused]   = useState(false)
  const [animKey, setAnimKey] = useState(0)

  const list = filter === 'all' ? TESTIMONIALS : TESTIMONIALS.filter(t => t.category === filter)
  const current = list[idx] || list[0]

  // Auto advance
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setIdx(p => (p + 1) % list.length)
      setAnimKey(k => k + 1)
    }, 4000)
    return () => clearInterval(id)
  }, [list.length, paused])

  const go = (n) => {
    setIdx((idx + n + list.length) % list.length)
    setAnimKey(k => k + 1)
  }

  const changeFilter = (id) => {
    setFilter(id)
    setIdx(0)
    setAnimKey(k => k + 1)
  }

  return (
    <section className={styles.section}>
      <WaveCanvas />

      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} />
            Client Stories
          </span>
          <h2 className={styles.title}>
            What Our <span className={styles.accent}>Clients</span> Say
          </h2>
          <p className={styles.subtitle}>
            Real results, real relationships — here's what our clients have to say about working with Intech Zone.
          </p>
        </div>

        {/* Stats */}
        <div className={styles.statsRow}>
          {STATS.map((s, i) => (
            <React.Fragment key={s.label}>
              <div className={styles.statItem}>
                <span className={styles.statNum}>{s.number}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
              {i < STATS.length - 1 && <div className={styles.statDivider} />}
            </React.Fragment>
          ))}
        </div>

        {/* Category Filter */}
        <div className={styles.filters}>
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              className={`${styles.filterBtn} ${filter === c.id ? styles.filterActive : ''}`}
              onClick={() => changeFilter(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Testimonial Card */}
        <div
          className={styles.cardWrapper}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div key={animKey} className={styles.card}>
            <FaQuoteRight className={styles.quoteIcon} />

            <div className={styles.cardBody}>
              <p className={styles.text}>{current.text}</p>
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.avatar}>
                <FaUserCircle className={styles.avatarIcon} />
              </div>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{current.name}</span>
                <span className={styles.authorPos}>
                  {current.position}{current.company ? ` · ${current.company}` : ''}
                </span>
              </div>
              <div className={styles.ratingBlock}>
                <Stars rating={current.rating} />
                <span className={styles.ratingNum}>{current.rating}.0</span>
              </div>
            </div>
          </div>

          {/* Arrows */}
          <button className={`${styles.navBtn} ${styles.prev}`} onClick={() => go(-1)} aria-label="Previous">
            <FaChevronLeft />
          </button>
          <button className={`${styles.navBtn} ${styles.next}`} onClick={() => go(1)} aria-label="Next">
            <FaChevronRight />
          </button>
        </div>

        {/* Dots */}
        <div className={styles.dots}>
          {list.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === idx ? styles.dotActive : ''}`}
              onClick={() => { setIdx(i); setAnimKey(k => k + 1) }}
              aria-label={`Go to ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}