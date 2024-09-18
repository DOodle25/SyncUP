const express = require('express');
const { sendRegisterOTP, register, signIn } = require('../controllers/authController.js');

const router = express.Router();

router.post('/register-otp', sendRegisterOTP);
router.post('/register', register);
router.post('/signin', signIn);

module.exports = router;
