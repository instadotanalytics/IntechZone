import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NetworkSetup.module.css';
import {
  FiArrowRight, FiCheckCircle, FiClock, FiStar, FiAward,
  FiZap, FiTrendingUp, FiUsers, FiGlobe, FiHeadphones,
  FiTarget, FiEye, FiBarChart2, FiShield, FiRefreshCw,
  FiWifi, FiServer, FiDatabase, FiCpu, FiLock,
  FiCloud, FiMonitor, FiAlertCircle, FiActivity, 
  FiGrid, FiSmartphone, FiTool, FiMail, FiPhone,
  FiMapPin, FiMessageSquare, FiUser, FiDollarSign,
  FiPieChart, FiLayers, FiCode, FiGitBranch, FiRss
} from 'react-icons/fi';
import TestimonialSection from '../../../Pages/Home/TestimonialSection';
import WaveCanvas from '../../../Pages/Home/Wavecanvas';
import AllServicesForm from '../../../Pages/CompanyServices/AllServicesForm';

const NetworkSetup = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [counters, setCounters] = useState({});
  const counterRef = useRef(null);

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
    { value: '500+', label: 'Enterprise Networks', sublabel: 'Successfully Deployed', icon: FiServer },
    { value: '100+', label: 'Global Clients', sublabel: 'Across 15 Countries', icon: FiUsers },
    { value: '99.99%', label: 'Uptime SLA', sublabel: 'Redundant Architecture', icon: FiShield },
    { value: '24/7', label: 'Expert Support', sublabel: '15-Min Response SLA', icon: FiHeadphones }
  ];

  const services = [
    {
      icon: FiWifi,
      title: 'Enterprise LAN/WAN Infrastructure',
      subtitle: 'High-Performance Network Architecture',
      description: "We design and deploy robust local and wide area networks with redundant pathways, intelligent load balancing, QoS optimization, and seamless failover capabilities. Our solutions ensure maximum throughput and minimal latency for mission-critical applications.",
      features: [
        'Structured cabling with Cat6A/7 standards',
        'VLAN segmentation for security isolation',
        'Dynamic routing protocols (OSPF, BGP)',
        'Link aggregation for bandwidth maximization',
        'QoS policies for voice/video prioritization',
        'Automated failover with sub-second convergence'
      ],
      benefits: "Reduce network downtime by 85% while improving application performance by 3x.",
      color: '#3b82f6'
    },
    {
      icon: FiShield,
      title: 'Advanced Network Security Suite',
      subtitle: 'Zero Trust Architecture Implementation',
      description: "Our comprehensive security framework protects your organization with next-generation firewalls, intrusion prevention systems, zero-trust network access, and real-time threat intelligence. We implement defense-in-depth strategies that safeguard against evolving cyber threats.",
      features: [
        'Next-gen firewalls with deep packet inspection',
        'IDS/IPS with AI-powered threat detection',
        'Zero Trust Network Access (ZTNA)',
        'SIEM integration with real-time monitoring',
        'Endpoint detection and response (EDR)',
        'Regular vulnerability assessments & pen testing'
      ],
      benefits: "Achieve 99.9% threat detection rate and reduce security incidents by 90%.",
      color: '#ef4444'
    },
    {
      icon: FiCloud,
      title: 'Cloud Network Integration',
      subtitle: 'Hybrid & Multi-Cloud Connectivity',
      description: "Seamlessly connect your on-premises infrastructure with public and private clouds. We design hybrid cloud network architectures with direct connects, SD-WAN optimization, and unified security policies across all environments for consistent performance and security.",
      features: [
        'AWS/Azure/GCP direct connect setup',
        'Multi-cloud load balancing & traffic management',
        'Cloud-native security groups & firewalls',
        'VPN gateways with high availability',
        'Hybrid DNS and IP address management',
        'Cloud migration network planning'
      ],
      benefits: "Reduce cloud egress costs by 40% and improve cross-cloud latency by 60%.",
      color: '#8b5cf6'
    },
    {
      icon: FiGitBranch,
      title: 'SD-WAN Implementation',
      subtitle: 'Software-Defined Wide Area Networking',
      description: "Transform your wide area network with intelligent SD-WAN solutions that provide application-aware routing, centralized management, and optimized cloud connectivity. Reduce WAN costs while improving application performance and reliability across all branches.",
      features: [
        'Application-aware routing policies',
        'Centralized orchestration & management',
        'Dynamic path selection with real-time metrics',
        'Built-in security with encrypted tunnels',
        'Zero-touch provisioning for branches',
        'Traffic shaping and WAN optimization'
      ],
      benefits: "Cut WAN costs by up to 50% and improve application response times by 80%.",
      color: '#10b981'
    },
    {
      icon: FiLock,
      title: 'Secure Remote Access Solutions',
      subtitle: 'VPN & Zero Trust Remote Workforce',
      description: "Enable your distributed workforce with enterprise-grade remote access solutions. We implement SSL/IPSec VPNs, multi-factor authentication, and granular access controls that ensure secure connectivity without compromising user experience or productivity.",
      features: [
        'SSL VPN with split tunneling',
        'Multi-factor authentication (MFA)',
        'Single sign-on (SSO) integration',
        'Role-based access control policies',
        'Endpoint compliance checking',
        'Session monitoring and recording'
      ],
      benefits: "Support 10,000+ concurrent remote users with sub-50ms latency globally.",
      color: '#f59e0b'
    },
    {
      icon: FiActivity,
      title: 'Network Performance Monitoring',
      subtitle: 'AI-Powered Observability Platform',
      description: "Gain complete visibility into your network infrastructure with our AI-driven monitoring solutions. Track performance metrics, detect anomalies, predict capacity issues, and automate remediation workflows to maintain peak network performance 24/7.",
      features: [
        'Real-time network performance dashboards',
        'AI-powered anomaly detection',
        'Automated incident response workflows',
        'Capacity planning & trend analysis',
        'SLA monitoring & compliance reporting',
        'Integration with ITSM tools (ServiceNow, Jira)'
      ],
      benefits: "Identify and resolve 70% of issues before users notice them with predictive analytics.",
      color: '#06b6d4'
    }
  ];

