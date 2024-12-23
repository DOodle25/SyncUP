const express=require("express");
const verifyToken=require("../scripts/verifyToken");
const getUser = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.get("/user",verifyToken,getUser);

module.exports=userRouter;