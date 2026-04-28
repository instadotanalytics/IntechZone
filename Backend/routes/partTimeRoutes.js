// backend/routes/partTimeRoutes.js
import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import PartTimeApplication from '../models/PartTimeApplication.js';

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOC files are allowed'));
    }
  }
});

// ==================== PUBLIC ROUTES ====================

// Submit internship application (Part Time)
router.post('/apply', upload.single('resume'), async (req, res) => {
  try {
    console.log('📝 Received application submission');
    console.log('Body:', req.body);
    console.log('File:', req.file);

    const {
      fullName, email, phone, qualification, course, passingYear,
      internshipRole, duration, startDate, skills, portfolioUrl,
      linkedinUrl, whyJoin
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !qualification || !course || !passingYear || !internshipRole) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill all required fields' 
      });
    }

    // Upload resume to cloudinary
    let resumeData = {};
    if (req.file) {
      try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;
        const result = await cloudinary.v2.uploader.upload(dataURI, {
          folder: 'part-time-internship-resumes',
          resource_type: 'auto'
        });
        resumeData = {
          url: result.secure_url,
          publicId: result.public_id,
          originalName: req.file.originalname,
          size: req.file.size
        };
        console.log('✅ Resume uploaded to Cloudinary');
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to upload resume' 
        });
      }
    } else {
      return res.status(400).json({ 
        success: false, 
        message: 'Resume is required' 
      });
    }

    // Create application
    const application = await PartTimeApplication.create({
      fullName,
      email,
      phone,
      qualification,
      course,
      passingYear,
      internshipRole,
      duration: duration || '3 months',
      startDate: startDate || '',
      skills: skills || '',
      portfolioUrl: portfolioUrl || '',
      linkedinUrl: linkedinUrl || '',
      whyJoin: whyJoin || '',
      resume: resumeData,
      status: 'new'
    });

    console.log('✅ Application saved successfully:', application._id);

    res.status(201).json({ 
      success: true, 
      message: 'Application submitted successfully! We will contact you soon.',
      data: { id: application._id }
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to submit application' 
    });
  }
});

// ==================== ADMIN ROUTES (No Auth) ====================

// Get all applications with filters
router.get('/admin/applications', async (req, res) => {
  try {
    const { status, search, limit = 100, page = 1 } = req.query;
    
    let query = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { internshipRole: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const applications = await PartTimeApplication.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await PartTimeApplication.countDocuments(query);
    
    res.json({
      success: true,
      applications,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get application statistics
router.get('/admin/stats', async (req, res) => {
  try {
    const total = await PartTimeApplication.countDocuments();
    const newCount = await PartTimeApplication.countDocuments({ status: 'new' });
    const reviewed = await PartTimeApplication.countDocuments({ status: 'reviewed' });
    const shortlisted = await PartTimeApplication.countDocuments({ status: 'shortlisted' });
    const rejected = await PartTimeApplication.countDocuments({ status: 'rejected' });
    const selected = await PartTimeApplication.countDocuments({ status: 'selected' });
    
    // Get recent applications
    const recent = await PartTimeApplication.find()
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.json({
      success: true,
      stats: {
        total,
        new: newCount,
        reviewed,
        shortlisted,
        rejected,
        selected
      },
      recent
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single application by ID
router.get('/admin/applications/:id', async (req, res) => {
  try {
    const application = await PartTimeApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update application status
router.put('/admin/applications/:id/status', async (req, res) => {
  try {
    const { status, notes } = req.body;
    const application = await PartTimeApplication.findByIdAndUpdate(
      req.params.id,
      {
        status,
        notes,
        reviewedAt: new Date()
      },
      { new: true }
    );
    
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    
    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete application
router.delete('/admin/applications/:id', async (req, res) => {
  try {
    const application = await PartTimeApplication.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    
    // Delete resume from Cloudinary if exists
    if (application.resume?.publicId) {
      await cloudinary.v2.uploader.destroy(application.resume.publicId);
    }
    
    await PartTimeApplication.findByIdAndDelete(req.params.id);
    
    res.json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Bulk delete applications
router.delete('/admin/applications/bulk', async (req, res) => {
  try {
    const { ids } = req.body;
    
    // Delete resumes from Cloudinary
    const applications = await PartTimeApplication.find({ _id: { $in: ids } });
    for (const app of applications) {
      if (app.resume?.publicId) {
        await cloudinary.v2.uploader.destroy(app.resume.publicId);
      }
    }
    
    await PartTimeApplication.deleteMany({ _id: { $in: ids } });
    
    res.json({ success: true, message: `${ids.length} applications deleted successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;