import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//Online database connection
// const connectDb=async()=>{
//     try {
//         // if(!process.env.MONGO_URL){
//         //     throw new Error("MONGO URL is not defined in the env file ");
//         // }
//         await mongoose.connect(process.env.MONGO_URL);

//         console.log("Database connected succesfully");
//     } catch (error) {
//         throw new Error(error);
//     }
// }

// Local Database connection
const connectDb = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in .env file");
    }

    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDb;