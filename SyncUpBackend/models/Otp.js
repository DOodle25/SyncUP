const { Schema, model } =  require('mongoose');

const otpSchema = new Schema({
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
    default: 'register_otp' // Purpose can be expanded for different types (register, reset, etc.)
  }
}, { 
  timestamps: true,
  expireAfterSeconds: 300 // 5 minutes expiry for OTP
});

const otpModel = model('OTP', otpSchema);
module.exports = otpModel;