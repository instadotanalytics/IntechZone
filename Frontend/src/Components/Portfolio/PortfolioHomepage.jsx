// Pages/Portfolio/PortfolioHomepage.jsx
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './PortfolioHomepage.module.css'
import {
  FiArrowRight, FiExternalLink, FiGithub, FiPlay,
  FiGrid, FiMonitor, FiSmartphone, FiGlobe, FiShoppingCart,
  FiDatabase, FiCloud, FiShield, FiTrendingUp,
  FiChevronDown, FiStar, FiZap, FiCode, FiLayers,
  FiSearch, FiX, FiFilter, FiCheck, FiEye,
  FiCalendar, FiUsers, FiAward, FiClock
} from 'react-icons/fi'


// Portfolio Data
const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    type: 'Full Stack',
    client: 'RetailTech Solutions',
    year: '2024',
    duration: '3 months',
    team: '4 members',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
    image: 'https://i.pinimg.com/736x/c6/0c/0c/c60c0c960a41d79213ba0460726b90a5.jpg',
    thumbnail: 'https://i.pinimg.com/1200x/94/8c/9a/948c9a455108d16c689989cb202eb274.jpg',
    description: 'A fully-featured e-commerce platform with real-time inventory management, payment processing, and analytics dashboard.',
    highlights: [
      '50% increase in sales conversion',
      'Real-time inventory tracking',
      'Multi-payment gateway integration',
      'Advanced analytics dashboard'
    ],
    color: '#6366f1',
    featured: true
  },
  {
    id: 2,
    title: 'Healthcare Mobile App',
    category: 'App Development',
    type: 'Mobile App',
    client: 'MediCare Plus',
    year: '2024',
    duration: '4 months',
    team: '5 members',
    techStack: ['React Native', 'Firebase', 'Node.js', 'MySQL'],
    image: 'https://i.pinimg.com/1200x/13/58/21/1358213306b22a456793c488058f480b.jpg',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=280&fit=crop',
    description: 'Telemedicine app enabling virtual consultations, appointment scheduling, and digital prescription management.',
    highlights: [
      '10,000+ active users',
      'HIPAA compliant',
      'Real-time video consultations',
      'AI-powered symptom checker'
    ],
    color: '#10b981',
    featured: true
  },
  {
    id: 3,
    title: 'Cloud Migration System',
    category: 'Cloud Solutions',
    type: 'Infrastructure',
    client: 'Enterprise Corp',
    year: '2023',
    duration: '6 months',
    team: '8 members',
    techStack: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
    image: 'https://i.pinimg.com/1200x/f5/73/82/f57382f5dc0be685ed2478974f127b87.jpg',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=280&fit=crop',
    description: 'Complete cloud migration from on-premise to AWS with zero downtime, including CI/CD pipeline setup and monitoring.',
    highlights: [
      '99.99% uptime achieved',
      '40% cost reduction',
      'Zero downtime migration',
      'Automated scaling'
    ],
    color: '#0891b2',
    featured: true
  },
  {
    id: 4,
    title: 'Cybersecurity Dashboard',
    category: 'Cybersecurity',
    type: 'Web Application',
    client: 'SecureNet Inc',
    year: '2024',
    duration: '3 months',
    team: '3 members',
    techStack: ['Vue.js', 'Python', 'Django', 'PostgreSQL', 'WebSocket'],
    image: 'https://i.pinimg.com/736x/d5/e6/78/d5e6780379c48ea84977dbd997a6bb7b.jpg',
    thumbnail: 'https://i.pinimg.com/736x/d5/e6/78/d5e6780379c48ea84977dbd997a6bb7b.jpg',
    description: 'Real-time security monitoring dashboard with threat detection, incident response, and compliance reporting.',
    highlights: [
      'Real-time threat detection',
      'SOC 2 compliant',
      'Automated incident response',
      'Compliance reporting'
    ],
    color: '#7c3aed',
    featured: false
  },
  {
    id: 5,
    title: 'ERP System',
    category: 'ERP Solutions',
    type: 'Enterprise Software',
    client: 'Manufacturing Co',
    year: '2023',
    duration: '8 months',
    team: '12 members',
    techStack: ['Angular', 'Java', 'Spring Boot', 'Oracle', 'Docker'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=280&fit=crop',
    description: 'Comprehensive ERP solution for manufacturing industry with supply chain, HR, finance, and production modules.',
    highlights: [
      '30% operational efficiency',
      'Integrated supply chain',
      'Real-time production tracking',
      'Multi-module integration'
    ],
    color: '#f59e0b',
    featured: false
  },
  {
    id: 6,
    title: 'Digital Marketing Platform',
    category: 'Digital Marketing',
    type: 'SaaS Platform',
    client: 'GrowthHub',
    year: '2024',
    duration: '5 months',
    team: '6 members',
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=280&fit=crop',
    description: 'AI-powered marketing automation platform with campaign management, analytics, and lead generation tools.',
    highlights: [
      '200% ROI improvement',
      'AI-powered targeting',
      'Multi-channel campaigns',
      'Advanced analytics'
    ],
    color: '#ec4899',
    featured: false
  },
  {
    id: 7,
    title: 'Network Infrastructure',
    category: 'Network Setup',
    type: 'Infrastructure',
    client: 'Tech Park',
    year: '2023',
    duration: '4 months',
    team: '10 members',
    techStack: ['Cisco', 'Fortinet', 'SD-WAN', 'VPN', 'Monitoring'],
    image: 'https://i.pinimg.com/736x/c5/6d/36/c56d3647f63c80ce687b56e497682163.jpg',
    thumbnail: 'https://i.pinimg.com/736x/c5/6d/36/c56d3647f63c80ce687b56e497682163.jpg',
    description: 'Complete network infrastructure setup for a 50-acre tech park with 100+ businesses.',
    highlights: [
      '100% coverage',
      'Redundant connectivity',
      'Enterprise security',
      '24/7 monitoring'
    ],
    color: '#3b82f6',
    featured: false
  },
  {
    id: 8,
    title: 'Data Analytics Platform',
    category: 'Data Analytics',
    type: 'SaaS Platform',
    client: 'DataViz Corp',
    year: '2024',
    duration: '6 months',
    team: '7 members',
    techStack: ['React', 'Python', 'FastAPI', 'MongoDB', 'D3.js'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    thumbnail: 'https://i.pinimg.com/1200x/11/8d/48/118d48909bba9064aa8a52361fe99016.jpg',
    description: 'Real-time data analytics and visualization platform with custom dashboard creation and reporting.',
    highlights: [
      'Real-time processing',
      'Custom dashboards',
      'AI insights',
      'Export capabilities'
    ],
    color: '#0ea5e9',
    featured: false
  },
  {
    id: 9,
    title: 'UI/UX Design System',
    category: 'UI/UX Design',
    type: 'Design',
    client: 'Multiple Clients',
    year: '2024',
    duration: 'Ongoing',
    team: '3 members',
    techStack: ['Figma', 'React', 'Storybook', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=280&fit=crop',
    description: 'Comprehensive design system with reusable components, patterns, and guidelines for consistent user experience.',
    highlights: [
      '50+ reusable components',
      'Consistent UX patterns',
      'Accessibility compliant',
      'Developer friendly'
    ],
    color: '#8b5cf6',
    featured: false
  }
]

const CATEGORIES = [
  { label: 'All', value: 'all', icon: FiGrid },
  { label: 'Web Development', value: 'Web Development', icon: FiCode },
  { label: 'App Development', value: 'App Development', icon: FiSmartphone },
  { label: 'Cloud Solutions', value: 'Cloud Solutions', icon: FiCloud },
  { label: 'Cybersecurity', value: 'Cybersecurity', icon: FiShield },
  { label: 'ERP Solutions', value: 'ERP Solutions', icon: FiDatabase },
  { label: 'Data Analytics', value: 'Data Analytics', icon: FiTrendingUp },
  { label: 'Digital Marketing', value: 'Digital Marketing', icon: FiGlobe },
  { label: 'UI/UX Design', value: 'UI/UX Design', icon: FiLayers },
  { label: 'Network Setup', value: 'Network Setup', icon: FiMonitor }
]

// Statistics
const STATS = [
  { value: '150+', label: 'Projects Delivered', icon: FiCheck },
  { value: '98%', label: 'Client Satisfaction', icon: FiStar },
  { value: '50+', label: 'Expert Team', icon: FiUsers },
  { value: '12+', label: 'Years Experience', icon: FiAward }
]

const PortfolioHomepage = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef(null)
  const statsRef = useRef(null)

  // Scroll animations
  useEffect(() => {
    setIsVisible(true)
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible)
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll(`.${styles.animateIn}`)
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Filter and search logic
  const filteredProjects = PORTFOLIO_ITEMS.filter(project => {
    const matchesFilter = activeFilter === 'all' || project.category === activeFilter
    const matchesSearch = !searchQuery || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const featuredProjects = filteredProjects.filter(p => p.featured)
  const regularProjects = filteredProjects.filter(p => !p.featured)

  // Smooth scroll to section
  const scrollToProjects = () => {
    document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={styles.portfolioPage}>
       
      {/* ─── HERO SECTION (100vh) ─── */}
      <section className={styles.hero} ref={heroRef}>
         
        {/* Background Elements */}
        <div className={styles.heroBg}>
            
          <div className={styles.heroCircle1} />
          <div className={styles.heroCircle2} />
          <div className={styles.heroDots} />
          <div className={styles.heroGrid} />
        </div>

        {/* Hero Content */}
        <div className={styles.heroContent}>
            
          <div className={styles.heroBadge}>
            <FiZap size={14} />
            <span>Our Portfolio</span>
          </div>
          
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleLine1}>We Build</span>
            <span className={styles.heroTitleLine2}>
              <span className={styles.heroHighlight}>Digital</span> Excellence
            </span>
          </h1>
          
          <p className={styles.heroDesc}>
            Explore our collection of innovative projects that have transformed 
            businesses and delivered exceptional results across industries.
          </p>

          <div className={styles.heroActions}>
            <button className={styles.heroBtn} onClick={scrollToProjects}>
              Explore Projects <FiArrowRight size={18} />
            </button>
            <Link to="/contact" className={styles.heroBtnOutline}>
              Start Your Project <FiChevronDown size={18} />
            </Link>
          </div>

          {/* Stats */}
          <div className={styles.heroStats}>
            {STATS.map((stat, index) => (
              <div key={index} className={styles.heroStatItem}>
                <stat.icon size={20} className={styles.heroStatIcon} />
                <span className={styles.heroStatValue}>{stat.value}</span>
                <span className={styles.heroStatLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <button className={styles.scrollIndicator} onClick={scrollToProjects}>
          <span>Scroll to explore</span>
          <FiChevronDown size={20} className={styles.scrollIcon} />
        </button>
      </section>

      {/* ─── PROJECTS SECTION ─── */}
      <section className={styles.projectsSection} id="projects-section">
        <div className={styles.projectsContainer}>
          {/* Section Header */}
          <div className={`${styles.sectionHeader} ${styles.animateIn}`}>
            <div className={styles.sectionBadge}>
              <FiGrid size={14} />
              <span>Our Work</span>
            </div>
            <h2 className={styles.sectionTitle}>Featured Projects</h2>
            <p className={styles.sectionDesc}>
              Discover how we've helped businesses achieve their goals through innovative technology solutions
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className={`${styles.filterBar} ${styles.animateIn}`}>
            <div className={styles.searchBox}>
              <FiSearch size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              {searchQuery && (
                <button className={styles.searchClear} onClick={() => setSearchQuery('')}>
                  <FiX size={16} />
                </button>
              )}
            </div>
            
            <div className={styles.filterButtons}>
              {CATEGORIES.slice(0, 5).map((cat) => (
                <button
                  key={cat.value}
                  className={`${styles.filterBtn} ${activeFilter === cat.value ? styles.filterBtnActive : ''}`}
                  onClick={() => setActiveFilter(cat.value)}
                >
                  <cat.icon size={14} />
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Featured Projects Grid */}
          {featuredProjects.length > 0 && (
            <div className={styles.featuredGrid}>
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`${styles.featuredCard} ${styles.animateIn}`}
                  style={{ '--delay': `${index * 0.1}s` }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className={styles.featuredImageWrap}>
                    <img src={project.image} alt={project.title} className={styles.featuredImage} />
                    <div className={styles.featuredOverlay}>
                      <button className={styles.viewProjectBtn}>
                        <FiEye size={20} /> View Details
                      </button>
                    </div>
                    {project.featured && (
                      <span className={styles.featuredTag}>
                        <FiStar size={12} /> Featured
                      </span>
                    )}
                  </div>
                  <div className={styles.featuredContent}>
                    <div className={styles.featuredMeta}>
                      <span className={styles.projectCategory} style={{ color: project.color, background: `${project.color}15` }}>
                        {project.category}
                      </span>
                      <span className={styles.projectYear}>
                        <FiCalendar size={12} /> {project.year}
                      </span>
                    </div>
                    <h3 className={styles.featuredTitle}>{project.title}</h3>
                    <p className={styles.featuredDesc}>{project.description}</p>
                    <div className={styles.techStack}>
                      {project.techStack.slice(0, 4).map((tech, i) => (
                        <span key={i} className={styles.techTag}>{tech}</span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className={styles.techTag}>+{project.techStack.length - 4}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Regular Projects Grid */}
          <div className={styles.projectsGrid}>
            {regularProjects.map((project, index) => (
              <div
                key={project.id}
                className={`${styles.projectCard} ${styles.animateIn}`}
                style={{ '--delay': `${index * 0.08}s` }}
                onClick={() => setSelectedProject(project)}
              >
                <div className={styles.projectImageWrap}>
                  <img src={project.thumbnail} alt={project.title} className={styles.projectImage} />
                  <div className={styles.projectOverlay}>
                    <FiEye size={24} />
                  </div>
                </div>
                <div className={styles.projectContent}>
                  <span className={styles.projectCategory} style={{ color: project.color, background: `${project.color}15` }}>
                    {project.category}
                  </span>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDesc}>{project.description.slice(0, 80)}...</p>
                  <div className={styles.projectFooter}>
                    <div className={styles.techStack}>
                      {project.techStack.slice(0, 3).map((tech, i) => (
                        <span key={i} className={styles.techTag}>{tech}</span>
                      ))}
                    </div>
                    <span className={styles.projectYear}>{project.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className={styles.emptyState}>
              <FiSearch size={48} />
              <h3>No projects found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── PROJECT DETAIL MODAL ─── */}
      {selectedProject && (
        <div className={styles.modal} onClick={() => setSelectedProject(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelectedProject(null)}>
              <FiX size={24} />
            </button>
            
            <div className={styles.modalImageWrap}>
              <img src={selectedProject.image} alt={selectedProject.title} className={styles.modalImage} />
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalHeader}>
                <div>
                  <span className={styles.projectCategory} style={{ color: selectedProject.color, background: `${selectedProject.color}15` }}>
                    {selectedProject.category}
                  </span>
                  <h2 className={styles.modalTitle}>{selectedProject.title}</h2>
                </div>
                <span className={styles.modalYear}>{selectedProject.year}</span>
              </div>

              <p className={styles.modalDesc}>{selectedProject.description}</p>

              <div className={styles.modalGrid}>
                <div className={styles.modalField}>
                  <FiUsers size={16} />
                  <div>
                    <label>Client</label>
                    <span>{selectedProject.client}</span>
                  </div>
                </div>
                <div className={styles.modalField}>
                  <FiClock size={16} />
                  <div>
                    <label>Duration</label>
                    <span>{selectedProject.duration}</span>
                  </div>
                </div>
                <div className={styles.modalField}>
                  <FiUsers size={16} />
                  <div>
                    <label>Team Size</label>
                    <span>{selectedProject.team}</span>
                  </div>
                </div>
                <div className={styles.modalField}>
                  <FiCalendar size={16} />
                  <div>
                    <label>Year</label>
                    <span>{selectedProject.year}</span>
                  </div>
                </div>
              </div>

              <div className={styles.modalSection}>
                <h3>Key Highlights</h3>
                <ul className={styles.highlightsList}>
                  {selectedProject.highlights.map((highlight, i) => (
                    <li key={i}>
                      <FiCheck size={16} color="#10b981" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.modalSection}>
                <h3>Technologies Used</h3>
                <div className={styles.techStack}>
                  {selectedProject.techStack.map((tech, i) => (
                    <span key={i} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>

              <div className={styles.modalActions}>
                <Link to="/contact" className={styles.modalBtn}>
                  Start Similar Project <FiArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── CTA SECTION ─── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <div className={`${styles.ctaContent} ${styles.animateIn}`}>
            <div className={styles.ctaBadge}>
              <FiZap size={14} />
              <span>Let's Build Together</span>
            </div>
            <h2 className={styles.ctaTitle}>Ready to Create Your Success Story?</h2>
            <p className={styles.ctaDesc}>
              Join 150+ businesses that have transformed their digital presence with our expertise
            </p>
            <div className={styles.ctaActions}>
              <Link to="/contact" className={styles.ctaBtn}>
                Get Free Consultation <FiArrowRight size={18} />
              </Link>
              <Link to="/services" className={styles.ctaBtnOutline}>
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PortfolioHomepage