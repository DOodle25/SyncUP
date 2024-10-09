const Channel = require('../models/Channel');
const Invitation = require('../models/Invitation');

// Create a new channel and send invitations
exports.createChannel = async (req, res) => {
  try {
    const { name, emails } = req.body;
    const channel = new Channel({ name });
    await channel.save();

    // Send invitations
    for (const email of emails) {
      const invitation = new Invitation({ email, channel: channel._id });
      await invitation.save();
    }

    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({ message: 'Error creating channel' });
  }
};

// Accept an invitation
exports.acceptInvitation = async (req, res) => {
  try {
    const invitation = await Invitation.findById(req.params.id);
    if (!invitation) {
      return res.status(404).json({ message: 'Invitation not found' });
    }

    const channel = await Channel.findById(invitation.channel);
    channel.users.push(invitation.user);
    await channel.save();

    // Remove invitation
    await Invitation.deleteOne({ _id: invitation._id });

    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ message: 'Error accepting invitation' });
  }
};
