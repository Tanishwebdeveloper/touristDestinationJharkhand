import mongoose from "mongoose";
import dotenv from "dotenv";
import Resort from "../models/resortSchema.js"; // Update the path if needed

dotenv.config();

const demoResorts = [
  {
    resort_id: "resort1",
    name: "Maldives Paradise Resort",
    type: "Beach",
    days: 5,
    cost: 25499,
    resort_description: "Escape to crystal-clear waters, private villas, and world-class luxury.",
    reviews: ["Amazing!", "Best trip ever!"],
  },
  {
    resort_id: "resort2",
    name: "Mountain Escape Lodge",
    type: "Mountain",
    days: 7,
    cost: 18500,
    resort_description: "Experience serenity in the heart of the mountains.",
    reviews: ["Peaceful and beautiful.", "Highly recommended!"],
  },
  {
    resort_id: "resort3",
    name: "Island Retreat",
    type: "Island",
    days: 6,
    cost: 22000,
    resort_description: "Enjoy secluded beaches and vibrant marine life.",
    reviews: ["So relaxing!", "Great for couples."],
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

    // Clear existing resorts to avoid duplicates
    await Resort.deleteMany();

    // Insert demo resorts
    await Resort.insertMany(demoResorts);

    console.log("Demo resort data inserted successfully.");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting demo data:", error);
    process.exit(1);
  }
};

importData();