import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './DataAnalytics.module.css';
import {
  FiArrowRight, FiCheckCircle, FiClock, FiStar, FiAward,
  FiZap, FiTrendingUp, FiUsers, FiGlobe, FiHeadphones,
  FiTarget, FiShield, FiRefreshCw, FiServer, FiCpu,
  FiCloud, FiMonitor, FiTool, FiMail, FiPhone,
  FiMapPin, FiDollarSign, FiPieChart, FiCode,
  FiDatabase, FiActivity, FiGrid, FiBarChart2,
  FiMessageSquare, FiLayers, FiSettings, FiLifeBuoy,
  FiFilter, FiSliders, FiShare2, FiDownload,
  FiBookOpen, FiCompass, FiGitBranch, FiBox
} from 'react-icons/fi';
import WaveCanvas from '../../../Pages/Home/Wavecanvas';
import AllServicesForm from '../../../Pages/CompanyServices/AllServicesForm';
import TestimonialSection from '../../../Pages/Home/TestimonialSection';

const DataAnalytics = () => {
  const [activeFaq, setActiveFaq] = useState(null);

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
    { value: '300+', label: 'Analytics Projects', desc: 'Delivered Successfully', icon: FiBarChart2 },
    { value: '85%', label: 'Faster Insights', desc: 'With Our Solutions', icon: FiZap },
    { value: '50+', label: 'Data Experts', desc: 'Data Scientists & Engineers', icon: FiUsers },
    { value: '40%', label: 'Avg Cost Reduction', desc: 'Through Optimization', icon: FiDollarSign }
  ];

  const services = [
    {
      icon: FiBarChart2,
      title: 'Business Intelligence & Reporting',
      subtitle: 'Actionable Dashboards & Insights',
      description: 'Transform raw data into compelling visual stories that drive business decisions. Our BI solutions provide real-time dashboards, automated reporting, and self-service analytics for every stakeholder.',
      features: [
        'Interactive dashboard development (Power BI, Tableau, Looker)',
        'Automated scheduled reporting',
        'KPI framework design and implementation',
        'Self-service analytics portal setup',
        'Executive and operational dashboards',
        'Mobile-ready analytics'
      ],
      tools: 'Power BI, Tableau, Looker, Metabase, Apache Superset',
      color: '#3b82f6'
    },
    {
      icon: FiDatabase,
      title: 'Data Engineering & Integration',
      subtitle: 'Robust Data Pipelines & Warehousing',
      description: 'Build scalable data infrastructure that ingests, transforms, and stores data from any source. Our data engineering solutions ensure clean, reliable, and accessible data for your analytics needs.',
      features: [
        'Data pipeline development (ETL/ELT)',
        'Data warehouse & lake architecture',
        'Real-time streaming data processing',
        'Data quality & governance frameworks',
        'API integration & data connectors',
        'Master data management (MDM)'
      ],
      tools: 'Snowflake, Databricks, Apache Spark, Airflow, dbt, Fivetran',
      color: '#10b981'
    },
    {
      icon: FiCpu,
      title: 'AI & Machine Learning Solutions',
      subtitle: 'Intelligent Predictive Analytics',
      description: 'Leverage advanced AI and ML models to predict trends, automate decisions, and uncover hidden patterns. From demand forecasting to customer churn prediction, we build models that deliver ROI.',
      features: [
        'Predictive analytics & forecasting',
        'Customer segmentation & profiling',
        'Recommendation engines',
        'Natural language processing (NLP)',
        'Computer vision solutions',
        'MLOps & model deployment'
      ],
      tools: 'TensorFlow, PyTorch, Scikit-learn, MLflow, Kubeflow',
      color: '#8b5cf6'
    },
    {
      icon: FiCloud,
      title: 'Big Data & Cloud Analytics',
      subtitle: 'Process Data at Any Scale',
      description: 'Handle petabytes of data with cloud-native big data solutions. We design and implement scalable architectures that process massive datasets efficiently and cost-effectively.',
      features: [
        'Big data architecture design',
        'Cloud data platform migration',
        'Serverless data processing',
        'Real-time analytics (Kafka, Kinesis)',
        'Data lakehouse implementation',
        'Cost optimization & FinOps'
      ],
      tools: 'AWS, Azure, GCP, Databricks, Snowflake, Kafka',
      color: '#f59e0b'
    },
    {
      icon: FiTarget,
      title: 'Marketing & Customer Analytics',
      subtitle: 'Understand Your Customers Better',
      description: 'Unlock deep customer insights with advanced marketing analytics. Track customer journeys, measure campaign ROI, optimize acquisition channels, and reduce churn with data-driven strategies.',
      features: [
        'Customer 360 & CDP implementation',
        'Marketing attribution modeling',
        'Customer lifetime value (CLV) analysis',
        'Churn prediction & prevention',
        'A/B testing & experimentation',
        'Sentiment analysis & voice of customer'
      ],
      tools: 'Google Analytics 4, Mixpanel, Amplitude, Segment, Braze',
      color: '#ef4444'
    },
    {
      icon: FiShield,
      title: 'Data Governance & Compliance',
      subtitle: 'Secure & Compliant Data Management',
      description: 'Establish robust data governance frameworks ensuring data quality, security, privacy, and regulatory compliance across your entire data ecosystem.',
      features: [
        'Data governance framework design',
        'Data catalog & lineage implementation',
        'GDPR/CCPA compliance automation',
        'Data quality monitoring',
        'Access control & data masking',
        'Data retention & archival policies'
      ],
      tools: 'Collibra, Alation, Atlan, Monte Carlo, Great Expectations',
      color: '#06b6d4'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery & Assessment',
      description: 'We assess your current data landscape, identify data sources, understand business objectives, and define key metrics and KPIs for success.',
      icon: FiCompass
    },
    {
      step: '02',
      title: 'Data Strategy & Architecture',
      description: 'Design the optimal data architecture, choose the right tools and platforms, and create a comprehensive data strategy aligned with business goals.',
      icon: FiGrid
    },
    {
      step: '03',
      title: 'Data Integration & Engineering',
      description: 'Build robust data pipelines, integrate data sources, implement data quality checks, and create a reliable data foundation for analytics.',
      icon: FiGitBranch
    },
    {
      step: '04',
      title: 'Analytics & Model Development',
      description: 'Develop dashboards, reports, and AI/ML models that deliver actionable insights. Iterate based on stakeholder feedback and validation.',
      icon: FiActivity
    },
    {
      step: '05',
      title: 'Deployment & Enablement',
      description: 'Deploy solutions to production, set up automated monitoring and alerts, enable self-service access, and ensure scalability.',
      icon: FiSliders
    },
    {
      step: '06',
      title: 'Optimization & Support',
      description: 'Continuous monitoring, performance optimization, model retraining, user training, and ongoing enhancements for sustained value delivery.',
      icon: FiRefreshCw
    }
  ];

  const caseStudies = [
    {
      title: 'E-Commerce Revenue Optimization',
      industry: 'Retail & E-Commerce',
      challenge: 'A leading e-commerce company needed to optimize pricing strategy, reduce cart abandonment, and personalize product recommendations across 5M+ customers.',
      solution: 'Built a real-time recommendation engine, implemented dynamic pricing models, and created customer 360 dashboards with churn prediction.',
      results: [
        { metric: '32%', label: 'Revenue Increase' },
        { metric: '45%', label: 'Cart Recovery' },
        { metric: '3x', label: 'Customer Engagement' },
        { metric: '28%', label: 'Churn Reduction' }
      ],
      color: '#3b82f6'
    },
    {
      title: 'Healthcare Predictive Analytics',
      industry: 'Healthcare',
      challenge: 'A hospital network needed to predict patient readmissions, optimize resource allocation, and improve patient outcomes across 20+ facilities.',
      solution: 'Developed ML models for readmission prediction, created real-time operational dashboards, and implemented patient risk stratification.',
      results: [
        { metric: '35%', label: 'Fewer Readmissions' },
        { metric: '20%', label: 'Cost Reduction' },
        { metric: '40%', label: 'Better Utilization' },
        { metric: '92%', label: 'Prediction Accuracy' }
      ],
      color: '#10b981'
    },
    {
      title: 'Financial Fraud Detection',
      industry: 'Financial Services',
      challenge: 'A fintech company processing $10B+ annually needed real-time fraud detection to reduce false positives while catching more sophisticated fraud attempts.',
      solution: 'Implemented real-time anomaly detection with graph analytics, behavioral analysis, and ensemble ML models for accurate fraud scoring.',
      results: [
        { metric: '85%', label: 'More Fraud Detected' },
        { metric: '60%', label: 'Fewer False Positives' },
        { metric: '$50M+', label: 'Fraud Prevented' },
        { metric: '<50ms', label: 'Detection Time' }
      ],
      color: '#8b5cf6'
    }
  ];

  const technologies = [
    { category: 'BI & Visualization', tools: ['Power BI', 'Tableau', 'Looker', 'Metabase', 'Apache Superset', 'Google Data Studio'] },
    { category: 'Data Warehousing', tools: ['Snowflake', 'BigQuery', 'Redshift', 'Databricks', 'Azure Synapse', 'ClickHouse'] },
    { category: 'Data Integration', tools: ['Apache Airflow', 'dbt', 'Fivetran', 'Stitch', 'Matillion', 'Informatica'] },
    { category: 'Big Data Processing', tools: ['Apache Spark', 'Apache Kafka', 'Apache Flink', 'Hadoop', 'Presto', 'Trino'] },
    { category: 'AI & Machine Learning', tools: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'XGBoost', 'MLflow', 'Kubeflow'] },
    { category: 'Data Governance', tools: ['Collibra', 'Alation', 'Atlan', 'Monte Carlo', 'Great Expectations', 'DataHub'] }
  ];

  const benefits = [
    {
      icon: FiZap,
      title: 'Faster Decision Making',
      description: 'Reduce time-to-insight from weeks to minutes with real-time dashboards and automated reporting.'
    },
    {
      icon: FiTrendingUp,
      title: 'Increased Revenue',
      description: 'Identify new revenue opportunities, optimize pricing, and improve customer retention with predictive analytics.'
    },
    {
      icon: FiDollarSign,
      title: 'Cost Optimization',
      description: 'Reduce operational costs by 20-40% through data-driven process optimization and resource allocation.'
    },
    {
      icon: FiTarget,
      title: 'Competitive Advantage',
      description: 'Stay ahead of competitors by leveraging AI-powered insights for strategic decision making.'
    },
    {
      icon: FiShield,
      title: 'Risk Mitigation',
      description: 'Identify and mitigate business risks proactively with predictive risk analytics and early warning systems.'
    },
    {
      icon: FiUsers,
      title: 'Data-Driven Culture',
      description: 'Empower every team member with self-service analytics and foster a culture of data-driven decision making.'
    }
  ];

  const faqs = [
    {
      question: 'What data analytics services do you offer?',
      answer: 'We provide end-to-end data analytics services including business intelligence and dashboard development, data engineering and integration, AI and machine learning solutions, big data and cloud analytics, marketing and customer analytics, and data governance and compliance. Our services cover the entire data lifecycle from strategy and architecture to implementation and managed operations.'
    },
    {
      question: 'How long does it take to implement a data analytics solution?',
      answer: 'Timelines vary based on complexity. A basic dashboard and reporting setup can be delivered in 2-4 weeks. A complete data warehouse with ETL pipelines typically takes 8-12 weeks. Advanced AI/ML solutions may take 12-20 weeks. We follow agile methodology with bi-weekly deliverables so you start seeing value from week 2 onwards.'
    },
    {
      question: 'Do you work with our existing data infrastructure and tools?',
      answer: 'Yes, we work with all major data platforms and tools. Our team has expertise across AWS, Azure, GCP, Snowflake, Databricks, Power BI, Tableau, and 50+ other data tools. We optimize your existing investments while recommending enhancements where needed. We can also help migrate from legacy systems to modern data platforms.'
    },
    {
      question: 'How do you ensure data security and compliance?',
      answer: 'Data security is fundamental to our approach. We implement encryption at rest and in transit, role-based access controls, data masking for sensitive information, audit logging, and compliance with GDPR, CCPA, HIPAA, and SOC 2 requirements. Our data governance frameworks ensure proper data handling throughout the analytics lifecycle.'
    },
    {
      question: 'Can you help us become a data-driven organization?',
      answer: 'Beyond technology implementation, we provide change management support, training programs, and center of excellence setup to build a data-driven culture. We train your teams on tools and best practices, establish data literacy programs, and create self-service analytics capabilities so everyone can make data-informed decisions.'
    },
    {
      question: 'What is your pricing model for analytics services?',
      answer: 'We offer flexible pricing models including fixed-price for defined-scope projects, time and materials for ongoing development, and managed services for long-term support. We also offer analytics-as-a-service with monthly subscriptions for continuous insights delivery. Each engagement is custom-priced based on scope and complexity.'
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
              <FiBarChart2 size={14} /> Data Analytics & AI Solutions
            </div>
            <h1 className={styles.heroTitle}>
              Transform Data into{" "}
              <span className={styles.gradient}>Actionable Intelligence</span>
            </h1>
            <p className={styles.heroDesc}>
              Unlock the full potential of your data with advanced analytics and AI solutions. 
              From interactive dashboards to machine learning models, we help you make smarter, 
              faster, data-driven decisions that drive business growth.
            </p>
            <p className={styles.heroDesc}>
              Our team of 50+ data scientists, engineers, and analysts has delivered 300+ analytics 
              projects across industries, helping organizations achieve measurable ROI from their data.
            </p>

            <div className={styles.heroHighlights}>
              <div className={styles.highlight}>
                <FiDatabase size={22} />
                <div>
                  <h4>Modern Data Stack</h4>
                  <p>Snowflake, Databricks, dbt, Airflow</p>
                </div>
              </div>
              <div className={styles.highlight}>
                <FiCpu size={22} />
                <div>
                  <h4>AI & Machine Learning</h4>
                  <p>Predictive models that drive ROI</p>
                </div>
              </div>
              <div className={styles.highlight}>
                <FiBarChart2 size={22} />
                <div>
                  <h4>Real-Time Insights</h4>
                  <p>Live dashboards & automated alerts</p>
                </div>
              </div>
            </div>

            <div className={styles.heroButtons}>
              <Link to="/contact" className={styles.btnPrimary}>
                Get Free Data Assessment <FiArrowRight size={18} />
              </Link>
              <Link to="/portfolio" className={styles.btnSecondary}>
                View Analytics Case Studies
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

      {/* Benefits Section */}
      <section className={styles.benefits}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>
              <FiTrendingUp size={14} /> Why Invest in Analytics
            </span>
            <h2 className={styles.sectionTitle}>
              The <span className={styles.gradient}>Business Value</span> of Data Analytics
            </h2>
            <p className={styles.sectionDesc}>
              Organizations that leverage data analytics outperform competitors by 85% in sales 
              growth and 25% in gross margin
            </p>
          </div>

          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, idx) => (
              <div key={idx} className={styles.benefitCard} data-animate={`benefit-${idx}`}>
                <div className={styles.benefitIcon}>
                  <benefit.icon size={28} />
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
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
              End-to-End <span className={styles.gradient}>Data Analytics Services</span>
            </h2>
            <p className={styles.sectionDesc}>
              Comprehensive analytics solutions from data strategy to AI implementation. 
              We handle the complexity so you can focus on insights.
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
                  <h4>What We Deliver:</h4>
                  <ul>
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx}>
                        <FiCheckCircle size={14} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.serviceTools}>
                  <span className={styles.toolsLabel}>Tools & Platforms:</span>
                  <span className={styles.toolsValue}>{service.tools}</span>
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
              <FiRefreshCw size={14} /> Our Process
            </span>
            <h2 className={styles.sectionTitle}>
              Our <span className={styles.gradient}>Analytics Delivery Framework</span>
            </h2>
            <p className={styles.sectionDesc}>
              A proven methodology refined through 300+ successful analytics implementations
            </p>
          </div>

          <div className={styles.processGrid}>
            {process.map((phase, idx) => (
              <div key={idx} className={styles.processItem} data-animate={`process-${idx}`}>
                <div className={styles.processCard}>
                  <div className={styles.processStep}>{phase.step}</div>
                  <div className={styles.processIcon}>
                    <phase.icon size={26} />
                  </div>
                  <h3>{phase.title}</h3>
                  <p>{phase.description}</p>
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

      {/* Technologies Section */}
      <section className={styles.technologies}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>
              <FiBox size={14} /> Technology Stack
            </span>
            <h2 className={styles.sectionTitle}>
              Modern <span className={styles.gradient}>Data Stack</span> Expertise
            </h2>
            <p className={styles.sectionDesc}>
              Deep expertise across the entire modern data stack — from ingestion to AI
            </p>
          </div>

          <div className={styles.techGrid}>
            {technologies.map((tech, idx) => (
              <div key={idx} className={styles.techCard} data-animate={`tech-${idx}`}>
                <h4 className={styles.techCategory}>{tech.category}</h4>
                <div className={styles.techTools}>
                  {tech.tools.map((tool, tIdx) => (
                    <span key={tIdx} className={styles.techTool}>{tool}</span>
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
              <FiStar size={14} /> Case Studies
            </span>
            <h2 className={styles.sectionTitle}>
              Analytics <span className={styles.gradient}>Success Stories</span>
            </h2>
            <p className={styles.sectionDesc}>
              Real results delivered through data analytics and AI for leading organizations
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
              View All Analytics Case Studies <FiArrowRight size={16} />
            </Link>
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
                <FiZap size={14} /> Free Data Maturity Assessment
              </div>
              <h2>Ready to Become a Data-Driven Organization?</h2>
              <p>
                Schedule a free data maturity assessment with our senior data strategists. 
                We will evaluate your current data capabilities, identify gaps and opportunities, 
                and provide a customized analytics roadmap aligned with your business goals.
              </p>
              <p>
                Organizations using data-driven insights are 23x more likely to acquire customers 
                and 19x more likely to be profitable. Start your data transformation today.
              </p>

              <div className={styles.ctaFeatures}>
                <div className={styles.ctaFeature}>
                  <FiCheckCircle size={18} />
                  <span>Free data maturity assessment</span>
                </div>
                <div className={styles.ctaFeature}>
                  <FiCheckCircle size={18} />
                  <span>Custom analytics roadmap with prioritized initiatives</span>
                </div>
                <div className={styles.ctaFeature}>
                  <FiCheckCircle size={18} />
                  <span>Technology stack recommendation</span>
                </div>
                <div className={styles.ctaFeature}>
                  <FiCheckCircle size={18} />
                  <span>ROI projection for analytics investment</span>
                </div>
              </div>

              <div className={styles.ctaButtons}>
                <Link to="/contact" className={styles.ctaBtnPrimary}>
                  Get Your Free Assessment <FiArrowRight size={18} />
                </Link>
                <Link to="/contact" className={styles.ctaBtnSecondary}>
                  Download Analytics Guide
                </Link>
              </div>
            </div>

            <div className={styles.ctaSidebar}>
              <div className={styles.ctaCard}>
                <div className={styles.ctaCardHeader}>
                  <FiBarChart2 size={20} />
                  <span>The Impact of Analytics</span>
                </div>
                <ul className={styles.ctaCardList}>
                  <li>
                    <div className={styles.ctaStatItem}>
                      <span className={styles.ctaStatNumber}>23x</span>
                      <p>More likely to acquire customers with data-driven insights</p>
                    </div>
                  </li>
                  <li>
                    <div className={styles.ctaStatItem}>
                      <span className={styles.ctaStatNumber}>19x</span>
                      <p>More likely to be profitable as a data-driven organization</p>
                    </div>
                  </li>
                  <li>
                    <div className={styles.ctaStatItem}>
                      <span className={styles.ctaStatNumber}>85%</span>
                      <p>Of executives say data will significantly change how they do business</p>
                    </div>
                  </li>
                  <li>
                    <div className={styles.ctaStatItem}>
                      <span className={styles.ctaStatNumber}>$2.9T</span>
                      <p>Global business value of AI and analytics by 2025</p>
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

export default DataAnalytics;