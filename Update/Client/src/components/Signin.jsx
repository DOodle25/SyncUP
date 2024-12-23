import { Stack, TextField, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "../assets/google-color-svgrepo-com.svg";
import { useState } from "react";
import axios from "axios";

export default function Signin() {

  const [email,setEmail] = useState("");
  const navigate=useNavigate();

  function handleEmailChange(event)
  {
    setEmail(event.target.value);
  }

  function handleSignin()
  {
    axios.post("http://localhost:3000/auth",{email:email}).then((response)=>
    {
      if(response.data.status===true)
      {
        sessionStorage.clear();
        sessionStorage.setItem("email",email);
        navigate("/verify-otp");
      }
    }).catch((err)=>
    {
      console.log(err);
    })
  }

  return (
    <>
      <Stack
        justifyContent={"space-evenly"}
        alignItems={"center"}
        gap={2}
        marginTop={3}
        flexWrap={"wrap"}
        id="auth-signin-root"
      >
        <Stack
          alignContent={"center"}
          justifyContent={"center"}
          gap={1}
          flexWrap={"wrap"}
          id="auth-signin-header-container"
        >
          <Typography
            sx={{
              fontSize: "45px",
              fontWeight: "700",
              fontFamily: "lato",
              textAlign: "center",
            }}
          >
            Sign in to Slack
          </Typography>
          <Stack direction={"row"} justifyContent={"center"} gap={1}>
            <Typography
              sx={{
                color: "#454245",
                fontWeight: "300",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              We suggest using the{" "}
              <strong>email address you use at work</strong>.
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction={"column"}
          justifyContent={"center"}
          marginTop={2}
          gap={3}
          sx={{ width: "400px" }}
          id="auth-signin-inputfields-container"
        >
          <Button
            variant="outlined"
            sx={{
              height: "44px",
              borderRadius: "12px",
              borderColor: "#aaaaaa",
              borderWidth: "2px",
              color: "#1d1f1d",
              textTransform: "none",
            }}
            id="auth-signin-sign_in_with_google-btn"
          >
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={2}
            >
              <img src={GoogleIcon} alt="google logo" width={"18px"} />
              <Typography
                sx={{ fontSize: "18px", fontFamily: "lato", fontWeight: "600" }}
              >
                Sign In With Google
              </Typography>
            </Stack>
          </Button>
          <Button
            variant="outlined"
            sx={{
              height: "44px",
              borderRadius: "12px",
              borderColor: "#aaaaaa",
              borderWidth: "2px",
              color: "#1d1c1d",
              textTransform: "none",
              fontSize: "18px",
            }}
            id="auth-signin-sign_in_with_apple-btn"
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={2}
            >
              <AppleIcon fontSize="small" />
              <Typography
                sx={{ fontSize: "18px", fontFamily: "lato", fontWeight: "600" }}
              >
                Sign In With Apple
              </Typography>
            </Stack>
          </Button>
          <Stack direction={"row"} gap={2} alignItems={"center"} id="auth-signin-inputfields-divider">
            <Stack
              sx={{
                borderColor: "#696969",
                borderWidth: "0.1px",
                borderStyle: "solid",
                width: "100%",
                opacity: 0.5,
              }}
            ></Stack>
            <Typography
              sx={{
                fontFamily: "lato",
                fontWeight: "350",
                fontSize: "15px",
                color: "#1d1c1d",
              }}
            >
              OR
            </Typography>
            <Stack
              sx={{
                borderColor: "#696969",
                borderWidth: "0.1px",
                borderStyle: "solid",
                width: "100%",
                opacity: 0.5,
              }}
            ></Stack>
          </Stack>
          <TextField
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                height: "44px",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#454245",
                opacity: 0.75,
              },
              fontSize: "18px",
            }}
            placeholder="name@work-email.com"
            onChange={handleEmailChange}
            value={email}
            type="email"
            id="auth-signin-inputfield-email"
          ></TextField>
          <Button
            variant={"contained"}
            sx={{
              backgroundColor: "#611f69",
              color: "#fff",
              height: "44px",
              borderRadius: "12px",
              textTransform: "none",
              fontSize: "18px",
            }}
            onClick={handleSignin}
            id="auth-signin-sign_in_with_email-btn"
          >
            Sign In With Email
          </Button>
          <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            id="auth-signin-route_to_signup-container"
          >
            <Typography
              sx={{ fontSize: "14px", color: "#696969", fontWeight: "350" }}
            >
              New to Slack?
            </Typography>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#1264a3",
                  fontWeight: "350",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Create an account
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
