import React, { useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Wireless Headphones", price: 99, quantity: 1 },
    { id: 2, name: "Smart Watch", price: 149, quantity: 2 },
  ]);

  // Calculate total cost
  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Add a new item
  const addItem = () => {
    const newItem = {
      id: cartItems.length + 1,
      name: `New Product ${cartItems.length + 1}`,
      price: Math.floor(Math.random() * 200) + 20,
      quantity: 1,
    };
    setCartItems([...cartItems, newItem]);
  };

  // Increase quantity
  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
          >
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price}</p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => decreaseQty(item.id)}
                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => increaseQty(item.id)}
                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between font-bold text-lg">
        <span>Total:</span>
        <span>${totalCost}</span>
      </div>

      <button
        onClick={addItem}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
      >
        Add Random Item
      </button>
    </div>
  );
};

export default Cart;