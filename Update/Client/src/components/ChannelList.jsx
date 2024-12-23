import { Stack, Typography, Button, Divider } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ApplicationState } from "./ContextProvider";
import TagIcon from "@mui/icons-material/Tag";
import axios from "axios";
import { socket } from "../socket";

export default function ChannelList() {
  const { channelArray, activeWorkspace } = useContext(ApplicationState);
  const [focusedChannel, setFocusedChannel] = useState("");
  const [allChannelArray, setAllChannelArray] = useState([]);

  useEffect(() => {
    axios
      .post(
        "http://localhost:3000/channels/channels",
        { workspaceId: activeWorkspace._id },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setAllChannelArray(response.data.channels);
      })
      .catch(() => {
        console.log("error occured while fetching all chennels");
      });
  }, []);

  function handleChannelJoin(channelId) {
    socket.emit(
      "join-new-channel",
      sessionStorage.getItem("userId"),
      channelId
    );
  }

  return (
    <>
      <Stack
        sx={{ width: "100%", borderRadius: "8px", backgroundColor: "white" }}
        direction={"column"}
        justifyContent={"center"}
      >
        {allChannelArray.map((item, index) => (
          <Stack
            direction={"column"}
            sx={{ width: "100%" }}
            key={`channel${item.name}${index}`}
            position={"relative"}
            height={"80px"}
            onMouseEnter={() => {
              setFocusedChannel(item.name);
            }}
            onMouseLeave={() => {
              setFocusedChannel("");
            }}
            justifyContent={"center"}
          >
            <Stack
              direction={"row"}
              padding={"10px 10px 0 10px"}
              gap={0.5}
              alignItems={"center"}
              boxSizing={"border-box"}
            >
              <TagIcon
                sx={{
                  color: "rgba(0,0,0,0.8)",
                  fontSize: "16px",
                  fontWeight: 300,
                }}
              />
              <Typography
                sx={{
                  color: "rgba(0,0,0,0.8)",
                  fontSize: "15px",
                  fontFamily: "lato",
                  fontWeight: 600,
                }}
                noWrap
              >
                {item.name}
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              padding={"0 10px 10px 10px"}
              boxSizing={"border-box"}
            >
              <Typography
                sx={{ fontSize: "13px", fontWeight: 350, fontFamily: "lato" }}
              >
                some random discriptioins of the channel
              </Typography>
            </Stack>
            {focusedChannel === item.name ? (
              <Stack
                direction={"row"}
                alignItems={"center"}
                position={"absolute"}
                right={"20px"}
                top={0}
                gap={2}
                sx={{ transform: "translateY(50%)" }}
              >
                <Button
                  sx={{
                    height: "36px",
                    borderRadius: "8px",
                    color: "rgba(0,0,0,0.8)",
                    textTransform: "none",
                    fontFamily: "lato",
                    fontSize: "15px",
                    fontWeight: 600,
                    backgroundColor: "white",
                    border: "1px rgba(0,0,0,0.3) solid",
                  }}
                >
                  {channelArray.map((item) => item.name).includes(item.name)
                    ? "Open in Home"
                    : "View"}
                </Button>
                <Button
                  sx={{
                    height: "36px",
                    borderRadius: "8px",
                    color: "rgba(0,0,0,0.8)",
                    textTransform: "none",
                    fontFamily: "lato",
                    fontSize: "15px",
                    fontWeight: 600,
                    backgroundColor: "white",
                    border: "1px rgba(0,0,0,0.3) solid",
                  }}
                  onClick={() => {
                    handleChannelJoin(item.name);
                  }}
                  disabled={
                    channelArray
                      .filter(
                        (item) => item.workspaceId === activeWorkspace._id
                      )
                      .map((item) => item.name)
                      .includes(item.name)
                      ? true
                      : false
                  }
                >
                  {channelArray.map((item) => item.name).includes(item.name)
                    ? "Joined"
                    : "Join"}
                </Button>
              </Stack>
            ) : (
              <></>
            )}
            {index + 1 === channelArray.length ? (
              <></>
            ) : (
              <Divider sx={{ marginTop: "10px" }} />
            )}
          </Stack>
        ))}
      </Stack>
    </>
  );
}
