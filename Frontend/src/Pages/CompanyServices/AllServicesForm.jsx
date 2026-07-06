import React, { useState, useRef, useEffect } from 'react';
import styles from './AllServicesForm.module.css';
import ApiService from '../../utils/apiService';
import {
  FiUser, FiMail, FiPhone, FiBriefcase,
  FiDollarSign, FiClock, FiMessageSquare, FiSend,
  FiCheckCircle, FiAlertCircle, FiChevronDown,
  FiShield, FiTrendingUp, FiZap, FiAward,
  FiStar, FiUsers, FiGlobe, FiHeadphones,
  FiPackage, FiCloud, FiCode, FiSmartphone,
  FiServer, FiDatabase, FiLock, FiBarChart2, FiX,
  FiArrowRight, FiHeart, FiThumbsUp, FiCalendar
} from 'react-icons/fi';

const SERVICES = [
  { name: 'Web Development',    category: 'Development',    icon: <FiCode size={16} />, color: '#3b82f6' },
  { name: 'App Development',    category: 'Development',    icon: <FiSmartphone size={16} />, color: '#3b82f6' },
  { name: 'Software Dev',       category: 'Development',    icon: <FiPackage size={16} />, color: '#3b82f6' },
  { name: 'UI/UX Design',       category: 'Development',    icon: <FiTrendingUp size={16} />, color: '#3b82f6' },
  { name: 'Digital Marketing',  category: 'Development',    icon: <FiBarChart2 size={16} />, color: '#3b82f6' },
  { name: 'Graphic Design',     category: 'Development',    icon: <FiStar size={16} />, color: '#3b82f6' },
  { name: 'Cloud Solutions',    category: 'Infrastructure', icon: <FiCloud size={16} />, color: '#8b5cf6' },
  { name: 'Network Setup',      category: 'Infrastructure', icon: <FiServer size={16} />, color: '#8b5cf6' },
  { name: 'Hardware Support',   category: 'Infrastructure', icon: <FiPackage size={16} />, color: '#8b5cf6' },
  { name: 'Data Backup',        category: 'Infrastructure', icon: <FiDatabase size={16} />, color: '#8b5cf6' },
  { name: 'AMC Services',       category: 'Infrastructure', icon: <FiShield size={16} />, color: '#8b5cf6' },
  { name: 'IT Outsourcing',     category: 'Infrastructure', icon: <FiUsers size={16} />, color: '#8b5cf6' },
  { name: 'IT Consulting',      category: 'Consulting',     icon: <FiTrendingUp size={16} />, color: '#10b981' },
  { name: 'Cybersecurity',      category: 'Consulting',     icon: <FiLock size={16} />, color: '#10b981' },
  { name: 'Data Analytics',     category: 'Consulting',     icon: <FiBarChart2 size={16} />, color: '#10b981' },
  { name: 'ERP Solutions',      category: 'Consulting',     icon: <FiPackage size={16} />, color: '#10b981' },
  { name: 'IT Audit',           category: 'Consulting',     icon: <FiShield size={16} />, color: '#10b981' },
  { name: 'IT Training',        category: 'Consulting',     icon: <FiUsers size={16} />, color: '#10b981' },
];

const BUDGET_OPTIONS = [
  'Less than ₹50,000', '₹50,000 - ₹2,00,000', '₹2,00,000 - ₹5,00,000',
  '₹5,00,000 - ₹10,00,000', '₹10,00,000+', 'Not sure'
];

const TIMELINE_OPTIONS = [
  'Immediate', '1-3 months', '3-6 months', '6+ months', 'Just exploring'
];

const CATEGORIES = ['All', 'Development', 'Infrastructure', 'Consulting'];

function ServiceDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const ref = useRef(null);

  const filtered = SERVICES.filter(s => activeCategory === 'All' || s.category === activeCategory);
  const selected = SERVICES.find(s => s.name === value);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className={styles.dropdownWrap} ref={ref}>
      <button
        type="button"
        className={`${styles.dropdownTrigger} ${open ? styles.dropdownOpen : ''}`}
        onClick={() => setOpen(v => !v)}
      >
        {selected ? (
          <span className={styles.triggerSelected}>
            <span className={styles.triggerIcon}>{selected.icon}</span>
            {selected.name}
          </span>
        ) : (
          <span className={styles.triggerPlaceholder}>Select a service…</span>
        )}
        <span className={styles.triggerRight}>
          {selected && (
            <span className={styles.clearBtn} onClick={(e) => { e.stopPropagation(); onChange(''); }}>
              <FiX size={12} />
            </span>
          )}
          <FiChevronDown size={15} className={`${styles.chevron} ${open ? styles.chevronUp : ''}`} />
        </span>
      </button>

      {open && (
        <div className={styles.dropdownPanel}>
          <div className={styles.catBar}>
            {CATEGORIES.map(c => (
              <button
                key={c}
                type="button"
                className={`${styles.catBtn} ${activeCategory === c ? styles.catActive : ''}`}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className={styles.serviceGrid}>
            {filtered.map(s => (
              <div
                key={s.name}
                className={`${styles.serviceOption} ${value === s.name ? styles.serviceSelected : ''}`}
                onClick={() => { onChange(s.name); setOpen(false); }}
              >
                <span className={styles.svcIcon} style={{ color: s.color }}>{s.icon}</span>
                <span className={styles.svcName}>{s.name}</span>
                {value === s.name && <FiCheckCircle size={12} className={styles.svcCheck} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const AllServicesForm = () => {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', company: '',
    service: '', budget: 'Not sure', timeline: 'Just exploring', message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

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
        setFormData({ fullName: '', email: '', phone: '', company: '', service: '', budget: 'Not sure', timeline: 'Just exploring', message: '' });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerBadge}>
            <FiZap size={14} /> Get Started
          </div>
          <h1 className={styles.headerTitle}>Request a <span className={styles.gradient}>Quote</span></h1>
          <p className={styles.headerDesc}>Choose from our 18+ specialized IT services and get a customized quote</p>
        </div>

        <div className={styles.card}>
          {/* Left panel - Benefits */}
          <div className={styles.left}>
            <div className={styles.leftHeader}>
              <h3>Why Choose Intech Zone?</h3>
              <p>Enterprise-grade solutions tailored to your business needs.</p>
            </div>

            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}><FiAward size={22} /></div>
                <div className={styles.benefitContent}>
                  <strong>10+ Years</strong>
                  <span>Proven excellence in IT services</span>
                </div>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}><FiUsers size={22} /></div>
                <div className={styles.benefitContent}>
                  <strong>50+ Experts</strong>
                  <span>Dedicated professional team</span>
                </div>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}><FiGlobe size={22} /></div>
                <div className={styles.benefitContent}>
                  <strong>Global Reach</strong>
                  <span>Serving clients worldwide</span>
                </div>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}><FiHeadphones size={22} /></div>
                <div className={styles.benefitContent}>
                  <strong>24/7 Support</strong>
                  <span>Always available for you</span>
                </div>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}><FiHeart size={22} /></div>
                <div className={styles.benefitContent}>
                  <strong>100% Satisfaction</strong>
                  <span>Client-first approach</span>
                </div>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}><FiThumbsUp size={22} /></div>
                <div className={styles.benefitContent}>
                  <strong>500+ Projects</strong>
                  <span>Successful deliveries</span>
                </div>
              </div>
            </div>

            <div className={styles.leftFooter}>
              <div className={styles.contactInfo}>
                <div><FiMail size={13} /> info@intechzone.in</div>
                <div><FiPhone size={13} /> +44 7713 675964</div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className={styles.right}>
            <form onSubmit={handleSubmit} className={styles.form}>

              {success && (
                <div className={styles.successMsg}>
                  <FiCheckCircle size={16} />
                  <div>
                    <strong>Success!</strong>
                    <p>{success}</p>
                  </div>
                </div>
              )}
              {error && (
                <div className={styles.errorMsg}>
                  <FiAlertCircle size={16} />
                  <div>
                    <strong>Error!</strong>
                    <p>{error}</p>
                  </div>
                </div>
              )}

              {/* Service dropdown */}
              <div className={styles.formGroup}>
                <label>Select Service <span>*</span></label>
                <ServiceDropdown value={formData.service} onChange={v => { setFormData(f => ({...f, service: v})); setError(''); }} />
              </div>

              {/* Row 1 */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Full Name <span>*</span></label>
                  <div className={styles.inputWrapper}>
                    <FiUser className={styles.inputIcon} />
                    <input type="text" name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} required />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Email Address <span>*</span></label>
                  <div className={styles.inputWrapper}>
                    <FiMail className={styles.inputIcon} />
                    <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Phone Number <span>*</span></label>
                  <div className={styles.inputWrapper}>
                    <FiPhone className={styles.inputIcon} />
                    <input type="tel" name="phone" placeholder="+91 XXXXXXXXXX" value={formData.phone} onChange={handleChange} required />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Company Name</label>
                  <div className={styles.inputWrapper}>
                    <FiBriefcase className={styles.inputIcon} />
                    <input type="text" name="company" placeholder="Your company name" value={formData.company} onChange={handleChange} />
                  </div>
                </div>
              </div>

              {/* Row 3 */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Budget Range</label>
                  <div className={styles.inputWrapper}>
                    <FiDollarSign className={styles.inputIcon} />
                    <select name="budget" value={formData.budget} onChange={handleChange}>
                      {BUDGET_OPTIONS.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Project Timeline</label>
                  <div className={styles.inputWrapper}>
                    <FiClock className={styles.inputIcon} />
                    <select name="timeline" value={formData.timeline} onChange={handleChange}>
                      {TIMELINE_OPTIONS.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className={styles.formGroup}>
                <label>Project Details <span>*</span></label>
                <div className={styles.inputWrapper}>
                  <FiMessageSquare className={styles.inputIcon} style={{ top: '14px' }} />
                  <textarea name="message" placeholder="Tell us about your project requirements, goals, and expectations..." rows={4} value={formData.message} onChange={handleChange} required />
                </div>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? (
                  <>
                    <span className={styles.spinner}></span> Submitting...
                  </>
                ) : (
                  <>Submit Enquiry <FiSend size={14} /></>
                )}
              </button>

              <div className={styles.trustBadges}>
                <span><FiCheckCircle size={11} /> Free Consultation</span>
                <span><FiCheckCircle size={11} /> No Obligation Quote</span>
                <span><FiCheckCircle size={11} /> 24hr Response</span>
                <span><FiCheckCircle size={11} /> 100% Confidential</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllServicesForm;