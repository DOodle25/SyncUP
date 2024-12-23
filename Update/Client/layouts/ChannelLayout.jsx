import { Stack, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { BiMessageRoundedDetail } from "react-icons/bi";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import EditTextBox from "../src/components/EditTextBox";
import MessageBox from "../src/components/MessageBox";
import { ApplicationState } from "../src/components/ContextProvider";
import { useContext } from "react";

export default function ChannelLayout() {
  const { channelId} = useParams();
  const { activeTab,channelArray } = useContext(ApplicationState);
  return (
    <>
      <Stack
        id="message-layout-root"
        direction={"column"}
        sx={{ height: "100%", width: "100%" }}
        position={"relative"}
      >
        <Stack
          id="message-layout-header-root"
          direction={"column"}
          width={"100%"}
        >
          <Stack
            id="message-layout-header-channel_details"
            width={"100%"}
            direction={"row"}
            justifyContent={"space-between"}
            padding={1}
            boxSizing={"border-box"}
          >
            <Button
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                height: "28px",
                ":hover": {
                  backgroundColor: "rgba(0,0,0,0.05)",
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "lato",
                  fontSize: "18px",
                  fontWeight: 730,
                  color: "rgba(0,0,0,0.8)",
                }}
              >
                {`# ${channelArray.filter((item)=>item._id===channelId)[0].name}`}
                {/* {`# ${channelId}`} */}
              </Typography>
            </Button>
            <Stack>
              {/* this stack is going to be the right buttons arrays for huddles and more menu */}
            </Stack>
          </Stack>
          <Stack
            id="message-layout-header-tabs"
            width={"100%"}
            padding={"0 10px 0 10px"}
            boxSizing={"border-box"}
            direction={"row"}
            justifyContent={"flex-start"}
            gap={1}
            alignItems={"center"}
          >
            <Button
              sx={{
                textTransform: "none",
                height: "40px",
                ":hover": { backgroundColor: "rgba(0,0,0,0.05)" },
                borderRadius: "10px 10px 0 0",
              }}
            >
              <BiMessageRoundedDetail
                fontSize={"15px"}
                color="rgba(0,0,0,0.8)"
              />
              <Typography
                sx={{
                  fontSize: "13px",
                  fontFamily: "lato",
                  margin: "0 0 0 3px",
                  color: "rgba(0,0,0,0.8)",
                  fontWeight: 600,
                }}
              >
                Messages
              </Typography>
            </Button>
            <Button
              sx={{
                textTransform: "none",
                height: "40px",
                ":hover": { backgroundColor: "rgba(0,0,0,0.05)" },
                borderRadius: "10px 10px 0 0",
              }}
            >
              <FileCopyOutlinedIcon
                sx={{ fontSize: "14px", color: "rgba(0,0,0,0.8)" }}
              />
              <Typography
                sx={{
                  fontSize: "13px",
                  fontFamily: "lato",
                  margin: "0 0 0 3px",
                  color: "rgba(0,0,0,0.8)",
                  fontWeight: 600,
                }}
              >
                Add canvas
              </Typography>
            </Button>
            <Button
              sx={{
                textTransform: "none",
                minWidth: "20px",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                ":hover": { backgroundColor: "rgba(0,0,0,0.05)" },
              }}
            >
              <AddIcon sx={{ color: "rgba(0,0,0,0.8)", fontSize: "18px" }} />
            </Button>
          </Stack>
          <Stack
            id="message-layout-divider"
            sx={{
              borderWidth: "0.7px",
              width: "100%",
              borderStyle: "solid",
              borderColor: "rbga(0,0,0)",
              opacity: 0.2,
            }}
          ></Stack>
        </Stack>
        <Stack
          id="message-layout-messages_list"
          sx={{
            width: "100%",
            height: "100%",
            overflowY: "scroll",
            // padding:"0 10px 0 10px"
          }}
          boxSizing={"border-box"}
          direction={"column-reverse"}
        >
          <MessageBox />
        </Stack>
        <Stack
          width={"100%"}
          position={"absolute"}
          padding={3}
          boxSizing={"border-box"}
          justifyContent={"center"}
          alignItems={"center"}
          bottom={0}
          zIndex={1}
        >
          <EditTextBox />
        </Stack>
        <Stack position={"absolute"} bottom={0} width={"100%"} backgroundColor="white" height={"130px"}>

        </Stack>
      </Stack>
    </>
  );
}
