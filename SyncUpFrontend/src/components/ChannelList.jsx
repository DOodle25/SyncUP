import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Collapse,
  ListItem,
  ListItemText,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import axios from "axios";

const ChannelList = ({
  addUserEmail,
  channels,
  selectedChannel,
  setSelectedChannel,
  showChannels,
  setShowChannels,
  handleCreateChannelDialogOpen,
  token,
}) => {
  const [invitations, setInvitations] = useState([]);
  const [selectedInvitation, setSelectedInvitation] = useState(null);
  const [showInvitations, setShowInvitations] = useState(true);

  
  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/channels/invitations",
          {
            headers: { Authorization: `Bearer ${token}` }, 
            params: { email: addUserEmail }, 
          }
        );
        setInvitations(response.data || []); 
      } catch (error) {
        console.error("Error fetching invitations:", error);
        setInvitations([]); 
      }
    };
    fetchInvitations();
  }, [token]);

  const handleAcceptInvite = async (invitationId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/channels/invitations/${invitationId}/accept`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setInvitations(invitations.filter((inv) => inv._id !== invitationId)); 
      setSelectedInvitation(null);
    } catch (error) {
      console.error("Error accepting invitation:", error);
    }
  };

  const handleDeclineInvite = async (invitationId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/channels/invitations/${invitationId}/decline`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setInvitations(invitations.filter((inv) => inv._id !== invitationId));
      setSelectedInvitation(null);
    } catch (error) {
      console.error("Error declining invitation:", error);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        width: "20%",
        height: "100%",
        paddingTop: "42px",
        marginLeft: {
          xs: "calc(25px)",
          sm: "calc(3.4vw)", 
          md: "calc(3.8vw)", 
          lg: "calc(50px)", 
        },
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#5B2B5D",
        borderRight: "1px solid #ccc",
        color: "#fff",
      }}
    >
      {/* Channel List */}
      <Box
        sx={{
          p: 2,
          pl: 0.2,
          height:"auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button
          onClick={() => setShowChannels(!showChannels)}
          startIcon={showChannels ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          sx={{
            display: "flex",
            justifyContent: "left",
            backgroundColor: "transparent",
            color: "#CEB9D2",
            fontSize: { xs: "0.5rem", sm: "0.7rem", md: "1rem", lg: "1.2rem" },
            textTransform: "none",
          }}
        >
          Channels
        </Button>
        <Collapse in={showChannels}>
          {channels.map((channel) => (
            <ListItem
              button
              key={channel._id}
              onClick={() => setSelectedChannel(channel._id)}
              sx={{
                cursor: "pointer",
                paddingLeft: "1.5rem",
                borderRadius: "10px",
                color: selectedChannel === channel._id ? "#39063A" : "#CEB9D2",
                backgroundColor:
                  selectedChannel === channel._id ? "#CEB9D2" : "transparent",
                "&:hover": { backgroundColor: "#CEB9D2", color: "#39063A" },
              }}
            >
              <Typography
                      variant="body2"
                      sx={{
                        fontSize: {
                          xs: "0.5rem",
                          sm: "0.7rem",
                          md: "1rem",
                          lg: "1.2rem",
                        },
                      }}
                    >
                      {channel.name}
                    </Typography>
            </ListItem>
          ))}
          <ListItem button onClick={handleCreateChannelDialogOpen}>
            <ListItemText
              primary={
                <Typography
                  sx={{
                    color: "#CEB9D2",
                    fontSize: {
                      xs: "0.5rem",
                      sm: "0.7rem",
                      md: "1rem",
                      lg: "1.2rem",
                    },
                  }}
                >
                  + Add Channel
                </Typography>
              }
            />
          </ListItem>
        </Collapse>
      </Box>

      {/* Invitation List */}
      <Box sx={{ }}>
        <Button
          onClick={() => setShowInvitations(!showInvitations)}
          startIcon={showInvitations ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          sx={{
            display: "flex",
            justifyContent: "left",
            backgroundColor: "transparent",
            color: "#CEB9D2",
            fontSize: { xs: "0.5rem", sm: "0.7rem", md: "1rem", lg: "1.2rem" },
            textTransform: "none",
          }}
        >
          Invitations
        </Button>
        <Collapse in={showInvitations}>
          {invitations.map((invitation) => (
            <ListItem
              button
              key={invitation._id}
              onClick={() => setSelectedInvitation(invitation)}
              sx={{
                cursor: "pointer",
                paddingLeft: "1.5rem",
                borderRadius: "10px",
                color: "#CEB9D2",
                "&:hover": { backgroundColor: "#CEB9D2", color: "#39063A" },
              }}
            >
              {/* <ListItemText 
              primary={invitation.channelId.name} />{" "} */}
              {/* Updated here */}
              <Typography
                variant="body2"
                sx={{
                  fontSize: {
                    xs: "0.5rem",
                    sm: "0.7rem",
                    md: "1rem",
                    lg: "1.2rem",
                  },
                }}
              >
                {invitation.channelId.name}
              </Typography>
            </ListItem>
          ))}
        </Collapse>
      </Box>

      {/* Invitation Dialog */}
      {selectedInvitation && (
        <Dialog
          open={!!selectedInvitation}
          onClose={() => setSelectedInvitation(null)}
        >
          <DialogTitle>Invitation to Join</DialogTitle>
          <DialogContent>
            <Typography>
              Do you want to join {selectedInvitation.channelName}?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleAcceptInvite(selectedInvitation._id)}
              color="primary"
            >
              Accept
            </Button>
            <Button
              onClick={() => handleDeclineInvite(selectedInvitation._id)}
              color="primary"
            >
              Decline
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ChannelList;
