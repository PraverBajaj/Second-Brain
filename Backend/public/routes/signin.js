"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const usermodel_1 = __importDefault(require("../models/usermodel"));
const SigninRouter = express_1.default.Router();
SigninRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Validate input
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }
    try {
        // Find user by username
        const user = yield usermodel_1.default.findOne({ username });
        if (!user || !user.password) {
            return res.status(404).json({ error: "User not found" });
        }
        // Compare passwords
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }
        // Check if JWT secret is available
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ error: "JWT Secret not configured" });
        }
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        // Set the cookie properly
        return res
            .cookie("jwt", token, {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            secure: true, // Ensures the cookie is sent only over HTTPS
            sameSite: "none", // Required for cross-site requests (especially on iOS)
            path: "/", // Ensures the cookie is available across the entire site
        })
            .status(200)
            .json({ message: "Signin successful" });
    }
    catch (error) {
        console.error("Error during signin:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}));
exports.default = SigninRouter;
