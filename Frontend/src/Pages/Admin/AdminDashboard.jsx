// Pages/Admin/AdminDashboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../utils/apiService';
import styles from './AdminDashboard.module.css';
import InternshipManagement from './InternshipManagement';
import PartTimeManagement from './PartTimeManagement';
import {
  FiHome, FiMail, FiBriefcase, FiEdit, FiFolder, FiUsers, FiSettings,
  FiLogOut, FiBell, FiTrendingUp, FiEye, FiRefreshCw,
  FiMenu, FiX, FiMessageSquare, FiCheckCircle, FiTrash2,
  FiStar, FiInbox, FiSend, FiChevronRight, FiSearch,
  FiXCircle, FiActivity, FiLayers, FiZap,
  FiCode, FiCloud, FiBarChart2, FiDownload, FiFileText,
  FiUserCheck, FiDollarSign, FiPhone, FiClock, FiCalendar,
  FiArrowUp, FiArrowDown, FiMoreVertical, FiPlus, FiTarget,
  FiPieChart, FiGrid, FiList, FiCheck, FiAlertCircle
} from 'react-icons/fi';

// ─── Helpers ────────────────────────────────────────────────────
const getStatusClass = (status, s) => ({
  new: s.badgeNew, read: s.badgeRead, replied: s.badgeReplied,
  contacted: s.badgeContacted, in_progress: s.badgeProgress, completed: s.badgeCompleted,
  reviewed: s.badgeReviewed, shortlisted: s.badgeShortlisted,
  rejected: s.badgeRejected, hired: s.badgeHired
})[status] || s.badgeNew;

const getStatusText = (status) => ({
  new: 'New', read: 'Read', replied: 'Replied',
  contacted: 'Contacted', in_progress: 'In Progress', completed: 'Completed',
  reviewed: 'Reviewed', shortlisted: 'Shortlisted',
  rejected: 'Rejected', hired: 'Hired'
})[status] || status;

const getJobStatusColor = (status) => {
  const c = { new: '#f59e0b', reviewed: '#6366f1', shortlisted: '#8b5cf6', rejected: '#ef4444', hired: '#10b981' };
  return c[status] || '#94a3b8';
};

const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
const fmtTime = (d) => d ? new Date(d).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '';
const fmtRelative = (d) => {
  if (!d) return '';
  const diff = Date.now() - new Date(d).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

// ─── Chart Components ───────────────────────────────────────────
const DonutChart = ({ percentage, color, size = 120 }) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={styles.donutChart}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      </svg>
      <div className={styles.donutCenter}>
        <span style={{ color }}>{percentage}%</span>
      </div>
    </div>
  );
};

const BarChart = ({ data, maxValue = 100 }) => (
  <div className={styles.barChart}>
    {data.map((item, i) => (
      <div key={i} className={styles.barItem}>
        <div className={styles.barValue}>{item.value}</div>
        <div className={styles.barFill} style={{ height: `${(item.value / maxValue) * 100}%`, background: item.color || '#6366f1' }} />
        <div className={styles.barLabel}>{item.label}</div>
      </div>
    ))}
  </div>
);

