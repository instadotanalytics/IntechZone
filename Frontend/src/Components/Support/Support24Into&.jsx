// Support24Into7.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  FaHeadset, FaCheckCircle, FaClock, FaPhone, FaEnvelope,
  FaCommentDots, FaShieldAlt, FaGlobe, FaUsers, FaRocket,
  FaStar, FaQuestionCircle, FaArrowRight, FaCalendarCheck,
  FaChartLine, FaBell, FaCog, FaServer, FaCloud,
  FaMobile, FaLaptop, FaBrain, FaBolt, FaHandshake,
  FaPlus, FaMinus, FaTicketAlt, FaVideo, FaBookOpen
} from 'react-icons/fa';
import { MdSupportAgent, MdSpeed, MdVerified, MdAutoAwesome } from 'react-icons/md';
import { HiOutlineSparkles, HiOutlineLightningBolt } from 'react-icons/hi';
import { BiSupport, BiWorld } from 'react-icons/bi';
import styles from './Support24Into7.module.css';
import ParticleNetworkCanvas from '../../Pages/Home/ParticleNetworkCanvas';

const Support24Into7 = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [counter, setCounter] = useState({ 
    response: 0, 
    resolution: 0, 
    satisfaction: 0, 
    tickets: 0 
  });
  const [visible, setVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const targets = { response: 15, resolution: 4, satisfaction: 99, tickets: 50000 };
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const p = step / steps;
      setCounter({
        response: Math.floor(targets.response * p),
        resolution: Math.floor(targets.resolution * p),
        satisfaction: Math.floor(targets.satisfaction * p),
        tickets: Math.floor(targets.tickets * p),
      });
      if (step >= steps) clearInterval(timer);
    }, 2000 / steps);
    return () => clearInterval(timer);
  }, [visible]);

  const supportChannels = [
    { 
      icon: <FaHeadset />, 
      title: "24/7 Live Support", 
      desc: "Round-the-clock technical assistance from certified engineers via phone, chat, or email",
      availability: "Always Online",
      response: "< 15 min response"
    },
    { 
      icon: <FaPhone />, 
      title: "Priority Phone Support", 
      desc: "Direct line to senior support engineers for critical and urgent issues",
      availability: "24/7 Priority",
      response: "< 5 min response"
    },
    { 
      icon: <FaCommentDots />, 
      title: "Live Chat Support", 
      desc: "Instant messaging with support specialists for quick troubleshooting",
      availability: "24/7 Available",
      response: "< 2 min response"
    },
    { 
      icon: <FaEnvelope />, 
      title: "Email Ticketing", 
      desc: "Detailed issue tracking with automatic updates and escalation management",
      availability: "24/7 Monitoring",
      response: "< 30 min response"
    },
    { 
      icon: <FaVideo />, 
      title: "Video Call Support", 
      desc: "Face-to-face remote assistance with screen sharing capabilities",
      availability: "By Appointment",
      response: "Same day booking"
    },
    { 
      icon: <FaTicketAlt />, 
      title: "Ticket Portal", 
      desc: "Self-service portal to track, update, and manage all support requests",
      availability: "24/7 Access",
      response: "Real-time updates"
    },
  ];

  const slaLayers = [
    {
      tier: "Critical (P1)",
      icon: <FaBolt />,
      response: "15 minutes",
      resolution: "4 hours",
      desc: "System down or major functionality unavailable",
      color: "#ef4444"
    },
    {
      tier: "High (P2)",
      icon: <FaChartLine />,
      response: "1 hour",
      resolution: "8 hours",
      desc: "Significant impact on business operations",
      color: "#f59e0b"
    },
    {
      tier: "Medium (P3)",
      icon: <FaCog />,
      response: "4 hours",
      resolution: "24 hours",
      desc: "Partial or non-critical functionality affected",
      color: "#3b82f6"
    },
    {
      tier: "Low (P4)",
      icon: <FaQuestionCircle />,
      response: "8 hours",
      resolution: "48 hours",
      desc: "Minor issues or general inquiries",
      color: "#10b981"
    },
  ];

  const supportFeatures = [
    { icon: <MdSpeed />, title: "15-Min Response", desc: "Guaranteed first response within 15 minutes for all critical tickets" },
    { icon: <FaGlobe />, title: "Global Coverage", desc: "Support centers across 5 time zones for true 24/7 availability" },
    { icon: <FaUsers />, title: "150+ Engineers", desc: "Certified support specialists with deep technical expertise" },
    { icon: <FaShieldAlt />, title: "Enterprise SLA", desc: "99.9% uptime guarantee with financial penalties for breaches" },
    { icon: <FaBrain />, title: "AI-Powered Triage", desc: "Smart routing and automated diagnostics for faster resolution" },
    { icon: <FaServer />, title: "Proactive Monitoring", desc: "24/7 infrastructure monitoring with automatic incident detection" },
  ];

  const supportPlans = [
    {
      name: "Standard",
      price: "Included",
      period: "with all projects",
      desc: "Essential support for all clients",
      features: [
        "24/7 Email Support",
        "Ticket Portal Access",
        "8-hour response time",
        "Knowledge Base Access",
        "Community Forum",
        "Monthly Status Reports"
      ],
      cta: "Included Free",
      highlight: false
    },
    {
      name: "Professional",
      price: "₹19,999",
      period: "/month",
      desc: "Enhanced support for growing businesses",
      features: [
        "24/7 Phone & Chat Support",
        "2-hour response time",
        "Dedicated Account Manager",
        "Quarterly Business Reviews",
        "Priority Ticket Routing",
        "Video Call Support",
        "Extended Hours Coverage"
      ],
      cta: "Choose Professional",
      highlight: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      desc: "White-glove support for mission-critical systems",
      features: [
        "15-min response SLA",
        "Dedicated Support Team",
        "24/7 Emergency Hotline",
        "Proactive Monitoring",
        "Custom Escalation Matrix",
        "Monthly Strategy Calls",
        "On-site Support Option",
        "Executive Sponsor"
      ],
      cta: "Contact Sales",
      highlight: false
    },
  ];

  const faqs = [
    { 
      question: "What does 24/7 support actually mean?", 
      answer: "Our 24/7 support means you can reach a live engineer any time—day or night, weekends, and holidays. We have teams distributed across global time zones to ensure continuous coverage without relying on automated responses alone.", 
      icon: <FaClock /> 
    },
    { 
      question: "How quickly will my issue be resolved?", 
      answer: "Resolution times depend on issue severity. Critical (P1) issues receive immediate attention with resolution typically within 4 hours. Our SLA guarantees specific resolution windows for each priority level, with compensation if we miss targets.", 
      icon: <MdSpeed /> 
    },
    { 
      question: "What support channels are available?", 
      answer: "We offer multiple channels: Phone (with direct engineer access), Live Chat (instant messaging), Email Ticketing (with tracking), Video Calls (screen sharing), and a Self-Service Portal. Enterprise clients get a dedicated hotline.", 
      icon: <FaCommentDots /> 
    },
    { 
      question: "Do you provide support for custom/legacy systems?", 
      answer: "Yes. Our engineers are experienced with both modern stacks and legacy systems. We support custom-built applications, COTS products, and hybrid environments. A knowledge transfer session is included in onboarding.", 
      icon: <FaServer /> 
    },
    { 
      question: "How do you handle emergency/critical issues?", 
      answer: "Critical issues trigger immediate alerts to our on-call engineering team. A dedicated incident commander is assigned within 5 minutes, and we provide updates every 30 minutes until resolution. Post-incident RCA is delivered within 48 hours.", 
      icon: <FaBell /> 
    },
    { 
      question: "Is there a self-service knowledge base?", 
      answer: "Absolutely. All clients get access to our comprehensive knowledge base with 500+ articles, video tutorials, API documentation, and troubleshooting guides. This allows you to resolve common issues instantly.", 
      icon: <FaBookOpen /> 
    },
    { 
      question: "What languages do you support?", 
      answer: "Our primary support is in English, but we have multilingual engineers covering Hindi, Spanish, Mandarin, French, German, and Arabic. Enterprise plans can include dedicated language-specific support teams.", 
      icon: <FaGlobe /> 
    },
    { 
      question: "How do you measure support quality?", 
      answer: "We track CSAT (Customer Satisfaction Score), FRT (First Response Time), MTTR (Mean Time to Resolution), and ticket volume trends. Monthly reports are provided to Professional and Enterprise clients with actionable insights.", 
      icon: <FaChartLine /> 
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "CTO, FinTech Startup",
      content: "Their 24/7 support team saved us during a critical production outage at 3 AM. Resolution within 45 minutes. Exceptional service!",
      rating: 5,
      icon: <FaStar />
    },
    {
      name: "Priya Sharma",
      role: "Product Manager, E-commerce",
      content: "The dedicated support engineer knows our stack inside out. Issues are resolved before our users even notice them.",
      rating: 5,
      icon: <FaStar />
    },
    {
      name: "Michael Chen",
      role: "VP Engineering, SaaS Platform",
      content: "We've been with Intech Zone for 3 years. Their enterprise support is truly enterprise-grade. Zero downtime in 18 months.",
      rating: 5,
      icon: <FaStar />
    },
  ];

  const metrics = [
    { value: counter.response, suffix: "min", label: "Avg. First Response", icon: <FaClock /> },
    { value: counter.resolution, suffix: "hrs", label: "Avg. Resolution Time", icon: <FaRocket /> },
    { value: counter.satisfaction, suffix: "%", label: "CSAT Score", icon: <FaStar /> },
    { value: counter.tickets, suffix: "+", label: "Tickets Resolved", icon: <FaCheckCircle /> },
  ];

  return (
    <div className={styles.mainContainer}>

      {/* ══ HERO SECTION ══ */}
      <section className={styles.heroSection}>
        
        <div className={styles.heroBg}>
          <div className={styles.gradientOrb1}></div>
          <div className={styles.gradientOrb2}></div>
          <div className={styles.gridPattern}></div>
        </div>

        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <MdAutoAwesome className={styles.badgeIcon} />
              <span>Enterprise-Grade Support</span>
              <span className={styles.badgeDivider}>|</span>
              <span className={styles.badgeHighlight}>99.9% SLA</span>
            </div>

            <h1 className={styles.heroTitle}>
              Always-On Support<br />
              <span className={styles.gradientText}>
                That Never <em>Sleeps</em>
              </span>
            </h1>

            <p className={styles.heroSubtitle}>
              <strong>Intech Zone</strong> provides round-the-clock technical support with 
              15-minute response SLAs. Our global team of 150+ certified engineers ensures 
              your systems stay up, running, and optimized—24 hours a day, 7 days a week, 
              365 days a year.
            </p>

            <div className={styles.heroStats}>
              <div className={styles.heroStatItem}>
                <FaClock className={styles.heroStatIcon} />
                <div>
                  <strong>15 min</strong>
                  <span>First Response</span>
                </div>
              </div>
              <div className={styles.heroStatItem}>
                <FaGlobe className={styles.heroStatIcon} />
                <div>
                  <strong>5 Time Zones</strong>
                  <span>Global Coverage</span>
                </div>
              </div>
              <div className={styles.heroStatItem}>
                <FaUsers className={styles.heroStatIcon} />
                <div>
                  <strong>150+ Experts</strong>
                  <span>Certified Engineers</span>
                </div>
              </div>
            </div>


            <div className={styles.heroTrust}>
              <div className={styles.trustItem}>
                <MdVerified className={styles.trustIcon} />
                <span>ISO 27001 Certified</span>
              </div>
              <div className={styles.trustItem}>
                <MdVerified className={styles.trustIcon} />
                <span>SOC 2 Type II Compliant</span>
              </div>
              <div className={styles.trustItem}>
                <MdVerified className={styles.trustIcon} />
                <span>GDPR Ready</span>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.supportCard}>
              <div className={styles.supportCardHeader}>
                <div className={styles.pulseIndicator}>
                  <span className={styles.pulseDot}></span>
                  <span>Live Support</span>
                </div>
                <span className={styles.onlineBadge}>● 47 Engineers Online</span>
              </div>
              <div className={styles.supportCardBody}>
                <div className={styles.supportAgent}>
                  <div className={styles.agentAvatar}>
                    <FaHeadset />
                  </div>
                  <div className={styles.agentInfo}>
                    <strong>Technical Support</strong>
                    <span>Typically replies in &lt; 3 min</span>
                  </div>
                </div>
                <div className={styles.supportMetrics}>
                  <div className={styles.metricRow}>
                    <span>First Response</span>
                    <strong>~12 min</strong>
                  </div>
                  <div className={styles.metricRow}>
                    <span>Resolution Time</span>
                    <strong>~3.2 hrs</strong>
                  </div>
                  <div className={styles.metricRow}>
                    <span>CSAT Score</span>
                    <strong>99%</strong>
                  </div>
                </div>
             
              </div>
            </div>
            <div className={styles.floatingBadge1}>
              <HiOutlineLightningBolt />
              <span>15-min SLA</span>
            </div>
            <div className={styles.floatingBadge2}>
              <FaStar />
              <span>4.9 ★ TrustPilot</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ METRICS SECTION ══ */}
      <ParticleNetworkCanvas/>
      <section className={styles.metricsSection} ref={statsRef}>
        <div className={styles.container}>
          <div className={styles.metricsGrid}>
            {metrics.map((metric, i) => (
              <div key={i} className={styles.metricCard}>
                <div className={styles.metricIcon}>{metric.icon}</div>
                <div className={styles.metricValue}>
                  {metric.value}{metric.suffix}
                </div>
                <div className={styles.metricLabel}>{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SUPPORT CHANNELS ══ */}
      <section className={styles.channelsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Multiple Channels</span>
            <h2>Support <span className={styles.gradientText}>Your Way</span></h2>
            <p>Choose from multiple channels—all staffed by certified engineers 24/7</p>
          </div>
          <div className={styles.channelsGrid}>
            {supportChannels.map((channel, i) => (
              <div key={i} className={styles.channelCard}>
                <div className={styles.channelIcon}>{channel.icon}</div>
                <div className={styles.channelContent}>
                  <div className={styles.channelHeader}>
                    <h3>{channel.title}</h3>
                    <span className={styles.availabilityBadge}>{channel.availability}</span>
                  </div>
                  <p>{channel.desc}</p>
                  <div className={styles.channelFooter}>
                    <span className={styles.responseTime}>
                      <FaClock /> {channel.response}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SLA TIERS ══ */}
      <section className={styles.slaSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Enterprise SLA</span>
            <h2>Guaranteed <span className={styles.gradientText}>Response Times</span></h2>
            <p>Clear, binding SLAs with financial penalties if we miss targets</p>
          </div>
          <div className={styles.slaGrid}>
            {slaLayers.map((sla, i) => (
              <div key={i} className={styles.slaCard} style={{ '--accent': sla.color }}>
                <div className={styles.slaHeader}>
                  <div className={styles.slaIcon} style={{ color: sla.color }}>
                    {sla.icon}
                  </div>
                  <h3>{sla.tier}</h3>
                </div>
                <p className={styles.slaDesc}>{sla.desc}</p>
                <div className={styles.slaMetrics}>
                  <div className={styles.slaMetric}>
                    <span>Response</span>
                    <strong>{sla.response}</strong>
                  </div>
                  <div className={styles.slaMetric}>
                    <span>Resolution</span>
                    <strong>{sla.resolution}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Why Our Support Stands Out</span>
            <h2>Engineered for <span className={styles.gradientText}>Excellence</span></h2>
            <p>Every aspect of our support is designed to minimize downtime and maximize satisfaction</p>
          </div>
          <div className={styles.featuresGrid}>
            {supportFeatures.map((feature, i) => (
              <div key={i} className={styles.featureCard}>
                <div className={styles.featureNum}>0{i + 1}</div>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className={styles.testimonialsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Client Stories</span>
            <h2>Trusted by <span className={styles.gradientText}>Industry Leaders</span></h2>
            <p>See what our clients say about our 24/7 support experience</p>
          </div>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, i) => (
              <div key={i} className={styles.testimonialCard}>
                <div className={styles.testimonialRating}>
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <FaStar key={j} className={styles.starFilled} />
                  ))}
                </div>
                <p className={styles.testimonialContent}>"{testimonial.content}"</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorAvatar}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className={styles.authorInfo}>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* ══ FAQ ══ */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>FAQ</span>
            <h2>Common Questions <span className={styles.gradientText}>About Our Support</span></h2>
            <p>Everything you need to know about our 24/7 support services</p>
          </div>
          <div className={styles.faqGrid}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ''}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className={styles.faqQuestion}>
                  <div className={styles.faqIconWrap}>{faq.icon}</div>
                  <h4>{faq.question}</h4>
                  <div className={styles.faqToggle}>
                    {openFaq === i ? <FaMinus /> : <FaPlus />}
                  </div>
                </div>
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

  
    </div>
  );
};

export default Support24Into7;