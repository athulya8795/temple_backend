const bookings = require('../model/bookingModel');

// booking
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
    const searchKey = req.query.search
    console.log(searchKey);
    const userId = req.payload
    // const query = {
    //     vazhipad: {         
    //         $regex: searchKey, $options: "i"
    //     }
    // }
    try {
        const allVazipad = await bookings.find({ userId })
        res.status(200).json(allVazipad)
    } catch (error) {
        res.status(401).json(error)
    }
}

// remove user vazhipad
exports.removeUserVazhipadController = async (req, res) => {
    const { id } = req.params
    try {
        await bookings.findByIdAndDelete({ _id: id })
        res.status(200).json('deleted succcessfully')
    } catch (error) {
        res.status(401).json(error)
    }
}

// update user vazhipad
exports.updateUserVazhipadController = async (req, res) => {
    const { id } = req.params
    const userId = req.payload

    const { name, star, vazhipad, date } = req.body
    try {
        const existingBooking = await bookings.findByIdAndUpdate({ _id: id }, {
            name,
            star,
            vazhipad,
            date
        }, { new: true })
        await existingBooking.save()
        res.status(200).json(existingBooking)
    } catch (error) {
        res.status(401).json(error)
    }
}

// get all vazhipad
exports.getAllBookingController = async (req, res) => {
    try {
        const allBookings = await bookings.find()
        res.status(200).json(allBookings)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.updateBookingStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const booking = await bookings.findById(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        booking.status = status;
        await booking.save();
        res.status(200).json({ message: "Booking status updated successfully", booking });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};