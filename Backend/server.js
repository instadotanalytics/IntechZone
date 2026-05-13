import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import Admin from './models/Admin.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import serviceEnquiryRoutes from './routes/serviceEnquiryRoutes.js';
import adminContactRoutes from './routes/adminContactRoutes.js';
import fullTimeJobRoutes from './routes/fullTimeJobRoutes.js';
import adminServiceRoutes from './routes/adminServiceRoutes.js';
import internshipRoutes from './routes/internshipRoutes.js';
import partTimeRoutes from './routes/partTimeRoutes.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS (Fixed - added all ports)
app.use(cors({
  origin: ['https://intechzone.onrender.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/service-enquiry', serviceEnquiryRoutes);
app.use('/api/admin', adminContactRoutes);
app.use('/api/admin', adminServiceRoutes);
app.use('/api/fulltime-job', fullTimeJobRoutes);
app.use('/api/internship', internshipRoutes);
app.use('/api/part-time', partTimeRoutes);


// Create default admin if not exists (Fixed - with password hashing)
const createDefaultAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
      // Manually hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
      
      const admin = new Admin({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        name: 'Super Admin',
        role: 'super_admin',
      });
      await admin.save();
      console.log('✅ Default admin created successfully');
      console.log(`📧 Email: ${process.env.ADMIN_EMAIL}`);
      console.log(`🔑 Password: ${process.env.ADMIN_PASSWORD}`);
    } else {
      console.log('✅ Admin already exists');
    }
  } catch (error) {
    console.error('❌ Error creating default admin:', error.message);
  }
};

// Only create admin, no dummy projects or visitors
createDefaultAdmin();

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date(),
  });
});

// Debug route to check all registered routes
app.get('/api/debug-routes', (req, res) => {
  const routes = [];
  app._router.stack.forEach(middleware => {
    if (middleware.route) {
      routes.push({
        path: middleware.route.path,
        methods: Object.keys(middleware.route.methods)
      });
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach(handler => {
        if (handler.route) {
          routes.push({
            path: handler.route.path,
            methods: Object.keys(handler.route.methods)
          });
        }
      });
    }
  });
  res.json({ routes });
});

// Error handler for Multer errors
app.use((err, req, res, next) => {
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size exceeds 5MB limit. Please upload a smaller file.'
      });
    }
    return res.status(400).json({
      success: false,
      message: `File upload error: ${err.message}`
    });
  }
  next(err);
});

// General error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('═══════════════════════════════════════════');
  console.log('🚀 Server running on port', PORT);
  console.log('═══════════════════════════════════════════');
  console.log(`🔗 API URL: http://localhost:${PORT}`);
  console.log(`❤️  Health: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Admin Login: http://localhost:${PORT}/api/auth/login`);
  console.log(`📞 Contact API: http://localhost:${PORT}/api/contact/submit`);
  console.log(`📋 Service Enquiry: http://localhost:${PORT}/api/service-enquiry/submit`);
  console.log(`💼 Job Apply: http://localhost:${PORT}/api/fulltime-job/apply`);
  console.log(`📊 Admin Jobs: http://localhost:${PORT}/api/fulltime-job/admin/applications`);
  console.log('═══════════════════════════════════════════');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Error: ${err.message}`);
  server.close(() => process.exit(1));
});