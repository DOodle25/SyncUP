const express=require("express")
const messageRouter = express.Router();
const verifyToken=require("../scripts/verifyToken");
const getMessages=require("../controllers/message.controller");

messageRouter.post("/",verifyToken,getMessages);
// getting all messages of the channel 
module.exports=messageRouter;