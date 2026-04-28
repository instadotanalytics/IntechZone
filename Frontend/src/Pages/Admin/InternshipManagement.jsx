// Pages/Admin/InternshipManagement.jsx
import React, { useState, useEffect, useCallback } from 'react';
import ApiService from '../../utils/apiService';
import styles from './InternshipManagement.module.css';
import { 
  FiSearch, FiRefreshCw, FiDownload, FiTrash2, FiX, 
  FiLoader, FiEye, FiMail, FiPhone, FiCalendar, FiBriefcase,
  FiCode, FiUser, FiBookOpen, FiAward
} from 'react-icons/fi';

const STATUS_CONFIG = {
  new: { label: 'New', color: '#f59e0b', bg: '#fffbeb' },
  reviewed: { label: 'Reviewed', color: '#3b82f6', bg: '#eff6ff' },
  shortlisted: { label: 'Shortlisted', color: '#8b5cf6', bg: '#f5f3ff' },
  rejected: { label: 'Rejected', color: '#ef4444', bg: '#fef2f2' },
  selected: { label: 'Selected', color: '#10b981', bg: '#ecfdf5' }
};

const InternshipManagement = () => {
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
      const res = await ApiService.getInternshipApplications({ 
        status: filter === 'all' ? null : filter,
        limit: 200 
      });
      console.log('📋 Fetched applications:', res.data);
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
      const res = await ApiService.getInternshipStats(); 
      console.log('📊 Stats:', res.data);
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
      await ApiService.updateInternshipStatus(id, status); 
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
      await ApiService.deleteInternshipApplication(id); 
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
        <p>Loading internship applications...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2>Internship Applications</h2>
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
        <button 
          className={filter === 'all' ? styles.active : ''} 
          onClick={() => setFilter('all')}
        >
          All ({stats.total})
        </button>
        <button 
          className={filter === 'new' ? styles.active : ''} 
          onClick={() => setFilter('new')}
        >
          New ({stats.new || 0})
        </button>
        <button 
          className={filter === 'reviewed' ? styles.active : ''} 
          onClick={() => setFilter('reviewed')}
        >
          Reviewed ({stats.reviewed || 0})
        </button>
        <button 
          className={filter === 'shortlisted' ? styles.active : ''} 
          onClick={() => setFilter('shortlisted')}
        >
          Shortlisted ({stats.shortlisted || 0})
        </button>
        <button 
          className={filter === 'rejected' ? styles.active : ''} 
          onClick={() => setFilter('rejected')}
        >
          Rejected ({stats.rejected || 0})
        </button>
        <button 
          className={filter === 'selected' ? styles.active : ''} 
          onClick={() => setFilter('selected')}
        >
          Selected ({stats.selected || 0})
        </button>
      </div>

      {/* Split Layout - NO EMPTY RIGHT PANEL */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        
        {/* LEFT PANEL - Full width when no application selected */}
        <div style={{ 
          flex: selectedApp ? 1 : 'none', 
          width: selectedApp ? 'auto' : '100%',
          background: '#fff', 
          borderRadius: '16px', 
          border: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid #e2e8f0',
            background: '#fafbfc'
          }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
              Applications ({filteredApps.length})
            </h3>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              Click on any row to view details
            </span>
          </div>
          
          <div style={{ maxHeight: 'calc(100vh - 350px)', overflowY: 'auto' }}>
            {filteredApps.length > 0 ? (
              filteredApps.map((app, index) => (
                <div 
                  key={app._id} 
                  onClick={() => setSelectedApp(app)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px 20px',
                    borderBottom: '1px solid #f1f5f9',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: selectedApp?._id === app._id ? '#eff6ff' : '#fff',
                    borderLeft: selectedApp?._id === app._id ? '3px solid #3b82f6' : '3px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedApp?._id !== app._id) {
                      e.currentTarget.style.background = '#f8fafc';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedApp?._id !== app._id) {
                      e.currentTarget.style.background = '#fff';
                    }
                  }}
                >
                  <div style={{ width: '32px', fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>
                    {index + 1}
                  </div>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: '#fef3c7',
                    color: '#f59e0b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '18px'
                  }}>
                    {app.fullName?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '15px', color: '#1e293b', marginBottom: '4px' }}>
                      {app.fullName}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', wordBreak: 'break-all' }}>
                      {app.email}
                    </div>
                    <div style={{ fontSize: '11px', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FiBriefcase size={10} /> {app.internshipRole}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '6px' }}>
                      {formatDate(app.createdAt)}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '20px',
                      display: 'inline-block',
                      background: STATUS_CONFIG[app.status]?.bg || '#f1f5f9',
                      color: STATUS_CONFIG[app.status]?.color || '#64748b'
                    }}>
                      {STATUS_CONFIG[app.status]?.label || app.status}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
                <FiBookOpen size={40} />
                <p style={{ marginTop: '12px' }}>No internship applications found</p>
                <span style={{ fontSize: '12px' }}>Applications will appear here once students apply</span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL - Only shows when an application is selected */}
        {selectedApp && (
          <div style={{
            width: '450px',
            background: '#fff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            maxHeight: 'calc(100vh - 200px)',
            overflowY: 'auto',
            position: 'sticky',
            top: '20px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 20px',
              borderBottom: '1px solid #e2e8f0'
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Application Details</h3>
              <button 
                onClick={() => setSelectedApp(null)} 
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#94a3b8',
                  borderRadius: '6px'
                }}
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Candidate Profile */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '20px',
              background: '#f8fafc',
              margin: '16px',
              borderRadius: '14px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                background: '#fef3c7',
                color: '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 700
              }}>
                {selectedApp.fullName?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{selectedApp.fullName}</h4>
                <p style={{ margin: '4px 0', fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FiMail size={12} /> {selectedApp.email}
                </p>
                <p style={{ margin: '4px 0', fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FiPhone size={12} /> {selectedApp.phone}
                </p>
              </div>
            </div>

            {/* Education Details */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FiBookOpen size={14} /> Education
              </h4>
              <div style={{ display: 'flex', marginBottom: '10px', fontSize: '13px' }}>
                <label style={{ width: '100px', color: '#64748b', fontWeight: 500 }}>Qualification:</label>
                <span style={{ flex: 1, color: '#1e293b' }}>{selectedApp.qualification}</span>
              </div>
              <div style={{ display: 'flex', marginBottom: '10px', fontSize: '13px' }}>
                <label style={{ width: '100px', color: '#64748b', fontWeight: 500 }}>Course/Stream:</label>
                <span style={{ flex: 1, color: '#1e293b' }}>{selectedApp.course}</span>
              </div>
              <div style={{ display: 'flex', marginBottom: '10px', fontSize: '13px' }}>
                <label style={{ width: '100px', color: '#64748b', fontWeight: 500 }}>Passing Year:</label>
                <span style={{ flex: 1, color: '#1e293b' }}>{selectedApp.passingYear}</span>
              </div>
            </div>

            {/* Internship Details */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FiBriefcase size={14} /> Internship Details
              </h4>
              <div style={{ display: 'flex', marginBottom: '10px', fontSize: '13px' }}>
                <label style={{ width: '100px', color: '#64748b', fontWeight: 500 }}>Role Applied:</label>
                <span style={{ flex: 1, color: '#3b82f6', fontWeight: 600 }}>{selectedApp.internshipRole}</span>
              </div>
              <div style={{ display: 'flex', marginBottom: '10px', fontSize: '13px' }}>
                <label style={{ width: '100px', color: '#64748b', fontWeight: 500 }}>Duration:</label>
                <span style={{ flex: 1, color: '#1e293b' }}>{selectedApp.duration || '3 months'}</span>
              </div>
              <div style={{ display: 'flex', marginBottom: '10px', fontSize: '13px' }}>
                <label style={{ width: '100px', color: '#64748b', fontWeight: 500 }}>Skills:</label>
                <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {selectedApp.skills?.split(',').map((skill, i) => (
                    <span key={i} style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', color: '#475569' }}>
                      {skill.trim()}
                    </span>
                  )) || 'N/A'}
                </div>
              </div>
            </div>

            {/* Motivation */}
            {selectedApp.whyJoin && (
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FiEye size={14} /> Why Join?
                </h4>
                <p style={{ fontSize: '13px', lineHeight: '1.5', color: '#475569', margin: 0 }}>{selectedApp.whyJoin}</p>
              </div>
            )}

            {/* Links */}
            {(selectedApp.portfolioUrl || selectedApp.linkedinUrl) && (
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#475569' }}>Links</h4>
                {selectedApp.portfolioUrl && (
                  <a href={selectedApp.portfolioUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '8px 0', fontSize: '13px', color: '#3b82f6', textDecoration: 'none' }}>
                    🔗 Portfolio/GitHub
                  </a>
                )}
                {selectedApp.linkedinUrl && (
                  <a href={selectedApp.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '8px 0', fontSize: '13px', color: '#3b82f6', textDecoration: 'none' }}>
                    🔗 LinkedIn Profile
                  </a>
                )}
              </div>
            )}

            {/* Resume */}
            {selectedApp.resume?.url && (
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#475569' }}>Resume / CV</h4>
                <button onClick={() => handleDownloadResume(selectedApp)} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#10b981',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 16px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 500
                }}>
                  <FiDownload size={14} /> Download Resume
                </button>
              </div>
            )}

            {/* Application Timeline */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FiCalendar size={14} /> Timeline
              </h4>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Applied On</div>
                    <div style={{ fontSize: '13px', fontWeight: 500 }}>{formatDate(selectedApp.createdAt)}</div>
                  </div>
                </div>
                {selectedApp.updatedAt && selectedApp.updatedAt !== selectedApp.createdAt && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} />
                    <div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>Last Updated</div>
                      <div style={{ fontSize: '13px', fontWeight: 500 }}>{formatDate(selectedApp.updatedAt)}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Status Update */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#475569' }}>Application Status</h4>
              <select 
                value={selectedApp.status} 
                onChange={e => updateStatus(selectedApp._id, e.target.value)} 
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                <option value="new">📋 New</option>
                <option value="reviewed">👁️ Reviewed</option>
                <option value="shortlisted">⭐ Shortlisted</option>
                <option value="rejected">❌ Rejected</option>
                <option value="selected">✅ Selected</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div style={{ padding: '16px 20px', display: 'flex', gap: '12px' }}>
              <a href={`mailto:${selectedApp.email}`} style={{
                flex: 1,
                padding: '10px',
                background: '#3b82f6',
                color: '#fff',
                textAlign: 'center',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}>
                <FiMail size={14} /> Send Email
              </a>
              <button onClick={() => deleteApp(selectedApp._id)} style={{
                flex: 1,
                padding: '10px',
                background: '#fee2e2',
                color: '#ef4444',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}>
                <FiTrash2 size={14} /> Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipManagement;