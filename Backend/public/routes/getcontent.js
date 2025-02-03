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
const authmiddleware_1 = __importDefault(require("../middlewares/authmiddleware"));
const content_1 = __importDefault(require("../models/content"));
const GetContent = express_1.default.Router();
GetContent.get("/getcontent", authmiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({ message: "User ID not found" });
        }
        // Query the database to fetch content by userId
        const data = yield content_1.default.find({
            userId
        }).populate("userId", "username");
        // If no content is found, return a 404 response
        if (!data) {
            return res.status(404).json({ message: "Content not found" });
        }
        // Return the fetched content
        res.json({
            Content: data,
        });
    }
    catch (error) {
        // Handle errors and return a 500 response
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = GetContent;
