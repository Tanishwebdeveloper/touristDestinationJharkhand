import mongoose from "mongoose";
import dotenv from "dotenv";
import Order from "../models/orderSchema.js"; // update path if needed

dotenv.config();

const demoOrders = [
  {
    order_id: "order1",
    user: "64fab1234567890abcdef123",     // Replace with actual ObjectId strings from your Users collection
    location: "Mountain Valley",
    description: "Exploring the serene mountains",
    image: "https://example.com/mountain.jpg",
    guide: "64fab1234567890abcdef456",    // Actual Guide ObjectId
    driver: "64fab1234567890abcdef789",   // Actual Driver ObjectId
    resort: "64fab1234567890abcdefabc",   // Actual Resort ObjectId
    product: "64fab1234567890abcdefdef"   // Actual EcommerceProduct ObjectId
  },
  {
    order_id: "order2",
    user: "64fab1234567890abcdeffed",
    location: "Sunny Beach",
    description: "Relaxing beach vacation",
    image: "https://example.com/beach.jpg",
    guide: "64fab1234567890abcdef987",
    driver: "64fab1234567890abcdef654",
    resort: "64fab1234567890abcdef321",
    product: "64fab1234567890abcdef432"
  },
  {
    order_id: "order3",
    user: "64fab1234567890abcdef135",
    location: "Forest Retreat",
    description: "Get away to soothing forests",
    image: "https://example.com/forest.jpg",
    guide: "64fab1234567890abcdef246",
    driver: "64fab1234567890abcdef357",
    resort: "64fab1234567890abcdef468",
    product: "64fab1234567890abcdef579"
  }
];

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/jharkhandDarshan", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDb();

    // Clear existing orders to avoid duplicates
    await Order.deleteMany();

    // Insert demo orders
    await Order.insertMany(demoOrders);

    console.log("Demo order data inserted successfully.");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting demo data:", error);
    process.exit(1);
  }
};

importData();