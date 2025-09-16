import mongoose from "mongoose";
import Driver from "../models/driverSchema.js";

const demoDrivers = [
  {
    driver_id: "driver1",
    name: "Suresh Verma",
    language: "Hindi",
    days: 10,
    cost: 15000,
    driver_description: "Experienced driver with excellent knowledge of local roads.",
    worked_with_clients: ["Global Travels", "Adventure Co."],
    reviews: ["Very safe driver.", "Friendly and punctual."],
  },
  {
    driver_id: "driver2",
    name: "Anita Shah",
    language: "English",
    days: 8,
    cost: 13000,
    driver_description: "Professional driver skilled in customer service and safety.",
    worked_with_clients: ["Luxury Tours", "City Travels"],
    reviews: ["Highly recommended.", "Excellent driving skills."],
  },
  {
    driver_id: "driver3",
    name: "Rajesh Kumar",
    language: "Jharkhandi",
    days: 12,
    cost: 14000,
    driver_description: "Local driver with good knowledge of hidden places and routes.",
    worked_with_clients: ["Mountain Explorers", "Heritage Tours"],
    reviews: ["Very knowledgeable.", "Safe and reliable driver."],
  }
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
    await Driver.deleteMany();
    await Driver.insertMany(demoDrivers);
    console.log("Demo driver data inserted successfully.");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error inserting demo data:", error);
    process.exit(1);
  }
};

importData();