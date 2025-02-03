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
const bcrypt_1 = __importDefault(require("bcrypt"));
const usermodel_1 = __importDefault(require("../models/usermodel"));
const zod_1 = require("zod");
const alreadyexist_1 = __importDefault(require("../utils/alreadyexist"));
const SignupRouter = express_1.default.Router();
// Define Zod schemas
const usernameSchema = zod_1.z
    .string()
    .min(4, { message: "Username must be at least 4 characters long" });
const passwordSchema = zod_1.z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }) // Minimum length
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }) // At least one uppercase letter
    .regex(/[\W_]/, { message: "Password must contain at least one special character" }); // At least one special character (non-alphanumeric)
// Signup endpoint
SignupRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (yield (0, alreadyexist_1.default)(username)) {
            return res.status(403).json("user already exists");
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Save user to the database
        yield usermodel_1.default.create({
            username,
            password: hashedPassword,
        });
        res.json({ message: "Signup successful" });
    }
    catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
exports.default = SignupRouter;
