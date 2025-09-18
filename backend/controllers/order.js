import Order from "../models/orderSchema.js";
import { v4 as uuidv4 } from "uuid";

// Get all orders (Admin) or user's orders (Tourist)
export const getAllOrders = async (req, res) => {
  try {
    const userRole = req.role;
    const userId = req.userid;
    
    let filter = {};
    
    // If not admin, only show user's own orders
    if (userRole !== "admin") {
      filter = { user: userId };
    }
    
    const orders = await Order.find(filter)
      .populate('user', 'FirstName LastName EmailAddress')
      .populate('guide', 'name language cost')
      .populate('driver', 'name language cost')
      .populate('resort', 'name type cost')
      .populate('product', 'product_name product_discounted_price')
      .sort({ createdAt: -1 });
      
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
};

// Get single order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'FirstName LastName EmailAddress')
      .populate('guide', 'name language cost guide_description')
      .populate('driver', 'name language cost guide_description')
      .populate('resort', 'name type cost days resort_description')
      .populate('product', 'product_name product_discounted_price product_description');
      
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    // Check if user can access this order (admin or owner)
    if (req.role !== "admin" && order.user._id.toString() !== req.userid) {
      return res.status(403).json({ message: "Access denied" });
    }
    
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Error fetching order", error: err.message });
  }
};

// Create new order (usually from cart checkout)
export const createOrder = async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      order_id: uuidv4(),
      user: req.userid
    };
    
    const newOrder = new Order(orderData);
    await newOrder.save();
    
    // Populate the created order
    const populatedOrder = await Order.findById(newOrder._id)
      .populate('user', 'FirstName LastName EmailAddress')
      .populate('guide', 'name language cost')
      .populate('driver', 'name language cost')
      .populate('resort', 'name type cost')
      .populate('product', 'product_name product_discounted_price');
      
    res.status(201).json(populatedOrder);
  } catch (err) {
    res.status(400).json({ message: "Error creating order", error: err.message });
  }
};

// Update order (Admin only)
export const updateOrder = async (req, res) => {
  try {
    if (req.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('user', 'FirstName LastName EmailAddress')
     .populate('guide', 'name language cost')
     .populate('driver', 'name language cost')
     .populate('resort', 'name type cost')
     .populate('product', 'product_name product_discounted_price');
     
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: "Error updating order", error: err.message });
  }
};

// Delete order (Admin only)
export const deleteOrder = async (req, res) => {
  try {
    if (req.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting order", error: err.message });
  }
};

// Get user's order statistics
export const getOrderStats = async (req, res) => {
  try {
    const userId = req.userid;
    const userRole = req.role;
    
    let matchStage = {};
    if (userRole !== "admin") {
      matchStage = { user: userId };
    }
    
    const stats = await Order.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          withGuide: { $sum: { $cond: [{ $ne: ["$guide", null] }, 1, 0] } },
          withDriver: { $sum: { $cond: [{ $ne: ["$driver", null] }, 1, 0] } },
          withResort: { $sum: { $cond: [{ $ne: ["$resort", null] }, 1, 0] } },
          withProduct: { $sum: { $cond: [{ $ne: ["$product", null] }, 1, 0] } }
        }
      }
    ]);
    
    res.json(stats[0] || { totalOrders: 0, withGuide: 0, withDriver: 0, withResort: 0, withProduct: 0 });
  } catch (err) {
    res.status(500).json({ message: "Error fetching order stats", error: err.message });
  }
};