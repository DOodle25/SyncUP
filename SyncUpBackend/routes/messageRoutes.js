const express = require('express');
const Message = require('../models/Message');
const Channel = require('../models/Channel');
const router = express.Router();

// Middleware to verify JWT token
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.userId = decoded.userId;
    next();
  });
};

// Get Messages
router.get('/:channelId/messages', authenticate, async (req, res) => {
  try {
    const messages = await Message.find({ channelId: req.params.channelId }).sort('createdAt');
    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: 'Error retrieving messages' });
  }
});

// Post Message
router.post('/:channelId/messages', authenticate, async (req, res) => {
  const { message } = req.body;
  try {
    const channel = await Channel.findById(req.params.channelId);
    if (!channel) return res.status(404).json({ error: 'Channel not found' });

    const newMessage = new Message({
      channelId: req.params.channelId,
      sender: req.userId,
      message
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ error: 'Error posting message' });
  }
});

module.exports = router;
