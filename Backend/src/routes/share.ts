import express from "express";
import issignedin from "../middlewares/authmiddleware";
import LinksModel from "../models/links";
import random from "../utils/randomhash";
import ContentModel from "../models/content";
import UserModel from "../models/usermodel";

const ShareRoute = express.Router();

ShareRoute.post("/shareable", issignedin, async (req, res) => {
    try {
        const { share } = req.body;

        if (typeof share !== "boolean") {
            res.status(400).json({ error: "Invalid 'share' value. It should be a boolean." });
            return;
        }
        if(share==false){
            await LinksModel.deleteMany({ userId: (req as any).userId });

            res.status(200).json({
                message: "Link disabled successfully",
            });
            return;
        }
        const user=await LinksModel.findOne({
            userId:(req as any).userId
        })
        if(user){
            res.status(201).json({
            message: "Shareable link",
            param:user.hash,})
            return;
        }
        
        if (share) {
            const hash = random(10);
            await LinksModel.create({
                hash,
                userId: (req as any).userId,
            });

            res.status(201).json({
                message: "Shareable link",
                hash,
            });
            return;
        }

      
    } catch (error) {
        console.error("Error creating shareable link:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
    }
});

ShareRoute.get("/share/:hash", async (req, res) => {
    try {
        const { hash } = req.params;

        const link = await LinksModel.findOne({ hash });

        if (!link) {
            res.status(404).json({ error: "Link not found or has been disabled." });
            return;
        }

        const content = await ContentModel.findOne({ userId: link.userId });
        const contentBy = await UserModel.findById(link.userId);

        if (!contentBy) {
            res.status(404).json({ error: "User not found." });
            return;
        }

        res.status(200).json({
            username: contentBy.username,
            content,
        });
        return;
    } catch (error) {
        console.error("Error fetching shareable link details:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
    }
});

export default ShareRoute;
