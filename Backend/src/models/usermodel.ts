import { Schema ,model } from "mongoose";

const UserScheme= new Schema({
    username:{type:String, unique:true, required:true},
    password:{type:String, required:true}
})

const UserModel = model("User",UserScheme)

export default UserModel;