import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDb=async()=>{
    try {
        // if(!process.env.MONGO_URL){
        //     throw new Error("MONGO URL is not defined in the env file ");
        // }
        await mongoose.connect(process.env.MONGO_URL);

        console.log("Database connected succesfully");
    } catch (error) {
        throw new Error(error);
    }
}

export default connectDb;