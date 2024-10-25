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


const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("search");

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
  );
};

export default SearchBar;
