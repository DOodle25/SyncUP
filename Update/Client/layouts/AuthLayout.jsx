import logo from "../src/assets/icons8-slack.svg";
import { Stack, Typography } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function AuthLayout() {
  return (
    <>
      <Stack id="auth-root"
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={"column"}
        height={"95vh"}
      >
        <Stack id="auth-header-continer">
          <Stack
            id="auth-slack-logo-name"
            direction={"row"}
            gap={0.5}
            marginTop={4}
            justifyContent={"center"}
          >
            <img src={logo} alt="Slack Logo" width={"28px"} id="auth-slack-logo"></img>
            <Typography
              sx={{
                textDecoration: "bold",
                fontSize: "28px",
                fontWeight: "600",
                fontFamily: "poppins",
              }}
              id="auth-slack-name"
            >
              slack
            </Typography>
          </Stack>
          <Stack id="auth-router-outlet">
            <Outlet></Outlet>
          </Stack>
        </Stack>
        <Stack>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            gap={2}
            flexWrap={"wrap"}
            id="auth-footer-container"
          >
            <Link to="#" style={{ textDecoration: "none" }} id="auth-privacy_and_terms">
              <Typography
                sx={{
                  color: "#696969",
                  fontSize: "14px",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Privacy & Terms
              </Typography>
            </Link>
            <Link to="#" style={{ textDecoration: "none" }} id="auth-contact_us">
              <Typography
                sx={{
                  color: "#696969",
                  fontSize: "14px",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Contact Us
              </Typography>
            </Link>
            <Link to="#" style={{ textDecoration: "none" }} id="auth-change_region">
              <Stack
                direction={"row"}
                sx={{
                  color: "#696969",
                  "&:hover": { textDecoration: "underline" },
                }}
                alignItems={"center"}
                gap={0.2}
              >
                <LanguageIcon
                  fontSize="small"
                  sx={{ color: "#696969", fontSize: "14px" }}
                />
                <Typography sx={{ color: "#696969", fontSize: "14px" }}>
                  Change region
                </Typography>
                <ExpandMoreIcon
                  fontSize="small"
                  sx={{ color: "#696969", fontSize: "14px" }}
                />
              </Stack>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
