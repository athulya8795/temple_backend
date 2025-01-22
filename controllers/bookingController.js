const bookings = require('../model/bookingModel');

exports.addBookingController = async (req, res) => {
    try {
        const { name, star, date, vazhipad } = req.body;
        const userId = req.payload; // Assuming `req.payload` contains userId from token

        const newBooking = new bookings({
            userId,
            name,
            star,
            date,
            vazhipad,
        });

        await newBooking.save();
        res.status(200).json({ success: true, booking: newBooking });
    } catch (error) {
        console.error("Error adding booking:", error);
        res.status(500).json({ success: false, message: "Something went wrong." });
    }
};

// get user vazhipad
 exports.getUserVazhipadController = async (req, res) => {
    const userId = req.payload
    try {
        const allVazipad = await bookings.find({ userId })
        res.status(200).json(allVazipad)
    } catch (error) {
        res.status(401).json(error)
    }
}