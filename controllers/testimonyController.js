const testimonies = require('../model/testimonyModel');
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

// get all testimony in admin
exports.getTestimonyController = async (req, res) => {
  try {
      const allTestimony = await testimonies.find()
      res.status(200).json(allTestimony)
  } catch (error) {
      res.status(401).json(error)
  }
}

// update the testimony
exports.updateFeedbackStatusController = async (req, res) => {
  console.log("Inside updateFeedbackStatusController");
  try {
      // Get feedback ID from URL parameters
      const { id } = req.params;
      const { status } = req.body; // Get status from request body instead of query

      // Check if feedback exists
      const existingFeedback = await testimonies.findById(id);
      if (!existingFeedback) {
          return res.status(404).json({ message: "Feedback not found" });
      }
      // Update feedback status
      existingFeedback.status = status;
      await existingFeedback.save();
      res.status(200).json({ message: "Feedback status updated successfully", feedback: existingFeedback });
  } catch (error) {
      console.error("Error updating feedback status:", error);
      res.status(500).json({ message: "Internal Server Error", error });
  }
};