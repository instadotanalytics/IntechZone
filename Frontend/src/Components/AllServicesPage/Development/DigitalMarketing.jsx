// Components/DigitalMarketing/DigitalMarketing.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './DigitalMarketing.module.css';
import {
  FiArrowRight, FiCheckCircle, FiClock, FiStar, FiAward,
  FiZap, FiTrendingUp, FiUsers, FiGlobe, FiHeadphones,
  FiTarget, FiEye, FiBarChart2, FiShield, FiRefreshCw,
  FiMail, FiMessageSquare, FiSend, FiUser, FiDollarSign,
  FiCalendar, FiChevronRight, FiSearch, FiShare2,
  FiTrendingDown, FiActivity, FiPieChart, FiLayout,
  FiImage, FiVideo, FiTwitch, FiInstagram, FiFacebook,
  FiTwitter, FiLinkedin, FiYoutube, FiGithub
} from 'react-icons/fi';
import WaveCanvas from '../../../Pages/Home/Wavecanvas';
import AllServicesForm from '../../../Pages/CompanyServices/AllServicesForm';
import TestimonialSection from '../../../Pages/Home/TestimonialSection';

const DigitalMarketing = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stats = [
    { value: '22+', label: 'Years of Experience', icon: FiAward },
    { value: '50+', label: 'Global Top Brands', icon: FiGlobe },
    { value: '300+', label: 'Tech Professionals', icon: FiUsers },
    { value: '100+', label: 'Happy Clients', icon: FiStar },
  ];

  const services = [
    { icon: FiSearch, title: 'Search Engine Optimization', desc: 'Attain required website traffic and ranking on SERP.', color: '#3b82f6', image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=400&h=250&fit=crop' },
    { icon: FiShare2, title: 'Social Media Marketing', desc: 'Reach target audience socially and spread brand awareness.', color: '#10b981', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=250&fit=crop' },
    { icon: FiTrendingUp, title: 'Paid Marketing Campaigns', desc: 'Increase business revenue with paid campaigns on Google, Facebook, etc.', color: '#f59e0b', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop' },
    { icon: FiLayout, title: 'Content Marketing', desc: 'Perfect content strategy for website, app, and social media.', color: '#8b5cf6', image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=250&fit=crop' },
    { icon: FiShield, title: 'Online Reputation Management', desc: 'Improve and enhance brand online reputation.', color: '#ef4444', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop' },
    { icon: FiActivity, title: 'Conversion Rate Optimization', desc: 'Convert visitors into potential customers.', color: '#06b6d4', image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop' },
    { icon: FiUsers, title: 'Influencer Marketing', desc: 'Extend brand reach with industry-specific influencers.', color: '#ec4899', image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=250&fit=crop' },
    { icon: FiTrendingDown, title: 'App Store Optimization', desc: 'Maximize app reach, downloads, and conversion rate.', color: '#14b8a6', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop' },
    { icon: FiMail, title: 'Email Marketing', desc: 'Perfect way to do successful online marketing campaigns.', color: '#f97316', image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=400&h=250&fit=crop' },
  ];

  const clients = [
    'Microsoft', 'Google', 'Amazon', 'Apple', 'Meta', 'Netflix',
    'Tesla', 'Adobe', 'Spotify', 'Airbnb', 'Uber', 'PayPal'
  ];

  const projects = [
    { name: 'SEO for USA-Based Home Decor Brand', result: 'Secured Revenue & Drive Conversion', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=250&fit=crop' },
    { name: 'SEO of Leading Restaurant Supply Store', result: 'Increased Organic Traffic & Conversion', image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=400&h=250&fit=crop' },
    { name: 'Digital Presence for Canadian Food Brand', result: 'Website Revamp & Market Targeting', image: 'https://i.pinimg.com/736x/6d/9e/10/6d9e10457ba7ae3c0da44a3a7ed73857.jpg' },
  ];

  const tools = [
    { name: 'Semrush', icon: FiSearch, color: '#3b82f6' },
    { name: 'Ahrefs', icon: FiBarChart2, color: '#10b981' },
    { name: 'Google Analytics', icon: FiPieChart, color: '#f59e0b' },
    { name: 'Screaming Frog', icon: FiActivity, color: '#8b5cf6' },
    { name: 'Google Trends', icon: FiTrendingUp, color: '#ef4444' },
    { name: 'Canva', icon: FiImage, color: '#06b6d4' },
  ];

  const industries = [
    'Automobile', 'Education', 'Finance', 'Banking', 'Food & Beverages', 'Healthcare',
    'Manufacturing', 'Media & Entertainment', 'Real Estate', 'Retail', 'Logistics', 'Travel', 'Technology'
  ];

  const processSteps = [
    { step: '01', title: 'Research', desc: 'Information collection to build strategy', icon: FiSearch },
    { step: '02', title: 'Create', desc: 'Define goals and create campaigns', icon: FiTarget },
    { step: '03', title: 'Promote', desc: 'Start promoting campaigns developed', icon: FiShare2 },
    { step: '04', title: 'Analyze', desc: 'Monitor performance and outcomes', icon: FiActivity },
    { step: '05', title: 'Optimize', desc: 'Make changes for desired outcomes', icon: FiRefreshCw },
    { step: '06', title: 'Deploy & Run', desc: 'Operational readiness & continuous improvement', icon: FiZap },
  ];

  const reasons = [
    { title: 'Custom Marketing Framework', desc: 'Structured framework to optimize every digital touchpoint.' },
    { title: 'Data-focused Services', desc: 'Customized metrics to produce action-oriented results.' },
    { title: 'Omnichannel Flow', desc: 'Personalized solution to boost ROI and brand reputation.' },
    { title: 'Industrial Experience', desc: 'Industry-specific experts with years of experience.' },
    { title: 'Campaign Evaluation', desc: 'Regular monitoring of metrics and strategies.' },
    { title: 'Competitive Pricing', desc: 'Result-driven services without breaking the bank.' },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setFormStatus({ type: 'success', message: 'Thank you! We will contact you within 24 hours.' });
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setIsSubmitting(false);
      setTimeout(() => setFormStatus({ type: '', message: '' }), 5000);
    }, 1500);
  };

  return (
    <div className={styles.page}>

      {/* Hero Section */}
      <section className={styles.hero}>
        <WaveCanvas/>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroLeft}>
              <div className={styles.heroBadge}>
                <FiZap size={14} /> Digital Marketing Agency
              </div>
              <h1 className={styles.heroTitle}>
                Get Significant Boost to Your Business with <span className={styles.gradient}>Digital Marketing</span>
              </h1>
              <p className={styles.heroDesc}>
                From lead generation and brand awareness to customer acquisition and retention, 
                our digital marketing company does it all for you.
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
                  Get Started <FiArrowRight size={16} />
                </Link>
                <Link to="/portfolio" className={styles.btnSecondary}>
                  View Portfolio
                </Link>
              </div>
            </div>
            <div className={styles.heroRight}>
              <div className={styles.heroImage}>
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=500&fit=crop" 
                  alt="Digital Marketing" 
                />
                <div className={styles.heroImageOverlay}>
                  <div className={styles.heroImageBadge}>
                    <FiTrendingUp size={16} /> ROI-Driven Solutions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AllServicesForm/>

      {/* Trusted Clients Section */}
      <section className={styles.clients}>
        <div className={styles.container}>
          <p className={styles.clientsTitle}>Trusted by 50+ Global Top Brands & Enterprises</p>
          <div className={styles.clientsGrid}>
            {clients.map((client, idx) => (
              <span key={idx} className={styles.clientLogo}>{client}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.services}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>What We Offer</span>
            <h2 className={styles.sectionTitle}>360-Degree Digital <span className={styles.gradient}>Marketing Services</span></h2>
            <p className={styles.sectionDesc}>End-to-end marketing services to attain substantial results</p>
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
                    Read More <FiArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.process}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Our Process</span>
            <h2 className={styles.sectionTitle}>Step By Step <span className={styles.gradient}>Digital Marketing Process</span></h2>
          </div>
          <div className={styles.processGrid}>
            {processSteps.map((step, idx) => (
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

      <TestimonialSection/>

      {/* Projects Section */}
      <section className={styles.projects}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Success Stories</span>
            <h2 className={styles.sectionTitle}>Explore Our <span className={styles.gradient}>Digital Marketing Projects</span></h2>
          </div>
          <div className={styles.projectsGrid}>
            {projects.map((project, idx) => (
              <div key={idx} className={styles.projectCard}>
                <div className={styles.projectImage}>
                  <img src={project.image} alt={project.name} />
                </div>
                <div className={styles.projectInfo}>
                  <h3>{project.name}</h3>
                  <p>{project.result}</p>
                  <Link to="/contact" className={styles.projectLink}>
                    View Case Study <FiArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className={styles.tools}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Tools We Use</span>
            <h2 className={styles.sectionTitle}>Popular Tools That Power Our <span className={styles.gradient}>Digital Marketing Services</span></h2>
          </div>
          <div className={styles.toolsGrid}>
            {tools.map((tool, idx) => (
              <div key={idx} className={styles.toolCard}>
                <div className={styles.toolIcon} style={{ color: tool.color }}>
                  <tool.icon size={32} />
                </div>
                <h4>{tool.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className={styles.industries}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Industries We <span className={styles.gradient}>Cater</span></h2>
          </div>
          <div className={styles.industriesGrid}>
            {industries.map((industry, idx) => (
              <div key={idx} className={styles.industryCard}>
                <span>{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={styles.whyUs}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Why Choose Us</span>
            <h2 className={styles.sectionTitle}>Why OrangeMantra as Your <span className={styles.gradient}>Extended Digital Marketing Team</span></h2>
          </div>
          <div className={styles.whyUsGrid}>
            {reasons.map((reason, idx) => (
              <div key={idx} className={styles.whyUsCard}>
                <div className={styles.whyUsNumber}>0{idx + 1}</div>
                <h3>{reason.title}</h3>
                <p>{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <h2>Ready to Generate Leads and Increase Your Reach?</h2>
            <p>Bring the desired online presence and sales for your business growth with comprehensive digital marketing services.</p>
            <div className={styles.ctaButtons}>
              <Link to="/contact" className={styles.ctaBtnPrimary}>
                Get Free Consultation <FiArrowRight size={16} />
              </Link>
              <Link to="/portfolio" className={styles.ctaBtnSecondary}>
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalMarketing;