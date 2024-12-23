const mongoose=require("mongoose");
const {Schema}=require("mongoose");
const channelSchema=new Schema({
    name:String,
    messages:[{ type: Schema.Types.ObjectId, ref: 'Message' }],
    doc:Date,
    author:{ type: Schema.Types.ObjectId, ref: 'User' },
    workspaceId:{ type: Schema.Types.ObjectId, ref: 'Workspace' }
}
)

const Channel=mongoose.model("Channel",channelSchema);

module.exports=Channel;