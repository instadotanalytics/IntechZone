import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AMCServices.module.css';
import {
  FiArrowRight, FiCheckCircle, FiClock, FiStar, FiAward,
  FiZap, FiTrendingUp, FiUsers, FiGlobe, FiHeadphones,
  FiTarget, FiEye, FiBarChart2, FiShield, FiRefreshCw,
  FiTool, FiServer, FiDatabase, FiLock, FiCloud,
  FiHardDrive, FiPrinter, FiMonitor, FiCpu,
  FiMail, FiMessageSquare, FiSend, FiUser, FiCalendar,
  FiBriefcase, FiMapPin, FiPhone, FiWifi,
  FiDollarSign, FiFileText
} from 'react-icons/fi';
import WaveCanvas from '../../../Pages/Home/Wavecanvas';

const AMCServices = () => {
  const stats = [
    { value: '500+', label: 'AMC Contracts', icon: FiFileText },
    { value: '98%', label: 'Renewal Rate', icon: FiStar },
    { value: '2hr', label: 'Response Time', icon: FiClock },
    { value: '24/7', label: 'Support Available', icon: FiHeadphones },
  ];

  const services = [
    { icon: FiMonitor, title: 'Desktop AMC', desc: 'Annual maintenance for desktop computers.', color: '#3b82f6', image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=250&fit=crop' },
    { icon: FiCpu, title: 'Laptop AMC', desc: 'Comprehensive laptop maintenance plans.', color: '#10b981', image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=250&fit=crop' },
    { icon: FiServer, title: 'Server AMC', desc: 'Server hardware and software maintenance.', color: '#8b5cf6', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop' },
    { icon: FiPrinter, title: 'Printer AMC', desc: 'Printer maintenance and supplies.', color: '#f59e0b', image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=250&fit=crop' },
    { icon: FiWifi, title: 'Network AMC', desc: 'Network infrastructure maintenance.', color: '#ef4444', image: 'https://i.pinimg.com/1200x/d5/cf/41/d5cf414c0838e9c2fb0696cc248058e2.jpg' },
    { icon: FiCloud, title: 'Cloud AMC', desc: 'Cloud infrastructure support.', color: '#06b6d4', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop' },
    { icon: FiHardDrive, title: 'Storage AMC', desc: 'Storage device maintenance.', color: '#ec4899', image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a164?w=400&h=250&fit=crop' },
    { icon: FiTool, title: 'All-in-One AMC', desc: 'Complete IT infrastructure coverage.', color: '#14b8a6', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop' },
  ];

  const features = [
    { icon: FiZap, title: 'Quick Response', desc: '2-hour response time SLA' },
    { icon: FiShield, title: 'Certified Engineers', desc: 'Expert technicians' },
    { icon: FiTrendingUp, title: 'Preventive Maintenance', desc: 'Regular health checks' },
    { icon: FiClock, title: 'Annual Savings', desc: 'Save up to 30% on repairs' },
  ];

  const plans = [
    { 
      name: 'Basic AMC', 
      price: '₹9,999', 
      priceYear: '₹11,999/year',
      devices: 'Up to 10 Devices',
      features: [
        'On-site support (8x5)',
        'Software updates',
        'Antivirus management',
        'Email support',
        'Monthly health report'
      ]
    },
    { 
      name: 'Standard AMC', 
      price: '₹19,999', 
      priceYear: '₹23,999/year',
      devices: 'Up to 25 Devices',
      featured: true,
      features: [
        'On-site support (24x7)',
        'Priority response (2hr)',
        'Hardware replacement',
        'Network monitoring',
        'Free diagnostic',
        'Quarterly preventive maintenance'
      ]
    },
    { 
      name: 'Premium AMC', 
      price: '₹39,999', 
      priceYear: '₹47,999/year',
      devices: 'Unlimited Devices',
      features: [
        '24/7 dedicated support',
        '1-hour response time',
        'Unlimited hardware replacement',
        'Cloud backup included',
        'Dedicated account manager',
        'Monthly detailed analytics'
      ]
    },
  ];

  const inclusion = [
    'Unlimited on-site visits', 'Free hardware installation', 'Software updates & patches',
    'Virus removal & protection', 'Data backup support', 'Network troubleshooting',
    'Annual system audit', 'Priority support', 'Discounted spare parts'
  ];

  const process = [
    { step: '01', title: 'Consultation', desc: 'Understand your IT needs', icon: FiTarget },
    { step: '02', title: 'Assessment', desc: 'Evaluate your infrastructure', icon: FiEye },
    { step: '03', title: 'Custom Plan', desc: 'Tailored AMC proposal', icon: FiFileText },
    { step: '04', title: 'Sign Agreement', desc: 'Transparent SLA terms', icon: FiCheckCircle },
    { step: '05', title: 'Onboarding', desc: 'Seamless transition', icon: FiRefreshCw },
    { step: '06', title: 'Support', desc: 'Ongoing maintenance', icon: FiHeadphones },
  ];

  const testimonials = [
    { name: 'Rahul Sharma', company: 'Tech Solutions', text: 'Excellent AMC service! Their team is always responsive and resolves issues quickly.', rating: 5 },
    { name: 'Priya Patel', company: 'FinServe Ltd', text: 'Cost-effective and reliable. Saved us 30% on IT maintenance costs.', rating: 5 },
    { name: 'Amit Kumar', company: 'EduTech Group', text: '24/7 support has been a game-changer for our business.', rating: 5 },
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
                <FiTool size={14} /> AMC Services
              </div>
              <h1 className={styles.heroTitle}>
                Annual Maintenance <span className={styles.gradient}>Contract</span> for Your IT Infrastructure
              </h1>
              <p className={styles.heroDesc}>
                Protect your business with comprehensive AMC plans. Get reliable support, priority service, and cost savings.
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
                  Get AMC Quote <FiArrowRight size={16} />
                </Link>
                <Link to="/portfolio" className={styles.btnSecondary}>
                  View Case Studies
                </Link>
              </div>
            </div>
            <div className={styles.heroRight}>
              <div className={styles.heroImage}>
                <img 
                  src="https://i.pinimg.com/736x/36/6a/0c/366a0ca3fff8486a88440cf517513674.jpg" 
                  alt="AMC Services" 
                />
                <div className={styles.heroImageOverlay}>
                  <div className={styles.heroImageBadge}>
                    <FiShield size={16} /> Save 30% on Maintenance
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.services}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>AMC Plans</span>
            <h2 className={styles.sectionTitle}>Annual Maintenance <span className={styles.gradient}>Services</span></h2>
            <p className={styles.sectionDesc}>Comprehensive AMC plans for all your IT needs</p>
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
                  <Link to="/contact" className={styles.serviceLink}>
                    Get Quote <FiArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className={styles.plans}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Pricing</span>
            <h2 className={styles.sectionTitle}>Choose Your <span className={styles.gradient}>AMC Plan</span></h2>
          </div>
          <div className={styles.plansGrid}>
            {plans.map((plan, idx) => (
              <div key={idx} className={`${styles.planCard} ${plan.featured ? styles.featured : ''}`}>
                {plan.featured && <div className={styles.popularBadge}>Most Popular</div>}
                <h3>{plan.name}</h3>
                <div className={styles.planPrice}>
                  {plan.price}
                  <span>/month</span>
                </div>
                <div className={styles.planYearPrice}>{plan.priceYear}</div>
                <div className={styles.planDevices}>{plan.devices}</div>
                <ul className={styles.planFeatures}>
                  {plan.features.map((feature, i) => (
                    <li key={i}><FiCheckCircle size={14} /> {feature}</li>
                  ))}
                </ul>
                <Link to="/contact" className={styles.planBtn}>
                  Get AMC <FiArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Why Choose Us</span>
            <h2 className={styles.sectionTitle}>Key <span className={styles.gradient}>Benefits</span></h2>
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

      {/* Inclusions Section */}
      <section className={styles.inclusions}>
        <div className={styles.container}>
          <div className={styles.inclusionsGrid}>
            <div className={styles.inclusionsLeft}>
              <span className={styles.sectionBadge}>What's Included</span>
              <h2>Standard AMC <span className={styles.gradient}>Inclusions</span></h2>
              <p>All our AMC plans come with these standard benefits</p>
              <div className={styles.inclusionsList}>
                {inclusion.map((item, idx) => (
                  <div key={idx} className={styles.inclusionItem}>
                    <FiCheckCircle size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.inclusionsRight}>
              <div className={styles.inclusionsImage}>
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=400&fit=crop" 
                  alt="AMC Inclusions" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.process}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>How It Works</span>
            <h2 className={styles.sectionTitle}>AMC <span className={styles.gradient}>Process</span></h2>
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

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Testimonials</span>
            <h2 className={styles.sectionTitle}>What Our <span className={styles.gradient}>Clients Say</span></h2>
          </div>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className={styles.testimonialCard}>
                <div className={styles.testimonialQuote}>"</div>
                <p>{testimonial.text}</p>
                <div className={styles.testimonialAuthor}>
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.company}</p>
                </div>
                <div className={styles.testimonialStars}>
                  {[...Array(testimonial.rating)].map((_, i) => <FiStar key={i} size={14} fill="#f59e0b" color="#f59e0b" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLA Section */}
      <section className={styles.sla}>
        <div className={styles.container}>
          <div className={styles.slaCard}>
            <h2>Our Service Level <span className={styles.gradient}>Agreement (SLA)</span></h2>
            <p>We guarantee response and resolution times as per industry standards</p>
            <div className={styles.slaGrid}>
              <div className={styles.slaItem}>
                <div className={styles.slaValue}>2 Hours</div>
                <p>Response Time</p>
              </div>
              <div className={styles.slaItem}>
                <div className={styles.slaValue}>8 Hours</div>
                <p>Resolution Time</p>
              </div>
              <div className={styles.slaItem}>
                <div className={styles.slaValue}>99.9%</div>
                <p>Uptime Guarantee</p>
              </div>
              <div className={styles.slaItem}>
                <div className={styles.slaValue}>24/7</div>
                <p>Support Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <h2>Protect Your IT Infrastructure Today</h2>
            <p>Get a customized AMC plan for your business needs.</p>
            <div className={styles.ctaButtons}>
              <Link to="/contact" className={styles.ctaBtnPrimary}>
                Get Free Quote <FiArrowRight size={16} />
              </Link>
              <a href="tel:+919876543210" className={styles.ctaBtnSecondary}>
                <FiPhone size={16} /> Call +91-98765-43210
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AMCServices;