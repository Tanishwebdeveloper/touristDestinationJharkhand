import React, { useState, useEffect } from "react";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function CartFilter() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/cart", { withCredentials: true });
        setCart(data);
      } catch (err) {
        console.error("Failed to load cart:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Remove one unit or remove item
  const handleRemove = async (item) => {
    try {
      const payload = {
        itemType: item.itemType,
        itemId: item.item._id,
        quantity: 1,
      };
      const { data } = await axios.post("http://localhost:5000/api/cart/remove", payload, { withCredentials: true });
      setCart(data);
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  // Clear entire cart
  const handleClear = async () => {
    try {
      await axios.post("http://localhost:5000/api/cart/clear", {}, { withCredentials: true });
      setCart({ ...cart, items: [] });
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  const handleProceedToPayment = () => {
    // Pass cart details via state or fetch directly in Payment page
    navigate("/payment", { state: { cart } });
  };  

  if (loading) return <p className="text-center py-10 text-gray-500">Loading your cart...</p>;

  if (!cart || cart.items.length === 0)
    return <p className="text-center py-10 text-gray-500 text-lg">Your cart is empty.</p>;

  // Calculate total cost (assumes each item has a cost field)
  // Adjust according to your schema, e.g. item.cost or item.price
  const totalCost = cart.items.reduce((total, item) => {
    const cost = item.item.cost || item.item.price || 0;
    return total + cost * item.quantity;
  }, 0);

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg my-10">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6 border-b pb-2">Your Shopping Cart</h2>
      <ul className="divide-y divide-gray-200">
        {cart.items.map(({ _id, itemType, item, quantity }) => (
          <li key={`${itemType}-${item._id}`} className="flex py-4 items-center gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={item.image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23cccccc'/%3E%3C/svg%3E"}
                alt={item.name || item.product_name || "Item Image"}
                className="object-contain max-h-full max-w-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-lg text-gray-900 truncate">{item.name || item.product_name || "Unnamed Item"}</p>
              <p className="text-gray-500 text-sm">Type: {itemType}</p>
              {item.days && <p className="text-gray-500 text-sm">Duration: {item.days} days</p>}
              <p className="text-gray-700 font-semibold">
                Price: ₹{item.cost ?? item.price ?? "N/A"}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-gray-600 mb-2">Qty: <span className="font-semibold">{quantity}</span></p>
              <button
                onClick={() => handleRemove({ itemType, item, quantity })}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                aria-label="Remove item"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-200">
        <p className="text-xl font-bold text-gray-900">Total: ₹{totalCost.toFixed(2)}</p>
        <button
          onClick={handleClear}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Clear Cart
        </button>
        {/* <p className="text-xl font-bold text-gray-900">Total: ₹{totalCost.toFixed(2)}</p> */}
        <button
          onClick={handleProceedToPayment}
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Proceed to Payment
        </button>
      </div>
    </section>
  );
}