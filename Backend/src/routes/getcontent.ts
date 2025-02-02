import express from "express"
import issignedin from "../middlewares/authmiddleware";
import ContentModel from "../models/content";

const GetContent= express.Router();

GetContent.get("/getcontent",issignedin,async (req,res):Promise<any>=>{
    try{
    const userId= (req as any).userId
    if (!userId) {
        return res.status(400).json({ message: "User ID not found" });
      }
  
      // Query the database to fetch content by userId
      const data = await ContentModel.find(
        { 
        userId 
        }).populate("userId","username")
  
      // If no content is found, return a 404 response
      if (!data) {
        return res.status(404).json({ message: "Content not found" });
      }
  
      // Return the fetched content
      res.json({
        Content: data,
      });
    } catch (error) {
      // Handle errors and return a 500 response
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  export default GetContent;