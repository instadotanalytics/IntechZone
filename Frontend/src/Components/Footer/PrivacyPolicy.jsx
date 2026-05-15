// PrivacyPolicy.jsx
import React, { useState, useEffect, useRef } from 'react'
import styles from './PrivacyPolicy.module.css'
import {
  FiShield, FiDatabase, FiSettings, FiEye, FiLock, FiGlobe,
  FiShare2, FiUser, FiClock, FiAlertCircle, FiRefreshCw,
  FiMail, FiChevronRight, FiArrowUp
} from 'react-icons/fi'

const SECTIONS = [
  { id: 'introduction',       icon: FiShield,      title: 'Introduction' },
  { id: 'information',        icon: FiDatabase,    title: 'Information We Collect' },
  { id: 'how-we-use',         icon: FiSettings,    title: 'How We Use Information' },
  { id: 'cookies',            icon: FiEye,         title: 'Cookies Policy' },
  { id: 'security',           icon: FiLock,        title: 'Data Protection & Security' },
  { id: 'third-party',        icon: FiGlobe,       title: 'Third-Party Services' },
  { id: 'data-sharing',       icon: FiShare2,      title: 'Data Sharing Policy' },
  { id: 'user-rights',        icon: FiUser,        title: 'Your Rights' },
  { id: 'retention',          icon: FiClock,       title: 'Data Retention' },
  { id: 'children',           icon: FiAlertCircle, title: "Children's Privacy" },
  { id: 'changes',            icon: FiRefreshCw,   title: 'Policy Changes' },
  { id: 'contact',            icon: FiMail,        title: 'Contact Us' },
]

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('introduction')
  const [showBackTop, setShowBackTop]     = useState(false)
  const sectionRefs = useRef({})

  const LAST_UPDATED = 'May 15, 2025'
  const EFFECTIVE    = 'May 15, 2025'

  useEffect(() => {
    const onScroll = () => {
      setShowBackTop(window.scrollY > 400)

      // Highlight active TOC item
      let current = 'introduction'
      SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) current = id
      })
      setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className={styles.page}>

      {/* ── Hero banner ── */}
      <div className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <FiShield size={13} /> Legal Document
          </div>
          <h1 className={styles.heroTitle}>Privacy Policy</h1>
          <p className={styles.heroSub}>
            IntechZone is committed to protecting your privacy and handling your data with transparency and care.
          </p>
          <div className={styles.heroMeta}>
            <span>Last Updated: <strong>{LAST_UPDATED}</strong></span>
            <span className={styles.heroDot} />
            <span>Effective: <strong>{EFFECTIVE}</strong></span>
            <span className={styles.heroDot} />
            <a href="https://intechzone.in" className={styles.heroUrl}>intechzone.in</a>
          </div>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className={styles.layout}>

        {/* ── Sticky TOC sidebar ── */}
        <aside className={styles.sidebar}>
          <div className={styles.tocCard}>
            <div className={styles.tocHeader}>
              <span className={styles.tocDot} />
              Table of Contents
            </div>
            <nav className={styles.tocNav}>
              {SECTIONS.map(({ id, icon: Icon, title }) => (
                <button
                  key={id}
                  className={`${styles.tocItem} ${activeSection === id ? styles.tocItemActive : ''}`}
                  onClick={() => scrollTo(id)}
                >
                  <div className={styles.tocIcon}>
                    <Icon size={13} />
                  </div>
                  <span>{title}</span>
                  <FiChevronRight size={11} className={styles.tocArrow} />
                </button>
              ))}
            </nav>
            <div className={styles.tocFooter}>
              <FiMail size={12} />
              <a href="mailto:support@intechzone.in">support@intechzone.in</a>
            </div>
          </div>
        </aside>

        {/* ── Policy content ── */}
        <main className={styles.content}>

          {/* 1. Introduction */}
          <section id="introduction" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#1a55d4' }}>
                <FiShield size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 01</div>
                <h2 className={styles.sectionTitle}>Introduction</h2>
              </div>
            </div>
            <div className={styles.body}>
              <p>
                Welcome to <strong>IntechZone</strong> ("we", "our", or "us"). IntechZone is a technology solutions company operating through our website at{' '}
                <a href="https://intechzone.in" className={styles.link}>https://intechzone.in</a>{' '}
                ("Platform"), offering services including web development, software development, IT consulting, cloud solutions, cybersecurity, digital marketing, and more.
              </p>
              <p>
                This Privacy Policy describes how IntechZone collects, uses, stores, and protects personal information when you access or use our Platform, register for an account, submit a contact form, or engage with any of our services.
              </p>
              <p>
                By accessing or using our Platform, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with any part of this policy, please discontinue use of our Platform immediately.
              </p>
              <div className={styles.highlightBox}>
                <FiShield size={15} />
                <span>
                  This policy applies to all users globally, including residents of the European Union (GDPR), California (CCPA), and other jurisdictions with data protection laws.
                </span>
              </div>
            </div>
          </section>

          {/* 2. Information We Collect */}
          <section id="information" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#0891b2' }}>
                <FiDatabase size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 02</div>
                <h2 className={styles.sectionTitle}>Information We Collect</h2>
              </div>
            </div>
            <div className={styles.body}>
              <p>We collect information in the following categories depending on how you interact with our Platform:</p>

              <h3 className={styles.h3}>A. Information You Provide Directly</h3>
              <div className={styles.dataGrid}>
                {[
                  { label: 'Full Name', desc: 'Collected during registration or contact form submission' },
                  { label: 'Email Address', desc: 'Used for account authentication and communication' },
                  { label: 'Phone Number', desc: 'Optionally provided via contact or inquiry forms' },
                  { label: 'Company / Organization', desc: 'Provided when requesting business services' },
                  { label: 'Message / Inquiry Content', desc: 'Text submitted through contact forms or support channels' },
                  { label: 'Account Password', desc: 'Stored in encrypted (hashed) format — never plain text' },
                ].map(({ label, desc }) => (
                  <div key={label} className={styles.dataItem}>
                    <div className={styles.dataLabel}>{label}</div>
                    <div className={styles.dataDesc}>{desc}</div>
                  </div>
                ))}
              </div>

              <h3 className={styles.h3}>B. Information Collected Automatically</h3>
              <p>When you visit our Platform, we automatically collect certain technical information, including:</p>
              <ul className={styles.list}>
                <li><strong>IP Address</strong> — used for security, fraud prevention, and geolocation-based analytics</li>
                <li><strong>Browser Type & Version</strong> — Chrome, Firefox, Safari, Edge, etc.</li>
                <li><strong>Device Information</strong> — device type, operating system, screen resolution</li>
                <li><strong>Pages Visited</strong> — URLs accessed, time spent, referral sources</li>
                <li><strong>Click & Interaction Data</strong> — buttons clicked, forms interacted with</li>
                <li><strong>Session Timestamps</strong> — login and logout times, session duration</li>
              </ul>

              <h3 className={styles.h3}>C. Cookies & Tracking Technologies</h3>
              <p>
                We use cookies, local storage, and similar technologies to maintain sessions, remember preferences, and analyze traffic. See <button className={styles.inlineLink} onClick={() => scrollTo('cookies')}>Section 04 — Cookies Policy</button> for complete details.
              </p>
            </div>
          </section>

          {/* 3. How We Use Information */}
          <section id="how-we-use" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#7c3aed' }}>
                <FiSettings size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 03</div>
                <h2 className={styles.sectionTitle}>How We Use Your Information</h2>
              </div>
            </div>
            <div className={styles.body}>
              <p>IntechZone uses the collected information for the following legitimate purposes:</p>
              <div className={styles.purposeList}>
                {[
                  { num: '01', title: 'Account & Authentication', desc: 'To create and manage your user account, enable secure login, and maintain session integrity across our MERN-based Platform.' },
                  { num: '02', title: 'Service Delivery',         desc: 'To fulfill service requests, respond to inquiries, provide quotes, and deliver the IT solutions you have engaged us for.' },
                  { num: '03', title: 'Communication',            desc: 'To send transactional emails (e.g., account confirmation, password reset), respond to support queries, and share project-related updates.' },
                  { num: '04', title: 'Platform Improvement',     desc: 'To analyze usage patterns, identify bugs, measure performance, and continuously improve the quality and security of our Platform.' },
                  { num: '05', title: 'Legal Compliance',         desc: 'To comply with applicable laws, respond to lawful requests from authorities, enforce our Terms of Service, and prevent fraudulent activity.' },
                  { num: '06', title: 'Marketing (Opt-in Only)',  desc: 'With your explicit consent, to send newsletters, service updates, or promotional offers. You may withdraw consent at any time.' },
                ].map(({ num, title, desc }) => (
                  <div key={num} className={styles.purposeItem}>
                    <div className={styles.purposeNum}>{num}</div>
                    <div>
                      <div className={styles.purposeTitle}>{title}</div>
                      <div className={styles.purposeDesc}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. Cookies Policy */}
          <section id="cookies" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#d97706' }}>
                <FiEye size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 04</div>
                <h2 className={styles.sectionTitle}>Cookies Policy</h2>
              </div>
            </div>
            <div className={styles.body}>
              <p>
                Cookies are small text files stored on your device by your browser. IntechZone uses cookies to enhance your experience, maintain security, and gather analytics. We do not use cookies to track you across unrelated third-party websites.
              </p>

              <div className={styles.cookieTable}>
                <div className={styles.cookieRow + ' ' + styles.cookieHead}>
                  <span>Cookie Type</span><span>Purpose</span><span>Duration</span>
                </div>
                {[
                  { type: 'Essential / Session',   purpose: 'User authentication, JWT token management, CSRF protection', duration: 'Session / 7 days' },
                  { type: 'Functional',             purpose: 'Remember language, theme, and user preferences',             duration: '30 days' },
                  { type: 'Analytics',              purpose: 'Google Analytics — aggregate traffic and behaviour data',    duration: '90–365 days' },
                  { type: 'Performance',            purpose: 'Page load timing, error monitoring via third-party tools',   duration: '30 days' },
                  { type: 'Marketing (Optional)',   purpose: 'Retargeting and ad-performance measurement (opt-in only)',   duration: '90 days' },
                ].map(({ type, purpose, duration }) => (
                  <div key={type} className={styles.cookieRow}>
                    <span><strong>{type}</strong></span>
                    <span>{purpose}</span>
                    <span className={styles.cookieDuration}>{duration}</span>
                  </div>
                ))}
              </div>

              <h3 className={styles.h3}>Managing Cookies</h3>
              <p>
                You may control or disable cookies through your browser settings. Note that disabling essential cookies may impair the functionality of the Platform, including the ability to log in or maintain a session. Most modern browsers allow you to:
              </p>
              <ul className={styles.list}>
                <li>View and delete cookies stored by specific websites</li>
                <li>Block all third-party cookies</li>
                <li>Set preferences for specific domains</li>
              </ul>
              <p>
                For detailed instructions, visit your browser's help center (e.g., <a href="https://support.google.com/chrome/answer/95647" className={styles.link} target="_blank" rel="noopener noreferrer">Chrome Cookie Settings</a>).
              </p>
            </div>
          </section>

          {/* 5. Data Protection & Security */}
          <section id="security" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#059669' }}>
                <FiLock size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 05</div>
                <h2 className={styles.sectionTitle}>Data Protection &amp; Security</h2>
              </div>
            </div>
            <div className={styles.body}>
              <p>
                IntechZone implements industry-standard technical and organizational security measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction.
              </p>

              <div className={styles.securityGrid}>
                {[
                  { icon: '🔐', title: 'Password Hashing',      desc: 'All passwords are hashed using bcrypt with salt rounds — never stored in plain text.' },
                  { icon: '🔒', title: 'HTTPS / TLS Encryption', desc: 'All data transmitted between your browser and our servers is encrypted using TLS 1.2+.' },
                  { icon: '🛡️', title: 'JWT Authentication',    desc: 'Secure JSON Web Tokens with short expiry and refresh token rotation for session management.' },
                  { icon: '🗄️', title: 'Database Security',     desc: 'MongoDB hosted with encrypted volumes, IP whitelisting, role-based access controls, and automated backups.' },
                  { icon: '🚧', title: 'Input Validation',       desc: 'Server-side validation and sanitization on all API endpoints to prevent injection and XSS attacks.' },
                  { icon: '📋', title: 'Access Controls',        desc: 'Internal access to user data is restricted to authorized personnel on a strict need-to-know basis.' },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className={styles.secCard}>
                    <div className={styles.secEmoji}>{icon}</div>
                    <div className={styles.secTitle}>{title}</div>
                    <div className={styles.secDesc}>{desc}</div>
                  </div>
                ))}
              </div>

              <div className={styles.warningBox}>
                <FiAlertCircle size={15} />
                <span>
                  While we take every reasonable precaution, no method of transmission over the internet is 100% secure. In the event of a data breach affecting your rights and freedoms, we will notify affected users within 72 hours as required by applicable law.
                </span>
              </div>
            </div>
          </section>

          {/* 6. Third-Party Services */}
          <section id="third-party" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#0891b2' }}>
                <FiGlobe size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 06</div>
                <h2 className={styles.sectionTitle}>Third-Party Services</h2>
              </div>
            </div>
            <div className={styles.body}>
              <p>
                To operate and improve our Platform, IntechZone integrates with reputable third-party service providers. These providers operate under their own privacy policies and are contractually bound to handle data securely and in compliance with applicable laws.
              </p>

              <div className={styles.thirdPartyList}>
                {[
                  { category: 'Cloud Hosting & Infrastructure', providers: 'AWS (Amazon Web Services), Google Cloud Platform, or equivalent — for server hosting, database management, and storage.' },
                  { category: 'Analytics',                      providers: 'Google Analytics 4 — for anonymized aggregate website traffic analysis. IP addresses are anonymized before processing.' },
                  { category: 'Email Communication',            providers: 'Nodemailer with SMTP, SendGrid, or similar — for transactional emails such as account verification and password resets.' },
                  { category: 'Payment Processing',             providers: 'Where applicable, Razorpay, Stripe, or equivalent PCI-DSS compliant providers. IntechZone does not store payment card details.' },
                  { category: 'Error Monitoring',               providers: 'Sentry or similar tools for real-time error tracking and performance monitoring using anonymized data.' },
                  { category: 'CDN & Performance',              providers: 'Cloudflare or equivalent for DDoS protection, caching, and global content delivery.' },
                ].map(({ category, providers }) => (
                  <div key={category} className={styles.tpItem}>
                    <div className={styles.tpCategory}>{category}</div>
                    <div className={styles.tpProviders}>{providers}</div>
                  </div>
                ))}
              </div>

              <p>
                We encourage you to review the privacy policies of these third-party services. IntechZone is not responsible for the privacy practices of external websites linked from our Platform.
              </p>
            </div>
          </section>

          {/* 7. Data Sharing Policy */}
          <section id="data-sharing" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#dc2626' }}>
                <FiShare2 size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 07</div>
                <h2 className={styles.sectionTitle}>Data Sharing Policy</h2>
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.noSellBanner}>
                <div className={styles.noSellIcon}>🚫</div>
                <div>
                  <div className={styles.noSellTitle}>We Do Not Sell Your Data</div>
                  <div className={styles.noSellText}>
                    IntechZone does not sell, rent, trade, or lease your personal information to any third party for commercial purposes — under any circumstances.
                  </div>
                </div>
              </div>

              <p>We may share your information <strong>only</strong> in the following limited circumstances:</p>
              <ul className={styles.list}>
                <li>
                  <strong>Service Providers:</strong> With contracted vendors (hosting, email, analytics) who process data solely on our behalf under data processing agreements.
                </li>
                <li>
                  <strong>Legal Obligations:</strong> When required by law, court order, or government authority — we will disclose only the minimum necessary information and notify you where legally permitted.
                </li>
                <li>
                  <strong>Business Transfer:</strong> In the event of a merger, acquisition, or asset sale, user data may be transferred as part of business assets. You will be notified in advance with 30 days' notice.
                </li>
                <li>
                  <strong>Protection of Rights:</strong> To protect the rights, property, or safety of IntechZone, our users, or the public — for example, to prevent fraud or enforce our Terms of Service.
                </li>
                <li>
                  <strong>With Your Consent:</strong> In any other case, we will share information only with your explicit, informed, and revocable consent.
                </li>
              </ul>
            </div>
          </section>

          {/* 8. User Rights */}
          <section id="user-rights" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#7c3aed' }}>
                <FiUser size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 08</div>
                <h2 className={styles.sectionTitle}>Your Rights</h2>
              </div>
            </div>
            <div className={styles.body}>
              <p>
                Depending on your location, you may have certain rights regarding your personal data. IntechZone respects and honours these rights globally:
              </p>

              <div className={styles.rightsGrid}>
                {[
                  { right: 'Right to Access',      desc: 'Request a copy of the personal data we hold about you, including how it is processed and why.' },
                  { right: 'Right to Rectification', desc: 'Request correction of any inaccurate or incomplete personal data we hold about you.' },
                  { right: 'Right to Erasure',      desc: 'Request deletion of your personal data ("right to be forgotten") unless retention is required by law.' },
                  { right: 'Right to Portability',  desc: 'Receive your personal data in a structured, machine-readable format (e.g., JSON/CSV) to transfer to another service.' },
                  { right: 'Right to Restrict Processing', desc: 'Request that we limit how we use your data while a complaint or dispute is being resolved.' },
                  { right: 'Right to Object',       desc: 'Object to processing based on legitimate interests or for direct marketing purposes at any time.' },
                  { right: 'Right to Withdraw Consent', desc: 'Where processing is based on consent, withdraw it at any time without affecting prior lawful processing.' },
                  { right: 'Right to Complain',     desc: 'Lodge a complaint with your local data protection authority (e.g., ICO in the UK, supervisory authority in the EU).' },
                ].map(({ right, desc }) => (
                  <div key={right} className={styles.rightItem}>
                    <div className={styles.rightTitle}>{right}</div>
                    <div className={styles.rightDesc}>{desc}</div>
                  </div>
                ))}
              </div>

              <div className={styles.highlightBox}>
                <FiMail size={15} />
                <span>
                  To exercise any of these rights, contact us at <a href="mailto:support@intechzone.in" className={styles.link}>support@intechzone.in</a>. We will respond within <strong>30 days</strong>. In complex cases, we may extend this by an additional 60 days with prior notice.
                </span>
              </div>
            </div>
          </section>

          {/* 9. Data Retention */}
          <section id="retention" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#d97706' }}>
                <FiClock size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 09</div>
                <h2 className={styles.sectionTitle}>Data Retention Policy</h2>
              </div>
            </div>
            <div className={styles.body}>
              <p>
                IntechZone retains personal data only for as long as necessary to fulfill the purposes described in this Privacy Policy, or as required by applicable law.
              </p>

              <div className={styles.retentionTable}>
                <div className={styles.retentionRow + ' ' + styles.retentionHead}>
                  <span>Data Type</span><span>Retention Period</span>
                </div>
                {[
                  { type: 'Account Information (name, email)',        period: 'Duration of account + 90 days after deletion request' },
                  { type: 'Contact Form Submissions',                 period: '12 months from date of submission' },
                  { type: 'Authentication Logs (login, logout)',      period: '90 days for security purposes' },
                  { type: 'Service & Project Records',                period: '5 years for legal and financial compliance' },
                  { type: 'Analytics & Usage Data',                   period: '14 months (Google Analytics default)' },
                  { type: 'Cookie Data',                              period: 'As specified per cookie type (see Section 04)' },
                  { type: 'Payment Records',                          period: '7 years as required by tax and accounting laws' },
                ].map(({ type, period }) => (
                  <div key={type} className={styles.retentionRow}>
                    <span>{type}</span>
                    <span className={styles.retentionPeriod}>{period}</span>
                  </div>
                ))}
              </div>

              <p>
                Upon account deletion or upon receiving a verified erasure request, we will securely delete or anonymize your personal data, except where retention is legally required.
              </p>
            </div>
          </section>

          {/* 10. Children's Privacy */}
          <section id="children" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#dc2626' }}>
                <FiAlertCircle size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 10</div>
                <h2 className={styles.sectionTitle}>Children's Privacy</h2>
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.warningBox}>
                <FiAlertCircle size={15} />
                <span>
                  IntechZone's Platform is not directed to, and is not intended for use by, individuals under the age of <strong>18 years</strong>.
                </span>
              </div>
              <p>
                We do not knowingly collect, solicit, or store personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information without your consent, please contact us immediately at{' '}
                <a href="mailto:support@intechzone.in" className={styles.link}>support@intechzone.in</a>.
              </p>
              <p>
                Upon verification, we will take prompt steps to delete such information from our systems. If we become aware that we have inadvertently collected personal data from a child under 18, we will delete that information as quickly as possible.
              </p>
            </div>
          </section>

          {/* 11. Changes to Policy */}
          <section id="changes" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#0891b2' }}>
                <FiRefreshCw size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 11</div>
                <h2 className={styles.sectionTitle}>Changes to This Privacy Policy</h2>
              </div>
            </div>
            <div className={styles.body}>
              <p>
                IntechZone reserves the right to update or modify this Privacy Policy at any time to reflect changes in our practices, applicable law, or operational requirements. We are committed to keeping you informed of any material changes.
              </p>
              <p>When we make significant changes, we will:</p>
              <ul className={styles.list}>
                <li>Update the <strong>"Last Updated"</strong> date prominently at the top of this page</li>
                <li>Display a <strong>notification banner</strong> on our Platform for a minimum of 14 days</li>
                <li>Send an <strong>email notification</strong> to registered users with a summary of key changes</li>
              </ul>
              <p>
                Your continued use of the Platform after the effective date of any updated Privacy Policy constitutes your acceptance of the revised terms. If you do not agree with the changes, you should discontinue use of the Platform and may request deletion of your account.
              </p>
              <p>
                We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
              </p>
            </div>
          </section>

          {/* 12. Contact Information */}
          <section id="contact" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#059669' }}>
                <FiMail size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 12</div>
                <h2 className={styles.sectionTitle}>Contact Information</h2>
              </div>
            </div>
            <div className={styles.body}>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please do not hesitate to contact us through any of the following channels:
              </p>

              <div className={styles.contactCard}>
                <div className={styles.contactHeader}>
                  <div className={styles.contactLogo}>IZ</div>
                  <div>
                    <div className={styles.contactName}>IntechZone</div>
                    <div className={styles.contactTagline}>Data Privacy & Compliance Team</div>
                  </div>
                </div>
                <div className={styles.contactDetails}>
                  {[
                    { label: 'Support Email',  value: 'support@intechzone.in',       href: 'mailto:support@intechzone.in' },
                    { label: 'Admin Email',    value: 'admin@intechzone.in',          href: 'mailto:admin@intechzone.in' },
                    { label: 'Website',        value: 'https://intechzone.in',        href: 'https://intechzone.in' },
                    { label: 'Privacy Page',   value: 'intechzone.in/privacy-policy', href: 'https://intechzone.in/privacy-policy' },
                  ].map(({ label, value, href }) => (
                    <div key={label} className={styles.contactRow}>
                      <span className={styles.contactLabel}>{label}</span>
                      <a href={href} className={styles.contactValue} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                        {value}
                      </a>
                    </div>
                  ))}
                </div>
                <div className={styles.contactNote}>
                  We aim to respond to all privacy-related inquiries within <strong>5 business days</strong>.
                  For urgent security matters, please use the subject line: <em>"URGENT — Privacy"</em>.
                </div>
              </div>
            </div>
          </section>

          {/* Footer note */}
          <div className={styles.footerNote}>
            <div className={styles.footerNoteInner}>
              <FiShield size={16} />
              <span>
                This Privacy Policy was last updated on <strong>{LAST_UPDATED}</strong> and is effective as of <strong>{EFFECTIVE}</strong>.
                © {new Date().getFullYear()} IntechZone. All rights reserved.
              </span>
            </div>
          </div>

        </main>
      </div>

      {/* Back to top */}
      {showBackTop && (
        <button
          className={styles.backTop}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <FiArrowUp size={18} />
        </button>
      )}
    </div>
  )
}