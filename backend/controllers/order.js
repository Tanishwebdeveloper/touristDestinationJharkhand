import Order from "../models/orderSchema.js";
import { v4 as uuidv4 } from "uuid";

// Get all orders with optional filtering by user or other fields
export const getAllOrders = async (req, res) => {
  try {
    const filter = {};
    // Add filters from query if needed, e.g. user, guide, etc.
    const orders = await Order.find(filter)
      .populate('user', 'fullname')
      .populate('guide', 'name')
      .populate('driver', 'name')
      .populate('resort', 'name')
      .populate('product', 'name');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const newOrderData = {
      ...req.body,
      order_id: uuidv4()
    };
    const newOrder = new Order(newOrderData);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: "Error creating order", error: err.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: "Error updating order", error: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting order", error: err.message });
  }
};