import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import UserModel from "../models/usermodel";



const SigninRouter= express.Router();

SigninRouter.post("/signin", async (req, res): Promise<any> => {
    const { username, password } = req.body;
  
    try {
      // Find user by username
      const user = await UserModel.findOne({ username });
      if (!user || !user.password)  {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
      }
      if (!(process.env.JWT_SECRET)){
        return res.status(401).json({ error: "Invalid Jwt Password" });
      }
      const token = jwt.sign({Id: user._id},process.env.JWT_SECRET,
        {expiresIn:"1h"}
      )
      return res
      .cookie("jwt", token, {
        httpOnly: true,
        secure: true, 
        sameSite: "none", 
      })
      .status(200)
      .json({ message: "Signin successful" });
    
    } catch (error) {
      console.error("Error during signin:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  export default SigninRouter