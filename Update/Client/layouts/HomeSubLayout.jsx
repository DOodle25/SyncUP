import { ResizableBox } from "react-resizable";
import {
  Stack,
  Typography,
  Button,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Checkbox,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "react-resizable/css/styles.css";
import { FiEdit } from "react-icons/fi";
import { VscSend } from "react-icons/vsc";
import { BiMessageRoundedDetail } from "react-icons/bi";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import TagIcon from "@mui/icons-material/Tag";
import { Outlet, useNavigate } from "react-router-dom";
import { ApplicationState } from "../src/components/ContextProvider";
import { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { socket } from "../src/socket";
import axios from "axios";
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

export default function HomeSubLayout() {
  const [menuBarWidth, setMenuBarWidth] = useState(300);
  const [isAddDirectMessageActive, setIsAddDirectMessageActive] =
    useState(false);
  const [isChannelsExpanded, setIsChannelsExpanded] = useState(false);
  const [isDirectMessageExpanded, setIsDirectMessageExpanded] = useState(false);
  const navigate = useNavigate();
  const {
    channelArray,
    activeTab,
    setActiveTab,
    setChannelArray,
    workspaceArray,
    activeWorkspace,
    coworkerArray,
    setCoworkerArray,
  } = useContext(ApplicationState);
  const [addChannelMenuAnchor, setAddChannelMenuAnchor] = useState();
  const isAddChannelMenuOpen = Boolean(addChannelMenuAnchor);
  const [newChannelName, setNewChannelName] = useState("");
  const [newCoworkerEmail, setNewCoworkerEmail] = useState("");
  const [isAddChannelModalOpen, setIsAddChannelModalOpen] = useState(false);
  const [isAddCoworkerModalOpen, setIsAddCoworkerModalOpen] = useState(false);
  const [isAddCoworkerButtonLoading, setIsAddCoworkerButtonLoading] =
    useState(false);
  const [isAddNewChannelButtonLoading, setIsAddNewChannelButtonLoading] =
    useState(false);

  function handleAddChannelMenuOpen(event) {
    setAddChannelMenuAnchor(event.currentTarget);
  }

  function handleAddChannelMenuClose() {
    setAddChannelMenuAnchor(null);
  }

  function handleResize(_, data) {
    setMenuBarWidth(data.size.width);
  }

  function handleNewChannelNameChange(event) {
    setNewChannelName(event.target.value);
  }

  function handleCoworkerEmailChange(event) {
    setNewCoworkerEmail(event.target.value);
  }

  function handleChannelJoin(newChannel) {
    setIsAddNewChannelButtonLoading(false);
    setChannelArray((prevChannels) => [...prevChannels, newChannel]);
    setIsAddChannelModalOpen(false);
    setNewChannelName("");
  }
  function handleChannelCreationFailed(status) {
    console.log(status);
  }

  function handleCoworkerAddition() {
    setIsAddCoworkerButtonLoading(true);
    socket.emit(
      "add-coworker",
      sessionStorage.getItem("token"),
      activeWorkspace._id,
      newCoworkerEmail
    );
  }
  function handleCoworkerAdditionSuccess(newCoworker) {
    setIsAddCoworkerButtonLoading(false);
    setCoworkerArray((prevArray) => [...prevArray, newCoworker]);
    setIsAddCoworkerModalOpen(false);
    setNewCoworkerEmail("");
  }

  function handleCoworkerAdditionFailed(status) {
    console.log(status);
  }

  function handleNewChannelCreation() {
    setIsAddNewChannelButtonLoading(true);
    socket.emit(
      "create-new-channel",
      sessionStorage.getItem("token"),
      newChannelName,
      activeWorkspace._id
    );
  }
  useEffect(() => {
    axios
      .post(
        "http://localhost:3000/workspaces/coworkers",
        { workspaceId: activeWorkspace._id },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((coworkersData) => {
        setCoworkerArray(coworkersData.data.users);
        navigate(
          `/home/channels/${
            channelArray.filter(
              (item) => item.workspaceId === activeWorkspace._id
            )[0]._id
          }`
        );
      })
      .catch((err) => {
        console.log("error occured while fetching coworkers");
      });
  }, [activeWorkspace]);

  useEffect(() => {
    socket.on("new-channel-creation-failed", handleChannelCreationFailed);
    socket.on("add-coworker-success", handleCoworkerAdditionSuccess);
    socket.on("add-coworker-failed", handleCoworkerAdditionFailed);
    socket.on("new-channel-created", handleChannelJoin);
    return () => {
      socket.off("new-channel-creation-failed", handleChannelCreationFailed);
      socket.off("add-coworker-success", handleCoworkerAdditionSuccess);
      socket.off("add-coworker-failed", handleCoworkerAdditionFailed);
      socket.off("new-channel-created", handleChannelJoin);
    };
  }, []);

  return (
    <>
      <Stack
        width={"100%"}
        height={"100%"}
        direction={"row"}
        id="home-outlet-container"
      >
        <ResizableBox
          width={menuBarWidth}
          height={Infinity}
          axis="x"
          handle={customeHandle}
          minConstraints={[150, Infinity]}
          maxConstraints={[800, Infinity]}
          onResize={handleResize}
          id="home-outlet-left-container-root"
        >
          <Stack
            direction={"column"}
            alignItems={"center"}
            sx={{
              height: "100%",
              width: "100%",
            }}
            id="home-outlet-left-container"
          >
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              width={"100%"}
              alignItems={"center"}
              boxSizing={"border-box"}
              padding={1}
              id="home-outlet-left-container-header"
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
                  {activeWorkspace.name}
                </Typography>
                <KeyboardArrowDownIcon fontSize="12px" />
              </Button>
              <Button
                sx={{
                  width: "36px",
                  minWidth: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  ":hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <FiEdit fontSize={"20px"} color="#c4c4c4" />
              </Button>
            </Stack>
            <Stack
              direction={"column"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={1}
              id="home-outlet-left-container-tab-container"
            >
              <Button
                sx={{
                  justifyContent: "flex-start",
                  color:
                    activeTab === "threads"
                      ? "rgba(0,0,0,0.8)"
                      : "rgb(249,227,255,0.9)",
                  textTransform: "none",
                  backgroundColor:
                    activeTab === "threads" ? "#f9edff" : "transparent",
                  gap: 1,
                  ":hover": {
                    backgroundColor:
                      activeTab === "threads"
                        ? "#f9edff"
                        : "rgba(255,255,255,0.1)",
                  },
                  borderRadius: "8px",
                  height: "28px",
                }}
                id="home-outlet-left-container-threads-tab"
                onClick={() => {
                  setActiveTab("threads");
                  navigate("/home/");
                }}
              >
                <BiMessageRoundedDetail fontSize={"22px"} opacity={0.9} />
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontFamily: "lato",
                    fontWeight: "300",
                  }}
                  noWrap
                >
                  Threads
                </Typography>
              </Button>
              <Button
                sx={{
                  justifyContent: "flex-start",
                  color:
                    activeTab === "draft&sent"
                      ? "rgba(0,0,0,0.8)"
                      : "rgb(249,227,255,0.9)",
                  backgroundColor:
                    activeTab === "draft&sent" ? "#f9edff" : "transparent",
                  textTransform: "none",
                  gap: 1,
                  ":hover": {
                    backgroundColor:
                      activeTab === "draft&sent"
                        ? "#f9edff"
                        : "rgba(255,255,255,0.1)",
                  },
                  borderRadius: "8px",
                  height: "28px",
                }}
                id="home-outlet-left-container-draft_&_sent-tab"
                onClick={() => {
                  setActiveTab("draft&sent");
                }}
              >
                <VscSend fontSize={"20px"} />
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontFamily: "lato",
                    fontWeight: "300",
                  }}
                  noWrap
                >
                  Draft & sent
                </Typography>
              </Button>
            </Stack>
            <Stack
              direction={"column"}
              justifyContent={"center"}
              width={"100%"}
              padding={2}
              boxSizing={"border-box"}
              id="home-outlet-left-container-channels-dms-list"
            >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                id="home-outlet-left-container-channels-root"
              >
                <Stack
                  direction={"row"}
                  id="home-outlet-left-container-channels-header"
                >
                  <Button
                    sx={{
                      color: "rgb(249,227,255,0.9)",
                      textTransform: "none",
                      ":hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                      borderRadius: "6px",
                      height: "28px",
                      width: "28px",
                      minWidth: "28px",
                    }}
                    onClick={() => {
                      setIsChannelsExpanded(!isChannelsExpanded);
                    }}
                    id="home-outlet-left-container-channels-expand-btn"
                  >
                    <PlayArrowIcon fontSize="12px" />
                  </Button>
                  <Button
                    sx={{
                      color: "rgb(249,227,255,0.9)",
                      textTransform: "none",
                      ":hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                      borderRadius: "6px",
                      height: "28px",
                      fontFamily: "lato",
                      fontWeight: 300,
                    }}
                    id="home-outlet-left-container-channels-menu-btn"
                  >
                    Channels
                  </Button>
                </Stack>
              </Stack>
              {isChannelsExpanded ||
              channelArray
                .filter((item) => item.workspaceId === activeWorkspace._id)
                .map((item) => item.name)
                .includes(activeTab) ? (
                <Stack
                  direction={"column"}
                  width={"100%"}
                  id="home-outlet-left-container-channels-list-root"
                >
                  <Stack
                    width={"100%"}
                    boxSizing={"border-box"}
                    id="home-outlet-left-container-channels-list"
                  >
                    {channelArray
                      .filter(
                        (item) => item.workspaceId === activeWorkspace._id
                      )
                      .map((item) => (
                        <Button
                          key={item._id}
                          sx={{
                            gap: 1,
                            justifyContent: "flex-start",
                            backgroundColor:
                              activeTab === item.name
                                ? "#f9edff"
                                : "transparent",
                            textTransform: "none",
                            height: "28px",
                            ":hover": {
                              backgroundColor:
                                activeTab === item.name
                                  ? "#f9edff"
                                  : "rgba(255,255,255,0.1)",
                            },
                          }}
                          onClick={() => {
                            setActiveTab(item.name);
                            navigate(`/home/channels/${item._id}`);
                          }}
                        >
                          <TagIcon
                            fontSize="small"
                            sx={{
                              color:
                                activeTab === item.name
                                  ? "rgba(0,0,0,0.8)"
                                  : "rgb(249,227,255,0.9)",
                              fontWeight: 300,
                            }}
                          />
                          <Typography
                            sx={{
                              color:
                                activeTab === item.name
                                  ? "rgba(0,0,0,0.8)"
                                  : "rgb(249,227,255,0.9)",
                              fontSize: "15px",
                              fontFamily: "lato",
                              fontWeight: 300,
                            }}
                            noWrap
                          >
                            {item.name}
                          </Typography>
                        </Button>
                      ))}
                  </Stack>
                  <Button
                    sx={{
                      textTransform: "none",
                      color: "rgb(249,227,255,0.9)",
                      ":hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                      height: "28px",
                      justifyContent: "flex-start",
                      gap: 1,
                    }}
                    id="home-outlet-left-container-channel-add-btn"
                    onClick={handleAddChannelMenuOpen}
                  >
                    <Stack
                      sx={{
                        width: "18px",
                        height: "18px",
                        backgroundColor: "rgba(255,255,255,0.1)",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "4px",
                        flexShrink: 0,
                      }}
                    >
                      <AddIcon fontSize="10px" />
                    </Stack>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontFamily: "lato",
                        fontWeight: "300",
                      }}
                      noWrap
                    >
                      Add channels
                    </Typography>
                  </Button>
                </Stack>
              ) : (
                <></>
              )}
              <Stack
                direction={"row"}
                marginTop={1}
                justifyContent={"space-between"}
                onMouseEnter={() => {
                  setIsAddDirectMessageActive(true);
                }}
                onMouseLeave={() => {
                  setIsAddDirectMessageActive(false);
                }}
                overflow={"hidden"}
                id="home-outlet-left-container-dms-root"
              >
                <Stack
                  direction={"row"}
                  sx={{ flexShrink: 1 }}
                  id="home-outlet-left-container-dms-header"
                >
                  <Button
                    sx={{
                      color: "rgb(249,227,255,0.9)",
                      textTransform: "none",
                      ":hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                      borderRadius: "6px",
                      minWidth: "28px",
                      height: "28px",
                      width: "28px",
                      flexShrink: 0,
                    }}
                    onClick={() => {
                      setIsDirectMessageExpanded(!isDirectMessageExpanded);
                    }}
                    id="home-outlet-left-container-dms-expand-btn"
                  >
                    <PlayArrowIcon fontSize="12px" />
                  </Button>
                  <Button
                    sx={{
                      color: "rgb(249,227,255,0.9)",
                      textTransform: "none",
                      ":hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                      borderRadius: "6px",
                      height: "28px",
                      fontWeight: 300,
                      fontFamily: "lato",
                      flexShrink: 1,
                      minWidth: 0,
                    }}
                    id="home-outlet-left-container-dms-menu-btn"
                  >
                    <Typography
                      sx={{
                        color: "rgba(249,227,255,0.9)",
                        fontSize: "15px",
                        fontFamily: "lato",
                        fontWeight: 300,
                        flexShrink: 1,
                        flexGrow: 1,
                        whiteSpace: "nowrap",
                        minWidth: 0,
                      }}
                      noWrap
                    >
                      Direct messages
                    </Typography>
                  </Button>
                </Stack>
                <Button
                  sx={{
                    color: "rgb(249,227,255,0.9)",
                    textTransform: "none",
                    ":hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                    borderRadius: "6px",
                    minWidth: "28px",
                    height: "28px",
                    width: "28px",
                    flexShrink: 0,
                  }}
                  id="home-outlet-left-container-dms-add_dm-btn"
                >
                  {isAddDirectMessageActive ? (
                    <AddIcon fontSize="small" />
                  ) : (
                    <></>
                  )}
                </Button>
              </Stack>
              {isDirectMessageExpanded ? (
                <Stack
                  direction={"column"}
                  width={"100%"}
                  id="home-outlet-left-container-dms-list-root"
                >
                  <Stack
                    width={"100%"}
                    boxSizing={"border-box"}
                    id="home-outlet-left-container-dms-list"
                  >
                    {coworkerArray?.map((item) => (
                      <Button
                        key={`coworker${item._id}`}
                        sx={{
                          gap: 1,
                          justifyContent: "flex-start",
                          textTransform: "none",
                          height: "28px",
                          ":hover": {
                            backgroundColor: "rgba(255,255,255,0.1)",
                          },
                        }}
                      >
                        <Stack
                          sx={{
                            backgroundColor: "#c23b15",
                            width: "18px",
                            height: "18px",
                            color: "rgba(249,227,255,0.9)",
                            fontFamily: "lato",
                            fontSize: "10px",
                            borderRadius: "4px",
                            flexShrink: 0,
                          }}
                          justifyContent={"center"}
                          alignItems={"center"}
                        >
                          {item.name[0].toUpperCase()}
                        </Stack>
                        <Typography
                          sx={{
                            color: "rgba(249,227,255,0.9)",
                            fontSize: "15px",
                            fontFamily: "lato",
                            fontWeight: 300,
                          }}
                          noWrap
                        >
                          {item.name}
                        </Typography>
                      </Button>
                    ))}
                  </Stack>
                  <Button
                    sx={{
                      textTransform: "none",
                      color: "rgb(249,227,255,0.9)",
                      ":hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                      height: "28px",
                      justifyContent: "flex-start",
                      gap: 1,
                    }}
                    onClick={() => {
                      setIsAddCoworkerModalOpen(true);
                    }}
                  >
                    <Stack
                      sx={{
                        width: "18px",
                        height: "18px",
                        backgroundColor: "rgba(255,255,255,0.1)",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "4px",
                        flexShrink: 0,
                      }}
                    >
                      <AddIcon fontSize="10px" />
                    </Stack>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontFamily: "lato",
                        fontWeight: "300",
                      }}
                      noWrap
                    >
                      Add coworkers
                    </Typography>
                  </Button>
                </Stack>
              ) : (
                <></>
              )}
            </Stack>
          </Stack>
        </ResizableBox>
        <Stack
          sx={{ flex: 1, maxheight: "100%", backgroundColor: "white" }}
          id="home-outlet-right-container-root"
        >
          <Outlet />
        </Stack>
      </Stack>

      <Menu
        open={isAddChannelMenuOpen}
        onClose={handleAddChannelMenuClose}
        anchorEl={addChannelMenuAnchor}
      >
        <MenuItem
          onClick={() => {
            setIsAddChannelModalOpen(true);
            setAddChannelMenuAnchor(null);
          }}
        >
          <Typography
            sx={{
              fontFamily: "lato",
              fontWeight: 500,
              fontSize: "14px",
              padding: "0 10px",
            }}
          >
            Create a new Channel
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/home/joinchannel");
          }}
        >
          <Typography
            sx={{
              fontFamily: "lato",
              fontWeight: 500,
              fontSize: "14px",
              padding: "0 10px",
            }}
          >
            Browse channels
          </Typography>
        </MenuItem>
      </Menu>

      <Modal
        open={isAddChannelModalOpen}
        onClose={() => {
          setIsAddChannelModalOpen(false);
        }}
      >
        <Stack
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "100vw", sm: 500 },
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "8px",
            padding: 3,
            boxSizing: "border-box",
          }}
          direction={"column"}
          gap={2}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              sx={{
                fontFamily: "lato",
                fontSize: "20px",
                fontWeight: 650,
                color: "rgba(0,0,0,0.8)",
              }}
            >
              Create a channel
            </Typography>
            <Button
              sx={{
                width: "36px",
                minWidth: "36px",
                height: "36px",
                borderRadius: "8px",
                ":hover": {
                  backgroundColor: "rgba(0,0,0,0.1)",
                },
              }}
              onClick={() => {
                setIsAddChannelModalOpen(false);
              }}
            >
              <CloseIcon sx={{ color: "rgba(0,0,0,0.8)" }} />
            </Button>
          </Stack>
          <Typography
            sx={{
              fontFamily: "lato",
              fontSize: "14px",
              fontWeight: 550,
              color: "rgba(0,0,0,0.8)",
            }}
          >
            Name
          </Typography>
          <Stack direction={"column"}>
            <TextField
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  height: "46px",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#454245",
                  opacity: 0.75,
                },
                fontSize: "18px",
              }}
              placeholder="# e.g. plan-budget"
              id="auth-signin-inputfield-email"
              onChange={handleNewChannelNameChange}
              value={newChannelName}
            ></TextField>
            <Typography
              sx={{
                fontFamily: "lato",
                fontSize: "13px",
                fontWeight: 400,
                color: "rgba(0,0,0,0.6)",
              }}
            >
              Channels are where conversations happen around a topic. Use a name
              that is easy to find and understand.
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction={"row"} alignItems={"center"}>
              <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 15 } }} />
              <Typography
                sx={{
                  fontFamily: "lato",
                  fontSize: "15px",
                  fontWeight: 400,
                  color: "rgba(0,0,0,0.8)",
                }}
              >
                Invite external people
              </Typography>
            </Stack>
            <LoadingButton
              loading={isAddNewChannelButtonLoading}
              sx={{
                height: "36px",
                fontFamily: "lato",
                borderRadius: "8px",
                backgroundColor: "rgba(0,0,0,0.1)",
                color: "rgba(0,0,0,0.8)",
                textTransform: "none",
              }}
              onClick={handleNewChannelCreation}
            >
              Create
            </LoadingButton>
          </Stack>
        </Stack>
      </Modal>
      <Modal
        open={isAddCoworkerModalOpen}
        onClose={() => {
          setIsAddCoworkerModalOpen(false);
        }}
      >
        <Stack
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "100vw", sm: 500 },
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "8px",
            padding: 3,
            boxSizing: "border-box",
          }}
          direction={"column"}
          gap={2}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              sx={{
                fontFamily: "lato",
                fontSize: "20px",
                fontWeight: 650,
                color: "rgba(0,0,0,0.8)",
              }}
            >
              Add people to {activeWorkspace.name}
            </Typography>
            <Button
              sx={{
                width: "36px",
                minWidth: "36px",
                height: "36px",
                borderRadius: "8px",
                ":hover": {
                  backgroundColor: "rgba(0,0,0,0.1)",
                },
              }}
              onClick={() => {
                setIsAddCoworkerModalOpen(false);
              }}
            >
              <CloseIcon sx={{ color: "rgba(0,0,0,0.8)" }} />
            </Button>
          </Stack>
          <Typography
            sx={{
              fontFamily: "lato",
              fontSize: "14px",
              fontWeight: 550,
              color: "rgba(0,0,0,0.8)",
            }}
          >
            Email:
          </Typography>
          <Stack direction={"column"}>
            <TextField
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  height: "46px",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#454245",
                  opacity: 0.75,
                },
                fontSize: "18px",
              }}
              placeholder="name@gmail.com"
              id="auth-signin-inputfield-email"
              onChange={handleCoworkerEmailChange}
              value={newCoworkerEmail}
            ></TextField>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction={"row"} alignItems={"center"}>
              <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 15 } }} />
              <Typography
                sx={{
                  fontFamily: "lato",
                  fontSize: "15px",
                  fontWeight: 400,
                  color: "rgba(0,0,0,0.8)",
                }}
              >
                Invite external people
              </Typography>
            </Stack>
            <LoadingButton
              loading={isAddCoworkerButtonLoading}
              sx={{
                height: "36px",
                fontFamily: "lato",
                borderRadius: "8px",
                backgroundColor: "rgba(0,0,0,0.1)",
                color: "rgba(0,0,0,0.8)",
                textTransform: "none",
              }}
              onClick={handleCoworkerAddition}
            >
              Add
            </LoadingButton>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
}
