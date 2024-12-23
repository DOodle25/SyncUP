import { Stack, Typography, Button } from "@mui/material";
export default function Message({ messageProb }) {
  const time = new Date(messageProb.doc);
  return (
    <>
      <Stack
        direction={"column"}
        gap={1}
        width={"100%"}
        padding={"5px 25px 5px 25px"}
        boxSizing={"border-box"}
      >
        <Stack direction={"row"} gap={1} boxSizing={"border-box"}>
          <Stack
            sx={{
              backgroundColor: "#c23b15",
              width: "40px",
              height: "40px",
              color: "#fff",
              borderRadius: "8px",
            }}
            justifyContent={"center"}
            alignItems={"center"}
            flexShrink={0}
          >
            <Typography sx={{ fontSize: "18px", fontWeight: 300 }}>
              {messageProb.name[0].toUpperCase()}
            </Typography>
          </Stack>
          <Stack direction={"column"} boxSizing={"border-box"}>
            <Stack direction={"row"} alignItems={"center"} gap={1}>
              <Typography
                sx={{ fontSize: "15px", fontWeight: 650, fontFamily: "lato" }}
              >
                {messageProb.name}
              </Typography>
              <Typography
                sx={{ fontSize: "12px", fontFamily: "lato", fontWeight: 300 }}
              >
                {`${
                  time.getHours() > 12 ? time.getHours() - 12 : time.getHours()
                }:${time.getMinutes()} ${time.getHours() > 12 ? "PM" : "AM"}`}
              </Typography>
            </Stack>
            <Typography
              sx={{
                color: "rgba(0,0,0,0.65)",
                fontFamily: "lato",
                fontSize: "15px",
              }}
            >
              {messageProb.text}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
