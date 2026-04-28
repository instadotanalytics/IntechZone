import React, { useEffect, useRef, useState } from 'react'
import styles from './OurProcess.module.css'

import {
  FiSearch, FiEdit, FiCode, FiCheckCircle, FiSend, FiArrowRight, FiChevronDown,
} from 'react-icons/fi'

const STEPS = [
  {
    id: 1, icon: FiSearch, title: 'Requirement Analysis',
    description: 'We dive deep into your business needs, goals, and technical requirements to create a comprehensive roadmap.',
    color: '#3b82f6', gradient: 'linear-gradient(135deg,#3b82f6,#2563eb)', delay: 0,
  },
  {
    id: 2, icon: FiEdit, title: 'Planning',
    description: 'Strategic planning with clear milestones, resource allocation, and timeline estimation for your project.',
    color: '#8b5cf6', gradient: 'linear-gradient(135deg,#8b5cf6,#7c3aed)', delay: 0.08,
  },
  {
    id: 3, icon: FiCode, title: 'Development',
    description: 'Agile development with cutting-edge technologies, regular updates, and continuous integration.',
    color: '#10b981', gradient: 'linear-gradient(135deg,#10b981,#059669)', delay: 0.16,
  },
  {
    id: 4, icon: FiCheckCircle, title: 'Testing',
    description: 'Rigorous quality assurance, security testing, and performance optimization before launch.',
    color: '#f59e0b', gradient: 'linear-gradient(135deg,#f59e0b,#d97706)', delay: 0.24,
  },
  {
    id: 5, icon: FiSend, title: 'Delivery',
    description: 'Seamless deployment, post-launch support, and continuous maintenance for long-term success.',
    color: '#ef4444', gradient: 'linear-gradient(135deg,#ef4444,#dc2626)', delay: 0.32,
  },
]

const Step = ({ step, index, isVisible }) => {
  const [hovered, setHovered] = useState(false)
  const Icon = step.icon

  return (
    <div
      className={`${styles.stepWrapper} ${isVisible ? styles.stepVisible : ''}`}
      style={{ transitionDelay: `${step.delay}s` }}
    >
      <div
        className={`${styles.step} ${hovered ? styles.stepHovered : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className={styles.iconWrapper}>
          <div className={styles.iconInner} style={{ background: step.gradient }}>
            <Icon size={28} />
          </div>
        </div>
        <h3 className={styles.stepTitle}>{step.title}</h3>
        <p className={styles.stepDesc}>{step.description}</p>
      </div>

      {index < STEPS.length - 1 && (
        <>
          {/* Desktop connector */}
          <div className={`${styles.connector} ${styles.desktopConnector}`}>
            <div className={styles.connectorLine} />
            <div className={styles.connectorArrow}><FiArrowRight size={18} /></div>
          </div>
          {/* Mobile connector */}
          <div className={`${styles.connector} ${styles.mobileConnector}`}>
            <div className={styles.connectorLineV} />
            <div className={styles.connectorArrowV}><FiChevronDown size={20} /></div>
          </div>
        </>
      )}
    </div>
  )
}

const OurProcess = () => {
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
      

      <div className={styles.container}>
        <div className={`${styles.header} ${visible ? styles.headerVisible : ''}`}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} />
            How We Work
          </span>
          <h2 className={styles.title}>
            Our <span className={styles.accent}>Process</span>
          </h2>
          <p className={styles.subtitle}>
            A systematic approach to deliver exceptional results — from concept to deployment.
          </p>
        </div>

        <div className={styles.timeline}>
          {STEPS.map((step, idx) => (
            <Step key={step.id} step={step} index={idx} isVisible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurProcess