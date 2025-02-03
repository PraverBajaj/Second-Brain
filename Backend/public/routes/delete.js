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
const content_1 = __importDefault(require("../models/content"));
const authmiddleware_1 = __importDefault(require("../middlewares/authmiddleware"));
const DeleteUser = express_1.default.Router();
DeleteUser.delete("/deletecontent", authmiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        if (!title) {
            res.status(400).json({ message: "Title is required" });
            return;
        }
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized access" });
            return;
        }
        const result = yield content_1.default.deleteOne({ title, userId });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: "No matching content found" });
            return;
        }
        res.status(200).json({ message: "Content deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = DeleteUser;
