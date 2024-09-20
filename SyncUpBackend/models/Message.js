const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  // ! ChannelId, Sender, SenderId, Message, createdAt
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
  sender: { type: String, required: true },
  senderid: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
