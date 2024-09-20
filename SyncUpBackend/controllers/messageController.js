const Message = require('../models/Message');
const Channel = require('../models/Channel');
const User = require('../models/User');

//! Get:messeages for a channel
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ channelId: req.params.channelId }).sort('createdAt');
    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: 'Error retrieving messages' });
  }
};

//! Post:message to a channel
const postMessage = async (req, res) => {
  const { message } = req.body;
  try {
    const channel = await Channel.findById(req.params.channelId);
    if (!channel) return res.status(404).json({ error: 'Channel not found' });
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const newMessage = new Message({
      
      channelId: req.params.channelId,
      senderid: req.userId,
      sender: user.name,
      message,
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ error: 'Error posting message' });
  }
};

//! Post:Add user to a channel
const addUserToChannel = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const channel = await Channel.findById(req.params.channelId);
    if (!channel) return res.status(404).json({ error: 'Channel not found' });

    if (channel.users.includes(user._id)) {
      return res.status(400).json({ error: 'User is already a member of the channel' });
    }

    channel.users.push(user._id);
    await channel.save();

    if (!user.channels.includes(channel._id)) {
      user.channels.push(channel._id);
      await user.save();
    }

    res.status(200).json({ message: 'User added to the channel', channel });
  } catch (error) {
    res.status(400).json({ error: 'Error adding user to channel' });
  }
};

module.exports = {
  getMessages,
  postMessage,
  addUserToChannel,
};
