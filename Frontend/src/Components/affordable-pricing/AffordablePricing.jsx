import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiCheckCircle, FiArrowRight, FiZap, FiShield, FiCloud,
  FiCode, FiHeadphones, FiTrendingUp, FiStar, FiAward,
  FiCpu, FiGlobe, FiLayers, FiMessageCircle
} from 'react-icons/fi'
import styles from './AffordablePricing.module.css'
import ContactHeroSection from '../../Pages/Contact/ContectHeroSection'
import OurProcess from '../../Pages/Home/OurProcess'

const services = [
  {
    icon: <FiCode size={28} />,
    title: 'Custom Software Development',
    description: 'Bespoke enterprise applications, web & mobile platforms built to scale with your business goals.',
    features: ['Full-Stack Development', 'API Integration', 'Legacy Migration', 'QA & Testing'],
    tag: 'Most Popular',
    color: '#2563eb',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
    route: '/services/software-development',
  },
  {
    icon: <FiCloud size={28} />,
    title: 'Cloud Infrastructure',
    description: 'AWS, Azure & GCP architecture, deployment pipelines, and 24/7 managed cloud operations.',
    features: ['Cloud Migration', 'DevOps & CI/CD', 'Auto-Scaling', 'Cost Optimization'],
    tag: 'Enterprise',
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
    route: '/services/cloud-solutions',
  },
  {
    icon: <FiShield size={28} />,
    title: 'IT Security & Compliance',
    description: 'End-to-end cybersecurity audits, VAPT, compliance frameworks, and threat monitoring.',
    features: ['VAPT Testing', 'ISO 27001', 'SOC 2 Readiness', 'Incident Response'],
    tag: 'Critical',
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)',
    route: '/services/cybersecurity',
  },
  {
    icon: <FiHeadphones size={28} />,
    title: 'IT Consulting & Strategy',
    description: 'Digital transformation roadmaps, technology audits, and CTO-as-a-service for growing businesses.',
    features: ['Digital Roadmap', 'Tech Audit', 'CTO-as-a-Service', 'Vendor Management'],
    tag: 'Strategic',
    color: '#059669',
    gradient: 'linear-gradient(135deg, #059669 0%, #065f46 100%)',
    route: '/services/it-consulting',
  },
]

const stats = [
  { value: '500+', label: 'Projects Delivered', icon: <FiAward size={22} /> },
  { value: '10+', label: 'Years Experience', icon: <FiTrendingUp size={22} /> },
  { value: '98%', label: 'Client Satisfaction', icon: <FiStar size={22} /> },
  { value: '24/7', label: 'Support Available', icon: <FiHeadphones size={22} /> },
]

const floatingIcons = [
  { icon: <FiCpu size={20} />, top: '12%', left: '8%', delay: '0s' },
  { icon: <FiGlobe size={18} />, top: '25%', right: '6%', delay: '0.4s' },
  { icon: <FiLayers size={22} />, bottom: '30%', left: '5%', delay: '0.8s' },
  { icon: <FiZap size={16} />, bottom: '18%', right: '9%', delay: '1.2s' },
  { icon: <FiCode size={20} />, top: '55%', left: '3%', delay: '0.6s' },
  { icon: <FiShield size={18} />, top: '40%', right: '4%', delay: '1s' },
]

