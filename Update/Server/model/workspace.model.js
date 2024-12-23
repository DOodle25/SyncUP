const mongoose=require("mongoose");
const {Schema}=require("mongoose");
const WorkspaceSchema=new Schema({
    name:String,
    channels:[{ type: Schema.Types.ObjectId, ref:"Channel" }],
    author:{type:Schema.Types.ObjectId,ref:"User"},
    doc:Date,
    users:[{type:Schema.Types.ObjectId,ref:"User"}]
})

const Workspace=mongoose.model("Workspace",WorkspaceSchema);

module.exports=Workspace;
