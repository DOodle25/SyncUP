const express=require("express")
const authRouter = express.Router();
const {auth,verifyOtp,signup} = require("../controllers/auth.controller");


authRouter.post("/verify-otp",verifyOtp);
authRouter.post("/signup",signup);
authRouter.post("/",auth);


module.exports=authRouter
