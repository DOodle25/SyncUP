// controllers/invitationController.js
const Invitation = require("../models/Invitation");
const Channel = require("../models/Channel");
const User = require("../models/User");

// Send an invitation
exports.sendInvitation = async (req, res) => {
  const { invitedUserEmail } = req.body;
  const { channelId } = req.params;
  const invitedBy = req.userId; 

  try {
    const channel = await Channel.findById(channelId);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found." });
    }

    const invitation = new Invitation({
      channelId,
      invitedBy,
      invitedUserEmail,
      channelName: channel.name, 
    });

    await invitation.save();

    res.status(200).json({ message: "Invitation sent successfully." });
  } catch (error) {
    console.error("Error sending invitation:", error);
    res.status(500).json({ message: "Error sending invitation." });
  }
};

// Get pending invitations
exports.getPendingInvitations = async (req, res) => {
  console.log("invitedUserEmail");
  const { email: invitedUserEmail } = req.query;
  console.log("Email:", invitedUserEmail); 
  try {
    const invitations = await Invitation.find({
      invitedUserEmail,
      status: "pending",
    }).populate("channelId", "name");

    res.status(200).json(invitations);
  } catch (error) {
    console.error("Error fetching invitations:", error);
    res.status(500).json({ message: "Error fetching invitations." });
  }
};

exports.respondToInvitation = async (req, res) => {
  const { invitationId } = req.params;
  const action = req.url.endsWith("accept") ? "accepted" : "declined"; 
  try {
    const invitation = await Invitation.findById(invitationId);

    if (!invitation || invitation.status !== "pending") {
      return res.status(400).json({ message: "Invalid invitation." });
    }

    invitation.status = action;
    await invitation.save();

    if (action === "accepted") {
      const user = await User.findOne({ email: invitation.invitedUserEmail });
      
      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }

      await Promise.all([
        Channel.findByIdAndUpdate(invitation.channelId, { $addToSet: { users: user._id } }),
        User.findByIdAndUpdate(user._id, { $addToSet: { channels: invitation.channelId } })
      ]);
    }

    res.status(200).json({ message: `Invitation ${action} successfully.` });
  } catch (error) {
    console.error("Error responding to invitation:", error);
    res.status(500).json({ message: "Error responding to invitation." });
  }
};
