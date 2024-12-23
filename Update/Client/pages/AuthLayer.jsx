import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import { Navigate, useNavigate } from "react-router-dom";
import { ContextProvider } from "../src/components/ContextProvider";
import { socket, connectSocket } from "../src/socket";
import { useEffect, useState } from "react";
import axios from "axios";
import WorkspaceRedirect from "./WorkspaceRedirect";

export default function AuthLayer() {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      connectSocket()
        .then(() => {
          setIsConnected(true);
        })
        .catch((err) => {
          console.error("Error occurred while trying to connect socket:", err);
          setError(err);
        });
    }
    else{
      console.log("not signed in, sign in first");
      setError("not signed in, sign in first");
    }
  }, []);

  if (error) {
    console.log("error occured trying to connect to web socket",error);
    return <Navigate to={"/"}/>
  }

  if (!isConnected) {
    return <div>Connecting...</div>;
  }

  // return context provider and homeoutlet not homelayout and put homelayout as child, will possible work
  if (sessionStorage.getItem("token")) {
    return (
      <ContextProvider>
        <HomeLayout /> 
        {/* <WorkspaceRedirect/> */}
      </ContextProvider>
    );
  } else {
    return <Navigate to={"/"} />;
  }
}
