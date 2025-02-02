import express from "express"
import ContentModel from "../models/content"
import issignedin from "../middlewares/authmiddleware"
const CreateUser= express.Router()
CreateUser.post("/addcontent",issignedin,async (req,res)=>{
    const { type, link ,title , tags ,payload ,subheading}= req.body
    const userId = (req as any).userId
    await ContentModel.create({
        tags,
        title,
        link,
        type,
        userId,
        payload,
        subheading,
    })
    res.send({
        message:"Content added successfully"
    })
})
export default CreateUser