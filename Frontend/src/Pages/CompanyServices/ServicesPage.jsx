// ServicesPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ServicesPage.module.css';
import {
  FiCode, FiSmartphone, FiSettings, FiLayers, FiGlobe, FiCamera,
  FiCloud, FiServer, FiCpu, FiHardDrive, FiPrinter, FiTool,
  FiMonitor, FiShield, FiDatabase, FiBarChart2, FiActivity, FiUsers,
  FiArrowRight, FiCheckCircle, FiTrendingUp, FiAward, FiZap,
  FiSearch, FiFilter, FiGrid, FiList, FiStar, FiClock, FiBriefcase
} from 'react-icons/fi';
import WaveCanvas from '../Home/Wavecanvas';
import ContactHeroSection from '../Contact/ContectHeroSection';

// Service data from header
const ALL_SERVICES = [
  // Development
  { icon: FiCode, label: 'Web Development', desc: 'Modern, responsive websites built with latest technologies', category: 'Development', longDesc: 'We build fast, secure, and scalable websites using React, Next.js, and modern frameworks. Perfect for businesses looking to establish a strong online presence.', features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'CMS Integration'], price: 'Custom Pricing', delivery: '4-6 weeks' },
  { icon: FiSmartphone, label: 'App Development', desc: 'iOS & Android solutions for mobile-first businesses', category: 'Development', longDesc: 'Native and cross-platform mobile apps that deliver exceptional user experiences across all devices.', features: ['iOS & Android', 'Cross-platform', 'Push Notifications', 'Offline Support'], price: 'Custom Pricing', delivery: '8-12 weeks' },
  { icon: FiSettings, label: 'Software Development', desc: 'Custom software products tailored to your needs', category: 'Development', longDesc: 'End-to-end custom software development from concept to deployment, built to scale with your business.', features: ['Custom Solutions', 'Scalable Architecture', 'API Integration', 'Cloud Ready'], price: 'Custom Pricing', delivery: '12-16 weeks' },
  { icon: FiLayers, label: 'UI/UX Design', desc: 'Beautiful user experiences that engage customers', category: 'Development', longDesc: 'User-centered design that combines aesthetics with functionality to create intuitive digital products.', features: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing'], price: 'Custom Pricing', delivery: '2-4 weeks' },
  { icon: FiGlobe, label: 'Digital Marketing', desc: 'SEO, social media & marketing campaigns', category: 'Development', longDesc: 'Data-driven digital marketing strategies that drive traffic, engagement, and conversions.', features: ['SEO Optimization', 'Social Media', 'Content Marketing', 'Email Campaigns'], price: 'Starts at ₹25k/mo', delivery: 'Ongoing' },
  { icon: FiCamera, label: 'Graphic Design', desc: 'Branding & visual identity that stands out', category: 'Development', longDesc: 'Professional graphic design services that bring your brand to life across all mediums.', features: ['Logo Design', 'Brand Identity', 'Print Materials', 'Social Media Graphics'], price: 'Custom Pricing', delivery: '1-2 weeks' },
  
  // Infrastructure
  { icon: FiCloud, label: 'Cloud Solutions', desc: 'AWS, Azure & GCP cloud services', category: 'Infrastructure', longDesc: 'Enterprise-grade cloud solutions that scale with your business, ensuring high availability and cost efficiency.', features: ['AWS/Azure/GCP', 'Cloud Migration', 'Cost Optimization', '24/7 Monitoring'], price: 'Custom Pricing', delivery: '4-8 weeks' },
  { icon: FiServer, label: 'Network Setup', desc: 'LAN, WAN & VPN network infrastructure', category: 'Infrastructure', longDesc: 'Secure and reliable network infrastructure setup for businesses of all sizes.', features: ['LAN/WAN Setup', 'VPN Configuration', 'Network Security', 'Performance Optimization'], price: 'Custom Pricing', delivery: '2-4 weeks' },
  { icon: FiCpu, label: 'Hardware Support', desc: 'On-site & remote hardware repairs', category: 'Infrastructure', longDesc: 'Comprehensive hardware support and maintenance for all your IT equipment.', features: ['On-site Support', 'Remote Assistance', 'Hardware Upgrades', 'Preventive Maintenance'], price: 'Starts at ₹10k/mo', delivery: '24/7 Support' },
  { icon: FiHardDrive, label: 'Data Backup', desc: 'Secure cloud & local backup solutions', category: 'Infrastructure', longDesc: 'Automated backup solutions ensuring your critical data is always protected and recoverable.', features: ['Cloud Backup', 'Local Backup', 'Disaster Recovery', 'Data Encryption'], price: 'Starts at ₹15k/mo', delivery: '2-3 weeks' },
  { icon: FiPrinter, label: 'AMC Services', desc: 'Annual maintenance contracts', category: 'Infrastructure', longDesc: 'Comprehensive annual maintenance contracts for all your IT infrastructure needs.', features: ['24/7 Support', 'Preventive Maintenance', 'Hardware Replacement', 'Software Updates'], price: 'Starts at ₹20k/year', delivery: 'Annual Contract' },
  { icon: FiTool, label: 'IT Outsourcing', desc: 'Managed IT services for your business', category: 'Infrastructure', longDesc: 'Complete IT department outsourcing with dedicated experts managing your technology needs.', features: ['Dedicated Team', 'Help Desk Support', 'Infrastructure Management', 'Strategic IT Planning'], price: 'Custom Pricing', delivery: 'Ongoing' },
  
  // Consulting & Analytics
  { icon: FiMonitor, label: 'IT Consulting', desc: 'Strategy & technology roadmap planning', category: 'Consulting', longDesc: 'Expert IT consulting to align technology with your business goals and drive digital transformation.', features: ['Strategy Development', 'Technology Assessment', 'Roadmap Planning', 'Vendor Selection'], price: 'Starts at ₹50k', delivery: '2-4 weeks' },
  { icon: FiShield, label: 'Cybersecurity', desc: 'Protect your business from threats', category: 'Consulting', longDesc: 'Comprehensive cybersecurity solutions to protect your business from evolving threats.', features: ['Security Audits', 'Threat Detection', 'Incident Response', 'Compliance Management'], price: 'Custom Pricing', delivery: '4-6 weeks' },
  { icon: FiDatabase, label: 'Data Analytics', desc: 'Insights & dashboards for decisions', category: 'Consulting', longDesc: 'Turn your data into actionable insights with our advanced analytics and BI solutions.', features: ['Data Visualization', 'Predictive Analytics', 'Real-time Dashboards', 'Reporting'], price: 'Custom Pricing', delivery: '6-8 weeks' },
  { icon: FiBarChart2, label: 'ERP Solutions', desc: 'SAP, Odoo & enterprise systems', category: 'Consulting', longDesc: 'End-to-end ERP implementation and customization for streamlined business operations.', features: ['Implementation', 'Customization', 'Integration', 'Training & Support'], price: 'Custom Pricing', delivery: '12-24 weeks' },
  { icon: FiActivity, label: 'IT Audit', desc: 'System health & compliance audit', category: 'Consulting', longDesc: 'Comprehensive IT audits to ensure system health, security, and regulatory compliance.', features: ['Security Audit', 'Compliance Check', 'Performance Analysis', 'Risk Assessment'], price: 'Starts at ₹75k', delivery: '2-3 weeks' },
  { icon: FiUsers, label: 'IT Training', desc: 'Upskill your team with expert training', category: 'Consulting', longDesc: 'Custom training programs to upskill your team on the latest technologies and best practices.', features: ['Custom Curriculum', 'Hands-on Training', 'Certification Prep', 'Ongoing Support'], price: 'Starts at ₹30k', delivery: '1-2 weeks' }
];

