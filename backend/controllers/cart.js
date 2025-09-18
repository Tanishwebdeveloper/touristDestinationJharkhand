import Cart from "../models/cartSchema.js";
import { v4 as uuidv4 } from "uuid";

// Get or create the current user's cart
export const getOrCreateCart = async (req, res) => {
  const userId = req.userid;
  let cart = await Cart.findOne({ user: userId }).populate("items.item");
  if (!cart) {
    cart = await Cart.create({ cart_id: uuidv4(), user: userId, items: [] });
  }
  res.json(cart);
};

// Add an item to cart or update its quantity
export const addToCart = async (req, res) => {
  const { itemType, itemId, quantity = 1 } = req.body;
  const userId = req.userid;

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ cart_id: uuidv4(), user: userId, items: [] });
  }

  const existing = cart.items.find(i =>
    i.itemType === itemType && i.item.toString() === itemId
  );
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ itemType, item: itemId, quantity });
  }
  await cart.save();
  await cart.populate("items.item");
  res.json(cart);
};

// Remove an item or decrement its quantity
export const removeFromCart = async (req, res) => {
  const { itemType, itemId, quantity = 1 } = req.body;
  const userId = req.userid;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const idx = cart.items.findIndex(i =>
    i.itemType === itemType && i.item.toString() === itemId
  );
  if (idx === -1) return res.status(404).json({ message: "Item not in cart" });

  if (cart.items[idx].quantity > quantity) {
    cart.items[idx].quantity -= quantity;
  } else {
    cart.items.splice(idx, 1);
  }
  await cart.save();
  await cart.populate("items.item");
  res.json(cart);
};

// Clear the entire cart
export const clearCart = async (req, res) => {
  const userId = req.userid;
  const cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = [];
  await cart.save();
  res.json({ message: "Cart cleared" });
};