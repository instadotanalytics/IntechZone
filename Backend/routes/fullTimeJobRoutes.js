import express from 'express';
import { upload, uploadResumeToCloudinary, deleteFromCloudinary } from '../utils/cloudinaryUpload.js';
import FullTimeJobApplication from '../models/FullTimeJobApplication.js';

const router = express.Router();

// ─── PUBLIC ROUTE: Submit Job Application ───────────────────────
router.post('/apply', upload.single('resume'), async (req, res) => {
  try {
    const {
      fullName, email, phone, position, experience,
      currentCompany, currentCTC, expectedCTC,
      noticePeriod, skills, portfolioUrl, linkedinUrl, coverLetter
    } = req.body;

    console.log('📥 Application received:', { fullName, email, position });

    const required = ['fullName', 'email', 'phone', 'position', 'experience', 'expectedCTC', 'noticePeriod', 'skills'];
    const missing = required.filter(f => !req.body[f]);
    
    if (missing.length > 0) {
      return res.status(400).json({ success: false, message: `Missing fields: ${missing.join(', ')}` });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Resume is required. Please upload PDF or DOC file.' });
    }

    console.log('☁️ Uploading to Cloudinary...');
    const cloudinaryResult = await uploadResumeToCloudinary(req.file.buffer, req.file.originalname);
    console.log('✅ Cloudinary upload success:', cloudinaryResult.secure_url);

    const application = await FullTimeJobApplication.create({
      fullName,
      email: email.toLowerCase(),
      phone,
      position,
      experience,
      currentCompany: currentCompany || '',
      currentCTC: currentCTC || '',
      expectedCTC,
      noticePeriod,
      skills,
      portfolioUrl: portfolioUrl || '',
      linkedinUrl: linkedinUrl || '',
      coverLetter: coverLetter || '',
      resume: {
        cloudinaryId: cloudinaryResult.public_id,
        url: cloudinaryResult.secure_url,
        filename: cloudinaryResult.public_id,
        originalName: req.file.originalname,
        size: cloudinaryResult.bytes,
        format: cloudinaryResult.format,
        mimetype: req.file.mimetype
      },
      status: 'new'
    });

    console.log('💾 Saved to database:', application._id);
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      applicationId: application._id,
      resumeUrl: cloudinaryResult.secure_url
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ success: false, message: 'Error submitting application.' });
  }
});

// ─── ADMIN ROUTES ───────────────────────────────────────────────
// ⚠️ IMPORTANT: Specific routes PEHLE, :id routes BAAD ME

// ✅ 1. Stats route - SABSE PEHLE
router.get('/admin/stats', async (req, res) => {
  try {
    const [total, newApps, reviewed, shortlisted, rejected, hired] = await Promise.all([
      FullTimeJobApplication.countDocuments(),
      FullTimeJobApplication.countDocuments({ status: 'new' }),
      FullTimeJobApplication.countDocuments({ status: 'reviewed' }),
      FullTimeJobApplication.countDocuments({ status: 'shortlisted' }),
      FullTimeJobApplication.countDocuments({ status: 'rejected' }),
      FullTimeJobApplication.countDocuments({ status: 'hired' })
    ]);

    const byPosition = await FullTimeJobApplication.aggregate([
      { $group: { _id: '$position', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({ success: true, stats: { total, new: newApps, reviewed, shortlisted, rejected, hired }, byPosition });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ success: false, message: 'Error fetching stats' });
  }
});

// ✅ 2. Applications list
router.get('/admin/applications', async (req, res) => {
  try {
    const { status, page = 1, limit = 20, search } = req.query;
    let query = {};
    
    if (status && status !== 'all') query.status = status;
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { skills: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } }
      ];
    }

    const [applications, total] = await Promise.all([
      FullTimeJobApplication.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit)),
      FullTimeJobApplication.countDocuments(query)
    ]);

    res.json({ success: true, applications, total, page: Number(page), totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ success: false, message: 'Error fetching applications' });
  }
});

// ✅ 3. Bulk delete - PEHLE
router.post('/admin/bulk-delete', async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'No IDs provided' });
    }

    const applications = await FullTimeJobApplication.find({ _id: { $in: ids } });
    for (const app of applications) {
      if (app.resume?.cloudinaryId) await deleteFromCloudinary(app.resume.cloudinaryId);
    }

    const result = await FullTimeJobApplication.deleteMany({ _id: { $in: ids } });
    console.log(`🗑️ Bulk deleted: ${result.deletedCount} applications`);
    res.json({ success: true, deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Bulk delete failed' });
  }
});

// ✅ 4. Resume download - PEHLE (before /admin/:id)
router.get('/admin/:id/resume', async (req, res) => {
  try {
    const application = await FullTimeJobApplication.findById(req.params.id);
    if (!application?.resume?.url) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }
    console.log('📥 Downloading resume:', application.resume.url);
    res.redirect(application.resume.url);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Download failed' });
  }
});

// ✅ 5. Update status - PEHLE
router.put('/admin/:id/status', async (req, res) => {
  try {
    const { status, notes } = req.body;
    const validStatuses = ['new', 'reviewed', 'shortlisted', 'rejected', 'hired'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status. Valid: ${validStatuses.join(', ')}` });
    }

    const application = await FullTimeJobApplication.findByIdAndUpdate(
      req.params.id,
      { status, notes: notes || '', updatedAt: new Date() },
      { new: true }
    );
    
    if (!application) return res.status(404).json({ success: false, message: 'Application not found' });
    
    console.log(`📝 Status updated: ${application._id} → ${status}`);
    res.json({ success: true, message: 'Status updated', application });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Update failed' });
  }
});

// ✅ 6. Delete - PEHLE
router.delete('/admin/:id', async (req, res) => {
  try {
    const application = await FullTimeJobApplication.findById(req.params.id);
    if (!application) return res.status(404).json({ success: false, message: 'Application not found' });

    if (application.resume?.cloudinaryId) {
      await deleteFromCloudinary(application.resume.cloudinaryId);
    }

    await FullTimeJobApplication.findByIdAndDelete(req.params.id);
    console.log('🗑️ Deleted:', req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Delete failed' });
  }
});

// ✅ 7. Get single application - SABSE LAST (catch-all for :id)
router.get('/admin/:id', async (req, res) => {
  try {
    const application = await FullTimeJobApplication.findById(req.params.id);
    if (!application) return res.status(404).json({ success: false, message: 'Application not found' });
    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching application' });
  }
});

export default router;