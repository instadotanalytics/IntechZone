import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ServiceEnquiry.module.css';
import ApiService from '../../utils/apiService';
import {
  FiUser, FiMail, FiPhone, FiBriefcase, FiMessageSquare,
  FiSend, FiCheckCircle, FiAlertCircle, FiZap, FiAward,
  FiUsers, FiGlobe, FiHeadphones, FiMapPin, FiClock,
  FiDollarSign, FiCalendar, FiArrowRight, FiCode,
  FiCloud, FiShield, FiBarChart2, FiPackage, FiSmartphone,
  FiMonitor, FiServer, FiDatabase, FiLock, FiTool
} from 'react-icons/fi';

const SERVICES_LIST = [
  // Development Services
  { id: 'web-dev', name: 'Web Development', category: 'Development', icon: FiCode, color: '#3b82f6' },
  { id: 'app-dev', name: 'App Development', category: 'Development', icon: FiSmartphone, color: '#3b82f6' },
  { id: 'software-dev', name: 'Software Development', category: 'Development', icon: FiPackage, color: '#3b82f6' },
  { id: 'ui-ux', name: 'UI/UX Design', category: 'Development', icon: FiMonitor, color: '#3b82f6' },
  { id: 'digital-marketing', name: 'Digital Marketing', category: 'Development', icon: FiBarChart2, color: '#3b82f6' },
  // Infrastructure Services
  { id: 'cloud', name: 'Cloud Solutions', category: 'Infrastructure', icon: FiCloud, color: '#8b5cf6' },
  { id: 'network', name: 'Network Setup', category: 'Infrastructure', icon: FiServer, color: '#8b5cf6' },
  { id: 'hardware', name: 'Hardware Support', category: 'Infrastructure', icon: FiTool, color: '#8b5cf6' },
  { id: 'backup', name: 'Data Backup', category: 'Infrastructure', icon: FiDatabase, color: '#8b5cf6' },
  // Consulting Services
  { id: 'consulting', name: 'IT Consulting', category: 'Consulting', icon: FiBriefcase, color: '#10b981' },
  { id: 'security', name: 'Cybersecurity', category: 'Consulting', icon: FiShield, color: '#10b981' },
  { id: 'analytics', name: 'Data Analytics', category: 'Consulting', icon: FiBarChart2, color: '#10b981' },
];

const ServiceEnquiry = () => {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', company: '',
    service: '', message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Development', 'Infrastructure', 'Consulting'];

  const filteredServices = SERVICES_LIST.filter(s => 
    selectedCategory === 'All' || s.category === selectedCategory
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.service) { setError('Please select a service.'); return; }
    setLoading(true); setError(''); setSuccess('');
    try {
      const response = await ApiService.submitServiceEnquiry(formData);
      if (response.data.success) {
        setSuccess('Enquiry submitted! Our team will contact you within 24 hours.');
        setFormData({ fullName: '', email: '', phone: '', company: '', service: '', message: '' });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit. Please try again.');
    } finally { setLoading(false); }
  };

  const benefits = [
    { icon: FiAward, title: '10+ Years', desc: 'Proven expertise' },
    { icon: FiUsers, title: '50+ Experts', desc: 'Dedicated team' },
    { icon: FiGlobe, title: 'Global Reach', desc: 'Worldwide clients' },
    { icon: FiHeadphones, title: '24/7 Support', desc: 'Always available' },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerBadge}>
            <FiZap size={14} /> Get Started
          </div>
          <h1 className={styles.headerTitle}>Service <span className={styles.gradient}>Enquiry</span></h1>
          <p className={styles.headerDesc}>Tell us about your requirements and we'll get back to you within 24 hours</p>
        </div>

        <div className={styles.card}>
          {/* Left Panel - Benefits */}
          <div className={styles.left}>
            <h3>Why Choose Intech Zone?</h3>
            <p>Enterprise-grade solutions tailored to your business needs.</p>
            <div className={styles.benefitsGrid}>
              {benefits.map((b, idx) => (
                <div key={idx} className={styles.benefitCard}>
                  <div className={styles.benefitIcon}><b.icon size={20} /></div>
                  <div>
                    <strong>{b.title}</strong>
                    <span>{b.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.contactInfo}>
              <div><FiMapPin size={12} /> Bhopal, India</div>
              <div><FiMail size={12} /> info@intechzone.in</div>
              <div><FiPhone size={12} /> +91-98765-43210</div>
              <div><FiClock size={12} /> Mon-Fri: 9am - 6pm</div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className={styles.right}>
            <form onSubmit={handleSubmit} className={styles.form}>
              {success && (
                <div className={styles.successMsg}>
                  <FiCheckCircle size={16} /> {success}
                </div>
              )}
              {error && (
                <div className={styles.errorMsg}>
                  <FiAlertCircle size={16} /> {error}
                </div>
              )}

              {/* Service Selection */}
              <div className={styles.formGroup}>
                <label>Select Service <span>*</span></label>
                <div className={styles.categoryTabs}>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      className={`${styles.categoryTab} ${selectedCategory === cat ? styles.active : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className={styles.servicesGrid}>
                  {filteredServices.map(service => {
                    const Icon = service.icon;
                    return (
                      <div
                        key={service.id}
                        className={`${styles.serviceCard} ${formData.service === service.name ? styles.selected : ''}`}
                        onClick={() => setFormData({ ...formData, service: service.name })}
                      >
                        <Icon size={16} style={{ color: service.color }} />
                        <span>{service.name}</span>
                        {formData.service === service.name && <FiCheckCircle size={12} className={styles.checkIcon} />}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Full Name <span>*</span></label>
                  <div className={styles.inputWrapper}>
                    <FiUser className={styles.inputIcon} />
                    <input type="text" name="fullName" placeholder="Your full name" value={formData.fullName} onChange={handleChange} required />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Email <span>*</span></label>
                  <div className={styles.inputWrapper}>
                    <FiMail className={styles.inputIcon} />
                    <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Phone <span>*</span></label>
                  <div className={styles.inputWrapper}>
                    <FiPhone className={styles.inputIcon} />
                    <input type="tel" name="phone" placeholder="+91 XXXXXXXXXX" value={formData.phone} onChange={handleChange} required />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Company</label>
                  <div className={styles.inputWrapper}>
                    <FiBriefcase className={styles.inputIcon} />
                    <input type="text" name="company" placeholder="Your company name" value={formData.company} onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Message <span>*</span></label>
                <div className={styles.inputWrapper}>
                  <FiMessageSquare className={styles.inputIcon} />
                  <textarea name="message" placeholder="Tell us about your project..." rows={3} value={formData.message} onChange={handleChange} required />
                </div>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Enquiry'} <FiSend size={14} />
              </button>

              <div className={styles.trustBadges}>
                <span><FiCheckCircle size={11} /> Free Consultation</span>
                <span><FiCheckCircle size={11} /> No Obligation</span>
                <span><FiCheckCircle size={11} /> 24hr Response</span>
                <span><FiCheckCircle size={11} /> Confidential</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceEnquiry;