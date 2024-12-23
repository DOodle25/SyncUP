const mongoose=require("mongoose");
const {Schema}=require("mongoose");

const messageSchema=new Schema({
    text:String,
    doc:Date,
    author:{ type: Schema.Types.ObjectId, ref: 'User' },
    name:String,
    channelId: { type: Schema.Types.ObjectId, ref: 'Channel' }
})

const Message=mongoose.model("Message",messageSchema);

module.exports=Message