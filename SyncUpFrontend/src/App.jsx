// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   List,
//   ListItem,
//   ListItemText,
//   Collapse,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#611F69",
//     },
//     secondary: {
//       main: "#fff",
//     },
//     background: {
//       default: "#f5f5f5",
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         contained: {
//           borderRadius: 20,
//         },
//       },
//     },
//     MuiDrawer: {
//       styleOverrides: {
//         paper: {
//           backgroundColor: "#d3d3d3",
//           color: "#000",
//         },
//       },
//     },
//   },
// });

// const App = () => {
//   const [channels, setChannels] = useState([]);
//   const [selectedChannel, setSelectedChannel] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [newChannelName, setNewChannelName] = useState("");
//   const [addUserEmail, setAddUserEmail] = useState("");
//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);
//   const [name, setName] = useState(null);
//   const [showChannels, setShowChannels] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const handleToggleChannels = () => {
//     setShowChannels(!showChannels);
//   };
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     setName(storedUser.name);
//     if (storedToken) {
//       setToken(storedToken);
//     }
//     if (storedUser) {
//       setUser(storedUser);
//     } else {
//       console.error("Token or user not found");
//     }
//   }, []);

//   useEffect(() => {
//     const fetchChannels = async () => {
//       if (!token) return;

//       try {
//         const response = await axios.get("http://localhost:5000/api/channels", {
//           headers: { Authorization: `Bearer ${token}` },
//           params: { userId: user?._id },
//         });
//         setChannels(response.data);
//       } catch (error) {
//         console.error("Error fetching channels:", error);
//       }
//     };

//     fetchChannels();
//   }, [token, user]);

//   useEffect(() => {
//     if (selectedChannel && token) {
//       const fetchMessages = async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:5000/api/channels/${selectedChannel}/messages`,
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//           setMessages(response.data);
//         } catch (error) {
//           console.error("Error fetching messages:", error);
//         }
//       };

//       fetchMessages();
//     }
//   }, [selectedChannel, token]);

//   const handleSendMessage = async () => {
//     if (newMessage.trim() === "" || !selectedChannel) return;

//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/channels/${selectedChannel}/messages`,
//         { message: newMessage },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setMessages([...messages, response.data]);
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   const handleSelectChannel = (channelId) => {
//     setSelectedChannel(channelId);
//   };

//   const handleCreateChannel = async () => {
//     if (newChannelName.trim() === "") return;

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/channels",
//         { name: newChannelName },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setChannels([...channels, response.data]);
//       setNewChannelName(""); 
//     } catch (error) {
//       console.error("Error creating channel:", error);
//     }
//   };

//   const handleAddUserToChannel = async () => {
//     if (addUserEmail.trim() === "" || !selectedChannel) return;

//     try {
//       await axios.post(
//         `http://localhost:5000/api/channels/${selectedChannel}/add-user`,
//         { email: addUserEmail },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("User added successfully");
//       setAddUserEmail(""); 
//     } catch (error) {
//       console.error("Error adding user to channel:", error);
//       alert("Failed to add user");
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ display: "flex", height: "100vh" }}>
//         {/* Left Sidebar for Channels */}
//         <Box
//           sx={{
//             position: "fixed",
//             width: "20%",
//             height: "100%",
//             paddingTop: "42px",
//             marginLeft: "50px",
//             display: "flex",
//             flexDirection: "column",
//             backgroundColor: "#5B2B5D", 
//             borderRight: "1px solid #ccc",
//             color: "#fff",
//           }}
//         >
//           {/* Channels List */}
//           <Box
//             sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}
//           >
//             <Button
//               onClick={handleToggleChannels}
//               // variant="contained"
//               // color="primary"
//               endIcon={showChannels ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//               sx={{ mb: 1, backgroundColor: "transparent", color:"white" }}
//             >
//               Channels
//             </Button>
//             <Collapse in={showChannels}>
//               {channels.map((channel) => (
//                 <ListItem
//                   button
//                   key={channel._id}
//                   onClick={() => handleSelectChannel(channel._id)}
//                   sx={{
//                     marginTop:"2px",
//                     cursor: "pointer",
//                     padding: "0px",
//                     paddingLeft: '14px',
//                     borderRadius: "10px",
//                     // fontWeight:"800 !important",
//                     color: selectedChannel === channel._id ? "#633965" : "#fff", 
//                     backgroundColor:
//                       selectedChannel === channel._id ? "white" : "transparent", 
//                     "&:hover": {
//                       backgroundColor:
//                         selectedChannel === channel._id ? "#FFFFFF" : "#FFFFFF", 
//                       color:
//                         selectedChannel === channel._id ? "#633965" : "#633965", 
//                     },
//                   }}
//                 >
//                   <ListItemText
//                     primary={
//                       <span style={{ display: "flex", alignItems: "center" }}>
//                         <span style={{ marginRight: "0.4em" }}>#</span>
//                         <span>{channel.name}</span>
//                       </span>
//                     }
//                   />
//                 </ListItem>
//               ))}
//             </Collapse>

