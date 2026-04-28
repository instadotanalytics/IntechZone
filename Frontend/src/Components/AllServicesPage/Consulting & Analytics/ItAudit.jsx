import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './ItAudit.module.css';
import {
  FiArrowRight, FiCheckCircle, FiClock, FiStar, FiAward,
  FiZap, FiTrendingUp, FiUsers, FiGlobe, FiHeadphones,
  FiTarget, FiShield, FiRefreshCw, FiServer, FiCpu,
  FiCloud, FiMonitor, FiMail, FiPhone,
  FiMapPin, FiDollarSign, FiPieChart, FiCode,
  FiDatabase, FiActivity, FiGrid, FiBarChart2,
  FiMessageSquare, FiLayers, FiSettings, FiLifeBuoy,
  FiPackage, FiFileText, FiBookOpen,
  FiGitMerge, FiLink, FiAlertTriangle, FiLock, 
  FiEye, FiSearch, FiClipboard, FiBriefcase,
  FiChevronDown, FiChevronUp, FiHexagon,
  FiMousePointer, FiHardDrive, FiWifi,
  FiPlay, FiDownload, FiTool
} from 'react-icons/fi';
import TestimonialSection from '../../../Pages/Home/TestimonialSection';
import WaveCanvas from '../../../Pages/Home/Wavecanvas';

/* ==================== CANVAS ANIMATION COMPONENT ==================== */
const CanvasAnimation = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    class Node {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.radius = Math.random() * 2 + 1.5;
        this.pulseRadius = this.radius;
        this.pulseAlpha = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 50 || this.x > width - 50) this.vx *= -1;
        if (this.y < 50 || this.y > height - 50) this.vy *= -1;

        this.pulseAlpha += 0.015;
        this.pulseRadius = this.radius + Math.sin(this.pulseAlpha) * 6;
      }

      draw(ctx, mouseX, mouseY) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 - (Math.sin(this.pulseAlpha) * 0.1)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.4)';
        ctx.fill();

        const distToMouse = Math.hypot(this.x - mouseX, this.y - mouseY);
        if (distToMouse < 180) {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 - distToMouse / 900})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }
    }

    const nodes = Array.from({ length: 20 }, () => new Node());

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.04)';
      ctx.lineWidth = 0.5;
      const spacing = 50;

      for (let x = 0; x < width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.08 - dist / 1600})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      drawGrid();
      nodes.forEach(node => node.update());
      drawConnections();
      nodes.forEach(node => node.draw(ctx, mouseRef.current.x, mouseRef.current.y));
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvasAnimation} />;
};

/* ==================== ANIMATED COUNTER ==================== */
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const numValue = parseInt(value);
            if (isNaN(numValue)) {
              setCount(value);
              return;
            }

            const startTime = Date.now();
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(numValue * eased));

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(numValue);
              }
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return <span ref={elementRef}>{count}{value.toString().replace(/[0-9]/g, '')}</span>;
};

