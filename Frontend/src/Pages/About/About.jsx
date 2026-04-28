import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./About.module.css";
import {
  FiTarget, FiEye, FiHeart, FiUsers, FiAward,
  FiGlobe, FiTrendingUp, FiCheckCircle, FiArrowRight,
  FiCode, FiCloud, FiServer, FiDatabase, FiCpu,
  FiSmile, FiStar, FiZap, FiThumbsUp, FiHeadphones,
  FiRefreshCw, FiShield, FiMapPin, FiMail, FiPhone,
  FiClock, FiTruck
} from "react-icons/fi";
import ParticleNetworkCanvas from "../Home/ParticleNetworkCanvas";
import GradientOrbsCanvas from "../Home/GradientOrbsCanvas";
import WaveCanvas from "../Home/Wavecanvas";
import DataStreamCanvas from "../Home/DataStreamCanvas";



// ── Data ─────────────────────────────────────
const EXPERTS = [
  {
    name: "Paramjeet Saluja",
    role: "Digital Marketing Strategist",
    exp: "12+ Yrs",
    color: "#1e64d2",
    initials: "PS",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQE7vwIXN1msWQ/profile-displayphoto-shrink_400_400/B4DZc1SlEpHAAg-/0/1748945753724?e=1778716800&v=beta&t=jNw7Dwgzi6Y5Ss_PM6pCbEA6S78td5RHb_jZ37OzpLw",
    tags: ["SEO", "PPC", "Analytics"],
    stat: "$50M+ Ad Spend",
    linkedin: "https://www.linkedin.com/in/paramjeetsaluja/",
  },
  {
    name: "Jairaj Singh",
    role: "Full Stack Lead",
    exp: "8+ Yrs",
    color: "#1e64d2",
    initials: "JS",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQEckvhh_YETpw/profile-displayphoto-scale_400_400/B4DZzgQiFnKEAg-/0/1773288958402?e=1778716800&v=beta&t=e3vWAeeR5SgdkrzEORxUyyFNj0kDJYkw_2s54FWp8E0",
    tags: ["React", "Node.js", "AWS"],
    stat: "50+ Apps Deployed",
    linkedin: "https://www.linkedin.com/in/jairaj-singh-1604332a0/",
  },
  {
    name: "Siddharth Gupta",
    role: "Technology Analyst",
    exp: "10+ Yrs",
    color: "#1e64d2",
    initials: "SG",
    image: "https://media.licdn.com/dms/image/v2/C4E03AQEBOi1HAHv7pQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1645245061165?e=1778716800&v=beta&t=ldLWN8xBXLCyjvXX61RyFBbbrGZzePFrTjcepZLLRAg",
    tags: ["AI/ML", "Strategy", "Due Diligence"],
    stat: "$2B+ Deals Advised",
    linkedin: "https://www.linkedin.com/in/siddharth-gupta-independent-analyst/",
  },
  {
    name: "Growth Specialist",
    role: "Performance Marketing",
    exp: "10+ Yrs",
    color: "#1e64d2",
    initials: "GS",
    image: "https://media.licdn.com/dms/image/v2/C4E03AQFparA72h0QcQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1516298674954?e=1778716800&v=beta&t=5i5AU89dfKEdVjsoznSZOaDjpfDto6dYesfUEdRtLgM",
    tags: ["Growth", "Conversion", "Brand"],
    stat: "200+ Brands Scaled",
    linkedin: "#",
  },
];

const VALUES = [
  { icon: FiStar,       title: "Excellence",    desc: "Perfection in every project." },
  { icon: FiUsers,      title: "Collaboration", desc: "True partnership with clients." },
  { icon: FiZap,        title: "Innovation",    desc: "Embracing new technologies." },
  { icon: FiThumbsUp,   title: "Integrity",     desc: "Honest and ethical always." },
  { icon: FiHeadphones, title: "Client First",  desc: "Your success is our priority." },
  { icon: FiRefreshCw,  title: "Agility",       desc: "Adapting fast to change." },
];

const MILESTONES = [
  { year: "2014", event: "Company Founded", detail: "Started with 5 passionate developers" },
  { year: "2016", event: "100 Clients",     detail: "Reached our first major milestone" },
  { year: "2018", event: "Cloud Launch",    detail: "Dedicated cloud practice added" },
  { year: "2020", event: "Global Reach",    detail: "Expanded to 15+ countries" },
  { year: "2022", event: "AI Practice",     detail: "Launched AI/ML advisory division" },
  { year: "2024", event: "500+ Projects",   detail: "Delivered 500 successful projects" },
];

const WHY = [
  { icon: FiTruck,     title: "Fast Delivery",   desc: "Agile methodology, on-time every time." },
  { icon: FiHeadphones,title: "24/7 Support",    desc: "Round-the-clock dedicated assistance." },
  { icon: FiAward,     title: "Quality Assured", desc: "Rigorous testing and QA processes." },
  { icon: FiGlobe,     title: "Global Standards",desc: "International best practices applied." },
];

