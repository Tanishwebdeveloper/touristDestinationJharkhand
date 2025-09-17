import express from "express";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import connectDb from './config/dbconnect.js'

configDotenv();

const app = express();
const port = process.env.port||5000;

app.use(cookieParser());
app.use(express.json()); //For local database

connectDb();

import resortRoutes from "./routes/resort.js";
import guideRoutes from "./routes/guide.js";
import orderRoutes from "./routes/order.js";
import driverRoutes from "./routes/driver.js";
import ecommerceProductRoutes from "./routes/ecommerceProduct.js";

app.use("/api/resorts", resortRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/products", ecommerceProductRoutes);

app.listen(port, ()=>{
   console.log(`Server is running on the port ${port} `);
});