// ─── Main Component ─────────────────────────────────────────────
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Contacts
  const [messages, setMessages] = useState([]);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [contactStats, setContactStats] = useState({ total: 0, new: 0, read: 0, replied: 0 });
  const [contactFilter, setContactFilter] = useState('all');
  const [contactSearch, setContactSearch] = useState('');

  // Enquiries
  const [enquiries, setEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [enquiryStats, setEnquiryStats] = useState({ total: 0, new: 0, contacted: 0, in_progress: 0, completed: 0 });
  const [enquiryFilter, setEnquiryFilter] = useState('all');
  const [enquirySearch, setEnquirySearch] = useState('');

  // Job Applications
  const [jobApplications, setJobApplications] = useState([]);
  const [selectedJobApp, setSelectedJobApp] = useState(null);
  const [jobStats, setJobStats] = useState({ total: 0, new: 0, reviewed: 0, shortlisted: 0, rejected: 0, hired: 0 });
  const [jobFilter, setJobFilter] = useState('all');
  const [jobSearch, setJobSearch] = useState('');

  // Dashboard Stats
  const [dashStats] = useState({
    totalVisitors: 1250,
    totalProjects: 85,
    totalAdmins: 3,
    todayVisitors: 45,
    conversionRate: 12.5,
    activeProjects: 32,
    revenue: 850000,
    growth: 23.5
  });

  const chartData = {
    weekly: [
      { label: 'Mon', value: 45, color: '#6366f1' },
      { label: 'Tue', value: 65, color: '#8b5cf6' },
      { label: 'Wed', value: 35, color: '#6366f1' },
      { label: 'Thu', value: 80, color: '#8b5cf6' },
      { label: 'Fri', value: 55, color: '#6366f1' },
      { label: 'Sat', value: 40, color: '#8b5cf6' },
      { label: 'Sun', value: 25, color: '#6366f1' },
    ]
  };

  // ── Logout ─────────────────────────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/admin-login');
  };

  // ── Fetch Functions ────────────────────────────────────────────
  const fetchContacts = useCallback(async () => {
    try {
      const [s, m] = await Promise.all([ApiService.getContactStats(), ApiService.getContactMessages({ limit: 100 })]);
      if (s.data.success) setContactStats(s.data.stats);
      if (m.data.success) setMessages(m.data.messages);
    } catch (err) { console.error(err); }
  }, []);

  const fetchEnquiries = useCallback(async () => {
    try {
      const [s, e] = await Promise.all([ApiService.getEnquiryStats(), ApiService.getEnquiries({ limit: 100 })]);
      if (s.data.success) setEnquiryStats(s.data.stats);
      if (e.data.success) setEnquiries(e.data.enquiries);
    } catch (err) { console.error(err); }
  }, []);

  const fetchJobApplications = useCallback(async () => {
    try {
      const [statsRes, appsRes] = await Promise.all([
        ApiService.getJobAppStats(),
        ApiService.getJobApplications({ limit: 100 })
      ]);
      if (statsRes?.data?.success) setJobStats(statsRes.data.stats);
      if (appsRes?.data?.success) setJobApplications(appsRes.data.applications || []);
    } catch (err) { console.error('Job fetch error:', err); }
  }, []);

  const fetchAll = useCallback(async (showLoader = false) => {
    if (showLoader) setLoading(true); else setRefreshing(true);
    try {
      const v = await ApiService.adminVerify();
      if (v.data.success) setAdmin(v.data.admin);
      await Promise.all([fetchContacts(), fetchEnquiries(), fetchJobApplications()]);
      setLastUpdated(new Date());
    } catch (err) {
      if (err.response?.status === 401) { localStorage.removeItem('adminToken'); navigate('/admin-login'); }
    } finally { setLoading(false); setRefreshing(false); }
  }, [fetchContacts, fetchEnquiries, fetchJobApplications, navigate]);

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) { navigate('/admin-login'); return; }
    fetchAll(true);
    const i = setInterval(() => fetchAll(false), 60000);
    return () => clearInterval(i);
  }, [fetchAll, navigate]);

  // ── Actions ────────────────────────────────────────────────────
  const handleContactStatus = async (id, s) => { await ApiService.updateContactStatus(id, s); fetchContacts(); };
  const handleDeleteMsg = async (id) => { if (window.confirm('Are you sure you want to delete this message?')) { await ApiService.deleteContactMessage(id); fetchContacts(); setSelectedMsg(null); } };
  const handleEnquiryStatus = async (id, s) => { await ApiService.updateEnquiryStatus(id, s); fetchEnquiries(); };
  const handleDeleteEnquiry = async (id) => { if (window.confirm('Delete this enquiry?')) { await ApiService.deleteEnquiry(id); fetchEnquiries(); setSelectedEnquiry(null); } };
  const handleJobStatus = async (id, s) => { await ApiService.updateJobApplicationStatus(id, s); fetchJobApplications(); };
  const handleDeleteJobApp = async (id) => { if (window.confirm('Delete this application?')) { await ApiService.deleteJobApplication(id); fetchJobApplications(); setSelectedJobApp(null); } };
  const handleDownloadResume = (app) => { window.open(app?.resume?.url || ApiService.getResumeUrl(app._id), '_blank'); };

  // ── Filters ────────────────────────────────────────────────────
  const fMsg = messages.filter(m => (contactFilter === 'all' || m.status === contactFilter) && (!contactSearch || [m.name, m.email, m.message].some(f => f?.toLowerCase().includes(contactSearch.toLowerCase()))));
  const fEnq = enquiries.filter(e => (enquiryFilter === 'all' || e.status === enquiryFilter) && (!enquirySearch || [e.fullName, e.email, e.service].some(f => f?.toLowerCase().includes(enquirySearch.toLowerCase()))));
  const fJob = jobApplications.filter(a => (jobFilter === 'all' || a.status === jobFilter) && (!jobSearch || [a.fullName, a.email, a.position, a.skills].some(f => f?.toLowerCase().includes(jobSearch.toLowerCase()))));

  // ── Loading Screen ─────────────────────────────────────────────
  if (loading) return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingContent}>
        <div className={styles.loadingLogo}>
          <div className={styles.logoIcon}><FiZap size={24} /></div>
          <span>Intech Zone</span>
        </div>
        <div className={styles.spinner} />
        <p>Loading your dashboard...</p>
      </div>
    </div>
  );

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome },
    { id: 'contacts', label: 'Messages', icon: FiMail, badge: contactStats.new },
    { id: 'enquiries', label: 'Enquiries', icon: FiBriefcase, badge: enquiryStats.new },
    { id: 'job-applications', label: 'Job Applications', icon: FiUserCheck, badge: jobStats.new || 0 },
    { id: 'internships', label: 'Internships', icon: FiTarget },
    { id: 'part-time', label: 'Part Time', icon: FiClock },
  ];

  return (
    <div className={styles.layout}>
      {/* ─── SIDEBAR ─── */}
      <aside className={`${styles.sidebar} ${!sidebarOpen ? styles.collapsed : ''} ${mobileMenuOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.sidebarTop}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}><FiZap size={18} color="#fff" /></div>
            {sidebarOpen && <span className={styles.logoText}>Intech Zone</span>}
          </div>
          <button className={styles.toggleBtn} onClick={() => setSidebarOpen(p => !p)}>
            {sidebarOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>

        {sidebarOpen && (
          <div className={styles.adminProfile}>
            <div className={styles.adminAvatar}>
              {admin?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className={styles.adminInfo}>
              <span className={styles.adminName}>{admin?.name || 'Admin'}</span>
              <span className={styles.adminRole}>Administrator</span>
            </div>
          </div>
        )}

        {sidebarOpen && <p className={styles.navSection}>MAIN MENU</p>}
        
        <nav className={styles.nav}>
          {navItems.map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              className={`${styles.navBtn} ${activeTab === id ? styles.navActive : ''}`}
              onClick={() => {
                setActiveTab(id);
                setSelectedMsg(null);
                setSelectedEnquiry(null);
                setSelectedJobApp(null);
                setMobileMenuOpen(false);
              }}
              title={!sidebarOpen ? label : ''}
            >
              <Icon size={20} />
              {sidebarOpen && <span>{label}</span>}
              {sidebarOpen && badge > 0 && <span className={styles.navBadge}>{badge}</span>}
            </button>
          ))}
        </nav>

        {sidebarOpen && <p className={styles.navSection}>SETTINGS</p>}
        
        <div className={styles.sidebarBottom}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <FiLogOut size={18} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ─── MOBILE OVERLAY ─── */}
      {mobileMenuOpen && <div className={styles.overlay} onClick={() => setMobileMenuOpen(false)} />}

      {/* ─── MAIN CONTENT ─── */}
      {activeTab === 'internships' ? (
        <main className={styles.main}><InternshipManagement /></main>
      ) : activeTab === 'part-time' ? (
        <main className={styles.main}><PartTimeManagement /></main>
      ) : (
        <main className={styles.main}>
          {/* ─── HEADER ─── */}
          <header className={styles.header}>
            <div className={styles.headerLeft}>
              <button className={styles.mobileMenuBtn} onClick={() => setMobileMenuOpen(true)}>
                <FiMenu size={22} />
              </button>
              <div>
                <h1 className={styles.pageTitle}>{navItems.find(n => n.id === activeTab)?.label || 'Dashboard'}</h1>
                {lastUpdated && (
                  <p className={styles.lastUpdated}>Last updated: {fmtTime(lastUpdated)}</p>
                )}
              </div>
            </div>
            <div className={styles.headerRight}>
              <button className={styles.refreshBtn} onClick={() => fetchAll(false)} title="Refresh data">
                <FiRefreshCw size={18} className={refreshing ? styles.spinning : ''} />
              </button>
              <button className={styles.iconBtn}>
                <FiBell size={20} />
                <span className={styles.bellDot} />
              </button>
              <div className={styles.adminChip}>
                <div className={styles.chipAvatar}>
                  {admin?.name?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                <div className={styles.chipInfo}>
                  <span>{admin?.name || 'Admin'}</span>
                  <span className={styles.chipRole}>Admin</span>
                </div>
              </div>
            </div>
          </header>

          {/* ─── CONTENT AREA ─── */}
          <div className={styles.content}>
            {/* DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
              <>
                {/* Stats Cards */}
                <div className={styles.statsGrid}>
                  <div className={`${styles.statCard} ${styles.statPurple}`}>
                    <div className={styles.statIcon}><FiFolder size={24} /></div>
                    <div className={styles.statInfo}>
                      <span className={styles.statValue}>{dashStats.totalProjects}</span>
                      <span className={styles.statLabel}>Total Projects</span>
                      <span className={styles.statTrend}><FiArrowUp size={12} /> 12% increase</span>
                    </div>
                  </div>
                  <div className={`${styles.statCard} ${styles.statBlue}`}>
                    <div className={styles.statIcon}><FiMail size={24} /></div>
                    <div className={styles.statInfo}>
                      <span className={styles.statValue}>{contactStats.total}</span>
                      <span className={styles.statLabel}>Messages</span>
                      <span className={styles.statTrend}><FiArrowUp size={12} /> {contactStats.new} new</span>
                    </div>
                  </div>
                  <div className={`${styles.statCard} ${styles.statGreen}`}>
                    <div className={styles.statIcon}><FiUserCheck size={24} /></div>
                    <div className={styles.statInfo}>
                      <span className={styles.statValue}>{jobStats.total}</span>
                      <span className={styles.statLabel}>Job Applications</span>
                      <span className={styles.statTrend}><FiArrowUp size={12} /> {jobStats.new || 0} new</span>
                    </div>
                  </div>
                  <div className={`${styles.statCard} ${styles.statOrange}`}>
                    <div className={styles.statIcon}><FiEye size={24} /></div>
                    <div className={styles.statInfo}>
                      <span className={styles.statValue}>{dashStats.totalVisitors}</span>
                      <span className={styles.statLabel}>Total Visitors</span>
                      <span className={styles.statTrend}><FiArrowUp size={12} /> +{dashStats.growth}%</span>
                    </div>
                  </div>
                </div>

                {/* Charts Row */}
                <div className={styles.chartsRow}>
                  <div className={styles.chartCard}>
                    <div className={styles.chartHeader}>
                      <div>
                        <h3>Weekly Analytics</h3>
                        <p>Visitor statistics for this week</p>
                      </div>
                      <button className={styles.moreBtn}><FiMoreVertical size={18} /></button>
                    </div>
                    <BarChart data={chartData.weekly} maxValue={100} />
                  </div>

                  <div className={styles.chartCard}>
                    <div className={styles.chartHeader}>
                      <div>
                        <h3>Application Status</h3>
                        <p>Current hiring pipeline</p>
                      </div>
                    </div>
                    <div className={styles.donutRow}>
                      <div className={styles.donutItem}>
                        <DonutChart percentage={jobStats.total ? Math.round((jobStats.shortlisted || 0) / jobStats.total * 100) : 0} color="#8b5cf6" />
                        <span className={styles.donutTitle}>Shortlisted</span>
                      </div>
                      <div className={styles.donutItem}>
                        <DonutChart percentage={jobStats.total ? Math.round((jobStats.hired || 0) / jobStats.total * 100) : 0} color="#10b981" />
                        <span className={styles.donutTitle}>Hired</span>
                      </div>
                      <div className={styles.donutItem}>
                        <DonutChart percentage={jobStats.total ? Math.round((jobStats.rejected || 0) / jobStats.total * 100) : 0} color="#ef4444" />
                        <span className={styles.donutTitle}>Rejected</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className={styles.quickStatsGrid}>
                  <div className={styles.quickStat}>
                    <FiCalendar size={20} color="#6366f1" />
                    <div>
                      <span className={styles.qsValue}>{dashStats.activeProjects}</span>
                      <span className={styles.qsLabel}>Active Projects</span>
                    </div>
                  </div>
                  <div className={styles.quickStat}>
                    <FiDollarSign size={20} color="#10b981" />
                    <div>
                      <span className={styles.qsValue}>₹{dashStats.revenue.toLocaleString()}</span>
                      <span className={styles.qsLabel}>Total Revenue</span>
                    </div>
                  </div>
                  <div className={styles.quickStat}>
                    <FiTarget size={20} color="#f59e0b" />
                    <div>
                      <span className={styles.qsValue}>{dashStats.conversionRate}%</span>
                      <span className={styles.qsLabel}>Conversion Rate</span>
                    </div>
                  </div>
                  <div className={styles.quickStat}>
                    <FiUsers size={20} color="#3b82f6" />
                    <div>
                      <span className={styles.qsValue}>{dashStats.todayVisitors}</span>
                      <span className={styles.qsLabel}>Today's Visitors</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className={styles.recentGrid}>
                  <div className={styles.recentCard}>
                    <div className={styles.recentHeader}>
                      <h3>Recent Messages</h3>
                      <button className={styles.viewAll} onClick={() => setActiveTab('contacts')}>View All <FiChevronRight size={16} /></button>
                    </div>
                    <div className={styles.recentList}>
                      {messages.slice(0, 5).map(msg => (
                        <div key={msg._id} className={styles.recentItem}>
                          <div className={styles.recentAvatar} style={{ background: '#ede9fe', color: '#7c3aed' }}>
                            {msg.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <div className={styles.recentInfo}>
                            <span className={styles.recentName}>{msg.name}</span>
                            <span className={styles.recentSub}>{msg.email}</span>
                          </div>
                          <span className={getStatusClass(msg.status, styles)}>{getStatusText(msg.status)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.recentCard}>
                    <div className={styles.recentHeader}>
                      <h3>Recent Applications</h3>
                      <button className={styles.viewAll} onClick={() => setActiveTab('job-applications')}>View All <FiChevronRight size={16} /></button>
                    </div>
                    <div className={styles.recentList}>
                      {jobApplications.slice(0, 5).map(app => (
                        <div key={app._id} className={styles.recentItem}>
                          <div className={styles.recentAvatar} style={{ background: '#dbeafe', color: '#2563eb' }}>
                            {app.fullName?.charAt(0)?.toUpperCase()}
                          </div>
                          <div className={styles.recentInfo}>
                            <span className={styles.recentName}>{app.fullName}</span>
                            <span className={styles.recentSub}>{app.position}</span>
                          </div>
                          <span className={getStatusClass(app.status, styles)}>{getStatusText(app.status)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* CONTACTS TAB */}
            {activeTab === 'contacts' && (
              <div className={styles.splitLayout}>
                <div className={styles.listPanel}>
                  <div className={styles.panelHeader}>
                    <div>
                      <h2>Messages</h2>
                      <p>{fMsg.length} total messages</p>
                    </div>
                  </div>
                  
                  <div className={styles.searchBar}>
                    <FiSearch size={16} className={styles.searchIcon} />
                    <input 
                      placeholder="Search messages..." 
                      value={contactSearch} 
                      onChange={e => setContactSearch(e.target.value)}
                      className={styles.searchInput}
                    />
                    {contactSearch && <button className={styles.clearBtn} onClick={() => setContactSearch('')}><FiX size={14} /></button>}
                  </div>

                  <div className={styles.filterRow}>
                    {['all', 'new', 'read', 'replied'].map(f => (
                      <button key={f} className={`${styles.filterChip} ${contactFilter === f ? styles.filterActive : ''}`}
                        onClick={() => setContactFilter(f)}>
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                        <span>{contactStats[f] || 0}</span>
                      </button>
                    ))}
                  </div>

                  <div className={styles.listScroll}>
                    {fMsg.map(m => (
                      <div key={m._id} className={`${styles.listItem} ${selectedMsg?._id === m._id ? styles.listActive : ''}`}
                        onClick={() => setSelectedMsg(m)}>
                        <div className={styles.liAvatar}>
                          {m.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className={styles.liBody}>
                          <span className={styles.liName}>{m.name}</span>
                          <span className={styles.liSub}>{m.email}</span>
                          <span className={styles.liPreview}>{m.message?.substring(0, 50)}...</span>
                        </div>
                        <div className={styles.liRight}>
                          <span className={getStatusClass(m.status, styles)}>{getStatusText(m.status)}</span>
                          <span className={styles.liDate}>{fmtRelative(m.createdAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.detailPanel}>
                  {selectedMsg ? (
                    <>
                      <div className={styles.detailHero}>
                        <div className={styles.dhAvatar}>
                          {selectedMsg.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <h3>{selectedMsg.name}</h3>
                          <p>{selectedMsg.email}</p>
                          <p className={styles.dhDate}>{fmtDate(selectedMsg.createdAt)} at {fmtTime(selectedMsg.createdAt)}</p>
                        </div>
                      </div>

                      <div className={styles.detailMsgBox}>
                        <label>Message</label>
                        <p>{selectedMsg.message}</p>
                      </div>

                      <div className={styles.detailGrid}>
                        <div className={styles.dField}>
                          <label>Status</label>
                          <select value={selectedMsg.status} 
                            onChange={e => handleContactStatus(selectedMsg._id, e.target.value)}
                            className={styles.statusSelect}>
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                          </select>
                        </div>
                      </div>

                      <div className={styles.detailActions}>
                        <a href={`mailto:${selectedMsg.email}`} className={styles.replyBtn}>
                          <FiSend size={16} /> Reply via Email
                        </a>
                        <button onClick={() => handleDeleteMsg(selectedMsg._id)} className={styles.deleteBtn}>
                          <FiTrash2 size={16} /> Delete
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className={styles.emptyDetail}>
                      <FiInbox size={48} />
                      <p>Select a message</p>
                      <span>Click on a message to view details</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ENQUIRIES TAB */}
            {activeTab === 'enquiries' && (
              <div className={styles.splitLayout}>
                <div className={styles.listPanel}>
                  <div className={styles.panelHeader}>
                    <div>
                      <h2>Enquiries</h2>
                      <p>{fEnq.length} total enquiries</p>
                    </div>
                  </div>
                  
                  <div className={styles.searchBar}>
                    <FiSearch size={16} className={styles.searchIcon} />
                    <input 
                      placeholder="Search enquiries..." 
                      value={enquirySearch} 
                      onChange={e => setEnquirySearch(e.target.value)}
                      className={styles.searchInput}
                    />
                    {enquirySearch && <button className={styles.clearBtn} onClick={() => setEnquirySearch('')}><FiX size={14} /></button>}
                  </div>

                  <div className={styles.listScroll}>
                    {fEnq.map(e => (
                      <div key={e._id} className={`${styles.listItem} ${selectedEnquiry?._id === e._id ? styles.listActive : ''}`}
                        onClick={() => setSelectedEnquiry(e)}>
                        <div className={styles.liAvatarPurple}>
                          {e.fullName?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className={styles.liBody}>
                          <span className={styles.liName}>{e.fullName}</span>
                          <span className={styles.liSub}>{e.email}</span>
                          <span className={styles.liServiceTag}>{e.service}</span>
                        </div>
                        <div className={styles.liRight}>
                          <span className={getStatusClass(e.status, styles)}>{getStatusText(e.status)}</span>
                          <span className={styles.liBudget}>{e.budget && `₹${e.budget}`}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.detailPanel}>
                  {selectedEnquiry ? (
                    <>
                      <div className={styles.detailHero}>
                        <div className={styles.dhAvatarPurple}>
                          {selectedEnquiry.fullName?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <h3>{selectedEnquiry.fullName}</h3>
                          <p>{selectedEnquiry.email}</p>
                          <p className={styles.dhDate}>{fmtDate(selectedEnquiry.createdAt)}</p>
                        </div>
                      </div>

                      <div className={styles.detailGrid}>
                        <div className={styles.dField}>
                          <label>Service</label>
                          <span>{selectedEnquiry.service}</span>
                        </div>
                        <div className={styles.dField}>
                          <label>Budget</label>
                          <span>{selectedEnquiry.budget ? `₹${selectedEnquiry.budget}` : 'Not specified'}</span>
                        </div>
                        <div className={styles.dField}>
                          <label>Status</label>
                          <select value={selectedEnquiry.status} 
                            onChange={e => handleEnquiryStatus(selectedEnquiry._id, e.target.value)}
                            className={styles.statusSelect}>
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                      </div>

                      {selectedEnquiry.message && (
                        <div className={styles.detailMsgBox}>
                          <label>Message</label>
                          <p>{selectedEnquiry.message}</p>
                        </div>
                      )}

                      <div className={styles.detailActions}>
                        <a href={`mailto:${selectedEnquiry.email}`} className={styles.replyBtn}>
                          <FiSend size={16} /> Reply via Email
                        </a>
                        <button onClick={() => handleDeleteEnquiry(selectedEnquiry._id)} className={styles.deleteBtn}>
                          <FiTrash2 size={16} /> Delete
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className={styles.emptyDetail}>
                      <FiBriefcase size={48} />
                      <p>Select an enquiry</p>
                      <span>Click on an enquiry to view details</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* JOB APPLICATIONS TAB */}
            {activeTab === 'job-applications' && (
              <div className={styles.splitLayout}>
                <div className={styles.listPanel}>
                  <div className={styles.panelHeader}>
                    <div>
                      <h2>Job Applications</h2>
                      <p>{jobApplications.length} total applications</p>
                    </div>
                    <button onClick={fetchJobApplications} className={styles.refreshBtn} title="Refresh">
                      <FiRefreshCw size={16} />
                    </button>
                  </div>
                  
                  <div className={styles.searchBar}>
                    <FiSearch size={16} className={styles.searchIcon} />
                    <input 
                      placeholder="Search name, email, skills..." 
                      value={jobSearch} 
                      onChange={e => setJobSearch(e.target.value)}
                      className={styles.searchInput}
                    />
                    {jobSearch && <button className={styles.clearBtn} onClick={() => setJobSearch('')}><FiX size={14} /></button>}
                  </div>

                  <div className={styles.filterRow}>
                    {['all', 'new', 'reviewed', 'shortlisted', 'rejected', 'hired'].map(f => (
                      <button key={f} className={`${styles.filterChip} ${jobFilter === f ? styles.filterActive : ''}`}
                        onClick={() => setJobFilter(f)}>
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                        <span>{jobStats[f] || 0}</span>
                      </button>
                    ))}
                  </div>

                  <div className={styles.listScroll}>
                    {fJob.length > 0 ? fJob.map(app => (
                      <div key={app._id} className={`${styles.listItem} ${selectedJobApp?._id === app._id ? styles.listActive : ''}`}
                        onClick={() => setSelectedJobApp(app)}>
                        <div className={styles.liAvatar} style={{ background: '#fef3c7', color: '#d97706' }}>
                          {app.fullName?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className={styles.liBody}>
                          <span className={styles.liName}>{app.fullName}</span>
                          <span className={styles.liSub}>{app.email}</span>
                          <span className={styles.liServiceTag}>{app.position}</span>
                        </div>
                        <div className={styles.liRight}>
                          <span style={{ 
                            padding: '4px 10px', 
                            borderRadius: 50, 
                            fontSize: 11, 
                            fontWeight: 600,
                            background: getJobStatusColor(app.status) + '20', 
                            color: getJobStatusColor(app.status) 
                          }}>
                            {getStatusText(app.status)}
                          </span>
                          <span className={styles.liDate}>{fmtRelative(app.createdAt)}</span>
                        </div>
                      </div>
                    )) : (
                      <div className={styles.emptyDetail}>
                        <FiUserCheck size={40} />
                        <p>No applications found</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.detailPanel}>
                  {selectedJobApp ? (
                    <>
                      <div className={styles.detailHero}>
                        <div className={styles.dhAvatar} style={{ background: '#fef3c7', color: '#d97706' }}>
                          {selectedJobApp.fullName?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <h3>{selectedJobApp.fullName}</h3>
                          <p>{selectedJobApp.email}</p>
                          <p className={styles.dhDate}>{selectedJobApp.phone}</p>
                        </div>
                      </div>

                      <div className={styles.detailGrid}>
                        <div className={styles.dField}><label>Position</label><span>{selectedJobApp.position}</span></div>
                        <div className={styles.dField}><label>Experience</label><span>{selectedJobApp.experience}</span></div>
                        <div className={styles.dField}><label>Current Company</label><span>{selectedJobApp.currentCompany || '—'}</span></div>
                        <div className={styles.dField}><label>Expected CTC</label><span>{selectedJobApp.expectedCTC}</span></div>
                        <div className={styles.dField}><label>Notice Period</label><span>{selectedJobApp.noticePeriod}</span></div>
                        <div className={styles.dField}><label>Skills</label><span>{selectedJobApp.skills}</span></div>
                        <div className={styles.dField}><label>Applied On</label><span>{fmtDate(selectedJobApp.createdAt)}</span></div>
                        <div className={styles.dField}>
                          <label>Status</label>
                          <select value={selectedJobApp.status} 
                            onChange={e => handleJobStatus(selectedJobApp._id, e.target.value)}
                            className={styles.statusSelect}>
                            <option value="new">New</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="rejected">Rejected</option>
                            <option value="hired">Hired</option>
                          </select>
                        </div>
                      </div>

                      {selectedJobApp.resume && (
                        <div className={styles.resumeBox}>
                          <FiFileText size={20} color="#10b981" />
                          <div>
                            <span>{selectedJobApp.resume.originalName}</span>
                            <span className={styles.fileSize}>
                              {selectedJobApp.resume.size ? (selectedJobApp.resume.size / 1024).toFixed(1) + ' KB' : ''}
                            </span>
                          </div>
                          <button onClick={() => handleDownloadResume(selectedJobApp)} className={styles.downloadBtn}>
                            <FiDownload size={16} /> Download
                          </button>
                        </div>
                      )}

                      <div className={styles.detailActions}>
                        <a href={`mailto:${selectedJobApp.email}`} className={styles.replyBtn}>
                          <FiSend size={16} /> Send Email
                        </a>
                        <button onClick={() => handleDeleteJobApp(selectedJobApp._id)} className={styles.deleteBtn}>
                          <FiTrash2 size={16} /> Delete
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className={styles.emptyDetail}>
                      <FiUserCheck size={48} />
                      <p>Select an application</p>
                      <span>Click on an application to view details</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Coming Soon for other tabs */}
            {!['dashboard', 'contacts', 'enquiries', 'job-applications'].includes(activeTab) && (
              <div className={styles.comingSoon}>
                <FiLayers size={48} color="#94a3b8" />
                <h2>Coming Soon</h2>
                <p>This feature is under development</p>
              </div>
            )}
          </div>
        </main>
      )}
    </div>
  );
};

export default AdminDashboard;