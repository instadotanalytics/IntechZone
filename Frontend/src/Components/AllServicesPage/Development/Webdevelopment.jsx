import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Webdevelopment.module.css';
import {
  FiCode, FiGlobe, FiShoppingCart, FiDatabase, FiServer,
  FiZap, FiShield, FiTrendingUp, FiCheckCircle, FiArrowRight,
  FiStar, FiClock, FiLayers, FiEye, FiMessageSquare,
  FiBarChart2, FiCpu, FiCloud, FiLock, FiAward,
  FiUsers, FiBriefcase, FiTarget
} from 'react-icons/fi';

import WaveCanvas from '../../../Pages/Home/Wavecanvas';
import TestimonialSection from '../../../Pages/Home/TestimonialSection';
import AllServicesForm from '../../../Pages/CompanyServices/AllServicesForm';

const Webdevelopment = () => {
  const canvasRef = useRef(null);

  // Canvas animation
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
      
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)';
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
        ctx.fillStyle = `rgba(59, 130, 246, ${p.alpha})`;
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
    { icon: FiGlobe, title: 'Custom Website Design', desc: 'Unique, responsive websites tailored to your brand identity and business goals.', color: '#3b82f6', details: 'Mobile-first approach, SEO optimized, fast loading', image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=250&fit=crop' },
    { icon: FiShoppingCart, title: 'E-commerce Development', desc: 'Powerful online stores with secure payment gateways and inventory management.', color: '#10b981', details: 'Multiple payment options, cart features, order tracking', image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=400&h=250&fit=crop' },
    { icon: FiDatabase, title: 'CMS Development', desc: 'Easy-to-manage content management systems for non-technical users.', color: '#8b5cf6', details: 'WordPress, Strapi, Custom CMS solutions', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop' },
    { icon: FiServer, title: 'Enterprise Web Apps', desc: 'Scalable solutions for large organizations with complex workflows.', color: '#f59e0b', details: 'Microservices architecture, high availability', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop' },
    { icon: FiZap, title: 'Performance Optimization', desc: 'Lightning-fast loading speeds and optimized user experiences.', color: '#ef4444', details: 'Lazy loading, caching, CDN integration', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop' },
    { icon: FiLock, title: 'Security & Maintenance', desc: 'Enterprise-grade security protocols and ongoing technical support.', color: '#06b6d4', details: 'SSL certificates, regular backups, monitoring', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop' },
  ];

  const processSteps = [
    { 
      step: '01', 
      title: 'Discovery & Research', 
      desc: 'We start by understanding your business goals, target audience, and project requirements.',
      icon: FiTarget,
      duration: '1-2 weeks',
      deliverables: ['Project Scope', 'Requirements', 'Timeline']
    },
    { 
      step: '02', 
      title: 'Planning & Strategy', 
      desc: 'We create a detailed project roadmap, technical architecture, and development strategy.',
      icon: FiBriefcase,
      duration: '1 week',
      deliverables: ['Architecture', 'Wireframes', 'Sprint Plan']
    },
    { 
      step: '03', 
      title: 'UI/UX Design', 
      desc: 'Our designers create beautiful, user-friendly interfaces that provide seamless experiences.',
      icon: FiEye,
      duration: '2-3 weeks',
      deliverables: ['Mockups', 'Design System', 'Prototype']
    },
    { 
      step: '04', 
      title: 'Development', 
      desc: 'We write clean, maintainable code using modern frameworks and best practices.',
      icon: FiCode,
      duration: '4-8 weeks',
      deliverables: ['Application', 'Code Repository', 'API Docs']
    },
    { 
      step: '05', 
      title: 'Quality Assurance', 
      desc: 'Rigorous testing across multiple browsers, devices, and scenarios.',
      icon: FiCheckCircle,
      duration: '1-2 weeks',
      deliverables: ['Test Reports', 'Bug Fixes', 'Metrics']
    },
    { 
      step: '06', 
      title: 'Deployment & Launch', 
      desc: 'Smooth deployment to production environment with zero downtime.',
      icon: FiTrendingUp,
      duration: '1 week',
      deliverables: ['Live Website', 'Launch Report', 'Checklist']
    },
    { 
      step: '07', 
      title: 'Training & Handover', 
      desc: 'We provide comprehensive training to your team and complete documentation.',
      icon: FiUsers,
      duration: '1 week',
      deliverables: ['User Manual', 'Tutorials', 'Admin Access']
    },
    { 
      step: '08', 
      title: 'Maintenance & Support', 
      desc: 'Ongoing support, regular updates, and continuous improvement.',
      icon: FiClock,
      duration: 'Ongoing',
      deliverables: ['Monthly Reports', 'Security Updates', '24/7 Support']
    },
  ];

  const featuredProjects = [
    { name: 'TechCorp Enterprise Portal', category: 'Enterprise Web App', year: '2024', description: 'A comprehensive B2B portal serving 500+ businesses with real-time analytics.', tech: ['React', 'Node.js', 'MongoDB'], image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop' },
    { name: 'FashionHub E-commerce', category: 'E-commerce Platform', year: '2024', description: 'Multi-vendor marketplace handling 50,000+ monthly transactions.', tech: ['Next.js', 'Stripe', 'PostgreSQL'], image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=400&h=250&fit=crop' },
    { name: 'MediCare Patient Portal', category: 'Healthcare Solution', year: '2023', description: 'Secure patient management system used by 200+ clinics.', tech: ['Django', 'React', 'PostgreSQL'], image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop' },
    { name: 'FinServe Analytics Dashboard', category: 'FinTech', year: '2024', description: 'Real-time financial dashboard with AI-powered insights.', tech: ['Vue.js', 'Python', 'AWS'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop' },
    { name: 'LearnX Education Platform', category: 'EdTech', year: '2023', description: 'Online learning platform with 500+ courses and live classes.', tech: ['Angular', 'Firebase', 'Express'], image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop' },
    { name: 'FoodDash Delivery App', category: 'Food Delivery', year: '2024', description: 'Real-time order tracking with route optimization.', tech: ['React Native', 'Node.js', 'Redis'], image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop' },
  ];

  const technologies = {
    frontend: ['React.js', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'Tailwind CSS'],
    backend: ['Node.js', 'Python/Django', 'PHP/Laravel', 'Java/Spring', 'Go', 'Ruby on Rails'],
    database: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Redis', 'Elasticsearch'],
    devops: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'GitHub Actions'],
  };

  return (
    <div className={styles.page}>
      <canvas ref={canvasRef} className={styles.canvas} />
       
      {/* Hero Section */}
      <section className={styles.hero}>
        <WaveCanvas/>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <FiCode size={16} />
              <span>Web Development</span>
            </div>
            <h1 className={styles.heroTitle}>
              Build Modern, Scalable<br />
              <span className={styles.gradient}>Web Applications</span>
            </h1>
            <p className={styles.heroDesc}>
              We create responsive, high-performance websites and web applications 
              that deliver exceptional user experiences and drive business growth.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>200+</span>
                <span className={styles.heroStatLabel}>Projects Delivered</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>98%</span>
                <span className={styles.heroStatLabel}>Client Satisfaction</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>50+</span>
                <span className={styles.heroStatLabel}>Expert Developers</span>
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
            <h2 className={styles.sectionTitle}>Our Web Development <span className={styles.gradient}>Services</span></h2>
            <p className={styles.sectionDesc}>Comprehensive solutions tailored to your business needs</p>
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

      {/* Process Section */}
      <section className={styles.process}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>How We Work</span>
            <h2 className={styles.sectionTitle}>Our Development <span className={styles.gradient}>Process</span></h2>
            <p className={styles.sectionDesc}>A systematic approach to deliver quality results</p>
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
                <div className={styles.processMeta}>
                  <span className={styles.processDuration}>
                    <FiClock size={12} /> {item.duration}
                  </span>
                </div>
                <div className={styles.processDeliverables}>
                  {item.deliverables.map((del, i) => (
                    <span key={i} className={styles.deliverableTag}>
                      <FiCheckCircle size={10} /> {del}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section with Images */}
      <section className={styles.portfolio}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Recent Work</span>
            <h2 className={styles.sectionTitle}>Featured <span className={styles.gradient}>Projects</span></h2>
            <p className={styles.sectionDesc}>Some of our best web development work</p>
          </div>
          <div className={styles.portfolioGrid}>
            {featuredProjects.map((project, idx) => (
              <div key={idx} className={styles.portfolioCard}>
                <div className={styles.portfolioImage}>
                  <img src={project.image} alt={project.name} />
                  <div className={styles.portfolioOverlay}>
                    <span className={styles.portfolioCategory}>{project.category}</span>
                  </div>
                </div>
                <div className={styles.portfolioInfo}>
                  <h3>{project.name}</h3>
                  <p className={styles.portfolioDesc}>{project.description}</p>
                  <div className={styles.portfolioTech}>
                    {project.tech.map((t, i) => (
                      <span key={i} className={styles.techTag}>{t}</span>
                    ))}
                  </div>
                  <div className={styles.portfolioYear}>
                    <FiStar size={12} /> {project.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialSection/>

      {/* Technologies Section */}
      <section className={styles.technologies}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Tech Stack</span>
            <h2 className={styles.sectionTitle}>Modern <span className={styles.gradient}>Technologies</span></h2>
            <p className={styles.sectionDesc}>We use the latest frameworks and tools</p>
          </div>
          <div className={styles.techGrid}>
            <div className={styles.techCategory}>
              <h3><FiCode /> Frontend</h3>
              <div className={styles.techList}>
                {technologies.frontend.map(tech => (
                  <span key={tech} className={styles.techBadge}>{tech}</span>
                ))}
              </div>
            </div>
            <div className={styles.techCategory}>
              <h3><FiServer /> Backend</h3>
              <div className={styles.techList}>
                {technologies.backend.map(tech => (
                  <span key={tech} className={styles.techBadge}>{tech}</span>
                ))}
              </div>
            </div>
            <div className={styles.techCategory}>
              <h3><FiDatabase /> Database</h3>
              <div className={styles.techList}>
                {technologies.database.map(tech => (
                  <span key={tech} className={styles.techBadge}>{tech}</span>
                ))}
              </div>
            </div>
            <div className={styles.techCategory}>
              <h3><FiCloud /> Cloud & DevOps</h3>
              <div className={styles.techList}>
                {technologies.devops.map(tech => (
                  <span key={tech} className={styles.techBadge}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={styles.whyUs}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Why Choose Us</span>
            <h2 className={styles.sectionTitle}>What Makes Us <span className={styles.gradient}>Different</span></h2>
            <p className={styles.sectionDesc}>Why businesses trust us for their web development needs</p>
          </div>
          <div className={styles.whyUsGrid}>
            <div className={styles.whyUsCard}>
              <div className={styles.whyUsIcon}><FiAward size={28} /></div>
              <h3>10+ Years Experience</h3>
              <p>Over a decade of delivering quality web solutions across industries.</p>
            </div>
            <div className={styles.whyUsCard}>
              <div className={styles.whyUsIcon}><FiUsers size={28} /></div>
              <h3>50+ Expert Team</h3>
              <p>Dedicated professionals with expertise in modern technologies.</p>
            </div>
            <div className={styles.whyUsCard}>
              <div className={styles.whyUsIcon}><FiCheckCircle size={28} /></div>
              <h3>100% Project Success</h3>
              <p>Successful delivery of 200+ projects with zero failures.</p>
            </div>
            <div className={styles.whyUsCard}>
              <div className={styles.whyUsIcon}><FiClock size={28} /></div>
              <h3>24/7 Support</h3>
              <p>Round-the-clock technical support and maintenance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Ready to Build Your Web Application?</h2>
            <p>Let's discuss your project and turn your vision into reality.</p>
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

export default Webdevelopment;