import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/usermodel";
import { z } from "zod";
import useralreadyexists from "../utils/alreadyexist";

const SignupRouter = express.Router();

// Define Zod schemas
const usernameSchema = z
  .string()
  .min(4, { message: "Username must be at least 4 characters long" })
 

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" }) // Minimum length
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }) // At least one uppercase letter
  .regex(/[\W_]/, { message: "Password must contain at least one special character" }); // At least one special character (non-alphanumeric)

// Signup endpoint
SignupRouter.post("/signup", async (req, res):Promise<any> => {
  const { username, password } = req.body;



  // Validate username and password
  const usernameValidation = usernameSchema.safeParse(username);
  const passwordValidation = passwordSchema.safeParse(password);

  if (!usernameValidation.success || !passwordValidation.success) {
    // Collect all validation errors
    const errors = [];
    if (!usernameValidation.success) {
      errors.push(...usernameValidation.error.errors.map(err => err.message));
    }
    if (!passwordValidation.success) {
      errors.push(...passwordValidation.error.errors.map(err => err.message));
    }

    // Respond with validation errors
    return res.status(400).json({ errors });
    
  }

try {

    if (await useralreadyexists(username)){
      return res.status(403).json("user already exists")
  }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    await UserModel.create({
      username,
      password: hashedPassword,
    });

    res.json({ message: "Signup successful" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default SignupRouter;