const AffordablePricing = () => {
  const navigate = useNavigate()
  const [activeCard, setActiveCard] = useState(null)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2.5 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.4
        this.speedY = (Math.random() - 0.5) * 0.4
        this.opacity = Math.random() * 0.4 + 0.1
        this.color = Math.random() > 0.5 ? '#2563eb' : '#0ea5e9'
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset()
      }
      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    for (let i = 0; i < 80; i++) particles.push(new Particle())

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.save()
            ctx.globalAlpha = 0.06 * (1 - dist / 100)
            ctx.strokeStyle = '#2563eb'
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section className={styles.section} ref={sectionRef}>
      {/* Canvas Background */}
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Decorative blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />

      {/* Floating icons */}
      {floatingIcons.map((fi, i) => (
        <div
          key={i}
          className={styles.floatingIcon}
          style={{ top: fi.top, left: fi.left, right: fi.right, bottom: fi.bottom, animationDelay: fi.delay }}
        >
          {fi.icon}
        </div>
      ))}

      <div className={styles.container}>
        {/* ── HERO ROW ── */}
        <div className={`${styles.heroRow} ${inView ? styles.heroVisible : ''}`}>
          {/* Left: Content */}
          <div className={styles.heroLeft}>
            <div className={styles.badge}>
              <FiZap size={14} />
              <span>Flexible Engagement Models</span>
            </div>

            <h2 className={styles.heroTitle}>
              Solutions Tailored
              <span className={styles.accentWord}> to Your Budget</span>
              <br />& Business Scale
            </h2>

            <p className={styles.heroDesc}>
              We believe great technology should be accessible to every business — from ambitious startups to global enterprises.
              No fixed packages. No hidden fees. Just honest conversations about what your business needs and fair pricing that reflects real value.
            </p>

            <ul className={styles.heroList}>
              {[
                'Custom quotes based on your specific requirements',
                'Flexible monthly retainer or project-based models',
                'Dedicated team or on-demand resource scaling',
                'Transparent milestone-based billing',
              ].map((item, i) => (
                <li key={i} className={styles.heroListItem} style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                  <FiCheckCircle className={styles.checkIcon} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className={styles.heroActions}>
              <button className={styles.btnPrimary} onClick={() => navigate('/contact')}>
                <FiMessageCircle size={18} />
                <span>Get a Free Consultation</span>
                <FiArrowRight size={16} className={styles.btnArrow} />
              </button>
              <button className={styles.btnOutline} onClick={() => navigate('/portfolio')}>
                <FiAward size={18} />
                <span>View Our Portfolio</span>
              </button>
            </div>

            {/* Stats Row */}
            <div className={styles.statsRow}>
              {stats.map((s, i) => (
                <div key={i} className={styles.statItem} style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
                  <span className={styles.statIcon}>{s.icon}</span>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Illustration */}
          <div className={styles.heroRight}>
            <div className={styles.illustrationWrapper}>
              {/* Central hub */}
              <div className={styles.centralHub}>
                <FiZap size={36} className={styles.hubIcon} />
                <span>IT Solutions</span>
              </div>

              {/* Orbit rings */}
              <div className={styles.ring1} />
              <div className={styles.ring2} />

              {/* Orbiting service badges */}
              {[
                { icon: <FiCode size={18} />, label: 'Development', angle: 0 },
                { icon: <FiCloud size={18} />, label: 'Cloud', angle: 90 },
                { icon: <FiShield size={18} />, label: 'Security', angle: 180 },
                { icon: <FiHeadphones size={18} />, label: 'Consulting', angle: 270 },
              ].map((orb, i) => {
                const rad = (orb.angle * Math.PI) / 180
                const r = 130
                const x = Math.cos(rad) * r
                const y = Math.sin(rad) * r
                return (
                  <div
                    key={i}
                    className={styles.orbitBadge}
                    style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                  >
                    <span className={styles.orbitBadgeIcon}>{orb.icon}</span>
                    <span className={styles.orbitBadgeLabel}>{orb.label}</span>
                  </div>
                )
              })}

              {/* Deal card */}
              <div className={styles.dealCard}>
                <div className={styles.dealCardHeader}>
                  <FiStar size={16} />
                  <span>Deal-Based Pricing</span>
                </div>
                <div className={styles.dealCardBody}>
                  <div className={styles.dealItem}><FiCheckCircle size={13} /><span>No fixed packages</span></div>
                  <div className={styles.dealItem}><FiCheckCircle size={13} /><span>Custom quotes</span></div>
                  <div className={styles.dealItem}><FiCheckCircle size={13} /><span>Flexible billing</span></div>
                </div>
                <button className={styles.dealBtn} onClick={() => navigate('/contact')}>Let's Talk <FiArrowRight size={13} /></button>
              </div>

              {/* Trust badge */}
              <div className={styles.trustBadge}>
                <FiAward size={18} />
                <div>
                  <strong>ISO Certified</strong>
                  <span>Quality Assured</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SERVICES GRID ── */}
        <div className={styles.servicesSection}>
          <div className={styles.sectionLabel}>
            <span>What We Offer</span>
          </div>
          <h3 className={styles.sectionTitle}>Enterprise IT Services — <em>Priced For You</em></h3>
          <p className={styles.sectionSubtitle}>
            Every engagement starts with a conversation. We scope, plan, and price your project together.
          </p>

          <div className={styles.grid}>
            {services.map((svc, i) => (
              <div
                key={i}
                className={`${styles.card} ${activeCard === i ? styles.cardActive : ''} ${inView ? styles.cardVisible : ''}`}
                style={{ animationDelay: `${0.1 + i * 0.12}s`, cursor: 'pointer' }}
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
                onClick={() => navigate(svc.route)}
              >
                {/* Card glow bar */}
                <div className={styles.cardBar} style={{ background: svc.gradient }} />

                <div className={styles.cardTop}>
                  <div className={styles.cardIcon} style={{ background: `${svc.color}18`, color: svc.color }}>
                    {svc.icon}
                  </div>
                  <span className={styles.cardTag} style={{ background: `${svc.color}18`, color: svc.color }}>
                    {svc.tag}
                  </span>
                </div>

                <h4 className={styles.cardTitle}>{svc.title}</h4>
                <p className={styles.cardDesc}>{svc.description}</p>

                <ul className={styles.cardFeatures}>
                  {svc.features.map((f, j) => (
                    <li key={j} className={styles.cardFeature}>
                      <FiCheckCircle size={13} style={{ color: svc.color, flexShrink: 0 }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button className={styles.cardBtn} style={{ color: svc.color }} onClick={(e) => { e.stopPropagation(); navigate('/contact', { state: { service: svc.title } }) }}>
                  <span>Discuss Requirements</span>
                  <FiArrowRight size={15} className={styles.cardBtnArrow} />
                </button>

                {/* Hover shine */}
                <div className={styles.cardShine} />
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA BANNER ── */}
        <div className={`${styles.ctaBanner} ${inView ? styles.ctaVisible : ''}`}>
          <div className={styles.ctaLeft}>
            <div className={styles.ctaIconWrap}><FiMessageCircle size={28} /></div>
            <div>
              <h4 className={styles.ctaTitle}>Ready to discuss your project?</h4>
              <p className={styles.ctaDesc}>Let's understand your needs and craft a solution that fits perfectly — technically and financially.</p>
            </div>
          </div>
          <div className={styles.ctaRight}>
            <button className={styles.ctaBtnWhite} onClick={() => navigate('/contact')}>
              <span>Schedule Free Call</span>
              <FiArrowRight size={16} />
            </button>
            <button className={styles.ctaBtnGhost} onClick={() => navigate('/contact')}>
              <span>Email Us</span>
            </button>
          </div>
        </div>
      </div>
      <OurProcess/>
      <ContactHeroSection/>
    </section>
  )
}

export default AffordablePricing