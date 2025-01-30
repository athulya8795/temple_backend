const Testimony = require('../model/testimonyModel');

// Add Testimony
exports.addTestimony = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Input validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Email validation (simple regex)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // Create new testimony and save
    const newTestimony = new Testimony({ name, email, message });
    await newTestimony.save();

    // Respond with success message
    res.status(200).json({ success: true, message: "Testimony submitted successfully!" });
  } catch (error) {
    console.error('Error during testimony submission:', error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// Get All Testimonies
exports.getTestimonies = async (req, res) => {
  try {
    const allTestimonies = await Testimony.find().sort({ createdAt: -1 });
    res.status(200).json(allTestimonies);
  } catch (error) {
    console.error('Error fetching testimonies:', error);
    res.status(500).json({ success: false, message: "Failed to fetch testimonies", error: error.message });
  }
};