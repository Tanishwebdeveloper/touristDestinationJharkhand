// guideInit.js

import mongoose from "mongoose";
import Guide from "../models/guideSchema.js";

// Connect to DB
const MONGO_URL = "mongodb://127.0.0.1:27017/jharkhandDarshan"; // update if needed

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("DB connected");
    return initGuides();
  })
  .catch((err) => {
    console.error("Failed to connect DB", err);
  });

async function initGuides() {
  // Sample data
  const guides = [
    {
      guide_id: "G101",
      name: "Rajesh Kumar",
      language: "Hindi",
      days: 5,
      cost: 8000,
      guide_description: "Expert in explaining Indian heritage and history. Friendly and knowledgeable.",
      worked_with_clients: ["Taj Adventures", "Global Travels"],
      reviews: ["Amazing guide!", "Very professional."],
    },
    {
      guide_id: "G102",
      name: "Shalini Mehta",
      language: "English",
      days: 3,
      cost: 6500,
      guide_description: "Specializes in eco-tourism and local culture immersion experiences.",
      worked_with_clients: ["EcoNature Tours"],
      reviews: ["Best local guide!", "Great storyteller."],
    },
    {
      guide_id: "G103",
      name: "Niraj Singh",
      language: "Jharkhandi",
      days: 4,
      cost: 7000,
      guide_description: "Fluent in local dialects and customs. Ensures a safe and memorable journey.",
      worked_with_clients: ["Jharkhand Wonders"],
      reviews: ["Knows every hidden gem!", "Highly recommended."],
    },
  ];

  try {
    await Guide.deleteMany({}); // Clear existing for clean init
    const inserted = await Guide.insertMany(guides);
    console.log("Sample guides inserted:", inserted.map(g => g.name));
  } catch (err) {
    console.error("Error inserting guides:", err);
  } finally {
    mongoose.disconnect();
  }
}
