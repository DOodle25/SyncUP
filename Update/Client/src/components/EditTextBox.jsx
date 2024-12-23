import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import { FaCode } from "react-icons/fa6";
import { PiCodeBlock, PiSockLight } from "react-icons/pi";
import AddIcon from "@mui/icons-material/Add";
import { IoText } from "react-icons/io5";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import { LuTerminalSquare } from "react-icons/lu";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Stack, TextField, Divider, Button } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket";
import { useEffect } from "react";
import { useContext } from "react";
import { ApplicationState } from "./ContextProvider";

export default function EditTextBox() {
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [message, setMessage] = useState();
  const isSendButtonEnabled = Boolean(message);
  const { channelId } = useParams();
  const { update, setUpdate, channelArray } = useContext(ApplicationState);

  function handleInputChange(event) {
    setMessage(event.target.value);
  }

  function handleMessageSend() {
    if (message === "") {
      return;
    }
    socket.emit(
      "send-message",
      message,
      channelId,
      sessionStorage.getItem("token"),
      sessionStorage.getItem("userName"),
    );
    setMessage("");
  }

  function handleKeyEvent(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleMessageSend();
    }
  }

  // useEffect(()=>
  // {
  //   socket.on("receive-message",(text)=>
  //   {
  //     console.log(text);
  //     setUpdate(!update);
  //   });
  // },[update]);

  return (
    <Stack
      sx={{
        width: "100%",
        borderRadius: "10px",
        border: isInputFocus
          ? "1px rgba(0,0,0,0.2) solid"
          : "1px rgba(0,0,0,0.1) solid",
        overflow: "hidden",
        backgroundColor: "white",
      }}
      boxSizing={"border-box"}
      direction={"column"}
      onFocus={() => {
        setIsInputFocus(true);
      }}
      onBlur={() => {
        setIsInputFocus(false);
      }}
    >
      <Stack
        id="edit_text-box-text_formating-tools"
        direction={"row"}
        gap={1.5}
        justifyContent={"flex-start"}
        alignItems={"center"}
        sx={{ backgroundColor: "rgba(0,0,0,0.05)" }}
        height={"40px"}
        boxSizing={"border-box"}
        padding={"0 10px 0 10px"}
      >
        <FormatBoldIcon
          sx={{
            color: isInputFocus ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.1)",
            fontSize: "21px",
          }}
        />
        <FormatItalicIcon
          sx={{
            color: isInputFocus ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.1)",
            fontSize: "21px",
          }}
        />
        <StrikethroughSIcon
          sx={{
            color: isInputFocus ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.1)",
            fontSize: "21px",
          }}
        />
        <Divider orientation="vertical" variant="middle" flexItem />
        <InsertLinkIcon
          sx={{
            color: isInputFocus ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.1)",
            fontSize: "21px",
          }}
        />
        <Divider orientation="vertical" flexItem variant="middle" />
        <FormatListNumberedIcon
          sx={{
            color: isInputFocus ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.1)",
            fontSize: "21px",
          }}
        />
        <FormatListBulletedIcon
          sx={{
            color: isInputFocus ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.1)",
            fontSize: "21px",
          }}
        />
        <Divider orientation="vertical" flexItem variant="middle" />
        <ViewHeadlineIcon
          sx={{
            color: isInputFocus ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.1)",
            fontSize: "21px",
          }}
        />
        <Divider orientation="vertical" flexItem variant="middle" />
        <FaCode
          color={isInputFocus ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.1)"}
          fontSize={"18px"}
        />
        <PiCodeBlock
          color={isInputFocus ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.1)"}
          fontSize={"18px"}
        />
      </Stack>
      <TextField
        variant="outlined"
        value={message}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
            fontSize: "15px",
            fontFamily: "lato",
            color: "rgba(0,0,0,0.6)",
            padding: "0 15px 0 15px",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "rgba(0,0,0,0.8)",
            fontFamily: "lato",
            fontWeight: 400,
            fontSize: "15px",
          },
          minHeight: "40px",
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
        }}
        onKeyDown={handleKeyEvent}
        multiline
        maxRows={22}
        minRows={1}
        autoComplete="off"
        placeholder={`Message #${channelArray.filter(item=>item._id===channelId)[0].name}`}
        onChange={handleInputChange}
      ></TextField>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        height={"37px"}
        padding={0.6}
        boxSizing={"border-box"}
        alignItems={"center"}
      >
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          boxSizing={"border-box"}
          gap={0.5}
        >
          <Button
            sx={{
              textTransform: "none",
              color: "rgba(0,0,0,0.45)",
              borderRadius: "50%",
              height: "25px",
              width: "25px",
              minWidth: "25px",
            }}
          >
            <AddIcon
              sx={{
                color: "rgba(0,0,0,0.45)",
                fontSize: "18px",
              }}
            />
          </Button>
          <Button
            sx={{
              textTransform: "none",
              color: "rgba(0,0,0,0.45)",
              borderRadius: "8px",
              height: "30px",
              width: "30px",
              minWidth: "30px",
            }}
          >
            <IoText
              sx={{
                color: "rgba(0,0,0,0.45)",
              }}
              fontSize={"30px"}
            />
          </Button>
          <Button
            sx={{
              textTransform: "none",
              color: "rgba(0,0,0,0.45)",
              borderRadius: "8px",
              height: "30px",
              width: "30px",
              minWidth: "30px",
            }}
          >
            <SentimentSatisfiedAltIcon
              sx={{
                color: "rgba(0,0,0,0.45)",
                fontSize: "18px",
              }}
            />
          </Button>
          <Button
            sx={{
              textTransform: "none",
              color: "rgba(0,0,0,0.45)",
              borderRadius: "8px",
              height: "30px",
              width: "30px",
              minWidth: "30px",
            }}
          >
            <AlternateEmailIcon
              sx={{
                color: "rgba(0,0,0,0.45)",
                fontSize: "18px",
              }}
            />
          </Button>
          <Divider orientation="vertical" flexItem variant="middle" />
          <Button
            sx={{
              textTransform: "none",
              color: "rgba(0,0,0,0.45)",
              borderRadius: "8px",
              height: "30px",
              width: "30px",
              minWidth: "30px",
            }}
          >
            <VideocamOutlinedIcon
              sx={{
                color: "rgba(0,0,0,0.45)",
                fontSize: "21px",
              }}
            />
          </Button>
          <Button
            sx={{
              textTransform: "none",
              color: "rgba(0,0,0,0.45)",
              borderRadius: "8px",
              height: "30px",
              width: "30px",
              minWidth: "30px",
            }}
          >
            <KeyboardVoiceOutlinedIcon
              sx={{
                color: "rgba(0,0,0,0.45)",
                fontSize: "20px",
              }}
            />
          </Button>
          <Divider orientation="vertical" flexItem variant="middle" />
          <Button
            sx={{
              textTransform: "none",
              color: "rgba(0,0,0,0.45)",
              borderRadius: "8px",
              height: "30px",
              width: "30px",
              minWidth: "30px",
            }}
          >
            <LuTerminalSquare
              sx={{
                color: "rgba(0,0,0,0.45)",
                fontSize: "21px",
              }}
            />
          </Button>
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            borderRadius: "6px",
            backgroundColor: isSendButtonEnabled ? "green" : "transparent",
            height: "28px",
          }}
          padding={"0 2px 0 2px"}
          boxSizing={"border-box"}
        >
          <Button
            sx={{
              textTransform: "none",
              color: "rgba(0,0,0,0.45)",
              borderRadius: "8px",
              height: "30px",
              width: "30px",
              minWidth: "30px",
            }}
            disabled={!isSendButtonEnabled}
            onClick={handleMessageSend}
          >
            <SendRoundedIcon
              sx={{
                color: isSendButtonEnabled
                  ? "rgba(255,255,255,0.8)"
                  : "rgba(0,0,0,0.25)",
                fontSize: "18px",
              }}
            />
          </Button>
          <Divider
            orientation="vertical"
            flexItem
            variant="middle"
            sx={{
              borderColor: isSendButtonEnabled
                ? "rgba(255,255,255,0.8)"
                : "rgba(0,0,0,0.25)",
            }}
          />
          <Button
            sx={{
              textTransform: "none",
              color: "rgba(0,0,0,0.45)",
              borderRadius: "8px",
              height: "20px",
              width: "20px",
              minWidth: "20px",
            }}
            disabled={!isSendButtonEnabled}
          >
            <KeyboardArrowDownIcon
              sx={{
                color: isSendButtonEnabled
                  ? "rgba(255,255,255,0.8)"
                  : "rgba(0,0,0,0.25)",
                fontSize: "15px",
              }}
            />
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
