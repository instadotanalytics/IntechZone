// Pages/Search/SearchResults.jsx
import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { FiSearch, FiArrowRight, FiZap, FiGrid, FiX } from 'react-icons/fi'
import styles from './SearchResults.module.css'

// Search Data - All searchable items
const SEARCH_DATA = [
  // Pages
  { category: 'Pages', label: 'Home', path: '/', keywords: 'home main landing page', desc: 'Main landing page' },
  { category: 'Pages', label: 'About Us', path: '/about', keywords: 'about company team history mission vision', desc: 'Learn about our company' },
  { category: 'Pages', label: 'Portfolio', path: '/portfolio', keywords: 'projects work showcase gallery', desc: 'View our portfolio' },
  { category: 'Pages', label: 'Contact Us', path: '/contact', keywords: 'contact reach support help inquiry quote', desc: 'Get in touch with us' },
  
  // Development Services
  { category: 'Services', label: 'Web Development', path: '/services/web-development', keywords: 'website web app react nextjs frontend backend fullstack', desc: 'Modern websites & web apps' },
  { category: 'Services', label: 'App Development', path: '/services/app-development', keywords: 'mobile app ios android react native flutter swift', desc: 'iOS & Android mobile solutions' },
  { category: 'Services', label: 'Software Development', path: '/services/software-development', keywords: 'custom software enterprise saas erp crm', desc: 'Custom enterprise software' },
  { category: 'Services', label: 'UI/UX Design', path: '/services/ui-ux-design', keywords: 'design interface user experience figma prototype', desc: 'Beautiful interfaces' },
  { category: 'Services', label: 'Digital Marketing', path: '/services/digital-marketing', keywords: 'seo social media marketing google ads meta analytics', desc: 'SEO & digital marketing' },
  { category: 'Services', label: 'Graphic Design', path: '/services/graphic-design', keywords: 'branding logo design visual identity motion graphics', desc: 'Branding & visual identity' },
  
  // Infrastructure Services
  { category: 'Services', label: 'Cloud Solutions', path: '/services/cloud-solutions', keywords: 'cloud aws azure gcp devops serverless migration', desc: 'AWS, Azure & GCP infrastructure' },
  { category: 'Services', label: 'Network Setup', path: '/services/network-setup', keywords: 'network lan wan vpn wireless cisco firewall', desc: 'LAN, WAN & VPN networks' },
  { category: 'Services', label: 'Hardware Support', path: '/services/hardware-support', keywords: 'hardware repair laptop server printer pos support', desc: 'Device repairs & support' },
  { category: 'Services', label: 'Data Backup', path: '/services/data-backup', keywords: 'backup data recovery cloud local automated encrypted', desc: 'Secure backup solutions' },
  { category: 'Services', label: 'AMC Services', path: '/services/amc', keywords: 'annual maintenance contract sla support 24/7', desc: 'Annual maintenance contracts' },
  { category: 'Services', label: 'IT Outsourcing', path: '/services/it-outsourcing', keywords: 'outsourcing managed it helpdesk monitoring support', desc: 'Managed IT services' },
  
  // Consulting & Analytics
  { category: 'Services', label: 'IT Consulting', path: '/services/it-consulting', keywords: 'consulting strategy digital roadmap technology planning', desc: 'Technology strategy & roadmap' },
  { category: 'Services', label: 'Cybersecurity', path: '/services/cybersecurity', keywords: 'security cyber protection pen testing vapt soc compliance', desc: 'Protect from cyber threats' },
  { category: 'Services', label: 'Data Analytics', path: '/services/data-analytics', keywords: 'analytics data insights power bi tableau ml dashboard', desc: 'Actionable insights & dashboards' },
  { category: 'Services', label: 'ERP Solutions', path: '/services/erp-solutions', keywords: 'erp sap odoo enterprise resource planning implementation', desc: 'ERP implementation & support' },
  { category: 'Services', label: 'IT Audit', path: '/services/it-audit', keywords: 'audit compliance iso 27001 soc2 gdpr security assessment', desc: 'System health checks & compliance' },
  { category: 'Services', label: 'IT Training', path: '/services/it-training', keywords: 'training workshop certification upskill learning development', desc: 'Upskill your team' },
  
  // Careers
  { category: 'Careers', label: 'Careers', path: '/careers', keywords: 'jobs career opportunities work join team hiring', desc: 'Join our team' },
  { category: 'Careers', label: 'Full Time Jobs', path: '/careers/full-time', keywords: 'full time permanent job engineering design sales', desc: 'Permanent roles' },
  { category: 'Careers', label: 'Internships', path: '/careers/internships', keywords: 'internship intern training learn program student', desc: 'Learn & grow with us' },
  { category: 'Careers', label: 'Part Time / Remote', path: '/careers/part-time', keywords: 'part time remote flexible freelance work from home', desc: 'Flexible work options' },
  
  // Features/Pages
  { category: 'Features', label: 'Fast Delivery', path: '/fast-delivery', keywords: 'fast quick delivery speed agile rapid', desc: 'Rapid delivery solutions' },
  { category: 'Features', label: '24/7 Support', path: '/247-support', keywords: 'support 24/7 round clock help assistance always', desc: 'Round-the-clock support' },
  { category: 'Features', label: 'Expert Team', path: '/expert-team', keywords: 'expert team professionals skilled experienced talent', desc: 'Our expert professionals' },
  { category: 'Features', label: 'Affordable Pricing', path: '/affordable-pricing', keywords: 'affordable pricing cost budget cheap competitive value', desc: 'Competitive pricing' },
  { category: 'Features', label: 'Secure Solutions', path: '/secure-solutions', keywords: 'secure security safe protection encrypted solutions', desc: 'Secure & safe solutions' },
  { category: 'Features', label: 'Scalable Growth', path: '/scalable-growth', keywords: 'scalable growth expand scale business infrastructure', desc: 'Scale your business' },
]

