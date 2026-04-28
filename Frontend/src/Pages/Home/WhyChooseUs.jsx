import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './WhyChooseUs.module.css'

import {
  FiZap, FiUsers, FiHeadphones, FiDollarSign,
  FiShield, FiTrendingUp, FiArrowRight,
} from 'react-icons/fi'
import GradientOrbsCanvas from './GradientOrbsCanvas'

const FEATURES = [
  {
    id: 1, icon: FiZap,        title: 'Fast Delivery',
    description: 'Agile development cycles with on-time delivery. We respect your deadlines and budget.',
    color: '#3b82f6', gradient: 'linear-gradient(135deg,#3b82f6,#2563eb)', path: '/fast-delivery', delay: 0,
  },
  {
    id: 2, icon: FiUsers,      title: 'Expert Team',
    description: 'Certified professionals with 5+ years of experience in cutting-edge technologies.',
    color: '#8b5cf6', gradient: 'linear-gradient(135deg,#8b5cf6,#7c3aed)', path: '/expert-team', delay: 0.08,
  },
  {
    id: 3, icon: FiHeadphones, title: '24/7 Support',
    description: 'Round-the-clock technical support with quick response time and dedicated managers.',
    color: '#10b981', gradient: 'linear-gradient(135deg,#10b981,#059669)', path: '/247-support', delay: 0.16,
  },
  {
    id: 4, icon: FiDollarSign, title: 'Affordable Pricing',
    description: 'Enterprise-grade solutions at competitive prices with transparent billing.',
    color: '#f59e0b', gradient: 'linear-gradient(135deg,#f59e0b,#d97706)', path: '/affordable-pricing', delay: 0.24,
  },
  {
    id: 5, icon: FiShield,     title: 'Secure Solutions',
    description: 'Bank-grade security with regular audits and compliance certifications.',
    color: '#ef4444', gradient: 'linear-gradient(135deg,#ef4444,#dc2626)', path: '/secure-solutions', delay: 0.32,
  },
  {
    id: 6, icon: FiTrendingUp, title: 'Scalable Growth',
    description: 'Solutions that grow with your business from startup to enterprise level.',
    color: '#06b6d4', gradient: 'linear-gradient(135deg,#06b6d4,#0891b2)', path: '/scalable-growth', delay: 0.40,
  },
]

const FeatureCard = ({ feature }) => {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()
  const Icon = feature.icon

  return (
    <div
      className={`${styles.card} ${hovered ? styles.cardHovered : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(feature.path)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(feature.path)}
      style={{ animationDelay: `${feature.delay}s` }}
    >
      <div className={styles.cardTopBar} style={{ background: feature.gradient }} />
      <div className={styles.cardInner}>
        <div
          className={styles.iconWrapper}
          style={{ background: `${feature.color}12`, borderColor: `${feature.color}22` }}
        >
          <div className={styles.iconInner} style={{ background: feature.gradient }}>
            <Icon size={22} />
          </div>
        </div>
        <h3 className={styles.cardTitle}>{feature.title}</h3>
        <p className={styles.cardDesc}>{feature.description}</p>
        <div className={styles.cardArrow} style={{ color: feature.color }}>
          <span>Learn more</span>
          <FiArrowRight size={13} />
        </div>
      </div>
    </div>
  )
}

const WhyChooseUs = () => {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className={styles.section} ref={ref}>
      <GradientOrbsCanvas/>

      <div className={styles.container}>
        <div className={`${styles.header} ${visible ? styles.headerVisible : ''}`}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} />
            Why Us
          </span>
          <h2 className={styles.title}>
            Why <span className={styles.accent}>Intech Zone</span>
          </h2>
          <p className={styles.subtitle}>
            We combine technical excellence with business understanding to deliver
            solutions that drive real results for our clients.
          </p>
        </div>

        <div className={`${styles.grid} ${visible ? styles.gridVisible : ''}`}>
          {FEATURES.map((f) => <FeatureCard key={f.id} feature={f} />)}
        </div>

        <div className={`${styles.statsRow} ${visible ? styles.statsVisible : ''}`}>
          {[
            { num: '120+', label: 'Projects Completed' },
            { num: '50+',  label: 'Happy Clients'      },
            { num: '24/7', label: 'Support Available'  },
            { num: '4.9★', label: 'Client Rating'      },
          ].map(({ num, label }, i) => (
            <React.Fragment key={label}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>{num}</div>
                <div className={styles.statLabel}>{label}</div>
              </div>
              {i < 3 && <div className={styles.statDivider} />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs