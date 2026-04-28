import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CyberSecurity.module.css';
import {
  FiArrowRight, FiCheckCircle, FiClock, FiStar, FiAward,
  FiZap, FiTrendingUp, FiUsers, FiGlobe, FiHeadphones,
  FiTarget, FiShield, FiRefreshCw, FiServer, FiCpu,
  FiCloud, FiMonitor, FiTool, FiMail, FiPhone,
  FiMapPin, FiDollarSign, FiPieChart, FiCode,
  FiDatabase, FiActivity, FiGrid, FiBarChart2,
  FiMessageSquare, FiLayers, FiSettings, FiLifeBuoy,
  FiAlertTriangle, FiLock, FiEye, FiEyeOff,
  FiUserCheck, FiFileText, FiRadio, FiWifi,
  FiSmartphone, FiHardDrive, FiKey, FiUnlock,
  FiAlertCircle, FiSearch, FiGlobe as FiGlobal
} from 'react-icons/fi';
import WaveCanvas from '../../../Pages/Home/Wavecanvas';
import AllServicesForm from '../../../Pages/CompanyServices/AllServicesForm';
import TestimonialSection from '../../../Pages/Home/TestimonialSection';

const CyberSecurity = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: '500+', label: 'Security Assessments', desc: 'Completed Annually', icon: FiSearch },
    { value: '99.99%', label: 'Threat Detection Rate', desc: 'AI-Powered Monitoring', icon: FiEye },
    { value: '24/7/365', label: 'Security Operations', desc: 'SOC Coverage', icon: FiClock },
    { value: '50+', label: 'Security Experts', desc: 'CISSP, CEH, OSCP Certified', icon: FiUsers }
  ];

  const threats = [
    {
      icon: FiAlertTriangle,
      title: 'Ransomware Attacks',
      description: 'Ransomware attacks occur every 11 seconds. Protect your data from encryption and extortion with advanced endpoint protection and immutable backups.',
      stats: '$4.5M avg cost per attack'
    },
    {
      icon: FiLock,
      title: 'Data Breaches',
      description: 'Over 22 billion records exposed in 2022. Prevent unauthorized access with zero-trust architecture and data encryption.',
      stats: '83% involve external actors'
    },
    {
      icon: FiWifi,
      title: 'Network Intrusions',
      description: 'Perimeter defenses are no longer enough. Deploy layered network security with NGFW, IDS/IPS, and network segmentation.',
      stats: '43% target small businesses'
    },
    {
      icon: FiMail,
      title: 'Phishing & Social Engineering',
      description: '91% of cyber attacks start with phishing. Protect your workforce with email security, security awareness training, and MFA.',
      stats: '3.4B phishing emails daily'
    }
  ];

  const services = [
    {
      icon: FiShield,
      title: 'Managed Security Services',
      subtitle: '24/7 Security Operations Center',
      description: 'Comprehensive managed security services with 24/7 monitoring, threat detection, incident response, and continuous security improvement. Our SOC team acts as an extension of your security team.',
      features: [
        '24/7 security event monitoring',
        'SIEM management and optimization',
        'Threat intelligence integration',
        'Incident detection and triage',
        'Security orchestration (SOAR)',
        'Monthly security reports'
      ],
      color: '#3b82f6'
    },
    {
      icon: FiSearch,
      title: 'Vulnerability Assessment',
      subtitle: 'Identify & Remediate Security Gaps',
      description: 'Comprehensive vulnerability assessment and penetration testing services to identify security weaknesses before attackers do. Includes network, application, and cloud security testing.',
      features: [
        'Network vulnerability scanning',
        'Web application security testing',
        'API security assessment',
        'Cloud configuration review',
        'Penetration testing (black/grey/white box)',
        'Remediation guidance'
      ],
      color: '#ef4444'
    },
    {
      icon: FiFileText,
      title: 'Compliance & Audit',
      subtitle: 'Meet Regulatory Requirements',
      description: 'Achieve and maintain compliance with industry regulations and standards. Our experts guide you through the entire compliance journey from gap analysis to audit readiness.',
      features: [
        'SOC 2 Type I & II preparation',
        'HIPAA security compliance',
        'PCI-DSS certification support',
        'GDPR compliance assessment',
        'ISO 27001 implementation',
        'NIST framework alignment'
      ],
      color: '#10b981'
    },
    {
      icon: FiUsers,
      title: 'Security Awareness Training',
      subtitle: 'Build a Security-First Culture',
      description: 'Transform your employees from security risk to security asset with comprehensive awareness programs. Includes phishing simulations, security training modules, and behavior analytics.',
      features: [
        'Phishing simulation campaigns',
        'Interactive security training',
        'Role-based awareness programs',
        'Security culture assessment',
        'Gamified learning modules',
        'Progress tracking & reporting'
      ],
      color: '#f59e0b'
    },
    {
      icon: FiKey,
      title: 'Identity & Access Management',
      subtitle: 'Zero Trust Access Control',
      description: 'Implement robust identity and access management with MFA, SSO, PAM, and identity governance. Ensure right people have right access at right time with full audit trail.',
      features: [
        'Multi-factor authentication (MFA)',
        'Single sign-on (SSO) implementation',
        'Privileged access management (PAM)',
        'Identity governance & administration',
        'Access certification campaigns',
        'User behavior analytics'
      ],
      color: '#8b5cf6'
    },
    {
      icon: FiHardDrive,
      title: 'Incident Response & Forensics',
      subtitle: 'Rapid Breach Response',
      description: 'Prepare for and respond to security incidents with our expert incident response team. Includes forensic investigation, containment, eradication, and recovery services.',
      features: [
        'Incident response planning',
        'Digital forensics investigation',
        'Malware analysis & reverse engineering',
        'Breach containment & eradication',
        'Evidence preservation',
        'Post-incident review & recommendations'
      ],
      color: '#06b6d4'
    }
  ];

  const framework = [
    {
      phase: 'Identify',
      description: 'Develop organizational understanding to manage cybersecurity risk to systems, assets, data, and capabilities.',
      activities: ['Asset Management', 'Risk Assessment', 'Governance', 'Business Environment'],
      icon: FiTarget
    },
    {
      phase: 'Protect',
      description: 'Develop and implement appropriate safeguards to ensure delivery of critical infrastructure services.',
      activities: ['Access Control', 'Awareness Training', 'Data Security', 'Protective Technology'],
      icon: FiShield
    },
    {
      phase: 'Detect',
      description: 'Develop and implement appropriate activities to identify the occurrence of a cybersecurity event.',
      activities: ['Anomalies & Events', 'Continuous Monitoring', 'Detection Processes'],
      icon: FiEye
    },
    {
      phase: 'Respond',
      description: 'Develop and implement appropriate activities to take action regarding a detected cybersecurity incident.',
      activities: ['Response Planning', 'Communications', 'Analysis', 'Mitigation'],
      icon: FiAlertCircle
    },
    {
      phase: 'Recover',
      description: 'Develop and implement appropriate activities to restore capabilities impaired due to a cybersecurity incident.',
      activities: ['Recovery Planning', 'Improvements', 'Communications'],
      icon: FiRefreshCw
    }
  ];

  const caseStudies = [
    {
      title: 'Financial Services Security Transformation',
      industry: 'Banking & Finance',
      challenge: 'A leading bank faced sophisticated ransomware attacks and needed to upgrade their security posture to protect $50B+ in assets and meet regulatory requirements.',
      solution: 'Deployed 24/7 SOC with SIEM, implemented zero-trust architecture, conducted organization-wide security training, and achieved SOC 2 certification.',
      results: [
        { metric: '0', label: 'Breaches in 24 months' },
        { metric: '99.99%', label: 'Threat Detection' },
        { metric: 'SOC 2', label: 'Certified' },
        { metric: '15 mins', label: 'Response Time' }
      ],
      color: '#3b82f6'
    },
    {
      title: 'Healthcare HIPAA Compliance Program',
      industry: 'Healthcare',
      challenge: 'A hospital network with 20,000+ employees needed to achieve HIPAA compliance, protect patient data, and secure connected medical devices.',
      solution: 'Conducted comprehensive risk assessment, implemented security controls, deployed endpoint protection for medical devices, and trained all staff.',
      results: [
        { metric: '100%', label: 'HIPAA Compliant' },
        { metric: '0', label: 'Data Breaches' },
        { metric: '20K+', label: 'Staff Trained' },
        { metric: '8 weeks', label: 'Implementation' }
      ],
      color: '#10b981'
    },
    {
      title: 'E-Commerce DDoS Protection',
      industry: 'Retail & E-Commerce',
      challenge: 'A top e-commerce platform experienced crippling DDoS attacks during peak sales, causing $2M+ per hour in lost revenue.',
      solution: 'Implemented advanced DDoS mitigation, WAF deployment, bot management, and 24/7 traffic monitoring with automated incident response.',
      results: [
        { metric: '0', label: 'Successful Attacks' },
        { metric: '100%', label: 'Uptime During Peaks' },
        { metric: '50Tbps', label: 'Mitigation Capacity' },
        { metric: '< 1 sec', label: 'Attack Detection' }
      ],
      color: '#8b5cf6'
    }
  ];

  const certifications = [
    'CISSP - Certified Information Systems Security Professional',
    'CEH - Certified Ethical Hacker',
    'OSCP - Offensive Security Certified Professional',
    'CISM - Certified Information Security Manager',
    'CISA - Certified Information Systems Auditor',
    'CCSP - Certified Cloud Security Professional',
    'CompTIA Security+',
    'GIAC - Global Information Assurance Certification'
  ];

  const faqs = [
    {
      question: 'What cybersecurity services do you offer?',
      answer: 'We provide end-to-end cybersecurity services including managed security services (24/7 SOC), vulnerability assessment and penetration testing, compliance and audit support (SOC 2, HIPAA, PCI-DSS, GDPR, ISO 27001), security awareness training, identity and access management, incident response and digital forensics, cloud security, and security architecture consulting. Our services are tailored to your specific industry, size, and risk profile.'
    },
    {
      question: 'How quickly can you respond to a security incident?',
      answer: 'Our incident response team is available 24/7 with guaranteed response times. For critical incidents (active breach, ransomware), we respond within 15 minutes. For high-severity incidents, response time is under 1 hour. Our retainer clients receive priority response with dedicated incident response leads assigned to their account. We also help develop incident response playbooks for your internal team.'
    },
    {
      question: 'Do you help with compliance certifications?',
      answer: 'Yes, we provide comprehensive compliance services including gap analysis, control implementation, evidence collection, and audit readiness support. Our team has extensive experience with SOC 2 (Type I & II), HIPAA, PCI-DSS, GDPR, ISO 27001, NIST CSF, and FedRAMP. We have successfully guided 200+ organizations through their compliance journeys with a 100% first-time pass rate for SOC 2 audits.'
    },
    {
      question: 'What makes your managed security services different?',
      answer: 'Our SOC combines AI-powered threat detection with human expertise. We use advanced SIEM with UEBA capabilities, integrate threat intelligence from 50+ sources, and employ certified security analysts (CISSP, CEH, GIAC). Our clients receive real-time dashboards, monthly executive reports, and quarterly security reviews. We maintain a 99.99% threat detection rate with less than 0.1% false positive rate.'
    },
    {
      question: 'How do you stay updated with latest threats?',
      answer: 'We maintain active memberships in threat intelligence sharing communities (ISACs), subscribe to 50+ threat intelligence feeds, participate in industry forums (FIRST, OWASP), and our research team continuously monitors dark web forums, malware repositories, and vulnerability databases. This intelligence is automatically integrated into our SIEM and shared with clients through threat advisories.'
    },
    {
      question: 'Can you work with our existing security tools and team?',
      answer: 'We integrate with 200+ security tools including leading SIEMs (Splunk, QRadar, Sentinel), EDR (CrowdStrike, SentinelOne), firewalls (Palo Alto, Fortinet), and cloud security platforms. Our services complement your existing security team - we can provide 24/7 coverage for nights/weekends, augment your team during investigations, or serve as your complete security operations function.'
    }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className={styles.page}>
      {/* Top Alert Bar */}
      <div className={styles.alertBar}>
        <div className={styles.container}>
          <div className={styles.alertContent}>
            <FiAlertTriangle size={14} />
            <span>URGENT: New ransomware variant targeting enterprises. <Link to="/contact">Get immediate protection →</Link></span>
          </div>
        </div>
      </div>

      

      {/* Hero Section */}
      <section className={styles.hero}>
        <WaveCanvas/>
        <div className={styles.heroBg}>
          <div className={styles.heroGrid}></div>
          <div className={styles.heroGlow}></div>
        </div>
        <div className={styles.container}>
          <div className={styles.heroContent} data-animate="hero">
            <div className={styles.heroBadge}>
              <FiShield size={14} /> Enterprise-Grade Cybersecurity Solutions
            </div>
            <h1 className={styles.heroTitle}>
              Protect Your Business from{" "}
              <span className={styles.gradient}>Evolving Cyber Threats</span>
            </h1>
            <p className={styles.heroDesc}>
              Don't wait for a breach to take action. Our comprehensive cybersecurity services 
              protect your data, applications, and infrastructure with 24/7 monitoring, advanced 
              threat detection, and rapid incident response.
            </p>
            <p className={styles.heroDesc}>
              Trusted by 500+ organizations to safeguard their digital assets with military-grade 
              security solutions powered by AI and expert security analysts.
            </p>

            <div className={styles.heroHighlights}>
              <div className={styles.highlight}>
                <FiEye size={22} />
                <div>
                  <h4>24/7 Monitoring</h4>
                  <p>Continuous threat detection by SOC experts</p>
                </div>
              </div>
              <div className={styles.highlight}>
                <FiAlertCircle size={22} />
                <div>
                  <h4>15-Min Response</h4>
                  <p>SLA-backed critical incident response</p>
                </div>
              </div>
              <div className={styles.highlight}>
                <FiShield size={22} />
                <div>
                  <h4>Zero Trust Security</h4>
                  <p>Defense-in-depth architecture</p>
                </div>
              </div>
            </div>

            <div className={styles.heroButtons}>
              <Link to="/contact" className={styles.btnPrimary}>
                Get Free Security Assessment <FiArrowRight size={18} />
              </Link>
              <Link to="/contact" className={styles.btnEmergency}>
                <FiAlertCircle size={18} /> Report a Security Incident
              </Link>
            </div>

            <div className={styles.heroStats}>
              {stats.map((stat, idx) => (
                <div key={idx} className={styles.heroStat}>
                  <stat.icon size={22} />
                  <div>
                    <span>{stat.value}</span>
                    <p>{stat.label}</p>
                    <small>{stat.desc}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Threat Landscape */}
      <section className={styles.threatLandscape}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>
              <FiAlertTriangle size={14} /> Threat Landscape
            </span>
            <h2 className={styles.sectionTitle}>
              The <span className={styles.gradient}>Cyber Threat Landscape</span> is Evolving
            </h2>
            <p className={styles.sectionDesc}>
              Understanding the threats is the first step to building effective defenses. 
              Here are the most critical threats facing organizations today.
            </p>
          </div>

          <div className={styles.threatGrid}>
            {threats.map((threat, idx) => (
              <div key={idx} className={styles.threatCard} data-animate={`threat-${idx}`}>
                <div className={styles.threatIcon}>
                  <threat.icon size={32} />
                </div>
                <h3>{threat.title}</h3>
                <p>{threat.description}</p>
                <div className={styles.threatStat}>
                  <FiAlertCircle size={14} />
                  <span>{threat.stats}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <AllServicesForm/>

      {/* Services Section */}
      <section className={styles.services}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>
              <FiGrid size={14} /> Our Services
            </span>
            <h2 className={styles.sectionTitle}>
              Comprehensive <span className={styles.gradient}>Cybersecurity Solutions</span>
            </h2>
            <p className={styles.sectionDesc}>
              End-to-end security services covering prevention, detection, response, and recovery. 
              From managed SOC to compliance support, we protect your entire digital ecosystem.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service, idx) => (
              <div key={idx} className={styles.serviceCard} data-animate={`service-${idx}`}>
                <div className={styles.serviceHeader}>
                  <div className={styles.serviceIcon} style={{ background: `${service.color}15`, color: service.color }}>
                    <service.icon size={28} />
                  </div>
                  <span className={styles.serviceNumber}>0{idx + 1}</span>
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceSubtitle}>{service.subtitle}</p>
                <p className={styles.serviceDesc}>{service.description}</p>

                <div className={styles.serviceFeatures}>
                  <h4>What We Provide:</h4>
                  <ul>
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx}>
                        <FiCheckCircle size={14} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to="/contact" className={styles.serviceLink}>
                  Explore Service <FiArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Framework */}
      <section className={styles.framework}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>
              <FiLayers size={14} /> NIST Framework
            </span>
            <h2 className={styles.sectionTitle}>
              Our <span className={styles.gradient}>Security Framework</span>
            </h2>
            <p className={styles.sectionDesc}>
              We align our security services with the NIST Cybersecurity Framework — the gold 
              standard for enterprise security programs worldwide.
            </p>
          </div>

          <div className={styles.frameworkGrid}>
            {framework.map((phase, idx) => (
              <div key={idx} className={styles.frameworkCard} data-animate={`framework-${idx}`}>
                <div className={styles.frameworkIcon}>
                  <phase.icon size={32} />
                </div>
                <h3 className={styles.frameworkPhase}>{phase.phase}</h3>
                <p>{phase.description}</p>
                <div className={styles.frameworkActivities}>
                  {phase.activities.map((activity, aIdx) => (
                    <span key={aIdx} className={styles.frameworkActivity}>
                      <FiCheckCircle size={12} /> {activity}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className={styles.caseStudies}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>
              <FiBarChart2 size={14} /> Success Stories
            </span>
            <h2 className={styles.sectionTitle}>
              Security <span className={styles.gradient}>Success Stories</span>
            </h2>
            <p className={styles.sectionDesc}>
              How we helped organizations strengthen their security posture and achieve compliance
            </p>
          </div>

          <div className={styles.caseStudyGrid}>
            {caseStudies.map((study, idx) => (
              <div key={idx} className={styles.caseStudyCard} data-animate={`case-${idx}`}>
                <div className={styles.caseStudyBadge} style={{ background: `${study.color}15`, color: study.color }}>
                  {study.industry}
                </div>
                <h3>{study.title}</h3>
                <div className={styles.caseStudySection}>
                  <h4>Challenge:</h4>
                  <p>{study.challenge}</p>
                </div>
                <div className={styles.caseStudySection}>
                  <h4>Solution:</h4>
                  <p>{study.solution}</p>
                </div>
                <div className={styles.caseStudyResults}>
                  {study.results.map((result, rIdx) => (
                    <div key={rIdx} className={styles.resultItem}>
                      <span className={styles.resultMetric}>{result.metric}</span>
                      <span className={styles.resultLabel}>{result.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.caseStudyCTA}>
            <Link to="/portfolio" className={styles.btnOutline}>
              View All Case Studies <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className={styles.certifications}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>
              <FiAward size={14} /> Certifications
            </span>
            <h2 className={styles.sectionTitle}>
              Our Team <span className={styles.gradient}>Certifications</span>
            </h2>
            <p className={styles.sectionDesc}>
              Our security experts hold the most respected certifications in the industry
            </p>
          </div>

          <div className={styles.certGrid}>
            {certifications.map((cert, idx) => (
              <div key={idx} className={styles.certCard} data-animate={`cert-${idx}`}>
                <FiAward size={24} />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TestimonialSection/>

      {/* FAQ Section */}
      <section className={styles.faq}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>
              <FiMessageSquare size={14} /> FAQ
            </span>
            <h2 className={styles.sectionTitle}>
              Frequently Asked <span className={styles.gradient}>Questions</span>
            </h2>
          </div>

          <div className={styles.faqGrid}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`${styles.faqItem} ${activeFaq === idx ? styles.faqActive : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className={styles.faqHeader}>
                  <h3>{faq.question}</h3>
                  <span className={styles.faqIcon}>{activeFaq === idx ? '−' : '+'}</span>
                </div>
                <div className={styles.faqContent}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaWrapper}>
            <div className={styles.ctaContent}>
              <div className={styles.ctaBadge}>
                <FiAlertTriangle size={14} /> Don't Wait Until It's Too Late
              </div>
              <h2>Ready to Strengthen Your Security Posture?</h2>
              <p>
                Get a comprehensive security assessment from our certified experts. We will 
                evaluate your current security controls, identify vulnerabilities, assess your 
                risk exposure, and provide a prioritized remediation roadmap.
              </p>
              <p>
                Organizations that proactively invest in security save an average of $3.5M per 
                breach. Don't become another statistic — take action today.
              </p>

              <div className={styles.ctaFeatures}>
                <div className={styles.ctaFeature}>
                  <FiCheckCircle size={18} />
                  <span>Free security posture assessment ($5,000 value)</span>
                </div>
                <div className={styles.ctaFeature}>
                  <FiCheckCircle size={18} />
                  <span>Vulnerability scan of external assets</span>
                </div>
                <div className={styles.ctaFeature}>
                  <FiCheckCircle size={18} />
                  <span>Executive summary with risk ratings and recommendations</span>
                </div>
                <div className={styles.ctaFeature}>
                  <FiCheckCircle size={18} />
                  <span>30-minute consultation with senior security architect</span>
                </div>
              </div>

              <div className={styles.ctaButtons}>
                <Link to="/contact" className={styles.ctaBtnPrimary}>
                  Get Your Free Assessment <FiArrowRight size={18} />
                </Link>
                <Link to="/contact" className={styles.ctaBtnEmergency}>
                  <FiAlertCircle size={18} /> Report Active Security Incident
                </Link>
              </div>
            </div>

            <div className={styles.ctaSidebar}>
              <div className={styles.ctaCard}>
                <div className={styles.ctaCardHeader}>
                  <FiShield size={20} />
                  <span>Why Act Now?</span>
                </div>
                <ul className={styles.ctaCardList}>
                  <li>
                    <FiAlertTriangle size={16} />
                    <div>
                      <strong>Ransomware attack every 11 seconds</strong>
                      <p>Average cost: $4.5M per incident</p>
                    </div>
                  </li>
                  <li>
                    <FiAlertTriangle size={16} />
                    <div>
                      <strong>287 days to identify a breach</strong>
                      <p>Without proper monitoring</p>
                    </div>
                  </li>
                  <li>
                    <FiAlertTriangle size={16} />
                    <div>
                      <strong>60% of SMBs close within 6 months</strong>
                      <p>After a cyber attack</p>
                    </div>
                  </li>
                  <li>
                    <FiAlertTriangle size={16} />
                    <div>
                      <strong>$10.5T annual cybercrime cost</strong>
                      <p>Projected by 2025 globally</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default CyberSecurity;