const CATEGORIES = ['All', 'Development', 'Infrastructure', 'Consulting'];

const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedService, setSelectedService] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filteredServices = ALL_SERVICES.filter(service => {
    const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
    const matchesSearch = service.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const ServiceCard = ({ service }) => (
    <div className={styles.serviceCard}>
      <div className={styles.cardIcon}>
        <service.icon size={32} />
      </div>
      <h3 className={styles.cardTitle}>{service.label}</h3>
      <p className={styles.cardDesc}>{service.desc}</p>
      <div className={styles.cardFeatures}>
        {service.features.slice(0, 3).map((feature, idx) => (
          <span key={idx} className={styles.featureTag}>
            <FiCheckCircle size={10} /> {feature}
          </span>
        ))}
      </div>
      <div className={styles.cardFooter}>
        <Link to={`/services/${service.label.toLowerCase().replace(/ /g, '-')}`} className={styles.cardLink}>
          Learn More <FiArrowRight size={14} />
        </Link>
      </div>
    </div>
  );

  const ServiceDetailModal = ({ service, onClose }) => (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>×</button>
        <div className={styles.modalIcon}>
          <service.icon size={48} />
        </div>
        <h2 className={styles.modalTitle}>{service.label}</h2>
        <p className={styles.modalDesc}>{service.longDesc}</p>
        <div className={styles.modalFeatures}>
          <h4>Key Features</h4>
          <div className={styles.featuresList}>
            {service.features.map((feature, idx) => (
              <div key={idx} className={styles.modalFeature}>
                <FiCheckCircle size={16} /> {feature}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.modalInfo}>
          <div className={styles.modalInfoItem}>
            <FiClock size={16} />
            <span>Delivery: {service.delivery}</span>
          </div>
          <div className={styles.modalInfoItem}>
            <FiBriefcase size={16} />
            <span>Pricing: {service.price}</span>
          </div>
        </div>
        <div className={styles.modalActions}>
          <Link to="/contact" className={styles.modalBtnPrimary}>
            Get Free Quote <FiArrowRight size={14} />
          </Link>
          <Link to={`/services/${service.label.toLowerCase().replace(/ /g, '-')}`} className={styles.modalBtnSecondary}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.page}>
      <WaveCanvas />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroPill}>
            <FiZap size={14} /> Our Services
          </div>
          <h1 className={styles.heroTitle}>
            Comprehensive <span className={styles.heroBlue}>Technology</span><br />
            Solutions For Your Business
          </h1>
          <p className={styles.heroDesc}>
            From development to infrastructure and consulting — we provide end-to-end
            technology solutions that drive growth, efficiency, and digital transformation.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatVal}>18+</span>
              <span className={styles.heroStatLabel}>Expert Services</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.heroStatVal}>500+</span>
              <span className={styles.heroStatLabel}>Projects Completed</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.heroStatVal}>98%</span>
              <span className={styles.heroStatLabel}>Client Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className={`${styles.filterBar} ${scrolled ? styles.filterBarScrolled : ''}`}>
        <div className={styles.container}>
          <div className={styles.filterLeft}>
            <div className={styles.searchBox}>
              <FiSearch size={18} />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.categoryTabs}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`${styles.categoryTab} ${activeCategory === cat ? styles.active : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.filterRight}>
            <button
              className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <FiGrid size={16} />
            </button>
            <button
              className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
              onClick={() => setViewMode('list')}
            >
              <FiList size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          {filteredServices.length === 0 ? (
            <div className={styles.noResults}>
              <FiSearch size={48} />
              <h3>No services found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className={`${styles.servicesGrid} ${viewMode === 'list' ? styles.listView : ''}`}>
              {filteredServices.map((service, idx) => (
                <div key={idx} onClick={() => setSelectedService(service)}>
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.whyChoose}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.badge}>Why Choose Us</span>
            <h2 className={styles.sectionTitle}>Why Businesses <span className={styles.blue}>Trust Us</span></h2>
            <p className={styles.sectionDesc}>We deliver excellence through expertise, dedication, and proven results</p>
          </div>
          <div className={styles.whyGrid}>
            {[
              { icon: FiAward, title: '10+ Years Experience', desc: 'Decade of delivering quality technology solutions' },
              { icon: FiUsers, title: 'Expert Team', desc: '50+ certified professionals across domains' },
              { icon: FiTrendingUp, title: 'Proven Track Record', desc: '500+ successful projects delivered' },
              { icon: FiClock, title: 'On-Time Delivery', desc: '98% project completion within deadline' },
              { icon: FiShield, title: 'Quality Assured', desc: 'Rigorous testing and QA processes' },
              { icon: FiZap, title: '24/7 Support', desc: 'Round-the-clock technical assistance' }
            ].map((item, idx) => (
              <div key={idx} className={styles.whyCard}>
                <item.icon size={28} className={styles.whyIcon} />
                <h3 className={styles.whyTitle}>{item.title}</h3>
                <p className={styles.whyDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Need a Custom Solution?</h2>
            <p className={styles.ctaDesc}>
              Let's discuss your requirements and build something amazing together.
              Get a free consultation from our expert team.
            </p>
            <div className={styles.ctaBtns}>
              <Link to="/contact" className={styles.ctaBtnPrimary}>
                Get Free Quote <FiArrowRight size={14} />
              </Link>
              <Link to="/portfolio" className={styles.ctaBtnOutline}>
                View Our Work
              </Link>
            </div>
          </div>
        </div>
        
      </section>

      {/* Modal */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
    
  );
};

export default ServicesPage;