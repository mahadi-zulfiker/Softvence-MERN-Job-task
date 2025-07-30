// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
  forgotPassword, // Import new functions
  resetPassword,  // Import new functions
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateRegistration, validateLogin } = require('../middleware/validationMiddleware');

router.post('/register', validateRegistration, registerUser);
router.post('/login', validateLogin, loginUser);
router.get('/me', protect, getMe);
router.post('/logout', protect, logoutUser);

// Password Reset Routes
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword); // Use PUT for updating password

module.exports = router;