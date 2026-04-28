// Pages/Career/PartTime.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PartTime.module.css';
import ApiService from '../../../utils/apiService';
import {
  FiUser, FiMail, FiPhone, FiBookOpen, FiCalendar,
  FiBriefcase, FiCode, FiSend, FiCheckCircle, FiAlertCircle,
  FiGlobe, FiLinkedin, FiFileText, FiUpload, FiX, FiUsers,
  FiStar, FiTrendingUp, FiHeart, FiShield, FiZap, FiArrowRight,
  FiClock, FiMapPin, FiDollarSign, FiMonitor, FiAward, FiChevronRight,
  FiCheck, FiBarChart2, FiLayers, FiTarget, FiGitBranch, FiDatabase
} from 'react-icons/fi';
import WaveCanvas from '../../../Pages/Home/Wavecanvas';

// ==================== COMPONENT 1: Hero Section ====================
const HeroSection = () => {
  const scrollToForm = () =>
    document.getElementById('applicationForm')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <WaveCanvas/>
        <div className={styles.heroContent}>

          {/* LEFT: Text Content */}
          <div className={styles.heroText}>
            <span className={styles.heroBadge}>⚡ Limited Slots Available</span>
            <h1>
              Launch Your Career<br />
              with <span className={styles.gradient}>Part Time</span><br />
              Internship
            </h1>
            <p>
              Work from anywhere, on your own schedule. Join India's fastest-growing tech company
              and gain real-world experience with mentorship, certifications, and a clear path to
              full-time employment.
            </p>
            <div className={styles.heroBtnGroup}>
              <button className={styles.btnPrimary} onClick={scrollToForm}>
                Apply Now <FiArrowRight size={18} />
              </button>
              
            </div>
            <div className={styles.heroStats}>
              <div><FiBriefcase size={16} /> 50+ Openings</div>
              <div><FiUsers size={16} /> 500+ Hired</div>
              <div><FiGlobe size={16} /> 100% Remote</div>
              <div><FiStar size={16} /> 4.9 Rating</div>
            </div>
          </div>

          {/* RIGHT: Image */}
          <div className={styles.heroImage}>
            <div className={styles.heroImgWrapper}>
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80"
                alt="Team working remotely"
              />
              <div className={`${styles.imgBadge} ${styles.imgBadge1}`}>
                <div className={styles.imgBadgeDot}></div>
                <span>200+ Active Interns</span>
              </div>
              <div className={`${styles.imgBadge} ${styles.imgBadge2}`}>
                <span className={styles.imgBadgeIcon}>🏆</span>
                <span>Top Rated Workplace</span>
              </div>
              <div className={styles.floatingDots}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// ==================== COMPONENT 2: Stats Strip ====================
const StatsStrip = () => {
  const stats = [
    { num: '500+', label: 'Students Hired' },
    { num: '50+', label: 'Open Positions' },
    { num: '4.9★', label: 'Average Rating' },
    { num: '100%', label: 'Remote Friendly' },
  ];
  return (
    <div className={styles.statsStrip}>
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          {stats.map((s, i) => (
            <div key={i} className={styles.statItem}>
              <div className={styles.statNum}>{s.num}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== COMPONENT 3: Benefits Section ====================
const BenefitsSection = () => {
  const benefits = [
    {
      icon: FiClock,
      title: 'Flexible Hours',
      desc: 'Choose working hours that fit your college schedule — morning, evening, or weekends.',
    },
    {
      icon: FiGlobe,
      title: '100% Remote',
      desc: 'Work from your home, college, or anywhere in the world. Zero commute required.',
    },
    {
      icon: FiDollarSign,
      title: 'Competitive Pay',
      desc: 'Industry-best stipends and monthly retainers — better than most full-time offers.',
    },
    {
      icon: FiTrendingUp,
      title: 'Growth Path',
      desc: 'Clear roadmap from intern to full-time. 70% of our team started as part-timers.',
    },
    {
      icon: FiAward,
      title: 'Free Certifications',
      desc: 'Access premium courses, live workshops, and get industry-recognized certificates.',
    },
    {
      icon: FiShield,
      title: 'Job Security',
      desc: 'Long-term opportunities with performance reviews and regular salary increments.',
    },
  ];

  return (
    <section className={styles.benefitsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>✨ Why Choose Us</span>
          <h2>Benefits of <span className={styles.gradient}>Part Time Work</span></h2>
          <p>Everything you need to grow your career without sacrificing your education</p>
        </div>
        <div className={styles.benefitsGrid}>
          {benefits.map((b, i) => (
            <div key={i} className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <b.icon size={26} />
              </div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== COMPONENT 4: Open Roles ====================
const RolesSection = () => {
  const navigate = useNavigate();
  const roles = [
    {
      tag: 'Development',
      title: 'Web Development Intern',
      hours: '15–20 hrs/week',
      type: 'Remote',
      pay: '₹5,000–₹12,000/mo',
    },
    {
      tag: 'Development',
      title: 'App Development Intern',
      hours: '15–20 hrs/week',
      type: 'Remote',
      pay: '₹6,000–₹14,000/mo',
    },
    {
      tag: 'Marketing',
      title: 'Digital Marketing Intern',
      hours: '10–15 hrs/week',
      type: 'Remote',
      pay: '₹4,000–₹8,000/mo',
    },
    {
      tag: 'Design',
      title: 'Graphic Design Intern',
      hours: '10–15 hrs/week',
      type: 'Remote',
      pay: '₹4,000–₹9,000/mo',
    },
    {
      tag: 'Content',
      title: 'Content Writing Intern',
      hours: '10–12 hrs/week',
      type: 'Remote',
      pay: '₹3,000–₹6,000/mo',
    },
    {
      tag: 'Analytics',
      title: 'Data Analytics Intern',
      hours: '15–20 hrs/week',
      type: 'Remote',
      pay: '₹6,000–₹15,000/mo',
    },
  ];

  return (
    <section className={styles.rolesSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>💼 Open Roles</span>
          <h2>Find Your <span className={styles.gradient}>Perfect Role</span></h2>
          <p>Choose from a range of domains and start contributing to real projects from day one</p>
        </div>
        <div className={styles.rolesGrid}>
          {roles.map((r, i) => (
            <div key={i} className={styles.roleCard}>
              <span className={styles.roleTag}>{r.tag}</span>
              <h3>{r.title}</h3>
              <div className={styles.roleMeta}>
                <span><FiClock size={13} /> {r.hours}</span>
                <span><FiMapPin size={13} /> {r.type}</span>
                <span><FiDollarSign size={13} /> {r.pay}</span>
              </div>
              <button
                className={styles.roleApply}
                onClick={() => document.getElementById('applicationForm')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Apply Now <FiArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== COMPONENT 5: 2-Step Application Form ====================
const ApplicationForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
    course: '',
    passingYear: '',
    internshipRole: '',
    duration: '3 months',
    skills: '',
    portfolioUrl: '',
    linkedinUrl: '',
    whyJoin: '',
  });

  const internshipRoles = [
    'Web Development',
    'App Development',
    'Digital Marketing',
    'Graphic Design',
    'Content Writing',
    'SEO',
    'Data Analytics',
    'Cloud Computing',
    'Cybersecurity',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }
    setSelectedFile(file);
    setFileName(file.name);
    setError('');
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFileName('');
  };

  const validateStep1 = () => {
    const { fullName, email, phone, qualification, course, passingYear } = formData;
    if (!fullName || !email || !phone || !qualification || !course || !passingYear) {
      setError('Please fill in all required fields in this step.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit phone number.');
      return false;
    }
    return true;
  };

  const goToStep2 = () => {
    setError('');
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.internshipRole) {
      setError('Please select an internship role.');
      return;
    }
    if (!selectedFile) {
      setError('Please upload your resume.');
      return;
    }

    setLoading(true);
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) formDataToSend.append(key, formData[key]);
    });
    formDataToSend.append('resume', selectedFile);

    try {
      const response = await ApiService.submitPartTimeApplication(formDataToSend);
      if (response.data.success) {
        setSuccess('🎉 Application submitted successfully! We will contact you within 24–48 hours.');
        setFormData({
          fullName: '', email: '', phone: '', qualification: '', course: '',
          passingYear: '', internshipRole: '', duration: '3 months',
          skills: '', portfolioUrl: '', linkedinUrl: '', whyJoin: '',
        });
        setSelectedFile(null);
        setFileName('');
        setStep(1);
        setTimeout(() => navigate('/careers'), 4000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.formSection} id="applicationForm">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>📝 Apply Now</span>
          <h2>Start Your <span className={styles.gradient}>Journey</span></h2>
          <p>Fill in the details below — it only takes 3 minutes</p>
        </div>

        <div className={styles.formCard}>

          {/* Step Progress */}
          <div className={styles.stepProgress}>
            <div className={styles.step}>
              <div className={`${styles.stepCircle} ${step >= 1 ? styles.active : ''} ${step > 1 ? styles.done : ''}`}>
                {step > 1 ? <FiCheck size={16} /> : '01'}
              </div>
              <span className={`${styles.stepLabel} ${step === 1 ? styles.active : ''}`}>Personal Info</span>
            </div>
            <div className={`${styles.stepLine} ${step > 1 ? styles.done : ''}`}></div>
            <div className={styles.step}>
              <div className={`${styles.stepCircle} ${step === 2 ? styles.active : ''}`}>
                02
              </div>
              <span className={`${styles.stepLabel} ${step === 2 ? styles.active : ''}`}>Role & Resume</span>
            </div>
          </div>

          {/* Alerts */}
          {success && (
            <div className={styles.success}>
              <FiCheckCircle size={18} /> {success}
            </div>
          )}
          {error && (
            <div className={styles.error}>
              <FiAlertCircle size={18} /> {error}
            </div>
          )}

          {/* ===== STEP 1: Personal Information ===== */}
          {step === 1 && (
            <div>
              <div className={styles.formGrid2}>
                <div className={styles.formField}>
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formField}>
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. rahul@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formField}>
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formField}>
                  <label>Highest Qualification *</label>
                  <input
                    type="text"
                    name="qualification"
                    placeholder="e.g. B.Tech, BCA, MCA"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formField}>
                  <label>Course / Stream *</label>
                  <input
                    type="text"
                    name="course"
                    placeholder="e.g. Computer Science"
                    value={formData.course}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formField}>
                  <label>Passing Year *</label>
                  <input
                    type="text"
                    name="passingYear"
                    placeholder="e.g. 2025 or 2026"
                    value={formData.passingYear}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <span style={{ fontSize: '0.84rem', color: '#94a3b8' }}>* Required fields</span>
                <button type="button" className={styles.nextBtn} onClick={goToStep2}>
                  Next Step <FiArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ===== STEP 2: Role, Skills & Resume ===== */}
          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid2}>
                <div className={styles.formField}>
                  <label>Internship Role *</label>
                  <select name="internshipRole" value={formData.internshipRole} onChange={handleChange} required>
                    <option value="">Select a role</option>
                    {internshipRoles.map((role) => (
                      <option key={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.formField}>
                  <label>Preferred Duration</label>
                  <select name="duration" value={formData.duration} onChange={handleChange}>
                    <option>3 months</option>
                    <option>6 months</option>
                    <option>12 months</option>
                  </select>
                </div>
              </div>

              <div className={styles.formField}>
                <label>Skills (comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  placeholder="e.g. React, Node.js, Figma, Python"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGrid2}>
                <div className={styles.formField}>
                  <label>Portfolio / GitHub URL</label>
                  <input
                    type="url"
                    name="portfolioUrl"
                    placeholder="https://github.com/yourname"
                    value={formData.portfolioUrl}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formField}>
                  <label>LinkedIn Profile URL</label>
                  <input
                    type="url"
                    name="linkedinUrl"
                    placeholder="https://linkedin.com/in/yourname"
                    value={formData.linkedinUrl}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.formField}>
                <label>Why do you want to join this internship?</label>
                <textarea
                  name="whyJoin"
                  rows={4}
                  placeholder="Tell us about your goals, interests, and what you hope to achieve..."
                  value={formData.whyJoin}
                  onChange={handleChange}
                />
              </div>

              {/* File Upload */}
              <div className={styles.fileUpload}>
                <label>Upload Resume *</label>
                <div
                  className={styles.fileArea}
                  onClick={() => document.getElementById('resumeInput').click()}
                >
                  <div className={styles.fileAreaInner}>
                    <div className={styles.fileAreaIcon}>
                      <FiUpload size={22} />
                    </div>
                    <p className={styles.fileAreaText}>
                      <strong>Click to upload</strong> or drag & drop your resume
                    </p>
                    <small>PDF, DOC, DOCX — Max 5MB</small>
                  </div>
                  <input
                    type="file"
                    id="resumeInput"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </div>
                {fileName && (
                  <div className={styles.fileChosen}>
                    <span><FiFileText size={14} style={{ marginRight: 6 }} />{fileName}</span>
                    <button type="button" className={styles.fileRemove} onClick={removeFile}>
                      <FiX size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div className={styles.formActions}>
                <button type="button" className={styles.backBtn} onClick={() => { setStep(1); setError(''); }}>
                  ← Back
                </button>
                <button type="submit" disabled={loading} className={styles.submitBtn} style={{ width: 'auto', padding: '14px 44px' }}>
                  {loading ? 'Submitting...' : 'Submit Application'} <FiSend size={16} />
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
};

// ==================== COMPONENT 6: FAQ Section ====================
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'What is the minimum hours requirement per week?',
      a: 'Part-time roles typically require 10–20 hours per week depending on the role. We work with your schedule and offer full flexibility on timings.',
    },
    {
      q: 'Can I work remotely from anywhere in India?',
      a: 'Yes! All our part-time roles are 100% remote. You can work from your home, hostel, café — wherever youre comfortable.',
    },
    {
      q: 'Is there a path to full-time employment after internship?',
      a: 'Absolutely. Over 70% of our full-time employees started as part-time interns. We actively promote from within.',
    },
    {
      q: 'How and when will I be paid?',
      a: 'Stipends are paid monthly via direct bank transfer. Rates range from ₹3,000 to ₹15,000/month based on your role and performance.',
    },
    {
      q: 'Do you provide training or onboarding?',
      a: 'Yes. All selected interns receive a structured onboarding, access to our internal LMS, and are assigned a dedicated mentor.',
    },
    {
      q: 'What is the full selection process?',
      a: 'Application Review → Shortlisting Call (15 min) → Skill Assignment → Offer Letter. The entire process takes 5–7 business days.',
    },
  ];

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>❓ FAQs</span>
          <h2>Frequently Asked <span className={styles.gradient}>Questions</span></h2>
          <p>Everything you need to know before applying</p>
        </div>
        <div className={styles.faqGrid}>
          {faqs.map((faq, idx) => (
            <div key={idx} className={styles.faqCard}>
              <button
                className={styles.faqQuestion}
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span>{faq.q}</span>
                <FiChevronRight
                  className={`${styles.faqIcon} ${openIndex === idx ? styles.rotate : ''}`}
                  size={18}
                />
              </button>
              <div className={`${styles.faqAnswer} ${openIndex === idx ? styles.open : ''}`}>
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== COMPONENT 7: CTA Section ====================
const CTASection = () => {
  const scrollToForm = () =>
    document.getElementById('applicationForm')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <div className={styles.ctaContent}>
          <h2>Ready to Begin Your<br />Tech Career?</h2>
          <p>
            500+ students have already launched their careers with us. Don't miss your chance —
            apply today and get a response within 48 hours.
          </p>
          <button className={styles.ctaPrimary} onClick={scrollToForm}>
            Apply for Free <FiArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

// ==================== MAIN EXPORT ====================
const PartTime = () => {
  return (
    <div className={styles.page}>
      <HeroSection />
      <StatsStrip />
      <BenefitsSection />
      <RolesSection />
      <ApplicationForm />
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default PartTime;