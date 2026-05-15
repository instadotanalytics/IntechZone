// TermsOfService.jsx
import React, { useState, useEffect } from 'react'
import styles from './TermsOfService.module.css'
import {
  FiFileText, FiUserCheck, FiUser, FiSlash, FiAward,
  FiServer, FiAlertTriangle, FiGlobe, FiUserX, FiShield,
  FiFlag, FiRefreshCw, FiMail, FiChevronRight, FiArrowUp,
  FiArrowRight, FiInfo
} from 'react-icons/fi'

const SECTIONS = [
  { id: 'introduction',      icon: FiFileText,     title: 'Introduction' },
  { id: 'eligibility',       icon: FiUserCheck,    title: 'Eligibility' },
  { id: 'user-accounts',     icon: FiUser,         title: 'User Accounts' },
  { id: 'acceptable-use',    icon: FiSlash,        title: 'Acceptable Use' },
  { id: 'intellectual',      icon: FiAward,        title: 'Intellectual Property' },
  { id: 'services',          icon: FiServer,       title: 'Services & Availability' },
  { id: 'liability',         icon: FiAlertTriangle,'title': 'Limitation of Liability' },
  { id: 'third-party',       icon: FiGlobe,        title: 'Third-Party Services' },
  { id: 'termination',       icon: FiUserX,        title: 'Termination of Access' },
  { id: 'privacy',           icon: FiShield,       title: 'Privacy Policy' },
  { id: 'governing-law',     icon: FiFlag,         title: 'Governing Law' },
  { id: 'changes',           icon: FiRefreshCw,    title: 'Changes to Terms' },
  { id: 'contact',           icon: FiMail,         title: 'Contact Us' },
]

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState('introduction')
  const [showBackTop,   setShowBackTop]   = useState(false)

  const LAST_UPDATED = 'May 15, 2025'
  const EFFECTIVE    = 'May 15, 2025'

  useEffect(() => {
    const onScroll = () => {
      setShowBackTop(window.scrollY > 400)
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

      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <FiFileText size={13} /> Legal Document
          </div>
          <h1 className={styles.heroTitle}>Terms of Service</h1>
          <p className={styles.heroSub}>
            Please read these Terms carefully before using IntechZone's platform. By accessing our website, you agree to be bound by these Terms.
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

      {/* ── Acceptance notice ── */}
      <div className={styles.acceptanceBanner}>
        <div className={styles.acceptanceInner}>
          <FiInfo size={16} />
          <span>
            By accessing or using <strong>https://intechzone.in</strong>, you confirm that you have read, understood, and agree to these Terms of Service and our{' '}
            <a href="/privacy-policy" className={styles.bannerLink}>Privacy Policy</a>.
            If you do not agree, please discontinue use of this Platform immediately.
          </span>
        </div>
      </div>

      {/* ── Layout ── */}
      <div className={styles.layout}>

        {/* ── Sidebar TOC ── */}
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
                  <div className={styles.tocIcon}><Icon size={13} /></div>
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

        {/* ── Content ── */}
        <main className={styles.content}>

          {/* 1. Introduction */}
          <section id="introduction" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#1a55d4' }}>
                <FiFileText size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 01</div>
                <h2 className={styles.sectionTitle}>Introduction</h2>
              </div>
            </div>
            <div className={styles.body}>
              <p>
                Welcome to <strong>IntechZone</strong> ("Company", "we", "our", or "us"). IntechZone is a technology solutions company headquartered in India, operating through our website at{' '}
                <a href="https://intechzone.in" className={styles.link}>https://intechzone.in</a>{' '}
                (the "Platform"). We provide a range of technology services including web development, mobile app development, software solutions, IT consulting, cloud infrastructure, cybersecurity, digital marketing, and related professional services.
              </p>
              <p>
                These Terms of Service ("Terms") govern your access to and use of our Platform, services, content, and any features or functionality offered through IntechZone. These Terms constitute a legally binding agreement between you ("User", "you", or "your") and IntechZone.
              </p>
              <p>
                By accessing, browsing, registering on, or otherwise using this Platform in any manner, you acknowledge that you have read, understood, and agree to be bound by these Terms and all applicable laws and regulations. If you are using the Platform on behalf of a company or other legal entity, you represent that you have the authority to bind that entity to these Terms.
              </p>
              <div className={styles.highlightBox}>
                <FiFileText size={15} />
                <span>
                  These Terms apply to all visitors, registered users, clients, and any other persons who access or use the Platform. These Terms are effective as of <strong>{EFFECTIVE}</strong> and supersede all prior agreements.
                </span>
              </div>
            </div>
          </section>

          {/* 2. Eligibility */}
          <section id="eligibility" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#059669' }}>
                <FiUserCheck size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 02</div>
                <h2 className={styles.sectionTitle}>Eligibility to Use the Website</h2>
              </div>
            </div>
            <div className={styles.body}>
              <p>
                To access or use the IntechZone Platform, you must meet the following eligibility requirements:
              </p>
              <div className={styles.eligibilityList}>
                {[
                  {
                    num: '01',
                    title: 'Age Requirement',
                    desc: 'You must be at least 18 years of age. If you are between 13 and 18 years old, you may use the Platform only with the express consent and supervision of a parent or legal guardian. Persons under 13 years of age are strictly prohibited from using the Platform.',
                  },
                  {
                    num: '02',
                    title: 'Legal Capacity',
                    desc: 'You must have the legal capacity to enter into a binding contract under the laws of your jurisdiction. If you are using the Platform on behalf of an organization, you confirm that you are authorized to bind that organization to these Terms.',
                  },
                  {
                    num: '03',
                    title: 'Not Prohibited',
                    desc: 'Your use of the Platform must not violate any applicable laws or regulations. You must not be a person barred from receiving services under the laws of India or any other applicable jurisdiction.',
                  },
                  {
                    num: '04',
                    title: 'Accurate Information',
                    desc: 'You agree to provide truthful, accurate, and complete information when registering or interacting with our Platform. Providing false information constitutes a material breach of these Terms.',
                  },
                ].map(({ num, title, desc }) => (
                  <div key={num} className={styles.eligibilityItem}>
                    <div className={styles.eligNum}>{num}</div>
                    <div>
                      <div className={styles.eligTitle}>{title}</div>
                      <div className={styles.eligDesc}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p>
                IntechZone reserves the right to refuse access to the Platform to any person who does not meet these eligibility criteria or who has previously violated these Terms.
              </p>
            </div>
          </section>

          {/* 3. User Accounts */}
          <section id="user-accounts" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#7c3aed' }}>
                <FiUser size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 03</div>
                <h2 className={styles.sectionTitle}>User Accounts and Responsibilities</h2>
              </div>
            </div>
            <div className={styles.body}>
              <p>
                Certain features and services on the IntechZone Platform require you to register for an account. By creating an account, you agree to the following responsibilities:
              </p>

              <h3 className={styles.h3}>A. Account Registration</h3>
              <ul className={styles.list}>
                <li>You must provide accurate, complete, and current information during the registration process, including your name, email address, and any other required fields.</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials, including your password. You must not share your login details with any third party.</li>
                <li>You must notify us immediately at <a href="mailto:support@intechzone.in" className={styles.link}>support@intechzone.in</a> upon becoming aware of any unauthorized use of your account or any breach of security.</li>
                <li>Each individual or entity may create only one account unless explicitly permitted by IntechZone in writing.</li>
              </ul>

              <h3 className={styles.h3}>B. Account Security</h3>
              <ul className={styles.list}>
                <li>You are solely responsible for all activities that occur under your account, regardless of whether such activities were authorized by you.</li>
                <li>IntechZone will not be liable for any loss or damage arising from your failure to comply with these security obligations.</li>
                <li>We recommend using a strong, unique password and enabling any available multi-factor authentication features.</li>
              </ul>

              <h3 className={styles.h3}>C. Account Accuracy</h3>
              <ul className={styles.list}>
                <li>You agree to promptly update your account information to keep it accurate and current at all times.</li>
                <li>IntechZone reserves the right to suspend or terminate accounts found to contain false, misleading, or incomplete information.</li>
              </ul>

              <div className={styles.warningBox}>
                <FiAlertTriangle size={15} />
                <span>
                  You are fully responsible for all actions taken through your account. IntechZone shall not be held liable for any unauthorized access resulting from your failure to safeguard your credentials.
                </span>
              </div>
            </div>
          </section>

          {/* 4. Acceptable Use */}
          <section id="acceptable-use" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#dc2626' }}>
                <FiSlash size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 04</div>
                <h2 className={styles.sectionTitle}>Acceptable Use Policy</h2>
              </div>
            </div>
            <div className={styles.body}>
              <p>
                IntechZone grants you a limited, non-exclusive, non-transferable, and revocable license to access and use the Platform strictly in accordance with these Terms. The following rules govern your use of the Platform:
              </p>

              <div className={styles.useGrid}>
                <div className={styles.useAllowed}>
                  <div className={styles.useHeader}>
                    <div className={styles.useHeaderDot + ' ' + styles.allowedDot} />
                    Permitted Uses
                  </div>
                  <ul className={styles.useList}>
                    <li>Browsing and accessing publicly available content on the Platform</li>
                    <li>Registering an account and using features as intended</li>
                    <li>Submitting contact forms or service inquiries in good faith</li>
                    <li>Sharing Platform content with proper attribution and a link back</li>
                    <li>Using services and resources provided by IntechZone for lawful purposes</li>
                    <li>Downloading materials explicitly made available for download</li>
                  </ul>
                </div>

                <div className={styles.useProhibited}>
                  <div className={styles.useHeader}>
                    <div className={styles.useHeaderDot + ' ' + styles.prohibitedDot} />
                    Prohibited Uses
                  </div>
                  <ul className={styles.useList}>
                    <li>Using the Platform for any unlawful, fraudulent, or malicious purpose</li>
                    <li>Attempting to gain unauthorized access to any part of the Platform or its servers</li>
                    <li>Transmitting viruses, malware, ransomware, or any other harmful software</li>
                    <li>Scraping, crawling, or harvesting data without prior written consent</li>
                    <li>Reverse engineering, decompiling, or disassembling any part of the Platform</li>
                    <li>Impersonating IntechZone, its employees, or any other person or entity</li>
                    <li>Posting spam, unsolicited messages, or misleading content</li>
                    <li>Circumventing or disabling security features or access controls</li>
                    <li>Using automated bots or scripts to interact with the Platform without authorization</li>
                    <li>Engaging in any conduct that restricts or inhibits other users' use of the Platform</li>
                  </ul>
                </div>
              </div>

              <p>
                Violation of this Acceptable Use Policy may result in immediate suspension or permanent termination of your account, reporting to relevant authorities, and/or legal action. IntechZone reserves the right to determine, at its sole discretion, what constitutes a violation.
              </p>
            </div>
          </section>

          {/* 5. Intellectual Property */}
          <section id="intellectual" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#d97706' }}>
                <FiAward size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 05</div>
                <h2 className={styles.sectionTitle}>Intellectual Property Rights</h2>
              </div>
            </div>
            <div className={styles.body}>
              <p>
                All content, materials, and elements on the IntechZone Platform are protected by applicable intellectual property laws, including copyright, trademark, patent, and trade secret laws of India and applicable international treaties.
              </p>

              <h3 className={styles.h3}>A. IntechZone Ownership</h3>
              <p>
                The following are the exclusive property of IntechZone and are protected without limitation:
              </p>
              <div className={styles.ipGrid}>
                {[
                  { emoji: '🎨', label: 'Design & UI',     desc: 'All visual design, interface layouts, color schemes, typography, and user experience elements' },
                  { emoji: '💻', label: 'Source Code',      desc: 'All frontend and backend code, algorithms, databases, scripts, and technical implementations' },
                  { emoji: '™️',  label: 'Brand Assets',    desc: 'The IntechZone name, logo, taglines, slogans, and all associated branding and identity elements' },
                  { emoji: '📄', label: 'Content',          desc: 'All written content, blog posts, service descriptions, case studies, images, and multimedia' },
                  { emoji: '🛠️', label: 'Tools & Software', desc: 'Any proprietary tools, plugins, frameworks, or software developed by IntechZone' },
                  { emoji: '📊', label: 'Data & Reports',   desc: 'Compiled data, analytics, research, templates, and reports produced by IntechZone' },
                ].map(({ emoji, label, desc }) => (
                  <div key={label} className={styles.ipCard}>
                    <div className={styles.ipEmoji}>{emoji}</div>
                    <div className={styles.ipLabel}>{label}</div>
                    <div className={styles.ipDesc}>{desc}</div>
                  </div>
                ))}
              </div>

              <h3 className={styles.h3}>B. Restrictions</h3>
              <ul className={styles.list}>
                <li>You may not reproduce, copy, distribute, republish, upload, post, or transmit any part of the Platform's content without prior written permission from IntechZone.</li>
                <li>You may not use the IntechZone name, logo, or any branding elements in any manner that implies endorsement without written consent.</li>
                <li>Modification, adaptation, or creation of derivative works based on Platform content is strictly prohibited.</li>
              </ul>

              <h3 className={styles.h3}>C. User-Submitted Content</h3>
              <p>
                If you submit any content, feedback, suggestions, or materials to IntechZone (via forms, email, or otherwise), you grant us a non-exclusive, royalty-free, worldwide, perpetual license to use, reproduce, modify, and publish such content for the purposes of operating and improving our services, unless otherwise agreed in writing.
              </p>

              <div className={styles.highlightBox}>
                <FiAward size={15} />
                <span>
                  Any unauthorized use of IntechZone's intellectual property may result in civil and/or criminal proceedings under applicable Indian and international law.
                </span>
              </div>
            </div>
          </section>

          {/* 6. Services & Availability */}
          <section id="services" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#0891b2' }}>
                <FiServer size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 06</div>
                <h2 className={styles.sectionTitle}>Services and Availability</h2>
              </div>
            </div>
            <div className={styles.body}>
              <p>
                IntechZone strives to provide a reliable, high-quality Platform and services. However, the following terms apply to service availability:
              </p>

              <div className={styles.serviceBlocks}>
                {[
                  {
                    icon: '🕐',
                    title: 'Uptime & Availability',
                    desc: 'While we target maximum uptime, IntechZone does not guarantee that the Platform will be available 100% of the time. Scheduled maintenance, updates, server issues, or circumstances beyond our control may result in temporary downtime. We will make reasonable efforts to notify users in advance of planned maintenance.',
                  },
                  {
                    icon: '🔄',
                    title: 'Changes & Updates',
                    desc: 'IntechZone reserves the right to modify, suspend, discontinue, or update any part of the Platform or its services at any time, with or without prior notice. This includes changes to features, pricing, service offerings, content, or functionality.',
                  },
                  {
                    icon: '⚡',
                    title: 'Service Quality',
                    desc: 'We strive to maintain high performance and quality standards. However, the Platform is provided on an "as-is" and "as-available" basis without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability or fitness for a particular purpose.',
                  },
                  {
                    icon: '🚫',
                    title: 'Service Denial',
                    desc: 'IntechZone reserves the right to refuse service, restrict access, or limit the use of any features to any user at our sole discretion and without prior notice, particularly where misuse, violation of terms, or fraudulent activity is detected.',
                  },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className={styles.serviceBlock}>
                    <div className={styles.serviceEmoji}>{icon}</div>
                    <div>
                      <div className={styles.serviceTitle}>{title}</div>
                      <div className={styles.serviceDesc}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. Limitation of Liability */}
          <section id="liability" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#dc2626' }}>
                <FiAlertTriangle size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 07</div>
                <h2 className={styles.sectionTitle}>Limitation of Liability</h2>
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.liabilityBanner}>
                <div className={styles.liabilityIcon}>⚠️</div>
                <div>
                  <div className={styles.liabilityTitle}>Important Legal Notice</div>
                  <div className={styles.liabilityText}>
                    To the maximum extent permitted by applicable law, IntechZone's total liability to you for any claims arising out of or relating to these Terms or the Platform shall not exceed the amount paid by you to IntechZone in the twelve (12) months preceding the claim.
                  </div>
                </div>
              </div>

              <h3 className={styles.h3}>A. Exclusion of Damages</h3>
              <p>
                IntechZone, its directors, employees, agents, partners, and affiliates shall not be liable for any of the following types of losses or damages, even if advised of their possibility:
              </p>
              <ul className={styles.list}>
                <li><strong>Direct Damages:</strong> Loss of data, loss of profits, loss of revenue, or business interruption arising from use or inability to use the Platform</li>
                <li><strong>Indirect Damages:</strong> Indirect, incidental, special, consequential, or punitive damages of any kind</li>
                <li><strong>Third-Party Actions:</strong> Damages resulting from unauthorized access to your data by third parties</li>
                <li><strong>Force Majeure:</strong> Damages due to events beyond our reasonable control, including natural disasters, government actions, cyberattacks, or internet outages</li>
                <li><strong>User Errors:</strong> Losses resulting from your own errors, omissions, or failure to maintain account security</li>
                <li><strong>Third-Party Services:</strong> Damages arising from the use of third-party services integrated with or linked from our Platform</li>
              </ul>

              <h3 className={styles.h3}>B. No Warranty</h3>
              <p>
                The Platform and all content, services, and materials therein are provided strictly on an <strong>"as-is"</strong> and <strong>"as-available"</strong> basis. IntechZone makes no representations or warranties of any kind, express or implied, regarding:
              </p>
              <ul className={styles.list}>
                <li>The accuracy, completeness, reliability, or timeliness of any content</li>
                <li>That the Platform will be error-free, uninterrupted, or free of viruses</li>
                <li>The fitness of the Platform for any particular purpose</li>
              </ul>

              <div className={styles.warningBox}>
                <FiAlertTriangle size={15} />
                <span>
                  Some jurisdictions do not allow the exclusion or limitation of incidental or consequential damages. In such cases, our liability is limited to the fullest extent permitted by law.
                </span>
              </div>
            </div>
          </section>

          {/* 8. Third-Party Services */}
          <section id="third-party" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#0891b2' }}>
                <FiGlobe size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 08</div>
                <h2 className={styles.sectionTitle}>Third-Party Services and Links</h2>
              </div>
            </div>
            <div className={styles.body}>
              <p>
                The IntechZone Platform may integrate with, display links to, or rely on third-party services, websites, tools, and platforms that are not owned or controlled by IntechZone. This section governs your relationship with such third parties.
              </p>

              <div className={styles.tpGrid}>
                {[
                  {
                    title: 'External Links',
                    desc: 'Our Platform may contain hyperlinks to external websites for your convenience. These links do not constitute an endorsement, sponsorship, or approval of those websites. IntechZone has no control over the content, privacy practices, or terms of third-party websites.',
                  },
                  {
                    title: 'Integrated Services',
                    desc: 'We may integrate third-party services such as Google Analytics, payment gateways (Razorpay, Stripe), cloud providers (AWS, GCP), and email services. These services are governed by their own terms and privacy policies.',
                  },
                  {
                    title: 'No Responsibility',
                    desc: 'IntechZone shall not be responsible or liable for any content, products, services, or practices of any third-party website or service, including any damage or loss caused or alleged to be caused by or in connection with use of those services.',
                  },
                  {
                    title: 'User Responsibility',
                    desc: 'When you access a third-party service through our Platform, you do so at your own risk. We strongly encourage you to review the terms and privacy policies of any third-party services you access.',
                  },
                ].map(({ title, desc }) => (
                  <div key={title} className={styles.tpCard}>
                    <div className={styles.tpTitle}>{title}</div>
                    <div className={styles.tpDesc}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 9. Termination */}
          <section id="termination" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#dc2626' }}>
                <FiUserX size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 09</div>
                <h2 className={styles.sectionTitle}>Termination of Access</h2>
              </div>
            </div>
            <div className={styles.body}>
              <p>
                IntechZone reserves the right to suspend, restrict, or permanently terminate your access to the Platform and your account at any time, with or without prior notice, under the following circumstances:
              </p>

              <div className={styles.terminationList}>
                {[
                  { trigger: 'Terms Violation',        desc: 'You have violated any provision of these Terms of Service or our Acceptable Use Policy.' },
                  { trigger: 'Fraudulent Activity',     desc: 'We suspect or detect fraudulent, deceptive, or malicious activity associated with your account.' },
                  { trigger: 'Abusive Behavior',        desc: 'You engage in abusive, threatening, or harassing conduct toward IntechZone staff, partners, or other users.' },
                  { trigger: 'False Information',       desc: 'You have provided false, inaccurate, or misleading information during registration or subsequent interactions.' },
                  { trigger: 'Security Threat',         desc: 'Your account or activity poses a security risk to the Platform, other users, or our infrastructure.' },
                  { trigger: 'Legal Requirement',       desc: 'We are required to do so by applicable law, court order, or regulatory authority.' },
                  { trigger: 'Non-Payment',             desc: 'Where applicable, failure to make timely payment for services rendered by IntechZone.' },
                ].map(({ trigger, desc }) => (
                  <div key={trigger} className={styles.terminationItem}>
                    <div className={styles.terminationTrigger}>{trigger}</div>
                    <div className={styles.terminationDesc}>{desc}</div>
                  </div>
                ))}
              </div>

              <h3 className={styles.h3}>Effect of Termination</h3>
              <ul className={styles.list}>
                <li>Upon termination, your right to access and use the Platform ceases immediately.</li>
                <li>Any data associated with your account may be deleted or anonymized, subject to our data retention obligations under applicable law.</li>
                <li>Provisions of these Terms that by their nature should survive termination (including intellectual property rights, limitation of liability, and governing law) shall remain in full force and effect.</li>
              </ul>

              <h3 className={styles.h3}>User-Initiated Account Deletion</h3>
              <p>
                You may request deletion of your account at any time by contacting us at <a href="mailto:support@intechzone.in" className={styles.link}>support@intechzone.in</a>. We will process your request within <strong>14 business days</strong>, subject to any outstanding obligations or legal requirements.
              </p>
            </div>
          </section>

          {/* 10. Privacy Policy Reference */}
          <section id="privacy" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#059669' }}>
                <FiShield size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 10</div>
                <h2 className={styles.sectionTitle}>Privacy Policy Reference</h2>
              </div>
            </div>
            <div className={styles.body}>
              <p>
                Your privacy is critically important to us. The collection, use, storage, and sharing of your personal information when you use the IntechZone Platform is governed by our separate <strong>Privacy Policy</strong>, which is hereby incorporated into these Terms of Service by reference.
              </p>

              <div className={styles.privacyRefCard}>
                <div className={styles.privacyRefLeft}>
                  <div className={styles.privacyRefIcon}>🔐</div>
                  <div>
                    <div className={styles.privacyRefTitle}>IntechZone Privacy Policy</div>
                    <div className={styles.privacyRefDesc}>
                      Our Privacy Policy explains what data we collect, how we use it, your rights over your data, our cookie practices, and how we keep your information secure.
                    </div>
                  </div>
                </div>
                <a href="/privacy-policy" className={styles.privacyRefBtn}>
                  Read Privacy Policy <FiArrowRight size={13} />
                </a>
              </div>

              <p>
                By agreeing to these Terms, you also acknowledge and accept our Privacy Policy. We encourage you to read both documents in full before using our Platform. Our Privacy Policy is also available at{' '}
                <a href="https://intechzone.in/privacy-policy" className={styles.link}>intechzone.in/privacy-policy</a>.
              </p>
            </div>
          </section>

          {/* 11. Governing Law */}
          <section id="governing-law" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#7c3aed' }}>
                <FiFlag size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 11</div>
                <h2 className={styles.sectionTitle}>Governing Law and Jurisdiction</h2>
              </div>
            </div>
            <div className={styles.body}>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of the <strong>Republic of India</strong>, without regard to its conflict of law provisions.
              </p>

              <div className={styles.lawGrid}>
                {[
                  {
                    flag: '🇮🇳',
                    title: 'Applicable Law',
                    desc: 'These Terms are governed by Indian law, including but not limited to the Information Technology Act, 2000, the Information Technology (Amendment) Act, 2008, and the Digital Personal Data Protection Act, 2023.',
                  },
                  {
                    flag: '⚖️',
                    title: 'Jurisdiction',
                    desc: 'Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in India. International users consent to the jurisdiction of Indian courts for such disputes.',
                  },
                  {
                    flag: '🤝',
                    title: 'Dispute Resolution',
                    desc: 'Before initiating any legal proceedings, both parties agree to attempt to resolve disputes amicably through good-faith negotiation for a period of at least 30 days from the date of written notice of the dispute.',
                  },
                  {
                    flag: '🌐',
                    title: 'International Users',
                    desc: 'If you access our Platform from outside India, you are responsible for compliance with your local laws. IntechZone makes no representation that the Platform or its content is appropriate or legally available in all jurisdictions.',
                  },
                ].map(({ flag, title, desc }) => (
                  <div key={title} className={styles.lawCard}>
                    <div className={styles.lawFlag}>{flag}</div>
                    <div className={styles.lawTitle}>{title}</div>
                    <div className={styles.lawDesc}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 12. Changes to Terms */}
          <section id="changes" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#0891b2' }}>
                <FiRefreshCw size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 12</div>
                <h2 className={styles.sectionTitle}>Changes to These Terms</h2>
              </div>
            </div>
            <div className={styles.body}>
              <p>
                IntechZone reserves the right to amend, modify, or replace these Terms of Service at any time. We are committed to keeping our users informed of any material changes that may affect their rights or obligations.
              </p>
              <p>When we make significant changes to these Terms, we will:</p>

              <div className={styles.changesList}>
                {[
                  { step: '01', action: 'Update Date',        desc: 'Update the "Last Updated" date at the top of this page to reflect the date the changes take effect.' },
                  { step: '02', action: 'Platform Notice',    desc: 'Display a prominent notification banner on our Platform for a minimum of 14 days following the update.' },
                  { step: '03', action: 'Email Notification', desc: 'Send an email notification to all registered users summarizing the key changes made to the Terms.' },
                  { step: '04', action: 'Version Archive',    desc: 'Maintain an accessible archive of previous versions of the Terms upon request.' },
                ].map(({ step, action, desc }) => (
                  <div key={step} className={styles.changesItem}>
                    <div className={styles.changesStep}>{step}</div>
                    <div>
                      <div className={styles.changesAction}>{action}</div>
                      <div className={styles.changesDesc}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <p>
                Your continued use of the Platform after the effective date of any revised Terms constitutes your binding acceptance of the updated Terms. If you do not agree with any changes, you must discontinue use of the Platform and may request deletion of your account as outlined in Section 09.
              </p>

              <div className={styles.highlightBox}>
                <FiInfo size={15} />
                <span>
                  We recommend bookmarking this page and reviewing these Terms periodically. The current version will always be available at <a href="https://intechzone.in/terms-of-service" className={styles.link}>intechzone.in/terms-of-service</a>.
                </span>
              </div>
            </div>
          </section>

          {/* 13. Contact Information */}
          <section id="contact" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} style={{ '--c': '#059669' }}>
                <FiMail size={18} />
              </div>
              <div>
                <div className={styles.sectionNum}>Section 13</div>
                <h2 className={styles.sectionTitle}>Contact Information</h2>
              </div>
            </div>
            <div className={styles.body}>
              <p>
                If you have any questions, concerns, or feedback regarding these Terms of Service, or if you wish to exercise any of your rights, please contact our team through the following channels:
              </p>

              <div className={styles.contactCard}>
                <div className={styles.contactHeader}>
                  <div className={styles.contactLogo}>IZ</div>
                  <div>
                    <div className={styles.contactName}>IntechZone</div>
                    <div className={styles.contactTagline}>Legal & Compliance Team</div>
                  </div>
                </div>
                <div className={styles.contactDetails}>
                  {[
                    { label: 'Support Email', value: 'support@intechzone.in', href: 'mailto:support@intechzone.in' },
                    { label: 'Admin Email',   value: 'admin@intechzone.in',   href: 'mailto:admin@intechzone.in' },
                    { label: 'Website',       value: 'https://intechzone.in', href: 'https://intechzone.in' },
                    { label: 'Terms Page',    value: 'intechzone.in/terms-of-service', href: 'https://intechzone.in/terms-of-service' },
                  ].map(({ label, value, href }) => (
                    <div key={label} className={styles.contactRow}>
                      <span className={styles.contactLabel}>{label}</span>
                      <a
                        href={href}
                        className={styles.contactValue}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                      >
                        {value}
                      </a>
                    </div>
                  ))}
                </div>
                <div className={styles.contactNote}>
                  We aim to respond to all Terms-related queries within <strong>5 business days</strong>.
                  For urgent legal matters, please include <em>"LEGAL — Terms"</em> in your subject line.
                </div>
              </div>
            </div>
          </section>

          {/* Footer note */}
          <div className={styles.footerNote}>
            <div className={styles.footerNoteInner}>
              <FiFileText size={16} />
              <span>
                These Terms of Service were last updated on <strong>{LAST_UPDATED}</strong> and are effective as of <strong>{EFFECTIVE}</strong>.
                By using the IntechZone Platform, you acknowledge your acceptance of these Terms.
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