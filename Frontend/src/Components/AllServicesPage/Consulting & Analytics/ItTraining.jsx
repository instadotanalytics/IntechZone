import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './ItTraining.module.css';
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
  FiSun, FiMoon
} from 'react-icons/fi';
import WaveCanvas from '../../../Pages/Home/Wavecanvas';
import AllServicesForm from '../../../Pages/CompanyServices/AllServicesForm';
import TestimonialSection from '../../../Pages/Home/TestimonialSection';

/* ==================== CANVAS ANIMATION - GEOMETRIC PATTERN ==================== */
const GeometricCanvas = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    class Shape {
      constructor() {
        this.reset();
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 15 + 8;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.15 + 0.03;
        this.type = Math.floor(Math.random() * 3);
        this.color = ['#8b5cf6', '#06b6d4', '#10b981'][Math.floor(Math.random() * 3)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        if (this.x < -50 || this.x > width + 50) this.speedX *= -1;
        if (this.y < -50 || this.y > height + 50) this.speedY *= -1;
      }

      draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;

        switch (this.type) {
          case 0:
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            break;
          case 1:
            ctx.beginPath();
            ctx.moveTo(0, -this.size / 2);
            ctx.lineTo(this.size / 2, this.size / 2);
            ctx.lineTo(-this.size / 2, this.size / 2);
            ctx.closePath();
            ctx.fill();
            break;
          case 2:
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        ctx.restore();
      }
    }

    const shapes = Array.from({ length: 30 }, () => new Shape());

    const drawDottedGrid = () => {
      const spacing = 40;
      ctx.fillStyle = 'rgba(139, 92, 246, 0.06)';
      for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const drawMouseConnections = () => {
      shapes.forEach(shape => {
        const dist = Math.hypot(shape.x - mouseRef.current.x, shape.y - mouseRef.current.y);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(shape.x, shape.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 - dist / 1500})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      drawDottedGrid();
      shapes.forEach(shape => {
        shape.update();
        shape.draw(ctx);
      });
      drawMouseConnections();
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      shapes.forEach(s => s.reset());
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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
            if (isNaN(numValue)) {
              setCount(value);
              return;
            }
            const startTime = Date.now();
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(numValue * eased));
              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(numValue);
              }
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

/* ==================== MAIN IT TRAINING COMPONENT ==================== */
const ItTraining = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { value: '5000+', label: 'Professionals Trained', desc: 'Across 40+ Countries', icon: FiUsers },
    { value: '150+', label: 'Training Programs', desc: 'Beginner to Expert Level', icon: FiBook },
    { value: '98%', label: 'Certification Rate', desc: 'Industry-Recognized Certs', icon: FiAward },
    { value: '50+', label: 'Expert Trainers', desc: '15+ Years Experience', icon: FiUserCheck }
  ];

  const trainingPrograms = [
    {
      icon: FiCode,
      title: 'Full Stack Development',
      description: 'Master front-end and back-end development with React, Node.js, Python, and databases. Build real-world projects from scratch with hands-on mentorship from industry experts.',
      features: ['React & Next.js', 'Node.js & Express', 'Python & Django', 'Database Design', 'DevOps Basics', 'Project Deployment'],
      duration: '12 Weeks',
      level: 'Beginner to Advanced',
      color: '#8b5cf6',
      sessions: '48 Live Sessions',
      projects: '12 Real Projects'
    },
    {
      icon: FiCloud,
      title: 'Cloud Computing & DevOps',
      description: 'Learn AWS, Azure, GCP with Docker, Kubernetes, CI/CD pipelines, and infrastructure as code. Get certified and become a cloud architect with practical lab sessions.',
      features: ['AWS & Azure', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Terraform', 'Monitoring', 'Security Best Practices'],
      duration: '10 Weeks',
      level: 'Intermediate',
      color: '#06b6d4',
      sessions: '40 Live Sessions',
      projects: '8 Cloud Projects'
    },
    {
      icon: FiShield,
      title: 'Cybersecurity Professional',
      description: 'Comprehensive security training covering ethical hacking, network security, and security operations. Learn from certified CISSP and CEH professionals with real-world scenarios.',
      features: ['Ethical Hacking', 'Network Security', 'Security Operations', 'Incident Response', 'Compliance', 'Penetration Testing'],
      duration: '14 Weeks',
      level: 'Intermediate to Advanced',
      color: '#10b981',
      sessions: '56 Live Sessions',
      projects: '10 Security Labs'
    },
    {
      icon: FiDatabase,
      title: 'Data Science & AI',
      description: 'Master data analysis, machine learning, and AI with Python, TensorFlow, and real-world datasets. Work on industry projects and build a strong portfolio for top companies.',
      features: ['Python for Data Science', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Big Data Tools'],
      duration: '16 Weeks',
      level: 'Beginner to Advanced',
      color: '#f59e0b',
      sessions: '64 Live Sessions',
      projects: '15 Data Projects'
    },
    {
      icon: FiSmartphone,
      title: 'Mobile App Development',
      description: 'Build iOS and Android apps with React Native and Flutter. Learn app store deployment, push notifications, and create beautiful mobile experiences.',
      features: ['React Native', 'Flutter & Dart', 'UI/UX for Mobile', 'API Integration', 'App Store Deployment', 'Push Notifications'],
      duration: '10 Weeks',
      level: 'Beginner to Intermediate',
      color: '#ef4444',
      sessions: '40 Live Sessions',
      projects: '6 Mobile Apps'
    },
    {
      icon: FiLayout,
      title: 'UI/UX Design Mastery',
      description: 'Learn user research, wireframing, prototyping, and design systems with Figma and Adobe XD. Create stunning designs that users love with expert designers.',
      features: ['User Research', 'Wireframing', 'Figma & Adobe XD', 'Prototyping', 'Design Systems', 'Usability Testing'],
      duration: '8 Weeks',
      level: 'All Levels',
      color: '#ec4899',
      sessions: '32 Live Sessions',
      projects: '8 Design Projects'
    }
  ];

  const trainingFormats = [
    {
      icon: FiMonitor,
      title: 'Live Online Classes',
      description: 'Interactive virtual classrooms with real-time instructor guidance and peer collaboration in small batches of 15-20 students.',
      features: ['Live Interactive Sessions', 'Hands-on Lab Access', 'Group Projects', 'Q&A Sessions']
    },
    {
      icon: FiUsers,
      title: 'Corporate Training',
      description: 'Customized training programs for teams with dedicated account management and progress tracking for entire organizations.',
      features: ['Custom Curriculum Design', 'Team Batch Discounts', 'Progress Reports', 'Dedicated Manager']
    },
    {
      icon: FiVideo,
      title: 'Self-Paced Learning',
      description: 'Learn at your own pace with pre-recorded videos, assignments, and 24/7 community support from mentors and peers.',
      features: ['HD Video Library', 'Flexible Schedule', 'Lifetime Access', 'Community Forum']
    },
    {
      icon: FiCalendar,
      title: 'Intensive Bootcamps',
      description: 'Full-day immersive training programs designed for rapid skill acquisition and career transition in high-demand technologies.',
      features: ['Full-Day Training', 'Hands-on Projects', 'Interview Prep', 'Career Support']
    }
  ];

  const learningPath = [
    {
      step: '01',
      title: 'Skill Assessment',
      description: 'Evaluate your current skills, identify strengths and gaps with our career counselors for personalized guidance.',
      icon: FiSearch
    },
    {
      step: '02',
      title: 'Program Selection',
      description: 'Choose the right program based on your career goals, experience level, and industry demands.',
      icon: FiCompass
    },
    {
      step: '03',
      title: 'Active Learning',
      description: 'Engage in hands-on projects, live sessions, and collaborative learning with peers and mentors.',
      icon: FiPlay
    },
    {
      step: '04',
      title: 'Build Portfolio',
      description: 'Create real-world projects that showcase your skills to potential employers on GitHub and Behance.',
      icon: FiBriefcase
    },
    {
      step: '05',
      title: 'Get Certified',
      description: 'Earn industry-recognized certification and prepare for job interviews with mock sessions.',
      icon: FiAward
    }
  ];

  const whyChooseUs = [
    {
      icon: FiUserCheck,
      title: 'Industry Expert Mentors',
      description: 'Learn from professionals working at top tech companies like Google, Microsoft, Amazon with 15+ years of real-world experience.'
    },
    {
      icon: FiThumbsUp,
      title: 'Hands-on Practical Approach',
      description: '70% practical, 30% theory. Build real projects, participate in hackathons, and solve actual business problems throughout the program.'
    },
    {
      icon: FiHeadphones,
      title: '24/7 Mentorship Support',
      description: 'Get round-the-clock support from dedicated mentors, teaching assistants, and peer community for doubt resolution.'
    },
    {
      icon: FiBriefcase,
      title: '100% Placement Assistance',
      description: 'Comprehensive career support including resume building, mock interviews, and direct referrals to 500+ hiring partners.'
    },
    {
      icon: FiCoffee,
      title: 'Flexible Learning Options',
      description: 'Choose between weekday, weekend, morning, and evening batches. Learn at your own pace with lifetime access to content.'
    },
    {
      icon: FiSmile,
      title: 'Lifetime Community Access',
      description: 'Join our alumni network of 5000+ professionals. Attend exclusive workshops, webinars, and networking events forever.'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Full Stack Developer at Google',
      text: 'The Full Stack Development program completely changed my career trajectory. The hands-on projects and mentorship from industry experts were invaluable. I got placed within 1 month of completion.',
      rating: 5,
      image: 'https://i.pravatar.cc/100?img=1'
    },
    {
      name: 'Raj Patel',
      role: 'Cloud Architect at AWS',
      text: 'Best Cloud Computing training I have ever attended. The practical labs on AWS and Azure were outstanding. The instructor had deep knowledge and real-world experience.',
      rating: 5,
      image: 'https://i.pravatar.cc/100?img=2'
    },
    {
      name: 'Anjali Gupta',
      role: 'Security Analyst at Microsoft',
      text: 'The Cybersecurity program prepared me for real-world threats. Got certified and placed within 2 months. The mock interviews and resume workshops were extremely helpful.',
      rating: 5,
      image: 'https://i.pravatar.cc/100?img=3'
    }
  ];

  const faqs = [
    {
      question: 'Do you provide placement assistance after training?',
      answer: 'Yes, we provide comprehensive placement assistance including resume building, LinkedIn profile optimization, interview preparation, mock interviews with industry experts, and direct referrals to our 500+ hiring partners. 98% of our certified students get placed within 3 months of program completion. Our dedicated placement cell works with you until you get your dream job.'
    },
    {
      question: 'Are the courses available both online and in-person?',
      answer: 'We offer flexible learning options including live online instructor-led classes, self-paced learning with recorded content, and in-person classroom training at our centers in New York, London, Mumbai, and Singapore. Online classes are conducted via Zoom with interactive labs, breakout rooms, and real-time collaboration tools.'
    },
    {
      question: 'What certifications will I receive after completion?',
      answer: 'Upon successful completion, you receive an industry-recognized certification from Intech Zone that is verifiable online. For specialized tracks, we also prepare you for global certifications including AWS Certified Solutions Architect, Microsoft Azure Administrator, Google Professional Cloud Architect, CompTIA Security+, CEH, and CISSP. Our programs include exam preparation and practice tests.'
    },
    {
      question: 'Can I switch between different training programs?',
      answer: 'Yes, we understand that career interests evolve. You can switch between programs within the first 2 weeks at no additional cost. Our career counselors will help you make the right choice based on your skill assessment, interests, and market demand. We want you to be in the program that best aligns with your career goals.'
    },
    {
      question: 'What payment options and scholarships are available?',
      answer: 'We offer flexible payment options including monthly EMI plans, credit card installments, and upfront discounts. We also provide merit-based scholarships covering up to 50% of the program fee for deserving candidates. Corporate sponsorships and bulk team discounts are available for organizational training needs.'
    },
    {
      question: 'What makes your training different from online platforms?',
      answer: 'Unlike pre-recorded online platforms, we provide live instructor-led sessions in small batches (15-20 students), personalized mentorship, hands-on labs, real industry projects, peer collaboration, and dedicated placement support. Our instructors are active industry professionals, not just trainers. You get lifetime access to content, community, and career support.'
    }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const tabs = ['All Programs', 'Development', 'Cloud & DevOps', 'Security', 'Data & AI', 'Design'];

  const filteredPrograms = activeTab === 0 
    ? trainingPrograms 
    : trainingPrograms.filter((_, idx) => {
        const categoryMap = { 1: [0, 4], 2: [1], 3: [2], 4: [3], 5: [5] };
        return categoryMap[activeTab]?.includes(idx);
      });

  return (
    <div className={styles.page}>
      <GeometricCanvas />

      {/* Hero Section */}
      <section className={styles.hero}>
        <WaveCanvas/>
        <div className={styles.heroPattern} />
        <div className={styles.container}>
          <div className={styles.heroContent} data-animate="hero">
            <div className={styles.heroBadge}>
              <FiBookOpen size={16} />
              IT Training & Professional Certification
              <FiBookOpen size={16} />
            </div>

            <h1 className={styles.heroTitle}>
              Transform Your Career with{" "}
              <span className={styles.gradientText}>
                Expert-Led IT Training
              </span>
            </h1>

            <p className={styles.heroDesc}>
              Master in-demand technology skills with hands-on training from industry experts working at top tech companies. 
              From programming to cybersecurity, get certified with practical projects and dedicated placement support.
            </p>
            <p className={styles.heroDesc}>
              Join 5000+ professionals who have accelerated their careers through our comprehensive training programs 
              with 98% certification success rate and placement in leading companies worldwide.
            </p>

            <div className={styles.heroStatsGrid}>
              {stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className={styles.heroStatCard}
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
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
              <Link to="/contact" className={styles.btnPrimary}>
                Explore Training Programs <FiArrowRight size={20} />
              </Link>
              <Link to="/contact" className={styles.btnSecondary}>
                <FiPlay size={18} />
                Book Free Demo Session
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AllServicesForm/>

      {/* Training Formats Section */}
      <section className={styles.formats}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} data-animate="section-header">
            <div className={styles.sectionBadge}>
              <FiLayout size={16} />
              <span>Learning Formats</span>
              <FiLayout size={16} />
            </div>
            <h2 className={styles.sectionTitle}>
              Choose Your Perfect <span className={styles.gradientText}>Learning Style</span>
            </h2>
            <p className={styles.sectionDesc}>
              Flexible training options designed for every learning preference and schedule
            </p>
          </div>

          <div className={styles.formatsGrid}>
            {trainingFormats.map((format, idx) => (
              <div 
                key={idx} 
                className={styles.formatCard} 
                data-animate={`format-${idx}`}
              >
                <div className={styles.formatIconWrapper}>
                  <format.icon size={36} />
                  <div className={styles.formatIconGlow} />
                </div>
                <h3>{format.title}</h3>
                <p>{format.description}</p>
                <ul className={styles.formatFeatures}>
                  {format.features.map((feature, fIdx) => (
                    <li key={fIdx}>
                      <FiCheckCircle size={14} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs Section */}
      <section className={styles.programs}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} data-animate="section-header">
            <div className={styles.sectionBadge}>
              <FiBook size={16} />
              <span>Our Programs</span>
              <FiBook size={16} />
            </div>
            <h2 className={styles.sectionTitle}>
              Featured <span className={styles.gradientText}>Training Programs</span>
            </h2>
            <p className={styles.sectionDesc}>
              Industry-aligned curriculum designed and delivered by expert professionals
            </p>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                className={`${styles.tab} ${activeTab === idx ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(idx)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className={styles.programsGrid}>
            {(activeTab === 0 ? trainingPrograms : filteredPrograms).map((program, idx) => (
              <div 
                key={idx} 
                className={styles.programCard} 
                data-animate={`program-${idx}`}
              >
                <div className={styles.programHeader}>
                  <div className={styles.programIcon} style={{ background: `${program.color}15`, color: program.color }}>
                    <program.icon size={32} />
                  </div>
                  <div className={styles.programLevel} style={{ color: program.color }}>
                    {program.level}
                  </div>
                </div>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                <div className={styles.programMeta}>
                  <span><FiClock size={14} /> {program.duration}</span>
                  <span><FiVideo size={14} /> {program.sessions}</span>
                  <span><FiFileText size={14} /> {program.projects}</span>
                </div>
                <div className={styles.programFeatures}>
                  {program.features.map((feature, fIdx) => (
                    <span key={fIdx} className={styles.programFeatureTag}>
                      <FiCheckCircle size={12} /> {feature}
                    </span>
                  ))}
                </div>
                <Link to="/contact" className={styles.programBtn} style={{ background: program.color }}>
                  Learn More & Enroll <FiArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={styles.whyChooseUs}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} data-animate="section-header">
            <div className={styles.sectionBadge}>
              <FiThumbsUp size={16} />
              <span>Why Choose Us</span>
              <FiThumbsUp size={16} />
            </div>
            <h2 className={styles.sectionTitle}>
              What Makes Our <span className={styles.gradientText}>Training Different</span>
            </h2>
            <p className={styles.sectionDesc}>
              We focus on practical skills, mentorship, and career outcomes
            </p>
          </div>

          <div className={styles.whyGrid}>
            {whyChooseUs.map((item, idx) => (
              <div 
                key={idx} 
                className={styles.whyCard} 
                data-animate={`why-${idx}`}
              >
                <div className={styles.whyIcon}>
                  <item.icon size={28} />
                </div>
                <div className={styles.whyContent}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className={styles.learningPath}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} data-animate="section-header">
            <div className={styles.sectionBadge}>
              <FiGitMerge size={16} />
              <span>Your Journey</span>
              <FiGitMerge size={16} />
            </div>
            <h2 className={styles.sectionTitle}>
              Your Complete <span className={styles.gradientText}>Learning Journey</span>
            </h2>
            <p className={styles.sectionDesc}>
              A structured step-by-step approach to transform your career in technology
            </p>
          </div>

          <div className={styles.pathGrid}>
            {learningPath.map((step, idx) => (
              <div 
                key={idx} 
                className={styles.pathItem} 
                data-animate={`path-${idx}`}
              >
                <div className={styles.pathStep}>
                  <div className={styles.pathNumber}>{step.step}</div>
                  <div className={styles.pathIcon}>
                    <step.icon size={24} />
                  </div>
                </div>
                <div className={styles.pathContent}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                {idx < learningPath.length - 1 && (
                  <div className={styles.pathConnector}>
                    <FiArrowRight size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

     <TestimonialSection/>

      {/* FAQ Section */}
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
              Everything you need to know about our training programs
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
                <FiZap size={14} /> Start Your Learning Journey Today
              </div>
              <h2>Ready to Transform Your IT Career?</h2>
              <p>
                Join 5000+ professionals who have accelerated their careers with our expert-led IT training programs.
                Get hands-on experience with real projects, earn industry-recognized certifications, and land your dream job with our dedicated placement support.
              </p>
              <p>
                Schedule a free career counseling session with our senior mentors to discuss your goals and create a personalized learning roadmap tailored to your aspirations.
              </p>

              <div className={styles.ctaFeatures}>
                <div className={styles.ctaFeature}>
                  <FiCheckCircle size={18} />
                  <span>Free personalized career counseling session</span>
                </div>
                <div className={styles.ctaFeature}>
                  <FiCheckCircle size={18} />
                  <span>Customized learning path based on your goals</span>
                </div>
                <div className={styles.ctaFeature}>
                  <FiCheckCircle size={18} />
                  <span>Flexible payment options and scholarship available</span>
                </div>
                <div className={styles.ctaFeature}>
                  <FiCheckCircle size={18} />
                  <span>100% placement assistance with 500+ partners</span>
                </div>
              </div>

              <div className={styles.ctaButtons}>
                <Link to="/contact" className={styles.ctaBtnPrimary}>
                  Book Free Career Counseling <FiArrowRight size={18} />
                </Link>
                <Link to="/contact" className={styles.ctaBtnSecondary}>
                  Speak with a Training Advisor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default ItTraining;