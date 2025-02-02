import mongoose, { Schema, model } from "mongoose";

const ContentSchema = new Schema({
    type:{type:String,enum:["document", "tweet" ,"youtube", "link" ,"other"]},
    link:String,
    title:String,
    subheading:String,
    payload:String,
    tags:[{type: mongoose.Types.ObjectId, ref:"tag"}],
    userId:{type:mongoose.Types.ObjectId, ref:"User",required:true},

},
    {timestamps:true}
)

const ContentModel = model("Content",ContentSchema)

export default ContentModel ;