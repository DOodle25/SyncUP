import { createContext, useEffect, useState } from "react";
import { socket, joinOldChannels } from "../../src/socket";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

export const ApplicationState = createContext();

export function ContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [messageArray, setMessageArray] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [channelArray, setChannelArray] = useState([]);
  const [workspaceArray, setWorkspaceArray] = useState([]);
  const [activeWorkspace, setActiveWorkspace] = useState("");
  const [coworkerArray, setCoworkerArray] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/workspaces", {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((workspaceData) => {
        if (workspaceData.data.status === true) {
          axios
            .get("http://localhost:3000/channels", {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            })
            .then((channelData) => {
              if (channelData.data.status === true) {
                axios
                  .post(
                    "http://localhost:3000/messages",
                    { channels: channelData.data.channels },
                    {
                      headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  )
                  .then((messageData) => {
                    if (messageData.data.status === true) {
                      joinOldChannels(channelData.data.channels);
                      setWorkspaceArray(workspaceData.data.workspaces);
                      setChannelArray(channelData.data.channels);
                      setMessageArray(messageData.data.messages);
                      setIsLoading(false);
                      setActiveTab(
                        channelData.data.channels.filter(
                          (item) =>
                            item.workspaceId ===
                            workspaceData.data.workspaces[0]._id
                        )[0].name
                      );
                      setActiveWorkspace(workspaceData.data.workspaces[0]);
                    } else {
                      console.log("could not fetch message");
                    }
                  })
                  .catch((err) => {
                    console.log("error occured while fetching messages");
                  });
              } else {
                console.log("could not fetch channels");
              }
            })
            .catch(() => {
              console.log("error occured while fetching channels");
            });
        } else {
          console.log("could not fetch workspaces");
        }
      })
      .catch(() => {
        console.log("error occured while fetching workspaces");
      });
  }, []);

  function handleMessageReceive(newMessage) {
    setMessageArray((prevMessages) => [...prevMessages, newMessage]);
  }

  function handleChannelJoin(newChannel) {
    setChannelArray((prevChannels) => [...prevChannels, newChannel]);
  }

  useEffect(() => {
    socket.on("receive-message", handleMessageReceive);
    socket.on("channel-joined", handleChannelJoin);

    return () => {
      socket.off("receive-message", handleMessageReceive);
      socket.off("channel-joined", handleChannelJoin);
    };
  }, []);

  return isLoading ? (
    <>
      {" "}
      <LoadingScreen />{" "}
    </>
  ) : (
    <ApplicationState.Provider
      value={{
        activeTab,
        setActiveTab,
        channelArray,
        messageArray,
        setChannelArray,
        setMessageArray,
        workspaceArray,
        setWorkspaceArray,
        activeWorkspace,
        setActiveWorkspace,
        coworkerArray,
        setCoworkerArray,
      }}
    >
      {children}
    </ApplicationState.Provider>
  );
}
