const express = require('express');
const router = express.Router();
const { signup, login, forgotPassword } = require('../controllers/authController');
const { validateSignup, validateLogin, validateForgotPassword } = require('../middleware/validate');

//handle user configuration with validation
router.post('/signup', validateSignup, signup);

//handle user registration validation
router.post('/login', validateLogin, login);
//handle user forgot password validation
router.post('/forgot-password', validateForgotPassword, forgotPassword);

module.exports = router;