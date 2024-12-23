
const dotenv=require("dotenv");

const mongoose=require("mongoose");

if(process.env.NODE_ENV==="test")
{
  dotenv.config({path:".env.test"});
}
else
{
  dotenv.config();
}
mongoose.connect(process.env.MONGODB);

const db=mongoose.connection

db.on("open",()=>{console.log("connected")})
db.on('error', console.error.bind(console, 'connection error:'));

module.exports=db;