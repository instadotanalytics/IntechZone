import ServiceEnquiry from '../models/ServiceEnquiry.js';

// Submit service enquiry
export const submitServiceEnquiry = async (req, res) => {
  try {
    console.log('📋 Service enquiry received:', req.body);

    const { fullName, email, phone, company, service, budget, timeline, message } = req.body;

    // Validation
    if (!fullName || !email || !phone || !service || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields',
      });
    }

    // Get service category
    let serviceCategory = '';
    const developmentServices = ['Web Development', 'App Development', 'Software Development', 'UI/UX Design', 'Digital Marketing', 'Graphic Design'];
    const infrastructureServices = ['Cloud Solutions', 'Network Setup', 'Hardware Support', 'Data Backup', 'AMC Services', 'IT Outsourcing'];
    
    if (developmentServices.includes(service)) serviceCategory = 'Development';
    else if (infrastructureServices.includes(service)) serviceCategory = 'Infrastructure';
    else serviceCategory = 'Consulting & Analytics';

    const enquiry = new ServiceEnquiry({
      fullName,
      email,
      phone,
      company: company || '',
      service,
      serviceCategory,
      budget: budget || 'Not sure',
      timeline: timeline || 'Just exploring',
      message,
      status: 'new',
    });

    await enquiry.save();
    console.log('✅ Enquiry saved:', enquiry._id);

    return res.status(200).json({
      success: true,
      message: 'Enquiry submitted successfully! We will contact you soon.',
      data: enquiry,
    });
  } catch (error) {
    console.error('❌ Enquiry error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error, please try again',
    });
  }
};

// Get all enquiries
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await ServiceEnquiry.find().sort({ createdAt: -1 });
    const total = await ServiceEnquiry.countDocuments();
    const newCount = await ServiceEnquiry.countDocuments({ status: 'new' });

    return res.status(200).json({
      success: true,
      enquiries,
      total,
      counts: { new: newCount, total }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get enquiry stats
export const getEnquiryStats = async (req, res) => {
  try {
    const total = await ServiceEnquiry.countDocuments();
    const newCount = await ServiceEnquiry.countDocuments({ status: 'new' });
    const contactedCount = await ServiceEnquiry.countDocuments({ status: 'contacted' });
    const inProgressCount = await ServiceEnquiry.countDocuments({ status: 'in_progress' });
    const completedCount = await ServiceEnquiry.countDocuments({ status: 'completed' });

    const developmentCount = await ServiceEnquiry.countDocuments({ serviceCategory: 'Development' });
    const infrastructureCount = await ServiceEnquiry.countDocuments({ serviceCategory: 'Infrastructure' });
    const consultingCount = await ServiceEnquiry.countDocuments({ serviceCategory: 'Consulting & Analytics' });

    return res.status(200).json({
      success: true,
      stats: { total, new: newCount, contacted: contactedCount, in_progress: inProgressCount, completed: completedCount },
      byCategory: { development: developmentCount, infrastructure: infrastructureCount, consulting: consultingCount }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get enquiry by ID
export const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await ServiceEnquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    return res.status(200).json({ success: true, enquiry });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update enquiry status
export const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const enquiry = await ServiceEnquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    return res.status(200).json({ success: true, enquiry });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete enquiry
export const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await ServiceEnquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    return res.status(200).json({ success: true, message: 'Enquiry deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};