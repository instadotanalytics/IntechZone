import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './SoftwareDevelopment.module.css';
import {
  FiCode, FiPackage, FiTrendingUp, FiCheckCircle, FiArrowRight,
  FiStar, FiClock, FiUsers, FiAward, FiGlobe, FiHeadphones,
  FiShield, FiZap, FiHeart, FiThumbsUp, FiMail, FiPhone,
  FiMonitor, FiDatabase, FiCloud, FiLock, FiBarChart2,
  FiServer, FiCpu, FiRefreshCw, FiTool, FiLayers, FiTarget
} from 'react-icons/fi';
import WaveCanvas from '../../../Pages/Home/Wavecanvas';
import AllServicesForm from '../../../Pages/CompanyServices/AllServicesForm';
import OurProcess from '../../../Pages/Home/OurProcess';
import TestimonialSection from '../../../Pages/Home/TestimonialSection';

const SoftwareDevelopment = () => {
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
    { icon: FiCode, title: 'Custom Software Dev', desc: 'Tailored solutions for your business needs', color: '#3b82f6', details: 'Scalable & Secure', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop' },
    { icon: FiPackage, title: 'SaaS Platform', desc: 'Cloud-based software as a service', color: '#3b82f6', details: 'Multi-tenant Architecture', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop' },
    { icon: FiServer, title: 'Enterprise Software', desc: 'Large-scale business applications', color: '#3b82f6', details: 'High Performance', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop' },
    { icon: FiCpu, title: 'AI Integration', desc: 'Intelligent automation and insights', color: '#3b82f6', details: 'Machine Learning', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop' },
    { icon: FiDatabase, title: 'Database Solutions', desc: 'Efficient data management systems', color: '#3b82f6', details: 'Optimized Queries', image: 'https://i.pinimg.com/1200x/ad/a4/5d/ada45de2675b6b4425137f160db5e9c2.jpg' },
    { icon: FiTool, title: 'Legacy Modernization', desc: 'Upgrade outdated systems', color: '#3b82f6', details: 'Seamless Migration', image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=300&fit=crop' },
  ];

  const processSteps = [
    { step: '01', title: 'Requirements', desc: 'Gather and analyze your needs', icon: FiTarget, duration: '1-2 weeks' },
    { step: '02', title: 'Architecture', desc: 'Design system architecture', icon: FiLayers, duration: '1 week' },
    { step: '03', title: 'Development', desc: 'Write clean, modular code', icon: FiCode, duration: '8-12 weeks' },
    { step: '04', title: 'Testing', desc: 'Comprehensive QA testing', icon: FiCheckCircle, duration: '2 weeks' },
    { step: '05', title: 'Deployment', desc: 'Smooth production rollout', icon: FiCloud, duration: '1 week' },
    { step: '06', title: 'Maintenance', desc: 'Ongoing support & updates', icon: FiRefreshCw, duration: 'Ongoing' },
  ];

  const techStack = [
    { name: 'Backend', items: ['Node.js', 'Python', 'Java', 'Go', 'PHP'], color: '#3b82f6' },
    { name: 'Frontend', items: ['React', 'Angular', 'Vue.js', 'Next.js', 'TypeScript'], color: '#3b82f6' },
    { name: 'Database', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Elasticsearch'], color: '#3b82f6' },
    { name: 'DevOps', items: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'Jenkins'], color: '#3b82f6' },
  ];

  const features = [
    { icon: FiZap, title: 'High Performance', desc: 'Optimized code for speed' },
    { icon: FiShield, title: 'Enterprise Security', desc: 'Bank-grade protection' },
    { icon: FiBarChart2, title: 'Scalable', desc: 'Grows with your business' },
    { icon: FiRefreshCw, title: 'Agile Process', desc: 'Iterative development' },
  ];

  const projects = [
    { name: 'FinTech Dashboard', category: 'Finance', year: '2024', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop', tech: ['React', 'Node.js', 'MongoDB'] },
    { name: 'Healthcare Portal', category: 'Healthcare', year: '2023', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop', tech: ['Python', 'Django', 'PostgreSQL'] },
    { name: 'E-commerce Platform', category: 'Retail', year: '2024', image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop', tech: ['Java', 'Spring', 'MySQL'] },
  ];

  const stats = [
    { value: '200+', label: 'Projects Completed' },
    { value: '98%', label: 'Client Retention' },
    { value: '50+', label: 'Expert Developers' },
    { value: '24/7', label: 'Support Available' },
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
              <FiCode size={16} />
              <span>Software Development</span>
            </div>
            <h1 className={styles.heroTitle}>
              Build Enterprise-Grade<br />
              <span className={styles.gradient}>Software Solutions</span>
            </h1>
            <p className={styles.heroDesc}>
              Custom software development services that transform your business ideas 
              into powerful, scalable, and secure applications.
            </p>
            <div className={styles.heroStats}>
              {stats.map((stat, idx) => (
                <div key={idx} className={styles.heroStat}>
                  <span className={styles.heroStatValue}>{stat.value}</span>
                  <span className={styles.heroStatLabel}>{stat.label}</span>
                </div>
              ))}
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
            <span className={styles.sectionBadge}>What We Build</span>
            <h2 className={styles.sectionTitle}>Software <span className={styles.gradient}>Solutions</span></h2>
            <p className={styles.sectionDesc}>Comprehensive software development services</p>
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
            <span className={styles.sectionBadge}>How We Build</span>
            <h2 className={styles.sectionTitle}>Development <span className={styles.gradient}>Process</span></h2>
            <p className={styles.sectionDesc}>Agile methodology for faster delivery</p>
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

      {/* Tech Stack Section */}
      <section className={styles.techStack}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Tech Stack</span>
            <h2 className={styles.sectionTitle}>Modern <span className={styles.gradient}>Technologies</span></h2>
            <p className={styles.sectionDesc}>Cutting-edge tools and frameworks</p>
          </div>
          <div className={styles.techGrid}>
            {techStack.map((tech, idx) => (
              <div key={idx} className={styles.techCard}>
                <h3 style={{ color: tech.color }}>{tech.name}</h3>
                <div className={styles.techItems}>
                  {tech.items.map((item, i) => (
                    <span key={i} className={styles.techBadge}>{item}</span>
                  ))}
                </div>
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
            <p className={styles.sectionDesc}>Some of our best software development work</p>
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
              <h3>10+ Years Exp</h3>
              <p>Decades of software expertise</p>
            </div>
            <div className={styles.whyUsCard}>
              <div className={styles.whyUsIcon}><FiUsers size={28} /></div>
              <h3>50+ Engineers</h3>
              <p>Dedicated development team</p>
            </div>
            <div className={styles.whyUsCard}>
              <div className={styles.whyUsIcon}><FiGlobe size={28} /></div>
              <h3>Global Presence</h3>
              <p>Clients across 20+ countries</p>
            </div>
            <div className={styles.whyUsCard}>
              <div className={styles.whyUsIcon}><FiHeadphones size={28} /></div>
              <h3>24/7 Support</h3>
              <p>Round-the-clock assistance</p>
            </div>
          </div>
        </div>
      </section>
      <TestimonialSection/>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Ready to Build Your Software?</h2>
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

export default SoftwareDevelopment;