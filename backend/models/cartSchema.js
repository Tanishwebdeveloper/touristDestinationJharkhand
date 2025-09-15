import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  cart_id: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EcommerceProduct' }],
});

export default mongoose.model('Cart', cartSchema);