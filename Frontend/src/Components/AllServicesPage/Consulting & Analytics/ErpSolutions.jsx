import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './ErpSolutions.module.css';
import {
  FiArrowRight, FiCheckCircle, FiClock, FiStar, FiAward,
  FiZap, FiTrendingUp, FiUsers, FiGlobe, FiHeadphones,
  FiTarget, FiShield, FiRefreshCw, FiServer, FiCpu,
  FiCloud, FiMonitor, FiTool, FiMail, FiPhone,
  FiMapPin, FiDollarSign, FiPieChart, FiCode,
  FiDatabase, FiActivity, FiGrid, FiBarChart2,
  FiMessageSquare, FiLayers, FiSettings, FiLifeBuoy,
  FiPackage, FiTruck, FiShoppingCart, FiClipboard,
  FiBriefcase, FiCalendar, FiFileText, FiBookOpen,
  FiGitMerge, FiLink, FiToggleLeft, FiMaximize,
  FiPlay, FiPause, FiDownload, FiShare2, FiChevronDown,
  FiChevronUp, FiHexagon, FiCircle, FiTriangle,
  FiMousePointer, FiCommand, FiCrop, FiLayout,
  FiSmartphone, FiTablet, FiHardDrive, FiWifi
} from 'react-icons/fi';
import WaveCanvas from '../../../Pages/Home/Wavecanvas';
import AllServicesForm from '../../../Pages/CompanyServices/AllServicesForm';
import TestimonialSection from '../../../Pages/Home/TestimonialSection';

// ==================== CANVAS ANIMATION COMPONENT ====================
const CanvasAnimation = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = `rgba(59, 130, 246, ${this.opacity})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Node class for network connections
    class Node {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 3 + 2;
        this.pulseRadius = this.radius;
        this.pulseAlpha = 0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 50 || this.x > width - 50) this.vx *= -1;
        if (this.y < 50 || this.y > height - 50) this.vy *= -1;

        // Pulse animation
        this.pulseAlpha += 0.02;
        if (this.pulseAlpha > 1) this.pulseAlpha = 0;
        this.pulseRadius = this.radius + Math.sin(this.pulseAlpha * Math.PI * 2) * 8;
      }

      draw(ctx, mouseX, mouseY) {
        // Pulse ring
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.3 - this.pulseAlpha * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#3b82f6';
        ctx.fill();

        // Glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 3);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
        gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.2)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Connection to mouse
        const distToMouse = Math.hypot(this.x - mouseX, this.y - mouseY);
        if (distToMouse < 200) {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(59, 130, 246, ${0.3 - distToMouse / 600})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Initialize
    const particles = Array.from({ length: 50 }, () => new Particle());
    const nodes = Array.from({ length: 15 }, () => new Node());

    // Grid lines
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.03)';
      ctx.lineWidth = 0.5;
      const spacing = 60;

      for (let x = 0; x < width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    // Connect nodes
    const drawConnections = () => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 - dist / 1000})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    // Hexagon pattern
    const drawHexagons = (time) => {
      ctx.save();
      const hexSize = 40;
      const hexWidth = hexSize * Math.sqrt(3);
      const hexHeight = hexSize * 2;

      for (let row = -1; row < Math.ceil(height / (hexHeight * 0.75)) + 1; row++) {
        for (let col = -1; col < Math.ceil(width / hexWidth) + 1; col++) {
          const x = col * hexWidth + (row % 2) * (hexWidth / 2);
          const y = row * (hexHeight * 0.75);

          const distFromCenter = Math.hypot(x - width / 2, y - height / 2);
          const maxDist = Math.hypot(width / 2, height / 2);
          const alpha = Math.max(0, (1 - distFromCenter / maxDist) * 0.05);

          drawHexagon(x, y, hexSize, alpha, time);
        }
      }
      ctx.restore();
    };

    const drawHexagon = (x, y, size, alpha, time) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + time * 0.0002;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    // Animate
    const animate = (time) => {
      ctx.clearRect(0, 0, width, height);

      // Draw grid
      drawGrid();

      // Draw hexagons
      drawHexagons(time);

      // Update and draw particles
      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      // Update and draw nodes
      nodes.forEach(node => node.update());
      drawConnections();
      nodes.forEach(node => node.draw(ctx, mouseRef.current.x, mouseRef.current.y));

      animationRef.current = requestAnimationFrame(animate);
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles.forEach(p => p.reset());
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvasAnimation} />;
};

// ==================== ANIMATED COUNTER COMPONENT ====================
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const numValue = parseInt(value);
            if (isNaN(numValue)) {
              setCount(value);
              return;
            }

            const startTime = Date.now();
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(numValue * eased));

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(numValue);
              }
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return <span ref={elementRef}>{count}{value.toString().replace(/[0-9]/g, '')}</span>;
};

// ==================== PARTICLES EXPLOSION EFFECT ====================
const useParticleEffect = (containerRef) => {
  const createParticles = useCallback((x, y) => {
    const container = containerRef.current;
    if (!container) return;

    const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
    
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      const angle = (Math.PI * 2 * i) / 12;
      const velocity = 50 + Math.random() * 80;
      
      particle.className = styles.particle;
      particle.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        --tx: ${Math.cos(angle) * velocity}px;
        --ty: ${Math.sin(angle) * velocity}px;
      `;
      
      container.appendChild(particle);
      
      particle.addEventListener('animationend', () => {
        particle.remove();
      });
    }
  }, [containerRef]);

  return createParticles;
};

