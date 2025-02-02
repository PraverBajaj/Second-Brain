import mongoose from "mongoose";

async function connectToDatabase() {
    try {
        if(!process.env.MongoUrl){
            throw new Error("MongoUrl not defined")
        }
        const connection = await mongoose.connect(
            process.env.MongoUrl);
        console.log("Database connected successfully:", connection.connection.host);
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit the process with failure
    }
}
export default connectToDatabase;