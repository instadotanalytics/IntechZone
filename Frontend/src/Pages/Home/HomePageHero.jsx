import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './HomePageHero.module.css'
import WaveCanvas from './Wavecanvas'  // adjust path as needed

/* ══════════════════════════════════════════
   HERO COMPONENT
   ══════════════════════════════════════════ */
export default function HomePageHero() {
  return (
    <section className={styles.hero}>
      <WaveCanvas />

      <div className={styles.wrapper}>
        <div className={styles.content}>

          {/* Badge */}
          <div className={styles.tagRow}>
            <span className={styles.tagPill}>
              <span className={styles.tagDot} />
              Enterprise-Grade IT Solutions
            </span>
          </div>

          {/* Headline */}
          <h1 className={styles.headline}>
            <span className={styles.line1}>The Future-Driven</span>
            <span className={styles.line2}>
              Technology <span className={styles.accent}>Partner</span>
            </span>
            <span className={styles.line3}>Your Business Needs</span>
          </h1>

          {/* Subtext */}
          <p className={styles.subtext}>
            Partner with <strong>Intech Zone</strong> to build, scale, and accelerate
            your business with enterprise-grade software, cloud infrastructure,
            and strategic IT consulting.
          </p>

          {/* CTA Buttons */}
          <div className={styles.actions}>
            <Link to="/contact" className={styles.btnPrimary}>
              Get Free Quote
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to="/portfolio" className={styles.btnSecondary}>
              View Our Work
            </Link>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            {[
              { num: '500+', label: 'Projects Delivered' },
              { num: '10+',  label: 'Years Experience'  },
              { num: '98%',  label: 'Client Satisfaction'},
            ].map(({ num, label }) => (
              <div key={label} className={styles.stat}>
                <span className={styles.statNum}>{num}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}