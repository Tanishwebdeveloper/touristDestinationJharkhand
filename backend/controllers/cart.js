import Cart from "../models/cartSchema.js";
import Order from "../models/orderSchema.js";
import mongoose from "mongoose";
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

export const checkout = async (req, res) => {
  try {
    const userId = req.userid;
    const { location } = req.body;
    
    // Get the user's cart
    const cart = await Cart.findOne({ user: userId }).populate("items.item");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    
    // Create a new order
    const orderData = {
      order_id: uuidv4(),
      user: userId,
      location: location || "Online Purchase",
    };
    
    // Add items based on their type (only first item of each type)
    cart.items.forEach(item => {
      if (item.itemType === "Resort" && !orderData.resort) {
        orderData.resort = item.item._id;
      } else if (item.itemType === "Guide" && !orderData.guide) {
        orderData.guide = item.item._id;
      } else if (item.itemType === "Driver" && !orderData.driver) {
        orderData.driver = item.item._id;
      } else if (item.itemType === "EcommerceProduct" && !orderData.product) {
        orderData.product = item.item._id;
      }
    });
    
    // Create the order
    const Order = mongoose.model('Order');
    const newOrder = new Order(orderData);
    await newOrder.save();
    
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: "Error creating order", error: err.message });
  }
};