// ==================== MAIN ERP SOLUTIONS COMPONENT ====================
const ErpSolutions = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [hoveredModule, setHoveredModule] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particleContainerRef = useRef(null);
  const createParticles = useParticleEffect(particleContainerRef);
  const heroRef = useRef(null);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse position tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleCardClick = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createParticles(x, y);
    setHoveredModule(index);
  };

  const stats = [
    { value: '150+', label: 'ERP Implementations', desc: 'Across 20+ Industries', icon: FiPackage },
    { value: '40%', label: 'Operational Efficiency', desc: 'Average Improvement', icon: FiTrendingUp },
    { value: '30%', label: 'Cost Reduction', desc: 'Through Automation', icon: FiDollarSign },
    { value: '50+', label: 'ERP Consultants', desc: 'Certified Experts', icon: FiUsers }
  ];

  const erpModules = [
    {
      icon: FiDollarSign,
      title: 'Finance & Accounting',
      description: 'Comprehensive financial management with general ledger, accounts payable/receivable, fixed assets, cash management, and real-time financial reporting.',
      features: ['General Ledger', 'Accounts Payable/Receivable', 'Fixed Asset Management', 'Cash & Treasury Management', 'Financial Consolidation', 'Multi-currency Support'],
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
    },
    {
      icon: FiUsers,
      title: 'Human Capital Management',
      description: 'End-to-end HR management from recruitment to retirement. Includes payroll, talent management, time tracking, and employee self-service portals.',
      features: ['Core HR & Payroll', 'Recruitment & Onboarding', 'Performance Management', 'Time & Attendance', 'Learning Management', 'Employee Self-Service'],
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #059669)'
    },
    {
      icon: FiShoppingCart,
      title: 'Supply Chain Management',
      description: 'Optimize your entire supply chain from procurement to delivery. Real-time inventory tracking, demand forecasting, and supplier management.',
      features: ['Procurement & Sourcing', 'Inventory Management', 'Order Management', 'Warehouse Management', 'Demand Planning', 'Supplier Portal'],
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)'
    },
    {
      icon: FiPackage,
      title: 'Manufacturing & Production',
      description: 'Streamline manufacturing operations with production planning, shop floor control, quality management, and product lifecycle management.',
      features: ['Production Planning', 'Bill of Materials (BOM)', 'Shop Floor Control', 'Quality Management', 'Product Lifecycle', 'MRP & MPS'],
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, #ef4444, #dc2626)'
    },
    {
      icon: FiUsers,
      title: 'Customer Relationship Management',
      description: '360-degree customer view with sales force automation, marketing automation, customer service management, and partner relationship management.',
      features: ['Sales Force Automation', 'Marketing Automation', 'Customer Service', 'Contact Management', 'Lead & Opportunity Mgmt', 'Partner Portal'],
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
    },
    {
      icon: FiBarChart2,
      title: 'Business Intelligence & Analytics',
      description: 'Real-time dashboards, KPI tracking, predictive analytics, and reporting tools for data-driven decision making across all departments.',
      features: ['Executive Dashboards', 'KPI Monitoring', 'Ad-hoc Reporting', 'Predictive Analytics', 'Budgeting & Planning', 'Compliance Reporting'],
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)'
    },
    {
      icon: FiFileText,
      title: 'Project Management',
      description: 'Comprehensive project planning, resource management, time and expense tracking, and project profitability analysis.',
      features: ['Project Planning', 'Resource Management', 'Time & Expense Tracking', 'Project Accounting', 'Gantt Charts', 'Portfolio Management'],
      color: '#14b8a6',
      gradient: 'linear-gradient(135deg, #14b8a6, #0d9488)'
    },
    {
      icon: FiSettings,
      title: 'Enterprise Asset Management',
      description: 'Manage physical assets throughout their lifecycle. Track maintenance schedules, work orders, and asset depreciation for optimal utilization.',
      features: ['Asset Tracking', 'Preventive Maintenance', 'Work Order Management', 'Asset Depreciation', 'Spare Parts Management', 'IoT Integration'],
      color: '#f97316',
      gradient: 'linear-gradient(135deg, #f97316, #ea580c)'
    }
  ];

  const erpPlatforms = [
    { name: 'SAP S/4HANA', description: 'Enterprise-grade ERP for large organizations', icon: FiServer, modules: 25, deployment: 'Cloud, On-Premise, Hybrid', color: '#3b82f6' },
    { name: 'Oracle NetSuite', description: 'Cloud ERP for fast-growing businesses', icon: FiCloud, modules: 20, deployment: 'Cloud', color: '#ef4444' },
    { name: 'Microsoft Dynamics 365', description: 'Flexible ERP with deep Microsoft integration', icon: FiMonitor, modules: 22, deployment: 'Cloud, On-Premise, Hybrid', color: '#10b981' },
    { name: 'Odoo ERP', description: 'Open-source ERP with 10,000+ apps', icon: FiPackage, modules: 30, deployment: 'Cloud, On-Premise', color: '#8b5cf6' },
    { name: 'Acumatica', description: 'Cloud ERP for mid-market companies', icon: FiCloud, modules: 15, deployment: 'Cloud', color: '#f59e0b' },
    { name: 'Infor CloudSuite', description: 'Industry-specific ERP solutions', icon: FiGrid, modules: 18, deployment: 'Cloud', color: '#06b6d4' }
  ];

  const implementationProcess = [
    { phase: '01', title: 'Discovery & Planning', description: 'Business process analysis, requirements gathering, project scoping, and implementation roadmap creation.', duration: '4-6 Weeks', activities: ['Process Mapping', 'Gap Analysis', 'Scope Definition', 'Project Planning'], icon: FiTarget },
    { phase: '02', title: 'System Design', description: 'Solution architecture, customization design, integration planning, and data migration strategy development.', duration: '6-8 Weeks', activities: ['Architecture Design', 'Customization Specs', 'Integration Design', 'Data Strategy'], icon: FiLayout },
    { phase: '03', title: 'Configuration & Development', description: 'ERP system configuration, custom development, integration build, and unit testing of individual modules.', duration: '12-16 Weeks', activities: ['System Configuration', 'Custom Development', 'Integration Build', 'Unit Testing'], icon: FiSettings },
    { phase: '04', title: 'Data Migration', description: 'Data cleansing, extraction, transformation, loading, and validation from legacy systems to new ERP.', duration: '4-6 Weeks', activities: ['Data Cleansing', 'ETL Process', 'Data Validation', 'Cutover Planning'], icon: FiDatabase },
    { phase: '05', title: 'Testing & Training', description: 'System integration testing, user acceptance testing, end-user training, and documentation preparation.', duration: '6-8 Weeks', activities: ['Integration Testing', 'UAT', 'User Training', 'Documentation'], icon: FiBookOpen },
    { phase: '06', title: 'Go-Live & Support', description: 'Production deployment, hypercare support, issue resolution, and transition to ongoing support.', duration: '4-6 Weeks', activities: ['Go-Live Execution', 'Hypercare Support', 'Issue Resolution', 'Knowledge Transfer'], icon: FiZap }
  ];

  const benefits = [
    { icon: FiZap, title: 'Streamlined Operations', description: 'Eliminate manual processes and duplicate data entry with automated workflows across departments.' },
    { icon: FiActivity, title: 'Real-Time Visibility', description: 'Get instant access to KPIs, financials, and operational metrics with centralized dashboards.' },
    { icon: FiTrendingUp, title: 'Improved Productivity', description: 'Boost employee productivity by 30-50% through process automation and integrated systems.' },
    { icon: FiShield, title: 'Enhanced Compliance', description: 'Stay compliant with built-in regulatory controls, audit trails, and automated reporting.' },
    { icon: FiDollarSign, title: 'Cost Reduction', description: 'Reduce operational costs by 25-40% through inventory optimization and process efficiency.' },
    { icon: FiGitMerge, title: 'Seamless Integration', description: 'Connect all business functions with a single source of truth, eliminating data silos.' }
  ];

  const caseStudies = [
    {
      title: 'Manufacturing ERP Transformation',
      industry: 'Manufacturing',
      company: 'ABC Manufacturing Ltd.',
      challenge: 'A mid-sized manufacturer with 5 plants struggled with disconnected systems, inventory inaccuracies, and 30% production delays due to lack of real-time data.',
      solution: 'Implemented SAP S/4HANA with integrated manufacturing, supply chain, and finance modules. Automated production planning and real-time inventory tracking.',
      results: [
        { metric: '45%', label: 'Fewer Delays' },
        { metric: '35%', label: 'Inventory Savings' },
        { metric: '60%', label: 'Faster Month-End Close' },
        { metric: '100%', label: 'Real-Time Visibility' }
      ],
      color: '#3b82f6'
    },
    {
      title: 'Retail ERP Modernization',
      industry: 'Retail & Distribution',
      company: 'XYZ Retail Chain',
      challenge: 'A growing retail chain with 200+ stores needed to unify online and offline operations, improve inventory accuracy, and enable omnichannel fulfillment.',
      solution: 'Deployed Microsoft Dynamics 365 with POS integration, advanced warehouse management, and real-time inventory across all channels.',
      results: [
        { metric: '99.5%', label: 'Inventory Accuracy' },
        { metric: '40%', label: 'Faster Fulfillment' },
        { metric: '25%', label: 'Revenue Growth' },
        { metric: '50%', label: 'Less Stockouts' }
      ],
      color: '#10b981'
    },
    {
      title: 'Service Company ERP Implementation',
      industry: 'Professional Services',
      company: 'Global Services Corp',
      challenge: 'A consulting firm with 5000+ consultants needed better project profitability tracking, resource utilization, and global billing consolidation.',
      solution: 'Implemented Oracle NetSuite with project management, resource management, time tracking, and multi-currency billing modules.',
      results: [
        { metric: '30%', label: 'Better Utilization' },
        { metric: '20%', label: 'Profitability Increase' },
        { metric: '70%', label: 'Faster Invoicing' },
        { metric: '15', label: 'Countries Unified' }
      ],
      color: '#8b5cf6'
    }
  ];

  const faqs = [
    { question: 'What ERP systems do you implement and support?', answer: 'We implement and support major ERP platforms including SAP S/4HANA, Oracle NetSuite, Microsoft Dynamics 365, Odoo ERP, Acumatica, and Infor CloudSuite. Our team has certified consultants for each platform, ensuring expert implementation regardless of your chosen ERP.' },
    { question: 'How long does a typical ERP implementation take?', answer: 'ERP implementation timelines vary based on organization size, complexity, and modules implemented. Small businesses (10-50 users) typically take 3-6 months, mid-size companies (50-500 users) take 6-12 months, and large enterprises (500+ users) can take 12-24 months.' },
    { question: 'How do you handle data migration from legacy systems?', answer: 'Data migration is a critical phase of ERP implementation. Our approach includes data assessment and profiling, data cleansing and standardization, extraction from legacy systems, transformation to fit the new ERP data model, validation with automated checks, and trial migrations before final cutover.' },
    { question: 'Do you provide post-implementation support?', answer: 'We provide comprehensive post-go-live support including a dedicated hypercare period (typically 4-8 weeks), 24/7 help desk support, ongoing system administration, regular updates and patches, user training for new employees, and continuous improvement recommendations.' },
    { question: 'Can you customize ERP systems to our specific requirements?', answer: 'Yes, we provide ERP customization services while following best practices to minimize technical debt. We prioritize configuration over customization where possible. For necessary customizations, we develop modular extensions that won\'t break during upgrades.' },
    { question: 'How do you handle change management during ERP implementation?', answer: 'Change management is crucial for ERP success. Our approach includes stakeholder communication planning, executive sponsorship alignment, user training programs, process documentation, super-user networks, feedback mechanisms, and post-go-live support.' }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className={styles.page}>
      {/* Canvas Animation Background */}
      <CanvasAnimation />
      <div ref={particleContainerRef} className={styles.particleContainer} />

    

      {/* Hero Section */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroOverlay} />
        <WaveCanvas/>
        <div className={styles.container}>
          <div className={styles.heroContent} data-animate="hero">
            <div className={styles.heroBadge}>
              <FiHexagon size={16} className={styles.heroBadgeIcon} />
              Enterprise Resource Planning Solutions
              <FiHexagon size={16} className={styles.heroBadgeIcon} />
            </div>

            <h1 className={styles.heroTitle}>
              Transform Your Business with{" "}
              <span className={styles.gradientText}>
                Enterprise ERP
                <span className={styles.gradientUnderline} />
              </span>
            </h1>

            <p className={styles.heroDesc}>
              Streamline operations, increase efficiency, and drive growth with tailored ERP solutions. 
              From selection to implementation and support, we deliver end-to-end ERP services that 
              integrate every aspect of your business.
            </p>

            {/* Floating Stats */}
            <div className={styles.heroStatsGrid}>
              {stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className={styles.heroStatCard}
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <div className={styles.heroStatIconWrapper}>
                    <stat.icon size={24} />
                    <div className={styles.heroStatGlow} />
                  </div>
                  <div className={styles.heroStatInfo}>
                    <span className={styles.heroStatValue}>
                      <AnimatedCounter value={stat.value} />
                    </span>
                    <span className={styles.heroStatLabel}>{stat.label}</span>
                    <span className={styles.heroStatDesc}>{stat.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className={styles.heroButtons}>
              <Link to="/contact" className={styles.btnPrimary}>
                <span>Get Free ERP Consultation</span>
                <FiArrowRight size={20} className={styles.btnIcon} />
                <div className={styles.btnShine} />
              </Link>
              
             
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={styles.scrollIndicator}>
          <FiMousePointer size={18} />
          <div className={styles.scrollLine}>
            <div className={styles.scrollDot} />
          </div>
        </div>
      </section>

      {/* ERP Platforms Section */}
      <section className={styles.platforms}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} data-animate="section-header">
            <div className={styles.sectionBadge}>
              <FiHexagon size={16} />
              <span>ERP Platforms</span>
              <FiHexagon size={16} />
            </div>
            <h2 className={styles.sectionTitle}>
              Multi-Platform <span className={styles.gradientText}>ERP Expertise</span>
            </h2>
            <p className={styles.sectionDesc}>
              Certified implementation partners for all major ERP platforms.
            </p>
          </div>

          <div className={styles.platformGrid}>
            {erpPlatforms.map((platform, idx) => (
              <div 
                key={idx} 
                className={styles.platformCard} 
                data-animate={`platform-${idx}`}
                onClick={(e) => handleCardClick(e, idx)}
              >
                <div className={styles.platformCardGlow} style={{ background: platform.color }} />
                <div className={styles.platformIconWrapper}>
                  <platform.icon size={40} />
                  <div className={styles.platformIconRing} style={{ borderColor: platform.color }} />
                </div>
                <h3>{platform.name}</h3>
                <p>{platform.description}</p>
                <div className={styles.platformMeta}>
                  <span className={styles.platformTag}>
                    <FiPackage size={14} /> {platform.modules}+ Modules
                  </span>
                  <span className={styles.platformTag}>
                    <FiCloud size={14} /> {platform.deployment}
                  </span>
                </div>
                <div className={styles.platformArrow}>
                  <FiArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AllServicesForm/>

      {/* ERP Modules Section */}
      <section className={styles.modules}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} data-animate="section-header">
            <div className={styles.sectionBadge}>
              <FiGrid size={16} />
              <span>ERP Modules</span>
              <FiGrid size={16} />
            </div>
            <h2 className={styles.sectionTitle}>
              Comprehensive <span className={styles.gradientText}>ERP Modules</span>
            </h2>
            <p className={styles.sectionDesc}>
              Covering every business function with integrated modules
            </p>
          </div>

          <div className={styles.modulesGrid}>
            {erpModules.map((module, idx) => (
              <div 
                key={idx} 
                className={`${styles.moduleCard} ${hoveredModule === idx ? styles.moduleCardHovered : ''}`}
                data-animate={`module-${idx}`}
                onMouseEnter={() => setHoveredModule(idx)}
                onMouseLeave={() => setHoveredModule(null)}
              >
                <div className={styles.moduleCardBorder} style={{ background: module.gradient }} />
                <div className={styles.moduleCardContent}>
                  <div className={styles.moduleHeader}>
                    <div className={styles.moduleIcon} style={{ background: `${module.color}20`, color: module.color }}>
                      <module.icon size={28} />
                    </div>
                    <span className={styles.moduleNumber} style={{ color: module.color }}>
                      0{idx + 1}
                    </span>
                  </div>
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                  <div className={styles.moduleFeatures}>
                    {module.features.map((feature, fIdx) => (
                      <span key={fIdx} className={styles.featureTag}>
                        <FiCheckCircle size={12} /> {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.moduleCardOverlay} style={{ background: `${module.color}08` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefits}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} data-animate="section-header">
            <div className={styles.sectionBadge}>
              <FiTrendingUp size={16} />
              <span>Why ERP</span>
              <FiTrendingUp size={16} />
            </div>
            <h2 className={styles.sectionTitle}>
              Benefits of <span className={styles.gradientText}>ERP Implementation</span>
            </h2>
            <p className={styles.sectionDesc}>
              Discover how ERP transforms organizations with measurable value
            </p>
          </div>

          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, idx) => (
              <div 
                key={idx} 
                className={styles.benefitCard} 
                data-animate={`benefit-${idx}`}
              >
                <div className={styles.benefitIconHex}>
                  <benefit.icon size={32} />
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
                <div className={styles.benefitGlow} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className={styles.process}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} data-animate="section-header">
            <div className={styles.sectionBadge}>
              <FiRefreshCw size={16} />
              <span>Implementation Roadmap</span>
              <FiRefreshCw size={16} />
            </div>
            <h2 className={styles.sectionTitle}>
              Our <span className={styles.gradientText}>ERP Implementation Process</span>
            </h2>
            <p className={styles.sectionDesc}>
              Proven 6-phase methodology refined through 150+ successful deployments
            </p>
          </div>

          <div className={styles.processTimeline}>
            <div className={styles.processLine} />
            {implementationProcess.map((phase, idx) => (
              <div 
                key={idx} 
                className={styles.processItem} 
                data-animate={`process-${idx}`}
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className={styles.processNode}>
                  <div className={styles.processNodeInner}>
                    <phase.icon size={20} />
                  </div>
                  <span className={styles.processPhase}>{phase.phase}</span>
                </div>
                <div className={styles.processCard}>
                  <h3>{phase.title}</h3>
                  <p>{phase.description}</p>
                  <div className={styles.processDuration}>
                    <FiClock size={14} />
                    <span>{phase.duration}</span>
                  </div>
                  <div className={styles.processActivities}>
                    {phase.activities.map((activity, aIdx) => (
                      <span key={aIdx} className={styles.activityTag}>{activity}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className={styles.caseStudies}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} data-animate="section-header">
            <div className={styles.sectionBadge}>
              <FiStar size={16} />
              <span>Success Stories</span>
              <FiStar size={16} />
            </div>
            <h2 className={styles.sectionTitle}>
              ERP <span className={styles.gradientText}>Implementation Success</span>
            </h2>
            <p className={styles.sectionDesc}>
              Real results delivered through our ERP implementation services
            </p>
          </div>

          <div className={styles.caseStudyGrid}>
            {caseStudies.map((study, idx) => (
              <div 
                key={idx} 
                className={styles.caseStudyCard} 
                data-animate={`case-${idx}`}
              >
                <div className={styles.caseStudyHeader} style={{ borderLeftColor: study.color }}>
                  <div className={styles.caseStudyBadge} style={{ background: `${study.color}20`, color: study.color }}>
                    {study.industry}
                  </div>
                  <h3>{study.title}</h3>
                  <p className={styles.caseStudyCompany}>
                    <FiBriefcase size={14} /> {study.company}
                  </p>
                </div>

                <div className={styles.caseStudyBody}>
                  <div className={styles.caseStudySection}>
                    <div className={styles.caseStudyLabel}>
                      <FiTarget size={14} />
                      <span>Challenge</span>
                    </div>
                    <p>{study.challenge}</p>
                  </div>
                  <div className={styles.caseStudySection}>
                    <div className={styles.caseStudyLabel}>
                      <FiCheckCircle size={14} />
                      <span>Solution</span>
                    </div>
                    <p>{study.solution}</p>
                  </div>
                </div>

                <div className={styles.caseStudyResults}>
                  {study.results.map((result, rIdx) => (
                    <div key={rIdx} className={styles.resultItem}>
                      <span className={styles.resultMetric} style={{ color: study.color }}>
                        {result.metric}
                      </span>
                      <span className={styles.resultLabel}>{result.label}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.caseStudyGlow} style={{ background: study.color }} />
              </div>
            ))}
          </div>

          <div className={styles.caseStudyCTA}>
            <Link to="/portfolio" className={styles.btnOutline}>
              View All Case Studies <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <TestimonialSection/>

      {/* FAQ Section */}
      <section className={styles.faq}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} data-animate="section-header">
            <div className={styles.sectionBadge}>
              <FiMessageSquare size={16} />
              <span>FAQ</span>
              <FiMessageSquare size={16} />
            </div>
            <h2 className={styles.sectionTitle}>
              Frequently Asked <span className={styles.gradientText}>Questions</span>
            </h2>
          </div>

          <div className={styles.faqGrid}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`${styles.faqItem} ${activeFaq === idx ? styles.faqActive : ''}`}
                onClick={() => toggleFaq(idx)}
                data-animate={`faq-${idx}`}
              >
                <div className={styles.faqHeader}>
                  <div className={styles.faqQuestion}>
                    <span className={styles.faqNumber}>0{idx + 1}</span>
                    <h3>{faq.question}</h3>
                  </div>
                  <div className={styles.faqIcon}>
                    {activeFaq === idx ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                  </div>
                </div>
                <div className={styles.faqContent}>
                  <div className={styles.faqContentInner}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaBgPattern} />
        <div className={styles.container}>
          <div className={styles.ctaWrapper}>
            <div className={styles.ctaContent} data-animate="cta">
              <div className={styles.ctaBadge}>
                <FiZap size={14} /> Free ERP Strategy Session
              </div>
              <h2>Ready to Transform Your Business with ERP?</h2>
              <p>
                Get a free ERP consultation with our senior solution architects. We'll assess your 
                business processes, recommend the right ERP platform, and provide an implementation 
                roadmap with timeline and budget estimates.
              </p>

              <div className={styles.ctaFeatures}>
                <div className={styles.ctaFeature}>
                  <div className={styles.ctaFeatureIcon}>
                    <FiCheckCircle size={18} />
                  </div>
                  <span>Free ERP platform selection consultation</span>
                </div>
                <div className={styles.ctaFeature}>
                  <div className={styles.ctaFeatureIcon}>
                    <FiCheckCircle size={18} />
                  </div>
                  <span>Business process analysis and gap identification</span>
                </div>
                <div className={styles.ctaFeature}>
                  <div className={styles.ctaFeatureIcon}>
                    <FiCheckCircle size={18} />
                  </div>
                  <span>Customized implementation roadmap with timeline</span>
                </div>
                <div className={styles.ctaFeature}>
                  <div className={styles.ctaFeatureIcon}>
                    <FiCheckCircle size={18} />
                  </div>
                  <span>Detailed cost-benefit analysis and ROI projection</span>
                </div>
              </div>

              <div className={styles.ctaButtons}>
                <Link to="/contact" className={styles.ctaBtnPrimary}>
                  Schedule Free ERP Consultation <FiArrowRight size={18} />
                </Link>
                <Link to="/contact" className={styles.ctaBtnSecondary}>
                  Download ERP Selection Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Contact */}
     
    </div>
  );
};

export default ErpSolutions;