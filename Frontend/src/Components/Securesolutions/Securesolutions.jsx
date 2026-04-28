import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Securesolutions.module.css';
import {
  FiShield,
  FiLock,
  FiEye,
  FiAlertTriangle,
  FiCpu,
  FiDatabase,
  FiGlobe,
  FiUsers,
  FiServer,
  FiSmartphone,
  FiCloud,
  FiTrendingUp,
  FiCheckCircle,
  FiBarChart2,
  FiActivity,
  FiZap,
  FiAward,
  FiClock,
  FiArrowRight
} from 'react-icons/fi';

// Hero section with background image
const HeroSection = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroBgImage} />
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <div className={styles.heroBadge}>
          <FiShield size={18} />
          <span>Enterprise Security</span>
        </div>
        <h1 className={styles.heroTitle}>
          Secure Your Digital<br />
          <span className={styles.heroGradient}>Future</span>
        </h1>
        <p className={styles.heroDesc}>
          Next-generation cybersecurity solutions that protect your business from evolving threats. 
          Zero-trust architecture, AI-powered threat detection, and 24/7 security monitoring.
        </p>
        <div className={styles.heroStats}>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>99.99%</span>
            <span className={styles.heroStatLabel}>Threat Prevention</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>24/7</span>
            <span className={styles.heroStatLabel}>Security Monitoring</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>500+</span>
            <span className={styles.heroStatLabel}>Clients Protected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Solution Cards Component - No Navigation
