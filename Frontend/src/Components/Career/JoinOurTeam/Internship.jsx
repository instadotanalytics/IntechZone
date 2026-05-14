// Components/Career/JoinOurTeam/Internship.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Internship.module.css';
import ApiService from '../../../utils/apiService';

import {
  FiArrowRight, FiChevronRight, FiSend, FiUpload, FiX,
  FiCheckCircle, FiAlertCircle, FiUsers, FiStar,
  FiTrendingUp, FiZap, FiAward, FiDollarSign, FiGlobe,
  FiClock, FiShield, FiTarget, FiCode, FiSmartphone,
  FiEdit2, FiBarChart2, FiServer, FiLock,
} from 'react-icons/fi';
import WaveCanvas from '../../../Pages/Home/Wavecanvas';

/* ─────────────────────────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────────────────────────── */
const ROLES = [
  {
    icon: FiCode,        name: 'Web Development',   color: '#3b82f6', bg: '#eff6ff',
    stipend: '₹5k–15k/mo', openings: 12, tags: ['React', 'Node', 'Full Stack'],
  },
  {
    icon: FiSmartphone,  name: 'App Development',   color: '#10b981', bg: '#f0fdf4',
    stipend: '₹5k–15k/mo', openings: 8,  tags: ['Flutter', 'React Native'],
  },
  {
    icon: FiTrendingUp,  name: 'Digital Marketing', color: '#f59e0b', bg: '#fffbeb',
    stipend: '₹3k–10k/mo', openings: 10, tags: ['SEO', 'SEM', 'Analytics'],
  },
  {
    icon: FiEdit2,       name: 'Graphic Design',    color: '#ec4899', bg: '#fdf2f8',
    stipend: '₹4k–12k/mo', openings: 6,  tags: ['Figma', 'Illustrator'],
  },
  {
    icon: FiEdit2,       name: 'Content Writing',   color: '#8b5cf6', bg: '#f5f3ff',
    stipend: '₹3k–8k/mo',  openings: 8,  tags: ['Blog', 'Copywriting'],
  },
  {
    icon: FiBarChart2,   name: 'Data Analytics',    color: '#ef4444', bg: '#fef2f2',
    stipend: '₹6k–18k/mo', openings: 5,  tags: ['Python', 'SQL', 'Tableau'],
  },
  {
    icon: FiServer,      name: 'Cloud Computing',   color: '#06b6d4', bg: '#ecfeff',
    stipend: '₹7k–20k/mo', openings: 4,  tags: ['AWS', 'Azure', 'GCP'],
  },
  {
    icon: FiLock,        name: 'Cybersecurity',     color: '#dc2626', bg: '#fef2f2',
    stipend: '₹8k–22k/mo', openings: 3,  tags: ['Ethical Hacking', 'VAPT'],
  },
];

const BENEFITS = [
  { icon: FiZap,        title: 'Live Project Experience',  desc: 'Work on real client projects from day one, not dummy assignments.' },
  { icon: FiUsers,      title: 'Expert Mentors',           desc: 'Get guidance from industry professionals with 5+ years experience.' },
  { icon: FiAward,      title: 'Verified Certificate',     desc: 'Industry-recognized certification to boost your portfolio and LinkedIn.' },
  { icon: FiDollarSign, title: 'Performance Stipend',      desc: 'Earn up to ₹22,000/month based on your role and contributions.' },
  { icon: FiGlobe,      title: 'Remote / Hybrid Mode',     desc: 'Flexible options — work from home or our Bhopal office.' },
  { icon: FiClock,      title: 'Flexible Duration',        desc: 'Choose 3, 6, or 12-month programs that fit your schedule.' },
  { icon: FiShield,     title: 'Letter of Recommendation', desc: 'Strong LOR from our directors to support your future career.' },
  { icon: FiTarget,     title: 'Placement Assistance',     desc: '90% of our interns get placed within 60 days of completion.' },
];

