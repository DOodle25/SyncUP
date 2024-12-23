const mongoose=require("mongoose");
const {Schema}=require("mongoose");

const userSchema=new Schema({
    email:String,
    workspaces:[{ type: Schema.Types.ObjectId, ref: 'Workspace' }],
    name:String,
    channels:[{type: Schema.Types.ObjectId, ref: 'Channel'}],
    doc:Date
})

const User=mongoose.model("User",userSchema);

module.exports=User
