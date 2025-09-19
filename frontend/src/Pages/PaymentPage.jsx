import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    transactionmode: "Card Payment", // Default transaction mode
  });

  useEffect(() => {
    // Get cart data from location state or fetch it
    if (location.state?.cart) {
      setCart(location.state.cart);
      setLoading(false);
    } else {
      // Fetch cart if not passed via state
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
    }
  }, [location.state]);  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // try {
    //   // Create order from cart items
    //   const orderData = {
    //     location: "Payment for items", // You can customize this
    //     items: cart.items.map(item => ({
    //       itemType: item.itemType,
    //       itemId: item.item._id,
    //       quantity: item.quantity
    //     }))
    //   };
      
    //   // Call the API to create order from cart
    //   const { data } = await axios.post(
    //     "http://localhost:5000/api/cart/checkout",
    //     orderData,
    //     { withCredentials: true }
    //   );
      
    //   // Clear the cart after successful order
    //   await axios.post("http://localhost:5000/api/cart/clear", {}, { withCredentials: true });
      
    //   // Navigate to dashboard with success message
    //   navigate("/dashboard", { 
    //     state: { 
    //       success: true, 
    //       message: "Payment successful! Your order has been placed." 
    //     } 
    //   });
    // } catch (err) {
    //   console.error("Payment failed:", err);
    //   alert("Payment failed. Please try again.");
    // }
    try {
      // Step 1: Process payment through your friend's payment service
      const paymentResponse = await axios.post(
        "http://localhost:5000/api/payment/createuserpayment",
        formData
      );

      if (!paymentResponse.data.success) {
        throw new Error("Payment processing failed");
      }

      // Step 2: Send payment confirmation email
      await axios.get(
        `http://localhost:5000/api/payment/senduserpaymentemail/${formData.email}`
      );

      // Step 3: Create order from cart items (your existing checkout logic)
      const orderData = {
        location: formData.address, // Use the provided address
        description: `Payment processed via ${formData.transactionmode}`,
      };

      const { data: orderResult } = await axios.post(
        "http://localhost:5000/api/cart/checkout",
        orderData,
        { withCredentials: true }
      );

      // Step 4: Clear the cart after successful order
      await axios.post("http://localhost:5000/api/cart/clear", {}, { withCredentials: true });

      // Step 5: Navigate to success page or dashboard
      navigate("/tourist", {
        state: {
          success: true,
          message: "Payment successful! Your order has been placed and confirmation email sent.",
          orderId: orderResult.order_id
        }
      });

    } catch (err) {
      console.error("Payment failed:", err);
      alert(err.response?.data?.message || "Payment failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate total cost
  const calculateTotal = () => {
    if (!cart || !cart.items || cart.items.length === 0) return 0;
    
    return cart.items.reduce((total, item) => {
      const cost = item.item.cost || item.item.price || 0;
      return total + cost * item.quantity;
    }, 0);
  };

  if (loading) return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;

  const totalCost = calculateTotal();  

  // return (
  //   <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  //     <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full flex flex-col md:flex-row overflow-hidden">
        
  //       {/* Left - Payment Form */}
  //       <div className="w-full md:w-2/3 p-8">
  //         <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
  //         <form onSubmit={handleSubmit} className="space-y-4">
            
  //           {/* Billing Info */}
  //           <div>
  //             <label className="block text-gray-700 mb-1">Full Name</label>
  //             <input
  //               type="text"
  //               name="name"
  //               value={formData.name}
  //               onChange={handleChange}
  //               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               required
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-gray-700 mb-1">Email</label>
  //             <input
  //               type="email"
  //               name="email"
  //               value={formData.email}
  //               onChange={handleChange}
  //               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               required
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-gray-700 mb-1">Address</label>
  //             <input
  //               type="text"
  //               name="address"
  //               value={formData.address}
  //               onChange={handleChange}
  //               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               required
  //             />
  //           </div>

  //           {/* Card Info */}
  //           <div>
  //             <label className="block text-gray-700 mb-1">Card Number</label>
  //             <input
  //               type="text"
  //               name="cardNumber"
  //               value={formData.cardNumber}
  //               onChange={handleChange}
  //               placeholder="1234 5678 9012 3456"
  //               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               required
  //             />
  //           </div>

  //           <div className="flex gap-4">
  //             <div className="flex-1">
  //               <label className="block text-gray-700 mb-1">Expiry</label>
  //               <input
  //                 type="text"
  //                 name="expiry"
  //                 value={formData.expiry}
  //                 onChange={handleChange}
  //                 placeholder="MM/YY"
  //                 className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  //                 required
  //               />
  //             </div>

  //             <div className="flex-1">
  //               <label className="block text-gray-700 mb-1">CVV</label>
  //               <input
  //                 type="text"
  //                 name="cvv"
  //                 value={formData.cvv}
  //                 onChange={handleChange}
  //                 placeholder="123"
  //                 className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  //                 required
  //               />
  //             </div>
  //           </div>

  //           <button
  //             type="submit"
  //             className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
  //           >
  //             Pay Now
  //           </button>
  //         </form>
  //       </div>

  //       {/* Right - Order Summary */}
  //       <div className="w-full md:w-1/3 bg-gray-50 p-8 border-l border-gray-200">
  //         <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
  //         <div className="space-y-4">
  //           {cart && cart.items && cart.items.map((item, index) => (
  //             <div key={index} className="flex justify-between">
  //               <span>{item.item.name || item.item.product_name || "Item"}</span>
  //               <span>₹{(item.item.cost || item.item.price || 0) * item.quantity}</span>
  //             </div>
  //           ))}
  //           <hr className="border-gray-300" />
  //           <div className="flex justify-between font-bold text-lg">
  //             <span>Total</span>
  //             <span>₹{totalCost.toFixed(2)}</span>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full flex flex-col md:flex-row overflow-hidden">
        
        {/* Left - Payment Form */}
        <div className="w-full md:w-2/3 p-8">
          <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={submitting}
              />
            </div>

            {/* Payment Method Selection */}
            <div>
              <label className="block text-gray-700 mb-1">Payment Method</label>
              <select
                name="transactionmode"
                value={formData.transactionmode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={submitting}
              >
                <option value="Card Payment">Card Payment</option>
                <option value="UPI">UPI</option>
                <option value="Net Banking">Net Banking</option>
                <option value="Wallet">Digital Wallet</option>
              </select>
            </div>

            {/* Card Details (show only for Card Payment) */}
            {formData.transactionmode === "Card Payment" && (
              <>
                <div>
                  <label className="block text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-gray-700 mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      disabled={submitting}
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength={4}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      disabled={submitting}
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {submitting ? "Processing Payment..." : `Pay ₹${totalCost.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Right - Order Summary */}
        <div className="w-full md:w-1/3 bg-gray-50 p-8 border-l border-gray-200">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4">
            {cart.items.map((item, index) => (
              <div key={index} className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium">{item.item.name || item.item.product_name || "Item"}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    ₹{((item.item.cost || item.item.price || item.item.product_discounted_price || 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            <hr className="border-gray-300" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{totalCost.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}