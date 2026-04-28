import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './AppDevelopment.module.css';
import {
  FiSmartphone, FiCode, FiTrendingUp, FiCheckCircle, FiArrowRight,
  FiStar, FiClock, FiUsers, FiAward, FiGlobe, FiHeadphones,
  FiShield, FiZap, FiHeart, FiThumbsUp, FiMapPin, FiMail, FiPhone,
  FiMonitor, FiDatabase, FiCloud, FiLock,
  FiBarChart2, FiPackage, FiServer, FiCpu, FiRefreshCw,
  FiPhoneCall, FiActivity
} from 'react-icons/fi';
import TestimonialSection from '../../../Pages/Home/TestimonialSection';
import OurProcess from '../../../Pages/Home/OurProcess';
import AllServicesForm from '../../../Pages/CompanyServices/AllServicesForm';
import WaveCanvas from '../../../Pages/Home/Wavecanvas';

const AppDevelopment = () => {
  const canvasRef = useRef(null);

  // Canvas animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    const initParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / 10000);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          alpha: Math.random() * 0.3,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.3,
        });
      }
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.08)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }
      
      animationId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      resize();
      initParticles();
    };

    resize();
    initParticles();
    draw();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const services = [
    { icon: FiSmartphone, title: 'Android App Development', desc: 'Native Android apps with Kotlin/Java for Play Store', color: '#3b82f6', details: 'Material Design, Play Store ready', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop' },
    { icon: FiMonitor, title: 'iOS App Development', desc: 'Premium iOS apps using Swift for App Store', color: '#8b5cf6', details: 'Swift, UIKit, App Store ready', image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=400&h=250&fit=crop' },
    { icon: FiCode, title: 'Cross-Platform Apps', desc: 'One codebase for iOS & Android using React Native/Flutter', color: '#10b981', details: 'React Native, Flutter, faster development', image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=250&fit=crop' },
    { icon: FiActivity, title: 'Progressive Web Apps', desc: 'Website that works like a native mobile app', color: '#f59e0b', details: 'Offline support, push notifications', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop' },
    { icon: FiDatabase, title: 'Backend Integration', desc: 'Powerful APIs and cloud backend for your app', color: '#ef4444', details: 'REST APIs, Firebase, AWS', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop' },
    { icon: FiLock, title: 'App Security', desc: 'Enterprise-grade security for your mobile app', color: '#06b6d4', details: 'Encryption, secure auth, data protection', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop' },
  ];

  const processSteps = [
    { step: '01', title: 'Discovery', desc: 'Understand your vision and requirements', icon: FiHeart, duration: '1 week' },
    { step: '02', title: 'UI/UX Design', desc: 'Create beautiful, intuitive app designs', icon: FiTrendingUp, duration: '2 weeks' },
    { step: '03', title: 'Development', desc: 'Write clean, scalable code', icon: FiCode, duration: '6-8 weeks' },
    { step: '04', title: 'Testing', desc: 'Rigorous QA on real devices', icon: FiCheckCircle, duration: '2 weeks' },
    { step: '05', title: 'Deployment', desc: 'Launch on Play Store & App Store', icon: FiCloud, duration: '1 week' },
    { step: '06', title: 'Support', desc: 'Ongoing maintenance & updates', icon: FiHeadphones, duration: 'Ongoing' },
  ];

  const platforms = [
    { name: 'iOS', icon: FiMonitor, color: '#8b5cf6', bg: '#f5f3ff' },
    { name: 'Android', icon: FiSmartphone, color: '#3b82f6', bg: '#eff6ff' },
    { name: 'React Native', icon: FiCode, color: '#10b981', bg: '#ecfdf5' },
    { name: 'Flutter', icon: FiActivity, color: '#06b6d4', bg: '#ecfeff' },
  ];

  const features = [
    { icon: FiZap, title: 'Fast Performance', desc: 'Optimized code for smooth user experience' },
    { icon: FiShield, title: 'Secure Data', desc: 'End-to-end encryption and secure APIs' },
    { icon: FiRefreshCw, title: 'Offline Support', desc: 'App works without internet connection' },
    { icon: FiBarChart2, title: 'Analytics', desc: 'Track user behavior and app performance' },
  ];

  const projects = [
    { name: 'Food Delivery App', category: 'Food & Restaurant', year: '2024', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop', tech: ['Flutter', 'Node.js', 'MongoDB'] },
    { name: 'Fitness Tracker', category: 'Health & Fitness', year: '2023', image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=400&h=250&fit=crop', tech: ['React Native', 'Firebase'] },
    { name: 'E-commerce App', category: 'Shopping', year: '2024', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop', tech: ['Swift', 'Node.js', 'PostgreSQL'] },
  ];

  return (
    <div className={styles.page}>
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Hero Section */}
      <section className={styles.hero}>
        <WaveCanvas/>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <FiSmartphone size={16} />
              <span>App Development</span>
            </div>
            <h1 className={styles.heroTitle}>
              Build Powerful Mobile<br />
              <span className={styles.gradient}>Applications</span>
            </h1>
            <p className={styles.heroDesc}>
              Create engaging, high-performance mobile apps for iOS and Android that 
              deliver exceptional user experiences and drive business growth.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>150+</span>
                <span className={styles.heroStatLabel}>Apps Delivered</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>5M+</span>
                <span className={styles.heroStatLabel}>Downloads</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>4.8★</span>
                <span className={styles.heroStatLabel}>Avg Rating</span>
              </div>
            </div>
            <div className={styles.heroButtons}>
              <Link to="/contact" className={styles.btnPrimary}>
                Start Your Project <FiArrowRight size={16} />
              </Link>
              <Link to="/portfolio" className={styles.btnSecondary}>
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AllServicesForm/>

      {/* Services Section with Images */}
      <section className={styles.services}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>What We Offer</span>
            <h2 className={styles.sectionTitle}>App Development <span className={styles.gradient}>Services</span></h2>
            <p className={styles.sectionDesc}>End-to-end mobile app solutions tailored to your needs</p>
          </div>
          <div className={styles.servicesGrid}>
            {services.map((service, idx) => (
              <div key={idx} className={styles.serviceCard}>
                <div className={styles.serviceImage}>
                  <img src={service.image} alt={service.title} />
                  <div className={styles.serviceOverlay}>
                    <service.icon size={28} />
                  </div>
                </div>
                <div className={styles.serviceContent}>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDesc}>{service.desc}</p>
                  <div className={styles.serviceDetails}>
                    <FiCheckCircle size={12} /> {service.details}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className={styles.platforms}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Platforms</span>
            <h2 className={styles.sectionTitle}>We Build For <span className={styles.gradient}>All Platforms</span></h2>
            <p className={styles.sectionDesc}>Native and cross-platform solutions for every need</p>
          </div>
          <div className={styles.platformsGrid}>
            {platforms.map((platform, idx) => (
              <div key={idx} className={styles.platformCard}>
                <div className={styles.platformIcon} style={{ background: platform.bg, color: platform.color }}>
                  <platform.icon size={32} />
                </div>
                <h3>{platform.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className={styles.projects}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Recent Work</span>
            <h2 className={styles.sectionTitle}>Featured <span className={styles.gradient}>Projects</span></h2>
            <p className={styles.sectionDesc}>Some of our best mobile app development work</p>
          </div>
          <div className={styles.projectsGrid}>
            {projects.map((project, idx) => (
              <div key={idx} className={styles.projectCard}>
                <div className={styles.projectImage}>
                  <img src={project.image} alt={project.name} />
                  <div className={styles.projectOverlay}>
                    <span className={styles.projectCategory}>{project.category}</span>
                  </div>
                </div>
                <div className={styles.projectInfo}>
                  <h3>{project.name}</h3>
                  <div className={styles.projectTech}>
                    {project.tech.map((t, i) => (
                      <span key={i} className={styles.techTag}>{t}</span>
                    ))}
                  </div>
                  <div className={styles.projectYear}>
                    <FiStar size={12} /> {project.year}
                  </div>
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
            <span className={styles.sectionBadge}>How We Work</span>
            <h2 className={styles.sectionTitle}>Our Development <span className={styles.gradient}>Process</span></h2>
            <p className={styles.sectionDesc}>A systematic approach to build quality apps</p>
          </div>
          <div className={styles.processGrid}>
            {processSteps.map((item, idx) => (
              <div key={idx} className={styles.processCard}>
                <div className={styles.processStep}>{item.step}</div>
                <div className={styles.processIcon}>
                  <item.icon size={24} />
                </div>
                <h3 className={styles.processTitle}>{item.title}</h3>
                <p className={styles.processDesc}>{item.desc}</p>
                <div className={styles.processDuration}>
                  <FiClock size={12} /> {item.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.featuresGrid}>
            {features.map((feature, idx) => (
              <div key={idx} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <feature.icon size={24} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <OurProcess/>

      {/* Why Choose Us Section */}
      <section className={styles.whyUs}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Why Choose Us</span>
            <h2 className={styles.sectionTitle}>What Makes Us <span className={styles.gradient}>Different</span></h2>
          </div>
          <div className={styles.whyUsGrid}>
            <div className={styles.whyUsCard}>
              <div className={styles.whyUsIcon}><FiAward size={28} /></div>
              <h3>10+ Years Experience</h3>
              <p>Over a decade of app development expertise</p>
            </div>
            <div className={styles.whyUsCard}>
              <div className={styles.whyUsIcon}><FiUsers size={28} /></div>
              <h3>40+ App Developers</h3>
              <p>Dedicated team of mobile experts</p>
            </div>
            <div className={styles.whyUsCard}>
              <div className={styles.whyUsIcon}><FiGlobe size={28} /></div>
              <h3>Global Clients</h3>
              <p>Serving clients across 15+ countries</p>
            </div>
            <div className={styles.whyUsCard}>
              <div className={styles.whyUsIcon}><FiHeart size={28} /></div>
              <h3>100% Satisfaction</h3>
              <p>Client-first approach guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      <TestimonialSection/>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Ready to Build Your Mobile App?</h2>
            <p>Let's turn your app idea into reality with expert development.</p>
            <div className={styles.ctaButtons}>
              <Link to="/contact" className={styles.ctaBtnPrimary}>
                Contact Us <FiArrowRight size={16} />
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

export default AppDevelopment;