const mongoose=require("mongoose");
const OptSchema=new mongoose.Schema({
    code:String,
    destination:String
})

const Otp=mongoose.model("Otp",OptSchema);

module.exports=Otp;