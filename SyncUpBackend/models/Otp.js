const { Schema, model } =  require('mongoose');

const otpSchema = new Schema({
  // ! Email, OTP, Purpose
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    default: 'register_otp'
  }
}, { 
  timestamps: true,
  expireAfterSeconds: 300 // 5 min
});

const otpModel = model('OTP', otpSchema);
module.exports = otpModel;