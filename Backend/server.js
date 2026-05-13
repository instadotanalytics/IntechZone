import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
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

// ======================
// ENV CONFIG
// ======================
dotenv.config();

// ======================
// DATABASE CONNECT
// ======================
connectDB();

// ======================
// __dirname FIX
// ======================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ======================
// EXPRESS APP
// ======================
const app = express();

// ======================
// CORS CONFIG
// ======================
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://intechzone.onrender.com'
  ],
  credentials: true
}));

app.options('*', cors());

// ======================
// BODY PARSER
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// ROUTES
// ======================
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/service-enquiry', serviceEnquiryRoutes);
app.use('/api/admin', adminContactRoutes);
app.use('/api/admin', adminServiceRoutes);
app.use('/api/fulltime-job', fullTimeJobRoutes);
app.use('/api/internship', internshipRoutes);
app.use('/api/part-time', partTimeRoutes);

// ======================
// CREATE DEFAULT ADMIN
// ======================
const createDefaultAdmin = async () => {

  try {

    const adminExists = await Admin.findOne({
      email: process.env.ADMIN_EMAIL
    });

    if (!adminExists) {

      const admin = new Admin({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        name: 'Super Admin',
        role: 'super_admin',
      });

      await admin.save();

      console.log('✅ Default admin created successfully');

    } else {

      console.log('✅ Admin already exists');

    }

  } catch (error) {

    console.log('❌ Error creating default admin:', error.message);

  }

};

// Run Admin Creation
createDefaultAdmin();

// ======================
// HEALTH ROUTE
// ======================
app.get('/api/health', (req, res) => {

  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date(),
  });

});

// ======================
// DEBUG ROUTES
// ======================
app.get('/api/debug-routes', (req, res) => {

  const routes = [];

  app._router.stack.forEach((middleware) => {

    if (middleware.route) {

      routes.push({
        path: middleware.route.path,
        methods: Object.keys(middleware.route.methods),
      });

    } else if (middleware.name === 'router') {

      middleware.handle.stack.forEach((handler) => {

        if (handler.route) {

          routes.push({
            path: handler.route.path,
            methods: Object.keys(handler.route.methods),
          });

        }

      });

    }

  });

  res.json({ routes });

});

// ======================
// MULTER ERROR HANDLER
// ======================
app.use((err, req, res, next) => {

  if (err.name === 'MulterError') {

    if (err.code === 'LIMIT_FILE_SIZE') {

      return res.status(400).json({
        success: false,
        message: 'File size exceeds 5MB limit',
      });

    }

    return res.status(400).json({
      success: false,
      message: err.message,
    });

  }

  next(err);

});

// ======================
// GENERAL ERROR HANDLER
// ======================
app.use((err, req, res, next) => {

  console.error('❌ Error:', err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });

});

// ======================
// 404 ROUTE
// ======================
app.use('*', (req, res) => {

  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });

});

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log('═══════════════════════════════════════════');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('═══════════════════════════════════════════');

  console.log(`❤️ Health: /api/health`);
  console.log(`🔐 Auth: /api/auth/login`);

});

// ======================
// UNHANDLED REJECTION
// ======================
process.on('unhandledRejection', (err) => {

  console.log(`❌ Unhandled Rejection: ${err.message}`);

});