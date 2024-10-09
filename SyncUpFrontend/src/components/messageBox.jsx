import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  TextField,
  ListItem,
  ListItemText,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddIcon from "@mui/icons-material/Add";
const theme = createTheme({
  palette: {
    primary: {
      main: "#611F69",
    },
    secondary: {
      main: "#fff",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: 20,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#d3d3d3",
          color: "#000",
        },
      },
    },
  },
});
const ChatBox = ({
    channels,
    selectedChannel,
    messages,
    newMessage,
    showChannels,
    searchTerm,
    newChannelName,
    addUserEmail,
    openCreateChannelDialog,
    inviteEmails,
    handleToggleChannels,
    handleSelectChannel,
    handleSendMessage,
    handleAddUserToChannel,
    handleCreateChannelDialogOpen,
    handleCreateChannelDialogClose,
    handleCreateChannel,
    handleInviteEmailsChange,
    handleInviteUsers,
  }) => {
  <>
    {/* Main Chat Window */}
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        paddingTop: "42px",
        paddingLeft: "calc(20% + 50px);",
      }}
    >
      <Box sx={{ flexGrow: 1, p: 2, display: "flex", flexDirection: "column" }}>
        {/* Messages Display */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            borderBottom: "1px solid #ccc",
          }}
        >
          {selectedChannel ? (
            <>
              <Typography variant="h6" gutterBottom>
                {channels.find((ch) => ch._id === selectedChannel)?.name ||
                  "Channel Messages"}
              </Typography>
              {messages.map((msg) => (
                <Box key={msg._id} sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    {msg.sender}:
                  </Typography>
                  <Typography variant="body1">{msg.message}</Typography>
                </Box>
              ))}
            </>
          ) : (
            <Typography variant="body1">
              Select a channel to view messages
            </Typography>
          )}
        </Box>

        {/* New Message Input */}
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button
            onClick={handleSendMessage}
            sx={{
              mt: 2,
              alignSelf: "flex-end",
              width: "100px",
              backgroundColor: "#611F69",
              color: "#fff",
              "&:hover": { backgroundColor: "#4f1557" },
            }}
          >
            Send
          </Button>
        </Box>
        {selectedChannel && (
          <Box sx={{ p: 2, borderTop: "1px solid #ccc" }}>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Add user by email..."
              value={addUserEmail}
              onChange={(e) => setAddUserEmail(e.target.value)}
              sx={{ mb: 1 }}
            />
            <Button
              onClick={handleAddUserToChannel}
              variant="contained"
              color="primary"
            >
              Add User
            </Button>
          </Box>
        )}
      </Box>
    </Box>

    {/* Create Channel Dialog */}
    <Dialog open={openCreateChannelDialog}>
      <DialogTitle>Create Channel</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Channel Name"
          value={newChannelName}
          onChange={(e) => setNewChannelName(e.target.value)}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Invite Users (comma-separated emails)"
          value={inviteEmails.join(",")}
          onChange={handleInviteEmailsChange}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCreateChannelDialogClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreateChannel} color="primary">
          Create
        </Button>
        <Button onClick={handleInviteUsers} color="primary">
          Invite Users
        </Button>
      </DialogActions>
    </Dialog>
  </>;
};

export default ChatBox;