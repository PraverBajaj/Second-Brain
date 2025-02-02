import mongoose, { Schema, model } from "mongoose";
import { string } from "zod";

const LinkSchema= new Schema({
    hash:String,
    userId:{type:mongoose.Types.ObjectId,ref:"User",required:true,unique:true}

})

const LinksModel= model("links",LinkSchema)

export default LinksModel;