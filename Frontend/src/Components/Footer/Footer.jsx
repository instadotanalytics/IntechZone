import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import logo from '../../assets/Intech Zone.png'
import { SERVICES, CAREERS } from '../Header/Header'
import {
    FiArrowRight, FiMail, FiPhone, FiMapPin,
    FiLinkedin, FiTwitter, FiInstagram, FiYoutube,
    FiFacebook, FiSend, FiZap, FiCode, FiShield,
    FiCloud, FiCpu
} from 'react-icons/fi'

/* ─────────────────────── CANVAS PARTICLES ─────────────────────── */

function ParticleCanvas() {
    const canvasRef = useRef(null)

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
                this.vx = (Math.random() - 0.5) * 0.4
                this.vy = (Math.random() - 0.5) * 0.4
                this.r = Math.random() * 2 + 1
                this.alpha = Math.random() * 0.5 + 0.1
            }
            update() {
                this.x += this.vx
                this.y += this.vy
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1
            }
            draw() {
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(14, 90, 230, ${this.alpha})`
                ctx.fill()
            }
        }

        const COUNT = Math.min(60, Math.floor((canvas.width * canvas.height) / 14000))
        for (let i = 0; i < COUNT; i++) particles.push(new Particle())

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 120) {
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.strokeStyle = `rgba(14, 90, 230, ${0.12 * (1 - dist / 120)})`
                        ctx.lineWidth = 0.8
                        ctx.stroke()
                    }
                }
            }
            particles.forEach(p => { p.update(); p.draw() })
            animId = requestAnimationFrame(draw)
        }
        draw()

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return <canvas ref={canvasRef} className={styles.canvas} />
}

/* ─────────────────────── DATA ─────────────────────── */

const QUICK_LINKS = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Fast Delivery', path: '/fast-delivery' },
    { label: '24/7 Support', path: '/247-support' },
]

const TOP_SERVICES = SERVICES.flatMap(g => g.items).slice(0, 8)

const TOP_CAREERS = CAREERS.flatMap(g => g.items)

const SOCIALS = [
    { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: FiFacebook, href: 'https://facebook.com', label: 'Facebook' },
    
]


/* ─────────────────────── COMPONENT ─────────────────────── */

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className={styles.footer}>

            {/* Canvas background */}
            <ParticleCanvas />

            {/* ── Main Grid ── */}
            <div className={styles.main}>

                {/* Brand Column */}
                <div className={styles.brand}>
                    <Link to="/" className={styles.logoLink}>
                        <img src={logo} alt="Intech Zone" className={styles.logoImg} />
                    </Link>
                    <p className={styles.brandTagline}>
                        Empowering businesses with cutting-edge technology solutions. From development to deployment — we build what matters.
                    </p>

                    {/* Contact */}
                    <ul className={styles.contactList}>
                        <li>
                            <FiMail size={14} />
                            <a href="mailto:hello@intechzone.in">hello@intechzone.in</a>
                        </li>
                        <li>
                            <FiPhone size={14} />
                            <a href="tel:+911234567890">+91 12345 67890</a>
                        </li>
                        <li>
                            <FiMapPin size={14} />
                            <span>Bhopal, Madhya Pradesh, India</span>
                        </li>
                    </ul>

                    {/* Socials */}
                    <div className={styles.socials}>
                        {SOCIALS.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialBtn}
                                aria-label={label}
                            >
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div className={styles.col}>
                    <h4 className={styles.colTitle}>Quick Links</h4>
                    <ul className={styles.linkList}>
                        {QUICK_LINKS.map(({ label, path }) => (
                            <li key={label}>
                                <Link to={path} className={styles.footerLink}>
                                    <FiArrowRight size={11} />
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Services */}
                <div className={styles.col}>
                    <h4 className={styles.colTitle}>Our Services</h4>
                    <ul className={styles.linkList}>
                        {TOP_SERVICES.map(({ label, path }) => (
                            <li key={label}>
                                <Link to={path} className={styles.footerLink}>
                                    <FiArrowRight size={11} />
                                    {label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link to="/services" className={`${styles.footerLink} ${styles.seeAll}`}>
                                View all services <FiArrowRight size={11} />
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Careers */}
                <div className={styles.col}>
                    <h4 className={styles.colTitle}>Careers</h4>
                    <ul className={styles.linkList}>
                        {TOP_CAREERS.map(({ label, path }) => (
                            <li key={label}>
                                <Link to={path} className={styles.footerLink}>
                                    <FiArrowRight size={11} />
                                    {label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link to="/careers" className={`${styles.footerLink} ${styles.seeAll}`}>
                                View all careers <FiArrowRight size={11} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

          

            {/* ── Bottom Bar ── */}
            <div className={styles.bottom}>
                <p className={styles.copy}>
                    © {year} Intech Zone. All rights reserved.
                </p>
                <div className={styles.legalLinks}>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <span className={styles.dot} />
                    <Link to="/terms-of-service">Terms of Service</Link>
                    
                </div>
            </div>

        </footer>
    )
}