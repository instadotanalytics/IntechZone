import React, { useState, useEffect, useRef } from 'react'
import styles from './Contactherosection.module.css'
import ApiService from '../../utils/apiService'
import {
  FiPhone, FiMail, FiMapPin, FiSend,
  FiUser, FiMessageSquare, FiBriefcase,
  FiAlertCircle, FiCheckCircle, FiArrowRight, FiClock, FiX
} from 'react-icons/fi'

// ── Success Overlay Card ──────────────────────────────────────────────────────
const SuccessOverlay = ({ name, onClose }) => (
  <div className={styles.overlayBg}>
    <div className={styles.overlayCard}>

      {/* Close button */}
      <button className={styles.overlayClose} onClick={onClose}>
        <FiX size={18} />
      </button>

      {/* Icon */}
      <div className={styles.successRing}>
        <div className={styles.successIconWrap}>
          <FiCheckCircle size={32} className={styles.successIcon} />
        </div>
      </div>

      {/* Text */}
      <h2 className={styles.successTitle}>Message Sent!</h2>
      <p className={styles.successSub}>
        Thank you, <strong>{name}</strong>. We've received your message and
        our team will get back to you shortly.
      </p>

      {/* Divider */}
      <div className={styles.successDivider} />

      {/* What happens next */}
      <div className={styles.nextSteps}>
        <p className={styles.nextLabel}>What happens next?</p>
        <div className={styles.step}>
          <span className={styles.stepNum}>1</span>
          <div>
            <p className={styles.stepTitle}>We review your request</p>
            <p className={styles.stepSub}>Our team reads every message carefully</p>
          </div>
        </div>
        <div className={styles.step}>
          <span className={styles.stepNum}>2</span>
          <div>
            <p className={styles.stepTitle}>We reach out within 24 hours</p>
            <p className={styles.stepSub}>Via email or phone, whichever suits you</p>
          </div>
        </div>
        <div className={styles.step}>
          <span className={styles.stepNum}>3</span>
          <div>
            <p className={styles.stepTitle}>We build something great</p>
            <p className={styles.stepSub}>Your project journey begins</p>
          </div>
        </div>
      </div>

      {/* Response time badge */}
      <div className={styles.timeBadge}>
        <FiClock size={13} />
        Average response time: <strong>under 4 hours</strong>
      </div>

      {/* CTA */}
      <button className={styles.overlayBtn} onClick={onClose}>
        Send another message <FiArrowRight size={14} />
      </button>
    </div>
  </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
export default function ContactHeroSection() {
  const canvasRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', message: ''
  })
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [submittedName, setSubmittedName] = useState('')
  const [error, setError] = useState('')

  // ── Canvas animation ────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H, raf

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      const waves = [
        { amp: 38, freq: 0.008, speed: 0.018, alpha: 0.13, yOff: H * 0.38 },
        { amp: 28, freq: 0.011, speed: 0.025, alpha: 0.09, yOff: H * 0.52 },
        { amp: 20, freq: 0.015, speed: 0.032, alpha: 0.07, yOff: H * 0.65 },
      ]

      waves.forEach(({ amp, freq, speed, alpha, yOff }) => {
        ctx.beginPath()
        ctx.moveTo(0, yOff)
        for (let x = 0; x <= W; x += 3) {
          const y = yOff
            + Math.sin(x * freq + t * speed * 60) * amp
            + Math.sin(x * freq * 1.6 + t * speed * 40) * (amp * 0.4)
          ctx.lineTo(x, y)
        }
        ctx.lineTo(W, H)
        ctx.lineTo(0, H)
        ctx.closePath()
        ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`
        ctx.fill()
      })

      for (let i = 0; i < 18; i++) {
        const x = (i * 137.5 + t * 8) % W
        const y = (i * 89.3 + t * 5) % H
        ctx.beginPath()
        ctx.arc(x, y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(59,130,246,0.25)'
        ctx.fill()
      }

      t += 0.016
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // ── Handlers ────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('Submitting form data:', formData);

    try {
      const response = await ApiService.submitContactForm(formData);
      console.log('Response:', response);
      if (response.data.success) {
        setSubmittedName(formData.name);
        setShowSuccess(true);
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      }
    } catch (err) {
      console.error('Full error object:', err);
      console.error('Error response:', err.response);
      console.error('Error message:', err.message);
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccess = () => setShowSuccess(false)

  return (
    <section className={styles.hero}>
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Success Overlay */}
      {showSuccess && (
        <SuccessOverlay name={submittedName} onClose={handleCloseSuccess} />
      )}

      <div className={styles.inner}>

        {/* LEFT */}
        <div className={styles.left}>
          <span className={styles.badge}>
            <FiBriefcase size={12} /> IT Solutions & Consulting
          </span>

          <h1 className={styles.heading}>
            Let's Build Something<br />
            <span className={styles.accent}>Great Together</span>
          </h1>

          <p className={styles.subtext}>
            Partner with <strong>Intech Zone</strong> to transform your business with
            enterprise-grade software, cloud infrastructure, and strategic IT consulting.
          </p>

          <div className={styles.contacts}>
            <a href="tel:+919876543210" className={styles.contactItem}>
              <span className={styles.contactIcon}><FiPhone size={16} /></span>
              <div>
                <p className={styles.contactLabel}>Call Us</p>
                <p className={styles.contactValue}>+916232685820</p>
              </div>
            </a>
            <a href="mailto:info@intechzone.in" className={styles.contactItem}>
              <span className={styles.contactIcon}><FiMail size={16} /></span>
              <div>
                <p className={styles.contactLabel}>Email Us</p>
                <p className={styles.contactValue}>info.intechzone@gmail.com</p>
              </div>
            </a>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}><FiMapPin size={16} /></span>
              <div>
                <p className={styles.contactLabel}>Visit Us</p>
                <p className={styles.contactValue}>IntechZone
                  Business Center, Silicon Tower
                  Dubai Silicon Oasis
                  Dubai Silicon Oasis, UAE</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT - Form */}
        <div className={styles.right}>
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Send Us a Message</h2>
            <p className={styles.formSub}>We'll get back to you within 24 hours</p>

            {error && (
              <div className={styles.errorMsg}>
                <FiAlertCircle size={16} /> {error}
              </div>
            )}

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Full Name *</label>
                  <div className={styles.inputWrap}>
                    <FiUser size={15} className={styles.inputIcon} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      className={styles.input}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Email *</label>
                  <div className={styles.inputWrap}>
                    <FiMail size={15} className={styles.inputIcon} />
                    <input
                      type="email"
                      name="email"
                      placeholder="you@email.com"
                      className={styles.input}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Phone</label>
                  <div className={styles.inputWrap}>
                    <FiPhone size={15} className={styles.inputIcon} />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 XXXXX XXXXX"
                      className={styles.input}
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Service Needed</label>
                  <div className={styles.inputWrap}>
                    <FiBriefcase size={15} className={styles.inputIcon} />
                    <select
                      name="service"
                      className={`${styles.input} ${styles.select}`}
                      value={formData.service}
                      onChange={handleChange}
                    >
                      <option value="">Select service</option>
                      <option>Web Development</option>
                      <option>App Development</option>
                      <option>Cloud Solutions</option>
                      <option>IT Consulting</option>
                      <option>Cybersecurity</option>
                      <option>ERP Solutions</option>
                      <option>Digital Marketing</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Message *</label>
                <div className={styles.inputWrap}>
                  <FiMessageSquare size={15} className={`${styles.inputIcon} ${styles.textareaIcon}`} />
                  <textarea
                    name="message"
                    placeholder="Tell us about your project..."
                    className={`${styles.input} ${styles.textarea}`}
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? (
                  <><span className={styles.btnSpinner} /> Sending…</>
                ) : (
                  <>Send Message <FiSend size={15} /></>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  )
}