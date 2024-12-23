const verifyToken=require("../scripts/verifyToken");
const express=require("express")
const {getWorkspaces,getCoworkers}=require("../controllers/workspace.controller");
const workspaceRouter = express.Router();

workspaceRouter.get("/",verifyToken,getWorkspaces);
workspaceRouter.post("/coworkers",verifyToken,getCoworkers);

module.exports=workspaceRouter;