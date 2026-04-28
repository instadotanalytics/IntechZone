// controllers/internshipController.js
import Internship from '../models/Internship.js';
import multer from 'multer';
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer config for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOC files are allowed'), false);
    }
  }
});

export const uploadResume = upload.single('resume');

// @desc    Submit internship application
// @route   POST /api/internship/apply
// @access  Public
export const submitInternshipApplication = async (req, res) => {
  try {
    console.log('Internship application received:', req.body);
    
    const { fullName, email, phone, qualification, course, passingYear,
            internshipRole, duration, startDate, skills, portfolioUrl, 
            linkedinUrl, whyJoin } = req.body;

    // Validation
    if (!fullName || !email || !phone || !qualification || !course || !passingYear || !internshipRole) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    let resumeData = null;
    
    // Upload resume to Cloudinary if exists
    if (req.file) {
      try {
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.v2.uploader.upload_stream(
            {
              folder: 'internship-resumes',
              resource_type: 'auto',
              allowed_formats: ['pdf', 'doc', 'docx'],
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(req.file.buffer);
        });
        
        resumeData = {
          url: result.secure_url,
          publicId: result.public_id,
          originalName: req.file.originalname,
          size: req.file.size,
          mimetype: req.file.mimetype,
        };
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
      }
    }

    const application = new Internship({
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
      status: 'new',
    });

    await application.save();
    console.log('✅ Internship application saved:', application._id);

    res.status(201).json({
      success: true,
      message: 'Internship application submitted successfully!',
      data: application,
    });
  } catch (error) {
    console.error('Internship application error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Get all internship applications (Admin)
// @route   GET /api/internship/admin/applications
// @access  Private/Admin
export const getAllInternshipApplications = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status) query.status = status;

    const applications = await Internship.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Internship.countDocuments(query);
    const newCount = await Internship.countDocuments({ status: 'new' });
    const reviewedCount = await Internship.countDocuments({ status: 'reviewed' });
    const shortlistedCount = await Internship.countDocuments({ status: 'shortlisted' });
    const rejectedCount = await Internship.countDocuments({ status: 'rejected' });
    const selectedCount = await Internship.countDocuments({ status: 'selected' });

    res.status(200).json({
      success: true,
      applications,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      counts: {
        new: newCount,
        reviewed: reviewedCount,
        shortlisted: shortlistedCount,
        rejected: rejectedCount,
        selected: selectedCount,
        total: total,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get single internship application (Admin)
// @route   GET /api/internship/admin/applications/:id
// @access  Private/Admin
export const getInternshipApplicationById = async (req, res) => {
  try {
    const application = await Internship.findById(req.params.id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }
    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Update application status (Admin)
// @route   PUT /api/internship/admin/applications/:id/status
// @access  Private/Admin
export const updateInternshipStatus = async (req, res) => {
  try {
    const { status, interviewDate } = req.body;
    const application = await Internship.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    application.status = status;
    if (interviewDate) application.interviewDate = interviewDate;
    application.updatedAt = Date.now();
    await application.save();

    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Update application notes (Admin)
// @route   PUT /api/internship/admin/applications/:id/notes
// @access  Private/Admin
export const updateInternshipNotes = async (req, res) => {
  try {
    const { notes } = req.body;
    const application = await Internship.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    application.notes = notes;
    application.updatedAt = Date.now();
    await application.save();

    res.status(200).json({
      success: true,
      message: 'Notes updated successfully',
      application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Delete internship application (Admin)
// @route   DELETE /api/internship/admin/applications/:id
// @access  Private/Admin
export const deleteInternshipApplication = async (req, res) => {
  try {
    const application = await Internship.findById(req.params.id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    // Delete resume from Cloudinary if exists
    if (application.resume && application.resume.publicId) {
      await cloudinary.v2.uploader.destroy(application.resume.publicId);
    }

    await application.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Application deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get internship stats (Admin)
// @route   GET /api/internship/admin/stats
// @access  Private/Admin
export const getInternshipStats = async (req, res) => {
  try {
    const total = await Internship.countDocuments();
    const newCount = await Internship.countDocuments({ status: 'new' });
    const reviewedCount = await Internship.countDocuments({ status: 'reviewed' });
    const shortlistedCount = await Internship.countDocuments({ status: 'shortlisted' });
    const rejectedCount = await Internship.countDocuments({ status: 'rejected' });
    const selectedCount = await Internship.countDocuments({ status: 'selected' });
    
    // Get applications by role
    const webDevCount = await Internship.countDocuments({ internshipRole: 'Web Development' });
    const appDevCount = await Internship.countDocuments({ internshipRole: 'App Development' });
    const digitalMarketingCount = await Internship.countDocuments({ internshipRole: 'Digital Marketing' });
    
    res.status(200).json({
      success: true,
      stats: {
        total,
        new: newCount,
        reviewed: reviewedCount,
        shortlisted: shortlistedCount,
        rejected: rejectedCount,
        selected: selectedCount,
      },
      byRole: {
        webDevelopment: webDevCount,
        appDevelopment: appDevCount,
        digitalMarketing: digitalMarketingCount,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};