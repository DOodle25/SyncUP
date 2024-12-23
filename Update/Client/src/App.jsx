import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import HomeLayout from "../layouts/HomeLayout";
import HomeSubLayout from "../layouts/HomeSubLayout";
import AutomationLayout from "../layouts/AutomationLayout";
import AuthLayer from "../pages/AuthLayer";
import Huddles from "./components/Huddles";
import CanvasLayout from "../layouts/CanvasLayout";
import ChannelLayout from "../layouts/ChannelLayout";
import Threads from "./components/Threads";
import JoinChannel from "./components/JoinChannel";
import VerifyOtp from "./components/VerifyOtp";
import CreateWorkspace from "./components/CreateWorkspace";
import GetName from "./components/GetName";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "/", element: <Signup /> },
        { path: "/signin", element: <Signin /> },
        { path:"/verify-otp", element: <VerifyOtp/>},
        { path:"/set-name", element: <GetName/>},
        { path:"/create-workspace", element: <CreateWorkspace/>}
      ],
    },
    {
      path: "/home",
      element: <AuthLayer/>, // AuthLayer ,consider this to be home layout when logged in
      children: [
        { path: "/home/automation", element: <AutomationLayout /> },
        { path: "/home/canvases", element: <CanvasLayout /> },
        { path: "/home/huddles", element: <Huddles /> },
        {
          path:"/home/joinchannel",
          element:<JoinChannel/>
        },
        {
          path: "/home",
          element: <HomeSubLayout />,
          children:[
            {
              path: "/home/channels/:channelId",
              element: <ChannelLayout />,
            },
            {
              path:"/home/",
              element:<Threads/>
            },
          ],
        },
      ],
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;
