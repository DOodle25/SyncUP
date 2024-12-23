import { useContext, useEffect } from "react";
import {ApplicationState} from "../src/components/ContextProvider";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";



export default function WorkspaceRedirect()
{
    const {workspaceArray} = useContext(ApplicationState);
    const navigate=useNavigate();
    useEffect(()=>
    {
        navigate(`/home/${workspaceArray[0].name}`);
    },[])
    
    return <Outlet/>;
}