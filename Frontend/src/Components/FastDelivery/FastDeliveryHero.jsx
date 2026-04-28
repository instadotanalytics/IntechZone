import React, { useState, useEffect, useRef } from 'react';
import {
  FaRocket, FaCheckCircle, FaClock, FaHeadset, FaArrowRight,
  FaStar, FaShieldAlt, FaCodeBranch, FaFileInvoiceDollar,
  FaChartPie, FaLock, FaPlay, FaCloud, FaMobile, FaBrain,
  FaDatabase, FaCogs, FaUsers, FaGlobe, FaAward,
  FaPlus, FaMinus, FaLaptopCode, FaProjectDiagram,
  FaPhone, FaChartLine, FaTrophy, FaHandshake, FaBolt,
  FaRegLightbulb, FaCode, FaServer
} from 'react-icons/fa';
import { MdSpeed, MdVerified } from 'react-icons/md';
import { HiOutlineSparkles } from 'react-icons/hi';
import styles from './Fastdeliveryhero.module.css';
import WaveCanvas from '../../Pages/Home/Wavecanvas';

// ── Import your hero image here ──
// import HeroImage from './assets/hero-image.png'; // <-- update path

const FastDeliveryHero = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [counter, setCounter] = useState({ projects: 0, years: 0, clients: 0, countries: 0 });
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const targets = { projects: 500, years: 10, clients: 98, countries: 40 };
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const p = step / steps;
      setCounter({
        projects: Math.floor(targets.projects * p),
        years: Math.floor(targets.years * p),
        clients: Math.floor(targets.clients * p),
        countries: Math.floor(targets.countries * p),
      });
      if (step >= steps) clearInterval(timer);
    }, 2000 / steps);
    return () => clearInterval(timer);
  }, [visible]);

  const techStack = [
    { name: "React", color: "#61dafb" }, { name: "Next.js", color: "#334155" },
    { name: "Node.js", color: "#68a063" }, { name: "Python", color: "#ffd43b" },
    { name: "Flutter", color: "#54c5f8" }, { name: "AWS", color: "#ff9900" },
    { name: "Docker", color: "#0db7ed" }, { name: "PostgreSQL", color: "#336791" },
    { name: "MongoDB", color: "#47a248" }, { name: "Kubernetes", color: "#326ce5" },
    { name: "GraphQL", color: "#e535ab" }, { name: "TypeScript", color: "#3178c6" },
  ];

  const features = [
    { icon: <MdSpeed />, title: "Lightning Fast Delivery", desc: "Agile sprints deliver working features every 2 weeks with zero waterfall delays." },
    { icon: <FaShieldAlt />, title: "Quality Assured", desc: "Automated testing, code reviews and CI/CD pipelines ensure zero-defect delivery." },
    { icon: <FaProjectDiagram />, title: "Real-Time Tracking", desc: "Live dashboards and daily standups keep you 100% in the loop always." },
    { icon: <FaHeadset />, title: "24/7 Support", desc: "Dedicated account manager and round-the-clock engineering support post-launch." },
    { icon: <FaGlobe />, title: "Global Delivery", desc: "Distributed teams across 3 time zones for continuous development velocity." },
    { icon: <FaAward />, title: "Certified Experts", desc: "AWS, Google Cloud, and Azure certified architects on every enterprise project." },
  ];

  const processSteps = [
    { step: "01", title: "Discovery Call", desc: "30-min briefing to understand your goals, stack, and timeline", icon: <FaPhone /> },
    { step: "02", title: "Proposal & SOW", desc: "Detailed scope, milestones and fixed-price quote delivered in 24h", icon: <FaFileInvoiceDollar /> },
    { step: "03", title: "Rapid Build", desc: "Agile sprints with weekly demos and continuous delivery pipeline", icon: <FaCodeBranch /> },
    { step: "04", title: "QA & Launch", desc: "Full testing suite, staging review, and zero-downtime production deploy", icon: <FaRocket /> },
    { step: "05", title: "Ongoing Support", desc: "Post-launch monitoring, enhancements and SLA-backed uptime guarantee", icon: <FaHeadset /> },
  ];

  const faqs = [
    { question: "How quickly can you start my project?", answer: "We typically onboard within 24–48 hours. After a brief discovery call, we finalize the SOW and kick off development sprints immediately. Most projects begin active development within 3 business days.", icon: <FaClock /> },
    { question: "What technologies and frameworks do you use?", answer: "Our stack includes React, Next.js, Vue, Node.js, Python, Django, Flutter, React Native, AWS, Azure, GCP, Kubernetes, Docker, PostgreSQL, MongoDB, Redis, and all major AI/LLM platforms.", icon: <FaCodeBranch /> },
    { question: "How does your pricing model work?", answer: "We offer three models: Fixed-Price (defined scope, guaranteed cost), Dedicated Team (monthly retainer for ongoing work), and Time & Materials (flexible hourly for evolving requirements). Free quote after a 30-min brief.", icon: <FaFileInvoiceDollar /> },
    { question: "Is post-launch support included?", answer: "Yes. Every project includes a 30-day warranty covering bug fixes at no cost. We also offer SLA-backed maintenance plans with 24/7 monitoring, 4-hour response times, and proactive performance optimization.", icon: <FaHeadset /> },
    { question: "Can you handle large-scale enterprise projects?", answer: "Absolutely. We've delivered 500+ projects including enterprise cloud migrations, high-traffic platforms (500K+ DAU), fintech systems, and AI-powered enterprise software. We scale teams to match your needs.", icon: <FaChartPie /> },
    { question: "How do you ensure data security and compliance?", answer: "We implement GDPR, SOC 2, and ISO 27001 compliant practices including end-to-end encryption, role-based access control, secure SDLC, regular penetration testing, and signed NDAs for all team members.", icon: <FaLock /> },
    { question: "Do you work with startups or only enterprises?", answer: "Both. We love building MVPs for startups (2–6 week turnarounds) and architecting complex systems for enterprises. Our tiered engagement models fit seed-stage budgets and Fortune-500 requirements alike.", icon: <FaUsers /> },
    { question: "What makes Intech Zone different from other agencies?", answer: "Three things: speed without cutting corners, full-stack ownership from design to DevOps, and a transparent partnership model. You get a dedicated team that operates as an extension of your company.", icon: <FaAward /> },
  ];

  // Pricing plans
  const plans = [
    {
      name: "Starter", price: "₹49,999", period: "/project",
      desc: "Perfect for startups and small businesses",
      features: ["Up to 5 pages / screens", "React or Flutter", "Basic CI/CD setup", "2-week delivery", "14-day support"],
      cta: "Get Started", highlight: false
    },
    {
      name: "Growth", price: "₹1,49,999", period: "/project",
      desc: "For scaling products and growing teams",
      features: ["Unlimited pages / screens", "Full-stack + Cloud", "Advanced DevOps", "Custom integrations", "30-day warranty", "Priority support"],
      cta: "Most Popular", highlight: true
    },
    {
      name: "Enterprise", price: "Custom", period: "",
      desc: "For complex, mission-critical systems",
      features: ["Dedicated team", "AI/ML integrations", "SOC 2 / GDPR compliance", "SLA-backed uptime", "24/7 monitoring", "Dedicated CSM"],
      cta: "Contact Us", highlight: false
    },
  ];

  // Our numbers / achievements
  const achievements = [
    { icon: <FaTrophy />, title: "Top IT Agency 2024", desc: "Recognized by GoodFirms & Clutch as a top-rated IT partner in India" },
    { icon: <FaHandshake />, title: "500+ Happy Clients", desc: "From funded startups to Fortune 500 companies across 40 countries" },
    { icon: <FaBolt />, title: "Avg. 3-Week Delivery", desc: "Fastest MVP to production timeline in the industry — guaranteed" },
    { icon: <MdVerified />, title: "ISO 27001 Certified", desc: "Enterprise-grade security and data protection standards in every project" },
  ];

  return (
    <div className={styles.mainContainer}>
      

      {/* ══ HERO — left content, right image ══ */}
      <section className={styles.heroSection}>
        <WaveCanvas/>
        <div className={styles.heroBg}>
          <div className={styles.waveOrb1}></div>
          <div className={styles.waveOrb2}></div>
          <div className={styles.gridLines}></div>
        </div>

        <div className={styles.container}>
          <div className={styles.heroGrid}>

            {/* LEFT */}
            <div className={styles.heroLeft}>
              <div className={styles.badge}>
                <span className={styles.badgeDot}></span>
                <span>Enterprise-Grade IT Solutions</span>
              </div>

              <h1 className={styles.mainTitle}>
                The Future-Driven<br />
                <span className={styles.gradientText}>Technology <em>Partner</em></span><br />
                Your Business Needs
              </h1>

              <p className={styles.subtitle}>
                Partner with <strong>Intech Zone</strong> to build, scale, and accelerate your
                business with enterprise-grade software, cloud infrastructure, and strategic IT consulting.
              </p>

              <div className={styles.heroMeta}>
                <div className={styles.heroMetaItem}>
                  <FaCheckCircle /> <span>No upfront cost</span>
                </div>
                <div className={styles.heroMetaItem}>
                  <FaCheckCircle /> <span>Free consultation</span>
                </div>
                <div className={styles.heroMetaItem}>
                  <FaCheckCircle /> <span>48h onboarding</span>
                </div>
              </div>

              <div className={styles.heroTech}>
                {techStack.slice(0, 6).map((t, i) => (
                  <span key={i} className={styles.techPill} style={{ '--tc': t.color }}>
                    {t.name}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — image */}
            <div className={styles.heroRight}>
              <div className={styles.heroImageWrap}>
                {/* Replace src with your actual image import */}
                <img
                  src="https://i.pinimg.com/736x/d1/fa/fc/d1fafc968c8f0edf430175b2cb93eeef.jpg"
                  alt="Intech Zone Team"
                  className={styles.heroImg}
                />
                {/* Floating cards */}
                <div className={styles.floatCard1}>
                  <FaCheckCircle className={styles.floatIcon} />
                  <div>
                    <strong>Project Delivered</strong>
                    <span>On time, every time</span>
                  </div>
                </div>
                <div className={styles.floatCard2}>
                  <FaStar className={styles.floatStar} />
                  <div>
                    <strong>4.9 / 5</strong>
                    <span>Client Rating</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className={styles.scrollIndicator}>
          <span>Scroll</span>
          <div className={styles.scrollLine}></div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className={styles.statsSection} ref={statsRef}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {[
              { number: counter.projects, suffix: "+", label: "Projects Delivered", icon: <FaCheckCircle /> },
              { number: counter.years, suffix: "+", label: "Years Experience", icon: <FaClock /> },
              { number: counter.clients, suffix: "%", label: "Client Satisfaction", icon: <FaStar /> },
              { number: counter.countries, suffix: "+", label: "Countries Served", icon: <FaGlobe /> },
            ].map((stat, i) => (
              <div key={i} className={styles.statCard}>
                <div className={styles.statIconWrap}>{stat.icon}</div>
                <div className={styles.statNumber}>{stat.number}{stat.suffix}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ══ */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Why Choose Us</span>
            <h2>Built for <span className={styles.gradientText}>Speed & Quality</span></h2>
            <p>Every process is engineered to deliver exceptional results, faster than anyone else</p>
          </div>
          <div className={styles.featuresGrid}>
            {features.map((f, i) => (
              <div key={i} className={styles.featureCard}>
                <div className={styles.featureNum}>0{i + 1}</div>
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ACHIEVEMENTS ══ */}
      <section className={styles.achieveSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Our Track Record</span>
            <h2>Proven <span className={styles.gradientText}>Results & Recognition</span></h2>
            <p>Numbers and accolades that reflect our commitment to excellence</p>
          </div>
          <div className={styles.achieveGrid}>
            {achievements.map((a, i) => (
              <div key={i} className={styles.achieveCard}>
                <div className={styles.achieveIcon}>{a.icon}</div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>How We Work</span>
            <h2>From Brief to <span className={styles.gradientText}>Launch in Days</span></h2>
            <p>A battle-tested delivery process refined across 500+ projects worldwide</p>
          </div>
          <div className={styles.processTimeline}>
            {processSteps.map((step, i) => (
              <div key={i} className={styles.processItem}>
                <div className={styles.processLeft}>
                  <div className={styles.processStepNum}>{step.step}</div>
                  {i < processSteps.length - 1 && <div className={styles.processConnector}></div>}
                </div>
                <div className={styles.processContent}>
                  <div className={styles.processIconWrap}>{step.icon}</div>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TECH STACK ══ */}
      <section className={styles.techSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Our Stack</span>
            <h2>Modern <span className={styles.gradientText}>Technology Stack</span></h2>
            <p>Cutting-edge tools for robust, scalable, future-proof solutions</p>
          </div>
          <div className={styles.techGrid}>
            {techStack.map((t, i) => (
              <div key={i} className={styles.techCard} style={{ '--tc': t.color }}>
                <span className={styles.techDot}></span>
                <span>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* ══ FAQ ══ */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>FAQ</span>
            <h2>Frequently Asked <span className={styles.gradientText}>Questions</span></h2>
            <p>Everything you need to know before we start building together</p>
          </div>
          <div className={styles.faqGrid}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ''}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className={styles.faqQuestion}>
                  <div className={styles.faqIconWrap}>{faq.icon}</div>
                  <h4>{faq.question}</h4>
                  <div className={styles.faqToggle}>
                    {openFaq === i ? <FaMinus /> : <FaPlus />}
                  </div>
                </div>
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    

    </div>
  );
};

export default FastDeliveryHero;