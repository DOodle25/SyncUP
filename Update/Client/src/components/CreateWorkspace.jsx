import { Stack, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function CreateWorkspace() {
  const [workspace, setWorkspace] = useState("");
  const navigate = useNavigate();
  const isNextButtonDisabled = Boolean(workspace);

  function handleNameChange(event) {
    setWorkspace(event.target.value);
  }

  function handleCreateWorkspace() {
    axios.post("http://localhost:3000/auth/signup", {
      email: sessionStorage.getItem("email"),
      name: sessionStorage.getItem("userName"),
      workspace: workspace,
    }).then((response)=>
    {
        if(response.data.status===true)
        {
            sessionStorage.clear();
            sessionStorage.setItem("userName",response.data.name);
            sessionStorage.setItem("token",response.data.token);
            navigate("/home");
        }
        else
        {
            console.log("error occured in the response data");
        }
    }).catch((err)=>
    {
        console.log("error occured while signing up");
    });
  }

  return (
    <>
      <Stack
        justifyContent={"space-evenly"}
        alignItems={"center"}
        gap={2}
        marginTop={3}
        flexWrap={"wrap"}
        id="auth-create_workspace-root"
      >
        <Stack
          direction={"column"}
          alignitems={"center"}
          justifyContent={"center"}
          gap={1}
          width={"500px"}
          flexWrap={"wrap"}
          id="auth-create_workspace-container"
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
            What’s the name of your company or team?
          </Typography>
          <Stack direction={"row"} justifyContent={"center"} gap={1}>
            <Typography
              sx={{
                color: "#454245",
                fontWeight: "300",
                fontSize: "16px",
                textAlign: "center",
                marginTop: 2,
              }}
            >
              This will be the name of your Slack workspace – choose something
              that your team will recognise.
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction={"column"}
          justifyContent={"center"}
          marginTop={2}
          gap={3}
          sx={{ width: "400px" }}
          id="auth-create_workspace-inputfields-container"
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
            placeholder="e.g. A1 or A1 Marketing"
            onChange={handleNameChange}
            value={workspace}
          ></TextField>
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
            marginTop: 5,
            width: "100px",
          }}
          onClick={handleCreateWorkspace}
          id="auth-create-workspace-continue-btn"
          disabled={!isNextButtonDisabled}
        >
          Next
        </Button>
      </Stack>
    </>
  );
}
