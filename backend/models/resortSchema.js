import mongoose from "mongoose";

const resortSchema = new mongoose.Schema({
  resort_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  days: { type: Number, required: true },
  cost: { type: Number, required: true },
  resort_description: { type: String },
  reviews: [{ type: String }],
});

export default mongoose.model('Resort', resortSchema);