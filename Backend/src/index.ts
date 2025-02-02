import express from "express";
import connectToDatabase from "./lib/db";
import SignupRouter from "./routes/signup";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import SigninRouter from "./routes/signin";
import CreateUser from "./routes/addcontent";
import GetContent from "./routes/getcontent";
import ShareRoute from "./routes/share";
import cors from "cors";
import DeleteUser from "./routes/delete";

dotenv.config();
const app = express();

const FRONTEND_URL = "https://second-brain-76ea.vercel.app";

// Manually set CORS headers for all responses
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", FRONTEND_URL);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

// CORS middleware
app.use(cors({
    origin: FRONTEND_URL,
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
}));

// Handle preflight requests explicitly
app.options("*", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", FRONTEND_URL);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.status(204).end();
    return 
});

// Middleware
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/user/signup", SignupRouter);
app.use("/user/signin", SigninRouter);
app.use("/user/create", CreateUser);
app.use("/user/content", GetContent);
app.use("/user/share", ShareRoute);
app.use("/user/delete", DeleteUser);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

// Connect to database
connectToDatabase();