const HOW_STEPS = [
  { num: '01', title: 'Fill the Form',  desc: 'Complete the online application in under 5 minutes.' },
  { num: '02', title: 'Assessment',     desc: 'Clear a short online test relevant to your chosen role.' },
  { num: '03', title: 'Interview',      desc: 'Brief video call with our senior team members.' },
  { num: '04', title: 'Onboarding',     desc: 'Get your welcome kit, tools access, and start on Day 1.' },
];

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',  role: 'Web Dev Intern → Full-time Engineer',   initials: 'PS',
    gradient: 'linear-gradient(135deg,#3b82f6,#6366f1)',
    text: '"Intech Zone gave me real project experience from week one. The mentors were patient and the stipend was great. I got placed at a startup just 2 weeks after completing the internship!"',
  },
  {
    name: 'Arjun Verma',   role: 'Data Analytics Intern → Data Scientist', initials: 'AV',
    gradient: 'linear-gradient(135deg,#10b981,#06b6d4)',
    text: '"The structured curriculum and hands-on data projects transformed my understanding completely. This isn\'t just an internship — it\'s career acceleration."',
  },
  {
    name: 'Sneha Patel',   role: 'Design Intern → UI/UX Lead',             initials: 'SP',
    gradient: 'linear-gradient(135deg,#ec4899,#8b5cf6)',
    text: '"I came in knowing only Figma basics and left with a full design system portfolio. The weekly feedback sessions were invaluable for my growth."',
  },
];

const ROLES_LIST = [
  'Web Development', 'App Development', 'Digital Marketing', 'Graphic Design',
  'Content Writing', 'SEO', 'Data Analytics', 'Cloud Computing', 'Cybersecurity',
];

/* ─────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────── */
const HeroSection = () => {
  const scrollToForm = () =>
    document.getElementById('applicationForm')?.scrollIntoView({ behavior: 'smooth' });

  const features = [
    { emoji: '🏆', bg: '#fef9c3', title: '4.9★ Student Rating',  desc: 'Rated by 500+ past interns' },
    { emoji: '💼', bg: '#ffe4e6', title: '90% Placement Rate',    desc: 'Interns placed within 60 days' },
    { emoji: '🌐', bg: '#dbeafe', title: 'Remote / Hybrid Mode',  desc: 'Work from anywhere in India' },
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.heroBlob1} />
      <WaveCanvas/>
      <div className={styles.heroBlob2} />

      <div className={styles.heroGrid}>
        <div>
          <div className={styles.heroBadge}>
            Limited Slots — Batch Starting June 2025
          </div>

          <h1 className={styles.heroH1}>
            Launch Your Career With<br />
            <span className={styles.heroAccent}>Internship Program</span>
          </h1>

          <p className={styles.heroP}>
            Work on live client projects, get mentored by industry experts,
            earn a monthly stipend, and land your dream job — all in one program.
          </p>

          <div className={styles.heroStats}>
            {[
              ['500+', 'Interns Trained'],
              ['4.9★', 'Avg Rating'],
              ['90%',  'Placed'],
              ['₹22k', 'Max Stipend'],
            ].map(([n, l]) => (
              <div key={l} className={styles.statItem}>
                <span className={styles.statNum}>{n}</span>
                <span className={styles.statLabel}>{l}</span>
              </div>
            ))}
          </div>

          <button className={styles.ctaBtn} onClick={scrollToForm}>
            Apply Now — It's Free <FiArrowRight size={18} />
          </button>
        </div>

        <div className={styles.heroRight}>
          {features.map((f, i) => (
            <div key={i} className={styles.featureCard}>
              <div className={styles.featureIconWrap} style={{ background: f.bg }}>
                {f.emoji}
              </div>
              <div>
                <p className={styles.featureTitle}>{f.title}</p>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   AVAILABLE ROLES
───────────────────────────────────────────────────────────── */
const AvailableRoles = () => {
  const [hovered, setHovered] = useState(null);
  const scrollToForm = () =>
    document.getElementById('applicationForm')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <span className={styles.badge}>⚡ Open Positions</span>
          <h2 className={styles.h2}>
            Choose Your <span className={styles.gradientText}>Domain</span>
          </h2>
          <p className={styles.subtext}>8 specializations — pick the one that excites you most</p>
        </div>

        <div className={styles.rolesGrid}>
          {ROLES.map((role, i) => {
            const RoleIcon = role.icon;
            const isHovered = hovered === i;
            return (
              <div
                key={i}
                className={styles.roleCard}
                style={isHovered ? {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 20px 48px rgba(0,0,0,0.1)',
                  borderColor: '#6366f1',
                } : {}}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className={styles.roleIconWrap}
                  style={{ background: role.bg, color: role.color }}
                >
                  <RoleIcon size={26} />
                </div>

                <h3 className={styles.roleTitle}>{role.name}</h3>

                <div className={styles.roleMeta}>
                  <span
                    className={styles.roleTag}
                    style={{ background: role.bg, color: role.color }}
                  >
                    💰 {role.stipend}
                  </span>
                  <span className={styles.roleTag}>
                    <FiUsers size={11} style={{ marginRight: 4 }} />
                    {role.openings} seats
                  </span>
                </div>

                <div className={styles.roleSkillTags}>
                  {role.tags.map(t => (
                    <span key={t} className={styles.skillTag}>{t}</span>
                  ))}
                </div>

              
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   BENEFITS
───────────────────────────────────────────────────────────── */
const BenefitsSection = () => (
  <section className={styles.sectionAlt}>
    <div className={styles.container}>
      <div className={styles.sectionHead}>
        <span className={styles.badge}>🎁 What You Get</span>
        <h2 className={styles.h2}>
          Why <span className={styles.gradientText}>Intech Zone?</span>
        </h2>
        <p className={styles.subtext}>Not just an internship — a complete career launchpad</p>
      </div>

      <div className={styles.benefitsGrid}>
        {BENEFITS.map((b, i) => {
          const BIcon = b.icon;
          return (
            <div key={i} className={styles.benefitCard}>
              <div className={styles.benefitIconWrap}>
                <BIcon size={24} />
              </div>
              <h3 className={styles.benefitTitle}>{b.title}</h3>
              <p className={styles.benefitDesc}>{b.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────────────────────────── */
const HowItWorks = () => (
  <section className={styles.section}>
    <div className={styles.container}>
      <div className={styles.sectionHead}>
        <span className={styles.badge}>📋 Process</span>
        <h2 className={styles.h2}>
          How It <span className={styles.gradientText}>Works</span>
        </h2>
        <p className={styles.subtext}>Simple 4-step process from application to first day</p>
      </div>

      <div className={styles.timeline}>
        {HOW_STEPS.map((s, i) => (
          <div key={i} className={styles.timelineStep}>
            <div className={styles.stepNum}>{s.num}</div>
            <h3 className={styles.stepTitle}>{s.title}</h3>
            <p className={styles.stepDesc}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────────────────────── */
const TestimonialsSection = () => (
  <section className={styles.sectionAlt}>
    <div className={styles.container}>
      <div className={styles.sectionHead}>
        <span className={styles.badge}>💬 Success Stories</span>
        <h2 className={styles.h2}>
          Hear From Our <span className={styles.gradientText}>Alumni</span>
        </h2>
        <p className={styles.subtext}>Real interns, real results — straight from their experience</p>
      </div>

      <div className={styles.testimonialsGrid}>
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className={styles.testimonialCard}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, s) => (
                <FiStar key={s} size={16} fill="#f59e0b" stroke="#f59e0b" />
              ))}
            </div>
            <p className={styles.testimonialText}>{t.text}</p>
            <div className={styles.testimonialAuthor}>
              <div
                className={styles.avatar}
                style={{ background: t.gradient }}
              >
                {t.initials}
              </div>
              <div>
                <p className={styles.authorName}>{t.name}</p>
                <p className={styles.authorRole}>{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   2-STEP APPLICATION FORM
───────────────────────────────────────────────────────────── */
const ApplicationForm = () => {
  const navigate = useNavigate();
  const fileRef = useRef();

  const [step, setStep]                 = useState(1);
  const [loading, setLoading]           = useState(false);
  const [success, setSuccess]           = useState('');
  const [error, setError]               = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName]         = useState('');
  const [dragOver, setDragOver]         = useState(false);

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '',
    qualification: '', course: '', passingYear: '',
    internshipRole: '', duration: '3 months',
    skills: '', portfolioUrl: '', linkedinUrl: '', whyJoin: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleFile = (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError('File size must be less than 5MB'); return; }
    setSelectedFile(file);
    setFileName(file.name);
    setError('');
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    setFileName('');
  };

  const validateStep1 = () => {
    const { fullName, email, phone, qualification, course, passingYear } = formData;
    if (!fullName || !email || !phone || !qualification || !course || !passingYear) {
      setError('Please fill all required fields.'); return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Enter a valid email address.'); return false; }
    if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      setError('Enter a valid 10-digit phone number.'); return false;
    }
    return true;
  };

  const handleNext = () => {
    setError('');
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.internshipRole) { setError('Please select an internship role.'); return; }
    if (!selectedFile) { setError('Please upload your resume.'); return; }

    setLoading(true);
    const fd = new FormData();
    Object.keys(formData).forEach(k => formData[k] && fd.append(k, formData[k]));
    fd.append('resume', selectedFile);

    try {
      const response = await ApiService.submitInternshipApplication(fd);
      if (response.data.success) {
        setSuccess("🎉 Application submitted! We'll reach out within 48 hours.");
        setTimeout(() => navigate('/careers'), 3500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* stepper dot class helper */
  const dotClass = (s) => {
    if (s === step) return `${styles.stepDot} ${styles.stepDotActive}`;
    if (s < step)   return `${styles.stepDot} ${styles.stepDotDone}`;
    return styles.stepDot;
  };

  return (
    <section className={styles.formSection} id="applicationForm">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <span className={styles.badge}>📝 Apply Now</span>
          <h2 className={styles.h2}>
            Start Your <span className={styles.gradientText}>Journey</span>
          </h2>
          <p className={styles.subtext}>
            Takes less than 5 minutes. No fees. No hidden conditions.
          </p>
        </div>

        <div className={styles.formCard}>

          {/* ── Header ── */}
          <div className={styles.formHeader}>
            <div>
              <p className={styles.formHeaderTitle}>
                {step === 1 ? '👤 Personal Information' : '🎯 Role & Profile Details'}
              </p>
              <p className={styles.formHeaderSub}>
                Step {step} of 2 —{' '}
                {step === 1 ? 'Tell us about yourself' : 'Tell us about your goals'}
              </p>
            </div>
            <div className={styles.stepperWrap}>
              {[1, 2].map(s => (
                <div key={s} className={dotClass(s)}>
                  {step > s ? <FiCheckCircle size={14} /> : s}
                </div>
              ))}
            </div>
          </div>

          {/* ── Body ── */}
          <div className={styles.formBody}>

            {/* Progress bar */}
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: step === 1 ? '50%' : '100%' }}
              />
            </div>

            {success && (
              <div className={styles.alertSuccess}>
                <FiCheckCircle size={18} /> {success}
              </div>
            )}
            {error && (
              <div className={styles.alertError}>
                <FiAlertCircle size={18} /> {error}
              </div>
            )}

            {/* ── STEP 1 ── */}
            {step === 1 && (
              <div>
                <div className={styles.formGrid2}>
                  {[
                    { name: 'fullName',      label: 'Full Name',                         type: 'text'  },
                    { name: 'email',         label: 'Email Address',                     type: 'email' },
                    { name: 'phone',         label: 'Phone Number',                      type: 'tel'   },
                    { name: 'qualification', label: 'Qualification (B.Tech, BCA, MCA…)', type: 'text'  },
                    { name: 'course',        label: 'Course / Stream (CSE, IT…)',         type: 'text'  },
                    { name: 'passingYear',   label: 'Passing Year (e.g. 2025)',           type: 'text'  },
                  ].map(f => (
                    <div key={f.name} className={styles.field}>
                      <label className={styles.label}>{f.label} *</label>
                      <input
                        className={styles.input}
                        type={f.type}
                        name={f.name}
                        placeholder={f.label}
                        value={formData[f.name]}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className={styles.formActions}>
                  <button type="button" className={styles.btnPrimary} onClick={handleNext}>
                    Next Step <FiArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2 ── */}
            {step === 2 && (
              <form onSubmit={handleSubmit}>

                <div className={styles.formGrid2}>
                  <div className={styles.field}>
                    <label className={styles.label}>Internship Role *</label>
                    <select
                      className={styles.select}
                      name="internshipRole"
                      value={formData.internshipRole}
                      onChange={handleChange}
                      required
                    >
                      <option value="">— Select a role —</option>
                      {ROLES_LIST.map(r => <option key={r}>{r}</option>)}
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Internship Duration</label>
                    <select
                      className={styles.select}
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                    >
                      <option>3 months</option>
                      <option>6 months</option>
                      <option>12 months</option>
                    </select>
                  </div>
                </div>

                <div className={styles.fieldFull}>
                  <label className={styles.label}>Skills (comma-separated)</label>
                  <input
                    className={styles.input}
                    type="text"
                    name="skills"
                    placeholder="e.g. React, JavaScript, Python, Figma"
                    value={formData.skills}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.formGrid2}>
                  <div className={styles.field}>
                    <label className={styles.label}>Portfolio / GitHub URL</label>
                    <input
                      className={styles.input}
                      type="url"
                      name="portfolioUrl"
                      placeholder="https://github.com/yourname"
                      value={formData.portfolioUrl}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>LinkedIn URL</label>
                    <input
                      className={styles.input}
                      type="url"
                      name="linkedinUrl"
                      placeholder="https://linkedin.com/in/yourname"
                      value={formData.linkedinUrl}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles.fieldFull}>
                  <label className={styles.label}>Why do you want to join this internship?</label>
                  <textarea
                    className={styles.textarea}
                    name="whyJoin"
                    placeholder="Share your motivation, goals, and what you hope to achieve…"
                    rows={4}
                    value={formData.whyJoin}
                    onChange={handleChange}
                  />
                </div>

                {/* Drag & drop file upload */}
                <div className={styles.fieldFull}>
                  <label className={styles.label}>Resume (PDF / DOC) *</label>
                  <div
                    className={`${styles.fileArea} ${dragOver ? styles.fileAreaDrag : ''}`}
                    onClick={() => fileRef.current.click()}
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={e => {
                      e.preventDefault();
                      setDragOver(false);
                      handleFile(e.dataTransfer.files[0]);
                    }}
                  >
                    <input
                      type="file"
                      ref={fileRef}
                      accept=".pdf,.doc,.docx"
                      style={{ display: 'none' }}
                      onChange={e => handleFile(e.target.files[0])}
                    />

                    {!fileName ? (
                      <>
                        <span className={styles.fileIcon}>
                          <FiUpload size={32} color="#6366f1" />
                        </span>
                        <p className={styles.filePromptPrimary}>
                          <strong>Click to upload</strong> or drag &amp; drop
                        </p>
                        <p className={styles.filePromptSub}>PDF, DOC, DOCX · Max 5 MB</p>
                      </>
                    ) : (
                      <div className={styles.filePill}>
                        📄 {fileName}
                        <button
                          type="button"
                          className={styles.fileRemoveBtn}
                          onClick={removeFile}
                        >
                          <FiX size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    className={styles.btnSecondary}
                    onClick={() => { setStep(1); setError(''); }}
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className={styles.btnPrimary}
                    disabled={loading}
                  >
                    {loading
                      ? 'Submitting…'
                      : <> Submit Application <FiSend size={16} /></>
                    }
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────────────────────────── */
const CtaBanner = () => (
  <section className={styles.ctaBanner}>
    <div className={styles.container}>
      <h2 className={styles.ctaBannerH2}>Ready to Build Your Future?</h2>
      <p className={styles.ctaBannerP}>
        Join 500+ interns who launched their careers at Intech Zone.<br />
        Seats are limited — apply today before they fill up.
      </p>
      <button
        className={styles.ctaBtn}
        onClick={() =>
          document.getElementById('applicationForm')?.scrollIntoView({ behavior: 'smooth' })
        }
      >
        Apply Now — It's Free <FiArrowRight size={18} />
      </button>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────── */
const Internship = () => (
  <div className={styles.page}>
    <HeroSection />
    <AvailableRoles />
    <BenefitsSection />
    <HowItWorks />
    <TestimonialsSection />
    <ApplicationForm />
    <CtaBanner />
  </div>
);

export default Internship;