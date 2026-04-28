import cloudinary from '../config/cloudinary.js';
import multer from 'multer';

// Memory storage - koi local file create nahi hogi
const memoryStorage = multer.memoryStorage();

// Cloudinary upload helper
export const uploadResumeToCloudinary = async (fileBuffer, originalName) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'intechzone/resumes',
        resource_type: 'raw',
        allowed_formats: ['pdf', 'doc', 'docx'],
        public_id: `resume-${Date.now()}-${Math.round(Math.random() * 1E9)}`,
        filename_override: originalName
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else {
          console.log('☁️ Uploaded to Cloudinary:', result.secure_url);
          resolve(result);
        }
      }
    );
    
    uploadStream.end(fileBuffer);
  });
};

// Delete from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'raw'
    });
    console.log('🗑️ Deleted from Cloudinary:', publicId);
    return { success: true, result };
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return { success: false, error: error.message };
  }
};

// Memory storage export
export const upload = multer({
  storage: memoryStorage,  // ✅ Memory me store, local disk me nahi
  limits: { 
    fileSize: 5 * 1024 * 1024  // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'), false);
    }
  }
});