const process = [
  { 
    step: '01', 
    title: 'Discovery\n& Assessment',
    description: "We analyze your current network infrastructure, identify performance gaps, security risks, and understand business requirements for the ideal solution.",
    deliverables: ['Audit Report', 'Traffic Review', 'Security Check', 'Gap Analysis'],
    icon: FiTarget 
  },
  { 
    step: '02', 
    title: 'Architecture\n& Design',
    description: "Our experts create a scalable, secure, and future-ready network architecture with proper topology, equipment planning, and migration strategy.",
    deliverables: ['Architecture Plan', 'Security Design', 'Equipment Specs', 'Migration Plan'],
    icon: FiGrid 
  },
  { 
    step: '03', 
    title: 'Implementation\n& Deployment',
    description: "We deploy the network in planned stages, configure devices, implement security controls, and ensure minimal business downtime.",
    deliverables: ['Configured Setup', 'Security Controls', 'Monitoring', 'Deployment Report'],
    icon: FiTool 
  },
  { 
    step: '04', 
    title: 'Testing\n& Validation',
    description: "Complete testing is performed to verify speed, failover, security, and overall network performance before final handover.",
    deliverables: ['Performance Test', 'Security Test', 'Failover Logs', 'Validation'],
    icon: FiCheckCircle 
  },
  { 
    step: '05', 
    title: 'Knowledge\nTransfer',
    description: "We provide technical documentation, admin credentials, and training sessions so your internal team can manage operations smoothly.",
    deliverables: ['Documentation', 'Training', 'Runbooks', 'Handover'],
    icon: FiUsers 
  },
  { 
    step: '06', 
    title: 'Managed\nSupport',
    description: "Our 24/7 support team continuously monitors, maintains, and optimizes your network for secure and uninterrupted performance.",
    deliverables: ['24/7 Support', 'Monthly Reports', 'Updates', 'Optimization'],
    icon: FiHeadphones 
  }
];
  const caseStudies = [
    {
      title: 'Global FinTech Network Transformation',
      client: 'Leading Financial Services Company',
      challenge: "Legacy network causing 40% downtime during peak trading hours, affecting $2M+ daily transactions across 12 global offices.",
      solution: "Deployed redundant SD-WAN with automated failover, implemented zero-trust security, and migrated to hybrid cloud architecture with direct connects.",
      results: [
        { metric: '99.997%', label: 'Uptime Achieved' },
        { metric: '65%', label: 'Latency Reduction' },
        { metric: '40%', label: 'Cost Savings' },
        { metric: '12', label: 'Countries Connected' }
      ],
      testimonial: "Network transformation exceeded our expectations. Zero downtime during our busiest trading periods.",
      clientName: 'Rajesh Kumar',
      clientRole: 'CTO',
      color: '#3b82f6'
    },
    {
      title: 'Healthcare Network Modernization',
      client: 'Multi-Hospital Healthcare Network',
      challenge: "HIPAA compliance issues with legacy network, slow EMR access affecting patient care across 50+ facilities, and increasing cyber threats targeting healthcare data.",
      solution: "Implemented HIPAA-compliant network segmentation, next-gen firewalls with advanced threat protection, and high-speed wireless infrastructure for mobile healthcare devices.",
      results: [
        { metric: '100%', label: 'HIPAA Compliant' },
        { metric: '50%', label: 'Faster EMR Access' },
        { metric: '0', label: 'Security Breaches' },
        { metric: '50+', label: 'Facilities Connected' }
      ],
      testimonial: "Patient data is now accessible in real-time while maintaining the highest security standards.",
      clientName: 'Dr. Priya Sharma',
      clientRole: 'Chief Medical Information Officer',
      color: '#10b981'
    },
    {
      title: 'E-Commerce Scalable Infrastructure',
      client: 'Fast-Growing E-Commerce Platform',
      challenge: "Unable to handle traffic spikes during sales events, resulting in $500K+ revenue loss per incident. Need for elastic network infrastructure supporting 10x traffic surge.",
      solution: "Designed auto-scaling cloud network architecture with global CDN, intelligent load balancing, and real-time traffic management with predictive scaling capabilities.",
      results: [
        { metric: '1M+', label: 'Concurrent Users' },
        { metric: '0', label: 'Downtime Events' },
        { metric: '3x', label: 'Revenue Growth' },
        { metric: '40ms', label: 'Global Latency' }
      ],
      testimonial: "Handled Black Friday traffic 5x our previous peak without any performance degradation.",
      clientName: 'Amit Patel',
      clientRole: 'VP of Engineering',
      color: '#8b5cf6'
    }
  ];

  const technologies = [
    { name: 'Cisco', category: 'Routing & Switching', icon: FiServer },
    { name: 'Juniper', category: 'Service Provider', icon: FiServer },
    { name: 'Fortinet', category: 'Security', icon: FiShield },
    { name: 'Palo Alto', category: 'Next-Gen Firewall', icon: FiShield },
    { name: 'Aruba', category: 'Wireless', icon: FiWifi },
    { name: 'Ubiquiti', category: 'Wireless & Switching', icon: FiWifi },
    { name: 'VMware', category: 'Virtualization', icon: FiCloud },
    { name: 'AWS/Azure/GCP', category: 'Cloud Platforms', icon: FiCloud },
    { name: 'SolarWinds', category: 'Monitoring', icon: FiMonitor },
    { name: 'Splunk', category: 'SIEM & Analytics', icon: FiActivity }
  ];

  const faqs = [
    {
      question: 'How long does a typical network setup project take?',
      answer: "Project timelines vary based on infrastructure complexity and scale. A small office network (10-50 users) typically takes 2-3 weeks, medium enterprise (100-500 users) takes 4-8 weeks, and large enterprise deployment (1000+ users) requires 8-16 weeks. We provide detailed project timelines during the assessment phase with milestone-based delivery ensuring transparency throughout the engagement."
    },
    {
      question: 'What is your approach to network security implementation?',
      answer: "We follow a defense-in-depth security strategy implementing multiple layers of protection. This includes perimeter security (next-gen firewalls), network segmentation (VLANs/micro-segmentation), access control (zero-trust with MFA), threat detection (IDS/IPS with AI), endpoint protection (EDR), and continuous monitoring (SIEM). We also conduct regular vulnerability assessments, penetration testing, and security audits to maintain robust protection against evolving threats."
    },
    {
      question: 'Do you provide ongoing support after deployment?',
      answer: "Yes, we offer comprehensive managed support packages with 24/7/365 coverage, 15-minute response SLA for critical issues, proactive monitoring, regular health checks, security patch management, and performance optimization. Our support team comprises certified engineers (CCIE, CISSP, etc.) who act as an extension of your IT team. We also provide flexible support tiers based on your requirements and budget."
    },
    {
      question: 'How do you ensure minimal disruption during migration?',
      answer: "We utilize proven migration methodologies with detailed planning, phased implementation, and comprehensive rollback procedures. Our approach includes after-hours cutover when required, parallel running of old and new systems during transition, extensive testing at each phase, and dedicated on-site teams for critical deployments. We typically achieve 95%+ of migrations with zero business disruption through meticulous planning and execution."
    },
    {
      question: 'Can you work with our existing infrastructure and vendors?',
      answer: "We are vendor-agnostic and work with all major networking equipment manufacturers. Our team has expertise across Cisco, Juniper, Fortinet, Palo Alto, Aruba, and many others. We optimize your existing investments while recommending strategic upgrades where needed. Our multi-vendor expertise ensures we provide the best solution, not just what we are most familiar with, maximizing your ROI on existing infrastructure."
    },
    {
      question: 'What compliance standards do you support?',
      answer: "We design networks compliant with major regulatory frameworks including HIPAA (healthcare), PCI-DSS (payment processing), SOC 2 (service organizations), GDPR (data privacy), ISO 27001 (information security), and NIST frameworks. Our team includes certified compliance specialists who ensure your network architecture meets all regulatory requirements with proper documentation, audit trails, and regular compliance assessments."
    }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className={styles.page}>
      

      {/* Hero Section */}
      <section className={styles.hero}>
        <WaveCanvas/>
        <div className={styles.heroBg}>
          <div className={styles.heroGrid}></div>
          <div className={styles.heroParticles}></div>
        </div>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.heroLeft} data-animate="hero-left">
              
              <h1 className={styles.heroTitle}>
                Enterprise-Grade Network <span className={styles.gradient}>Infrastructure</span> & Security Solutions
              </h1>
              <p className={styles.heroDesc}>
                We architect, deploy, and manage mission-critical networks that power the world&apos;s most demanding businesses. From high-frequency trading platforms to healthcare systems handling millions of patient records, our network solutions deliver unmatched performance, security, and reliability.
              </p>
              
              
              <div className={styles.heroHighlights}>
                <div className={styles.highlight}>
                  <FiShield size={22} />
                  <div>
                    <h4>Zero Trust Security</h4>
                    <p>Defense-in-depth architecture with real-time threat intelligence</p>
                  </div>
                </div>
                <div className={styles.highlight}>
                  <FiZap size={22} />
                  <div>
                    <h4>Ultra-Low Latency</h4>
                    <p>Sub-millisecond routing optimized for real-time applications</p>
                  </div>
                </div>
                <div className={styles.highlight}>
                  <FiTrendingUp size={22} />
                  <div>
                    <h4>99.99% Uptime SLA</h4>
                    <p>Redundant architecture with automated failover</p>
                  </div>
                </div>
              </div>

              <div className={styles.heroButtons}>
                <Link to="/contact" className={styles.btnPrimary}>
                  Get Free Network Assessment <FiArrowRight size={18} />
                </Link>
               
              </div>
            </div>

            <div className={styles.heroRight} data-animate="hero-right">
              <div className={styles.heroVisual}>
                <div className={styles.heroImageWrapper}>
                  <img 
                    src="https://i.pinimg.com/1200x/c5/59/68/c5596825fb56fa48692e4fd8117336e3.jpg" 
                    alt="Enterprise Network Infrastructure" 
                    className={styles.heroImage}
                  />
                  <div className={styles.imageOverlay}>
                    <div className={styles.overlayBadge}>
                      <FiCheckCircle size={18} /> SOC 2 Type II Compliant
                    </div>
                  </div>
                </div>
                <div className={styles.floatingCards}>
                  <div className={styles.floatingCard}>
                    <FiServer size={24} />
                    <div>
                      <span>500+</span>
                      <p>Networks Deployed</p>
                    </div>
                  </div>
                  <div className={styles.floatingCard}>
                    <FiUsers size={24} />
                    <div>
                      <span>100+</span>
                      <p>Enterprise Clients</p>
                    </div>
                  </div>
                  <div className={styles.floatingCard}>
                    <FiGlobe size={24} />
                    <div>
                      <span>15</span>
                      <p>Countries Served</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