//             <List></List>
//             <Box sx={{ mt: "auto" }}>
//               <TextField
//                 variant="outlined"
//                 fullWidth
//                 placeholder="New Channel Name"
//                 value={newChannelName}
//                 onChange={(e) => setNewChannelName(e.target.value)}
//                 sx={{ mb: 1 }}
//               />
//               <Button
//                 onClick={handleCreateChannel}
//                 variant="contained"
//                 color="primary"
//               >
//                 Create Channel
//               </Button>
//             </Box>
//           </Box>
//         </Box>

//         {/* Main Chat Window */}
//         <Box sx={{  flexGrow: 1, display: "flex", flexDirection: "column", paddingTop:'42px', paddingLeft:"calc(20% + 50px);" }}>
//           <Box
//             sx={{ flexGrow: 1, p: 2, display: "flex", flexDirection: "column" }}
//           >
//             {/* Messages Display */}
//             <Box
//               sx={{
//                 flexGrow: 1,
//                 overflowY: "auto",
//                 borderBottom: "1px solid #ccc",
//               }}
//             >
//               {selectedChannel ? (
//                 <>
//                   <Typography variant="h6" gutterBottom>
//                     {channels.find((ch) => ch._id === selectedChannel)?.name ||
//                       "Channel Messages"}
//                   </Typography>
//                   {messages.map((msg) => (
//                     <Box key={msg._id} sx={{ mb: 2 }}>
//                       <Typography variant="body2" color="textSecondary">
//                         {msg.sender}:
//                       </Typography>
//                       <Typography variant="body1">{msg.message}</Typography>
//                     </Box>
//                   ))}
//                 </>
//               ) : (
//                 <Typography variant="body1">
//                   Select a channel to view messages
//                 </Typography>
//               )}
//             </Box>

//             {/* Message Input */}
//             {selectedChannel && (
//               <Box
//                 sx={{
//                   p: 2,
//                   display: "flex",
//                   alignItems: "center",
//                   borderTop: "1px solid #ccc",
                  
//                 }}
//               >
//                 <TextField
//                   variant="outlined"
//                   fullWidth
//                   placeholder="Type your message..."
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   sx={{ mr: 2 }}
//                 />
//                 <Button
//                   onClick={handleSendMessage}
//                   variant="contained"
//                   color="primary"
//                 >
//                   Send
//                 </Button>
//               </Box>
//             )}

//             {/* Add user to channel */}
//             {selectedChannel && (
//               <Box sx={{ p: 2, borderTop: "1px solid #ccc" }}>
//                 <TextField
//                   variant="outlined"
//                   fullWidth
//                   placeholder="Add user by email..."
//                   value={addUserEmail}
//                   onChange={(e) => setAddUserEmail(e.target.value)}
//                   sx={{ mb: 1 }}
//                 />
//                 <Button
//                   onClick={handleAddUserToChannel}
//                   variant="contained"
//                   color="primary"
//                 >
//                   Add User
//                 </Button>
//               </Box>
//             )}
//           </Box>
//         </Box>

//         {/* Thin Left Sidebar for User Initial */}
//         <Box
//           sx={{
//             width: "50px",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//             alignItems: "center",
//             backgroundColor: "#430E44",
//             position: "fixed",
//             left: 0,
//             bottom: 0,
//             height: "100%",
//           }}
//         >
//           {/* User Initial Logo */}
//           <Box
//             sx={{
//               width: 40,
//               height: 40,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               borderRadius: "10%",
//               backgroundColor: "#fff",
//               boxShadow: "0 0 2px rgba(0, 0, 0, 0.3)",
//               mt:7,
//             }}
//           >
            
//             <Typography variant="body1" color="textSecondary">
//               {name ? name.charAt(0).toUpperCase() : "U"}
//             </Typography>
//           </Box>
          
