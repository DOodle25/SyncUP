const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Invitation', invitationSchema);
