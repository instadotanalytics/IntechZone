import Admin from '../models/Admin.js';

// @desc    Get all admins
export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    res.status(200).json({
      success: true,
      count: admins.length,
      admins,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get single admin
export const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select('-password');
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

// @desc    Create new admin
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists with this email',
      });
    }

    const admin = new Admin({
      name,
      email,
      password,
      role: role || 'admin',
    });
    
    await admin.save();

    res.status(201).json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
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

// @desc    Update admin
export const updateAdmin = async (req, res) => {
  try {
    const { name, email, role, isActive } = req.body;
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    if (name) admin.name = name;
    if (email) admin.email = email;
    if (role) admin.role = role;
    if (isActive !== undefined) admin.isActive = isActive;
    admin.updatedAt = Date.now();

    await admin.save();

    res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
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

// @desc    Delete admin
export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    if (admin._id.toString() === req.admin.id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account',
      });
    }

    await admin.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Admin deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Update profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const admin = await Admin.findById(req.adminId);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }
    
    if (name) admin.name = name;
    if (email) admin.email = email;
    
    await admin.save();
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
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