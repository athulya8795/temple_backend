const mongoose = require('mongoose')

const testimonySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" }
}, { timestamps: true });

const testimonies = mongoose.model("testimonies", testimonySchema);
module.exports = testimonies;