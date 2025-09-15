import express from "express";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import connectDb from './config/dbconnect.js'
const app=express();
app.use(cookieParser());
configDotenv();
const PORT=process.env.PORT||5000;

connectDb();
app.listen(PORT,()=>{
   console.log(`Server is running on the port ${PORT} `);
});

