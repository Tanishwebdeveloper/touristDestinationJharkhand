import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  order_id: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  guide: { type: mongoose.Schema.Types.ObjectId, ref: 'Guide' },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
  resort: { type: mongoose.Schema.Types.ObjectId, ref: 'Resort' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'EcommerceProduct' },
});

export default mongoose.model('Order', orderSchema);