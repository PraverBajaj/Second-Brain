"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const issignedin = (req, res, next) => {
    // Check if the token exists in cookies
    const token = req.cookies.jwt;
    if (!token) {
        res.status(401).json({
            message: "Unauthorized: No token provided",
        });
        return;
    }
    // Check if JWT_SECRET is configured
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        res.status(500).json({
            message: "Internal Server Error: JWT_SECRET is not configured",
        });
        return;
    }
    try {
        // Verify the JWT and decode its payload
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        // Attach the decoded user ID to the request object
        // @ts-ignore
        req.userId = decoded.Id;
        // Proceed to the next middleware
        next();
    }
    catch (error) {
        // Handle invalid or expired token
        res.status(403).json({
            message: "Forbidden: Invalid or expired token",
        });
        return;
    }
};
exports.default = issignedin;
