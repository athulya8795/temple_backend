// 1. Import Express
const express = require('express');

// 2. Import Controllers
const userController = require('./controllers/userController');
const bookingController = require('./controllers/bookingController');
const testimonyController = require('./controllers/testimonyController')

// 3. Import Middleware
const jwtmiddleware = require('./middleware/jwtMiddleware');

// import multer
const multerConfig = require('./middleware/multerMiddleware')

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
router.get('/user-booking', jwtmiddleware, bookingController.getUserVazhipadController)

// remove user vazhipad
router.delete('/remove-uservazipad/:id', jwtmiddleware, bookingController.removeUserVazhipadController)

// update user vazhipad
router.put('/update-uservazipad/:id', jwtmiddleware, bookingController.updateUserVazhipadController)

// update user profile
router.put('/update-userprofile', jwtmiddleware, multerConfig.single("profileImg"), userController.updateUserProfileController)

// add testimony
router.post("/add", testimonyController.addTestimony);

// display the testimony
router.get("/all", testimonyController.getTestimonies);

// get all bookings - admin side
router.get('/all-bookings', bookingController.getAllBookingController)

// get all testimony - admin side
router.get('/all-testimony', testimonyController.getTestimonyController)

// get all users - admin side
router.get('/all-users', userController.getUserController)

// admin side - booking
router.put('/update-status/:id', bookingController.updateBookingStatus);

// admin-side - testimony
router.put('/update-testimony/:id', testimonyController.updateFeedbackStatusController);

// 6. Export Router
module.exports = router;