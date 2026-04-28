import Admin from '../models/Admin.js';
import Contact from '../models/Contact.js';
import ServiceEnquiry from '../models/ServiceEnquiry.js';
import Project from '../models/Project.js';
import Visitor from '../models/Visitor.js';

// Helper function to get time ago
const getTimeAgo = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  return new Date(date).toLocaleDateString();
};

// Helper function to parse time ago string to timestamp
const parseTimeAgo = (timeAgo) => {
  const now = Date.now();
  if (timeAgo === 'Just now') return now;
  
  const minutes = timeAgo.match(/(\d+) min/);
  if (minutes) return now - (parseInt(minutes[1]) * 60000);
  
  const hours = timeAgo.match(/(\d+) hour/);
  if (hours) return now - (parseInt(hours[1]) * 3600000);
  
  const days = timeAgo.match(/(\d+) day/);
  if (days) return now - (parseInt(days[1]) * 86400000);
  
  return 0;
};

// @desc    Get dashboard stats with real-time data (NO DUMMY DATA)
export const getDashboardStats = async (req, res) => {
  try {
    // Real counts from database
    const totalAdmins = await Admin.countDocuments();
    const totalContacts = await Contact.countDocuments();
    const totalEnquiries = await ServiceEnquiry.countDocuments();
    const totalProjects = await Project.countDocuments(); // Real projects only
    const totalVisitors = await Visitor.countDocuments(); // Real visitors only
    
    // Today's date (start of day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Count today's contacts and enquiries
    const todayContacts = await Contact.countDocuments({
      createdAt: { $gte: today }
    });
    const todayEnquiries = await ServiceEnquiry.countDocuments({
      createdAt: { $gte: today }
    });
    
    // Count today's visitors from Visitor model
    const todayVisitors = await Visitor.countDocuments({
      visitedAt: { $gte: today }
    });
    
    // Calculate last month date
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    // Calculate trends (only if data exists)
    let visitorsTrend = 0;
    let projectsTrend = 0;
    
    if (totalVisitors > 0) {
      const lastMonthVisitors = await Visitor.countDocuments({
        visitedAt: { $gte: lastMonth }
      });
      visitorsTrend = ((totalVisitors - lastMonthVisitors) / (lastMonthVisitors || 1)) * 100;
    }
    
    if (totalProjects > 0) {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      const recentProjects = await Project.countDocuments({
        completionDate: { $gte: sixMonthsAgo }
      });
      const olderProjects = totalProjects - recentProjects;
      projectsTrend = ((recentProjects - olderProjects) / (olderProjects || 1)) * 100;
    }
    
    // Weekly visitor data for chart (last 7 days - real data only)
    const weeklyData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      
      const count = await Visitor.countDocuments({
        visitedAt: { $gte: date, $lt: nextDate }
      });
      
      const contactCount = await Contact.countDocuments({
        createdAt: { $gte: date, $lt: nextDate }
      });
      
      weeklyData.push({
        day: date.toLocaleDateString('en-IN', { weekday: 'short' }),
        visitors: count,
        contacts: contactCount,
        date: date.toISOString().split('T')[0]
      });
    }
    
    // Get current admin
    const currentAdmin = await Admin.findById(req.adminId).select('-password');
    
    res.status(200).json({
      success: true,
      stats: {
        totalVisitors,
        totalProjects,
        totalAdmins,
        totalContacts,
        totalEnquiries,
        visitorsTrend: visitorsTrend.toFixed(1),
        projectsTrend: projectsTrend.toFixed(1),
        todayVisitors: todayVisitors || (todayContacts + todayEnquiries),
        todayContacts,
        todayEnquiries,
      },
      weeklyData,
      currentAdmin,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message,
    });
  }
};

// @desc    Get recent activity (only from real data)
export const getRecentActivity = async (req, res) => {
  try {
    // Get recent contacts
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email message status createdAt');
    
    // Get recent enquiries
    const recentEnquiries = await ServiceEnquiry.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('fullName email service status createdAt');
    
    // Combine and format activities
    const activities = [];
    
    recentContacts.forEach(contact => {
      activities.push({
        id: contact._id,
        action: `New message from ${contact.name}`,
        user: contact.email,
        time: getTimeAgo(contact.createdAt),
        type: 'contact',
        status: contact.status
      });
    });
    
    recentEnquiries.forEach(enquiry => {
      activities.push({
        id: enquiry._id,
        action: `New enquiry for ${enquiry.service}`,
        user: enquiry.fullName,
        time: getTimeAgo(enquiry.createdAt),
        type: 'enquiry',
        status: enquiry.status
      });
    });
    
    // Sort by time (most recent first)
    activities.sort((a, b) => {
      const timeA = parseTimeAgo(a.time);
      const timeB = parseTimeAgo(b.time);
      return timeB - timeA;
    });
    
    res.status(200).json({
      success: true,
      activities: activities.slice(0, 10),
    });
  } catch (error) {
    console.error('Recent activity error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get weekly visitor data for chart
export const getWeeklyVisitorData = async (req, res) => {
  try {
    const weeklyData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      
      const count = await Visitor.countDocuments({
        visitedAt: { $gte: date, $lt: nextDate }
      });
      
      weeklyData.push({
        day: date.toLocaleDateString('en-IN', { weekday: 'short' }),
        visitors: count,
        date: date.toISOString().split('T')[0]
      });
    }
    
    res.status(200).json({
      success: true,
      data: weeklyData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Track visitor (call this from frontend)
export const trackVisitor = async (req, res) => {
  try {
    const { ip, email, page, userAgent } = req.body;
    
    const visitor = new Visitor({
      ip: ip || req.ip,
      email: email || '',
      page: page || req.headers.referer || '/',
      userAgent: userAgent || req.headers['user-agent'],
    });
    
    await visitor.save();
    
    res.status(200).json({
      success: true,
      message: 'Visitor tracked',
    });
  } catch (error) {
    console.error('Visitor tracking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Update profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email, currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.adminId);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }
    
    if (name) admin.name = name;
    if (email) admin.email = email;
    
    if (currentPassword && newPassword) {
      const isMatch = await admin.matchPassword(currentPassword);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Current password is incorrect',
        });
      }
      admin.password = newPassword;
    }
    
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