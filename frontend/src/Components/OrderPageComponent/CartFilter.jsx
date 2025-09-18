import React, { useState, useEffect } from "react";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function CartFilter() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the user's cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/cart",
          { withCredentials: true }
        );
        setCart(data);
      } catch (err) {
        console.error("Failed to load cart:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Remove one quantity or item entirely
  const handleRemove = async (item) => {
    try {
      const payload = {
        itemType: item.itemType,
        itemId: item.item._id,
        quantity: 1,
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/cart/remove",
        payload,
        { withCredentials: true }
      );
      setCart(data);
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  // Clear entire cart
  const handleClear = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/cart/clear",
        {},
        { withCredentials: true }
      );
      setCart({ ...cart, items: [] });
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (!cart || cart.items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">My Cart</h2>
      <ul className="space-y-4">
        {cart.items.map((item) => (
          <li
            key={`${item.itemType}-${item.item._id}`}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <XMarkIcon
                className="w-5 h-5 text-red-500 cursor-pointer"
                onClick={() => handleRemove(item)}
              />
              <span className="font-medium">{item.itemType}</span>
              <span>{item.item.name || item.item.product_name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Qty: {item.quantity}</span>
            </div>
          </li>
        ))}
      </ul>
      <button
        className="mt-6 w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        onClick={handleClear}
      >
        Clear Cart
      </button>
    </div>
  );
}