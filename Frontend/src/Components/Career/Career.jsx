// Pages/Career.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Career.module.css';
import {
    FiBriefcase, FiFeather, FiActivity, FiUserCheck,
    FiAward, FiBookOpen, FiStar, FiTrendingUp,
    FiUsers, FiGift, FiArrowRight, FiChevronRight,
    FiZap, FiClock, FiMapPin, FiDollarSign, FiHeart,
    FiShield, FiGlobe, FiCode, FiMonitor, FiSmartphone,
    FiCheckCircle, FiPlay, FiPause
} from 'react-icons/fi';
import WaveCanvas from '../../Pages/Home/Wavecanvas';

// Career Data from Header
const CAREERS_DATA = {
    joinOurTeam: [
        { icon: FiBriefcase, label: 'Full Time Jobs', desc: 'Permanent roles across all departments with great benefits and growth opportunities', path: '/careers/full-time', color: '#3b82f6', openings: 12 },
        { icon: FiFeather, label: 'Internships', desc: 'Learn & grow with real projects under expert mentorship', path: '/careers/internships', color: '#10b981', openings: 8 },
        { icon: FiActivity, label: 'Part Time / Remote', desc: 'Flexible work opportunities that fit your schedule', path: '/careers/part-time', color: '#f59e0b', openings: 5 },
        { icon: FiUserCheck, label: 'Freelance Projects', desc: 'Work on exciting short-term projects from anywhere', path: '/careers/freelance', color: '#8b5cf6', openings: 6 },
    ],
    learnAndCertify: [
        { icon: FiAward, label: 'Certifications', desc: 'Industry-recognised IT courses with global certification', path: '/careers/certifications', color: '#ec4899', duration: '3-6 months' },
        { icon: FiBookOpen, label: 'Training Programs', desc: 'Hands-on technical training with live projects', path: '/careers/training', color: '#06b6d4', duration: '1-3 months' },
        { icon: FiStar, label: 'Workshops', desc: 'Short skill-building sessions by industry experts', path: '/careers/workshops', color: '#ef4444', duration: '1-2 days' },
        { icon: FiTrendingUp, label: 'Mentorship', desc: '1-on-1 guidance from experienced professionals', path: '/careers/mentorship', color: '#f97316', duration: '3 months' },
    ],
    lifeAtIntech: [
        { icon: FiUsers, label: 'Our Culture', desc: 'Collaborative, inclusive, and innovative work environment', path: '/careers/culture', color: '#3b82f6' },
        { icon: FiGift, label: 'Benefits & Perks', desc: 'Health insurance, learning budget, and flexible hours', path: '/careers/benefits', color: '#10b981' },
        { icon: FiStar, label: 'Success Stories', desc: 'Meet our alumni who are now leaders in tech', path: '/careers/stories', color: '#f59e0b' },
        { icon: FiBriefcase, label: 'Remote First', desc: 'Work from anywhere with our remote-first policy', path: '/careers/remote', color: '#8b5cf6' },
    ]
};

// Testimonials Data
const testimonials = [
    { name: 'Rahul Sharma', role: 'Senior Web Developer', company: 'Google', text: 'The mentorship and training at Intech Zone transformed my career. I went from a fresher to a Google employee in just 6 months!', rating: 5, image: 'R' },
    { name: 'Priya Patel', role: 'Data Scientist', company: 'Amazon', text: 'The hands-on projects and real-world experience I gained here were invaluable. The team is supportive and the learning environment is excellent.', rating: 5, image: 'P' },
    { name: 'Amit Kumar', role: 'Product Manager', company: 'Microsoft', text: 'Intech Zone gave me the foundation I needed to succeed. The certification programs are top-notch and industry-recognized.', rating: 5, image: 'A' },
];

// Statistics Data
const stats = [
    { number: '500+', label: 'Interns Trained', icon: FiUsers },
    { number: '90%', label: 'Placement Rate', icon: FiTrendingUp },
    { number: '50+', label: 'Expert Mentors', icon: FiStar },
    { number: '1000+', label: 'Projects Completed', icon: FiCheckCircle },
];