//           <Box
//             sx={{
//               width: 40,
//               height: 40,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               borderRadius: "10%",
//               backgroundColor: "#fff",
//               boxShadow: "0 0 2px rgba(0, 0, 0, 0.3)",
//               mb: 2,
//             }}
//           >
//             <Typography variant="body1" color="textSecondary">
//               {name ? name.charAt(0).toUpperCase() : "U"}
//             </Typography>
//           </Box>
//         </Box>
//         {/* Fixed Top Search Bar */}
//         <Box
//           sx={{
//             width: "100%",
//             backgroundColor: "#430E44",
//             p: 1,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             position: "fixed",
//             top: 0,
//             zIndex: 1000,
//             height: "42px",
//           }}
//         >
//           <TextField
//             // variant="filled"
//             placeholder="Search channels..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             size="small"
//             sx={{
//               backgroundColor: "#724675",
//               color: "#fff",
//               "& .MuiInputBase-input": { color: "#fff" },
//               "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
//               width: "60%",
//             }}
//           />
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default App;







// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   ListItem,
//   ListItemText,
//   Collapse,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import AddIcon from "@mui/icons-material/Add";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#611F69",
//     },
//     secondary: {
//       main: "#fff",
//     },
//     background: {
//       default: "#f5f5f5",
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         contained: {
//           borderRadius: 20,
//         },
//       },
//     },
//     MuiDrawer: {
//       styleOverrides: {
//         paper: {
//           backgroundColor: "#d3d3d3",
//           color: "#000",
//         },
//       },
//     },
//   },
// });

// const App = () => {
  
//   const [channels, setChannels] = useState([]);
//   const [selectedChannel, setSelectedChannel] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [newChannelName, setNewChannelName] = useState("");
//   const [addUserEmail, setAddUserEmail] = useState("");
//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);
//   const [name, setName] = useState(null);
//   const [showChannels, setShowChannels] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [openCreateChannelDialog, setOpenCreateChannelDialog] = useState(false);
//   const [inviteEmails, setInviteEmails] = useState([]);

//   const handleToggleChannels = () => {
//     setShowChannels(!showChannels);
//   };

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     setName(storedUser?.name);
//     if (storedToken) {
//       setToken(storedToken);
//     }
//     if (storedUser) {
//       setUser(storedUser);
//     } else {
//       console.error("Token or user not found");
//     }
//   }, []);

//   useEffect(() => {
//     const fetchChannels = async () => {
//       if (!token) return;

//       try {
//         const response = await axios.get("http://localhost:5000/api/channels", {
//           headers: { Authorization: `Bearer ${token}` },
//           params: { userId: user?._id },
//         });
//         setChannels(response.data);
//       } catch (error) {
//         console.error("Error fetching channels:", error);
//       }
//     };

//     fetchChannels();
//   }, [token, user]);

//   useEffect(() => {
//     if (selectedChannel && token) {
//       const fetchMessages = async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:5000/api/channels/${selectedChannel}/messages`,
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//           setMessages(response.data);
//         } catch (error) {
//           console.error("Error fetching messages:", error);
//         }
//       };

//       fetchMessages();
//     }
//   }, [selectedChannel, token]);

//   const handleSendMessage = async () => {
//     if (newMessage.trim() === "" || !selectedChannel) return;

//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/channels/${selectedChannel}/messages`,
//         { message: newMessage },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setMessages([...messages, response.data]);
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   const handleSelectChannel = (channelId) => {
//     setSelectedChannel(channelId);
//   };

//     const handleAddUserToChannel = async () => {
//     if (addUserEmail.trim() === "" || !selectedChannel) return;

//     try {
//       await axios.post(
//         `http://localhost:5000/api/channels/${selectedChannel}/add-user`,
//         { email: addUserEmail },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("User added successfully");
//       setAddUserEmail(""); 
//     } catch (error) {
//       console.error("Error adding user to channel:", error);
//       alert("Failed to add user");
//     }
//   };
//   const handleCreateChannelDialogOpen = () => {
//     setOpenCreateChannelDialog(true);
//   };

//   const handleCreateChannelDialogClose = () => {
//     setOpenCreateChannelDialog(false);
//     setNewChannelName("");
//     setInviteEmails([]);
//   };

//   const handleCreateChannel = async () => {
//     if (newChannelName.trim() === "") return;

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/channels",
//         { name: newChannelName },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setChannels([...channels, response.data]);
//       handleCreateChannelDialogClose();
//     } catch (error) {
//       console.error("Error creating channel:", error);
//     }
//   };

//   const handleInviteEmailsChange = (e) => {
//     setInviteEmails(e.target.value.split(","));
//   };

//   const handleInviteUsers = async () => {
//     if (!selectedChannel || inviteEmails.length === 0) return;

//     try {
//       await Promise.all(
//         inviteEmails.map(async (email) => {
//           await axios.post(
//             `http://localhost:5000/api/channels/${selectedChannel}/add-user`,
//             { email },
//             { headers: { Authorization: `Bearer ${token}` } }
//           );
//         })
//       );
//       alert("Users invited successfully");
//       handleCreateChannelDialogClose();
//     } catch (error) {
//       console.error("Error inviting users:", error);
//       alert("Failed to invite users");
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ display: "flex", height: "100vh" }}>
//         {/* Left Sidebar for Channels */}
//         <Box
//           sx={{
//             position: "fixed",
//             width: "20%",
//             height: "100%",
//             paddingTop: "42px",
//             marginLeft: "50px",
//             display: "flex",
//             flexDirection: "column",
//             backgroundColor: "#5B2B5D",
//             borderRight: "1px solid #ccc",
//             color: "#fff",
//           }}
//         >
//           {/* Channels List */}
//           <Box
//             sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}
//           >
//             <Button
//               onClick={handleToggleChannels}
//               endIcon={showChannels ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//               sx={{ mb: 1, backgroundColor: "transparent", color: "white" }}
//             >
//               Channels
//             </Button>
//             <Collapse in={showChannels}>
//               {channels.map((channel) => (
//                 <ListItem
//                   button
//                   key={channel._id}
//                   onClick={() => handleSelectChannel(channel._id)}
//                   sx={{
//                     marginTop: "2px",
//                     cursor: "pointer",
//                     padding: "0px",
//                     paddingLeft: "14px",
//                     borderRadius: "10px",
//                     color: selectedChannel === channel._id ? "#633965" : "#fff",
//                     backgroundColor:
//                       selectedChannel === channel._id
//                         ? "white"
//                         : "transparent",
//                     "&:hover": {
//                       backgroundColor:
//                         selectedChannel === channel._id
//                           ? "#FFFFFF"
//                           : "#FFFFFF",
//                       color:
//                         selectedChannel === channel._id ? "#633965" : "#633965",
//                     },
//                   }}
//                 >
//                   <ListItemText
//                     primary={
//                       <span style={{ display: "flex", alignItems: "center" }}>
//                         <span style={{ marginRight: "0.4em" }}>#</span>
//                         <span>{channel.name}</span>
//                       </span>
//                     }
//                   />
//                 </ListItem>
//               ))}
//               <ListItem button onClick={handleCreateChannelDialogOpen}>
//                 <ListItemText
//                   primary={
//                     <span style={{ display: "flex", alignItems: "center" }}>
//                       <span style={{ marginRight: "0.4em" }}>+</span>
//                       <span>Add a Channel</span>
//                     </span>
//                   }
//                 />
//               </ListItem>
//             </Collapse>
//           </Box>
//         </Box>

