import { ResizableBox } from "react-resizable";
import { Stack, Typography, Button, IconButton, Divider } from "@mui/material";
import { useState } from "react";
import "react-resizable/css/styles.css";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import AddIcon from "@mui/icons-material/Add";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import { RiShareForwardLine } from "react-icons/ri";

const customeHandle = (
  <span
    style={{
      width: "3px",
      position: "absolute",
      right: -1,
      top: 0,
      bottom: 0,
      cursor: "col-resize",
    }}
    className="custom-handle-right"
  ></span>
);
export default function CanvasLayout() {
  const [menuBarWidth, setMenuBarWidth] = useState(300);

  function handleResize(_, data) {
    setMenuBarWidth(data.size.width);
  }

  return (
    <>
      <Stack width={"100%"} height={"100%"} direction={"row"} id="home-outlet-canvas-root">
        <ResizableBox
          width={menuBarWidth}
          height={Infinity}
          axis="x"
          handle={customeHandle}
          minConstraints={[150, Infinity]}
          maxConstraints={[800, Infinity]}
          onResize={handleResize}
          id="home-outlet-canvas-left-container-root"
        >
          <Stack
            direction={"column"}
            alignItems={"center"}
            sx={{
              height: "100%",
              width: "100%",
            }}
            id="home-outlet-canvas-left-container"
          >
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              width={"100%"}
              alignItems={"center"}
              boxSizing={"border-box"}
              padding={1}
              id="home-outlet-canvas-left-container-header"
            >
              <Button
                sx={{
                  textTransform: "none",
                  fontFamily: "lato",
                  color: "#fff",
                  height: "36px",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  ":hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <Typography
                  sx={{ fontWeight: 600, fontFamily: "lato", fontSize: "18px" }}
                  noWrap
                >
                  Canvases
                </Typography>
              </Button>
              <Button
                sx={{
                  textTransform: "none",
                  fontFamily: "lato",
                  color: "#fff",
                  height: "36px",
                  width:"36px",
                  minWidth:"36px",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  ":hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <AddIcon sx={{fontSize:"18px"}}/>
              </Button>
            </Stack>
            <Stack
              direction={"column"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={1}
              id="home-outlet-canvas-left-container-tabs-container"
            >
                <Button
                sx={{
                  justifyContent: "flex-start",
                  color: "rgb(249,227,255,0.9)",
                  textTransform: "none",
                  gap: 1,
                  ":hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                  borderRadius: "8px",
                  height: "28px",
                }}
                id="home-outlet-canvas-left-container-all_canvases-tab"
              >
                <FileCopyOutlinedIcon sx={{fontSize:"18px"}}/>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontFamily: "lato",
                    fontWeight: "300",
                  }}
                  noWrap
                >
                  All canvases
                </Typography>
              </Button>
              <Button
                sx={{
                  justifyContent: "flex-start",
                  color: "rgb(249,227,255,0.9)",
                  textTransform: "none",
                  gap: 1,
                  ":hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                  borderRadius: "8px",
                  height: "28px",
                }}
                id="home-outlet-canvas-left-container-created_by_you-tab"
              >
                <PersonOutlineOutlinedIcon fontSize={"small"} opacity={0.9} />
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontFamily: "lato",
                    fontWeight: "300",
                  }}
                  noWrap
                >
                  Created by you
                </Typography>
              </Button>
              <Button
                sx={{
                  justifyContent: "flex-start",
                  color: "rgb(249,227,255,0.9)",
                  textTransform: "none",
                  gap: 1,
                  ":hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                  borderRadius: "8px",
                  height: "28px",
                }}
                id="home-outlet-canvas-left-container-shared_with_you-tab"
              >
                <RiShareForwardLine fontSize={"18px"}/>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontFamily: "lato",
                    fontWeight: "300",
                  }}
                  noWrap
                >
                  Shared with you
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </ResizableBox>
        <Stack
          sx={{ flex: 1, height: "100%", backgroundColor: "white" }}
          id="home-outlet-canvas-right-container-root"
        ></Stack>
      </Stack>
    </>
  );
}
