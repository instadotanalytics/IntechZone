import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ServicesSection.module.css'

import {
  FiArrowRight, FiCode, FiSmartphone, FiLayers,
  FiCloud, FiTrendingUp, FiShield,
} from 'react-icons/fi'
import ParticleNetworkCanvas from './ParticleNetworkCanvas'

const SERVICES = [
  {
    title: 'Web Development',
    desc: 'High-performance websites and web apps built with modern frameworks and scalable architecture.',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.08)',
    path: '/services/web-development',
    icon: FiCode,
  },
  {
    title: 'App Development',
    desc: 'Native and cross-platform mobile apps for iOS and Android with seamless user experiences.',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    path: '/services/app-development',
    icon: FiSmartphone,
  },
  {
    title: 'UI/UX Design',
    desc: 'User-centered design systems, wireframes, and prototypes that convert visitors into customers.',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.08)',
    path: '/services/ui-ux-design',
    icon: FiLayers,
  },
  {
    title: 'Cloud Solutions',
    desc: 'AWS, GCP, and Azure infrastructure setup, migration, and DevOps automation for scale.',
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.08)',
    path: '/services/cloud-solutions',
    icon: FiCloud,
  },
  {
    title: 'Digital Marketing',
    desc: 'SEO, paid ads, and data-driven campaigns that boost your brand and ROI measurably.',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    path: '/services/digital-marketing',
    icon: FiTrendingUp,
  },
  {
    title: 'IT Consulting',
    desc: 'Strategic technology roadmaps, system audits, and expert guidance for digital transformation.',
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.08)',
    path: '/services/it-consulting',
    icon: FiShield,
  },
]

const ServicesSection = () => {
  const navigate = useNavigate()

  return (
    <section className={styles.section}>
     <ParticleNetworkCanvas/>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} />
            What We Do
          </span>
          <h2 className={styles.title}>
            Our <span className={styles.accent}>Services</span>
          </h2>
          <p className={styles.subtitle}>
            We craft digital experiences that drive growth — from code to cloud,
            we've got you covered.
          </p>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon
            return (
              <div
                key={i}
                className={styles.card}
                onClick={() => navigate(svc.path)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate(svc.path)}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={styles.iconBox} style={{ background: svc.bg, color: svc.color }}>
                  <Icon size={22} />
                </div>
                <h3 className={styles.cardTitle}>{svc.title}</h3>
                <p className={styles.cardDesc}>{svc.desc}</p>
                <span className={styles.learnBtn} style={{ color: svc.color }}>
                  Learn more
                  <FiArrowRight size={13} className={styles.arrow} />
                </span>
                <div
                  className={styles.cardGlow}
                  style={{ background: `linear-gradient(135deg, ${svc.color}30, ${svc.color}00)` }}
                />
              </div>
            )
          })}
        </div>

        {/* View All */}
        <div className={styles.viewMoreWrapper}>
          <button className={styles.viewMoreBtn} onClick={() => navigate('/services')}>
            <span>View All Services</span>
            <FiArrowRight size={17} className={styles.viewMoreArrow} />
          </button>
          <p className={styles.viewMoreText}>Explore our complete range of 20+ IT solutions</p>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection