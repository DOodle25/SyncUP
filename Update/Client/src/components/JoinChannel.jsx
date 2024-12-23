import { Button, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChannelList from "./ChannelList";

export default function JoinChannel() {
  return (
    <>
      <Stack
        sx={{
          backgroundColor: "rgba(255,255,255,0.98)",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack
          direction={"column"}
          gap={2}
          sx={{
            height: "100%",
            width: { xs: "100%", sm: "100%", md: "900px", lg: "900px" },
          }}
          boxSizing={"border-box"}
          padding={2}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              sx={{
                fontFamily: "lato",
                fontSize: "17px",
                fontWeight: 750,
                color: "rgba(0,0,0,0.8)",
              }}
            >
              All channels
            </Typography>
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
              Create channel
            </Button>
          </Stack>
          <TextField
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                height: "38px",
                backgroundColor: "white",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(0,0,0,0.85)",
                fontFamily: "lato",
                fontSize: "15px",
                fontWeight: 400,
              },
              fontSize: "18px",
              fontFamily: "lato",
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{ color: "rgba(0,0,0,0.5)", fontSize: "22px" }}
                    />
                  </InputAdornment>
                ),
              },
            }}
            placeholder="Search for channels"
          />
          <Stack direction={"column"} gap={1} width={"100%"}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack
                direction={"row"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                gap={1}
                flexWrap={"wrap"}
              >
                <Button
                  sx={{
                    height: "28px",
                    borderRadius: "6px",
                    color: "rgba(0,0,0,0.8)",
                    textTransform: "none",
                    fontFamily: "lato",
                    fontSize: "13px",
                    fontWeight: 600,
                    backgroundColor: "white",
                    border: "1px rgba(0,0,0,0.3) solid",
                  }}
                >
                  {"All channels"}
                  <KeyboardArrowDownIcon
                    sx={{ fontSize: "15px", color: "rgba(0,0,0,0.7)" }}
                  />
                </Button>
                <Button
                  sx={{
                    height: "28px",
                    borderRadius: "6px",
                    color: "rgba(0,0,0,0.8)",
                    textTransform: "none",
                    fontFamily: "lato",
                    fontSize: "13px",
                    fontWeight: 600,
                    backgroundColor: "white",
                    border: "1px rgba(0,0,0,0.3) solid",
                  }}
                >
                  {"Any channel type"}
                  <KeyboardArrowDownIcon
                    sx={{ fontSize: "15px", color: "rgba(0,0,0,0.7)" }}
                  />
                </Button>
                <Button
                  sx={{
                    height: "28px",
                    borderRadius: "6px",
                    color: "rgba(0,0,0,0.8)",
                    textTransform: "none",
                    fontFamily: "lato",
                    fontSize: "13px",
                    fontWeight: 600,
                    backgroundColor: "white",
                    border: "1px rgba(0,0,0,0.3) solid",
                  }}
                >
                  {"Organization"}
                  <KeyboardArrowDownIcon
                    sx={{ fontSize: "15px", color: "rgba(0,0,0,0.7)" }}
                  />
                </Button>
              </Stack>
              <Button
                sx={{
                  height: "28px",
                  borderRadius: "6px",
                  color: "rgba(0,0,0,0.8)",
                  textTransform: "none",
                  fontFamily: "lato",
                  fontSize: "13px",
                  fontWeight: 600,
                  backgroundColor: "white",
                  border: "0.5px rgba(0,0,0,0.3) solid",
                  flexShrink: 0,
                }}
              >
                {"A to Z"}
                <KeyboardArrowDownIcon
                  sx={{ fontSize: "15px", color: "rgba(0,0,0,0.7)" }}
                />
              </Button>
            </Stack>
            <Stack
              width={"100%"}
              borderRadius={"8px"}
              sx={{overflowY:"scroll"}}
              maxHeight={"700px"}
              direction={"column"}
              border={"0.5px rgba(0,0,0,0.3) solid"}
              boxSizing={"border-box"}
            >
                <ChannelList/>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
