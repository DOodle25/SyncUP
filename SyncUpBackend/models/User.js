const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // ! Name, email, password, channels
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  channels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