// ── Component ────────────────────────────────
const About = () => {
  return (
    <div className={styles.page}>
    

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <WaveCanvas />
        <div className={styles.container}>
            
          <div className={styles.heroPill}>
            <FiShield size={13} /> About Intech Zone
          </div>
          <h1 className={styles.heroTitle}>
            Your Trusted<br />
            <span className={styles.heroBlue}>Technology Partner</span>
          </h1>
          <p className={styles.heroDesc}>
            We empower businesses with innovative technology solutions that drive
            growth, efficiency, and digital transformation.
          </p>
          <div className={styles.heroStats}>
            {[
              { val: "10+",  label: "Years of Excellence" },
              { val: "500+", label: "Projects Delivered" },
              { val: "98%",  label: "Client Satisfaction" },
              { val: "50+",  label: "Domain Experts" },
            ].map((s, i) => (
              <div key={i} className={styles.heroStat}>
                <span className={styles.heroStatVal}>{s.val}</span>
                <span className={styles.heroStatLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION / VISION / VALUES ── */}
      <section className={styles.mvSection}>
        <div className={styles.container}>
          <div className={styles.mvGrid}>
            {[
              { icon: <FiTarget size={26} />, title: "Our Mission", text: "To deliver cutting-edge solutions that transform businesses, enhance efficiency, and create lasting value through innovation and excellence." },
              { icon: <FiEye    size={26} />, title: "Our Vision",  text: "To become the world's most trusted technology partner, recognized for quality, innovation, and helping businesses thrive in the digital age." },
              { icon: <FiHeart  size={26} />, title: "Our Values",  text: "Integrity, innovation, and customer-centricity drive everything we do. We build lasting relationships through trust and exceptional service." },
            ].map((m, i) => (
              <div key={i} className={styles.mvCard}>
                <div className={styles.mvIcon}>{m.icon}</div>
                <h3 className={styles.mvTitle}>{m.title}</h3>
                <p className={styles.mvText}>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className={styles.story}>
        <DataStreamCanvas/>
        <div className={styles.container}>
           
          <div className={styles.storySplit}>
            <div className={styles.storyLeft}>
              <span className={styles.badge}>Our Journey</span>
              <h2 className={styles.sectionTitle}>The <span className={styles.blue}>Intech Zone</span> Story</h2>
              <p className={styles.storyText}>
                Founded in 2014, Intech Zone began as a small team of passionate technologists
                with a simple belief: technology should empower businesses, not complicate them.
              </p>
              <p className={styles.storyText}>
                Over the past decade, we've grown into a full-service technology partner,
                helping 500+ businesses across industries transform their operations through
                innovative software, cloud solutions, and strategic IT consulting.
              </p>
              <p className={styles.storyText}>
                Today, our 100+ experts — including seasoned specialists like Paramjeet Saluja,
                Jairaj Singh, and Siddharth Gupta — continue to push boundaries and deliver
                enterprise-grade solutions that drive real results.
              </p>
              <div className={styles.storyStats}>
                {[
                  { val: "2014", label: "Year Founded" },
                  { val: "100+", label: "Team Members" },
                  { val: "15+",  label: "Countries" },
                ].map((s, i) => (
                  <div key={i} className={styles.storyStat}>
                    <span className={styles.storyStatVal}>{s.val}</span>
                    <span className={styles.storyStatLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.storyRight}>
              <div className={styles.storyVisual}>
                <div className={styles.storyVisualInner}>
                  <FiCode size={40} className={styles.storyIcon} />
                  <div className={styles.storyVisualText}>Building the Future</div>
                  <div className={styles.storyVisualSub}>One project at a time</div>
                </div>
                <div className={styles.floatBadge} style={{ top: "12%", right: "-18px" }}>
                  <FiAward size={14} /> ISO Certified
                </div>
                <div className={styles.floatBadge} style={{ bottom: "18%", left: "-18px" }}>
                  <FiGlobe size={14} /> 15+ Countries
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERT TEAM ── */}
      <section className={styles.experts}>
        <GradientOrbsCanvas/>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.badge}>Leadership</span>
            <h2 className={styles.sectionTitle}>Meet Our <span className={styles.blue}>Core Experts</span></h2>
            <p className={styles.sectionDesc}>Industry veterans who deliver measurable results — hands-on, accountable, and results-driven.</p>
          </div>
          <div className={styles.expertsGrid}>
            {EXPERTS.map((e, i) => (
              <div key={i} className={styles.expertCard}>
                <div className={styles.expertImgWrap}>
                  <img
                    src={e.image}
                    alt={e.name}
                    className={styles.expertImg}
                    onError={(ev) => { ev.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(e.name)}&background=e8f0fe&color=1e64d2&size=200&bold=true`; }}
                  />
                </div>
                <div className={styles.expertInfo}>
                  <div className={styles.expertExpPill}>{e.exp}</div>
                  <div className={styles.expertName}>{e.name}</div>
                  <div className={styles.expertRole}>{e.role}</div>
                  <div className={styles.expertTags}>
                    {e.tags.map((t, j) => <span key={j} className={styles.expertTag}>{t}</span>)}
                  </div>
                  <div className={styles.expertStat}><FiTrendingUp size={12} /> {e.stat}</div>
                  <a href={e.linkedin} target="_blank" rel="noopener noreferrer" className={styles.expertLinkedIn}>
                    LinkedIn Profile →
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.expertsFooter}>
            <Link to="/expert-team" className={styles.viewAllBtn}>
              View Full Expert Team <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className={styles.valuesSection}>
        <ParticleNetworkCanvas/>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.badge}>What Drives Us</span>
            <h2 className={styles.sectionTitle}>Our Core <span className={styles.blue}>Values</span></h2>
          </div>
          <div className={styles.valuesGrid}>
            {VALUES.map((v, i) => (
              <div key={i} className={styles.valueCard}>
                <div className={styles.valueIcon}><v.icon size={22} /></div>
                <div className={styles.valueTitle}>{v.title}</div>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERTISE ── */}
      <section className={styles.expertise}>
        <div className={styles.container}>
          <div className={styles.expertiseSplit}>
            <div className={styles.expertiseLeft}>
              <span className={styles.badge}>Our Expertise</span>
              <h2 className={styles.sectionTitle}>Technical <span className={styles.blue}>Mastery</span></h2>
              <p className={styles.storyText}>
                We specialize in modern technologies and best practices to deliver
                world-class solutions that drive business growth and digital transformation.
              </p>
              <Link to="/services" className={styles.blueBtn}>
                Explore Services <FiArrowRight size={13} />
              </Link>
            </div>
            <div className={styles.expertiseRight}>
              {[
                { icon: FiCode,     title: "Software Development", count: "200+", lead: "Jairaj Singh" },
                { icon: FiCloud,    title: "Cloud Solutions",       count: "150+", lead: "Jairaj Singh" },
                { icon: FiDatabase, title: "Data Analytics",        count: "80+",  lead: "Siddharth Gupta" },
                { icon: FiCpu,      title: "AI / ML Advisory",      count: "40+",  lead: "Siddharth Gupta" },
              ].map((item, i) => (
                <div key={i} className={styles.expertiseCard}>
                  <item.icon size={20} className={styles.expertiseIcon} />
                  <div>
                    <div className={styles.expertiseTitle}>{item.title}</div>
                    <div className={styles.expertiseCount}>{item.count}+ Projects · Led by {item.lead}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className={styles.timeline}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.badge}>Timeline</span>
            <h2 className={styles.sectionTitle}>Our <span className={styles.blue}>Journey</span></h2>
          </div>
          <div className={styles.timelineList}>
            {MILESTONES.map((m, i) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.timelineYear}>{m.year}</div>
                <div className={styles.timelineDot} />
                <div className={styles.timelineCard}>
                  <div className={styles.timelineTitle}>{m.event}</div>
                  <div className={styles.timelineDesc}>{m.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className={styles.whyUs}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.badge}>Why Choose Us</span>
            <h2 className={styles.sectionTitle}>What Makes Us <span className={styles.blue}>Different</span></h2>
          </div>
          <div className={styles.whyGrid}>
            {WHY.map((w, i) => (
              <div key={i} className={styles.whyCard}>
                <w.icon size={24} className={styles.whyIcon} />
                <div className={styles.whyTitle}>{w.title}</div>
                <p className={styles.whyDesc}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className={styles.contact}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            {[
              { icon: <FiMapPin  size={20} />, title: "Visit Us",       lines: ["123 Tech Park, Bangalore", "Karnataka, India — 560001"] },
              { icon: <FiPhone   size={20} />, title: "Call Us",        lines: ["+91 80 1234 5678", "+91 98765 43210"] },
              { icon: <FiMail    size={20} />, title: "Email Us",       lines: ["hello@intechzone.com", "support@intechzone.com"] },
              { icon: <FiClock   size={20} />, title: "Working Hours",  lines: ["Mon–Fri: 9 AM – 6 PM", "Sat: 10 AM – 2 PM"] },
            ].map((c, i) => (
              <div key={i} className={styles.contactCard}>
                <div className={styles.contactIcon}>{c.icon}</div>
                <div className={styles.contactTitle}>{c.title}</div>
                {c.lines.map((l, j) => <div key={j} className={styles.contactLine}>{l}</div>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Ready to Work With Us?</h2>
            <p className={styles.ctaDesc}>Let's discuss how we can help your business grow with expert-led solutions.</p>
            <div className={styles.ctaBtns}>
              <Link to="/contact"   className={styles.ctaBtnPrimary}>Start a Conversation <FiArrowRight size={14} /></Link>
              <Link to="/portfolio" className={styles.ctaBtnOutline}>View Our Work</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;