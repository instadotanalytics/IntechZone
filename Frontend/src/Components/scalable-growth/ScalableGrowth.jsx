import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ScalableGrowth.module.css';
import {
  FiTrendingUp,
  FiBarChart2,
  FiZap,
  FiUsers,
  FiGlobe,
  FiTarget,
  FiAward,
  FiClock,
  FiCheckCircle,
  FiArrowRight,
  FiLayers,
  FiCloud,
  FiDatabase,
  FiCode,
  FiSmartphone,
  FiServer,
  FiShoppingCart,
  FiMail,
  FiMessageCircle,
  FiActivity,
  FiDollarSign,
  FiPieChart,
  FiUserPlus,
  FiRefreshCw,
  FiCpu,
  FiAnchor
} from 'react-icons/fi';

// Hero Section
const HeroSection = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroBgImage} />
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <div className={styles.heroBadge}>
          <FiAnchor size={18} />
          <span>Scale Your Business</span>
        </div>
        <h1 className={styles.heroTitle}>
          Accelerate Your<br />
          <span className={styles.heroGradient}>Scalable Growth</span>
        </h1>
        <p className={styles.heroDesc}>
          Enterprise-ready solutions that grow with your business. From startup to industry leader,
          we provide the infrastructure, tools, and strategies for sustainable scaling.
        </p>
        <div className={styles.heroStats}>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>300%</span>
            <span className={styles.heroStatLabel}>Avg Revenue Growth</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>10x</span>
            <span className={styles.heroStatLabel}>Scalability Factor</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>1000+</span>
            <span className={styles.heroStatLabel}>Businesses Scaled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Growth Solutions Component
