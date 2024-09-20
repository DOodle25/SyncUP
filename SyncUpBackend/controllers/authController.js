const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const otpGenerator = require('otp-generator');
const OTP = require('../models/Otp');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Dipen123';
// ! NodeMailer Credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'emailhelper468@gmail.com',
    pass: 'jadf dtgc uths mhqt',
  },
});

let otpTimer;

//! POST:Send OTP for Registration
const sendRegisterOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: 'Email field is required', success: false });
    if (!validator.isEmail(email)) return res.status(400).json({ message: 'Invalid email format', success: false });

    const isEmailAlreadyReg = await User.findOne({ email });

    if (isEmailAlreadyReg) return res.status(400).json({ message: `User with email ${email} is already registered`, success: false });

    const otp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    const hashedOTP = await bcrypt.hash(otp, 12);
    const newOTP = await OTP.create({ email, otp: hashedOTP });
    clearTimeout(otpTimer);

    // Set a new timer to send OTP
    otpTimer = setTimeout(async () => {
      try {
        const mailOptions = {
          from: 'emailhelper468@gmail.com',
          to: email,
          subject: 'Your OTP Code',
          html: `<p>Your OTP code is <b>${otp}</b> and will expire in 5 minutes.</p>`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        
        res.status(200).json({ message: 'OTP sent successfully', success: true });
      } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Error sending OTP', success: false });
      }
    }, 10000); // 10 sec

  } catch (error) {
    console.error('Error in sendRegisterOTP:', error);
    res.status(500).json({ message: 'Error in sendRegisterOTP', error, success: false });
  }
};

//! POST:Register User
const register = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;

    if (!name || !email || !password || !otp) return res.status(400).json({ message: 'All fields are required (name, email, password, otp)', success: false });
    if (!validator.isEmail(email)) return res.status(400).json({ message: 'Invalid email format', success: false });

    const isEmailAlreadyReg = await User.findOne({ email });
    if (isEmailAlreadyReg) return res.status(400).json({ message: `User with email ${email} is already registered`, success: false });

    const otpHolder = await OTP.find({ email });
    if (otpHolder.length === 0) return res.status(400).json({ message: 'OTP has expired or is invalid', success: false });

    // Get the most recent OTP for registration
    const registerOtps = otpHolder.filter(o => o.purpose === 'register_otp');
    const lastOtpRecord = registerOtps[registerOtps.length - 1];

    if (!lastOtpRecord) return res.status(400).json({ message: 'No OTP found for registration', success: false });

    const isValidOTP = await bcrypt.compare(otp, lastOtpRecord.otp);
    if (!isValidOTP) return res.status(400).json({ message: 'Invalid OTP', success: false });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    await OTP.deleteMany({ email });

    res.status(200).json({ message: 'Registration successful', success: true, user: newUser });

  } catch (error) {
    res.status(500).json({ message: 'Error in register', error, success: false });
  }
};

//! POST:Sign-in User
const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: {
      _id: user._id,
      name: user.name,
      email: user.email
    }, channels: user.channels });
  } catch (error) {
    res.status(400).json({ error: 'Error logging in' });
  }
};

module.exports = {
  sendRegisterOTP,
  register,
  signIn,
};
