// Components/UiUxDesign/UiUxDesign.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './UiUxDesign.module.css';
import {
  FiArrowRight, FiCheckCircle, FiClock, FiStar, FiAward,
  FiZap, FiTrendingUp, FiUsers, FiGlobe, FiHeadphones,
  FiHeart, FiTarget, FiEye, FiPenTool, FiLayers,
  FiBarChart2, FiShield, FiRefreshCw, FiMail, FiPhone,
  FiMessageSquare, FiSend, FiUser, FiDollarSign,
  FiCalendar, FiChevronRight, FiGrid, FiLayout
} from 'react-icons/fi';
import AllServicesForm from '../../../Pages/CompanyServices/AllServicesForm';
import WaveCanvas from '../../../Pages/Home/Wavecanvas';


const UiUxDesign = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', budget: '', message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const testimonials = [
    { name: 'Saidou Soumare', role: 'CTO at Linkbycar', text: 'Our collaboration resulted in a stunning SaaS platform with seamless UI/UX design.', rating: 5, company: 'Transportation & Logistics' },
    { name: 'Justin Lopez', role: 'DGM @ Wespire', text: '35% increase in traffic, with bounce rate significantly decreasing by 20%.', rating: 5, company: 'SaaS' },
    { name: 'Olly Mayes', role: 'Lead Product Designer at Bumble', text: 'Delivered scalable UI solutions allowing our product team to shift focus to strategic growth.', rating: 5, company: 'Social App' },
  ];

  const stats = [
    { value: '$530M', label: 'Total funds raised', icon: FiDollarSign },
    { value: '3.4M', label: 'Active users', icon: FiUsers },
    { value: '500+', label: 'Success stories', icon: FiStar },
  ];

  const challenges = [
    { title: 'Slow launch?', desc: 'Tired of slow design cycles delaying your launch?', metric: '40%', metricLabel: 'faster launch', color: '#3b82f6' },
    { title: 'Budget worries?', desc: 'Want top-notch design without the price tag?', metric: '20%', metricLabel: 'lower costs', color: '#10b981' },
    { title: 'Scaling issues?', desc: 'Need a UI/UX solution that grows with your product?', metric: '25%', metricLabel: 'more efficient', color: '#8b5cf6' },
  ];

  const processSteps = [
    { step: '01', title: 'Discovery & Strategy', desc: 'Understanding your goals and users', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop' },
    { step: '02', title: 'Wireframing', desc: 'Visualizing the structure and flow', image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&h=400&fit=crop' },
    { step: '03', title: 'UI Design', desc: 'Pixel-perfect interfaces', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop' },
    { step: '04', title: 'Prototyping', desc: 'Interactive clickable prototypes', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop' },
    { step: '05', title: 'Testing & Validation', desc: 'Ensuring quality experience', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop' },
  ];

  const portfolioItems = [
    { name: 'Dashboard for Smarter Career Growth', category: 'Productivity', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop' },
    { name: 'Energy Management Dashboard', category: 'Energy', image: 'https://i.pinimg.com/736x/b4/22/0b/b4220b8bde36dd8cc8338daf4fb5d6b0.jpg' },
    { name: 'AI-Powered Dashboard', category: 'Analytics', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop' },
    { name: 'Crypto Trading Dashboard', category: 'Finance', image: 'https://i.pinimg.com/1200x/22/af/00/22af00dcdfbfbd0f6a0359ecd53e11db.jpg' },
    { name: 'Smart Farming Dashboard', category: 'Agriculture', image: 'https://i.pinimg.com/736x/1e/bb/18/1ebb18899c4e1add8671e50a9af2db41.jpg' },
    { name: 'Task Management Interface', category: 'Productivity', image: 'https://i.pinimg.com/1200x/1d/2e/66/1d2e662c5e3cf2497ff7a917e8f9afcf.jpg' },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setFormStatus({ type: 'success', message: 'Thank you! We will contact you within 24 hours.' });
      setFormData({ name: '', email: '', budget: '', message: '' });
      setIsSubmitting(false);
      setTimeout(() => setFormStatus({ type: '', message: '' }), 5000);
    }, 1500);
  };

  return (
    <div className={styles.page}>

      {/* Hero Section with Image */}
      <section className={styles.hero}>
        <WaveCanvas/>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroLeft}>
              <div className={styles.heroBadge}>
                <FiPenTool size={14} /> UI/UX Design Services
              </div>
              <h1 className={styles.heroTitle}>
                UI/UX design that gets your <span className={styles.gradient}>product to market 40% faster</span> — no quality tradeoffs
              </h1>
              <p className={styles.heroDesc}>
                Based on 500+ finished projects & 12 years of experience. Trusted by global brands & SMBs worldwide.
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
                  Start Your Project <FiArrowRight size={16} />
                </Link>
                <Link to="/portfolio" className={styles.btnSecondary}>
                  View Portfolio
                </Link>
              </div>
            </div>
            <div className={styles.heroRight}>
              <div className={styles.heroImage}>
                <img 
                  src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=500&fit=crop" 
                  alt="UI/UX Design" 
                />
                <div className={styles.heroImageOverlay}>
                  <div className={styles.heroImageBadge}>
                    <FiZap size={16} /> 2x faster results with AI tools
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className={styles.trusted}>
        <div className={styles.container}>
          <p className={styles.trustedTitle}>Trusted by global brands & SMBs</p>
          <div className={styles.trustedLogos}>
            {['Microsoft', 'Google', 'Amazon', 'Apple', 'Meta', 'Netflix'].map((logo, idx) => (
              <span key={idx} className={styles.logo}>{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className={styles.caseStudies}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Success Stories</span>
            <h2 className={styles.sectionTitle}>UI/UX designs that <span className={styles.gradient}>drive results</span></h2>
          </div>
          <div className={styles.caseGrid}>
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className={styles.caseCard}>
                <div className={styles.caseCategory}>{testimonial.company}</div>
                <p className={styles.caseQuote}>"{testimonial.text}"</p>
                <div className={styles.caseAuthor}>
                  <div className={styles.authorAvatar}>{testimonial.name.charAt(0)}</div>
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
                <div className={styles.caseRating}>
                  {[...Array(5)].map((_, i) => <FiStar key={i} size={14} fill="#f59e0b" color="#f59e0b" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className={styles.challenges}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Overcome Common UI/UX Challenges</span>
            <h2 className={styles.sectionTitle}>We solve your <span className={styles.gradient}>design problems</span></h2>
          </div>
          <div className={styles.challengesGrid}>
            {challenges.map((challenge, idx) => (
              <div key={idx} className={styles.challengeCard}>
                <h3>{challenge.title}</h3>
                <p>{challenge.desc}</p>
                <div className={styles.challengeMetric}>
                  <span style={{ color: challenge.color }}>{challenge.metric}</span>
                  <span>{challenge.metricLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section with Images */}
      <section className={styles.process}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Our Process</span>
            <h2 className={styles.sectionTitle}>Innovative UI/UX <span className={styles.gradient}>Design Process</span></h2>
            <p className={styles.sectionDesc}>From start to finish, our process transforms your ideas into intuitive user experiences.</p>
          </div>
          <div className={styles.processGrid}>
            {processSteps.map((step, idx) => (
              <div key={idx} className={styles.processCard}>
                <div className={styles.processImage}>
                  <img src={step.image} alt={step.title} />
                  <div className={styles.processStepNumber}>{step.step}</div>
                </div>
                <div className={styles.processContent}>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section with Images */}
      <section className={styles.portfolio}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Recent Work</span>
            <h2 className={styles.sectionTitle}>Design <span className={styles.gradient}>Portfolio</span></h2>
            <p className={styles.sectionDesc}>Showcasing our best design work</p>
          </div>
          <div className={styles.portfolioGrid}>
            {portfolioItems.map((item, idx) => (
              <div key={idx} className={styles.portfolioCard}>
                <div className={styles.portfolioImage}>
                  <img src={item.image} alt={item.name} />
                  <div className={styles.portfolioOverlay}>
                    <span className={styles.portfolioCategory}>{item.category}</span>
                  </div>
                </div>
                <div className={styles.portfolioInfo}>
                  <h3>{item.name}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.portfolioFooter}>
            <Link to="/portfolio" className={styles.viewAllBtn}>
              View All Projects <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={styles.whyUs}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Why Work With Us</span>
            <h2 className={styles.sectionTitle}>6 Reasons to work <span className={styles.gradient}>with us</span></h2>
          </div>
          <div className={styles.reasonsGrid}>
            {[
              'Team of 120+ professionals', 'Data-driven decisions', 'User-centered design',
              'Improved developer efficiency', 'Customized solutions', 'Ongoing support'
            ].map((reason, idx) => (
              <div key={idx} className={styles.reasonCard}>
                <FiCheckCircle size={20} color="#10b981" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
<AllServicesForm/>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <h2>Ready to launch faster and convert more users?</h2>
            <p>Schedule a free 30-minute consultation with our UX experts</p>
            <div className={styles.ctaRating}>
              <div className={styles.ratingStars}>
                {[...Array(5)].map((_, i) => <FiStar key={i} size={16} fill="#f59e0b" color="#f59e0b" />)}
                <span>4.9 AVG. SCORE</span>
              </div>
              <div className={styles.ratingBadges}>
                <span>Top Rated Company</span>
                <span>Top Design Agency Worldwide</span>
              </div>
            </div>
            <Link to="/contact" className={styles.ctaBtn}>
              Book a call with our experts <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UiUxDesign;