//         {/* Main Chat Window */}
//         <Box
//           sx={{
//             flexGrow: 1,
//             display: "flex",
//             flexDirection: "column",
//             paddingTop: "42px",
//             paddingLeft: "calc(20% + 50px);",
//           }}
//         >
//           <Box
//             sx={{ flexGrow: 1, p: 2, display: "flex", flexDirection: "column" }}
//           >
//             {/* Messages Display */}
//             <Box
//               sx={{
//                 flexGrow: 1,
//                 overflowY: "auto",
//                 borderBottom: "1px solid #ccc",
//               }}
//             >
//               {selectedChannel ? (
//                 <>
//                   <Typography variant="h6" gutterBottom>
//                     {channels.find((ch) => ch._id === selectedChannel)?.name ||
//                       "Channel Messages"}
//                   </Typography>
//                   {messages.map((msg) => (
//                     <Box key={msg._id} sx={{ mb: 2 }}>
//                       <Typography variant="body2" color="textSecondary">
//                         {msg.sender}:
//                       </Typography>
//                       <Typography variant="body1">{msg.message}</Typography>
//                     </Box>
//                   ))}
//                 </>
//               ) : (
//                 <Typography variant="body1">
//                   Select a channel to view messages
//                 </Typography>
//               )}
//             </Box>

