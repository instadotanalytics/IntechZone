import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CloudSolutions.module.css';
import {
  FiArrowRight, FiCheckCircle, FiClock, FiStar, FiAward,
  FiZap, FiTrendingUp, FiUsers, FiGlobe, FiHeadphones,
  FiTarget, FiEye, FiBarChart2, FiShield, FiRefreshCw,
  FiCloud, FiServer, FiDatabase, FiCpu, FiLock,
  FiCode, FiLayers, FiPackage, FiBox, FiDollarSign,
  FiMail, FiMessageSquare, FiSend, FiUser, FiCalendar,
  FiBriefcase, FiMapPin, FiPhone, FiBookOpen
} from 'react-icons/fi';
import WaveCanvas from '../../../Pages/Home/Wavecanvas';
import AllServicesForm from '../../../Pages/CompanyServices/AllServicesForm';
import TestimonialSection from '../../../Pages/Home/TestimonialSection';

const CloudSolutions = () => {
  const stats = [
    { value: '100+', label: 'AWS Projects', icon: FiCloud },
    { value: '50+', label: 'Cloud Architects', icon: FiUsers },
    { value: '200+', label: 'Certifications', icon: FiAward },
    { value: '15+', label: 'Years Experience', icon: FiStar },
  ];

  const services = [
    { icon: FiTarget, title: 'Cloud Strategy', desc: 'Cloud strategy documents that outline key business drivers and adoption plans.', color: '#3b82f6', image: 'https://i.pinimg.com/1200x/83/d1/68/83d1687dea6cbd6267411fb4dea749a4.jpg' },
    { icon: FiRefreshCw, title: 'Cloud Migration', desc: 'Seamless migration of applications to AWS or Azure with minimal disruption.', color: '#10b981', image: 'https://i.pinimg.com/1200x/71/72/3c/71723c3662ba137f829c2fe62954bc7e.jpg' },
    { icon: FiCode, title: 'Cloud-Native Development', desc: 'Applications refactored with cloud-native technologies for scalability.', color: '#8b5cf6', image: 'https://i.pinimg.com/1200x/f5/73/82/f57382f5dc0be685ed2478974f127b87.jpg' },
    { icon: FiZap, title: 'Innovation Services', desc: 'Unlock innovation with IoT, Blockchain, AR/VR, and next-gen technologies.', color: '#f59e0b', image: 'https://i.pinimg.com/736x/48/5d/83/485d8385c2c595097893052bca7616af.jpg' },
  ];

  const awsStats = [
    { value: '100+', label: 'AWS Projects' },
    { value: '50+', label: 'AWS Certified Architects' },
    { value: '200+', label: 'AWS Certifications' },
  ];

  const azureStats = [
    { value: '15+', label: 'Years in Partner Network' },
    { value: '10+', label: 'Technical Competencies' },
    { value: '100+', label: 'Microsoft Certifications' },
  ];

  const clients = [
    { name: 'Government Financial Org', result: 'Full AWS GovCloud implementation with greater security and cost savings' },
    { name: 'Carbonite', result: 'Migrated legacy systems to Azure over a weekend' },
    { name: 'Hilldrup', result: 'Cloud transformation driving employee innovation' },
  ];

  const faqs = [
    { q: 'What cloud solutions do you provide?', a: 'We offer a wide range of cloud solutions including cloud strategy planning, migration services, cloud-native development, and innovation services using Azure and AWS.' },
    { q: 'What is involved in cloud strategy service?', a: 'We create cloud strategy documents that outline key business drivers, business cases, and strategies to drive cloud solution adoption.' },
    { q: 'What does cloud migration service entail?', a: 'We determine which applications are best candidates for migration and select the appropriate migration strategy to meet your time and budget requirements.' },
    { q: 'What does cloud-native development offer?', a: 'We refactor applications with cloud-native technologies including containerization, serverless, cost optimization, DevOps, and managed services.' },
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
                <FiCloud size={14} /> Cloud Solutions
              </div>
              <h1 className={styles.heroTitle}>
                Cloud is the <span className={styles.gradient}>Infrastructure</span> and Accelerator of Custom Software Development
              </h1>
              <p className={styles.heroDesc}>
                We focus on Amazon Web Services (AWS) and Microsoft Azure and can help you with migrations, 
                application and microservice development, infrastructure, and workload optimization.
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
                  Start Your Cloud Journey <FiArrowRight size={16} />
                </Link>
                <Link to="/portfolio" className={styles.btnSecondary}>
                  View Case Studies
                </Link>
              </div>
            </div>
            <div className={styles.heroRight}>
              <div className={styles.heroImage}>
                <img 
                  src="https://i.pinimg.com/1200x/d1/8a/3d/d18a3d28d112292b30c6182a7efad4da.jpg" 
                  alt="Cloud Solutions" 
                />
                <div className={styles.heroImageOverlay}>
                  <div className={styles.heroImageBadge}>
                    <FiShield size={16} /> AWS & Azure Certified
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
            <span className={styles.sectionBadge}>Cloud Solutions</span>
            <h2 className={styles.sectionTitle}>Our Cloud <span className={styles.gradient}>Services</span></h2>
            <p className={styles.sectionDesc}>Comprehensive cloud solutions using AWS and Azure</p>
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

      {/* AWS Experience Section */}
      <section className={styles.awsSection}>
        <div className={styles.container}>
          <div className={styles.platformGrid}>
            <div className={styles.platformLeft}>
              <div className={styles.platformIcon}><FiCloud size={40} /></div>
              <h2>AWS <span className={styles.gradient}>Experience</span></h2>
              <div className={styles.platformStats}>
                {awsStats.map((stat, idx) => (
                  <div key={idx} className={styles.platformStat}>
                    <span>{stat.value}</span>
                    <p>{stat.label}</p>
                  </div>
                ))}
              </div>
              <p className={styles.platformDesc}>
                Our team of AWS Certified Professionals empowers businesses to unlock the complete potential of Amazon Web Services through secure cloud architecture, cost optimization, seamless migration, infrastructure automation, and 24/7 managed support.
We build reliable, scalable, and future-ready cloud environments that help organizations innovate faster and operate smarter.
<br />With 200+ globally recognized AWS certifications, our cloud specialists bring industry-proven knowledge and best practices to every project we execute. <br />Our highly experienced team consists of 50+ AWS Certified Solution Architects with deep expertise in cloud migration, server management, DevOps automation, storage, networking, and security.
              </p>
              
            </div>
            <div className={styles.platformRight}>
              <div className={styles.platformImage}>
                <img 
                  src="https://i.pinimg.com/736x/44/93/77/449377fa38ce96cb739d3951c0fb7c38.jpg" 
                  alt="AWS Cloud" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Azure Experience Section */}
      <section className={styles.azureSection}>
        <div className={styles.container}>
          <div className={styles.platformGrid}>
            <div className={styles.platformLeft}>
              <div className={styles.platformImage}>
                <img 
                  src="https://i.pinimg.com/736x/0e/54/d4/0e54d45ab9166471b562ad0ce135df4b.jpg" 
                  alt="Microsoft Azure" 
                />
              </div>
            </div>
            <div className={styles.platformRight}>
              <div className={styles.platformIcon}><FiServer size={40} /></div>
              <h2>Microsoft <span className={styles.gradient}>Azure</span> Experience</h2>
              <div className={styles.platformStats}>
                {azureStats.map((stat, idx) => (
                  <div key={idx} className={styles.platformStat}>
                    <span>{stat.value}</span>
                    <p>{stat.label}</p>
                  </div>
                ))}
              </div>
              <p className={styles.platformDesc}>
                With over 15 years of proven cloud consulting excellence, our team of AWS-certified professionals delivers enterprise-grade cloud solutions focused on high security, seamless scalability, optimized performance, and long-term business continuity. From cloud migration and infrastructure deployment to DevOps automation, server management, and cost optimization, we help organizations unlock the full potential of Amazon Web Services through reliable, future-ready, and innovation-driven cloud environments.
              </p>
              <Link to="/contact" className={styles.platformBtn}>
                Learn More <FiArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Client Stories Section */}
      <section className={styles.clients}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Success Stories</span>
            <h2 className={styles.sectionTitle}>Our <span className={styles.gradient}>Clients</span></h2>
            <p className={styles.sectionDesc}>Real success stories from our cloud transformations</p>
          </div>
          <div className={styles.clientsGrid}>
            {clients.map((client, idx) => (
              <div key={idx} className={styles.clientCard}>
                <div className={styles.clientQuote}>"</div>
                <h3>{client.name}</h3>
                <p>{client.result}</p>
                <Link to="/portfolio" className={styles.clientLink}>
                  Read Case Study <FiArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* White Paper Section */}
      <section className={styles.whitepaper}>
        <div className={styles.container}>
          <div className={styles.whitepaperCard}>
            <div className={styles.whitepaperLeft}>
              <FiBookOpen size={48} />
              <h3>White Paper</h3>
              <h2>Thrive Through Disruption with Modern Software Delivery</h2>
              <p>Our white paper shows you how to thrive through disruption by transforming to become a modern software delivery organization.</p>
              <Link to="/contact" className={styles.whitepaperBtn}>
                Download White Paper <FiArrowRight size={16} />
              </Link>
            </div>
            <div className={styles.whitepaperRight}>
              <div className={styles.whitepaperImage}>
                <img 
                  src="https://i.pinimg.com/736x/dd/6a/46/dd6a469bcdf06e50d6b4354bf72d2e1a.jpg" 
                  alt="White Paper" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
<TestimonialSection/>
      {/* FAQ Section */}
      <section className={styles.faq}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>FAQ</span>
            <h2 className={styles.sectionTitle}>Frequently Asked <span className={styles.gradient}>Questions</span></h2>
          </div>
          <div className={styles.faqGrid}>
            {faqs.map((faq, idx) => (
              <div key={idx} className={styles.faqCard}>
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <h2>Ready to Start Your Cloud Journey?</h2>
            <p>Let our cloud experts help you leverage AWS and Azure for your business.</p>
            <div className={styles.ctaButtons}>
              <Link to="/contact" className={styles.ctaBtnPrimary}>
                Get Free Consultation <FiArrowRight size={16} />
              </Link>
              <Link to="/portfolio" className={styles.ctaBtnSecondary}>
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CloudSolutions;