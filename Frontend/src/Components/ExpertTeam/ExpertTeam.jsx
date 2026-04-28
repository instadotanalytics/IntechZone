// ExpertTeam.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './ExpertTeam.module.css';
import WaveCanvas from '../../Pages/Home/Wavecanvas';
import {
  FiLinkedin,
  FiStar,
  FiAward,
  FiCheckCircle,
  FiArrowRight,
  FiUsers,
  FiBriefcase,
  FiGlobe,
  FiAward as FiTrophy,
  FiShield,
  FiTrendingUp,
  FiZap,
  FiMail,
  FiCalendar,
  FiMessageCircle,
  FiThumbsUp,
  FiClock,
  FiMapPin,
  FiPhone,
  FiBookOpen,
  FiTarget,
  FiCpu,
  FiCode,
  FiBarChart2,
  FiSmile
} from 'react-icons/fi';

/* ── Data ── */
const experts = [
  {
    name: "Paramjeet Saluja",
    role: "Digital Marketing Strategist",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQE7vwIXN1msWQ/profile-displayphoto-shrink_400_400/B4DZc1SlEpHAAg-/0/1748945753724?e=1778716800&v=beta&t=jNw7Dwgzi6Y5Ss_PM6pCbEA6S78td5RHb_jZ37OzpLw",
    linkedin: "https://www.linkedin.com/in/paramjeetsaluja/",
    experience: "12+ Years",
    color: "#2563eb",
    number: "01",
    expertise: ["SEO Strategy", "PPC Campaigns", "Social Media", "Analytics"],
    achievements: ["$50M+ Ad Spend Managed", "500+ Campaigns Delivered", "15 Industry Awards"],
    certifications: ["Google Analytics Certified", "Meta Blueprint", "HubSpot Inbound"],
    bio: "Paramjeet is a seasoned digital marketing strategist with over a decade of experience driving measurable growth for Fortune 500 companies and high-growth startups. His data-driven approach consistently delivers 3–5x ROI improvements.",
    rating: 4.9,
  },
  {
    name: "Jairaj Singh",
    role: "Full Stack Development Lead",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQEckvhh_YETpw/profile-displayphoto-scale_400_400/B4DZzgQiFnKEAg-/0/1773288958402?e=1778716800&v=beta&t=e3vWAeeR5SgdkrzEORxUyyFNj0kDJYkw_2s54FWp8E0",
    linkedin: "https://www.linkedin.com/in/jairaj-singh-1604332a0/",
    experience: "8+ Years",
    color: "#7c3aed",
    number: "02",
    expertise: ["React / Next.js", "Node.js", "Python", "AWS Architecture"],
    achievements: ["50+ Apps Deployed", "99.9% Uptime Record", "3x Tech Patents"],
    certifications: ["AWS Solutions Architect", "MongoDB Certified", "Kubernetes (CKA)"],
    bio: "Jairaj is a full-stack architect specializing in scalable web applications and cloud infrastructure. He has led development teams at tech unicorns and brings deep expertise in modern JavaScript ecosystems and DevOps.",
    rating: 4.8,
  },
  {
    name: "Siddharth Gupta",
    role: "Independent Technology Analyst",
    image: "https://media.licdn.com/dms/image/v2/C4E03AQEBOi1HAHv7pQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1645245061165?e=1778716800&v=beta&t=ldLWN8xBXLCyjvXX61RyFBbbrGZzePFrTjcepZLLRAg",
    linkedin: "https://www.linkedin.com/in/siddharth-gupta-independent-analyst/",
    experience: "10+ Years",
    color: "#059669",
    number: "03",
    expertise: ["Tech Due Diligence", "Market Analysis", "Product Strategy", "AI/ML Advisory"],
    achievements: ["100+ Tech Audits Completed", "$2B+ Deals Advised", "Forbes Tech Council Member"],
    certifications: ["CFA Charterholder", "AWS Cloud Practitioner", "Certified Scrum Master"],
    bio: "Siddharth is an independent technology analyst and advisor who helps enterprises make critical tech decisions. His insights have guided M&A deals worth over $2 billion and shaped product roadmaps for industry leaders worldwide.",
    rating: 5.0,
  },
  {
    name: "Marketing Strategist",
    role: "Growth & Performance Specialist",
    image: "https://media.licdn.com/dms/image/v2/C4E03AQFparA72h0QcQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1516298674954?e=1778716800&v=beta&t=5i5AU89dfKEdVjsoznSZOaDjpfDto6dYesfUEdRtLgM",
    linkedin: "https://www.linkedin.com/in/digitalmarketingstrategist/",
    experience: "10+ Years",
    color: "#dc2626",
    number: "04",
    expertise: ["Growth Hacking", "Brand Strategy", "Performance Marketing", "Conversion Optimization"],
    achievements: ["200+ Brands Scaled", "10x ROI Campaigns Delivered", "Top 1% Global Marketers"],
    certifications: ["Google Ads Certified", "HubSpot Marketing", "Facebook Blueprint"],
    bio: "A results-driven performance marketing specialist with deep expertise in scaling brands through data-backed growth strategies. Known for innovative digital campaigns that consistently exceed targets and deliver exceptional business results.",
    rating: 4.9,
  }
];

