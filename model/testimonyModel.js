const mongoose = require('mongoose')

const testimonySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String, required: true, default: "Pending"
  }
});

const testimonies = mongoose.model("testimonies", testimonySchema);
module.exports = testimonies;