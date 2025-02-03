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
const links_1 = __importDefault(require("../models/links"));
const randomhash_1 = __importDefault(require("../utils/randomhash"));
const content_1 = __importDefault(require("../models/content"));
const usermodel_1 = __importDefault(require("../models/usermodel"));
const ShareRoute = express_1.default.Router();
ShareRoute.post("/shareable", authmiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { share } = req.body;
        if (typeof share !== "boolean") {
            res.status(400).json({ error: "Invalid 'share' value. It should be a boolean." });
            return;
        }
        if (share == false) {
            yield links_1.default.deleteMany({ userId: req.userId });
            res.status(200).json({
                message: "Link disabled successfully",
            });
            return;
        }
        const user = yield links_1.default.findOne({
            userId: req.userId
        });
        if (user) {
            res.status(201).json({
                message: "Shareable link",
                param: user.hash,
            });
            return;
        }
        if (share) {
            const hash = (0, randomhash_1.default)(10);
            yield links_1.default.create({
                hash,
                userId: req.userId,
            });
            res.status(201).json({
                message: "Shareable link",
                hash,
            });
            return;
        }
    }
    catch (error) {
        console.error("Error creating shareable link:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
    }
}));
ShareRoute.get("/share/:hash", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hash } = req.params;
        const link = yield links_1.default.findOne({ hash });
        if (!link) {
            res.status(404).json({ error: "Link not found or has been disabled." });
            return;
        }
        const content = yield content_1.default.findOne({ userId: link.userId });
        const contentBy = yield usermodel_1.default.findById(link.userId);
        if (!contentBy) {
            res.status(404).json({ error: "User not found." });
            return;
        }
        res.status(200).json({
            username: contentBy.username,
            content,
        });
        return;
    }
    catch (error) {
        console.error("Error fetching shareable link details:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
    }
}));
exports.default = ShareRoute;
