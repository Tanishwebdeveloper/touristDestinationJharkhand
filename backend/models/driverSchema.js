import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  driver_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  language: { type: String },
  days: { type: Number, required: true },
  cost: { type: Number, required: true },
  driver_description: { type: String },
  worked_with_clients: [{ type: String }],
  reviews: [{ type: String }],
});

export default mongoose.model('Driver', driverSchema);