// ==================== COMPONENT 1: Hero Section ====================
const HeroSection = () => {
    const navigate = useNavigate();
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className={styles.heroSection}>
            <WaveCanvas/>
            <div className={styles.container}>
                <div className={styles.heroContent}>
                    <div className={styles.heroLeft}>
                        <span className={styles.heroBadge}>Join the Future of Tech</span>
                        <h1>Build Your <span className={styles.gradient}>Dream Career</span> with Intech Zone</h1>
                        <p className={styles.heroDesc}>India's fastest-growing tech company is looking for talented individuals like you. Join us and be part of something extraordinary.</p>

                        <div className={styles.statsGrid}>
                            {stats.map((stat, idx) => (
                                <div key={idx} className={styles.statItem}>
                                    <stat.icon size={24} className={styles.statIcon} />
                                    <div>
                                        <div className={styles.statNumber}>{stat.number}</div>
                                        <div className={styles.statLabel}>{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.heroButtons}>
                            <button className={styles.primaryBtn} onClick={() => document.getElementById('opportunities').scrollIntoView({ behavior: 'smooth' })}>
                                Explore Opportunities <FiArrowRight />
                            </button>
                            <button className={styles.secondaryBtn} onClick={() => navigate('/contact')}>
                                Talk to HR <FiChevronRight />
                            </button>
                        </div>
                    </div>

                    <div className={styles.heroRight}>
                        <div className={styles.testimonialCard}>
                            <div className={styles.quoteIcon}>“</div>
                            <p className={styles.testimonialText}>{testimonials[currentTestimonial].text}</p>
                            <div className={styles.testimonialAuthor}>
                                <div className={styles.authorAvatar}>{testimonials[currentTestimonial].image}</div>
                                <div>
                                    <h4>{testimonials[currentTestimonial].name}</h4>
                                    <span>{testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}</span>
                                </div>
                            </div>
                            <div className={styles.testimonialDots}>
                                {testimonials.map((_, idx) => (
                                    <button key={idx} className={`${styles.dot} ${currentTestimonial === idx ? styles.active : ''}`} onClick={() => setCurrentTestimonial(idx)} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ==================== COMPONENT 2: Why Join Us Section ====================
const WhyJoinUs = () => {
    const reasons = [
        { icon: FiZap, title: 'Fast Growth', desc: 'Rapid career progression with performance-based promotions', color: '#3b82f6' },
        { icon: FiHeart, title: 'Great Culture', desc: 'Collaborative, inclusive, and innovative work environment', color: '#10b981' },
        { icon: FiGlobe, title: 'Work Anywhere', desc: 'Remote-first policy with flexible working hours', color: '#8b5cf6' },
        { icon: FiDollarSign, title: 'Competitive Pay', desc: 'Industry-best salaries and performance bonuses', color: '#f59e0b' },
        { icon: FiShield, title: 'Job Security', desc: 'Stable career with long-term growth opportunities', color: '#06b6d4' },
        { icon: FiBookOpen, title: 'Learning Culture', desc: 'Continuous learning with paid certifications', color: '#ec4899' },
    ];

    return (
        <section className={styles.whyJoinSection}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionBadge}>✨ Why Choose Us</span>
                    <h2>Why Join <span className={styles.gradient}>Intech Zone?</span></h2>
                    <p>We don't just offer jobs — we offer careers that matter</p>
                </div>
                <div className={styles.reasonsGrid}>
                    {reasons.map((reason, idx) => (
                        <div key={idx} className={styles.reasonCard}>
                            <div className={styles.reasonIcon} style={{ background: `${reason.color}10`, color: reason.color }}>
                                <reason.icon size={28} />
                            </div>
                            <h3>{reason.title}</h3>
                            <p>{reason.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ==================== COMPONENT 3: Join Our Team Section ====================
const JoinOurTeam = () => {
    return (
        <section className={styles.joinSection} id="opportunities">
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionBadge}>💼 Current Opportunities</span>
                    <h2>Explore <span className={styles.gradient}>Open Positions</span></h2>
                    <p>Find the perfect role that matches your skills and career goals</p>
                </div>
                <div className={styles.joinGrid}>
                    {CAREERS_DATA.joinOurTeam.map((item, idx) => (
                        <Link to={item.path} key={idx} className={styles.joinCard}>
                            <div className={styles.joinIcon} style={{ background: `${item.color}10`, color: item.color }}>
                                <item.icon size={32} />
                            </div>
                            <h3>{item.label}</h3>
                            <p>{item.desc}</p>
                            <div className={styles.joinFooter}>
                                <span className={styles.openings}>{item.openings} openings available</span>
                                <FiChevronRight size={18} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ==================== COMPONENT 4: Learning Path Section ====================
const LearningPath = () => {
    const paths = [
        { level: 'Beginner', duration: '0-1 years', programs: ['Internship Program', 'Foundation Certification', 'Basic Workshops'], color: '#10b981' },
        { level: 'Intermediate', duration: '1-3 years', programs: ['Advanced Certification', 'Specialization Track', 'Mentorship Program'], color: '#3b82f6' },
        { level: 'Expert', duration: '3+ years', programs: ['Leadership Program', 'Expert Certification', 'Train the Trainer'], color: '#8b5cf6' },
    ];

    return (
        <section className={styles.learningSection}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionBadge}>📚 Learning Path</span>
                    <h2>Your Growth <span className={styles.gradient}>Journey</span></h2>
                    <p>Structured learning paths for every career stage</p>
                </div>

                <div className={styles.pathGrid}>
                    {paths.map((path, idx) => (
                        <div key={idx} className={styles.pathCard}>
                            <div className={styles.pathHeader} style={{ background: `${path.color}10`, color: path.color }}>
                                <h3>{path.level}</h3>
                                <span>{path.duration}</span>
                            </div>
                            <div className={styles.pathBody}>
                                {path.programs.map((program, i) => (
                                    <div key={i} className={styles.pathItem}>
                                        <FiCheckCircle size={16} color={path.color} />
                                        <span>{program}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.learnGrid}>
                    {CAREERS_DATA.learnAndCertify.map((item, idx) => (
                        <Link to={item.path} key={idx} className={styles.learnCard}>
                            <div className={styles.learnIcon} style={{ background: `${item.color}10`, color: item.color }}>
                                <item.icon size={28} />
                            </div>
                            <h3>{item.label}</h3>
                            <p>{item.desc}</p>
                            <div className={styles.learnFooter}>
                                <span className={styles.duration}>⏱️ {item.duration}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ==================== COMPONENT 5: Life at Intech Section ====================
const LifeAtIntech = () => {
    const benefits = [
        { icon: FiHeart, title: 'Health Insurance', desc: 'Comprehensive coverage for you and family' },
        { icon: FiZap, title: 'Learning Budget', desc: '₹50,000/year for courses & certifications' },
        { icon: FiGlobe, title: 'Remote Work', desc: 'Work from anywhere in the world' },
        { icon: FiClock, title: 'Flexible Hours', desc: 'Choose your working hours' },
        { icon: FiDollarSign, title: 'Performance Bonus', desc: 'Quarterly bonuses up to 3 months salary' },
        { icon: FiUsers, title: 'Team Events', desc: 'Regular offsites and team building' },
    ];

    return (
        <section className={styles.lifeSection}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionBadge}>🌟 Culture & Benefits</span>
                    <h2>Life at <span className={styles.gradient}>Intech Zone</span></h2>
                    <p>Great work environment with amazing perks</p>
                </div>

                <div className={styles.benefitsGrid}>
                    {benefits.map((benefit, idx) => (
                        <div key={idx} className={styles.benefitCard}>
                            <div className={styles.benefitIcon}><benefit.icon size={24} /></div>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.desc}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.lifeGrid}>
                    {CAREERS_DATA.lifeAtIntech.map((item, idx) => (
                        <Link to={item.path} key={idx} className={styles.lifeCard}>
                            <div className={styles.lifeIcon} style={{ background: `${item.color}10`, color: item.color }}>
                                <item.icon size={28} />
                            </div>
                            <h3>{item.label}</h3>
                            <p>{item.desc}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ==================== COMPONENT 6: Hiring Process Section ====================
const HiringProcess = () => {
    const steps = [
        { step: '01', title: 'Application', desc: 'Submit your resume and portfolio', icon: FiBriefcase },
        { step: '02', title: 'Initial Screening', desc: 'Quick call with our HR team', icon: FiUsers },
        { step: '03', title: 'Technical Interview', desc: 'Assessment of your skills', icon: FiCode },
        { step: '04', title: 'Final Round', desc: 'Discussion with leadership', icon: FiStar },
        { step: '05', title: 'Offer Letter', desc: 'Join the Intech Zone family', icon: FiAward },
    ];

    return (
        <section className={styles.processSection}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionBadge}>📋 Hiring Process</span>
                    <h2>Simple <span className={styles.gradient}>5-Step</span> Process</h2>
                    <p>We've made our hiring process transparent and efficient</p>
                </div>
                <div className={styles.processGrid}>
                    {steps.map((step, idx) => (
                        <div key={idx} className={styles.processCard}>
                            <div className={styles.processNumber}>{step.step}</div>
                            <div className={styles.processIcon}><step.icon size={24} /></div>
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ==================== COMPONENT 7: FAQ Section ====================
const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        { q: 'What is the selection process?', a: 'Our selection process includes application review, initial screening, technical interview, and final discussion with leadership.' },
        { q: 'Do you offer remote work options?', a: 'Yes, we have a remote-first policy. You can work from anywhere with flexible hours.' },
        { q: 'What is the notice period?', a: 'The notice period varies by role - from 15 days for interns to 2 months for senior positions.' },
        { q: 'Do you provide training?', a: 'Yes, we have comprehensive training programs and a learning budget for certifications.' },
        { q: 'What are the working hours?', a: 'We offer flexible working hours. Core hours are 11 AM - 4 PM, rest is flexible.' },
    ];

    return (
        <section className={styles.faqSection}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionBadge}>❓ FAQs</span>
                    <h2>Frequently Asked <span className={styles.gradient}>Questions</span></h2>
                    <p>Everything you need to know about working at Intech Zone</p>
                </div>
                <div className={styles.faqGrid}>
                    {faqs.map((faq, idx) => (
                        <div key={idx} className={styles.faqCard}>
                            <button className={styles.faqQuestion} onClick={() => setOpenIndex(openIndex === idx ? null : idx)}>
                                <span>{faq.q}</span>
                                <FiChevronRight className={`${styles.faqIcon} ${openIndex === idx ? styles.rotate : ''}`} />
                            </button>
                            <div className={`${styles.faqAnswer} ${openIndex === idx ? styles.open : ''}`}>
                                <p>{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ==================== COMPONENT 8: CTA Section ====================
const CTASection = () => {
    const navigate = useNavigate();

    return (
        <section className={styles.ctaSection}>
            <div className={styles.container}>
                <div className={styles.ctaContent}>
                    <h2>Ready to Start Your Journey?</h2>
                    <p>Join India's fastest-growing tech company and build the career you've always dreamed of.</p>
                    <div className={styles.ctaButtons}>
                        <button className={styles.ctaPrimary} onClick={() => navigate('/careers/internships')}>
                            Apply Now <FiArrowRight />
                        </button>
                        <button className={styles.ctaSecondary} onClick={() => navigate('/contact')}>
                            Contact HR <FiChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ==================== MAIN COMPONENT ====================
const Career = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.page}>
            <HeroSection />
            <WhyJoinUs />
            <JoinOurTeam />
            <LearningPath />
            <LifeAtIntech />
            <HiringProcess />
            <FAQSection />
            <CTASection />
        </div>
    );
};

export default Career;