/* ==================== MAIN IT AUDIT COMPONENT ==================== */
const ItAudit = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: '200+', label: 'IT Audits Completed', desc: 'Across 30+ Industries', icon: FiSearch },
    { value: '99%', label: 'Compliance Rate', desc: 'Regulatory Standards Met', icon: FiShield },
    { value: '85%', label: 'Vulnerability Detection', desc: 'Critical Issues Found & Fixed', icon: FiAlertTriangle },
    { value: '40+', label: 'Certified Auditors', desc: 'CISA, CISSP & ISO Experts', icon: FiUsers }
  ];

  const auditServices = [
    {
      icon: FiShield,
      title: 'Cybersecurity Audit',
      description: 'Comprehensive security assessment including vulnerability scanning, penetration testing, firewall configuration review, and security policy evaluation.',
      features: ['Vulnerability Assessment', 'Penetration Testing', 'Firewall Audit', 'Security Policy Review', 'Incident Response Check', 'SIEM Analysis'],
      color: '#3b82f6'
    },
    {
      icon: FiDatabase,
      title: 'Infrastructure Audit',
      description: 'Complete evaluation of your IT infrastructure including servers, networks, storage systems, and data centers for performance and reliability.',
      features: ['Server Health Check', 'Network Assessment', 'Storage Analysis', 'Backup Verification', 'Disaster Recovery', 'Capacity Planning'],
      color: '#10b981'
    },
    {
      icon: FiClipboard,
      title: 'Compliance Audit',
      description: 'Ensure your organization meets regulatory requirements including GDPR, HIPAA, PCI-DSS, ISO 27001, SOC 2, and industry-specific standards.',
      features: ['GDPR Compliance', 'HIPAA Assessment', 'PCI-DSS Audit', 'ISO 27001 Review', 'SOC 2 Evaluation', 'Gap Analysis'],
      color: '#f59e0b'
    },
    {
      icon: FiCode,
      title: 'Application Audit',
      description: 'In-depth analysis of your software applications for security vulnerabilities, performance issues, code quality, and architecture assessment.',
      features: ['Code Review', 'Security Testing', 'Performance Audit', 'Architecture Review', 'API Security', 'Database Audit'],
      color: '#ef4444'
    },
    {
      icon: FiCloud,
      title: 'Cloud Security Audit',
      description: 'Evaluate your cloud infrastructure security across AWS, Azure, GCP including IAM policies, network configurations, and data protection.',
      features: ['IAM Assessment', 'Network Security', 'Data Encryption', 'Compliance Check', 'Cost Optimization', 'Backup Review'],
      color: '#8b5cf6'
    },
    {
      icon: FiWifi,
      title: 'Network Security Audit',
      description: 'Complete network security assessment including wireless security, VPN configuration, access controls, and network segmentation review.',
      features: ['Wireless Security', 'VPN Assessment', 'Access Control', 'Network Segmentation', 'IDS/IPS Review', 'Traffic Analysis'],
      color: '#06b6d4'
    }
  ];

  const auditProcess = [
    {
      phase: '01',
      title: 'Planning & Scoping',
      description: 'Define audit objectives, scope, methodology, and success criteria. Identify key stakeholders, systems, and compliance requirements.',
      duration: '1-2 Weeks',
      activities: ['Objective Definition', 'Scope Documentation', 'Resource Planning', 'Stakeholder Alignment'],
      icon: FiTarget
    },
    {
      phase: '02',
      title: 'Data Collection',
      description: 'Gather system configurations, network diagrams, security policies, logs, and documentation through automated tools and interviews.',
      duration: '2-3 Weeks',
      activities: ['System Discovery', 'Configuration Review', 'Policy Analysis', 'Interview Sessions'],
      icon: FiDatabase
    },
    {
      phase: '03',
      title: 'Testing & Analysis',
      description: 'Perform vulnerability scanning, penetration testing, code analysis, and compliance checks using industry-standard tools.',
      duration: '3-4 Weeks',
      activities: ['Vulnerability Scan', 'Penetration Testing', 'Code Analysis', 'Compliance Check'],
      icon: FiSearch
    },
    {
      phase: '04',
      title: 'Reporting',
      description: 'Document findings with severity ratings, risk assessment, gap analysis, and prioritized recommendations with remediation roadmap.',
      duration: '1-2 Weeks',
      activities: ['Findings Documentation', 'Risk Assessment', 'Gap Analysis', 'Executive Summary'],
      icon: FiFileText
    },
    {
      phase: '05',
      title: 'Remediation Support',
      description: 'Provide detailed remediation guidance, implementation support, and verification testing to ensure all issues are resolved.',
      duration: 'Ongoing',
      activities: ['Remediation Planning', 'Implementation Support', 'Verification Testing', 'Progress Tracking'],
      icon: FiTool
    }
  ];

  const benefits = [
    {
      icon: FiShield,
      title: 'Enhanced Security',
      description: 'Identify and fix security vulnerabilities before attackers exploit them. Strengthen your defense with actionable insights.'
    },
    {
      icon: FiCheckCircle,
      title: 'Regulatory Compliance',
      description: 'Ensure compliance with GDPR, HIPAA, PCI-DSS, ISO 27001 and avoid costly penalties and legal issues.'
    },
    {
      icon: FiAlertTriangle,
      title: 'Risk Mitigation',
      description: 'Understand your risk landscape with detailed risk assessment and prioritize remediation based on business impact.'
    },
    {
      icon: FiTrendingUp,
      title: 'Performance Optimization',
      description: 'Identify bottlenecks, optimize configurations, and improve system performance through comprehensive analysis.'
    },
    {
      icon: FiDollarSign,
      title: 'Cost Savings',
      description: 'Prevent costly data breaches, system failures, and compliance fines through proactive audit and remediation.'
    },
    {
      icon: FiEye,
      title: 'Complete Visibility',
      description: 'Get a 360-degree view of your IT environment with detailed inventory, configuration analysis, and security posture.'
    }
  ];

  const caseStudies = [
    {
      title: 'Financial Services Security Audit',
      industry: 'Banking & Finance',
      company: 'Global Finance Corp',
      challenge: 'A leading financial institution needed comprehensive security audit to meet PCI-DSS and SOX compliance requirements while protecting sensitive customer data.',
      solution: 'Conducted end-to-end security audit including vulnerability assessment, penetration testing, firewall review, and compliance gap analysis with remediation plan.',
      results: [
        { metric: '100%', label: 'PCI-DSS Compliance' },
        { metric: '95%', label: 'Vulnerabilities Fixed' },
        { metric: '60%', label: 'Security Score Increase' },
        { metric: '0', label: 'Critical Findings' }
      ],
      color: '#3b82f6'
    },
    {
      title: 'Healthcare HIPAA Compliance Audit',
      industry: 'Healthcare',
      company: 'MediCare Health Systems',
      challenge: 'Multi-hospital healthcare provider needed HIPAA compliance audit across 5 facilities with electronic health records and patient data protection.',
      solution: 'Performed comprehensive HIPAA security audit including access controls, encryption assessment, audit logging, and staff security awareness evaluation.',
      results: [
        { metric: '100%', label: 'HIPAA Compliance' },
        { metric: '80%', label: 'Risk Reduction' },
        { metric: '45%', label: 'Cost Savings' },
        { metric: '5/5', label: 'Facilities Certified' }
      ],
      color: '#10b981'
    },
    {
      title: 'E-commerce Cloud Security Audit',
      industry: 'E-commerce',
      company: 'ShopGlobal Inc.',
      challenge: 'Fast-growing e-commerce platform needed AWS cloud security audit after rapid expansion led to complex infrastructure and security concerns.',
      solution: 'Conducted cloud security audit including IAM review, network security assessment, data encryption verification, and compliance check for GDPR & PCI-DSS.',
      results: [
        { metric: '99.9%', label: 'Security Uptime' },
        { metric: '75%', label: 'Threat Detection' },
        { metric: '50%', label: 'Faster Response' },
        { metric: '100%', label: 'GDPR Ready' }
      ],
      color: '#8b5cf6'
    }
  ];

  const faqs = [
    {
      question: 'What is included in an IT audit?',
      answer: 'An IT audit includes comprehensive assessment of your technology infrastructure, security posture, compliance status, and operational efficiency. This covers vulnerability scanning, penetration testing, policy review, configuration analysis, access control assessment, disaster recovery evaluation, and compliance checks against relevant standards (GDPR, HIPAA, PCI-DSS, ISO 27001, etc.). Our audits provide detailed findings with risk ratings and prioritized remediation recommendations.'
    },
    {
      question: 'How often should we conduct IT audits?',
      answer: 'We recommend conducting comprehensive IT audits annually, with quarterly vulnerability assessments and continuous monitoring. High-risk industries like finance and healthcare may need semi-annual audits. Regular audits help maintain compliance, identify emerging threats, and ensure your security posture evolves with changing technology and threat landscapes.'
    },
    {
      question: 'How long does an IT audit take?',
      answer: 'Audit duration depends on organization size and scope. Small businesses (10-50 employees) typically take 2-4 weeks, medium organizations (50-500) take 4-8 weeks, and large enterprises (500+) can take 8-16 weeks. We provide a detailed timeline during the planning phase based on your specific requirements.'
    },
    {
      question: 'What compliance standards do you audit against?',
      answer: 'We audit against major regulatory standards including GDPR, HIPAA, PCI-DSS, SOX, ISO 27001, SOC 2, NIST, CIS Controls, and industry-specific regulations. Our certified auditors have deep expertise in these frameworks and can help you achieve and maintain compliance.'
    },
    {
      question: 'Do you provide remediation support after the audit?',
      answer: 'Yes, we provide comprehensive remediation support including detailed action plans, implementation guidance, vendor recommendations, and verification testing. We can work with your IT team or manage the entire remediation process. We also offer ongoing monitoring and support services to maintain your security posture.'
    },
    {
      question: 'How do you ensure audit confidentiality?',
      answer: 'We maintain strict confidentiality with signed NDAs, encrypted data handling, secure reporting, and access-controlled documentation. All audit data is stored on encrypted systems with role-based access. Our team follows ISO 27001 security practices and we can comply with your specific confidentiality requirements.'
    }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className={styles.page}>
      <CanvasAnimation />

    

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <WaveCanvas/>
        <div className={styles.container}>
          <div className={styles.heroContent} data-animate="hero">
            <div className={styles.heroBadge}>
              <FiHexagon size={16} className={styles.heroBadgeIcon} />
              IT Audit & Compliance Services
              <FiHexagon size={16} className={styles.heroBadgeIcon} />
            </div>

            <h1 className={styles.heroTitle}>
              Protect Your Business with{" "}
              <span className={styles.gradientText}>
                Comprehensive IT Audits
                <span className={styles.gradientUnderline} />
              </span>
            </h1>

            <p className={styles.heroDesc}>
              Identify vulnerabilities, ensure compliance, and strengthen your security posture with 
              our certified IT audit services. From cybersecurity to compliance, we provide complete 
              assessment and remediation support.
            </p>
            <p className={styles.heroDesc}>
              200+ successful audits across 30+ industries with measurable security improvements 
              and compliance achievements.
            </p>

            <div className={styles.heroStatsGrid}>
              {stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className={styles.heroStatCard}
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <div className={styles.heroStatIconWrapper}>
                    <stat.icon size={24} />
                    <div className={styles.heroStatGlow} />
                  </div>
                  <div className={styles.heroStatInfo}>
                    <span className={styles.heroStatValue}>
                      <AnimatedCounter value={stat.value} />
                    </span>
                    <span className={styles.heroStatLabel}>{stat.label}</span>
                    <span className={styles.heroStatDesc}>{stat.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.heroButtons}>
              <Link to="/contact" className={styles.btnPrimary}>
                <span>Request Free Audit Consultation</span>
                <FiArrowRight size={20} className={styles.btnIcon} />
              </Link>
             
            </div>
          </div>
        </div>

        <div className={styles.scrollIndicator}>
          <FiMousePointer size={18} />
          <div className={styles.scrollLine}>
            <div className={styles.scrollDot} />
          </div>
        </div>
      </section>

      {/* Audit Services Section */}
      <section className={styles.services}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} data-animate="section-header">
            <div className={styles.sectionBadge}>
              <FiSearch size={16} />
              <span>Audit Services</span>
              <FiSearch size={16} />
            </div>
            <h2 className={styles.sectionTitle}>
              Comprehensive <span className={styles.gradientText}>IT Audit Services</span>
            </h2>
            <p className={styles.sectionDesc}>
              End-to-end audit solutions covering every aspect of your IT infrastructure
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {auditServices.map((service, idx) => (
              <div 
                key={idx} 
                className={`${styles.serviceCard} ${hoveredService === idx ? styles.serviceCardHovered : ''}`}
                data-animate={`service-${idx}`}
                onMouseEnter={() => setHoveredService(idx)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className={styles.serviceCardBorder} style={{ borderColor: service.color }} />
                <div className={styles.serviceCardContent}>
                  <div className={styles.serviceHeader}>
                    <div className={styles.serviceIcon} style={{ background: `${service.color}15`, color: service.color }}>
                      <service.icon size={28} />
                    </div>
                    <span className={styles.serviceNumber} style={{ color: service.color }}>
                      0{idx + 1}
                    </span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className={styles.serviceFeatures}>
                    {service.features.map((feature, fIdx) => (
                      <span key={fIdx} className={styles.featureTag}>
                        <FiCheckCircle size={12} /> {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefits}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} data-animate="section-header">
            <div className={styles.sectionBadge}>
              <FiTrendingUp size={16} />
              <span>Why IT Audit</span>
              <FiTrendingUp size={16} />
            </div>
            <h2 className={styles.sectionTitle}>
              Benefits of <span className={styles.gradientText}>IT Audit</span>
            </h2>
            <p className={styles.sectionDesc}>
              Discover how regular IT audits protect and optimize your business
            </p>
          </div>

          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, idx) => (
              <div 
                key={idx} 
                className={styles.benefitCard} 
                data-animate={`benefit-${idx}`}
              >
                <div className={styles.benefitIconWrapper}>
                  <benefit.icon size={32} />
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Process */}
      <section className={styles.process}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} data-animate="section-header">
            <div className={styles.sectionBadge}>
              <FiRefreshCw size={16} />
              <span>Audit Process</span>
              <FiRefreshCw size={16} />
            </div>
            <h2 className={styles.sectionTitle}>
              Our <span className={styles.gradientText}>Audit Methodology</span>
            </h2>
            <p className={styles.sectionDesc}>
              Proven 5-phase approach refined through 200+ successful audits
            </p>
          </div>

          <div className={styles.processTimeline}>
            <div className={styles.processLine} />
            {auditProcess.map((phase, idx) => (
              <div 
                key={idx} 
                className={styles.processItem} 
                data-animate={`process-${idx}`}
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className={styles.processNode}>
                  <div className={styles.processNodeInner}>
                    <phase.icon size={20} />
                  </div>
                  <span className={styles.processPhase}>{phase.phase}</span>
                </div>
                <div className={styles.processCard}>
                  <h3>{phase.title}</h3>
                  <p>{phase.description}</p>
                  <div className={styles.processDuration}>
                    <FiClock size={14} />
                    <span>{phase.duration}</span>
                  </div>
                  <div className={styles.processActivities}>
                    {phase.activities.map((activity, aIdx) => (
                      <span key={aIdx} className={styles.activityTag}>{activity}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className={styles.caseStudies}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} data-animate="section-header">
            <div className={styles.sectionBadge}>
              <FiStar size={16} />
              <span>Success Stories</span>
              <FiStar size={16} />
            </div>
            <h2 className={styles.sectionTitle}>
              Audit <span className={styles.gradientText}>Success Stories</span>
            </h2>
            <p className={styles.sectionDesc}>
              Real results delivered through our IT audit services
            </p>
          </div>

          <div className={styles.caseStudyGrid}>
            {caseStudies.map((study, idx) => (
              <div 
                key={idx} 
                className={styles.caseStudyCard} 
                data-animate={`case-${idx}`}
              >
                <div className={styles.caseStudyHeader} style={{ borderLeftColor: study.color }}>
                  <div className={styles.caseStudyBadge} style={{ background: `${study.color}15`, color: study.color }}>
                    {study.industry}
                  </div>
                  <h3>{study.title}</h3>
                  <p className={styles.caseStudyCompany}>
                    <FiBriefcase size={14} /> {study.company}
                  </p>
                </div>

                <div className={styles.caseStudyBody}>
                  <div className={styles.caseStudySection}>
                    <div className={styles.caseStudyLabel}>
                      <FiAlertTriangle size={14} />
                      <span>Challenge</span>
                    </div>
                    <p>{study.challenge}</p>
                  </div>
                  <div className={styles.caseStudySection}>
                    <div className={styles.caseStudyLabel}>
                      <FiCheckCircle size={14} />
                      <span>Solution</span>
                    </div>
                    <p>{study.solution}</p>
                  </div>
                </div>

                <div className={styles.caseStudyResults}>
                  {study.results.map((result, rIdx) => (
                    <div key={rIdx} className={styles.resultItem}>
                      <span className={styles.resultMetric} style={{ color: study.color }}>
                        {result.metric}
                      </span>
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

      {/* FAQ Section */}
      <section className={styles.faq}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} data-animate="section-header">
            <div className={styles.sectionBadge}>
              <FiMessageSquare size={16} />
              <span>FAQ</span>
              <FiMessageSquare size={16} />
            </div>
            <h2 className={styles.sectionTitle}>
              Frequently Asked <span className={styles.gradientText}>Questions</span>
            </h2>
          </div>

          <div className={styles.faqGrid}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`${styles.faqItem} ${activeFaq === idx ? styles.faqActive : ''}`}
                onClick={() => toggleFaq(idx)}
                data-animate={`faq-${idx}`}
              >
                <div className={styles.faqHeader}>
                  <div className={styles.faqQuestion}>
                    <span className={styles.faqNumber}>0{idx + 1}</span>
                    <h3>{faq.question}</h3>
                  </div>
                  <div className={styles.faqIcon}>
                    {activeFaq === idx ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                  </div>
                </div>
                <div className={styles.faqContent}>
                  <div className={styles.faqContentInner}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TestimonialSection/>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaWrapper} data-animate="cta">
            <div className={styles.ctaContent}>
              <div className={styles.ctaBadge}>
                <FiZap size={14} /> Free Audit Consultation
              </div>
              <h2>Ready to Secure Your IT Infrastructure?</h2>
              <p>
                Get a free consultation with our senior IT auditors. We'll discuss your audit 
                needs, compliance requirements, and provide a tailored audit plan with timeline 
                and cost estimates.
              </p>

              <div className={styles.ctaFeatures}>
                <div className={styles.ctaFeature}>
                  <div className={styles.ctaFeatureIcon}>
                    <FiCheckCircle size={18} />
                  </div>
                  <span>Free initial audit consultation</span>
                </div>
                <div className={styles.ctaFeature}>
                  <div className={styles.ctaFeatureIcon}>
                    <FiCheckCircle size={18} />
                  </div>
                  <span>Customized audit scope and methodology</span>
                </div>
                <div className={styles.ctaFeature}>
                  <div className={styles.ctaFeatureIcon}>
                    <FiCheckCircle size={18} />
                  </div>
                  <span>Detailed timeline and resource planning</span>
                </div>
                <div className={styles.ctaFeature}>
                  <div className={styles.ctaFeatureIcon}>
                    <FiCheckCircle size={18} />
                  </div>
                  <span>Transparent pricing with no hidden costs</span>
                </div>
              </div>

              <div className={styles.ctaButtons}>
                <Link to="/contact" className={styles.ctaBtnPrimary}>
                  Schedule Free Consultation <FiArrowRight size={18} />
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default ItAudit;