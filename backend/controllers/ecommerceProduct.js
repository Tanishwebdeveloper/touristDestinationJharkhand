import EcommerceProduct from "../models/ecommerceSchema.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await EcommerceProduct.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const newProduct = new EcommerceProduct(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: "Failed to create product", error: error.message });
  }
};

// Update an existing product
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await EcommerceProduct.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Failed to update product", error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await EcommerceProduct.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete product", error: error.message });
  }
};