import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, ThemeProvider, createTheme } from "@mui/material";
import ChannelList from "./components/ChannelList";
import MessageDisplay from "./components/MessageDisplay"; 
import MessageInput from "./components/MessageInput";
import CreateChannelDialog from "./components/CreateChannelDialog"; 
import UserInitial from "./components/UserInitial"; 
import SearchBar from "./components/SearchBar";


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
  },
});

const App = () => {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newChannelName, setNewChannelName] = useState("");
  const [addUserEmail, setAddUserEmail] = useState("");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [showChannels, setShowChannels] = useState(true);
  const [openCreateChannelDialog, setOpenCreateChannelDialog] = useState(false);
  const [inviteEmails, setInviteEmails] = useState([]);
  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setName(storedUser?.name);
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      setUser(storedUser);
    }
    setAddUserEmail(storedUser.email)
  }, []);

  useEffect(() => {
    const fetchChannels = async () => {
      if (!token) return;
  
      try {
        const response = await axios.get("http://localhost:5000/api/channels", {
          headers: { Authorization: `Bearer ${token}` },
          params: { userId: user?._id },
        });
        setChannels(response.data);
      } catch (error) {
        console.error("Error fetching channels:", error);
  
        if (error.response && error.response.status === 401) {
          // Clear token and user from local storage
          localStorage.removeItem("token");
          localStorage.removeItem("user");
  
          window.location.reload();
        }
      }
    };
  
    fetchChannels();
  }, [token, user]);
  
  // useEffect(() => {
  //   let interval;
  //   if (selectedChannel && token) {
  //     const fetchMessages = async () => {
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:5000/api/channels/${selectedChannel}/messages`,
  //           {
  //             headers: { Authorization: `Bearer ${token}` },
  //           }
  //         );
  //         setMessages(response.data);
  //       } catch (error) {
  //         console.error("Error fetching messages:", error);
  //       }
  //     };

  //     fetchMessages();
  //     interval = setInterval(fetchMessages, 5000); //! Poll every 5 seconds
  //   }
  // }, [selectedChannel, token]);

  useEffect(() => {
    let interval;
    if (selectedChannel && token) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/channels/${selectedChannel}/messages`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };  
      fetchMessages(); // Fetch messages immediately
      interval = setInterval(fetchMessages, 5000); // Poll every 5 seconds
    }
  
    // Cleanup interval on component unmount or dependency change
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [selectedChannel, token]);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Left Sidebar for Channels */}

        <ChannelList
          token={token}
          addUserEmail={addUserEmail}
          channels={channels}
          setSelectedChannel={setSelectedChannel}
          showChannels={showChannels}
          setShowChannels={setShowChannels}
          handleCreateChannelDialogOpen={() => setOpenCreateChannelDialog(true)}
        />

        {/* Main Chat Window */}
        <Box
          sx={{
            overflow: "hidden", 
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            paddingTop: "42px",
            paddingLeft: "calc(20% + 50px);",
          }}
        >
          <MessageDisplay
            messages={messages}
            selectedChannel={selectedChannel}
            channels={channels}
            name={name}
          />
          <MessageInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            selectedChannel={selectedChannel}
            token={token}
            setMessages={setMessages}
          />
          {/* {selectedChannel && (
            <UserManagement addUserEmail={addUserEmail} setAddUserEmail={setAddUserEmail} selectedChannel={selectedChannel} token={token} />
          )} */}
        </Box>

        {/* Create Channel Dialog */}
        <CreateChannelDialog
        selectedChannel = {selectedChannel}
          open={openCreateChannelDialog}
          onClose={() => setOpenCreateChannelDialog(false)}
          newChannelName={newChannelName}
          setNewChannelName={setNewChannelName}
          inviteEmails={inviteEmails}
          setInviteEmails={setInviteEmails}
          token={token}
          setChannels={setChannels}
        />

        <Box
          sx={{
            width: { xs: "25px", sm: "3.4vw", md: "3.8vw", lg: "50px" }, 
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#430E44",
            position: "fixed",
            left: 0,
            bottom: 0,
            height: "100%",
          }}
        >
          {/* User Initial Logo */}
          <Box
            sx={{
              width: { xs: "20px", sm: "2.7vw", md: "3vw", lg: "40px" },
              height: { xs: "20px", sm: "2.7vw", md: "3vw", lg: "40px" }, 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10%",
              backgroundColor: "#fff",
              boxShadow: "0 0 2px rgba(0, 0, 0, 0.3)",
              mt: 7,
            }}
          >
            <Typography variant="body1" color="textSecondary">
              H
            </Typography>
          </Box>

          <Box
            sx={{
              width: { xs: "20px", sm: "2.7vw", md: "3vw", lg: "40px" }, 
              height: { xs: "20px", sm: "2.7vw", md: "3vw", lg: "40px" }, 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10%",
              backgroundColor: "#fff",
              boxShadow: "0 0 2px rgba(0, 0, 0, 0.3)",
              mb: 2,
            }}
          >
            <Typography variant="body1" color="textSecondary">
              {name ? name.charAt(0).toUpperCase() : "U"}
            </Typography>
          </Box>
        </Box>

        {/* Fixed Top Search Bar */}
        <SearchBar
          messages={messages}
          selectedChannel={selectedChannel}
          channels={channels}
          name={name}
          setSelectedChannel={setSelectedChannel}
        />
      </Box>
    </ThemeProvider>
  );
};

export default App;