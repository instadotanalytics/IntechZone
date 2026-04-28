import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ItConsulting.module.css';
import {
  FiArrowRight, FiCheckCircle, FiClock, FiStar, FiAward,
  FiZap, FiTrendingUp, FiUsers, FiGlobe, FiHeadphones,
  FiTarget, FiShield, FiRefreshCw, FiServer, FiCpu,
  FiCloud, FiMonitor, FiTool, FiMail, FiPhone,
  FiMapPin, FiDollarSign, FiPieChart, FiCode,
  FiDatabase, FiActivity, FiGrid, FiBarChart2,
  FiMessageSquare, FiLayers, FiSettings, FiLifeBuoy,
  FiBriefcase, FiBookOpen, FiCompass, FiAnchor,
  FiAlertTriangle, FiThumbsUp, FiClipboard, FiList
} from 'react-icons/fi';
import WaveCanvas from '../../../Pages/Home/Wavecanvas';
import AllServicesForm from '../../../Pages/CompanyServices/AllServicesForm';
import TestimonialSection from '../../../Pages/Home/TestimonialSection';

const ItConsulting = () => {
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
    { value: '200+', label: 'Clients Consulted', desc: 'Across 25+ Industries', icon: FiBriefcase },
    { value: '95%', label: 'Client Satisfaction', desc: 'Repeat Engagement Rate', icon: FiThumbsUp },
    { value: '15+', label: 'Years Experience', desc: 'Strategic IT Advisory', icon: FiClock },
    { value: '50+', label: 'Expert Consultants', desc: 'Certified Professionals', icon: FiUsers }
  ];

  const services = [
    {
      icon: FiCompass,
      title: 'IT Strategy & Roadmap',
      subtitle: 'Align Technology with Business Goals',
      description: "Develop comprehensive IT strategies that drive business growth, optimize costs, and create competitive advantage. Our strategic consultants work with your leadership team to create technology roadmaps aligned with your business objectives.",
      deliverables: [
        'IT strategic plan & roadmap (1/3/5 year)',
        'Technology stack assessment & recommendations',
        'Digital transformation strategy',
        'IT governance framework design',
        'Budget planning & ROI analysis',
        'Vendor selection & management strategy'
      ],
      color: '#3b82f6'
    },
    {
      icon: FiShield,
      title: 'Cybersecurity Consulting',
      subtitle: 'Protect Your Digital Assets',
      description: "Comprehensive cybersecurity advisory services to identify vulnerabilities, assess risks, and implement robust security frameworks. Our certified security experts help you build a resilient security posture against evolving threats.",
      deliverables: [
        'Security assessment & gap analysis',
        'Risk management framework (NIST, ISO 27001)',
        'Compliance readiness (SOC2, HIPAA, GDPR, PCI-DSS)',
        'Incident response planning',
        'Security architecture design',
        'Employee security awareness training'
      ],
      color: '#ef4444'
    },
    {
      icon: FiCloud,
      title: 'Cloud Advisory Services',
      subtitle: 'Optimize Your Cloud Journey',
      description: "Navigate your cloud adoption journey with confidence. From migration strategy to cost optimization, our cloud consultants help you leverage the full potential of cloud technologies while controlling costs.",
      deliverables: [
        'Cloud readiness assessment',
        'Migration strategy & roadmap',
        'Multi-cloud/hybrid architecture design',
        'Cost optimization (FinOps)',
        'Cloud security & compliance',
        'Cloud-native transformation planning'
      ],
      color: '#10b981'
    },
    {
      icon: FiTrendingUp,
      title: 'Digital Transformation',
      subtitle: 'Modernize Your Business',
      description: "Transform your organization with cutting-edge digital solutions. We help you reimagine business processes, customer experiences, and operational models using emerging technologies.",
      deliverables: [
        'Digital maturity assessment',
        'Process automation strategy',
        'Customer experience transformation',
        'Legacy system modernization plan',
        'Change management framework',
        'Innovation workshop & ideation'
      ],
      color: '#8b5cf6'
    },
    {
      icon: FiDatabase,
      title: 'Data & Analytics Strategy',
      subtitle: 'Become Data-Driven',
      description: "Unlock the value of your data assets with a comprehensive analytics strategy. We help you build data infrastructure, governance frameworks, and analytics capabilities that drive informed decision-making.",
      deliverables: [
        'Data maturity assessment',
        'Data governance framework',
        'Analytics & BI strategy',
        'AI/ML readiness assessment',
        'Data architecture design',
        'KPI & metrics framework definition'
      ],
      color: '#f59e0b'
    },
    {
      icon: FiServer,
      title: 'Infrastructure Optimization',
      subtitle: 'Maximize IT Infrastructure ROI',
      description: "Optimize your IT infrastructure for performance, reliability, and cost-efficiency. Our infrastructure consultants assess your current setup and design scalable, resilient architectures.",
      deliverables: [
        'Infrastructure assessment & audit',
        'Capacity planning & optimization',
        'Disaster recovery & BCP planning',
        'Network architecture design',
        'Virtualization & containerization strategy',
        'IT service management (ITSM) implementation'
      ],
      color: '#06b6d4'
    }
  ];

  const consultingProcess = [
    {
      step: '01',
      title: 'Discovery & Assessment',
      description: "We conduct in-depth interviews, review existing documentation, analyze your technology landscape, and assess current capabilities against business objectives.",
      activities: ['Stakeholder interviews', 'Technology audit', 'Process mapping', 'SWOT analysis'],
      icon: FiTarget
    },
    {
      step: '02',
      title: 'Analysis & Strategy',
      description: "Our consultants analyze findings, identify gaps and opportunities, benchmark against industry best practices, and develop strategic recommendations.",
      activities: ['Gap analysis', 'Benchmarking', 'Solution design', 'Business case development'],
      icon: FiBarChart2
    },
    {
      step: '03',
      title: 'Roadmap Development',
      description: "We create detailed implementation roadmaps with prioritized initiatives, timelines, resource requirements, and measurable KPIs.",
      activities: ['Initiative prioritization', 'Resource planning', 'Timeline creation', 'KPI definition'],
      icon: FiList
    },
    {
      step: '04',
      title: 'Presentation & Validation',
      description: "Present findings and recommendations to stakeholders, gather feedback, refine the strategy, and secure alignment and buy-in.",
      activities: ['Executive presentation', 'Feedback incorporation', 'Strategy refinement', 'Stakeholder alignment'],
      icon: FiClipboard
    },
    {
      step: '05',
      title: 'Implementation Support',
      description: "We provide ongoing guidance during implementation, help select vendors, manage change, and ensure strategy execution stays on track.",
      activities: ['Vendor evaluation', 'Program governance', 'Change management', 'Progress tracking'],
      icon: FiSettings
    },
    {
      step: '06',
      title: 'Review & Optimize',
      description: "Regular strategy reviews, performance measurement against KPIs, and continuous optimization to adapt to changing business needs.",
      activities: ['KPI review', 'Strategy refresh', 'Continuous improvement', 'Innovation scouting'],
      icon: FiRefreshCw
    }
  ];

  const caseStudies = [
    {
      title: "Enterprise IT Transformation",
      industry: "Manufacturing",
      challenge: "A global manufacturer with 50+ locations needed to modernize legacy IT infrastructure, reduce operational costs, and enable digital transformation across all facilities.",
      approach: "Conducted comprehensive IT assessment, designed hybrid cloud architecture, developed 3-year transformation roadmap with clear milestones and ROI projections.",
      results: [
        { metric: "40%", label: "Cost Reduction" },
        { metric: "60%", label: "Faster Deployment" },
        { metric: "99.9%", label: "Uptime" },
        { metric: "3 Years", label: "Transformation" }
      ],
      testimonial: "The strategic roadmap provided clear direction and helped us achieve operational excellence across all locations.",
      clientName: "James Wilson",
      clientRole: "CIO, Global Manufacturing Corp",
      color: "#3b82f6"
    },
    {
      title: "Cybersecurity Program Overhaul",
      industry: "Financial Services",
      challenge: "A fintech company handling sensitive financial data needed to achieve SOC 2 compliance and build a comprehensive security program within 6 months.",
      approach: "Performed security gap analysis, designed security framework aligned with NIST standards, implemented controls, and prepared for SOC 2 audit.",
      results: [
        { metric: "SOC 2", label: "Certified" },
        { metric: "0", label: "Security Incidents" },
        { metric: "100%", label: "Compliance" },
        { metric: "5 Months", label: "Implementation" }
      ],
      testimonial: "Their cybersecurity expertise helped us achieve compliance faster than we thought possible while building a robust security posture.",
      clientName: "Sarah Chen",
      clientRole: "CISO, FinTech Innovations",
      color: "#10b981"
    },
    {
      title: "Cloud Migration Strategy",
      industry: "Healthcare",
      challenge: "A healthcare provider needed to migrate 200+ applications to cloud while maintaining HIPAA compliance and zero downtime for critical patient care systems.",
      approach: "Developed phased migration strategy with risk assessment, HIPAA-compliant architecture design, detailed migration runbooks, and rollback plans.",
      results: [
        { metric: "200+", label: "Apps Migrated" },
        { metric: "0", label: "Downtime" },
        { metric: "35%", label: "Cost Savings" },
        { metric: "100%", label: "HIPAA Compliant" }
      ],
      testimonial: "Their methodical approach and healthcare expertise ensured seamless migration without impacting patient care.",
      clientName: "Dr. Michael Roberts",
      clientRole: "CTO, Regional Healthcare",
      color: "#8b5cf6"
    }
  ];

  const industries = [
    { name: "Healthcare", icon: FiActivity },
    { name: "Financial Services", icon: FiDollarSign },
    { name: "Manufacturing", icon: FiTool },
    { name: "Retail & E-Commerce", icon: FiGlobe },
    { name: "Technology & SaaS", icon: FiCloud },
    { name: "Education", icon: FiBookOpen },
    { name: "Government", icon: FiShield },
    { name: "Energy & Utilities", icon: FiZap }
  ];

  const advisoryAreas = [
    {
      icon: FiTarget,
      title: "IT Strategy & Governance",
      points: [
        "IT vision and strategic planning",
        "IT operating model design",
        "Governance framework implementation",
        "IT performance management",
        "Technology portfolio optimization"
      ]
    },
    {
      icon: FiShield,
      title: "Risk & Compliance",
      points: [
        "IT risk assessment and management",
        "Regulatory compliance (GDPR, SOX, HIPAA)",
        "Business continuity planning",
        "Third-party risk management",
        "Internal audit support"
      ]
    },
    {
      icon: FiDollarSign,
      title: "IT Financial Management",
      points: [
        "IT budgeting and forecasting",
        "TCO and ROI analysis",
        "Vendor contract optimization",
        "IT cost allocation models",
        "Chargeback/showback design"
      ]
    },
    {
      icon: FiUsers,
      title: "Organizational Change",
      points: [
        "IT organizational design",
        "Skills assessment and planning",
        "Change management strategy",
        "Communication planning",
        "Training and enablement"
      ]
    }
  ];

  const faqs = [
    {
      question: "What types of IT consulting services do you offer?",
      answer: "We provide comprehensive IT consulting services including IT strategy development, cybersecurity advisory, cloud migration planning, digital transformation, data analytics strategy, infrastructure optimization, IT governance, compliance consulting, and technology vendor selection. Our services cover the entire technology lifecycle from strategy to implementation support."
    },
    {
      question: "How long does a typical IT consulting engagement last?",
      answer: "Engagement duration varies based on scope and complexity. Strategic assessments typically take 4-8 weeks, comprehensive transformation roadmaps may take 8-12 weeks, and ongoing advisory services can extend to 6-12 months or longer. We provide clear timelines during the proposal phase. Many clients engage us for initial assessments followed by long-term advisory relationships."
    },
    {
      question: "What industries do you specialize in?",
      answer: "We have deep expertise across multiple industries including healthcare, financial services, manufacturing, retail and e-commerce, technology and SaaS, education, government, and energy. Our consultants bring industry-specific knowledge of regulations, best practices, and technology trends relevant to each sector."
    },
    {
      question: "How do you ensure the quality of your consulting deliverables?",
      answer: "Our consulting engagements follow a structured methodology with clear deliverables, milestones, and quality gates. Every engagement is led by senior consultants with 15+ years of experience. We conduct internal peer reviews, present findings iteratively to stakeholders, and incorporate feedback continuously. Our 95% client satisfaction rate reflects our commitment to quality."
    },
    {
      question: "Can you help with implementation after the strategy is developed?",
      answer: "Yes, we offer implementation support services to ensure strategy execution. This includes program governance, vendor evaluation and selection, architecture oversight, change management, and progress tracking. We can either lead the implementation or provide advisory oversight to your internal teams."
    },
    {
      question: "What is your pricing model for consulting services?",
      answer: "We offer flexible pricing models including fixed-price for defined-scope assessments, time and materials for ongoing advisory, and retainer-based models for long-term partnerships. Each engagement is custom-priced based on scope, complexity, and duration. We provide detailed proposals with clear deliverables and pricing before engagement starts."
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
          <div className={styles.heroGlow}></div>
        </div>
        <div className={styles.container}>
          <div className={styles.heroContent} data-animate="hero">
            <div className={styles.heroBadge}>
              <FiCompass size={14} /> Strategic IT Consulting & Advisory
            </div>
            <h1 className={styles.heroTitle}>
              Transform Your Business with{" "}
              <span className={styles.gradient}>Expert IT Consulting</span>
            </h1>
            <p className={styles.heroDesc}>
              Make confident technology decisions with strategic guidance from experienced 
              consultants. We help organizations align IT investments with business goals, 
              mitigate risks, and accelerate digital transformation.
            </p>
            <p className={styles.heroDesc}>
              From startups to Fortune 500 companies, our certified consultants bring 15+ years 
              of industry expertise to solve your most complex technology challenges.
            </p>

            <div className={styles.heroHighlights}>
              <div className={styles.highlight}>
                <FiCompass size={22} />
                <div>
                  <h4>Strategic Advisory</h4>
                  <p>Align technology with business objectives</p>
                </div>
              </div>
              <div className={styles.highlight}>
                <FiShield size={22} />
                <div>
                  <h4>Risk Mitigation</h4>
                  <p>Identify and address technology risks</p>
                </div>
              </div>
              <div className={styles.highlight}>
                <FiTrendingUp size={22} />
                <div>
                  <h4>Growth Enablement</h4>
                  <p>Leverage tech for competitive advantage</p>
                </div>
              </div>
            </div>

            <div className={styles.heroButtons}>
              <Link to="/contact" className={styles.btnPrimary}>
                Schedule Free Consultation <FiArrowRight size={18} />
              </Link>
              <Link to="/portfolio" className={styles.btnSecondary}>
                Download Consulting Brochure
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

      <AllServicesForm/>

      {/* Advisory Areas Section */}
      <section className={styles.advisoryAreas}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>
              <FiGrid size={14} /> Advisory Areas
            </span>
            <h2 className={styles.sectionTitle}>
              Strategic <span className={styles.gradient}>Consulting Domains</span>
            </h2>
            <p className={styles.sectionDesc}>
              Our consulting practice covers every critical area of enterprise IT management 
              and strategy
            </p>
          </div>

          <div className={styles.advisoryGrid}>
            {advisoryAreas.map((area, idx) => (
              <div key={idx} className={styles.advisoryCard} data-animate={`advisory-${idx}`}>
                <div className={styles.advisoryIcon}>
                  <area.icon size={30} />
                </div>
                <h3>{area.title}</h3>
                <ul>
                  {area.points.map((point, pIdx) => (
                    <li key={pIdx}>
                      <FiCheckCircle size={14} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.services}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>
              <FiBriefcase size={14} /> Consulting Services
            </span>
            <h2 className={styles.sectionTitle}>
              Comprehensive <span className={styles.gradient}>IT Consulting Solutions</span>
            </h2>
            <p className={styles.sectionDesc}>
              End-to-end consulting services from strategy development to implementation support. 
              We partner with you throughout your technology transformation journey.
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

                <div className={styles.serviceDeliverables}>
                  <h4>Key Deliverables:</h4>
                  <ul>
                    {service.deliverables.map((deliverable, dIdx) => (
                      <li key={dIdx}>
                        <FiCheckCircle size={14} />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to="/contact" className={styles.serviceLink}>
                  Learn More <FiArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.process}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>
              <FiRefreshCw size={14} /> Our Methodology
            </span>
            <h2 className={styles.sectionTitle}>
              Our <span className={styles.gradient}>Consulting Approach</span>
            </h2>
            <p className={styles.sectionDesc}>
              A structured, proven methodology refined through 200+ successful consulting 
              engagements across industries
            </p>
          </div>

          <div className={styles.processGrid}>
            {consultingProcess.map((phase, idx) => (
              <div key={idx} className={styles.processItem} data-animate={`process-${idx}`}>
                <div className={styles.processCard}>
                  <div className={styles.processStep}>{phase.step}</div>
                  <div className={styles.processIcon}>
                    <phase.icon size={28} />
                  </div>
                  <h3>{phase.title}</h3>
                  <p>{phase.description}</p>
                  <div className={styles.processActivities}>
                    <h4>Activities:</h4>
                    <div className={styles.activityTags}>
                      {phase.activities.map((activity, aIdx) => (
                        <span key={aIdx} className={styles.activityTag}>{activity}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {idx < consultingProcess.length - 1 && (
                  <div className={styles.processArrow}>
                    <FiArrowRight size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className={styles.industries}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>
              <FiGlobe size={14} /> Industries
            </span>
            <h2 className={styles.sectionTitle}>
              Industry-Specific <span className={styles.gradient}>Expertise</span>
            </h2>
            <p className={styles.sectionDesc}>
              Deep domain knowledge across diverse industry verticals ensures relevant and 
              practical recommendations
            </p>
          </div>

          <div className={styles.industryGrid}>
            {industries.map((industry, idx) => (
              <div key={idx} className={styles.industryCard} data-animate={`industry-${idx}`}>
                <div className={styles.industryIcon}>
                  <industry.icon size={36} />
                </div>
                <h3>{industry.name}</h3>
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
              <FiBarChart2 size={14} /> Client Impact
            </span>
            <h2 className={styles.sectionTitle}>
              Consulting <span className={styles.gradient}>Success Stories</span>
            </h2>
            <p className={styles.sectionDesc}>
              Real results delivered through strategic IT advisory for leading organizations
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
                  <h4>Our Approach:</h4>
                  <p>{study.approach}</p>
                </div>
                <div className={styles.caseStudyResults}>
                  {study.results.map((result, rIdx) => (
                    <div key={rIdx} className={styles.resultItem}>
                      <span className={styles.resultMetric}>{result.metric}</span>
                      <span className={styles.resultLabel}>{result.label}</span>
                    </div>
                  ))}
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

      <TestimonialSection/>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaWrapper}>
            <div className={styles.ctaContent}>
              <div className={styles.ctaBadge}>
                <FiZap size={14} /> Complimentary Initial Consultation
              </div>
              <h2>Ready to Transform Your IT Strategy?</h2>
              <p>
                Schedule a free consultation with our senior IT strategy consultants. We will 
                discuss your challenges, share initial observations, and outline how we can help 
                you achieve your technology and business objectives.
              </p>
              <p>
                Our consulting engagements are tailored to your specific needs with flexible 
                pricing models. Whether you need a focused 4-week assessment or long-term 
                advisory partnership, we have the right approach for you.
              </p>

              <div className={styles.ctaFeatures}>
                <div className={styles.ctaFeature}>
                  <FiCheckCircle size={18} />
                  <span>Free 45-minute strategy session with senior consultant</span>
                </div>
                <div className={styles.ctaFeature}>
                  <FiCheckCircle size={18} />
                  <span>Custom proposal with scope, timeline, and pricing within 3 days</span>
                </div>
                <div className={styles.ctaFeature}>
                  <FiCheckCircle size={18} />
                  <span>Access to industry benchmarks and best practices</span>
                </div>
                <div className={styles.ctaFeature}>
                  <FiCheckCircle size={18} />
                  <span>Confidential discussion under NDA if required</span>
                </div>
              </div>

              <div className={styles.ctaButtons}>
                <Link to="/contact" className={styles.ctaBtnPrimary}>
                  Book Your Free Consultation <FiArrowRight size={18} />
                </Link>
                <Link to="/contact" className={styles.ctaBtnSecondary}>
                  Download Service Overview
                </Link>
              </div>
            </div>

            <div className={styles.ctaSidebar}>
              <div className={styles.ctaCard}>
                <div className={styles.ctaCardHeader}>
                  <FiClipboard size={20} />
                  <span>What You Get</span>
                </div>
                <ul className={styles.ctaCardList}>
                  <li>
                    <span className={styles.ctaStep}>01</span>
                    <div>
                      <strong>Discovery Call</strong>
                      <p>Discuss your challenges and objectives with a senior consultant</p>
                    </div>
                  </li>
                  <li>
                    <span className={styles.ctaStep}>02</span>
                    <div>
                      <strong>Initial Assessment</strong>
                      <p>High-level review of your current IT landscape</p>
                    </div>
                  </li>
                  <li>
                    <span className={styles.ctaStep}>03</span>
                    <div>
                      <strong>Proposal & Scope</strong>
                      <p>Detailed engagement proposal with clear deliverables</p>
                    </div>
                  </li>
                  <li>
                    <span className={styles.ctaStep}>04</span>
                    <div>
                      <strong>Engagement Kickoff</strong>
                      <p>Team assigned and project initiated within 1-2 weeks</p>
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

export default ItConsulting;