const GrowthSolutions = () => {
  const solutions = [
    { icon: FiCloud, title: 'Cloud Infrastructure', desc: 'AWS, Azure & GCP solutions that scale automatically with your demand.' },
    { icon: FiDatabase, title: 'Data Management', desc: 'Handle petabytes of data with our scalable database architecture.' },
    { icon: FiCode, title: 'Microservices', desc: 'Build flexible, independently deployable services.' },
    { icon: FiSmartphone, title: 'Mobile Scaling', desc: 'Apps that perform flawlessly from 100 to 1M+ users.' },
    { icon: FiServer, title: 'Load Balancing', desc: 'Intelligent traffic distribution for optimal performance.' },
    { icon: FiShoppingCart, title: 'E-commerce Scaling', desc: 'Handle flash sales and peak traffic without downtime.' },
  ];

  return (
    <section className={styles.solutions}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>Growth Solutions</span>
          <h2 className={styles.sectionTitle}>Scalable <span className={styles.gradientText}>Infrastructure</span></h2>
          <p className={styles.sectionDesc}>Built to handle your exponential growth</p>
        </div>
        <div className={styles.solutionsGrid}>
          {solutions.map((sol, idx) => (
            <div key={idx} className={styles.solutionCard}>
              <div className={styles.solutionIcon}>
                <sol.icon size={28} />
              </div>
              <h3 className={styles.solutionTitle}>{sol.title}</h3>
              <p className={styles.solutionDesc}>{sol.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Growth Metrics with animated counters
const GrowthMetrics = () => {
  const [counts, setCounts] = useState({ revenue: 0, users: 0, speed: 0, uptime: 0 });
  const sectionRef = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated.current) {
        animated.current = true;
        const duration = 2000;
        const step = 20;
        const targets = { revenue: 312, users: 150, speed: 99, uptime: 99 };
        const increments = {
          revenue: targets.revenue / (duration / step),
          users: targets.users / (duration / step),
          speed: targets.speed / (duration / step),
          uptime: targets.uptime / (duration / step),
        };
        let current = { revenue: 0, users: 0, speed: 0, uptime: 0 };
        const timer = setInterval(() => {
          current = {
            revenue: Math.min(current.revenue + increments.revenue, targets.revenue),
            users: Math.min(current.users + increments.users, targets.users),
            speed: Math.min(current.speed + increments.speed, targets.speed),
            uptime: Math.min(current.uptime + increments.uptime, targets.uptime),
          };
          setCounts({ ...current });
          if (current.revenue >= targets.revenue) clearInterval(timer);
        }, step);
      }
    }, { threshold: 0.3 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.metrics} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.metricsGrid}>
          <div className={styles.metricItem}>
            <FiDollarSign size={32} className={styles.metricIcon} />
            <div className={styles.metricNumber}>{Math.floor(counts.revenue)}%</div>
            <div className={styles.metricLabel}>Revenue Growth</div>
          </div>
          <div className={styles.metricItem}>
            <FiUsers size={32} className={styles.metricIcon} />
            <div className={styles.metricNumber}>{Math.floor(counts.users)}M+</div>
            <div className={styles.metricLabel}>Active Users</div>
          </div>
          <div className={styles.metricItem}>
            <FiZap size={32} className={styles.metricIcon} />
            <div className={styles.metricNumber}>{counts.speed.toFixed(0)}%</div>
            <div className={styles.metricLabel}>Faster Performance</div>
          </div>
          <div className={styles.metricItem}>
            <FiActivity size={32} className={styles.metricIcon} />
            <div className={styles.metricNumber}>{counts.uptime.toFixed(0)}.%</div>
            <div className={styles.metricLabel}>Uptime SLA</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Growth Process/Strategy
const GrowthStrategy = () => {
  const strategies = [
    { icon: FiTarget, title: 'Assessment', desc: 'Analyze current infrastructure and identify bottlenecks' },
    { icon: FiLayers, title: 'Architecture', desc: 'Design scalable microservices architecture' },
    { icon: FiRefreshCw, title: 'Migration', desc: 'Seamless transition with zero downtime' },
    { icon: FiTrendingUp, title: 'Optimization', desc: 'Continuous monitoring and performance tuning' },
  ];

  return (
    <section className={styles.strategy}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>Our Process</span>
          <h2 className={styles.sectionTitle}>Growth <span className={styles.gradientText}>Strategy</span></h2>
          <p className={styles.sectionDesc}>A proven framework for sustainable scaling</p>
        </div>
        <div className={styles.strategyGrid}>
          {strategies.map((item, idx) => (
            <div key={idx} className={styles.strategyCard}>
              <div className={styles.strategyStep}>0{idx + 1}</div>
              <div className={styles.strategyIcon}>
                <item.icon size={24} />
              </div>
              <h3 className={styles.strategyTitle}>{item.title}</h3>
              <p className={styles.strategyDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Growth Tools & Technologies
const GrowthTools = () => {
  const tools = [
    'AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform',
    'Redis', 'MongoDB', 'PostgreSQL', 'Kafka', 'Spark', 'React', 'Node.js'
  ];

  return (
    <section className={styles.tools}>
      <div className={styles.container}>
        <div className={styles.toolsContent}>
          <div className={styles.toolsLeft}>
            <span className={styles.sectionBadge}>Tech Stack</span>
            <h2 className={styles.sectionTitle}>Enterprise-Grade <span className={styles.gradientText}>Tools</span></h2>
            <p className={styles.sectionDesc}>Leverage the best technologies for scalable growth</p>
            <Link to="/services/cloud-solutions" className={styles.toolsBtn}>
              Explore Solutions <FiArrowRight size={14} />
            </Link>
          </div>
          <div className={styles.toolsRight}>
            {tools.map((tool, idx) => (
              <div key={idx} className={styles.toolBadge}>
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Success Stats
const SuccessStories = () => {
  const stories = [
    { metric: '500%', label: 'User Growth', company: 'FinTech Startup' },
    { metric: '3x', label: 'Revenue Increase', company: 'E-commerce Brand' },
    { metric: '99.99%', label: 'Uptime Achievement', company: 'SaaS Platform' },
    { metric: '10M+', label: 'Daily Requests', company: 'Social App' },
  ];

  return (
    <section className={styles.success}>
      <div className={styles.container}>
        <div className={styles.successGrid}>
          {stories.map((story, idx) => (
            <div key={idx} className={styles.successCard}>
              <div className={styles.successMetric}>{story.metric}</div>
              <div className={styles.successLabel}>{story.label}</div>
              <div className={styles.successCompany}>{story.company}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Features/Benefits
const Features = () => {
  const features = [
    { icon: FiCheckCircle, title: 'Auto-scaling', desc: 'Automatic resource allocation based on demand' },
    { icon: FiCheckCircle, title: 'Global CDN', desc: 'Fast content delivery worldwide' },
    { icon: FiCheckCircle, title: '24/7 Support', desc: 'Expert monitoring and assistance' },
    { icon: FiCheckCircle, title: 'Security First', desc: 'Enterprise-grade protection at scale' },
  ];

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.featuresGrid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureItem}>
              <feature.icon size={20} className={styles.featureIcon} />
              <div>
                <h4 className={styles.featureTitle}>{feature.title}</h4>
                <p className={styles.featureDesc}>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let angle = 0;

    const draw = () => {
      if (!ctx || !canvas) return;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.3;
      
      for (let i = 0; i < 3; i++) {
        const rad = radius + i * 15;
        ctx.beginPath();
        ctx.arc(centerX, centerY, rad, angle + i * Math.PI * 0.5, angle + Math.PI + i * Math.PI * 0.5);
        ctx.strokeStyle = `rgba(0, 150, 200, ${0.15 - i * 0.05})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      angle += 0.005;
      animationId = requestAnimationFrame(draw);
    };
    draw();
    const handleResize = () => { canvas.width = canvas.clientWidth; canvas.height = canvas.clientHeight; };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className={styles.cta}>
      <canvas ref={canvasRef} className={styles.ctaCanvas} />
      <div className={styles.ctaOverlay} />
      <div className={styles.container}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Scale Your Business?</h2>
          <p className={styles.ctaDesc}>Get a free scalability assessment and growth roadmap.</p>
          <div className={styles.ctaButtons}>
            <Link to="/contact" className={styles.ctaBtnPrimary}>
              Start Scaling <FiArrowRight size={16} />
            </Link>
            <Link to="/services/cloud-solutions" className={styles.ctaBtnSecondary}>
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Component
const ScalableGrowth = () => {
  return (
    <div className={styles.page}>
      <HeroSection />
      <GrowthSolutions />
      <GrowthMetrics />
      <GrowthStrategy />
      <GrowthTools />
      <SuccessStories />
      <Features />
      <CTASection />
    </div>
  );
};

export default ScalableGrowth;