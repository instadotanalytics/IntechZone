import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './HardwareSupport.module.css';
import {
  FiArrowRight, FiCheckCircle, FiClock, FiStar, FiAward,
  FiZap, FiTrendingUp, FiUsers, FiGlobe, FiHeadphones,
  FiTarget, FiEye, FiBarChart2, FiShield, FiRefreshCw,
  FiCpu, FiServer, FiDatabase, FiLock, FiTool,
  FiHardDrive, FiPrinter, FiMonitor, FiSmartphone,
  FiBox, FiDollarSign, FiMail, FiMessageSquare, FiSend,
  FiUser, FiCalendar, FiBriefcase, FiMapPin, FiPhone,
  FiWifi, FiCloud
} from 'react-icons/fi';
import TestimonialSection from '../../../Pages/Home/TestimonialSection';
import WaveCanvas from '../../../Pages/Home/Wavecanvas';
import AllServicesForm from '../../../Pages/CompanyServices/AllServicesForm';

const HardwareSupport = () => {
  const stats = [
    { value: '24/7', label: 'Support Available', icon: FiHeadphones },
    { value: '2hr', label: 'Response Time', icon: FiClock },
    { value: '5000+', label: 'Devices Repaired', icon: FiCpu },
    { value: '98%', label: 'Success Rate', icon: FiAward },
  ];

  const services = [
    { icon: FiCpu, title: 'Desktop Support', desc: 'Complete desktop hardware troubleshooting and repair.', color: '#3b82f6', image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=250&fit=crop' },
    { icon: FiMonitor, title: 'Laptop Repair', desc: 'Screen, keyboard, battery, and motherboard repairs.', color: '#10b981', image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=250&fit=crop' },
    { icon: FiServer, title: 'Server Maintenance', desc: 'Server hardware diagnostics and optimization.', color: '#8b5cf6', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop' },
    { icon: FiHardDrive, title: 'Data Recovery', desc: 'Recover lost data from failed drives.', color: '#f59e0b', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop' },
    { icon: FiPrinter, title: 'Printer Support', desc: 'Printer setup, repair, and maintenance.', color: '#ef4444', image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=250&fit=crop' },
    { icon: FiWifi, title: 'Network Hardware', desc: 'Router, switch, and access point setup.', color: '#06b6d4', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop' },
    { icon: FiSmartphone, title: 'Mobile Device Repair', desc: 'Smartphone and tablet screen/ battery repair.', color: '#ec4899', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=250&fit=crop' },
    { icon: FiTool, title: 'AMC Services', desc: 'Annual maintenance contracts for businesses.', color: '#14b8a6', image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=250&fit=crop' },
  ];

  const features = [
    { icon: FiZap, title: 'Quick Response', desc: '2-hour on-site response time' },
    { icon: FiShield, title: 'Certified Technicians', desc: 'Industry-certified experts' },
    { icon: FiTrendingUp, title: 'Genuine Parts', desc: 'Original manufacturer parts' },
    { icon: FiClock, title: 'Same-Day Service', desc: 'Most repairs completed same day' },
  ];

  const process = [
    { step: '01', title: 'Call/Book Online', desc: 'Schedule your service request', icon: FiPhone },
    { step: '02', title: 'Diagnosis', desc: 'Free hardware assessment', icon: FiEye },
    { step: '03', title: 'Quote Approval', desc: 'Get transparent pricing', icon: FiDollarSign },
    { step: '04', title: 'Repair/Replace', desc: 'Fix or replace faulty parts', icon: FiTool },
    { step: '05', title: 'Quality Testing', desc: 'Thorough testing after repair', icon: FiCheckCircle },
    { step: '06', title: 'Delivery/Return', desc: 'Return your device', icon: FiRefreshCw },
  ];

  const brands = [
    { name: 'Dell', logo: 'DELL' },
    { name: 'HP', logo: 'HP' },
    { name: 'Lenovo', logo: 'Lenovo' },
    { name: 'Apple', logo: 'Apple' },
    { name: 'Microsoft', logo: 'Microsoft' },
    { name: 'ASUS', logo: 'ASUS' },
    { name: 'Acer', logo: 'Acer' },
    { name: 'IBM', logo: 'IBM' },
  ];

  const pricing = [
    { service: 'Desktop Diagnostic', price: 'Free', duration: '1 hour' },
    { service: 'Laptop Screen Replacement', price: '₹3,999+', duration: '2-3 hours' },
    { service: 'Data Recovery', price: '₹4,999+', duration: '1-3 days' },
    { service: 'Annual Maintenance Contract', price: 'Custom', duration: 'Yearly' },
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
                <FiTool size={14} /> Hardware Support
              </div>
              <h1 className={styles.heroTitle}>
                Fast & Reliable <span className={styles.gradient}>Hardware Support</span> for Your Business
              </h1>
              <p className={styles.heroDesc}>
                On-site and remote hardware support for all your devices. Certified technicians, genuine parts, and rapid response time.
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
                  Book Service <FiArrowRight size={16} />
                </Link>
                <Link to="/portfolio" className={styles.btnSecondary}>
                  View Cases
                </Link>
              </div>
            </div>
            <div className={styles.heroRight}>
              <div className={styles.heroImage}>
                <img 
                  src="https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&h=500&fit=crop" 
                  alt="Hardware Support" 
                />
                <div className={styles.heroImageOverlay}>
                  <div className={styles.heroImageBadge}>
                    <FiTool size={16} /> 2-Hour Response Guarantee
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
            <span className={styles.sectionBadge}>Repair Services</span>
            <h2 className={styles.sectionTitle}>Hardware <span className={styles.gradient}>Support Services</span></h2>
            <p className={styles.sectionDesc}>Comprehensive hardware repair and maintenance for all devices</p>
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
                    Book Now <FiArrowRight size={12} />
                  </Link>
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
            <span className={styles.sectionBadge}>Why Choose Us</span>
            <h2 className={styles.sectionTitle}>Key <span className={styles.gradient}>Advantages</span></h2>
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
            <h2 className={styles.sectionTitle}>Our Service <span className={styles.gradient}>Process</span></h2>
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

      {/* Brands Section */}
      <section className={styles.brands}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Supported Brands</span>
            <h2 className={styles.sectionTitle}>We Support All <span className={styles.gradient}>Major Brands</span></h2>
          </div>
          <div className={styles.brandsGrid}>
            {brands.map((brand, idx) => (
              <div key={idx} className={styles.brandCard}>
                <div className={styles.brandIcon}>
                  <FiCpu size={32} />
                </div>
                <h4>{brand.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={styles.pricing}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Pricing</span>
            <h2 className={styles.sectionTitle}>Transparent <span className={styles.gradient}>Pricing</span></h2>
          </div>
          <div className={styles.pricingGrid}>
            {pricing.map((item, idx) => (
              <div key={idx} className={styles.pricingCard}>
                <h3>{item.service}</h3>
                <div className={styles.pricingPrice}>{item.price}</div>
                <div className={styles.pricingDuration}>
                  <FiClock size={14} /> {item.duration}
                </div>
                <Link to="/contact" className={styles.pricingBtn}>
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AMC Section */}
      <section className={styles.amc}>
        <div className={styles.container}>
          <div className={styles.amcGrid}>
            <div className={styles.amcLeft}>
              <span className={styles.sectionBadge}>AMC Services</span>
              <h2>Annual Maintenance <span className={styles.gradient}>Contract</span></h2>
              <p>Protect your business hardware with our comprehensive AMC plans.</p>
              <ul className={styles.amcList}>
                <li><FiCheckCircle /> Priority 2-hour response</li>
                <li><FiCheckCircle /> Unlimited on-site visits</li>
                <li><FiCheckCircle /> Free diagnostic & quotes</li>
                <li><FiCheckCircle /> 20% discount on spare parts</li>
                <li><FiCheckCircle /> Dedicated support team</li>
              </ul>
              <Link to="/contact" className={styles.amcBtn}>
                Get AMC Quote <FiArrowRight size={16} />
              </Link>
            </div>
            <div className={styles.amcRight}>
              <div className={styles.amcImage}>
                <img 
                  src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=500&h=400&fit=crop" 
                  alt="AMC Services" 
                />
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
            <h2>Need Immediate Hardware Support?</h2>
            <p>Call us now or book online for quick service.</p>
            <div className={styles.ctaButtons}>
              <Link to="/contact" className={styles.ctaBtnPrimary}>
                Book Service <FiArrowRight size={16} />
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

export default HardwareSupport;