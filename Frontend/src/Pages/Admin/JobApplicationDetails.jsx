// Pages/Admin/JobApplicationDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ApiService from '../../utils/apiService';
import styles from './JobApplicationDetails.module.css';
import {
  FiArrowLeft, FiMail, FiPhone, FiMapPin, FiCalendar,
  FiBriefcase, FiDollarSign, FiClock, FiUser,
  FiDownload, FiExternalLink, FiFileText, FiCode,
  FiBookmark, FiCheckCircle, FiXCircle, FiStar,
  FiTrash2, FiEdit3, FiSend, FiLoader, FiAlertCircle,
  FiLinkedin, FiGlobe, FiTag, FiActivity,
  FiEye, FiZap
} from 'react-icons/fi';

// Status configuration
const STATUS_CONFIG = {
  new: { label: 'New', color: '#f59e0b', bg: '#fffbeb', icon: FiStar },
  reviewed: { label: 'Reviewed', color: '#3b82f6', bg: '#eff6ff', icon: FiEye },
  shortlisted: { label: 'Shortlisted', color: '#8b5cf6', bg: '#f5f3ff', icon: FiBookmark },
  rejected: { label: 'Rejected', color: '#ef4444', bg: '#fef2f2', icon: FiXCircle },
  hired: { label: 'Hired', color: '#10b981', bg: '#ecfdf5', icon: FiCheckCircle }
};

const JobApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [notes, setNotes] = useState('');
  const [notesSaving, setNotesSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (id) fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await ApiService.getJobApplicationById(id);
      if (response.data.success) {
        setApplication(response.data.application);
        setNotes(response.data.application.notes || '');
      } else {
        setError('Failed to load application details');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load application details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setStatusUpdating(true);
      const response = await ApiService.updateJobApplicationStatus(id, newStatus);
      if (response.data.success) {
        setApplication(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error('Status update failed:', err);
      alert('Failed to update status.');
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    try {
      setNotesSaving(true);
      await ApiService.updateJobApplicationNotes(id, notes);
      const btn = document.querySelector(`.${styles.saveNotesBtn}`);
      if (btn) {
        btn.innerHTML = '✓ Saved!';
        btn.style.background = '#10b981';
        setTimeout(() => { btn.innerHTML = '<svg>...</svg> Save Notes'; btn.style.background = ''; }, 2000);
      }
    } catch (err) {
      alert('Failed to save notes.');
    } finally {
      setNotesSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await ApiService.deleteJobApplication(id);
      navigate('/admin');
    } catch (err) {
      alert('Failed to delete application.');
    }
  };

  const handleDownloadResume = () => {
    const url = application?.resume?.url || ApiService.getResumeUrl(id);
    window.open(url, '_blank');
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  // ── Loading ────────────────────────────────────────────────────
  if (loading) return (
    <div className={styles.loadingContainer}>
      <FiLoader size={40} className={styles.loadingSpinner} />
      <p>Loading application details...</p>
    </div>
  );

  // ── Error ──────────────────────────────────────────────────────
  if (error || !application) return (
    <div className={styles.errorContainer}>
      <FiAlertCircle size={48} color="#ef4444" />
      <h2>Application Not Found</h2>
      <p>{error || 'The application does not exist or has been deleted.'}</p>
      <Link to="/admin" className={styles.backBtn}><FiArrowLeft size={16} /> Back to Dashboard</Link>
    </div>
  );

  const currentStatus = STATUS_CONFIG[application.status] || STATUS_CONFIG.new;
  const StatusIcon = currentStatus.icon;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        {/* ── Top Bar ─────────────────────────────────────────── */}
        <div className={styles.topBar}>
          <Link to="/admin" className={styles.backLink}>
            <FiArrowLeft size={18} /> Back to Applications
          </Link>
          <div className={styles.topActions}>
            <button className={styles.downloadBtn} onClick={handleDownloadResume}>
              <FiDownload size={16} /> Download Resume
            </button>
            <button className={styles.deleteBtn} onClick={() => setShowDeleteConfirm(true)}>
              <FiTrash2 size={16} /> Delete
            </button>
          </div>
        </div>

        {/* ── Content Grid ────────────────────────────────────── */}
        <div className={styles.contentGrid}>
          
          {/* LEFT COLUMN */}
          <div className={styles.mainColumn}>
            
            {/* Candidate Header */}
            <div className={styles.candidateCard}>
              <div className={styles.candidateAvatar} style={{ background: currentStatus.bg, color: currentStatus.color }}>
                {application.fullName?.charAt(0)?.toUpperCase() || '?'}
              </div>
              <div className={styles.candidateInfo}>
                <h1>{application.fullName}</h1>
                <div className={styles.candidateMeta}>
                  <span><FiMail size={14} /> {application.email}</span>
                  <span><FiPhone size={14} /> {application.phone || 'No phone'}</span>
                </div>
                <div className={styles.candidateMeta}>
                  <span><FiCalendar size={14} /> Applied: {formatDate(application.createdAt)}</span>
                </div>
              </div>
              <div className={styles.statusBadge} style={{ background: currentStatus.bg, color: currentStatus.color }}>
                <StatusIcon size={16} /> {currentStatus.label}
              </div>
            </div>

            {/* Position Details */}
            <div className={styles.infoCard}>
              <h3><FiBriefcase size={18} /> Position Details</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}><label>Position Applied</label><span>{application.position}</span></div>
                <div className={styles.infoItem}><label>Experience</label><span>{application.experience}</span></div>
                <div className={styles.infoItem}><label>Current Company</label><span>{application.currentCompany || 'Not specified'}</span></div>
                <div className={styles.infoItem}><label>Notice Period</label><span>{application.noticePeriod}</span></div>
                <div className={styles.infoItem} style={{ gridColumn: '1 / -1' }}>
                  <label>Key Skills</label>
                  <div className={styles.skillsList}>
                    {application.skills?.split(',').map((skill, i) => (
                      <span key={i} className={styles.skillTag}><FiCode size={12} /> {skill.trim()}</span>
                    )) || <span className={styles.noData}>No skills specified</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Salary */}
            <div className={styles.infoCard}>
              <h3><FiDollarSign size={18} /> Compensation</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}><label>Current CTC</label><span>{application.currentCTC || 'Not specified'}</span></div>
                <div className={styles.infoItem}><label>Expected CTC</label><span className={styles.highlight}>{application.expectedCTC}</span></div>
              </div>
            </div>

            {/* Online Presence */}
            {(application.portfolioUrl || application.linkedinUrl) && (
              <div className={styles.infoCard}>
                <h3><FiGlobe size={18} /> Online Presence</h3>
                <div className={styles.linksList}>
                  {application.portfolioUrl && (
                    <a href={application.portfolioUrl} target="_blank" rel="noopener noreferrer" className={styles.linkItem}>
                      <FiGlobe size={16} /><span>Portfolio / GitHub</span><FiExternalLink size={14} />
                    </a>
                  )}
                  {application.linkedinUrl && (
                    <a href={application.linkedinUrl} target="_blank" rel="noopener noreferrer" className={styles.linkItem}>
                      <FiLinkedin size={16} /><span>LinkedIn Profile</span><FiExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Cover Letter */}
            {application.coverLetter && (
              <div className={styles.infoCard}>
                <h3><FiFileText size={18} /> Cover Letter</h3>
                <div className={styles.coverLetter}><p>{application.coverLetter}</p></div>
              </div>
            )}

            {/* Timeline */}
            <div className={styles.infoCard}>
              <h3><FiClock size={18} /> Timeline</h3>
              <div className={styles.timeline}>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineDot} style={{ background: '#10b981' }} />
                  <div>
                    <span className={styles.timelineLabel}>Submitted</span>
                    <span className={styles.timelineDate}>{formatDate(application.createdAt)}</span>
                  </div>
                </div>
                {application.updatedAt && application.updatedAt !== application.createdAt && (
                  <div className={styles.timelineItem}>
                    <div className={styles.timelineDot} style={{ background: currentStatus.color }} />
                    <div>
                      <span className={styles.timelineLabel}>Last Updated</span>
                      <span className={styles.timelineDate}>{formatDate(application.updatedAt)}</span>
                    </div>
                  </div>
                )}
                <div className={styles.timelineItem}>
                  <div className={styles.timelineDot} style={{ background: currentStatus.color }} />
                  <div>
                    <span className={styles.timelineLabel}>Current Status</span>
                    <span className={styles.timelineDate} style={{ color: currentStatus.color, fontWeight: 600 }}>{currentStatus.label}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Sidebar */}
          <div className={styles.sidebar}>
            
            {/* Status Management */}
            <div className={styles.sidebarCard}>
              <h3><FiActivity size={18} /> Update Status</h3>
              <div className={styles.statusButtons}>
                {Object.entries(STATUS_CONFIG).map(([key, config]) => {
                  const Icon = config.icon;
                  const isActive = application.status === key;
                  return (
                    <button key={key}
                      className={`${styles.statusBtn} ${isActive ? styles.statusBtnActive : ''}`}
                      onClick={() => handleStatusChange(key)}
                      disabled={statusUpdating}
                      style={{ borderColor: isActive ? config.color : 'transparent', background: isActive ? config.bg : '#f8fafc' }}>
                      <Icon size={16} color={config.color} />
                      <span style={{ flex: 1 }}>{config.label}</span>
                      {isActive && <FiCheckCircle size={14} color={config.color} />}
                    </button>
                  );
                })}
              </div>
              {statusUpdating && <div className={styles.updatingText}><FiLoader size={14} className={styles.spin} /> Updating...</div>}
            </div>

            {/* Resume */}
            <div className={styles.sidebarCard}>
              <h3><FiFileText size={18} /> Resume</h3>
              {application.resume ? (
                <div className={styles.resumeInfo}>
                  <FiFileText size={32} color="#10b981" />
                  <div className={styles.resumeDetails}>
                    <span className={styles.resumeName}>{application.resume.originalName || 'resume.pdf'}</span>
                    <span className={styles.resumeMeta}>
                      {application.resume.size ? `${(application.resume.size / 1024).toFixed(1)} KB` : 'Unknown'}
                      {application.resume.mimetype && ` • ${application.resume.mimetype.split('/')[1]?.toUpperCase()}`}
                    </span>
                  </div>
                  <button className={styles.resumeDownloadBtn} onClick={handleDownloadResume}><FiDownload size={18} /></button>
                </div>
              ) : (
                <div className={styles.noResume}><FiFileText size={24} /><p>No resume</p></div>
              )}
            </div>

            {/* Notes */}
            <div className={styles.sidebarCard}>
              <h3><FiEdit3 size={18} /> Private Notes</h3>
              <textarea className={styles.notesTextarea} value={notes} onChange={e => setNotes(e.target.value)}
                placeholder="Add private notes..." rows={5} />
              <button className={styles.saveNotesBtn} onClick={handleSaveNotes} disabled={notesSaving}>
                {notesSaving ? 'Saving...' : 'Save Notes'}
              </button>
            </div>

            {/* Quick Actions */}
            <div className={styles.sidebarCard}>
              <h3><FiZap size={18} /> Quick Actions</h3>
              <div className={styles.quickActions}>
                <a href={`mailto:${application.email}`} className={styles.actionBtn}><FiMail size={16} /> Send Email</a>
                {application.phone && <a href={`tel:${application.phone}`} className={styles.actionBtn}><FiPhone size={16} /> Call</a>}
                {application.linkedinUrl && <a href={application.linkedinUrl} target="_blank" className={styles.actionBtn}><FiLinkedin size={16} /> LinkedIn</a>}
              </div>
            </div>

            {/* App Info */}
            <div className={styles.sidebarCard}>
              <h3><FiTag size={18} /> Info</h3>
              <div className={styles.appInfo}>
                <div className={styles.appInfoItem}><span>ID</span><code>{application._id?.slice(-8)}</code></div>
                <div className={styles.appInfoItem}><span>Applied</span><span>{formatDate(application.createdAt)}</span></div>
                <div className={styles.appInfoItem}><span>Updated</span><span>{formatDate(application.updatedAt)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Delete Modal ─────────────────────────────────────── */}
      {showDeleteConfirm && (
        <div className={styles.modalOverlay} onClick={() => setShowDeleteConfirm(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <FiAlertCircle size={48} color="#ef4444" />
            <h2>Delete Application?</h2>
            <p>This will permanently delete <strong>{application.fullName}'s</strong> application and resume.</p>
            <p style={{ color: '#ef4444', fontWeight: 600, fontSize: 13 }}>This cannot be undone.</p>
            <div className={styles.modalActions}>
              <button className={styles.modalCancelBtn} onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
              <button className={styles.modalDeleteBtn} onClick={handleDelete}><FiTrash2 size={16} /> Delete Permanently</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplicationDetails;