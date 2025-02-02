import express from "express";
import ContentModel from "../models/content";
import issignedin from "../middlewares/authmiddleware";

const DeleteUser = express.Router();

DeleteUser.delete("/deletecontent",issignedin, async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
       res.status(400).json({ message: "Title is required" });
       return
    }

    const userId = (req as any).userId;
    if (!userId) {
     res.status(401).json({ message: "Unauthorized access" });
     return 
    }

    const result = await ContentModel.deleteOne({ title,userId});

    if (result.deletedCount === 0) {
       res.status(404).json({ message: "No matching content found" });
       return;
    }

    res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default DeleteUser;
