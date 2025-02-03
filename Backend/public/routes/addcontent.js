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
const CreateUser = express_1.default.Router();
CreateUser.post("/addcontent", authmiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, link, title, tags, payload, subheading } = req.body;
    const userId = req.userId;
    yield content_1.default.create({
        tags,
        title,
        link,
        type,
        userId,
        payload,
        subheading,
    });
    res.send({
        message: "Content added successfully"
    });
}));
exports.default = CreateUser;
