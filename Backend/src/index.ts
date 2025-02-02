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

// Debugging: Log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.path}`);
    next();
});

// CORS Configuration
const corsOptions = {
    origin: "https://second-brain-76ea.vercel.app", // Allow only this frontend domain
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
};
app.use(cors(corsOptions));

// Handle OPTIONS preflight requests explicitly
app.options("*", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://second-brain-76ea.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.status(204).end();
    return 
});

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(express.json());
app.use(cookieParser());
app.use("/user", SignupRouter);
app.use("/user", SigninRouter);
app.use("/user", CreateUser);
app.use("/user", GetContent);
app.use("/user", ShareRoute);
app.use("/user",DeleteUser)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

connectToDatabase();
