import { Stack, Typography, Button, Divider } from "@mui/material";
import Message from "./Message";
import { ApplicationState } from "./ContextProvider";
import { useContext } from "react";
import wavyHand from "../assets/waving-hand-svgrepo-com.svg";
import { useParams } from "react-router-dom";
export default function MessageBox() {
  const { messageArray,channelArray } = useContext(ApplicationState);
  const { channelId } = useParams();
  let prevDate = "";
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function decideIfToPutDivider(item) {
    const date = new Date(item.doc);
    let today = `${days[date.getDay()]}, ${date.getDay()} ${
      months[date.getMonth()]
    }`;
    if (prevDate === today) {
      prevDate = today;
      return <></>;
    } else {
      prevDate = today;
      return (
        <Divider sx={{ margin: "20px 0 20px 0" }}>
          <Typography
            sx={{
              border: "1px rgba(0,0,0,0.2) solid",
              borderRadius: "20px",
              padding: "5px 12px 5px 12px",
              fontWeight: 600,
              fontFamily: "lato",
              fontSize: "12px",
              color: "rgba(0,0,0,0.8)",
            }}
          >
            {today}
          </Typography>
        </Divider>
      );
    }
  }

  return (
    <>
      <Stack
        sx={{ width: "100%", paddingBottom: "150px" }}
        direction={"column"}
        boxSizing={"border-box"}
      >
        <Stack
          direction={"column"}
          gap={2}
          padding={"60px 25px 0 25px"}
          boxSizing={"border-box"}
        >
          <Stack direction={"column"} gap={0}>
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <img
                src={wavyHand}
                alt="wavyhand"
                style={{ width: "40px", height: "40px" }}
              />
              <Typography
                fontSize={"28px"}
                fontFamily={"lato"}
                fontWeight={800}
              >
                Welcome to the #{channelArray.filter((item)=>item._id===channelId)[0].name} channel
              </Typography>
            </Stack>
            <Typography
              sx={{
                fontFamily: "lato",
                fontSize: "14px",
                fontWeight: 400,
                color: "rgba(0,0,0,0.5)",
              }}
            >
              This channel is for everything Hold meetings, share docs, and make
              decisions together with your team
            </Typography>
          </Stack>
          <Stack
            alignItems={"center"}
            justifyContent={"flex-start"}
            direction={"row"}
          >
            <Button
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                border: "1px rgba(0,0,0,0.5) solid",
                color: "rgba(0,0,0,0.8)",
                fontWeight: 600,
                fontFamily: "lato",
                fontSize:"15px",
                height:"30px"
              }}
            >
              Add Co-workers
            </Button>
          </Stack>
        </Stack>
        {messageArray
          ?.filter((item) => item.channelId === channelId)
          .map((item,index) => (
            <Stack
              direction={"column"}
              width={"100%"}
              height={"100%"}
              key={`message${index}`}
            >
              {decideIfToPutDivider(item)}
              <Message messageProb={item}/>
            </Stack>
          ))}
      </Stack>
    </>
  );
}
