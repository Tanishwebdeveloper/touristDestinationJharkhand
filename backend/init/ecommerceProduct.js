import mongoose from "mongoose";
import EcommerceProduct from "../models/ecommerceSchema.js"; 

const demoProducts = [
  {
    product_id: "prod001",
    product_name: "Travel Backpack",
    product_real_price: 2500,
    product_discounted_price: 1999,
    product_description: "Durable waterproof backpack, perfect for trips and trekking.",
  },
  {
    product_id: "prod002",
    product_name: "Sun Protection Hat",
    product_real_price: 800,
    product_discounted_price: 699,
    product_description: "Wide-brimmed hat for maximum protection from sunlight.",
  },
  {
    product_id: "prod003",
    product_name: "Stainless Water Bottle",
    product_real_price: 600,
    product_discounted_price: 499,
    product_description: "Leak-proof, double insulated bottle for long-lasting freshness.",
  },
  {
    product_id: "prod004",
    product_name: "Camp Lantern",
    product_real_price: 1200,
    product_discounted_price: 999,
    product_description: "Rechargeable LED lantern for safe and bright camping nights.",
  },
  {
    product_id: "prod005",
    product_name: "Quick-Dry Towel",
    product_real_price: 400,
    product_discounted_price: 299,
    product_description: "Compact travel towel that dries fast, great for every journey.",
  },
];

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/jharkhandDarshan", {
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

    // Clear existing products to avoid duplicates
    await EcommerceProduct.deleteMany();

    // Insert demo products
    await EcommerceProduct.insertMany(demoProducts);

    console.log("Demo ecommerce products inserted successfully.");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error inserting demo data:", error);
    process.exit(1);
  }
};

importData();