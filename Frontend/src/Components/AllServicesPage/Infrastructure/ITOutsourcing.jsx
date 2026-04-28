import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ITOutsourcing.module.css';
import {
  FiArrowRight, FiCheckCircle, FiClock, FiStar, FiAward,
  FiZap, FiTrendingUp, FiUsers, FiGlobe, FiHeadphones,
  FiTarget, FiShield, FiRefreshCw, FiServer, FiCpu,
  FiCloud, FiMonitor, FiTool, FiMail, FiPhone,
  FiMapPin, FiDollarSign, FiPieChart, FiCode,
  FiSmartphone, FiDatabase, FiActivity, FiGrid,
  FiBarChart2, FiMessageSquare, FiUser, FiLayers,
  FiGitBranch, FiPackage, FiSettings, FiLifeBuoy
} from 'react-icons/fi';
import WaveCanvas from '../../../Pages/Home/Wavecanvas';
import AllServicesForm from '../../../Pages/CompanyServices/AllServicesForm';
import TestimonialSection from '../../../Pages/Home/TestimonialSection';

const ITOutsourcing = () => {
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
    { value: '250+', label: 'Global Clients', desc: 'Across 20+ Countries', icon: FiGlobe },
    { value: '15+', label: 'Years Experience', desc: 'Since 2009', icon: FiClock },
    { value: '500+', label: 'Skilled Engineers', desc: 'Ready to Deploy', icon: FiUsers },
    { value: '60%', label: 'Cost Reduction', desc: 'Average Client Savings', icon: FiDollarSign }
  ];

  const services = [
    {
      icon: FiCode,
      title: 'Custom Software Development',
      subtitle: 'End-to-End Development Services',
      description: "Build scalable, secure, and innovative software solutions with our expert development teams. From enterprise applications to cloud-native platforms, we deliver quality code that drives business growth.",
      features: [
        'Full-stack web & mobile development',
        'Cloud-native microservices architecture',
        'API development & integration',
        'Legacy system modernization',
        'DevOps & CI/CD pipeline setup',
        'Quality assurance & automated testing'
      ],
      techStack: 'React, Node.js, Python, Java, .NET, AWS, Azure',
      color: '#3b82f6'
    },
    {
      icon: FiCloud,
      title: 'Cloud & Infrastructure Services',
      subtitle: 'Cloud Migration & Management',
      description: "Transform your IT infrastructure with our comprehensive cloud services. We handle migration, optimization, security, and 24/7 management of your cloud environments across all major platforms.",
      features: [
        'Cloud migration & modernization',
        'Multi-cloud architecture design',
        'Infrastructure as Code (IaC)',
        '24/7 monitoring & management',
        'Cost optimization & FinOps',
        'Disaster recovery & backup'
      ],
      techStack: 'AWS, Azure, GCP, Terraform, Kubernetes, Docker',
      color: '#10b981'
    },
    {
      icon: FiShield,
      title: 'Cybersecurity Services',
      subtitle: 'Managed Security Solutions',
      description: "Protect your business from evolving cyber threats with our comprehensive security services. Our certified security experts provide 24/7 monitoring, threat detection, and incident response.",
      features: [
        'Security operations center (SOC)',
        'Vulnerability assessment & pen testing',
        'Compliance management (SOC2, HIPAA)',
        'Identity & access management',
        'Network security & firewalls',
        'Incident response & forensics'
      ],
      techStack: 'SIEM, EDR, NGFW, IDS/IPS, Splunk, CrowdStrike',
      color: '#ef4444'
    },
    {
      icon: FiDatabase,
      title: 'Data & Analytics Services',
      subtitle: 'Turn Data into Insights',
      description: "Unlock the power of your data with our analytics and BI solutions. From data engineering to AI/ML implementation, we help you make data-driven decisions that accelerate growth.",
      features: [
        'Data warehouse & lake architecture',
        'ETL pipeline development',
        'Business intelligence dashboards',
        'AI/ML model development',
        'Big data processing',
        'Real-time analytics'
      ],
      techStack: 'Python, Spark, Snowflake, Power BI, TensorFlow, Kafka',
      color: '#8b5cf6'
    },
    {
      icon: FiHeadphones,
      title: 'IT Help Desk & Support',
      subtitle: '24/7 Technical Support',
      description: "Provide exceptional IT support to your employees and customers with our multi-tier help desk services. We ensure quick resolution times and high satisfaction rates.",
      features: [
        'L1/L2/L3 support tiers',
        '24/7 help desk availability',
        'Multi-channel support (phone, chat, email)',
        'Remote desktop support',
        'IT asset management',
        'SLA-driven service delivery'
      ],
      techStack: 'ServiceNow, Jira, Zendesk, TeamViewer, RMM Tools',
      color: '#f59e0b'
    },
    {
      icon: FiSmartphone,
      title: 'Mobile App Development',
      subtitle: 'Native & Cross-Platform Apps',
      description: "Create engaging mobile experiences for iOS and Android platforms. Our mobile development teams build high-performance apps that users love with intuitive UI/UX design.",
      features: [
        'Native iOS & Android development',
        'Cross-platform (React Native, Flutter)',
        'UI/UX design & prototyping',
        'App store optimization (ASO)',
        'Push notifications & analytics',
        'Ongoing maintenance & updates'
      ],
      techStack: 'Swift, Kotlin, React Native, Flutter, Firebase',
      color: '#06b6d4'
    }
  ];

  const engagementModels = [
    {
      icon: FiUsers,
      title: 'Dedicated Team',
      description: "Get a fully dedicated team of developers, QA engineers, and project managers working exclusively on your projects. Perfect for long-term partnerships and complex projects requiring deep domain expertise.",
      benefits: [
        'Full control over team composition',
        'Direct communication with team members',
        'Scalable team size as needed',
        'Deep understanding of your business',
        'Integrated with your workflows'
      ],
      bestFor: 'Long-term projects, startups, product development'
    },
    {
      icon: FiClock,
      title: 'Time & Material',
      description: "Flexible engagement model where you pay for actual time and resources used. Ideal for projects with evolving requirements or when you need to scale resources up or down quickly.",
      benefits: [
        'Maximum flexibility',
        'Pay only for work done',
        'Easy to adjust priorities',
        'Transparent billing',
        'Quick project start'
      ],
      bestFor: 'Dynamic projects, MVP development, R&D initiatives'
    },
    {
      icon: FiDollarSign,
      title: 'Fixed Price',
      description: "Well-defined project scope with fixed timeline and budget. Best suited for projects with clear requirements, deliverables, and acceptance criteria defined upfront.",
      benefits: [
        'Predictable budget & timeline',
        'Clear deliverables defined',
        'Minimal management overhead',
        'Risk mitigation',
        'Milestone-based payments'
      ],
      bestFor: 'Well-defined projects, PoC development, migrations'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Requirement Analysis',
      description: "We analyze your business needs, technical requirements, budget constraints, and timeline expectations to create a detailed project roadmap.",
      icon: FiTarget
    },
    {
      step: '02',
      title: 'Team Assembly',
      description: "We handpick the right talent from our 500+ engineers pool matching your technology stack, domain expertise, and cultural fit requirements.",
      icon: FiUsers
    },
    {
      step: '03',
      title: 'Onboarding & Setup',
      description: "Quick onboarding with necessary tools, access, communication channels, and development environment setup within 48-72 hours.",
      icon: FiSettings
    },
    {
      step: '04',
      title: 'Development & Delivery',
      description: "Agile development with sprint planning, daily standups, bi-weekly demos, and continuous delivery ensuring transparency and quality.",
      icon: FiCode
    },
    {
      step: '05',
      title: 'QA & Deployment',
      description: "Rigorous testing including unit, integration, performance, and security testing before production deployment with rollback plans.",
      icon: FiShield
    },
    {
      step: '06',
      title: 'Support & Optimization',
      description: "Ongoing maintenance, performance monitoring, user feedback incorporation, and continuous improvement for long-term success.",
      icon: FiLifeBuoy
    }
  ];

  const caseStudies = [
    {
      title: "FinTech Platform Modernization",
      industry: "Financial Services",
      challenge: "A leading fintech company needed to modernize their legacy trading platform handling $500M+ daily transactions with zero downtime migration.",
      solution: "Assembled a dedicated team of 25 engineers who rebuilt the platform using microservices architecture with real-time processing capabilities.",
      results: [
        { metric: "99.997%", label: "Uptime" },
        { metric: "3x", label: "Faster Processing" },
        { metric: "40%", label: "Cost Reduction" },
        { metric: "12 Months", label: "Delivery Time" }
      ],
      color: "#3b82f6"
    },
    {
      title: "Healthcare SaaS Platform",
      industry: "Healthcare Technology",
      challenge: "HIPAA-compliant telehealth platform needed rapid scaling from 10K to 1M+ users while maintaining security and performance.",
      solution: "Provided cloud architecture expertise, DevOps automation, and 24/7 managed services ensuring seamless scaling and compliance.",
      results: [
        { metric: "1M+", label: "Active Users" },
        { metric: "100%", label: "HIPAA Compliant" },
        { metric: "50%", label: "Faster Releases" },
        { metric: "99.9%", label: "SLA Met" }
      ],
      color: "#10b981"
    },
    {
      title: "E-Commerce Platform Migration",
      industry: "Retail & E-Commerce",
      challenge: "Migrate a monolithic e-commerce platform serving 500K+ daily users to cloud-native architecture before the Black Friday sales event.",
      solution: "Deployed a cross-functional team of 30 engineers who completed the migration in 4 months with comprehensive testing and cutover planning.",
      results: [
        { metric: "$10M+", label: "Revenue Handled" },
        { metric: "0", label: "Downtime" },
        { metric: "60%", label: "Cost Savings" },
        { metric: "4 Months", label: "Migration Time" }
      ],
      color: "#8b5cf6"
    }
  ];

  const advantages = [
    {
      icon: FiDollarSign,
      title: "Cost Efficiency",
      description: "Reduce operational costs by 40-60% compared to in-house teams while maintaining high quality standards."
    },
    {
      icon: FiZap,
      title: "Faster Time to Market",
      description: "Accelerate development with ready-to-deploy skilled teams reducing time-to-market by up to 50%."
    },
    {
      icon: FiUsers,
      title: "Access to Top Talent",
      description: "Tap into a global pool of 500+ pre-vetted engineers across 50+ technology stacks."
    },
    {
      icon: FiTrendingUp,
      title: "Scalable Resources",
      description: "Scale your team up or down within days based on project requirements and business needs."
    },
    {
      icon: FiShield,
      title: "Risk Mitigation",
      description: "Reduce project risks with proven methodologies, certified experts, and comprehensive SLAs."
    },
    {
      icon: FiRefreshCw,
      title: "Focus on Core Business",
      description: "Free up internal resources to focus on strategic initiatives while we handle technology execution."
    }
  ];

  const technologies = [
    { category: "Frontend", skills: ["React", "Angular", "Vue.js", "Next.js", "TypeScript"] },
    { category: "Backend", skills: ["Node.js", "Python", "Java", ".NET Core", "Go", "PHP"] },
    { category: "Mobile", skills: ["React Native", "Flutter", "Swift", "Kotlin", "Ionic"] },
    { category: "Cloud & DevOps", skills: ["AWS", "Azure", "GCP", "Kubernetes", "Docker", "Terraform"] },
    { category: "Database", skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Elasticsearch", "Cassandra"] },
    { category: "AI & Data", skills: ["TensorFlow", "PyTorch", "Spark", "Kafka", "Snowflake", "Power BI"] }
  ];

  const faqs = [
    {
      question: "How do you ensure code quality and security?",
      answer: "We follow industry best practices including code reviews, automated testing (unit, integration, E2E), static code analysis, security scanning (SAST/DAST), and regular security audits. Our teams adhere to OWASP guidelines, implement secure coding practices, and maintain comprehensive documentation. We also provide regular quality reports and conduct third-party security assessments."
    },
    {
      question: "What is your team composition and communication process?",
      answer: "Typical team includes developers (senior/mid/junior), QA engineers, project manager, and technical lead. We assign a dedicated project manager as your single point of contact. Communication happens via Slack/Teams, daily standups, weekly progress reports, bi-weekly demos, and monthly strategic reviews. We work in your time zone with overlapping hours for real-time collaboration."
    },
    {
      question: "How quickly can you assemble and onboard a team?",
      answer: "We can assemble a team within 1-2 weeks for most technology stacks. The onboarding process takes 48-72 hours including environment setup, access provisioning, and familiarization with your codebase and processes. For niche technologies, it might take up to 3-4 weeks to find the perfect talent match."
    },
    {
      question: "What intellectual property protection do you provide?",
      answer: "We sign comprehensive NDAs, assign all IP rights to you, implement strict access controls, use secure development environments, and follow data protection regulations (GDPR, CCPA). All code and deliverables are exclusively yours. We can also work within your security perimeter using VPNs, VDI, or dedicated secure environments."
    },
    {
      question: "Can you integrate with our existing team and tools?",
      answer: "We seamlessly integrate with your existing workflows, tools, and processes. Our teams adapt to your project management tools (Jira, Asana, Trello), version control (GitHub, GitLab, Bitbucket), CI/CD pipelines, and communication platforms. We follow your coding standards, documentation practices, and deployment processes."
    },
    {
      question: "What engagement models do you offer and how flexible are they?",
      answer: "We offer dedicated team, time & material, and fixed price models. You can start with one model and switch as project needs evolve. We provide flexible contracts with options to scale teams up/down, change technology stacks, or adjust engagement terms. Minimum commitment is typically 3 months for dedicated teams."
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
              <FiZap size={14} /> Trusted by 250+ Companies Worldwide
            </div>
            <h1 className={styles.heroTitle}>
              Scale Your Engineering Team with{" "}
              <span className={styles.gradient}>Expert IT Outsourcing</span>
            </h1>
            <p className={styles.heroDesc}>
              Access 500+ pre-vetted software engineers, reduce development costs by up to 60%, 
              and accelerate your time-to-market. We provide dedicated teams that seamlessly 
              integrate with your workflow, culture, and technology stack.
            </p>
            <p className={styles.heroDesc}>
              From startups to Fortune 500 companies, we deliver enterprise-grade software 
              solutions with flexible engagement models tailored to your business needs.
            </p>

            <div className={styles.heroHighlights}>
              <div className={styles.highlight}>
                <FiUsers size={22} />
                <div>
                  <h4>500+ Engineers</h4>
                  <p>Pre-vetted senior talent pool</p>
                </div>
              </div>
              <div className={styles.highlight}>
                <FiClock size={22} />
                <div>
                  <h4>2 Week Setup</h4>
                  <p>Team assembled and onboarded</p>
                </div>
              </div>
              <div className={styles.highlight}>
                <FiDollarSign size={22} />
                <div>
                  <h4>Save Up to 60%</h4>
                  <p>vs in-house development costs</p>
                </div>
              </div>
            </div>

            <div className={styles.heroButtons}>
              <Link to="/contact" className={styles.btnPrimary}>
                Get Free Consultation <FiArrowRight size={18} />
              </Link>
              <Link to="/portfolio" className={styles.btnSecondary}>
                View Case Studies
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

      {/* Trust Bar */}
      <section className={styles.trustBar}>
        <div className={styles.container}>
          <p className={styles.trustLabel}>Our Key Differentiators</p>
          <div className={styles.advantagesGrid}>
            {advantages.map((advantage, idx) => (
              <div key={idx} className={styles.advantageItem} data-animate={`advantage-${idx}`}>
                <div className={styles.advantageIcon}>
                  <advantage.icon size={28} />
                </div>
                <h3>{advantage.title}</h3>
                <p>{advantage.description}</p>
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
              Comprehensive <span className={styles.gradient}>IT Outsourcing Solutions</span>
            </h2>
            <p className={styles.sectionDesc}>
              End-to-end technology services covering the entire software development lifecycle.
              From architecture design to 24/7 production support, we have you covered.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service, idx) => (
              <div key={idx} className={styles.serviceCard} data-animate={`service-${idx}`}>
                <div className={styles.serviceHeader}>
                  <div className={styles.serviceIcon} style={{ background: `${service.color}15`, color: service.color }}>
                    <service.icon size={26} />
                  </div>
                  <span className={styles.serviceNumber}>0{idx + 1}</span>
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceSubtitle}>{service.subtitle}</p>
                <p className={styles.serviceDesc}>{service.description}</p>

                <div className={styles.serviceFeatures}>
                  <h4>Key Capabilities:</h4>
                  <ul>
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx}>
                        <FiCheckCircle size={14} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.serviceTech}>
                  <span className={styles.techLabel}>Tech Stack:</span>
                  <span className={styles.techValue}>{service.techStack}</span>
                </div>

                <Link to="/contact" className={styles.serviceLink}>
                  Explore Service <FiArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className={styles.engagement}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>
              <FiLayers size={14} /> Flexible Engagement
            </span>
            <h2 className={styles.sectionTitle}>
              Choose Your <span className={styles.gradient}>Engagement Model</span>
            </h2>
            <p className={styles.sectionDesc}>
              Flexible collaboration models designed to match your project requirements, budget, and timeline
            </p>
          </div>

          <div className={styles.engagementGrid}>
            {engagementModels.map((model, idx) => (
              <div key={idx} className={styles.engagementCard} data-animate={`engagement-${idx}`}>
                <div className={styles.engagementHeader}>
                  <model.icon size={32} />
                  {idx === 0 && <span className={styles.popularBadge}>Most Popular</span>}
                </div>
                <h3>{model.title}</h3>
                <p className={styles.engagementDesc}>{model.description}</p>
                <div className={styles.engagementBenefits}>
                  <h4>Benefits:</h4>
                  <ul>
                    {model.benefits.map((benefit, bIdx) => (
                      <li key={bIdx}>
                        <FiCheckCircle size={14} /> {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.bestFor}>
                  <FiTarget size={14} />
                  <span><strong>Best for:</strong> {model.bestFor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TestimonialSection/>

      {/* Process Section */}
      <section className={styles.process}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>
              <FiRefreshCw size={14} /> Our Process
            </span>
            <h2 className={styles.sectionTitle}>
              How We <span className={styles.gradient}>Engage & Deliver</span>
            </h2>
            <p className={styles.sectionDesc}>
              A proven 6-step framework refined over 15+ years and 1000+ successful project deliveries
            </p>
          </div>

          <div className={styles.processGrid}>
            {process.map((step, idx) => (
              <div key={idx} className={styles.processItem} data-animate={`process-${idx}`}>
                <div className={styles.processCard}>
                  <div className={styles.processStep}>{step.step}</div>
                  <div className={styles.processIcon}>
                    <step.icon size={26} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                {idx < process.length - 1 && (
                  <div className={styles.processArrow}>
                    <FiArrowRight size={18} />
                  </div>
                )}
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
              Client <span className={styles.gradient}>Success Stories</span>
            </h2>
            <p className={styles.sectionDesc}>
              Real results delivered for clients across industries and geographies
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

      {/* Technology Stack */}
      <section className={styles.techStack}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>
              <FiCpu size={14} /> Technology Expertise
            </span>
            <h2 className={styles.sectionTitle}>
              Our <span className={styles.gradient}>Technology Stack</span>
            </h2>
            <p className={styles.sectionDesc}>
              Deep expertise across 50+ modern technologies and frameworks
            </p>
          </div>

          <div className={styles.techGrid}>
            {technologies.map((tech, idx) => (
              <div key={idx} className={styles.techCard} data-animate={`tech-${idx}`}>
                <h4 className={styles.techCategory}>{tech.category}</h4>
                <div className={styles.techSkills}>
                  {tech.skills.map((skill, sIdx) => (
                    <span key={sIdx} className={styles.techSkill}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
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

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaWrapper}>
            <div className={styles.ctaContent}>
              <div className={styles.ctaBadge}>
                <FiZap size={14} /> Free Consultation — No Obligation
              </div>
              <h2>Ready to Scale Your Engineering Team?</h2>
              <p>
                Get a free consultation with our solutions architect. We will analyze your requirements, 
                suggest the optimal team composition, and provide a detailed proposal with timeline and 
                pricing — typically within 48 hours.
              </p>
              <p>
                Join 250+ companies who have accelerated their development with our expert teams. 
                Whether you need 2 developers or a fully managed team of 50+, we have the talent 
                and processes to deliver.
              </p>

              <div className={styles.ctaFeatures}>
                <div className={styles.ctaFeature}>
                  <FiCheckCircle size={18} />
                  <span>Free 30-minute consultation</span>
                </div>
                <div className={styles.ctaFeature}>
                  <FiCheckCircle size={18} />
                  <span>CVs of pre-vetted candidates within 48 hours</span>
                </div>
                <div className={styles.ctaFeature}>
                  <FiCheckCircle size={18} />
                  <span>Detailed proposal with timeline & pricing</span>
                </div>
                <div className={styles.ctaFeature}>
                  <FiCheckCircle size={18} />
                  <span>Free 1-week trial for dedicated teams</span>
                </div>
              </div>

              <div className={styles.ctaButtons}>
                <Link to="/contact" className={styles.ctaBtnPrimary}>
                  Schedule Free Consultation <FiArrowRight size={18} />
                </Link>
                <Link to="/contact" className={styles.ctaBtnSecondary}>
                  Email Us Your Requirements
                </Link>
              </div>
            </div>

            <div className={styles.ctaSidebar}>
              <div className={styles.ctaCard}>
                <div className={styles.ctaCardHeader}>
                  <FiClock size={20} />
                  <span>What Happens Next?</span>
                </div>
                <ul className={styles.ctaCardList}>
                  <li>
                    <span className={styles.ctaStep}>01</span>
                    <div>
                      <strong>Initial Consultation</strong>
                      <p>Discuss your requirements with our solutions architect</p>
                    </div>
                  </li>
                  <li>
                    <span className={styles.ctaStep}>02</span>
                    <div>
                      <strong>Talent Matching</strong>
                      <p>We shortlist best-fit candidates from our talent pool</p>
                    </div>
                  </li>
                  <li>
                    <span className={styles.ctaStep}>03</span>
                    <div>
                      <strong>Team Proposal</strong>
                      <p>Receive detailed team composition and pricing</p>
                    </div>
                  </li>
                  <li>
                    <span className={styles.ctaStep}>04</span>
                    <div>
                      <strong>Interview & Select</strong>
                      <p>Interview candidates and finalize your team</p>
                    </div>
                  </li>
                  <li>
                    <span className={styles.ctaStep}>05</span>
                    <div>
                      <strong>Onboard & Start</strong>
                      <p>Team starts within 48-72 hours of finalization</p>
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

export default ITOutsourcing;