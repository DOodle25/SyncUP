import React from "react";
import { Box, Typography } from "@mui/material";

const UserInitial = ({ name }) => {
  return (
    <Box sx={{ position: "fixed", top: 0, right: 0, padding: "16px", backgroundColor: "#5B2B5D", color: "#fff" }}>
      <Typography variant="h6">{name?.charAt(0).toUpperCase()}</Typography>
    </Box>
  );
};

export default UserInitial;