<AllServicesForm/>
      {/* Trust Bar */}
      <section className={styles.trustBar}>
        <div className={styles.container}>
          <p className={styles.trustLabel}>Trusted by industry leaders across sectors</p>
          <div className={styles.trustGrid}>
            <div className={styles.trustItem}>
              <FiServer size={24} />
              <div>
                <span>500+</span>
                <p>Deployments</p>
              </div>
            </div>
            <div className={styles.trustItem}>
              <FiUsers size={24} />
              <div>
                <span>100+</span>
                <p>Enterprise Clients</p>
              </div>
            </div>
            <div className={styles.trustItem}>
              <FiClock size={24} />
              <div>
                <span>15+</span>
                <p>Years Experience</p>
              </div>
            </div>
            <div className={styles.trustItem}>
              <FiAward size={24} />
              <div>
                <span>50+</span>
                <p>Certifications</p>
              </div>
            </div>
            <div className={styles.trustItem}>
              <FiShield size={24} />
              <div>
                <span>99.99%</span>
                <p>SLA Compliance</p>
              </div>
            </div>
            <div className={styles.trustItem}>
              <FiHeadphones size={24} />
              <div>
                <span>24/7</span>
                <p>Expert Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.services} id="services">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>
              <FiGrid size={14} /> Our Core Services
            </span>
            <h2 className={styles.sectionTitle}>
              Comprehensive Network <span className={styles.gradient}>Solutions Portfolio</span>
            </h2>
            <p className={styles.sectionDesc}>
              End-to-end network services covering every aspect of enterprise networking — from initial assessment and architecture design to 24/7 managed operations. Our solutions are tailored to your specific industry, scale, and business objectives.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service, idx) => (
              <div key={idx} className={styles.serviceCard} data-animate={`service-${idx}`}>
                <div className={styles.serviceHeader}>
                  <div className={styles.serviceIconWrapper} style={{ background: `${service.color}15`, borderColor: service.color }}>
                    <service.icon size={28} color={service.color} />
                  </div>
                  <span className={styles.serviceNumber}>0{idx + 1}</span>
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceSubtitle}>{service.subtitle}</p>
                <p className={styles.serviceDescription}>{service.description}</p>
                
                <div className={styles.serviceFeatures}>
                  <h4>Key Features & Capabilities:</h4>
                  <ul>
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx}>
                        <FiCheckCircle size={14} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.serviceBenefits}>
                  <div className={styles.benefitBadge}>
                    <FiTrendingUp size={14} />
                    <span>{service.benefits}</span>
                  </div>
                </div>

                <Link to="/contact" className={styles.serviceLink}>
                  Learn More About This Solution <FiArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className={styles.caseStudies}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>
              <FiBarChart2 size={14} /> Client Success Stories
            </span>
            <h2 className={styles.sectionTitle}>
              Real-World <span className={styles.gradient}>Transformation Results</span>
            </h2>
            <p className={styles.sectionDesc}>
              See how we have helped organizations across industries achieve their networking goals with measurable business impact
            </p>
          </div>

          <div className={styles.caseStudyGrid}>
            {caseStudies.map((study, idx) => (
              <div key={idx} className={styles.caseStudyCard} data-animate={`case-${idx}`}>
                <div className={styles.caseStudyHeader}>
                  <div className={styles.caseStudyBadge} style={{ background: `${study.color}15`, color: study.color }}>
                    Case Study 0{idx + 1}
                  </div>
                </div>
                <h3 className={styles.caseStudyTitle}>{study.title}</h3>
                <p className={styles.caseStudyClient}>{study.client}</p>
                
                <div className={styles.caseStudySection}>
                  <h4>The Challenge:</h4>
                  <p>{study.challenge}</p>
                </div>
                
                <div className={styles.caseStudySection}>
                  <h4>Our Solution:</h4>
                  <p>{study.solution}</p>
                </div>

                <div className={styles.caseStudyResults}>
                  <h4>Measurable Results:</h4>
                  <div className={styles.resultsGrid}>
                    {study.results.map((result, rIdx) => (
                      <div key={rIdx} className={styles.resultItem}>
                        <span className={styles.resultMetric}>{result.metric}</span>
                        <span className={styles.resultLabel}>{result.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.caseStudyTestimonial}>
                  <p>&quot;{study.testimonial}&quot;</p>
                  <div className={styles.testimonialAuthor}>
                    <strong>{study.clientName}</strong>
                    <span>{study.clientRole}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.caseStudyCTA}>
            <Link to="/portfolio" className={styles.btnOutline}>
              Explore All Case Studies <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.process}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>
              <FiRefreshCw size={14} /> Our Proven Methodology
            </span>
            <h2 className={styles.sectionTitle}>
              6-Phase <span className={styles.gradient}>Implementation Framework</span>
            </h2>
            <p className={styles.sectionDesc}>
              A systematic, battle-tested approach refined over 500+ successful deployments ensuring predictable outcomes, minimal disruption, and maximum value delivery
            </p>
          </div>

          <div className={styles.processTimeline}>
            {process.map((step, idx) => (
              <div key={idx} className={styles.processItem} data-animate={`process-${idx}`}>
                <div className={styles.processCard}>
                  <div className={styles.processHeader}>
                    <div className={styles.processIconCircle}>
                      <step.icon size={28} />
                    </div>
                    <div className={styles.processNumber}>{step.step}</div>
                  </div>
                  <h3 className={styles.processTitle}>{step.title}</h3>
                  <p className={styles.processDescription}>{step.description}</p>
                  <div className={styles.processDeliverables}>
                    <h4>Key Deliverables:</h4>
                    <div className={styles.deliverableTags}>
                      {step.deliverables.map((deliverable, dIdx) => (
                        <span key={dIdx} className={styles.deliverableTag}>
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {idx < process.length - 1 && (
                  <div className={styles.processConnector}>
                    <FiArrowRight size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className={styles.technologies}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>
              <FiCpu size={14} /> Technology Ecosystem
            </span>
            <h2 className={styles.sectionTitle}>
              Multi-Vendor <span className={styles.gradient}>Expertise & Partnerships</span>
            </h2>
            <p className={styles.sectionDesc}>
              We maintain deep expertise and strong partnerships with all major networking and security vendors, ensuring you get the best-fit solution — not a one-size-fits-all approach. Our vendor-agnostic methodology maximizes your technology investments.
            </p>
          </div>

          <div className={styles.techGrid}>
            {technologies.map((tech, idx) => (
              <div key={idx} className={styles.techCard} data-animate={`tech-${idx}`}>
                <tech.icon size={32} />
                <div className={styles.techInfo}>
                  <h4>{tech.name}</h4>
                  <span>{tech.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <FiServer size={32} />
              <span className={styles.statNumber}>500+</span>
              <p>Networks Successfully Deployed</p>
              <small>Across 15 countries globally</small>
            </div>
            <div className={styles.statItem}>
              <FiUsers size={32} />
              <span className={styles.statNumber}>100+</span>
              <p>Enterprise Clients Served</p>
              <small>Including Fortune 500 companies</small>
            </div>
            <div className={styles.statItem}>
              <FiClock size={32} />
              <span className={styles.statNumber}>15+</span>
              <p>Years of Industry Experience</p>
              <small>Deep domain expertise</small>
            </div>
            <div className={styles.statItem}>
              <FiAward size={32} />
              <span className={styles.statNumber}>50+</span>
              <p>Technical Certifications</p>
              <small>CCIE, CISSP, AWS, Azure certified</small>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faq}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>
              <FiMessageSquare size={14} /> Common Questions
            </span>
            <h2 className={styles.sectionTitle}>
              Frequently Asked <span className={styles.gradient}>Questions</span>
            </h2>
            <p className={styles.sectionDesc}>
              Get answers to the most common questions about our network services and approach
            </p>
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
                <FiZap size={14} /> Limited Time Offer — Free Assessment Worth $2,500
              </div>
              <h2>Ready to Transform Your Network Into a Competitive Advantage?</h2>
              <p>
                Schedule a comprehensive network assessment with our senior architects. We will analyze your current infrastructure, identify optimization opportunities, security vulnerabilities, and provide a detailed roadmap for improvement — completely free and without obligation.
              </p>
              <p>
                Our assessment includes network performance analysis, security posture evaluation, architecture review, cost optimization recommendations, and a customized implementation plan tailored to your business objectives.
              </p>
              
              <div className={styles.ctaFeaturesGrid}>
                <div className={styles.ctaFeature}>
                  <FiCheckCircle size={20} />
                  <div>
                    <h4>Free Network Audit</h4>
                    <p>Comprehensive infrastructure analysis ($2,500 value)</p>
                  </div>
                </div>
                <div className={styles.ctaFeature}>
                  <FiShield size={20} />
                  <div>
                    <h4>Security Assessment</h4>
                    <p>Vulnerability scan and threat analysis</p>
                  </div>
                </div>
                <div className={styles.ctaFeature}>
                  <FiPieChart size={20} />
                  <div>
                    <h4>ROI Analysis</h4>
                    <p>Cost optimization and TCO calculation</p>
                  </div>
                </div>
                <div className={styles.ctaFeature}>
                  <FiTrendingUp size={20} />
                  <div>
                    <h4>Growth Roadmap</h4>
                    <p>Scalable architecture for future needs</p>
                  </div>
                </div>
              </div>

              <div className={styles.ctaButtons}>
                <Link to="/contact" className={styles.ctaBtnPrimary}>
                  Schedule Your Free Assessment <FiArrowRight size={18} />
                </Link>
                <Link to="/contact" className={styles.ctaBtnSecondary}>
                  Speak With an Expert
                </Link>
              </div>
            </div>

            <div className={styles.ctaSidebar}>
              <div className={styles.ctaCard}>
                <div className={styles.ctaCardHeader}>
                  <FiClock size={20} />
                  <span>What You will Get</span>
                </div>
                <ul className={styles.ctaCardList}>
                  <li>
                    <FiCheckCircle size={16} />
                    <div>
                      <strong>Detailed Network Audit Report</strong>
                      <p>Complete infrastructure analysis with bottlenecks identified</p>
                    </div>
                  </li>
                  <li>
                    <FiCheckCircle size={16} />
                    <div>
                      <strong>Security Vulnerability Assessment</strong>
                      <p>Threat landscape analysis and risk scoring</p>
                    </div>
                  </li>
                  <li>
                    <FiCheckCircle size={16} />
                    <div>
                      <strong>Architecture Recommendations</strong>
                      <p>Custom design aligned with your business goals</p>
                    </div>
                  </li>
                  <li>
                    <FiCheckCircle size={16} />
                    <div>
                      <strong>Implementation Roadmap</strong>
                      <p>Phased deployment plan with timeline and budget</p>
                    </div>
                  </li>
                  <li>
                    <FiCheckCircle size={16} />
                    <div>
                      <strong>Cost-Benefit Analysis</strong>
                      <p>ROI projections and TCO comparisons</p>
                    </div>
                  </li>
                  <li>
                    <FiCheckCircle size={16} />
                    <div>
                      <strong>Executive Presentation</strong>
                      <p>Board-ready summary for stakeholders</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

     <TestimonialSection/>
    </div>
  );
};

export default NetworkSetup;