// Pages/Admin/PartTimeManagement.jsx
import React, { useState, useEffect, useCallback } from 'react';
import ApiService from '../../utils/apiService';
import styles from './PartTimeManagement.module.css';
import { 
  FiSearch, FiRefreshCw, FiDownload, FiTrash2, FiX, 
  FiLoader, FiEye, FiMail, FiPhone, FiCalendar, FiBriefcase,
  FiUser, FiBookOpen, FiAward, FiClock, FiMapPin, FiDollarSign
} from 'react-icons/fi';

const STATUS_CONFIG = {
  new: { label: 'New', color: '#f59e0b', bg: '#fffbeb' },
  reviewed: { label: 'Reviewed', color: '#3b82f6', bg: '#eff6ff' },
  shortlisted: { label: 'Shortlisted', color: '#8b5cf6', bg: '#f5f3ff' },
  rejected: { label: 'Rejected', color: '#ef4444', bg: '#fef2f2' },
  selected: { label: 'Selected', color: '#10b981', bg: '#ecfdf5' }
};

const PartTimeManagement = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [stats, setStats] = useState({ 
    total: 0, new: 0, reviewed: 0, shortlisted: 0, rejected: 0, selected: 0 
  });

  // Fetch all applications
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ApiService.getPartTimeApplications({ 
        status: filter === 'all' ? null : filter,
        limit: 200 
      });
      console.log('📋 Fetched part time applications:', res.data);
      if (res.data.success) {
        setApplications(res.data.applications || []);
      }
    } catch (err) { 
      console.error('Fetch error:', err); 
    } finally { 
      setLoading(false); 
    }
  }, [filter]);

  // Fetch statistics
  const fetchStats = useCallback(async () => {
    try { 
      const res = await ApiService.getPartTimeStats(); 
      console.log('📊 Part Time Stats:', res.data);
      if (res.data.success) {
        setStats(res.data.stats || { total: 0, new: 0, reviewed: 0, shortlisted: 0, rejected: 0, selected: 0 });
      }
    } catch (err) { 
      console.error('Stats error:', err); 
    }
  }, []);

  useEffect(() => {
    fetchApplications();
    fetchStats();
  }, [fetchApplications, fetchStats]);

  // Update status
  const updateStatus = async (id, status) => {
    try { 
      await ApiService.updatePartTimeStatus(id, status); 
      await fetchApplications();
      await fetchStats();
      if (selectedApp?._id === id) {
        setSelectedApp({ ...selectedApp, status });
      }
      console.log(`✅ Status updated to ${status} for ID: ${id}`);
    } catch (err) { 
      console.error('Status update error:', err);
      alert('Failed to update status'); 
    }
  };

  // Delete application
  const deleteApp = async (id) => {
    if (!confirm('⚠️ Delete this application permanently? This action cannot be undone.')) return;
    try { 
      await ApiService.deletePartTimeApplication(id); 
      await fetchApplications();
      await fetchStats();
      if (selectedApp?._id === id) setSelectedApp(null);
      console.log(`🗑️ Deleted application ID: ${id}`);
    } catch (err) { 
      console.error('Delete error:', err);
      alert('Failed to delete'); 
    }
  };

  // Download resume
  const handleDownloadResume = (app) => {
    if (app?.resume?.url) {
      window.open(app.resume.url, '_blank');
    } else {
      alert('No resume available for this application');
    }
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Filter applications based on search
  const filteredApps = applications.filter(app => 
    app.fullName?.toLowerCase().includes(search.toLowerCase()) || 
    app.email?.toLowerCase().includes(search.toLowerCase()) ||
    app.internshipRole?.toLowerCase().includes(search.toLowerCase()) ||
    app.phone?.includes(search)
  );

  if (loading) {
    return (
      <div className={styles.loading}>
        <FiLoader size={30} className={styles.spinner} />
        <p>Loading part time applications...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2>Part Time Applications</h2>
          <p className={styles.subtitle}>Total: {stats.total} applications received</p>
        </div>
        <div className={styles.actions}>
          <div className={styles.searchBox}>
            <FiSearch size={16} />
            <input 
              type="text" 
              placeholder="Search by name, email, role or phone..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
            />
            {search && (
              <button className={styles.clearSearch} onClick={() => setSearch('')}>
                <FiX size={14} />
              </button>
            )}
          </div>
          <button onClick={() => { fetchApplications(); fetchStats(); }} className={styles.refreshBtn}>
            <FiRefreshCw size={16} /> Refresh
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <button className={filter === 'all' ? styles.active : ''} onClick={() => setFilter('all')}>
          All ({stats.total})
        </button>
        <button className={filter === 'new' ? styles.active : ''} onClick={() => setFilter('new')}>
          New ({stats.new || 0})
        </button>
        <button className={filter === 'reviewed' ? styles.active : ''} onClick={() => setFilter('reviewed')}>
          Reviewed ({stats.reviewed || 0})
        </button>
        <button className={filter === 'shortlisted' ? styles.active : ''} onClick={() => setFilter('shortlisted')}>
          Shortlisted ({stats.shortlisted || 0})
        </button>
        <button className={filter === 'rejected' ? styles.active : ''} onClick={() => setFilter('rejected')}>
          Rejected ({stats.rejected || 0})
        </button>
        <button className={filter === 'selected' ? styles.active : ''} onClick={() => setFilter('selected')}>
          Selected ({stats.selected || 0})
        </button>
      </div>

      {/* Split Layout */}
      <div className={styles.splitLayout}>
        
        {/* LEFT PANEL - List */}
        <div className={styles.listPanel}>
          <div className={styles.listHeader}>
            <h3>Applications ({filteredApps.length})</h3>
            <span className={styles.listHint}>Click on any row to view details</span>
          </div>
          
          <div className={styles.listScroll}>
            {filteredApps.length > 0 ? (
              filteredApps.map((app, index) => (
                <div 
                  key={app._id} 
                  className={`${styles.listItem} ${selectedApp?._id === app._id ? styles.active : ''}`} 
                  onClick={() => setSelectedApp(app)}
                >
                  <div className={styles.serialNo}>{index + 1}</div>
                  <div className={styles.avatar}>
                    {app.fullName?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  <div className={styles.info}>
                    <div className={styles.name}>{app.fullName}</div>
                    <div className={styles.email}>{app.email}</div>
                    <div className={styles.role}>
                      <FiBriefcase size={10} /> {app.internshipRole}
                    </div>
                  </div>
                  <div className={styles.rightInfo}>
                    <div className={styles.date}>{formatDate(app.createdAt)}</div>
                    <div 
                      className={styles.status} 
                      style={{ 
                        background: STATUS_CONFIG[app.status]?.bg || '#f1f5f9',
                        color: STATUS_CONFIG[app.status]?.color || '#64748b'
                      }}
                    >
                      {STATUS_CONFIG[app.status]?.label || app.status}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <FiBookOpen size={40} />
                <p>No part time applications found</p>
                <span>Applications will appear here once students apply</span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL - Details */}
        {selectedApp && (
          <div className={styles.detailPanel}>
            <div className={styles.detailHeader}>
              <h3>Application Details</h3>
              <button className={styles.closeBtn} onClick={() => setSelectedApp(null)}>
                <FiX size={18} />
              </button>
            </div>

            {/* Candidate Profile */}
            <div className={styles.profileSection}>
              <div className={styles.profileAvatar}>
                {selectedApp.fullName?.charAt(0)?.toUpperCase()}
              </div>
              <div className={styles.profileInfo}>
                <h4>{selectedApp.fullName}</h4>
                <p><FiMail size={12} /> {selectedApp.email}</p>
                <p><FiPhone size={12} /> {selectedApp.phone}</p>
              </div>
            </div>

            {/* Education Details */}
            <div className={styles.detailSection}>
              <h4><FiBookOpen size={14} /> Education</h4>
              <div className={styles.detailRow}>
                <label>Qualification:</label>
                <span>{selectedApp.qualification}</span>
              </div>
              <div className={styles.detailRow}>
                <label>Course/Stream:</label>
                <span>{selectedApp.course}</span>
              </div>
              <div className={styles.detailRow}>
                <label>Passing Year:</label>
                <span>{selectedApp.passingYear}</span>
              </div>
            </div>

            {/* Internship Details */}
            <div className={styles.detailSection}>
              <h4><FiBriefcase size={14} /> Internship Details</h4>
              <div className={styles.detailRow}>
                <label>Role Applied:</label>
                <span className={styles.highlight}>{selectedApp.internshipRole}</span>
              </div>
              <div className={styles.detailRow}>
                <label>Duration:</label>
                <span>{selectedApp.duration || '3 months'}</span>
              </div>
              <div className={styles.detailRow}>
                <label>Skills:</label>
                <div className={styles.skillsList}>
                  {selectedApp.skills?.split(',').map((skill, i) => (
                    <span key={i} className={styles.skillTag}>{skill.trim()}</span>
                  )) || 'N/A'}
                </div>
              </div>
            </div>

            {/* Motivation */}
            {selectedApp.whyJoin && (
              <div className={styles.detailSection}>
                <h4><FiEye size={14} /> Why Join?</h4>
                <p className={styles.motivationText}>{selectedApp.whyJoin}</p>
              </div>
            )}

            {/* Links */}
            {(selectedApp.portfolioUrl || selectedApp.linkedinUrl) && (
              <div className={styles.detailSection}>
                <h4>Links</h4>
                {selectedApp.portfolioUrl && (
                  <a href={selectedApp.portfolioUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    🔗 Portfolio/GitHub
                  </a>
                )}
                {selectedApp.linkedinUrl && (
                  <a href={selectedApp.linkedinUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    🔗 LinkedIn Profile
                  </a>
                )}
              </div>
            )}

            {/* Resume */}
            {selectedApp.resume?.url && (
              <div className={styles.detailSection}>
                <h4>Resume / CV</h4>
                <button onClick={() => handleDownloadResume(selectedApp)} className={styles.downloadBtn}>
                  <FiDownload size={14} /> Download Resume
                </button>
              </div>
            )}

            {/* Timeline */}
            <div className={styles.detailSection}>
              <h4><FiCalendar size={14} /> Timeline</h4>
              <div className={styles.timeline}>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineDot} style={{ background: '#10b981' }} />
                  <div>
                    <div className={styles.timelineLabel}>Applied On</div>
                    <div className={styles.timelineDate}>{formatDate(selectedApp.createdAt)}</div>
                  </div>
                </div>
                {selectedApp.updatedAt && selectedApp.updatedAt !== selectedApp.createdAt && (
                  <div className={styles.timelineItem}>
                    <div className={styles.timelineDot} style={{ background: '#3b82f6' }} />
                    <div>
                      <div className={styles.timelineLabel}>Last Updated</div>
                      <div className={styles.timelineDate}>{formatDate(selectedApp.updatedAt)}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Status Update */}
            <div className={styles.detailSection}>
              <h4>Application Status</h4>
              <select 
                value={selectedApp.status} 
                onChange={e => updateStatus(selectedApp._id, e.target.value)} 
                className={styles.statusSelect}
              >
                <option value="new">📋 New</option>
                <option value="reviewed">👁️ Reviewed</option>
                <option value="shortlisted">⭐ Shortlisted</option>
                <option value="rejected">❌ Rejected</option>
                <option value="selected">✅ Selected</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <a href={`mailto:${selectedApp.email}`} className={styles.emailBtn}>
                <FiMail size={14} /> Send Email
              </a>
              <button onClick={() => deleteApp(selectedApp._id)} className={styles.deleteBtn}>
                <FiTrash2 size={14} /> Delete Application
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartTimeManagement;