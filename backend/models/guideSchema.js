import mongoose from "mongoose";

const guideSchema = new mongoose.Schema({
  guide_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  language: { type: String },
  days: { type: Number, required: true },
  cost: { type: Number, required: true },
  guide_description: { type: String },
  worked_with_clients: [{ type: String }],
  reviews: [{ type: String }],
});

export default mongoose.model('Guide', guideSchema);