const faqData = [
  {
    q: "How do I get started working with your expert team?",
    a: "Getting started is simple. Reach out via our contact form or book a free 30-minute discovery call. We'll understand your business goals, assess your needs, and match you with the right experts from our team. Most projects kick off within 5–7 business days of initial consultation."
  },
  {
    q: "What industries do your experts specialize in?",
    a: "Our team has deep experience across technology, e-commerce, SaaS, fintech, healthcare, and B2B services. Paramjeet leads digital marketing across all verticals, Jairaj specializes in tech product companies, and Siddharth focuses on enterprise and investment-backed firms."
  },
  {
    q: "Do you offer short-term project engagements or only long-term retainers?",
    a: "We offer both. Short-term project-based engagements (4–12 weeks) are ideal for audits, strategy sprints, or specific deliverables. Long-term retainers provide ongoing strategic support, execution, and account management. We'll recommend the best fit based on your objectives."
  },
  {
    q: "What makes Intech Zone's team different from a typical agency?",
    a: "Unlike traditional agencies where junior staff handle your work, you get direct access to senior experts with 8–12+ years of experience. We combine strategic advisory with hands-on execution — no outsourcing, no account manager middlemen. Every expert on your project is accountable and involved."
  },
  {
    q: "Can I hire experts from your team on a fractional basis?",
    a: "Absolutely. Our fractional model allows you to engage a senior expert part-time — for example, a Fractional CMO or Fractional CTO — at a fraction of the cost of a full-time hire. This is particularly popular with startups and scale-ups that need senior leadership without full-time overhead."
  },
  {
    q: "How do you ensure quality and accountability on projects?",
    a: "Every project begins with a detailed scope document and defined KPIs. We run biweekly check-ins, provide transparent reporting dashboards, and hold dedicated project retrospectives. Our team operates with a results-first mindset — your success metrics are our success metrics."
  },
  {
    q: "What tools and platforms do your experts work with?",
    a: "Our marketing team works with Google Ads, Meta Ads, HubSpot, SEMrush, Salesforce, and GA4. Our dev team uses React, Node.js, AWS, Docker, and GitHub. Technology analysts leverage industry platforms like PitchBook, Gartner, and custom research frameworks tailored to each engagement."
  },
  {
    q: "Is there a minimum engagement budget or commitment?",
    a: "Our minimum project engagement starts at ₹50,000 for one-time audits and strategic sprints. Monthly retainers begin at ₹1,20,000 depending on the scope and experts involved. We believe in transparent, upfront pricing — no hidden fees or surprise invoices."
  }
];

