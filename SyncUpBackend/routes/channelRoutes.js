const express = require('express');
const Channel = require('../models/Channel');
const User = require('../models/User');
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

// Get Channels
router.get('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('channels');
    res.json(user.channels);
  } catch (error) {
    res.status(400).json({ error: 'Error retrieving channels' });
  }
});

// Create Channel
router.post('/', authenticate, async (req, res) => {
  const { name } = req.body;
  try {
    const channel = new Channel({ name });
    await channel.save();
    await User.findByIdAndUpdate(req.userId, { $push: { channels: channel._id } });
    res.status(201).json(channel);
  } catch (error) {
    res.status(400).json({ error: 'Error creating channel' });
  }
});

module.exports = router;
