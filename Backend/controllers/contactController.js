import Contact from '../models/Contact.js';

// Submit contact form
export const submitContactForm = async (req, res) => {
  try {
    console.log('📧 Contact form received:', req.body);

    const { name, email, phone, service, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required',
      });
    }

    const contact = new Contact({
      name,
      email,
      phone: phone || '',
      service: service || 'General Inquiry',
      message,
      status: 'new',
    });

    await contact.save();
    console.log('✅ Contact saved:', contact._id);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.',
      data: contact,
    });
  } catch (error) {
    console.error('❌ Contact error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error, please try again',
    });
  }
};

// Get all contact messages
export const getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    const total = await Contact.countDocuments();
    const newCount = await Contact.countDocuments({ status: 'new' });

    return res.status(200).json({
      success: true,
      messages,
      total,
      counts: { new: newCount, total }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get contact stats
export const getContactStats = async (req, res) => {
  try {
    const total = await Contact.countDocuments();
    const newCount = await Contact.countDocuments({ status: 'new' });
    const readCount = await Contact.countDocuments({ status: 'read' });
    const repliedCount = await Contact.countDocuments({ status: 'replied' });

    return res.status(200).json({
      success: true,
      stats: { total, new: newCount, read: readCount, replied: repliedCount }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get message by ID
export const getContactMessageById = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    return res.status(200).json({ success: true, message });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update message status
export const updateMessageStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    return res.status(200).json({ success: true, message });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete message
export const deleteContactMessage = async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    return res.status(200).json({ success: true, message: 'Message deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// controllers/contactController.js - Add this function
export const getContactInfo = async (req, res) => {
  try {
    const contactInfo = {
      address: '123 Tech Park, Bangalore, Karnataka, India - 560001',
      phone: ['+91-98765-43210', '+91-80-1234-5678'],
      email: ['info@intechzone.in', 'support@intechzone.in'],
      workingHours: {
        weekdays: 'Mon-Fri: 9:00 AM - 6:00 PM',
        saturday: 'Sat: 10:00 AM - 2:00 PM',
        sunday: 'Sunday Closed'
      },
      socialLinks: {
        twitter: 'https://twitter.com/intechzone',
        linkedin: 'https://linkedin.com/company/intechzone',
        github: 'https://github.com/intechzone',
        instagram: 'https://instagram.com/intechzone'
      },
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8e6f6b8a8c2a4f!2sBangalore!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
    };
    
    res.status(200).json({
      success: true,
      data: contactInfo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};