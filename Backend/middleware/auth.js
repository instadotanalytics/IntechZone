import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const protect = async (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.adminId = decoded.id;
      
      const admin = await Admin.findById(req.adminId).select('-password');
      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized, admin not found',
        });
      }
      req.admin = admin;
      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, invalid token',
      });
    }
  } else {
    console.log('No token provided in headers');
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided',
    });
  }
};