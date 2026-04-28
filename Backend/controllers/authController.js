// controllers/authController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// @desc    Login admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('=================================');
    console.log('Login attempt received:');
    console.log('Email:', email);
    console.log('Password provided:', !!password);
    console.log('=================================');

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      console.log('❌ Admin not found for email:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    console.log('✅ Admin found:', admin.email);
    console.log('Stored password hash length:', admin.password?.length);

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    
    console.log('🔐 Password comparison result:', isMatch ? '✅ MATCH' : '❌ NO MATCH');

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Update last login
    admin.lastLogin = Date.now();
    await admin.save();

    const token = generateToken(admin._id);
    console.log('✅ Login successful, token generated');
    console.log('=================================');

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message,
    });
  }
};

// @desc    Get current admin
export const getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select('-password');
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }
    res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Logout admin
export const logoutAdmin = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

// @desc    Change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.adminId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);
    await admin.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};