// Highlight matching text
const HighlightText = ({ text, query }) => {
  if (!query.trim()) return <span>{text}</span>
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  
  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? <mark key={i} className={styles.highlight}>{part}</mark> : <span key={i}>{part}</span>
      )}
    </span>
  )
}

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  
  useEffect(() => {
    if (query.trim()) {
      const filtered = SEARCH_DATA.filter(item => {
        const searchStr = `${item.label} ${item.keywords} ${item.desc} ${item.category}`.toLowerCase()
        return searchStr.includes(query.toLowerCase())
      })
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [query])
  
  // Get unique categories for filter
  const categories = ['all', ...new Set(results.map(r => r.category))]
  
  const filteredResults = activeFilter === 'all' 
    ? results 
    : results.filter(r => r.category === activeFilter)
  
  // Group results by category
  const groupedResults = filteredResults.reduce((acc, result) => {
    if (!acc[result.category]) acc[result.category] = []
    acc[result.category].push(result)
    return acc
  }, {})

  return (
    <div className={styles.searchPage}>
      <div className={styles.searchContainer}>
        {/* Header */}
        <div className={styles.searchHeader}>
          <div className={styles.searchHeaderTop}>
            <FiSearch size={24} className={styles.searchHeaderIcon} />
            <h1>
              Search Results for <span>"{query}"</span>
            </h1>
          </div>
          <p className={styles.resultsCount}>
            {results.length} result{results.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Filters */}
        {results.length > 0 && (
          <div className={styles.filters}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeFilter === cat ? styles.filterActive : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat === 'all' ? 'All' : cat}
                {cat === 'all' 
                  ? ` (${results.length})`
                  : ` (${results.filter(r => r.category === cat).length})`
                }
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        {results.length > 0 ? (
          <div className={styles.resultsList}>
            {Object.entries(groupedResults).map(([category, items]) => (
              <div key={category} className={styles.resultGroup}>
                <div className={styles.groupHeader}>
                  <FiGrid size={16} />
                  <h2>{category}</h2>
                  <span className={styles.groupCount}>{items.length}</span>
                </div>
                <div className={styles.groupItems}>
                  {items.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className={styles.resultCard}
                    >
                      <div className={styles.resultCardIcon}>
                        <FiZap size={18} />
                      </div>
                      <div className={styles.resultCardContent}>
                        <h3>
                          <HighlightText text={item.label} query={query} />
                        </h3>
                        <p>
                          <HighlightText text={item.desc} query={query} />
                        </p>
                        <span className={styles.resultCategory}>{item.category}</span>
                      </div>
                      <FiArrowRight className={styles.resultArrow} size={18} />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : query ? (
          /* No Results */
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>
              <FiSearch size={48} />
            </div>
            <h2>No results found</h2>
            <p>We couldn't find anything for "<strong>{query}</strong>"</p>
            <div className={styles.noResultsSuggestions}>
              <p>Try:</p>
              <ul>
                <li>Checking your spelling</li>
                <li>Using more general keywords</li>
                <li>Searching for services like "web development" or "cloud"</li>
              </ul>
            </div>
            <Link to="/" className={styles.backHome}>
              Go to Homepage
            </Link>
          </div>
        ) : (
          /* Empty Search */
          <div className={styles.emptySearch}>
            <div className={styles.emptyIcon}>
              <FiSearch size={48} />
            </div>
            <h2>Search Intech Zone</h2>
            <p>Find services, careers, and more</p>
            <div className={styles.popularSearches}>
              <p>Popular searches:</p>
              <div className={styles.popularTags}>
                {['Web Development', 'Cloud Solutions', 'Cybersecurity', 'Internships', 'ERP', 'UI/UX Design'].map(tag => (
                  <Link
                    key={tag}
                    to={`/search?q=${encodeURIComponent(tag)}`}
                    className={styles.popularTag}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResults