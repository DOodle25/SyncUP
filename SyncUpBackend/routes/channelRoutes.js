const express = require('express');
const Channel = require('../models/Channel');
const User = require('../models/User');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

const router = express.Router();

const { getMessages, postMessage, addUserToChannel } = require('../controllers/messageController');

const JWT_SECRET  = 'Dipen123';
//! Middleware to verify JWT token
// TODO:Combine with the on in messageRoutes.js declare globally for all protected requests
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ error: 'No token provided' });
  }

  // Extract the token from 'Bearer <token>'
  const tokenPart = token.split(' ')[1];

  if (!tokenPart) {
    console.log('Token missing after Bearer');
    return res.status(401).json({ error: 'Token missing' });
  }

  jwt.verify(tokenPart, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Token verification failed:', err.message);
      return res.status(401).json({ error: 'Invalid token' });
    }

    console.log('Token verified successfully, userId:', decoded.userId);
    req.userId = decoded.userId;
    next();
  });
};


//! GET:Get Channels
router.get('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('channels');
    res.json(user.channels);
  } catch (error) {
    res.status(400).json({ error: 'Error retrieving channels' });
  }
});

//! POST:Create Channel
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


router.get('/:channelId/messages', authenticate, getMessages);
router.post('/:channelId/messages', authenticate, postMessage);
router.post('/:channelId/add-user', authenticate, addUserToChannel);
module.exports = router;
