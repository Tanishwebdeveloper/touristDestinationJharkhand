import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  itemType: {
    type: String,
    enum: ["Resort", "Guide", "Driver", "EcommerceProduct"],
    required: true
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "items.itemType"   // dynamically reference the correct collection
    // refPath: "itemType"
  },
  quantity: { type: Number, default: 1, min: 1 }
});

const cartSchema = new mongoose.Schema({
  cart_id: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  items: [cartItemSchema]
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);

// import mongoose from "mongoose";

// const cartItemSchema = new mongoose.Schema({
//   itemType: {
//     type: String,
//     enum: ["Resort", "Guide", "Driver", "EcommerceProduct"],
//     required: true
//   },
//   item: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     refPath: "itemType"   // Fixed: changed from "items.itemType" to "itemType"
//   },
//   quantity: { type: Number, default: 1, min: 1 }
// });

// const cartSchema = new mongoose.Schema({
//   cart_id: { type: String, required: true, unique: true },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
//   items: [cartItemSchema]
// }, { timestamps: true });

// export default mongoose.model("Cart", cartSchema);