/* ── Component ── */
export default function ExpertTeam() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  // Star rating component
  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className={styles.ratingRow}>
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            size={13}
            fill={i < fullStars ? "#f59e0b" : "none"}
            color="#f59e0b"
            style={{ fill: i < fullStars ? "#f59e0b" : "none" }}
          />
        ))}
        <span className={styles.ratingText}>{rating} / 5.0</span>
      </div>
    );
  };

  return (
    <div className={styles.page}>

      {/* ══════════ HERO BANNER ══════════ */}
      <section className={styles.heroBanner}>
        <WaveCanvas/>
        <div className={styles.container}>
          <div className={styles.heroInner}>

            <div className={styles.heroText}>
              <div className={styles.heroPill}>
                ⭐ Meet The Experts &nbsp;|&nbsp; 50+ Specialists
              </div>
              <h1 className={styles.heroTitle}>
                Industry Veterans<br />Who <em>Deliver Results</em>
              </h1>
              <p className={styles.heroDesc}>
                Our leadership team brings decades of combined experience from Fortune 500
                companies, unicorn startups, and top consulting firms. We don't just
                advise — we execute.
              </p>
              <div className={styles.heroStats}>
                <div className={styles.heroStat}>
                  <span className={styles.heroStatNum}>50+</span>
                  <span className={styles.heroStatLabel}>Domain Experts</span>
                </div>
                <div className={styles.heroStatDivider} />
                <div className={styles.heroStat}>
                  <span className={styles.heroStatNum}>15+</span>
                  <span className={styles.heroStatLabel}>Avg. Years Exp.</span>
                </div>
                <div className={styles.heroStatDivider} />
                <div className={styles.heroStat}>
                  <span className={styles.heroStatNum}>500+</span>
                  <span className={styles.heroStatLabel}>Projects Delivered</span>
                </div>
                <div className={styles.heroStatDivider} />
                <div className={styles.heroStat}>
                  <span className={styles.heroStatNum}>200+</span>
                  <span className={styles.heroStatLabel}>Happy Clients</span>
                </div>
              </div>
            </div>

            <div className={styles.heroRight}>
              {[
                { icon: <FiTrophy size={24} />, title: "15+ Awards", sub: "Industry Recognised" },
                { icon: <FiCheckCircle size={24} />, title: "100+ Certs", sub: "Google, AWS, Meta" },
                { icon: <FiGlobe size={24} />, title: "Global Reach", sub: "20+ Countries" },
                { icon: <FiTrendingUp size={24} />, title: "Forbes Listed", sub: "Tech Council" },
              ].map((b, i) => (
                <div key={i} className={styles.heroBadgeCard}>
                  <span className={styles.badgeCardIcon}>{b.icon}</span>
                  <div>
                    <span className={styles.badgeCardTitle}>{b.title}</span>
                    <span className={styles.badgeCardSub}>{b.sub}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════ EXPERT CARDS ══════════ */}
      <section className={styles.expertsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionLabel}>👥 Our Leadership</span>
            <h2 className={styles.sectionTitle}>
              Meet Our <span className={styles.gradText}>Core Experts</span>
            </h2>
            <p className={styles.sectionSub}>
              Industry leaders who bring unparalleled expertise to every project — hands-on,
              accountable, and results-driven.
            </p>
          </div>

          <div className={styles.expertsList}>
            {experts.map((expert, i) => (
              <div key={i} className={styles.expertCard}>

                {/* Image */}
                <div className={styles.cardImgCol}>
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className={styles.cardImg}
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(expert.name)}&background=eff6ff&color=2563eb&size=400&bold=true`;
                    }}
                  />
                  <div className={styles.cardImgOverlay} />
                  <div
                    className={styles.cardNumBadge}
                    style={{ background: expert.color }}
                  >
                    {expert.number}
                  </div>
                  <a
                    href={expert.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardLinkedIn}
                    title={`${expert.name} on LinkedIn`}
                  >
                    <FiLinkedin size={18} />
                  </a>
                </div>

                {/* Info */}
                <div className={styles.cardInfoCol}>

                  {/* Top row */}
                  <div className={styles.cardTopRow}>
                    <div>
                      <div className={styles.cardName}>{expert.name}</div>
                      <div className={styles.cardRole} style={{ color: expert.color }}>
                        {expert.role}
                      </div>
                    </div>
                    <div
                      className={styles.cardExpPill}
                      style={{
                        background: `${expert.color}12`,
                        color: expert.color,
                        border: `1.5px solid ${expert.color}28`
                      }}
                    >
                      <FiClock size={12} style={{ marginRight: 4 }} />
                      {expert.experience}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className={styles.cardBio}>{expert.bio}</p>

                  {/* 3-col row */}
                  <div className={styles.cardRow}>

                    {/* Expertise */}
                    <div className={styles.cardCol}>
                      <span className={styles.colLabel}>Core Expertise</span>
                      <div className={styles.tagGroup}>
                        {expert.expertise.map((t, j) => (
                          <span
                            key={j}
                            className={styles.tag}
                            style={{
                              color: expert.color,
                              background: `${expert.color}0e`,
                              borderColor: `${expert.color}28`
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className={styles.cardCol}>
                      <span className={styles.colLabel}>Key Achievements</span>
                      {expert.achievements.map((a, j) => (
                        <div key={j} className={styles.achieveItem}>
                          <span className={styles.achieveIcon}>
                            <FiAward size={12} color={expert.color} />
                          </span>
                          {a}
                        </div>
                      ))}
                    </div>

                    {/* Certifications */}
                    <div className={styles.cardCol}>
                      <span className={styles.colLabel}>Certifications</span>
                      {expert.certifications.map((c, j) => (
                        <div key={j} className={styles.certItem}>
                          <FiCheckCircle size={11} color={expert.color} />
                          {c}
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Footer */}
                  <div className={styles.cardFooter}>
                    <StarRating rating={expert.rating} />
                    <a
                      href={expert.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.viewProfileBtn}
                    >
                      <FiLinkedin size={14} /> View LinkedIn Profile <FiArrowRight size={12} />
                    </a>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ WHY US ══════════ */}
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <div className={styles.valuesSplit}>

            <div className={styles.valuesLeft}>
              <span className={styles.sectionLabel}>💡 Why Choose Us</span>
              <h2 className={styles.sectionTitle}>
                What Makes Us <span className={styles.gradText}>Different</span>
              </h2>
              <p className={styles.sectionSub}>
                We're not your typical agency. Every engagement is led by a senior expert who
                owns the outcome — transparent, hands-on, and results-focused from day one.
              </p>
              <div className={styles.valuesHighlights}>
                {[
                  "Direct access to senior-level experts — no juniors",
                  "Clear KPIs and biweekly progress reporting",
                  "Flexible engagement models — project or retainer",
                  "100% transparent pricing with no hidden fees",
                  "Dedicated expert accountability for every deliverable",
                ].map((h, i) => (
                  <div key={i} className={styles.highlightRow}>
                    <div className={styles.highlightDot} />
                    {h}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.valuesRight}>
              {[
                { icon: <FiCpu size={28} />, title: "Deep Domain Expertise", desc: "Specialized knowledge across digital marketing, full-stack development, and technology strategy built over 8–12+ years." },
                { icon: <FiZap size={28} />, title: "Speed of Execution", desc: "Rapid implementation without compromising quality. From strategy to live results in record time." },
                { icon: <FiUsers size={28} />, title: "True Partnership", desc: "We succeed when you succeed. Transparent collaboration, shared goals, and open communication at every step." },
                { icon: <FiShield size={28} />, title: "Unbiased Advisory", desc: "Independent, vendor-neutral guidance you can rely on for the most critical business and technology decisions." },
                { icon: <FiBarChart2 size={28} />, title: "Data-First Approach", desc: "Every recommendation is backed by data, analytics, and measurable benchmarks — no guesswork, ever." },
                { icon: <FiGlobe size={28} />, title: "Global Perspective", desc: "Exposure across 20+ countries and industries gives our team a uniquely broad and battle-tested worldview." },
              ].map((v, i) => (
                <div key={i} className={styles.valueCard}>
                  <span className={styles.valueCardIcon}>{v.icon}</span>
                  <div className={styles.valueCardTitle}>{v.title}</div>
                  <p className={styles.valueCardDesc}>{v.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════ EXPERTISE AREAS ══════════ */}
      <section className={styles.areasSection}>
        <div className={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <span className={styles.sectionLabel}>🎯 Capabilities</span>
            <h2 className={styles.sectionTitle}>
              Areas of <span className={styles.gradText}>Excellence</span>
            </h2>
            <p className={styles.sectionSub} style={{ margin: '0 auto' }}>
              Specialized domains where we consistently deliver exceptional, measurable value
            </p>
          </div>
          <div className={styles.areasGrid}>
            {[
              { icon: <FiTrendingUp size={28} />, title: "Digital Marketing Strategy", desc: "SEO, PPC, Social Media, Content Marketing, Analytics & Attribution Modelling", lead: "Paramjeet Saluja" },
              { icon: <FiCode size={28} />, title: "Full Stack Development", desc: "React, Node.js, Python, Cloud Architecture, DevOps, CI/CD Pipelines", lead: "Jairaj Singh" },
              { icon: <FiTarget size={28} />, title: "Technology Advisory", desc: "Due Diligence, Market Analysis, Product Strategy & AI/ML Roadmapping", lead: "Siddharth Gupta" },
              { icon: <FiZap size={28} />, title: "Growth & Performance", desc: "Conversion Optimization, Brand Strategy, Funnel Design, Growth Hacking", lead: "Marketing Expert" },
            ].map((a, i) => (
              <div key={i} className={styles.areaCard}>
                <div className={styles.areaIconWrap}>
                  {a.icon}
                </div>
                <div className={styles.areaTitle}>{a.title}</div>
                <p className={styles.areaDesc}>{a.desc}</p>
                <span className={styles.areaLead}>Led by {a.lead}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className={styles.testimonialSection}>
        <div className={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <span className={styles.sectionLabel}>💬 Client Stories</span>
            <h2 className={styles.sectionTitle}>
              What Our <span className={styles.gradText}>Clients Say</span>
            </h2>
            <p className={styles.sectionSub} style={{ margin: '0 auto' }}>
              Real results from real partnerships — hear directly from the businesses we've helped grow
            </p>
          </div>
          <div className={styles.testimonialWrap}>
            {[
              {
                text: "Intech Zone's expert team transformed our digital presence completely. Paramjeet's marketing strategy drove 300% organic growth in six months, while Jairaj's team built a rock-solid platform that handles 10x our previous traffic without a hitch.",
                name: "Rahul Khanna", title: "CEO, TechScale Solutions", initials: "RK", rating: 5
              },
              {
                text: "Siddharth's technology advisory was a game-changer during our Series B raise. His due diligence framework and market analysis gave investors the confidence they needed. We closed our round 40% faster than projected.",
                name: "Priya Mehta", title: "Founder, Finova Labs", initials: "PM", rating: 5
              },
              {
                text: "Working with Paramjeet on our PPC campaigns was eye-opening. Within 90 days, our cost-per-acquisition dropped by 52% while conversion rates more than doubled. The team's transparency and responsiveness is unmatched.",
                name: "Arjun Sharma", title: "CMO, RetailEdge India", initials: "AS", rating: 5
              },
              {
                text: "Jairaj led the complete rebuild of our SaaS platform on AWS. The new architecture is 4x faster, costs 30% less to run, and has maintained 99.98% uptime over the past year. Truly exceptional engineering leadership.",
                name: "Neha Patel", title: "CTO, CloudBase Technologies", initials: "NP", rating: 5
              },
            ].map((t, i) => (
              <div key={i} className={styles.testimonialCard}>
                <span className={styles.quoteIconWrap}>"</span>
                <p className={styles.testimonialText}>{t.text}</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorAvatar}>{t.initials}</div>
                  <div>
                    <span className={styles.authorName}>{t.name}</span>
                    <span className={styles.authorTitle}>{t.title}</span>
                  </div>
                </div>
                <div className={styles.testimonialStars}>
                  {[...Array(t.rating)].map((_, j) => <FiStar key={j} size={13} fill="#f59e0b" color="#f59e0b" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.faqLayout}>

            {/* Left */}
            <div className={styles.faqLeft}>
              <span className={styles.sectionLabel}>❓ FAQ</span>
              <h2 className={styles.sectionTitle}>
                Frequently Asked <span className={styles.gradText}>Questions</span>
              </h2>
              <p className={styles.sectionSub}>
                Everything you need to know before partnering with our expert team.
                Can't find your answer? Reach out directly.
              </p>
              <div style={{ height: 24 }} />
              <div className={styles.faqContactCard}>
                <div className={styles.faqContactTitle}>Still have questions?</div>
                <p className={styles.faqContactDesc}>
                  Our team responds to every inquiry within 24 hours. Book a free
                  consultation and get direct answers from a senior expert.
                </p>
                <Link to="/contact" className={styles.faqContactBtn}>
                  <FiMail size={16} /> &nbsp;Contact Us Now
                </Link>
              </div>
            </div>

            {/* Right: FAQ list */}
            <div className={styles.faqList}>
              {faqData.map((item, i) => (
                <div
                  key={i}
                  className={`${styles.faqItem} ${openFaq === i ? styles.open : ''}`}
                >
                  <button
                    className={styles.faqQuestion}
                    onClick={() => toggleFaq(i)}
                    aria-expanded={openFaq === i}
                  >
                    <span className={styles.faqQText}>{item.q}</span>
                    <span className={styles.faqQIcon}>+</span>
                  </button>
                  <div className={styles.faqAnswer}>
                    <div className={styles.faqAnswerInner}>{item.a}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════ CTA BANNER ══════════ */}
      <section className={styles.ctaBanner}>
        <div className={styles.container}>
          <div className={styles.ctaInner}>
            <div style={{ fontSize: '2rem', marginBottom: 12 }}>✨</div>
            <h2 className={styles.ctaTitle}>Ready to Work With Industry Experts?</h2>
            <p className={styles.ctaSub}>
              Get access to 50+ specialists who've delivered 500+ successful projects across
              marketing, development, and technology advisory.
            </p>
            <div className={styles.ctaBtns}>
              <Link to="/contact" className={styles.ctaBtnPrimary}>
                <FiBriefcase size={16} /> &nbsp;Start a Project
              </Link>
              <Link to="/contact" className={styles.ctaBtnGhost}>
                <FiCalendar size={16} /> &nbsp;Book Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}