import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './FullTimeJob.module.css';
import API_CONFIG from '../../../config/api';
import {
  FiArrowRight, FiCheckCircle, FiClock, FiStar, FiAward,
  FiZap, FiTrendingUp, FiUsers, FiGlobe, FiHeadphones,
  FiTarget, FiShield, FiRefreshCw, FiServer,
  FiCloud, FiMonitor, FiMail, FiPhone,
  FiMapPin, FiDollarSign, FiCode,
  FiDatabase, FiActivity, FiGrid, FiBarChart2,
  FiMessageSquare, FiLayers, FiSettings, FiLifeBuoy,
  FiPackage, FiFileText, FiBookOpen,
  FiGitMerge, FiLink,
  FiEye, FiSearch, FiClipboard, FiBriefcase,
  FiChevronDown, FiChevronUp, FiHexagon,
  FiMousePointer, FiHardDrive, FiWifi,
  FiPlay, FiBook, FiVideo,
  FiUserCheck, FiCalendar, FiCpu, FiTool,
  FiSmartphone, FiCamera, FiPenTool, FiLayout,
  FiCompass, FiThumbsUp, FiCoffee, FiSmile,
  FiSend, FiUpload, FiLoader,
  FiAlertCircle, FiX, FiDownload, FiPaperclip
} from 'react-icons/fi';
import WaveCanvas from '../../../Pages/Home/Wavecanvas';

/* ==================== CANVAS ANIMATION ==================== */
const CareerCanvas = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.3 + 0.05;
        this.color = ['10b981', '3b82f6', '8b5cf6', '06b6d4'][Math.floor(Math.random() * 4)];
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }
      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `#${this.color}${Math.floor(this.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 40 }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => { p.update(); p.draw(ctx); });
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvasAnimation} />;
};

/* ==================== ANIMATED COUNTER ==================== */
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const numValue = parseInt(value);
            if (isNaN(numValue)) { setCount(value); return; }
            const startTime = Date.now();
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(numValue * eased));
              if (progress < 1) requestAnimationFrame(animate);
              else setCount(numValue);
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return <span ref={elementRef}>{count}{value.toString().replace(/[0-9]/g, '')}</span>;
};

/* ==================== JOB APPLICATION FORM MODAL ==================== */
const JobApplicationForm = ({ selectedJob, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: selectedJob || '',
    experience: '',
    currentCompany: '',
    currentCTC: '',
    expectedCTC: '',
    noticePeriod: '',
    skills: '',
    portfolioUrl: '',
    linkedinUrl: '',
    coverLetter: ''
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        setResumeFile(null);
        setFileName('');
        return;
      }
      
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      if (!allowedTypes.includes(file.type)) {
        setError('Please upload PDF or DOC/DOCX files only');
        setResumeFile(null);
        setFileName('');
        return;
      }

      setResumeFile(file);
      setFileName(file.name);
      setError('');
    }
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!resumeFile) {
      setError('Please upload your resume');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      
      // Append all text fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      // Append resume file
      formDataToSend.append('resume', resumeFile);

      const response = await fetch(`${API_CONFIG.BASE_URL}/api/fulltime-job/apply`, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT || 30000)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Reset form after success
        setTimeout(() => {
          onClose();
          setSuccess(false);
        }, 4000);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      if (err.name === 'TimeoutError') {
        setError('Request timed out. Please try again.');
      } else if (err.name === 'AbortError') {
        setError('Request was cancelled. Please try again.');
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Success state
  if (success) {
    return (
      <div className={styles.formOverlay}>
        <div className={styles.formContainer}>
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>
              <FiCheckCircle size={80} color="#10b981" />
            </div>
            <h2>Application Submitted Successfully! </h2>
            <p>Thank you for your interest. Our HR team will review your application and resume, and get back to you within 48 hours.</p>
            <p className={styles.successSub}>Check your email for confirmation</p>
            <button onClick={onClose} className={styles.closeBtn}>
              Close Window
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formOverlay}>
      <div className={styles.formContainer}>
        {/* Form Header */}
        <div className={styles.formHeader}>
          <div>
            <h2>Job Application Form</h2>
            <p>Apply for: <strong>{selectedJob || 'Open Position'}</strong></p>
          </div>
          <button onClick={onClose} className={styles.closeIconBtn}>
            <FiX size={24} />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className={styles.errorAlert}>
            <FiAlertCircle size={20} />
            <span>{error}</span>
            <button onClick={() => setError('')} className={styles.errorClose}>
              <FiX size={16} />
            </button>
          </div>
        )}

        {/* Application Form */}
        <form onSubmit={handleSubmit} className={styles.applicationForm}>
          <div className={styles.formSection}>
            <h3 className={styles.formSectionTitle}>
              <FiUserCheck size={18} /> Personal Information
            </h3>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Full Name *</label>
                <input 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  placeholder="Enter your full name" 
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="your.email@example.com" 
                  required 
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="+1 234 567 8900" 
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Position Applying For *</label>
                <select 
                  name="position" 
                  value={formData.position} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select Position</option>
                  <option value="Senior React Developer">Senior React Developer</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="DevOps Engineer">DevOps Engineer</option>
                  <option value="Cloud Architect">Cloud Architect</option>
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="QA Engineer">QA Engineer</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h3 className={styles.formSectionTitle}>
              <FiBriefcase size={18} /> Professional Details
            </h3>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Total Experience *</label>
                <select 
                  name="experience" 
                  value={formData.experience} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select Experience</option>
                  <option value="0-1 Years">0-1 Years (Fresher)</option>
                  <option value="1-3 Years">1-3 Years</option>
                  <option value="3-5 Years">3-5 Years</option>
                  <option value="5-8 Years">5-8 Years</option>
                  <option value="8-12 Years">8-12 Years</option>
                  <option value="12+ Years">12+ Years</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Current Company</label>
                <input 
                  type="text" 
                  name="currentCompany" 
                  value={formData.currentCompany} 
                  onChange={handleChange} 
                  placeholder="Current employer (optional)" 
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Current CTC (LPA)</label>
                <input 
                  type="text" 
                  name="currentCTC" 
                  value={formData.currentCTC} 
                  onChange={handleChange} 
                  placeholder="e.g., 12 LPA" 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Expected CTC (LPA) *</label>
                <input 
                  type="text" 
                  name="expectedCTC" 
                  value={formData.expectedCTC} 
                  onChange={handleChange} 
                  placeholder="e.g., 18 LPA" 
                  required 
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Notice Period *</label>
                <select 
                  name="noticePeriod" 
                  value={formData.noticePeriod} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select Notice Period</option>
                  <option value="Immediate">Immediate Joining</option>
                  <option value="15 Days">15 Days</option>
                  <option value="30 Days">30 Days</option>
                  <option value="60 Days">60 Days</option>
                  <option value="90 Days">90 Days</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Key Skills * (comma separated)</label>
                <input 
                  type="text" 
                  name="skills" 
                  value={formData.skills} 
                  onChange={handleChange} 
                  placeholder="React, Node.js, AWS, Docker" 
                  required 
                />
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h3 className={styles.formSectionTitle}>
              <FiLink size={18} /> Online Presence
            </h3>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Portfolio / GitHub URL</label>
                <input 
                  type="url" 
                  name="portfolioUrl" 
                  value={formData.portfolioUrl} 
                  onChange={handleChange} 
                  placeholder="https://github.com/yourusername" 
                />
              </div>
              <div className={styles.formGroup}>
                <label>LinkedIn Profile URL</label>
                <input 
                  type="url" 
                  name="linkedinUrl" 
                  value={formData.linkedinUrl} 
                  onChange={handleChange} 
                  placeholder="https://linkedin.com/in/yourprofile" 
                />
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h3 className={styles.formSectionTitle}>
              <FiFileText size={18} /> Additional Information
            </h3>

            <div className={styles.formGroup}>
              <label>Cover Letter</label>
              <textarea 
                name="coverLetter" 
                value={formData.coverLetter} 
                onChange={handleChange} 
                placeholder="Tell us why you're a great fit for this role... (optional)" 
                rows={4} 
              />
            </div>

            {/* Resume Upload */}
            <div className={styles.formGroup}>
              <label>Upload Resume * (PDF or DOC/DOCX, Max 5MB)</label>
              <div className={styles.fileUploadArea}>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  id="resume" 
                  onChange={handleFileChange} 
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className={styles.fileInput}
                />
                {!fileName ? (
                  <label htmlFor="resume" className={styles.fileUploadLabel}>
                    <FiUpload size={32} />
                    <span className={styles.fileUploadText}>Click to upload your resume</span>
                    <span className={styles.fileUploadHint}>PDF, DOC, DOCX • Max 5MB</span>
                  </label>
                ) : (
                  <div className={styles.fileSelected}>
                    <div className={styles.fileInfo}>
                      <FiPaperclip size={24} />
                      <div>
                        <span className={styles.fileName}>{fileName}</span>
                        <span className={styles.fileSize}>
                          {(resumeFile.size / 1024).toFixed(1)} KB
                        </span>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={handleRemoveFile} 
                      className={styles.removeFileBtn}
                    >
                      <FiX size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className={styles.submitBtn} 
            disabled={loading}
          >
            {loading ? (
              <>
                <FiLoader size={20} className={styles.spinner} />
                Submitting Application...
              </>
            ) : (
              <>
                <FiSend size={20} />
                Submit Application
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

/* ==================== MAIN FULL TIME JOB COMPONENT ==================== */
const FullTimeJob = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('All');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: '200+', label: 'Active Employees', desc: 'Across 4 Countries', icon: FiUsers },
    { value: '50+', label: 'Open Positions', desc: 'Engineering & Design', icon: FiBriefcase },
    { value: '98%', label: 'Employee Satisfaction', desc: 'Glassdoor Rating', icon: FiSmile },
    { value: '15+', label: 'Years of Excellence', desc: 'Industry Leadership', icon: FiAward }
  ];

  const jobOpenings = [
    {
      title: 'Senior React Developer',
      department: 'Engineering',
      location: 'New York',
      type: 'Full-Time',
      experience: '5-8 Years',
      salary: '$120K - $160K',
      positions: 2,
      description: 'We are looking for an experienced React developer to build next-generation web applications. You will work on scalable frontend architecture and mentor junior developers.',
      requirements: ['React.js', 'TypeScript', 'Redux', 'Node.js', 'REST APIs', 'Agile/Scrum'],
      color: '#3b82f6'
    },
    {
      title: 'Full Stack Developer',
      department: 'Engineering',
      location: 'Mumbai',
      type: 'Full-Time',
      experience: '3-5 Years',
      salary: '₹15L - ₹25L',
      positions: 3,
      description: 'Join our engineering team to build scalable full-stack applications using MERN stack. Work on end-to-end features from database to UI.',
      requirements: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker', 'CI/CD'],
      color: '#8b5cf6'
    },
    {
      title: 'DevOps Engineer',
      department: 'Infrastructure',
      location: 'London',
      type: 'Full-Time',
      experience: '3-6 Years',
      salary: '£55K - £75K',
      positions: 1,
      description: 'Manage and improve our cloud infrastructure, CI/CD pipelines, and deployment automation for microservices architecture.',
      requirements: ['AWS/Azure', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'Linux'],
      color: '#06b6d4'
    },
    {
      title: 'Data Scientist',
      department: 'Data & Analytics',
      location: 'Singapore',
      type: 'Full-Time',
      experience: '3-7 Years',
      salary: 'SGD 80K - 120K',
      positions: 2,
      description: 'Work on complex data problems and build ML models that drive business decisions. Analyze large datasets and create predictive models.',
      requirements: ['Python', 'TensorFlow', 'SQL', 'Spark', 'Statistics', 'ML Algorithms'],
      color: '#10b981'
    },
    {
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'New York',
      type: 'Full-Time',
      experience: '2-5 Years',
      salary: '$90K - $130K',
      positions: 1,
      description: 'Create beautiful and intuitive user experiences for our products. Conduct user research and translate insights into design solutions.',
      requirements: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
      color: '#f59e0b'
    },
    {
      title: 'Project Manager',
      department: 'Management',
      location: 'Mumbai',
      type: 'Full-Time',
      experience: '6-10 Years',
      salary: '₹20L - ₹35L',
      positions: 1,
      description: 'Lead cross-functional teams to deliver complex technical projects on time and within budget. Drive Agile transformation.',
      requirements: ['Agile/Scrum', 'JIRA', 'Risk Management', 'Stakeholder Mgmt', 'PMP Preferred'],
      color: '#ef4444'
    },
    {
      title: 'Cloud Architect',
      department: 'Infrastructure',
      location: 'London',
      type: 'Full-Time',
      experience: '8-12 Years',
      salary: '£80K - £110K',
      positions: 1,
      description: 'Design and implement enterprise cloud architectures for large-scale applications. Lead cloud migration and optimization initiatives.',
      requirements: ['AWS', 'Azure', 'GCP', 'Microservices', 'Security', 'Cost Optimization'],
      color: '#ec4899'
    },
    {
      title: 'QA Automation Engineer',
      department: 'Engineering',
      location: 'Singapore',
      type: 'Full-Time',
      experience: '3-6 Years',
      salary: 'SGD 60K - 90K',
      positions: 2,
      description: 'Build automated testing frameworks and ensure product quality. Create comprehensive test strategies for web and mobile applications.',
      requirements: ['Selenium', 'Cypress', 'Java', 'Python', 'CI/CD', 'Performance Testing'],
      color: '#14b8a6'
    }
  ];

  const benefits = [
    { icon: FiDollarSign, title: 'Competitive Salary', desc: 'Best in industry compensation with annual performance bonuses and stock options' },
    { icon: FiShield, title: 'Health Insurance', desc: 'Comprehensive health, dental, and vision coverage for you and your family members' },
    { icon: FiClock, title: 'Flexible Hours', desc: 'Work when youre most productive with flexible scheduling and hybrid work options' },
    { icon: FiBookOpen, title: 'Learning Budget', desc: '$2,000 annual budget for courses, certifications, conferences, and professional development' },
    { icon: FiCoffee, title: 'Free Meals & Snacks', desc: 'Complimentary breakfast, lunch, and unlimited snacks at all our office locations daily' },
    { icon: FiSmile, title: 'Wellness Programs', desc: 'Gym membership, mental health support, yoga sessions, and regular wellness activities' }
  ];

  const hiringProcess = [
    { step: '01', title: 'Apply Online', desc: 'Submit your resume and application through our career portal with relevant details', icon: FiSend },
    { step: '02', title: 'HR Screening', desc: 'Initial 30-min call with HR to discuss your background, experience, and expectations', icon: FiPhone },
    { step: '03', title: 'Technical Interview', desc: 'Technical assessment and coding interview with senior engineering team members', icon: FiCode },
    { step: '04', title: 'Final Interview', desc: 'Meeting with department head and team leads for cultural fit and leadership assessment', icon: FiUsers },
    { step: '05', title: 'Offer & Onboarding', desc: 'Receive offer letter, sign documents, and begin your exciting career journey with us', icon: FiAward }
  ];

  const faqs = [
    {
      question: 'What is the interview process like?',
      answer: 'Our interview process includes 4-5 rounds: initial HR screening (30 mins), technical assessment or coding challenge, 1-2 technical interviews with the team (60 mins each), and a final cultural fit interview with department leadership. The entire process typically takes 1-2 weeks from application to offer. We keep you informed at every stage.'
    },
    {
      question: 'Do you offer remote or hybrid work options?',
      answer: 'Yes! We offer flexible work arrangements including hybrid (2-3 days in office) and fully remote options for most positions. Our offices in New York, London, Mumbai, and Singapore are equipped with modern facilities. Remote employees receive home office setup allowance and regular team meetups.'
    },
    {
      question: 'What benefits and perks do you provide?',
      answer: 'We provide comprehensive benefits including competitive salary with annual bonuses, health/dental/vision insurance, 25 days PTO, flexible work hours, $2,000 annual learning budget, free meals, gym membership, mental health support, 401(k) matching, parental leave (16 weeks), and stock options for senior roles.'
    },
    {
      question: 'Is there a probation period for new employees?',
      answer: 'Yes, there is a standard 3-month probation period during which you receive full salary and all benefits. During this time, you will work on real projects with dedicated mentorship support. We provide regular feedback sessions. 95% of our employees successfully complete probation and continue building their careers with us.'
    },
    {
      question: 'How do you support employee career growth?',
      answer: 'We invest heavily in career development through mentorship programs with senior leaders, paid certifications (AWS, Azure, PMP, etc.), conference sponsorship, internal tech talks and hackathons, clear promotion frameworks with defined milestones, and regular 1-on-1s with managers to create personalized development plans.'
    }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const filteredJobs = jobOpenings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.requirements.some(r => r.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = filterLocation === 'All' || job.location === filterLocation;
    const matchesType = filterType === 'All' || job.type === filterType;
    return matchesSearch && matchesLocation && matchesType;
  });

  const locations = ['All', ...new Set(jobOpenings.map(j => j.location))];
  const types = ['All', ...new Set(jobOpenings.map(j => j.type))];

  return (
    <div className={styles.page}>
      <CareerCanvas />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <WaveCanvas/>
        <div className={styles.container}>
          <div className={styles.heroContent} data-animate="hero">
            <div className={styles.heroBadge}>
              <FiBriefcase size={16} />
              Join Our Growing Team
              <FiBriefcase size={16} />
            </div>
            <h1 className={styles.heroTitle}>
              Find Your Dream{" "}
              <span className={styles.gradientText}>Full-Time Job</span>
            </h1>
            <p className={styles.heroDesc}>
              Explore exciting career opportunities with leading technology companies. 
              We connect talented professionals with roles that match their skills, experience, and aspirations.
            </p>
            <p className={styles.heroDesc}>
              Multiple openings across Engineering, Design, Data Science, DevOps, and Management 
              with competitive salaries, comprehensive benefits, and growth opportunities.
            </p>

            {/* Stats */}
            <div className={styles.heroStatsGrid}>
              {stats.map((stat, idx) => (
                <div key={idx} className={styles.heroStatCard} style={{ animationDelay: `${idx * 0.15}s` }}>
                  <div className={styles.heroStatIcon}>
                    <stat.icon size={28} />
                  </div>
                  <div className={styles.heroStatInfo}>
                    <span className={styles.heroStatValue}>
                      <AnimatedCounter value={stat.value} />
                    </span>
                    <span className={styles.heroStatLabel}>{stat.label}</span>
                    <span className={styles.heroStatDesc}>{stat.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.heroButtons}>
              <a href="#openings" className={styles.btnPrimary}>
                View Open Positions <FiArrowRight size={20} />
              </a>
              <button onClick={() => { setSelectedJob(''); setShowForm(true); }} className={styles.btnSecondary}>
                <FiSend size={18} />
                Submit Resume
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefits}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} data-animate="section-header">
            <div className={styles.sectionBadge}>
              <FiStar size={16} />
              <span>Why Join Us</span>
              <FiStar size={16} />
            </div>
            <h2 className={styles.sectionTitle}>
              Amazing <span className={styles.gradientText}>Benefits & Perks</span>
            </h2>
            <p className={styles.sectionDesc}>
              We take care of our team members with industry-leading benefits and a supportive work culture
            </p>
          </div>
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, idx) => (
              <div key={idx} className={styles.benefitCard} data-animate={`benefit-${idx}`}>
                <div className={styles.benefitIcon}>
                  <benefit.icon size={32} />
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className={styles.openings} id="openings">
        <div className={styles.container}>
          <div className={styles.sectionHeader} data-animate="section-header">
            <div className={styles.sectionBadge}>
              <FiBriefcase size={16} />
              <span>Current Openings</span>
              <FiBriefcase size={16} />
            </div>
            <h2 className={styles.sectionTitle}>
              Explore <span className={styles.gradientText}>Open Positions</span>
            </h2>
            <p className={styles.sectionDesc}>
              Find the perfect role that matches your skills, experience, and career goals
            </p>
          </div>

          {/* Filters */}
          <div className={styles.filters}>
            <div className={styles.searchBox}>
              <FiSearch size={18} />
              <input
                type="text"
                placeholder="Search by title, skill, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} className={styles.filterSelect}>
              {locations.map(loc => <option key={loc} value={loc}>{loc === 'All' ? '📍 All Locations' : `📍 ${loc}`}</option>)}
            </select>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className={styles.filterSelect}>
              {types.map(type => <option key={type} value={type}>{type === 'All' ? 'All Types' : type}</option>)}
            </select>
          </div>

          {/* Job Grid */}
          <div className={styles.jobGrid}>
            {filteredJobs.map((job, idx) => (
              <div key={idx} className={styles.jobCard} data-animate={`job-${idx}`}>
                <div className={styles.jobCardHeader}>
                  <div className={styles.jobIcon} style={{ background: `${job.color}15`, color: job.color }}>
                    <FiBriefcase size={24} />
                  </div>
                  <div className={styles.jobMeta}>
                    <span className={styles.jobType} style={{ background: `${job.color}15`, color: job.color }}>
                      {job.type}
                    </span>
                    <span className={styles.jobLocation}>
                      <FiMapPin size={12} /> {job.location}
                    </span>
                  </div>
                </div>
                <h3>{job.title}</h3>
                <p className={styles.jobDepartment}>{job.department} • {job.positions} Position{job.positions > 1 ? 's' : ''}</p>
                <p className={styles.jobDescription}>{job.description}</p>
                <div className={styles.jobRequirements}>
                  {job.requirements.map((req, rIdx) => (
                    <span key={rIdx} className={styles.reqTag}>{req}</span>
                  ))}
                </div>
                <div className={styles.jobFooter}>
                  <div className={styles.jobFooterInfo}>
                    <span><FiClock size={14} /> {job.experience}</span>
                    <span><FiDollarSign size={14} /> {job.salary}</span>
                  </div>
                  <button
                    className={styles.applyBtn}
                    style={{ background: job.color }}
                    onClick={() => { setSelectedJob(job.title); setShowForm(true); }}
                  >
                    Apply Now <FiArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className={styles.process}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} data-animate="section-header">
            <div className={styles.sectionBadge}>
              <FiGitMerge size={16} />
              <span>Hiring Process</span>
              <FiGitMerge size={16} />
            </div>
            <h2 className={styles.sectionTitle}>
              Our <span className={styles.gradientText}>Hiring Journey</span>
            </h2>
            <p className={styles.sectionDesc}>
              A transparent, efficient, and candidate-friendly recruitment process
            </p>
          </div>
          <div className={styles.processGrid}>
            {hiringProcess.map((step, idx) => (
              <div key={idx} className={styles.processItem} data-animate={`process-${idx}`}>
                <div className={styles.processNumber}>{step.step}</div>
                <div className={styles.processIconWrap}>
                  <step.icon size={24} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                {idx < hiringProcess.length - 1 && (
                  <div className={styles.processArrow}>
                    <FiArrowRight size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} data-animate="section-header">
            <div className={styles.sectionBadge}>
              <FiMessageSquare size={16} />
              <span>FAQ</span>
              <FiMessageSquare size={16} />
            </div>
            <h2 className={styles.sectionTitle}>
              Frequently Asked <span className={styles.gradientText}>Questions</span>
            </h2>
            <p className={styles.sectionDesc}>
              Everything you need to know about working with us
            </p>
          </div>
          <div className={styles.faqGrid}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`${styles.faqItem} ${activeFaq === idx ? styles.faqActive : ''}`}
                onClick={() => toggleFaq(idx)}
                data-animate={`faq-${idx}`}
              >
                <div className={styles.faqHeader}>
                  <h3>{faq.question}</h3>
                  <div className={styles.faqIcon}>
                    {activeFaq === idx ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                  </div>
                </div>
                <div className={styles.faqContent}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaWrapper} data-animate="cta">
            <div className={styles.ctaContent}>
              <div className={styles.ctaBadge}>
                <FiZap size={14} /> Start Your Journey Today
              </div>
              <h2>Ready to Take the Next Step in Your Career?</h2>
              <p>
                Join a team of passionate technologists building innovative solutions that impact millions of users.
                Submit your resume and let's explore how you can contribute to our exciting projects.
              </p>
              <p>
                We review every application personally and respond within 48 hours. Your dream job is just one click away!
              </p>
              <div className={styles.ctaButtons}>
                <button onClick={() => { setSelectedJob(''); setShowForm(true); }} className={styles.ctaBtnPrimary}>
                  <FiUpload size={20} />
                  Upload Resume & Apply Now <FiArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      {showForm && (
        <JobApplicationForm
          selectedJob={selectedJob}
          onClose={() => { setShowForm(false); setSelectedJob(''); }}
        />
      )}

  
    </div>
  );
};

export default FullTimeJob;