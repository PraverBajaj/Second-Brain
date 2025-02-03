import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/usermodel";

const SigninRouter = express.Router();

SigninRouter.post("/signin", async (req: Request, res: Response): Promise<any> => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        // Find user by username
        const user = await UserModel.findOne({ username });
        if (!user || !user.password) {
            return res.status(404).json({ error: "User not found" });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // Check if JWT secret is available
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ error: "JWT Secret not configured" });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Set the cookie properly
        return res
            .cookie("jwt", token, {
                httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                secure: true,   // Ensures the cookie is sent only over HTTPS
                sameSite: "none", // Required for cross-site requests (especially on iOS)
                path: "/",      // Ensures the cookie is available across the entire site
            })
            .status(200)
            .json({ message: "Signin successful" });

    } catch (error) {
        console.error("Error during signin:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default SigninRouter;