//             {/* New Message Input */}
//             <Box sx={{ mt: 2 }}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 placeholder="Type your message"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     handleSendMessage();
//                   }
//                 }}
//               />
//               <Button
//                 onClick={handleSendMessage}
//                 sx={{
//                   mt: 2,
//                   alignSelf: "flex-end",
//                   width: "100px",
//                   backgroundColor: "#611F69",
//                   color: "#fff",
//                   "&:hover": { backgroundColor: "#4f1557" },
//                 }}
//               >
//                 Send
//               </Button>
//             </Box>
//             {selectedChannel && (
//               <Box sx={{ p: 2, borderTop: "1px solid #ccc" }}>
//                 <TextField
//                   variant="outlined"
//                   fullWidth
//                   placeholder="Add user by email..."
//                   value={addUserEmail}
//                   onChange={(e) => setAddUserEmail(e.target.value)}
//                   sx={{ mb: 1 }}
//                 />
//                 <Button
//                   onClick={handleAddUserToChannel}
//                   variant="contained"
//                   color="primary"
//                 >
//                   Add User
//                 </Button>
//               </Box>
//             )}
//           </Box>
          
//         </Box>

//         {/* Create Channel Dialog */}
//         <Dialog open={openCreateChannelDialog}>
//           <DialogTitle>Create Channel</DialogTitle>
//           <DialogContent>
//             <TextField
//               fullWidth
//               label="Channel Name"
//               value={newChannelName}
//               onChange={(e) => setNewChannelName(e.target.value)}
//               margin="dense"
//             />
//             <TextField
//               fullWidth
//               label="Invite Users (comma-separated emails)"
//               value={inviteEmails.join(",")}
//               onChange={handleInviteEmailsChange}
//               margin="dense"
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCreateChannelDialogClose} color="primary">
//               Cancel
//             </Button>
//             <Button onClick={handleCreateChannel} color="primary">
//               Create
//             </Button>
//             <Button onClick={handleInviteUsers} color="primary">
//               Invite Users
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//       //         {/* Thin Left Sidebar for User Initial */}
//          <Box
//           sx={{
//             width: "50px",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//             alignItems: "center",
//             backgroundColor: "#430E44",
//             position: "fixed",
//             left: 0,
//             bottom: 0,
//             height: "100%",
//           }}
//         >
//           {/* User Initial Logo */}
//           <Box
//             sx={{
//               width: 40,
//               height: 40,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               borderRadius: "10%",
//               backgroundColor: "#fff",
//               boxShadow: "0 0 2px rgba(0, 0, 0, 0.3)",
//               mt:7,
//             }}
//           >
            
//             <Typography variant="body1" color="textSecondary">
//               H
//             </Typography>
//           </Box>
          
//           <Box
//             sx={{
//               width: 40,
//               height: 40,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               borderRadius: "10%",
//               backgroundColor: "#fff",
//               boxShadow: "0 0 2px rgba(0, 0, 0, 0.3)",
//               mb: 2,
//             }}
//           >
//             <Typography variant="body1" color="textSecondary">
//               {name ? name.charAt(0).toUpperCase() : "U"}
//             </Typography>
//           </Box>
//         </Box>
//         {/* Fixed Top Search Bar */}
//         <Box
//           sx={{
//             width: "100%",
//             backgroundColor: "#430E44",
//             p: 1,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             position: "fixed",
//             top: 0,
//             zIndex: 1000,
//             height: "42px",
//           }}
//         >
//           <TextField
//             // variant="filled"
//             placeholder="Search channels..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             size="small"
//             sx={{
//               backgroundColor: "#724675",
//               color: "#fff",
//               "& .MuiInputBase-input": { color: "#fff" },
//               "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
//               width: "60%",
//             }}
//           />
//         </Box>
//     </ThemeProvider>
//   );
// };

// export default App;
























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
import { Modal, Spinner } from 'react-bootstrap';


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
  const [showChannels, setShowChannels] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openCreateChannelDialog, setOpenCreateChannelDialog] = useState(false);
  const [inviteEmails, setInviteEmails] = useState([]);

  const handleToggleChannels = () => {
    setShowChannels(!showChannels);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setName(storedUser?.name);
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      setUser(storedUser);
    } else {
      console.error("Token or user not found");
    }
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
      }
    };

    fetchChannels();
  }, [token, user]);

  useEffect(() => {
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

      fetchMessages();
    }
  }, [selectedChannel, token]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !selectedChannel) return;

    try {
      const response = await axios.post(
        `http://localhost:5000/api/channels/${selectedChannel}/messages`,
        { message: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSelectChannel = (channelId) => {
    setSelectedChannel(channelId);
  };

    const handleAddUserToChannel = async () => {
    if (addUserEmail.trim() === "" || !selectedChannel) return;

    try {
      await axios.post(
        `http://localhost:5000/api/channels/${selectedChannel}/add-user`,
        { email: addUserEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("User added successfully");
      setAddUserEmail(""); 
    } catch (error) {
      console.error("Error adding user to channel:", error);
      alert("Failed to add user");
    }
  };
  const handleCreateChannelDialogOpen = () => {
    setOpenCreateChannelDialog(true);
  };

  const handleCreateChannelDialogClose = () => {
    setOpenCreateChannelDialog(false);
    setNewChannelName("");
    setInviteEmails([]);
  };

  const handleCreateChannel = async () => {
    if (newChannelName.trim() === "") return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/channels",
        { name: newChannelName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setChannels([...channels, response.data]);
      handleCreateChannelDialogClose();
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };

  const handleInviteEmailsChange = (e) => {
    setInviteEmails(e.target.value.split(","));
  };

  const handleInviteUsers = async () => {
    if (!selectedChannel || inviteEmails.length === 0) return;

    try {
      await Promise.all(
        inviteEmails.map(async (email) => {
          await axios.post(
            `http://localhost:5000/api/channels/${selectedChannel}/add-user`,
            { email },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        })
      );
      alert("Users invited successfully");
      handleCreateChannelDialogClose();
    } catch (error) {
      console.error("Error inviting users:", error);
      alert("Failed to invite users");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Left Sidebar for Channels */}
        <Box
          sx={{
            position: "fixed",
            width: "20%",
            height: "100%",
            paddingTop: "42px",
            marginLeft: "50px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#5B2B5D",
            borderRight: "1px solid #ccc",
            color: "#fff",
          }}
        >
          {/* Channels List */}
          <Box
            sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}
          >
            <Button
              onClick={handleToggleChannels}
              endIcon={showChannels ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              sx={{ mb: 1, backgroundColor: "transparent", color: "white" }}
            >
              Channels
            </Button>
            <Collapse in={showChannels}>
              {channels.map((channel) => (
                <ListItem
                  button
                  key={channel._id}
                  onClick={() => handleSelectChannel(channel._id)}
                  sx={{
                    marginTop: "2px",
                    cursor: "pointer",
                    padding: "0px",
                    paddingLeft: "14px",
                    borderRadius: "10px",
                    color: selectedChannel === channel._id ? "#633965" : "#fff",
                    backgroundColor:
                      selectedChannel === channel._id
                        ? "white"
                        : "transparent",
                    "&:hover": {
                      backgroundColor:
                        selectedChannel === channel._id
                          ? "#FFFFFF"
                          : "#FFFFFF",
                      color:
                        selectedChannel === channel._id ? "#633965" : "#633965",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ marginRight: "0.4em" }}>#</span>
                        <span>{channel.name}</span>
                      </span>
                    }
                  />
                </ListItem>
              ))}
              <ListItem button onClick={handleCreateChannelDialogOpen}>
                <ListItemText
                  primary={
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "0.4em" }}>+</span>
                      <span>Add a Channel</span>
                    </span>
                  }
                />
              </ListItem>
            </Collapse>
          </Box>
        </Box>

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
          <Box
            sx={{ flexGrow: 1, p: 2, display: "flex", flexDirection: "column" }}
          >
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
      </Box>
      //         {/* Thin Left Sidebar for User Initial */}
         <Box
          sx={{
            width: "50px",
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
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10%",
              backgroundColor: "#fff",
              boxShadow: "0 0 2px rgba(0, 0, 0, 0.3)",
              mt:7,
            }}
          >
            
            <Typography variant="body1" color="textSecondary">
              H
            </Typography>
          </Box>
          
          <Box
            sx={{
              width: 40,
              height: 40,
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
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#430E44",
            p: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            top: 0,
            zIndex: 1000,
            height: "42px",
          }}
        >
          <TextField
            // variant="filled"
            placeholder="Search channels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{
              backgroundColor: "#724675",
              color: "#fff",
              "& .MuiInputBase-input": { color: "#fff" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
              width: "60%",
            }}
          />
        </Box>
    </ThemeProvider>
  );
};

export default App;


