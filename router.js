// 1. Import Express
const express = require('express');

// 2. Import Controllers
const userController = require('./controllers/userController');
const bookingController = require('./controllers/bookingController');

// 3. Import Middleware
const jwtmiddleware = require('./middleware/jwtMiddleware');

// 4. Initialize Router
const router = new express.Router();

// 5. Define Routes

// Register User
router.post('/register', userController.register);

// User Login
router.post('/login', userController.login);

// Add Booking (Protected Route)
router.post('/booking', jwtmiddleware, bookingController.addBookingController);

// Get user Booking
router.get('/user-booking',jwtmiddleware,bookingController.getUserVazhipadController)

// 6. Export Router
module.exports = router;
