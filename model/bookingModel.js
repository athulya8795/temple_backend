const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    star: { type: String, required: true },
    date: { type: Date, required: true },
    vazhipad: { type: String, required: true },
    userId: { type: String, required: true },
    status: { type: String, default: "Pending" }
});

const bookings = mongoose.model('bookings', bookingSchema);

module.exports = bookings;
