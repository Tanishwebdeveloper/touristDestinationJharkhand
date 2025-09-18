import express from "express";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import connectDb from './config/dbconnect.js'
import cors from "cors";

configDotenv();

const app = express();
const port = process.env.port||5000;
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(cookieParser());
app.use(express.json()); //For local database

connectDb();

import resortRoutes from "./routes/resort.js";
import guideRoutes from "./routes/guide.js";
import orderRoutes from "./routes/order.js";
import driverRoutes from "./routes/driver.js";
import ecommerceProductRoutes from "./routes/ecommerceProduct.js";
import cartRoutes from "./routes/cart.js";
import userRoutes from "./routes/user.js";

app.use("/api/resorts", resortRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/products", ecommerceProductRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);

app.listen(port, ()=>{
   console.log(`Server is running on the port ${port} `);
});