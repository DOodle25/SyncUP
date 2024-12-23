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


// const SearchBar = ({ messages, selectedChannel, channels, name }) => {
//   const [searchTerm, setSearchTerm] = useState("search");

//   return (
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
//               "& .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
//               width: "60%",
//             }}
//           />
//         </Box>
//   );
// };

// export default SearchBar;





import React, { useState } from "react";
import { Box, TextField, List, ListItem, ListItemText } from "@mui/material";

const SearchBar = ({ messages, selectedChannel, channels, name, setSelectedChannel }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter channels based on search term
  const filteredChannels = channels.filter((channel) =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle channel selection
  const handleChannelClick = (channel) => {
    console.log("Channel selected:", channel._id);
    setSearchTerm(""); // Update the search term to match the selected channel
    setSelectedChannel(channel._id); // Update the selected channel in the parent component
  };

  return (
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
      {/* Search Bar */}
      <TextField
        placeholder="Search channels..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        size="small"
        sx={{
          backgroundColor: "#724675",
          color: "#fff",
          "& .MuiInputBase-input": { color: "#fff" },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
          width: "60%",
        }}
      />

      {/* Channel List */}
      {searchTerm && (
        <Box
          sx={{
            position: "absolute",
            top: "42px",
            width: "60%",
            backgroundColor: "#724675",
            borderRadius: "4px",
            maxHeight: "200px",
            overflowY: "auto",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          <List>
            {filteredChannels.map((channel) => (
              <ListItem
                key={channel.id}
                button
                onClick={() => handleChannelClick(channel)}
                sx={{
                  "&:hover": { backgroundColor: "#5E3268" },
                  color: "#fff",
                }}
              >
                <ListItemText primary={channel.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
