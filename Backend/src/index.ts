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
app.use(cors({
    origin: "https://second-brain-rust.vercel.app", // add your frontend url here 
    credentials: true,
}));


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
