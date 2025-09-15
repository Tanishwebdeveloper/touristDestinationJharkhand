import mongoose from "mongoose";

const ecommerceProductSchema = new mongoose.Schema({
  product_id: { type: String, required: true, unique: true },
  product_name: { type: String, required: true },
  product_real_price: { type: Number, required: true },
  product_discounted_price: { type: Number, required: true },
  product_description: { type: String, required: true },
});

export default mongoose.model('EcommerceProduct', ecommerceProductSchema);