import { Stack, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function GetName() {
    const [name,setName] = useState("");
    const navigate=useNavigate();
    const isNextButtonDisabled=Boolean(name);

    function handleNameChange(event)
    {
        setName(event.target.value);
    }

    function handleSetName()
    {
        sessionStorage.setItem("userName",name);
        navigate("/create-workspace");
    }

  return (
    <>
      <Stack
        justifyContent={"space-evenly"}
        alignItems={"center"}
        gap={2}
        marginTop={3}
        flexWrap={"wrap"}
        id="auth-get_name-root"
      >
        <Stack
          direction={"column"}
          alignitems={"center"}
          justifyContent={"center"}
          gap={1}
          flexWrap={"wrap"}
          id="auth-get_name-container"
        >
          <Typography
            sx={{
              fontSize: "45px",
              fontWeight: "700",
              fontFamily: "lato",
              textAlign: "center",
              lineHeight: "45px",
            }}
          >
            What is your name?
          </Typography>
          <Stack direction={"row"} justifyContent={"center"} gap={1}>
            <Typography
              sx={{
                color: "#454245",
                fontWeight: "300",
                fontSize: "16px",
                textAlign: "center",
                marginTop:2
              }}
            >
              Adding your name helps your teammates to recognise and connect
              with you more easily.
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction={"column"}
          justifyContent={"center"}
          marginTop={2}
          gap={3}
          sx={{ width: "400px" }}
          id="auth-get_name-inputfields-container"
        >
            <TextField
            variant="outlined"
            fullWidth
            id="auth-create_workspace-inputfield-email"
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
            placeholder="Enter your full name"
            onChange={handleNameChange}
            value={name}
          >

          </TextField>
        </Stack>
        <Button
              variant={"contained"}
              sx={{
                backgroundColor: "#611f69",
                color: "#fff",
                height: "40px",
                borderRadius: "12px",
                textTransform: "none",
                fontSize: "18px",
                width:"100px",
                marginTop:5
              }}
              onClick={handleSetName}
              id="auth-get_name-continue-btn"
              disabled={!isNextButtonDisabled}
            >
              Next
            </Button>
      </Stack>
    </>
  );
}
