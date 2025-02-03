"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./lib/db"));
const signup_1 = __importDefault(require("./routes/signup"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const signin_1 = __importDefault(require("./routes/signin"));
const addcontent_1 = __importDefault(require("./routes/addcontent"));
const getcontent_1 = __importDefault(require("./routes/getcontent"));
const share_1 = __importDefault(require("./routes/share"));
const cors_1 = __importDefault(require("cors"));
const delete_1 = __importDefault(require("./routes/delete"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "https://second-brain-rust.vercel.app",
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/user", signup_1.default);
app.use("/user", signin_1.default);
app.use("/user", addcontent_1.default);
app.use("/user", getcontent_1.default);
app.use("/user", share_1.default);
app.use("/user", delete_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
(0, db_1.default)();
