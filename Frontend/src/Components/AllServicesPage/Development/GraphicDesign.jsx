import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './GraphicDesign.module.css';
import {
  FiArrowRight, FiCheckCircle, FiClock, FiStar, FiAward,
  FiZap, FiTrendingUp, FiUsers, FiGlobe, FiHeadphones,
  FiTarget, FiEye, FiBarChart2, FiShield, FiRefreshCw,
  FiMail, FiMessageSquare, FiSend, FiUser, FiDollarSign,
  FiPenTool, FiLayout, FiImage, FiVideo, FiGrid,
  FiHeart, FiThumbsUp, FiCalendar, FiBriefcase,
  FiDroplet, FiCircle, FiBox, FiPhone, FiMapPin
} from 'react-icons/fi';
import WaveCanvas from '../../../Pages/Home/Wavecanvas';
import AllServicesForm from '../../../Pages/CompanyServices/AllServicesForm';
import TestimonialSection from '../../../Pages/Home/TestimonialSection';

const GraphicDesign = () => {
  const stats = [
    { value: '10+', label: 'Years Experience', icon: FiAward },
    { value: '500+', label: 'Projects Completed', icon: FiBriefcase },
    { value: '200+', label: 'Happy Clients', icon: FiUsers },
    { value: '98%', label: 'Client Satisfaction', icon: FiStar },
  ];

  const services = [
    { icon: FiPenTool, title: 'Logo Design', desc: 'Unique, memorable brand identities', color: '#3b82f6', image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=250&fit=crop' },
    { icon: FiLayout, title: 'Brand Identity', desc: 'Complete brand visual systems', color: '#10b981', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop' },
    { icon: FiImage, title: 'Print Design', desc: 'Brochures, flyers, business cards', color: '#f59e0b', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=250&fit=crop' },
    { icon: FiGrid, title: 'Social Media Graphics', desc: 'Engaging posts and ads', color: '#8b5cf6', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=250&fit=crop' },
    { icon: FiVideo, title: 'Motion Graphics', desc: 'Animated logos and explainers', color: '#ef4444', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop' },
    { icon: FiDroplet, title: 'Packaging Design', desc: 'Product packaging solutions', color: '#06b6d4', image: 'https://i.pinimg.com/736x/f8/0a/7d/f80a7dacb1beb9949c0e447f6e4fcce2.jpg' },
    { icon: FiEye, title: 'UI/UX Design', desc: 'Web and app interfaces', color: '#ec4899', image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=250&fit=crop' },
    { icon: FiHeart, title: 'Illustration', desc: 'Custom illustrations', color: '#14b8a6', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=250&fit=crop' },
  ];

  const portfolio = [
    { name: 'Brand Identity for Tech Startup', category: 'Branding', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop' },
    { name: 'Corporate Brochure Design', category: 'Print', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop' },
    { name: 'Social Media Campaign', category: 'Social Media', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=300&fit=crop' },
    { name: 'Product Packaging', category: 'Packaging', image: 'https://i.pinimg.com/736x/bb/4b/c4/bb4bc438940d9b2e9d3c7eee295edf5e.jpg' },
    { name: 'Logo Design Collection', category: 'Logo', image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=300&fit=crop' },
    { name: 'Motion Graphics Video', category: 'Motion', image: 'https://i.pinimg.com/736x/12/72/b0/1272b0d8a44337e393b345d0bbab2748.jpg' },
  ];

  const process = [
    { step: '01', title: 'Discovery', desc: 'Understanding your brand and goals', icon: FiTarget },
    { step: '02', title: 'Research', desc: 'Market and competitor analysis', icon: FiEye },
    { step: '03', title: 'Concept', desc: 'Initial design concepts', icon: FiPenTool },
    { step: '04', title: 'Design', desc: 'Creating the final designs', icon: FiLayout },
    { step: '05', title: 'Review', desc: 'Feedback and revisions', icon: FiRefreshCw },
    { step: '06', title: 'Delivery', desc: 'Final files and assets', icon: FiSend },
  ];

  const tools = [
    { name: 'Adobe Photoshop', icon: FiImage, color: '#06b6d4' },
    { name: 'Adobe Illustrator', icon: FiPenTool, color: '#f59e0b' },
    { name: 'Adobe InDesign', icon: FiLayout, color: '#ec4899' },
    { name: 'Figma', icon: FiGrid, color: '#8b5cf6' },
    { name: 'After Effects', icon: FiVideo, color: '#3b82f6' },
    { name: 'Canva', icon: FiHeart, color: '#10b981' },
  ];

  const testimonials = [
    { name: 'Rahul Sharma', role: 'CEO, TechStart', text: 'Amazing design work! They captured our brand perfectly.', rating: 5, image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Priya Patel', role: 'Founder, StyleHub', text: 'Professional, creative, and delivered on time. Highly recommend!', rating: 5, image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { name: 'Amit Kumar', role: 'Marketing Head, FinServe', text: 'The team understood our requirements perfectly.', rating: 5, image: 'https://randomuser.me/api/portraits/men/3.jpg' },
  ];

  return (
    <div className={styles.page}>

      {/* Hero Section */}
      <section className={styles.hero}>
        <WaveCanvas/>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroLeft}>
              <div className={styles.heroBadge}>
                <FiPenTool size={14} /> Graphic Design Agency
              </div>
              <h1 className={styles.heroTitle}>
                Creative <span className={styles.gradient}>Graphic Design</span> Solutions That Make Your Brand Stand Out
              </h1>
              <p className={styles.heroDesc}>
                We create stunning visual identities, marketing materials, and digital assets 
                that capture attention and communicate your brand message effectively.
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
                  src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=500&fit=crop" 
                  alt="Graphic Design" 
                />
                <div className={styles.heroImageOverlay}>
                  <div className={styles.heroImageBadge}>
                    <FiPenTool size={16} /> Award-Winning Designs
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AllServicesForm/>

      {/* Services Section */}
      <section className={styles.services}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>What We Create</span>
            <h2 className={styles.sectionTitle}>Graphic Design <span className={styles.gradient}>Services</span></h2>
            <p className={styles.sectionDesc}>Comprehensive design solutions for all your needs</p>
          </div>
          <div className={styles.servicesGrid}>
            {services.map((service, idx) => (
              <div key={idx} className={styles.serviceCard}>
                <div className={styles.serviceImage}>
                  <img src={service.image} alt={service.title} />
                  <div className={styles.serviceOverlay}>
                    <service.icon size={32} />
                  </div>
                </div>
                <div className={styles.serviceContent}>
                  <div className={styles.serviceIcon} style={{ background: `${service.color}10`, color: service.color }}>
                    <service.icon size={22} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <Link to="/contact" className={styles.serviceLink}>
                    Learn More <FiArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className={styles.portfolio}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Our Work</span>
            <h2 className={styles.sectionTitle}>Design <span className={styles.gradient}>Portfolio</span></h2>
            <p className={styles.sectionDesc}>Showcasing our creative excellence</p>
          </div>
          <div className={styles.portfolioGrid}>
            {portfolio.map((item, idx) => (
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

      {/* Process Section */}
      <section className={styles.process}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>How We Work</span>
            <h2 className={styles.sectionTitle}>Our Design <span className={styles.gradient}>Process</span></h2>
          </div>
          <div className={styles.processGrid}>
            {process.map((step, idx) => (
              <div key={idx} className={styles.processCard}>
                <div className={styles.processNumber}>{step.step}</div>
                <div className={styles.processIcon}>
                  <step.icon size={28} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


<TestimonialSection/>
      {/* Tools Section */}
      <section className={styles.tools}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Tools We Use</span>
            <h2 className={styles.sectionTitle}>Industry <span className={styles.gradient}>Standard Tools</span></h2>
          </div>
          <div className={styles.toolsGrid}>
            {tools.map((tool, idx) => (
              <div key={idx} className={styles.toolCard}>
                <div className={styles.toolIcon} style={{ color: tool.color }}>
                  <tool.icon size={32} />
                </div>
                <h4>{tool.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              <h3>Award-Winning Designs</h3>
              <p>Recognized for creative excellence</p>
            </div>
            <div className={styles.whyUsCard}>
              <div className={styles.whyUsIcon}><FiUsers size={28} /></div>
              <h3>Expert Designers</h3>
              <p>10+ experienced creatives</p>
            </div>
            <div className={styles.whyUsCard}>
              <div className={styles.whyUsIcon}><FiGlobe size={28} /></div>
              <h3>Global Clients</h3>
              <p>Serving 15+ countries</p>
            </div>
            <div className={styles.whyUsCard}>
              <div className={styles.whyUsIcon}><FiHeadphones size={28} /></div>
              <h3>24/7 Support</h3>
              <p>Always available for you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Testimonials</span>
            <h2 className={styles.sectionTitle}>What Our <span className={styles.gradient}>Clients Say</span></h2>
          </div>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className={styles.testimonialCard}>
                <div className={styles.testimonialQuote}>"</div>
                <p className={styles.testimonialText}>{testimonial.text}</p>
                <div className={styles.testimonialAuthor}>
                  <img src={testimonial.image} alt={testimonial.name} className={styles.authorImage} />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
                <div className={styles.testimonialStars}>
                  {[...Array(testimonial.rating)].map((_, i) => <FiStar key={i} size={14} fill="#f59e0b" color="#f59e0b" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <h2>Ready to Elevate Your Brand with Stunning Designs?</h2>
            <p>Let's create visual magic that makes your brand unforgettable.</p>
            <div className={styles.ctaButtons}>
              <Link to="/contact" className={styles.ctaBtnPrimary}>
                Get Free Quote <FiArrowRight size={16} />
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

export default GraphicDesign;