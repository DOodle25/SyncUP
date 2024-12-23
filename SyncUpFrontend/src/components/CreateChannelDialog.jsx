import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const CreateChannelDialog = ({
  open,
  onClose,
  newChannelName,
  setNewChannelName,
  inviteEmails,
  setInviteEmails,
  token,
  setChannels,
}) => {
  const handleCreateChannel = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/channels",
        { name: newChannelName, inviteEmails },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setChannels((prev) => [...prev, response.data]);
      setNewChannelName("");
      setInviteEmails([]);
      onClose();
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Channel</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Channel Name"
          type="text"
          fullWidth
          value={newChannelName}
          onChange={(e) => setNewChannelName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreateChannel}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateChannelDialog;
