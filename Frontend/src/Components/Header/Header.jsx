// Header.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import logo from '../../assets/Intech Zone.png'
import {
  FiGrid, FiMonitor, FiCloud, FiShield, FiCode, FiDatabase,
  FiBarChart2, FiSettings, FiMenu, FiX, FiChevronDown, FiServer,
  FiTool, FiSmartphone, FiGlobe, FiCpu, FiUsers, FiActivity,
  FiLayers, FiCamera, FiHardDrive, FiPrinter, FiBriefcase, FiAward,
  FiBookOpen, FiStar, FiUserCheck, FiGift, FiTrendingUp, FiFeather,
  FiSearch, FiArrowRight, FiZap, FiPhone
} from 'react-icons/fi'

/* ═══════════════════════════════════
   DATA
═══════════════════════════════════ */
export const SERVICES = [
  {
    category: 'Development', color: '#1a55d4',
    items: [
      { icon: FiCode,       label: 'Web Development',      desc: 'Modern, responsive websites & web apps',    detail: 'React, Next.js, Vue, Node.js, PHP',           path: '/services/web-development',      img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=380&fit=crop' },
      { icon: FiSmartphone, label: 'App Development',      desc: 'iOS & Android mobile solutions',            detail: 'React Native, Flutter, Swift, Kotlin',        path: '/services/app-development',      img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=380&fit=crop' },
      { icon: FiSettings,   label: 'Software Development', desc: 'Custom enterprise software products',       detail: 'SaaS, ERP, CRM, bespoke systems',             path: '/services/software-development',  img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=380&fit=crop' },
      { icon: FiLayers,     label: 'UI/UX Design',         desc: 'Beautiful, conversion-focused interfaces',  detail: 'Figma, prototyping, design systems',          path: '/services/ui-ux-design',          img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=380&fit=crop' },
      { icon: FiGlobe,      label: 'Digital Marketing',    desc: 'SEO, social media & paid campaigns',        detail: 'Google Ads, Meta, SEO, analytics',            path: '/services/digital-marketing',    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=380&fit=crop' },
      { icon: FiCamera,     label: 'Graphic Design',       desc: 'Branding, logos & visual identity',         detail: 'Brand kits, motion, print, social',           path: '/services/graphic-design',       img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=380&fit=crop' },
    ],
  },
  {
    category: 'Infrastructure', color: '#0891b2',
    items: [
      { icon: FiCloud,     label: 'Cloud Solutions',  desc: 'AWS, Azure & GCP infrastructure',      detail: 'Migration, DevOps, serverless, IaC',    path: '/services/cloud-solutions',   img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=380&fit=crop' },
      { icon: FiServer,    label: 'Network Setup',    desc: 'LAN, WAN, VPN & wireless networks',    detail: 'Cisco, Fortinet, SD-WAN, firewalls',    path: '/services/network-setup',     img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=380&fit=crop' },
      { icon: FiCpu,       label: 'Hardware Support', desc: 'On-site & remote device repairs',      detail: 'Laptops, servers, printers, POS',       path: '/services/hardware-support',  img: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=600&h=380&fit=crop' },
      { icon: FiHardDrive, label: 'Data Backup',      desc: 'Secure cloud & local backup solutions',detail: 'Automated, encrypted, DR planning',     path: '/services/data-backup',       img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=380&fit=crop' },
      { icon: FiPrinter,   label: 'AMC Services',     desc: 'Annual maintenance contracts',         detail: 'SLA-backed, 24/7 response, audits',     path: '/services/amc',               img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=380&fit=crop' },
      { icon: FiTool,      label: 'IT Outsourcing',   desc: 'Fully managed IT department services', detail: 'Helpdesk, monitoring, patch mgmt',      path: '/services/it-outsourcing',    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=380&fit=crop' },
    ],
  },
  {
    category: 'Consulting & Analytics', color: '#7c3aed',
    items: [
      { icon: FiMonitor,   label: 'IT Consulting',  desc: 'Technology strategy & digital roadmap',  detail: 'Assessments, planning, governance',  path: '/services/it-consulting',  img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=380&fit=crop' },
      { icon: FiShield,    label: 'Cybersecurity',  desc: 'Protect your business from threats',     detail: 'Pen testing, VAPT, SOC, compliance', path: '/services/cybersecurity',  img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=380&fit=crop' },
      { icon: FiDatabase,  label: 'Data Analytics', desc: 'Actionable insights & live dashboards',  detail: 'Power BI, Tableau, ML, pipelines',   path: '/services/data-analytics', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=380&fit=crop' },
      { icon: FiBarChart2, label: 'ERP Solutions',  desc: 'SAP, Odoo & enterprise integrations',    detail: 'Implementation, migration, support', path: '/services/erp-solutions',  img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=380&fit=crop' },
      { icon: FiActivity,  label: 'IT Audit',       desc: 'System health checks & compliance',      detail: 'ISO 27001, SOC2, GDPR readiness',    path: '/services/it-audit',       img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=380&fit=crop' },
      { icon: FiUsers,     label: 'IT Training',    desc: 'Upskill your entire team',               detail: 'Workshops, certifications, LMS',     path: '/services/it-training',    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=380&fit=crop' },
    ],
  },
]

export const CAREERS = [
  {
    category: 'Join Our Team', color: '#059669',
    items: [
      { icon: FiBriefcase, label: 'Full Time Jobs',     desc: 'Permanent roles across all departments', detail: 'Engineering, design, sales, ops',         path: '/careers/full-time',   img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=380&fit=crop' },
      { icon: FiFeather,   label: 'Internships',        desc: 'Learn & grow with real-world projects',  detail: '3–6 month paid programmes',               path: '/careers/internships', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=380&fit=crop' },
      { icon: FiActivity,  label: 'Part Time / Remote', desc: 'Flexible work on your own schedule',     detail: 'Global remote, async-first culture',      path: '/careers/part-time',   img: 'https://images.unsplash.com/photo-1521898284481-a5ec348cb555?w=600&h=380&fit=crop' },
    ]
  },
]

const NAV_LINKS = [
  { label: 'Home',      path: '/' },
  { label: 'About',     path: '/about' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Contact',   path: '/contact' },
]

// Additional pages for autosuggest
const PAGES = [
  { label: 'Home', path: '/', desc: 'Main landing page', keywords: 'home main landing' },
  { label: 'About Us', path: '/about', desc: 'Learn about our company', keywords: 'about company team history' },
  { label: 'Portfolio', path: '/portfolio', desc: 'View our work', keywords: 'projects showcase gallery' },
  { label: 'Contact Us', path: '/contact', desc: 'Get in touch', keywords: 'contact support help inquiry' },
]

// Combine all searchable data for autosuggest
const ALL_SEARCHABLE = [
  ...SERVICES.flatMap(g => g.items.map(item => ({ ...item, type: 'service' }))),
  ...CAREERS.flatMap(g => g.items.map(item => ({ ...item, type: 'career' }))),
  ...PAGES.map(item => ({ ...item, type: 'page' })),
]

/* ═══════════════════════════════════
   MEGA DROPDOWN COMPONENT
═══════════════════════════════════ */
const MegaDropdown = ({ groups, footerText, footerPath, onClose }) => {
  const allItems = groups.flatMap(g => g.items)
  const [hovered, setHovered] = useState(allItems[0])

  const hoveredGroup = groups.find(g => g.items.some(i => i.label === hovered?.label))
  const accentColor = hoveredGroup?.color ?? '#1a55d4'

  return (
    <div className={styles.mega} onMouseLeave={onClose}>
      <div className={styles.megaInner}>
        <div className={styles.megaLeft}>
          {groups.map((group) => (
            <div key={group.category} className={styles.megaGroup}>
              <div className={styles.megaGroupLabel}>
                <span className={styles.megaGroupDot} style={{ background: group.color }} />
                {group.category}
              </div>
              <div className={styles.megaItems}>
                {group.items.map((item) => {
                  const isActive = hovered?.label === item.label
                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      className={`${styles.megaItem} ${isActive ? styles.megaItemActive : ''}`}
                      onMouseEnter={() => setHovered(item)}
                      onClick={onClose}
                    >
                      <div
                        className={styles.megaItemIcon}
                        style={{
                          background: isActive ? `${group.color}1a` : '#f0f4ff',
                          color: isActive ? group.color : '#64748b',
                        }}
                      >
                        <item.icon size={16} />
                      </div>
                      <div className={styles.megaItemText}>
                        <span className={styles.megaItemLabel}>{item.label}</span>
                        <span className={styles.megaItemDesc}>{item.desc}</span>
                      </div>
                      <FiArrowRight
                        size={13}
                        className={`${styles.megaItemArrow} ${isActive ? styles.megaItemArrowVisible : ''}`}
                      />
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.megaRight}>
          {hovered && (
            <div className={styles.megaPreview} key={hovered.label}>
              <div className={styles.megaPreviewImgWrap}>
                <img src={hovered.img} alt={hovered.label} className={styles.megaPreviewImg} />
                <div className={styles.megaPreviewImgOverlay} />
              </div>
              <div className={styles.megaPreviewBody}>
                <div className={styles.megaPreviewTitle}>{hovered.label}</div>
                <p className={styles.megaPreviewDesc}>{hovered.desc}</p>
                <div
                  className={styles.megaPreviewDetail}
                  style={{ color: accentColor, background: `${accentColor}18` }}
                >
                  <FiZap size={11} />
                  {hovered.detail}
                </div>
                <Link
                  to={hovered.path}
                  className={styles.megaPreviewBtn}
                  style={{ background: accentColor }}
                  onClick={onClose}
                >
                  Explore {hovered.label} <FiArrowRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.megaFooter}>
        <span className={styles.megaFooterText}>
          <FiZap size={12} /> {footerText}
        </span>
        <Link to={footerPath} className={styles.megaFooterLink} onClick={onClose}>
          View all <FiArrowRight size={12} />
        </Link>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════
   MAIN HEADER
═══════════════════════════════════ */
export default function Header() {
  const [menuOpen, setMenuOpen]               = useState(false)
  const [dropOpen, setDropOpen]               = useState(null)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileCareersOpen, setMobileCareersOpen]   = useState(false)
  const [scrolled, setScrolled]               = useState(false)
  const [searchOpen, setSearchOpen]           = useState(false)
  const [searchQuery, setSearchQuery]         = useState('')
  const [suggestions, setSuggestions]         = useState([])
  const [activeIndex, setActiveIndex]         = useState(-1)

  const dropTimerRef = useRef(null)
  const searchRef    = useRef(null)
  const searchContainerRef = useRef(null)
  const navigate     = useNavigate()

  /* Scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Auto-focus search input */
  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  /* Esc closes search */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { 
        setSearchOpen(false)
        setSearchQuery('')
        setSuggestions([])
        setActiveIndex(-1)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  /* Click outside to close suggestions */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setSuggestions([])
        setActiveIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  /* Filter suggestions when query changes */
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([])
      setActiveIndex(-1)
      return
    }

    const query = searchQuery.toLowerCase().trim()
    const filtered = ALL_SEARCHABLE.filter(item => {
      const searchStr = `${item.label} ${item.desc} ${item.keywords || ''}`.toLowerCase()
      return searchStr.includes(query)
    }).slice(0, 8) // Max 8 suggestions
    setSuggestions(filtered)
    setActiveIndex(-1)
  }, [searchQuery])

  /* Dropdown helpers */
  const openDrop  = (key) => { clearTimeout(dropTimerRef.current); setDropOpen(key) }
  const closeDrop = useCallback(() => setDropOpen(null), [])
  const delayClose = () => { dropTimerRef.current = setTimeout(closeDrop, 180) }

  /* Search handlers */
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const query = searchQuery.trim()
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
      setSearchOpen(false)
      setSearchQuery('')
      setSuggestions([])
      setActiveIndex(-1)
    }
  }

  const handleSuggestionClick = (item) => {
    navigate(item.path)
    setSearchOpen(false)
    setSearchQuery('')
    setSuggestions([])
    setActiveIndex(-1)
  }

  const handleKeyDown = (e) => {
    if (!suggestions.length) return

    // Arrow down
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0))
    }
    // Arrow up
    else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1))
    }
    // Enter
    else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        handleSuggestionClick(suggestions[activeIndex])
      } else {
        handleSearchSubmit(e)
      }
    }
  }

  const getTypeLabel = (type) => {
    switch(type) {
      case 'service': return 'Service'
      case 'career': return 'Career'
      case 'page': return 'Page'
      default: return ''
    }
  }

  const getTypeColor = (type) => {
    switch(type) {
      case 'service': return '#1a55d4'
      case 'career': return '#059669'
      case 'page': return '#7c3aed'
      default: return '#64748b'
    }
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logoLink}>
          <img src={logo} alt="Intech Zone" className={styles.logoImg} />
        </Link>

        <nav className={styles.desktopNav}>
          {NAV_LINKS.map(({ label, path }) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              {label}
            </NavLink>
          ))}

          <div
            className={styles.dropWrap}
            onMouseEnter={() => openDrop('services')}
            onMouseLeave={delayClose}
          >
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `${styles.navLink} ${styles.dropTrigger} ${
                  isActive || dropOpen === 'services' ? styles.dropTriggerActive : ''
                }`
              }
              onClick={closeDrop}
            >
              Services
              <FiChevronDown
                size={13}
                className={`${styles.chevron} ${dropOpen === 'services' ? styles.chevronOpen : ''}`}
              />
            </NavLink>
            {dropOpen === 'services' && (
              <MegaDropdown
                groups={SERVICES}
                footerText="Need a custom solution? Talk to our experts"
                footerPath="/contact"
                onClose={closeDrop}
              />
            )}
          </div>

          <div
            className={styles.dropWrap}
            onMouseEnter={() => openDrop('careers')}
            onMouseLeave={delayClose}
          >
            <NavLink
              to="/careers"
              className={({ isActive }) =>
                `${styles.navLink} ${styles.dropTrigger} ${
                  isActive || dropOpen === 'careers' ? styles.dropTriggerActive : ''
                }`
              }
              onClick={closeDrop}
            >
              Careers
              <FiChevronDown
                size={13}
                className={`${styles.chevron} ${dropOpen === 'careers' ? styles.chevronOpen : ''}`}
              />
            </NavLink>
            {dropOpen === 'careers' && (
              <MegaDropdown
                groups={CAREERS}
                footerText="50+ domain experts ready to join your team"
                footerPath="/careers/openings"
                onClose={closeDrop}
              />
            )}
          </div>

          <button
            className={`${styles.searchIconBtn} ${searchOpen ? styles.searchIconBtnActive : ''}`}
            onClick={() => { setSearchOpen(v => !v); setSearchQuery(''); setSuggestions([]); setDropOpen(null) }}
            aria-label="Toggle search"
          >
            {searchOpen ? <FiX size={17} /> : <FiSearch size={17} />}
          </button>

          <Link to="/contact" className={styles.ctaBtn}>
            Get Quote <FiArrowRight size={14} />
          </Link>
        </nav>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* ── Slide-down search bar with autosuggest ── */}
      <div className={`${styles.searchBar} ${searchOpen ? styles.searchBarOpen : ''}`} ref={searchContainerRef}>
        <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
          <FiSearch size={17} className={styles.searchFormIcon} />
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search services, careers, solutions…"
            className={styles.searchInput}
            autoComplete="off"
          />
          {searchQuery && (
            <button
              type="button"
              className={styles.searchClear}
              onClick={() => { setSearchQuery(''); setSuggestions([]) }}
            >
              <FiX size={14} />
            </button>
          )}
          <button type="submit" className={styles.searchSubmit}>Search</button>
        </form>

        {/* ── Autosuggest dropdown ── */}
        {suggestions.length > 0 && (
          <div className={styles.suggestionsDropdown}>
            {suggestions.map((item, index) => (
              <button
                key={`${item.type}-${item.label}`}
                className={`${styles.suggestionItem} ${index === activeIndex ? styles.suggestionActive : ''}`}
                onClick={() => handleSuggestionClick(item)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {item.icon && (
                  <div className={styles.suggestionIcon}>
                    <item.icon size={16} />
                  </div>
                )}
                <div className={styles.suggestionContent}>
                  <span className={styles.suggestionLabel}>{item.label}</span>
                  <span className={styles.suggestionDesc}>{item.desc}</span>
                </div>
                <div className={styles.suggestionRight}>
                  <span 
                    className={styles.suggestionType}
                    style={{ color: getTypeColor(item.type), background: `${getTypeColor(item.type)}15` }}
                  >
                    {getTypeLabel(item.type)}
                  </span>
                  <FiArrowRight size={12} className={styles.suggestionArrow} />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <form className={styles.mobileSearchForm} onSubmit={handleSearchSubmit}>
            <FiSearch size={14} className={styles.mobileSearchIcon} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search…"
              className={styles.mobileSearchInput}
            />
          </form>

          {NAV_LINKS.map(({ label, path }) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}

          <button
            className={styles.mobileAccordion}
            onClick={() => setMobileServicesOpen(v => !v)}
          >
            Services
            <FiChevronDown
              size={14}
              className={`${styles.chevron} ${mobileServicesOpen ? styles.chevronOpen : ''}`}
            />
          </button>
          {mobileServicesOpen && (
            <div className={styles.mobileSubMenu}>
              <Link
                to="/services"
                className={`${styles.mobileSubLink} ${styles.mobileSubLinkAll}`}
                onClick={() => { setMenuOpen(false); setMobileServicesOpen(false) }}
              >
                <FiGrid size={14} /> All Services
              </Link>
              {SERVICES.flatMap(g => g.items).map(({ icon: Icon, label, path }) => (
                <Link
                  key={label}
                  to={path}
                  className={styles.mobileSubLink}
                  onClick={() => { setMenuOpen(false); setMobileServicesOpen(false) }}
                >
                  <Icon size={14} /> {label}
                </Link>
              ))}
            </div>
          )}

          <button
            className={styles.mobileAccordion}
            onClick={() => setMobileCareersOpen(v => !v)}
          >
            Careers
            <FiChevronDown
              size={14}
              className={`${styles.chevron} ${mobileCareersOpen ? styles.chevronOpen : ''}`}
            />
          </button>
          {mobileCareersOpen && (
            <div className={styles.mobileSubMenu}>
              <Link
                to="/careers"
                className={`${styles.mobileSubLink} ${styles.mobileSubLinkAll}`}
                onClick={() => { setMenuOpen(false); setMobileCareersOpen(false) }}
              >
                <FiGrid size={14} /> All Careers
              </Link>
              {CAREERS.flatMap(g => g.items).map(({ icon: Icon, label, path }) => (
                <Link
                  key={label}
                  to={path}
                  className={styles.mobileSubLink}
                  onClick={() => { setMenuOpen(false); setMobileCareersOpen(false) }}
                >
                  <Icon size={14} /> {label}
                </Link>
              ))}
            </div>
          )}

          <Link
            to="/contact"
            className={styles.mobileCta}
            onClick={() => setMenuOpen(false)}
          >
            Get Quote <FiArrowRight size={14} />
          </Link>
        </div>
      )}
    </header>
  )
}