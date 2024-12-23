import { Outlet, Link, useNavigate } from "react-router-dom";
import { Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HistoryIcon from "@mui/icons-material/History";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import HomeIcon from "@mui/icons-material/Home";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import HeadsetOutlinedIcon from "@mui/icons-material/HeadsetOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import { FiEdit } from "react-icons/fi";
import TagIcon from "@mui/icons-material/Tag";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { useState, useContext } from "react";
import { ApplicationState } from "../src/components/ContextProvider";

export default function HomeLayout() {
  const [moreMenuAnchor, setMoreMenuAnchor] = useState(null);
  const isMoreMenuOpen = Boolean(moreMenuAnchor);
  const [createMenuAnchor, setCreateMenuAnchor] = useState(null);
  const isCreateMenuOpen = Boolean(createMenuAnchor);
  const navigate = useNavigate();
  const [workspaceMenuAnchor, setWorkspaceMenuAnchor] = useState(null);
  const isWorkspaceMenuOpen = Boolean(workspaceMenuAnchor);

  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const isProfileMenuOpen = Boolean(profileMenuAnchor);
  const userName = sessionStorage.getItem("userName");
  const { workspaceArray,setActiveWorkspace } = useContext(ApplicationState);

  function handleMoreMenuOpen(event) {
    setMoreMenuAnchor(event.currentTarget);
  }

  function handleMoreMenuClose() {
    setMoreMenuAnchor(null);
  }

  function handleCreateMenuOpen(event) {
    setCreateMenuAnchor(event.currentTarget);
  }

  function handleCreateMenuClose() {
    setCreateMenuAnchor(null);
  }

  function handleProfileMenuOpen(event) {
    setProfileMenuAnchor(event.currentTarget);
  }

  function handleProfileMenuClose() {
    setProfileMenuAnchor(null);
  }

  function handleWorkspaceMenuOpen(event) {
    setWorkspaceMenuAnchor(event.currentTarget);
  }

  function handleWorkspaceMenuClose() {
    setWorkspaceMenuAnchor(null);
  }

  function handleSignOut() {
    sessionStorage.clear();
    navigate("/");
  }

  function handleWorkspaceChange(newWorkspace)
  {
    setActiveWorkspace(newWorkspace);
  }

  return (
    <>
      <Stack
        direction={"column"}
        sx={{
          backgroundImage: "linear-gradient(270deg,#410d42,#572759)",
          height: "100vh",
          width: "100vw",
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
          overflow: "hidden",
        }}
        flexGrow={0}
        id="home-root"
      >
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ backgroundColor: "transparent", height: "40px", width: "100%" }}
          id="home-header-container"
        >
          <IconButton id="home-header-backward-btn">
            <ArrowBackIcon
              sx={{ color: "#fff", fontSize: "20px", fontWeight: "300" }}
            />
          </IconButton>
          <IconButton id="home-header-forward-btn">
            <ArrowForwardIcon sx={{ color: "#fff", fontSize: "20px" }} />
          </IconButton>
          <IconButton id="home-header-history-btn">
            <HistoryIcon sx={{ color: "#fff", fontSize: "20px" }} />
          </IconButton>
          <Button
            sx={{
              width: "45%",
              backdropFilter: "blur(30)",
              backgroundColor: "rgba(255,255,255,0.3)",
              height: "28px",
              borderRadius: "6px",
              textTransform: "none",
              color: "#fff",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 1,
            }}
            id="home-header-search-btn"
          >
            <SearchIcon
              sx={{
                fontSize: "16px",
                strokeWidth: "0.1",
                stroke: "currentcolor",
              }}
            />
            <Typography
              sx={{ fontSize: "13px", fontFamily: "lato", fontWeight: "350" }}
            >
              Search
            </Typography>
          </Button>
          <IconButton
            sx={{ position: "absolute", right: "1px" }}
            id="home-header-help-btn"
          >
            <HelpOutlineOutlinedIcon sx={{ color: "#fff", fontSize: "20px" }} />
          </IconButton>
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            backgroundColor: "transparent",
            width: "100%",
            height: "calc(100vh - 40px)",
            padding: "0 3px 3px 0",
            boxSizing: "border-box",
          }}
          id="home-body-container"
        >
          <Stack
            direction={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"70px"}
            height={"100%"}
            zIndex={3}
            id="home-body-right-menu"
          >
            <Stack
              direction={"column"}
              gap={3}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{ margin: "10px 0" }}
              id="home-body-right-menu-top"
            >
              <Stack
                sx={{
                  backgroundColor: "#c5c3c7",
                  width: "36px",
                  height: "36px",
                  color: "black",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                justifyContent={"center"}
                alignItems={"center"}
                onClick={handleWorkspaceMenuOpen}
              >
                <Typography sx={{ fontSize: "20px" }}>
                  {workspaceArray[0].name.split(" ").length > 1
                    ? workspaceArray[0].name.split(" ")[0][0].toUpperCase() +
                      workspaceArray[0].name.split(" ")[0][1]
                    : workspaceArray[0].name.slice(0, 2).toUpperCase()}
                </Typography>
              </Stack>
              <Stack
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Button
                  variant="contained"
                  sx={{
                    width: "36px",
                    minWidth: "36px",
                    borderRadius: "8px",
                    height: "36px",
                    backdropFilter: "blur(30)",
                    backgroundColor: "rgba(255,255,255,0.3)",
                  }}
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  <HomeIcon />
                </Button>
                <Typography
                  fontSize={"11px"}
                  fontWeight={"450"}
                  fontFamily={"lato"}
                  color="#fff"
                >
                  Home
                </Typography>
              </Stack>
              <Stack
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Button
                  variant="contained"
                  sx={{
                    width: "36px",
                    minWidth: "36px",
                    height: "36px",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    borderRadius: "8px",
                    ":hover": {
                      backgroundColor: "rgba(255,255,255,0.3)",
                    },
                  }}
                  onClick={handleMoreMenuOpen}
                >
                  <MoreHorizIcon />
                </Button>
                <Typography
                  fontSize={"11px"}
                  fontWeight={"450"}
                  fontFamily={"lato"}
                  color="#fff"
                >
                  More
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={2}
              sx={{ padding: "0 0 15px 0" }}
              id="home-body-right-menu-bottom"
            >
              <Button
                sx={{
                  width: "36px",
                  height: "36px",
                  minWidth: "36px",
                  borderRadius: "50%",
                  backdropFilter: "blur(30)",
                  backgroundColor: "rgba(255,255,255,0.3)",
                }}
                variant="contained"
                onClick={handleCreateMenuOpen}
              >
                <AddIcon sx={{ color: "white" }} />
              </Button>
              <Stack
                sx={{
                  backgroundColor: "#c23b15",
                  width: "36px",
                  height: "36px",
                  color: "#fff",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                justifyContent={"center"}
                alignItems={"center"}
                onClick={handleProfileMenuOpen}
              >
                <Typography sx={{ fontSize: "18px", fontWeight: 300 }}>
                  {userName[0].toUpperCase()}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            sx={{
              height: "100%",
              width: "calc(100% - 70px)",
              boxShadow: "-5px 0px 400px 20px #390639",
              borderRadius: "6px",
              overflow: "hidden",
            }}
            id="home-body-outlet-root"
          >
            <Outlet />
          </Stack>
        </Stack>
      </Stack>

      <Menu
        anchorEl={moreMenuAnchor}
        open={isMoreMenuOpen}
        onClose={handleMoreMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "15px",
          },
          marginLeft: 2,
          transform: "translateY(-${menuHeight / 2}px)",
        }}
        id="home-body-more_menu"
      >
        <Typography
          sx={{
            margin: "5px 0 5px 10px",
            fontSize: "15px",
            fontFamily: "lato",
            fontWeight: "600",
          }}
        >
          More
        </Typography>
        <MenuItem>
          <Link to={"/home/automation"} style={{ textDecoration: "none" }}>
            <Stack
              direction={"row"}
              padding={"4px"}
              boxSizing={"border-box"}
              gap={1}
            >
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  height: "40px",
                  width: "40px",
                  backgroundColor: "rgba(194, 21, 171,0.1)",
                  borderRadius: "8px",
                }}
              >
                <PlayArrowOutlinedIcon fontSize="medium"></PlayArrowOutlinedIcon>
              </Stack>
              <Stack direction={"column"}>
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "lato",
                    fontSize: "15px",
                    fontWeight: 550,
                  }}
                >
                  Automations
                </Typography>
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "lato",
                    fontSize: "13px",
                    fontWeight: 380,
                  }}
                >
                  Create and find workflows and apps
                </Typography>
              </Stack>
            </Stack>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to={"/home/huddles"} style={{ textDecoration: "none" }}>
            <Stack
              direction={"row"}
              padding={"4px"}
              boxSizing={"border-box"}
              gap={1}
            >
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  height: "40px",
                  width: "40px",
                  backgroundColor: "rgba(194, 21, 171,0.1)",
                  borderRadius: "8px",
                }}
              >
                <HeadsetOutlinedIcon fontSize="small"></HeadsetOutlinedIcon>
              </Stack>
              <Stack direction={"column"}>
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "lato",
                    fontSize: "15px",
                    fontWeight: 550,
                  }}
                >
                  Huddles
                </Typography>
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "lato",
                    fontSize: "13px",
                    fontWeight: 380,
                  }}
                >
                  Colaborate and gather in real time
                </Typography>
              </Stack>
            </Stack>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to={"/home/canvases"} style={{ textDecoration: "none" }}>
            <Stack
              direction={"row"}
              padding={"4px"}
              boxSizing={"border-box"}
              gap={1}
            >
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  height: "40px",
                  width: "40px",
                  backgroundColor: "rgba(194, 21, 171,0.1)",
                  borderRadius: "8px",
                }}
              >
                <FileCopyOutlinedIcon fontSize="small"></FileCopyOutlinedIcon>
              </Stack>
              <Stack direction={"column"}>
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "lato",
                    fontSize: "15px",
                    fontWeight: 550,
                  }}
                >
                  Canvases
                </Typography>
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "lato",
                    fontSize: "13px",
                    fontWeight: 380,
                  }}
                >
                  Curate content and colaborate
                </Typography>
              </Stack>
            </Stack>
          </Link>
        </MenuItem>
        <Divider></Divider>
        <MenuItem>
          <Link to={"#"} style={{ textDecoration: "none" }}>
            <Stack
              direction={"row"}
              padding={"4px"}
              boxSizing={"border-box"}
              gap={1}
            >
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  height: "40px",
                  width: "40px",
                  backgroundColor: "rgba(194, 21, 171,0.1)",
                  borderRadius: "8px",
                }}
              >
                <CorporateFareOutlinedIcon fontSize="small" />
              </Stack>
              <Stack direction={"column"}>
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "lato",
                    fontSize: "15px",
                    fontWeight: 550,
                  }}
                >
                  External connections
                </Typography>
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "lato",
                    fontSize: "13px",
                    fontWeight: 350,
                  }}
                >
                  Work with people from different organizations
                </Typography>
              </Stack>
            </Stack>
          </Link>
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={createMenuAnchor}
        open={isCreateMenuOpen}
        onClose={handleCreateMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "15px",
          },
          marginLeft: 2,
          transform: "translateY(-${menuHeight / 2}px)",
        }}
        id="home-body-create_menu"
      >
        <Typography
          sx={{
            margin: "5px 0 5px 10px",
            fontSize: "15px",
            fontFamily: "lato",
            fontWeight: "600",
          }}
        >
          Create
        </Typography>
        <MenuItem>
          <Link to={"#"} style={{ textDecoration: "none" }}>
            <Stack
              direction={"row"}
              padding={"4px"}
              boxSizing={"border-box"}
              gap={1}
            >
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  height: "40px",
                  width: "40px",
                  backgroundColor: "rgba(194, 21, 171,0.1)",
                  borderRadius: "50%",
                }}
              >
                <FiEdit />
              </Stack>
              <Stack direction={"column"}>
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "lato",
                    fontSize: "15px",
                    fontWeight: 550,
                  }}
                >
                  Message
                </Typography>
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "lato",
                    fontSize: "13px",
                    fontWeight: 380,
                  }}
                >
                  Start a conversation in a DM or channel
                </Typography>
              </Stack>
            </Stack>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to={"#"} style={{ textDecoration: "none" }}>
            <Stack
              direction={"row"}
              padding={"4px"}
              boxSizing={"border-box"}
              gap={1}
            >
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  height: "40px",
                  width: "40px",
                  backgroundColor: "rgba(194, 21, 171,0.1)",
                  borderRadius: "50%",
                }}
              >
                <TagIcon />
              </Stack>
              <Stack direction={"column"}>
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "lato",
                    fontSize: "15px",
                    fontWeight: 550,
                  }}
                >
                  Channel
                </Typography>
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "lato",
                    fontSize: "13px",
                    fontWeight: 380,
                  }}
                >
                  Start a group conversation by topic
                </Typography>
              </Stack>
            </Stack>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to={"#"} style={{ textDecoration: "none" }}>
            <Stack
              direction={"row"}
              padding={"4px"}
              boxSizing={"border-box"}
              gap={1}
            >
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  height: "40px",
                  width: "40px",
                  backgroundColor: "rgba(194, 21, 171,0.1)",
                  borderRadius: "50%",
                }}
              >
                <HeadsetOutlinedIcon fontSize="small"></HeadsetOutlinedIcon>
              </Stack>
              <Stack direction={"column"}>
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "lato",
                    fontSize: "15px",
                    fontWeight: 550,
                  }}
                >
                  Huddle
                </Typography>
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "lato",
                    fontSize: "13px",
                    fontWeight: 380,
                  }}
                >
                  Start a video or audio chat
                </Typography>
              </Stack>
            </Stack>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to={"#"} style={{ textDecoration: "none" }}>
            <Stack
              direction={"row"}
              padding={"4px"}
              boxSizing={"border-box"}
              gap={1}
            >
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  height: "40px",
                  width: "40px",
                  backgroundColor: "rgba(194, 21, 171,0.1)",
                  borderRadius: "50%",
                }}
              >
                <FileCopyOutlinedIcon fontSize="small"></FileCopyOutlinedIcon>
              </Stack>
              <Stack direction={"column"}>
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "lato",
                    fontSize: "15px",
                    fontWeight: 550,
                  }}
                >
                  Canvas
                </Typography>
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "lato",
                    fontSize: "13px",
                    fontWeight: 380,
                  }}
                >
                  Curate content and colaborate
                </Typography>
              </Stack>
            </Stack>
          </Link>
        </MenuItem>
        <Divider></Divider>
        <MenuItem>
          <Link to={"#"} style={{ textDecoration: "none" }}>
            <Stack
              direction={"row"}
              padding={"4px"}
              boxSizing={"border-box"}
              gap={1}
            >
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                sx={{ height: "40px", width: "40px", borderRadius: "50%" }}
              >
                <PersonAddAlt1OutlinedIcon />
              </Stack>
              <Stack
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "lato",
                    fontSize: "15px",
                    fontWeight: 550,
                  }}
                >
                  Invite people
                </Typography>
              </Stack>
            </Stack>
          </Link>
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={profileMenuAnchor}
        open={isProfileMenuOpen}
        onClose={handleProfileMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "10px",
          },
          marginLeft: 2,
          transform: "translateY(-${menuHeight / 2}px)",
        }}
        id="home-body-profile_menu"
      >
        <Stack
          direction={"column"}
          gap={1}
          width={"100%"}
          padding={"5px 15px 5px 15px"}
          boxSizing={"border-box"}
        >
          <Stack
            direction={"row"}
            gap={1}
            alignItems={"center"}
            boxSizing={"border-box"}
          >
            <Stack
              sx={{
                backgroundColor: "#c23b15",
                width: "36px",
                height: "36px",
                color: "#fff",
                borderRadius: "8px",
              }}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography sx={{ fontSize: "18px", fontWeight: 300 }}>
                S
              </Typography>
            </Stack>
            <Stack direction={"column"}>
              <Typography
                sx={{ fontSize: "15px", fontWeight: 650, fontFamily: "lato" }}
              >
                {sessionStorage.getItem("userName")[0].toUpperCase() +
                  sessionStorage.getItem("userName").slice(1)}
              </Typography>
              <Stack
                direction={"row"}
                alignItems={"center"}
                sx={{ color: "lightgreen" }}
                gap={1}
              >
                <FiberManualRecordIcon fontSize="10px" />
                <Typography
                  sx={{
                    color: "rgba(0,0,0)",
                    fontFamily: "lato",
                    fontSize: "12px",
                    fontWeight: 380,
                  }}
                >
                  Active
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <Button
              variant="outlined"
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                gap: 1,
                borderColor: "rgba(0,0,0,0.1)",
                ":hover": {
                  borderColor: "rgba(0,0,0,0.8)",
                },
                boxSizing: "border-box",
              }}
            >
              <SentimentSatisfiedAltIcon />
              <Typography
                sx={{
                  fontFamily: "lato",
                  fontSize: "15px",
                  color: "rgba(0,0,0,0.8)",
                }}
              >
                Update your status
              </Typography>
            </Button>
          </Stack>
        </Stack>
        <MenuItem>
          <Typography
            sx={{
              fontFamily: "lato",
              fontSize: "15px",
              color: "rgba(0,0,0,0.8)",
            }}
          >
            Set yourself <strong>away</strong>
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography
            sx={{
              fontFamily: "lato",
              fontSize: "15px",
              color: "rgba(0,0,0,0.8)",
            }}
          >
            Pause notification
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <Typography
            sx={{
              fontFamily: "lato",
              fontSize: "15px",
              color: "rgba(0,0,0,0.8)",
            }}
          >
            Profile
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography
            sx={{
              fontFamily: "lato",
              fontSize: "15px",
              color: "rgba(0,0,0,0.8)",
            }}
          >
            Preferences
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSignOut}>
          <Typography
            sx={{
              fontFamily: "lato",
              fontSize: "15px",
              color: "rgba(0,0,0,0.8)",
            }}
          >
            Sign out of I don't care
          </Typography>
        </MenuItem>
      </Menu>

      <Menu
        open={isWorkspaceMenuOpen}
        onClose={handleWorkspaceMenuClose}
        anchorEl={workspaceMenuAnchor}
        sx={{
          margin: 1,
          "& .MuiPaper-root": {
            borderRadius: "15px",
          },
        }}
        id="home-body-workspace_menu"
      >
        {workspaceArray.map((item) => (
          <MenuItem key={item._id} onClick={()=>{handleWorkspaceChange(item)}}>
            <Stack direction={"column"}>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontFamily: "lato",
                  color: "rgba(0,0,0,0.9)",
                  fontWeight: 600,
                }}
              >
                {item.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  fontFamily: "lato",
                  color: "rgba(0,0,0,0.5)",
                }}
              >
                somerandomurl.slack.com
              </Typography>
            </Stack>
          </MenuItem>
        ))}
        <MenuItem>
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              sx={{
                height: "36px",
                width: "36px",
                backdropFilter: "blur(30)",
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: "8px",
              }}
            >
              <AddIcon />
            </Stack>
            <Typography
              sx={{
                fontSize: "15px",
                fontFamily: "lato",
                fontWeight: 450,
                color: "rgba(0,0,0,0.8)",
              }}
            >
              Add a workspace
            </Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  );
}
