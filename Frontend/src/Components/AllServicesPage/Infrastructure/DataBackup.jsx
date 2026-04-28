import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './DataBackup.module.css';
import {
  FiArrowRight, FiCheckCircle, FiClock, FiStar, FiAward,
  FiZap, FiTrendingUp, FiUsers, FiGlobe, FiHeadphones,
  FiTarget, FiEye, FiBarChart2, FiShield, FiRefreshCw,
  FiHardDrive, FiServer, FiDatabase, FiLock, FiCloud,
  FiDownload, FiUpload, FiMail, FiMessageSquare, FiSend,
  FiUser, FiCalendar, FiBriefcase, FiMapPin, FiPhone,
  FiWifi, FiTool, FiDollarSign
} from 'react-icons/fi';
import AllServicesForm from '../../../Pages/CompanyServices/AllServicesForm';
import WaveCanvas from '../../../Pages/Home/Wavecanvas';
import TestimonialSection from '../../../Pages/Home/TestimonialSection';

const DataBackup = () => {
  const stats = [
    { value: '1000+', label: 'Backups Managed', icon: FiHardDrive },
    { value: '99.99%', label: 'Success Rate', icon: FiCheckCircle },
    { value: '24/7', label: 'Monitoring', icon: FiClock },
    { value: '500+', label: 'Business Protected', icon: FiShield },
  ];

  const services = [
    { icon: FiCloud, title: 'Cloud Backup', desc: 'Secure off-site backup to AWS/Azure cloud.', color: '#3b82f6', image: 'https://i.pinimg.com/736x/b3/87/5c/b3875c4d6ea90dbd6811e68c855c2d83.jpg' },
    { icon: FiHardDrive, title: 'Local Backup', desc: 'On-premise backup to local servers/NAS.', color: '#10b981', image: 'https://i.pinimg.com/1200x/62/b1/ae/62b1ae403d84a97598d8c8571e5f9cc1.jpg' },
    { icon: FiServer, title: 'Server Backup', desc: 'Complete server and database backup.', color: '#8b5cf6', image: 'https://i.pinimg.com/1200x/9d/62/cc/9d62cc5919fb654d82a3b69e3c2443bb.jpg' },
    { icon: FiDatabase, title: 'Database Backup', desc: 'Automated SQL/NoSQL backups.', color: '#f59e0b', image: 'https://i.pinimg.com/736x/82/8e/b8/828eb88ba77f7a9180ef760350fe105a.jpg' },
    { icon: FiRefreshCw, title: 'Disaster Recovery', desc: 'Comprehensive DR planning and execution.', color: '#ef4444', image: 'https://i.pinimg.com/1200x/61/38/67/613867fdbad4eb577f21829a7d208efa.jpg' },
    { icon: FiLock, title: 'Encrypted Backup', desc: 'AES-256 encryption for data security.', color: '#06b6d4', image: 'https://i.pinimg.com/736x/cb/c6/4f/cbc64f79fa38c93d1bfe4c8fb32b67e7.jpg' },
    { icon: FiDownload, title: 'Data Restoration', desc: 'Quick recovery of lost data.', color: '#ec4899', image: 'https://i.pinimg.com/736x/1b/1c/d1/1b1cd16d1eebbea2adc6a375e7c120f6.jpg' },
    { icon: FiTrendingUp, title: 'Continuous Backup', desc: 'Real-time data backup solutions.', color: '#14b8a6', image: 'https://i.pinimg.com/1200x/89/ee/5b/89ee5b612d90eb218918261f4dc9404e.jpg' },
  ];

  const features = [
    { icon: FiShield, title: 'AES-256 Encryption', desc: 'Bank-grade security' },
    { icon: FiZap, title: 'Automated Backups', desc: 'Schedule-based automation' },
    { icon: FiClock, title: 'Rapid Recovery', desc: 'Quick data restoration' },
    { icon: FiTrendingUp, title: 'Scalable', desc: 'Grows with your data' },
  ];

  const process = [
    { step: '01', title: 'Assessment', desc: 'Analyze data needs', icon: FiTarget },
    { step: '02', title: 'Planning', desc: 'Create backup strategy', icon: FiEye },
    { step: '03', title: 'Implementation', desc: 'Deploy backup solution', icon: FiTool },
    { step: '04', title: 'Encryption', desc: 'Secure data in transit', icon: FiLock },
    { step: '05', title: 'Monitoring', desc: '24/7 backup health', icon: FiHeadphones },
    { step: '06', title: 'Recovery', desc: 'Test restoration process', icon: FiRefreshCw },
  ];

  const plans = [
    { name: 'Basic', price: '₹4,999', storage: '100 GB', retention: '30 days', features: ['Cloud Backup', 'AES-256 Encryption', 'Email Support'] },
    { name: 'Professional', price: '₹9,999', storage: '500 GB', retention: '90 days', features: ['Cloud + Local Backup', '24/7 Support', 'Disaster Recovery'] },
    { name: 'Enterprise', price: 'Custom', storage: 'Unlimited', retention: '365 days', features: ['All Features', 'Dedicated Account Manager', 'SLA Guarantee'] },
  ];

  const compliance = [
    'GDPR Compliant', 'ISO 27001 Certified', 'HIPAA Ready', 'SOC 2 Type II'
  ];

  return (
    <div className={styles.page}>

      {/* Hero Section */}
      <section className={styles.hero}>
        <WaveCanvas/>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroLeft}>
              <div className={styles.heroBadge}>
                <FiHardDrive size={14} /> Data Backup & Recovery
              </div>
              <h1 className={styles.heroTitle}>
                Secure Your <span className={styles.gradient}>Business Data</span> with Enterprise Backup Solutions
              </h1>
              <p className={styles.heroDesc}>
                Protect your critical business data with automated, encrypted, and reliable backup solutions. 
                Quick recovery when you need it most.
              </p>
              <div className={styles.heroStats}>
                {stats.map((stat, idx) => (
                  <div key={idx} className={styles.heroStat}>
                    <stat.icon size={24} />
                    <div>
                      <span>{stat.value}</span>
                      <p>{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.heroButtons}>
                <Link to="/contact" className={styles.btnPrimary}>
                  Get Free Consultation <FiArrowRight size={16} />
                </Link>
                <Link to="/portfolio" className={styles.btnSecondary}>
                  View Case Studies
                </Link>
              </div>
            </div>
            <div className={styles.heroRight}>
              <div className={styles.heroImage}>
                <img 
                  src="https://i.pinimg.com/1200x/3f/bd/39/3fbd39179ec2be6cd25a41cfdfe94b9a.jpg" 
                  alt="Data Backup" 
                />
                <div className={styles.heroImageOverlay}>
                  <div className={styles.heroImageBadge}>
                    <FiShield size={16} /> 99.99% Backup Success Rate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

<AllServicesForm/>
      {/* Services Section */}
      <section className={styles.services}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Backup Solutions</span>
            <h2 className={styles.sectionTitle}>Data Backup <span className={styles.gradient}>Services</span></h2>
            <p className={styles.sectionDesc}>Comprehensive backup solutions for all your data protection needs</p>
          </div>
          <div className={styles.servicesGrid}>
            {services.map((service, idx) => (
              <div key={idx} className={styles.serviceCard}>
                <div className={styles.serviceImage}>
                  <img src={service.image} alt={service.title} />
                  <div className={styles.serviceOverlay}>
                    <service.icon size={32} />
                  </div>
                </div>
                <div className={styles.serviceContent}>
                  <div className={styles.serviceIcon} style={{ background: `${service.color}10`, color: service.color }}>
                    <service.icon size={22} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                 
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Key Features</span>
            <h2 className={styles.sectionTitle}>Why Choose <span className={styles.gradient}>Our Backup</span></h2>
          </div>
          <div className={styles.featuresGrid}>
            {features.map((feature, idx) => (
              <div key={idx} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <feature.icon size={28} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.process}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>How It Works</span>
            <h2 className={styles.sectionTitle}>Backup <span className={styles.gradient}>Process</span></h2>
          </div>
          <div className={styles.processGrid}>
            {process.map((step, idx) => (
              <div key={idx} className={styles.processCard}>
                <div className={styles.processNumber}>{step.step}</div>
                <div className={styles.processIcon}>
                  <step.icon size={28} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

   

      {/* Compliance Section */}
      <section className={styles.compliance}>
        <div className={styles.container}>
          <div className={styles.complianceGrid}>
            <div className={styles.complianceLeft}>
              <span className={styles.sectionBadge}>Compliance Ready</span>
              <h2>Enterprise-Grade <span className={styles.gradient}>Security & Compliance</span></h2>
              <p>Our backup solutions meet the highest industry standards for data protection and privacy.</p>
              <div className={styles.complianceList}>
                {compliance.map((item, idx) => (
                  <div key={idx} className={styles.complianceItem}>
                    <FiCheckCircle size={20} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className={styles.complianceBtn}>
                Learn More <FiArrowRight size={16} />
              </Link>
            </div>
            <div className={styles.complianceRight}>
              <div className={styles.complianceImage}>
                <img 
                  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&h=400&fit=crop" 
                  alt="Compliance" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-2-1 Backup Rule Section */}
      <section className={styles.rule}>
        <div className={styles.container}>
          <div className={styles.ruleCard}>
            <h2>Follow the <span className={styles.gradient}>3-2-1 Backup Rule</span></h2>
            <p>Industry best practice for optimal data protection</p>
            <div className={styles.ruleGrid}>
              <div className={styles.ruleItem}>
                <div className={styles.ruleNumber}>3</div>
                <h3>Copies of Data</h3>
                <p>Keep at least three copies of your important data</p>
              </div>
              <div className={styles.ruleItem}>
                <div className={styles.ruleNumber}>2</div>
                <h3>Different Media</h3>
                <p>Store on two different types of storage media</p>
              </div>
              <div className={styles.ruleItem}>
                <div className={styles.ruleNumber}>1</div>
                <h3>Off-Site Copy</h3>
                <p>Keep one copy off-site for disaster recovery</p>
              </div>
            </div>
          </div>
        </div>
      </section>
<TestimonialSection/>
      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <h2>Don't Risk Losing Your Critical Data</h2>
            <p>Get enterprise-grade backup protection for your business today.</p>
            <div className={styles.ctaButtons}>
              <Link to="/contact" className={styles.ctaBtnPrimary}>
                Get Free Quote <FiArrowRight size={16} />
              </Link>
              <Link to="/contact" className={styles.ctaBtnSecondary}>
                Schedule Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DataBackup;