const SolutionCards = () => {
  const solutions = [
    { icon: FiLock, title: 'Zero Trust Security', desc: 'Never trust, always verify. Implement strict access controls and continuous authentication.' },
    { icon: FiEye, title: 'Threat Detection', desc: 'AI-powered real-time threat detection with automated response systems.' },
    { icon: FiCpu, title: 'Endpoint Protection', desc: 'Advanced endpoint detection and response for all devices.' },
    { icon: FiDatabase, title: 'Data Encryption', desc: 'End-to-end encryption for data at rest and in transit.' },
    { icon: FiGlobe, title: 'Network Security', desc: 'Next-gen firewalls, IDS/IPS, and secure network architecture.' },
    { icon: FiUsers, title: 'Identity Management', desc: 'Comprehensive IAM solutions with MFA and SSO.' },
  ];

  return (
    <section className={styles.solutions}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>Our Solutions</span>
          <h2 className={styles.sectionTitle}>Comprehensive Security <span className={styles.gradientText}>Stack</span></h2>
          <p className={styles.sectionDesc}>Enterprise-grade protection tailored to your business needs</p>
        </div>
        <div className={styles.solutionsGrid}>
          {solutions.map((sol, idx) => (
            <div key={idx} className={styles.solutionCard}>
              <div className={styles.solutionIcon}>
                <sol.icon size={28} />
              </div>
              <h3 className={styles.solutionTitle}>{sol.title}</h3>
              <p className={styles.solutionDesc}>{sol.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Security Stats Component with animated counters
const SecurityStats = () => {
  const [counts, setCounts] = useState({ threats: 0, uptime: 0, clients: 0, response: 0 });
  const sectionRef = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated.current) {
        animated.current = true;
        const duration = 2000;
        const step = 20;
        const targets = { threats: 12500, uptime: 99, clients: 528, response: 45 };
        const increments = {
          threats: targets.threats / (duration / step),
          uptime: targets.uptime / (duration / step),
          clients: targets.clients / (duration / step),
          response: targets.response / (duration / step),
        };
        let current = { threats: 0, uptime: 0, clients: 0, response: 0 };
        const timer = setInterval(() => {
          current = {
            threats: Math.min(current.threats + increments.threats, targets.threats),
            uptime: Math.min(current.uptime + increments.uptime, targets.uptime),
            clients: Math.min(current.clients + increments.clients, targets.clients),
            response: Math.min(current.response + increments.response, targets.response),
          };
          setCounts({ ...current });
          if (current.threats >= targets.threats) clearInterval(timer);
        }, step);
      }
    }, { threshold: 0.3 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.stats} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <FiAlertTriangle size={32} className={styles.statIcon} />
            <div className={styles.statNumber}>{Math.floor(counts.threats).toLocaleString()}+</div>
            <div className={styles.statLabel}>Threats Blocked</div>
          </div>
          <div className={styles.statItem}>
            <FiTrendingUp size={32} className={styles.statIcon} />
            <div className={styles.statNumber}>{counts.uptime.toFixed(1)}%</div>
            <div className={styles.statLabel}>Uptime SLA</div>
          </div>
          <div className={styles.statItem}>
            <FiShield size={32} className={styles.statIcon} />
            <div className={styles.statNumber}>{Math.floor(counts.clients)}+</div>
            <div className={styles.statLabel}>Enterprise Clients</div>
          </div>
          <div className={styles.statItem}>
            <FiZap size={32} className={styles.statIcon} />
            <div className={styles.statNumber}>&lt;{Math.floor(counts.response)}s</div>
            <div className={styles.statLabel}>Avg Response Time</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features/Process Component - No Navigation
const SecurityProcess = () => {
  const steps = [
    { icon: FiBarChart2, title: 'Risk Assessment', desc: 'Identify vulnerabilities and threat landscape analysis' },
    { icon: FiShield, title: 'Implementation', desc: 'Deploy security controls and zero-trust architecture' },
    { icon: FiActivity, title: '24/7 Monitoring', desc: 'Continuous threat detection and incident response' },
    { icon: FiTrendingUp, title: 'Compliance & Audit', desc: 'ISO 27001, SOC2, GDPR compliance management' },
  ];

  return (
    <section className={styles.process}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>How It Works</span>
          <h2 className={styles.sectionTitle}>Our Security <span className={styles.gradientText}>Framework</span></h2>
          <p className={styles.sectionDesc}>A systematic approach to protect your digital assets</p>
        </div>
        <div className={styles.processGrid}>
          {steps.map((step, idx) => (
            <div key={idx} className={styles.processCard}>
              <div className={styles.processStep}>0{idx + 1}</div>
              <div className={styles.processIcon}>
                <step.icon size={24} />
              </div>
              <h3 className={styles.processTitle}>{step.title}</h3>
              <p className={styles.processDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Trust Badges Component
const TrustSection = () => {
  const badges = [
    { name: 'ISO 27001', icon: FiCheckCircle },
    { name: 'SOC 2 Type II', icon: FiCheckCircle },
    { name: 'GDPR Compliant', icon: FiCheckCircle },
    { name: 'PCI DSS', icon: FiCheckCircle },
    { name: 'HIPAA Ready', icon: FiAward },
    { name: '24/7 Support', icon: FiClock },
  ];

  return (
    <section className={styles.trust}>
      <div className={styles.container}>
        <div className={styles.trustContent}>
          <div className={styles.trustLeft}>
            <span className={styles.sectionBadge}>Trusted By Industry Leaders</span>
            <h2 className={styles.sectionTitle}>Security That <span className={styles.gradientText}>Delivers Peace of Mind</span></h2>
            <p className={styles.sectionDesc}>Join 500+ enterprises that trust us with their critical infrastructure</p>
          </div>
          <div className={styles.trustRight}>
            {badges.map((badge, idx) => (
              <div key={idx} className={styles.badge}>
                <badge.icon size={18} className={styles.badgeIcon} />
                <span>{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// CTA Component - With Navigation
const CTASection = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let angle = 0;

    const draw = () => {
      if (!ctx || !canvas) return;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.3;
      
      for (let i = 0; i < 3; i++) {
        const rad = radius + i * 15;
        ctx.beginPath();
        ctx.arc(centerX, centerY, rad, angle + i * Math.PI * 0.5, angle + Math.PI + i * Math.PI * 0.5);
        ctx.strokeStyle = `rgba(0, 150, 200, ${0.15 - i * 0.05})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      angle += 0.005;
      animationId = requestAnimationFrame(draw);
    };
    draw();
    const handleResize = () => { canvas.width = canvas.clientWidth; canvas.height = canvas.clientHeight; };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className={styles.cta}>
      <canvas ref={canvasRef} className={styles.ctaCanvas} />
      <div className={styles.ctaOverlay} />
      <div className={styles.container}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Secure Your Business?</h2>
          <p className={styles.ctaDesc}>Get a free security assessment and see how we can protect your digital assets.</p>
          <div className={styles.ctaButtons}>
            <Link to="/contact" className={styles.ctaBtnPrimary}>
              Start Free Assessment <FiArrowRight size={16} />
            </Link>
            <Link to="/services/cybersecurity" className={styles.ctaBtnSecondary}>
              View All Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Component
const SecureSolutions = () => {
  return (
    <div className={styles.page}>
      <HeroSection />
      <SolutionCards />
      <SecurityStats />
      <SecurityProcess />
      <TrustSection />
      <CTASection />
    </div>
  );
};

export default SecureSolutions;