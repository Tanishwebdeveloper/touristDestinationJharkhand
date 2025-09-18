import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../common/Table";
import Modal from "../common/Modal";
import { FaPenToSquare, FaCircleXmark } from "react-icons/fa6";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ order_id: "", location: "", description: "" });

  useEffect(() => {
    async function load() {
      await fetchOrders();
    }
    load();
  }, []);
  
  async function fetchOrders() {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/orders", { withCredentials:true });
      setOrders(data);
    } finally { setLoading(false); }
  }

  function handleEdit(order) {
    setEditing(order);
    setFormData({ order_id: order.order_id, location: order.location, description: order.description || "" });
  }

  async function handleDelete(id) {
    if (!confirm("Delete this order?")) return;
    await axios.delete(`/api/orders/${id}`, { withCredentials:true });
    setOrders(orders.filter(o => o._id !== id));
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const { data } = await axios.put(`/api/orders/${editing._id}`, formData, { withCredentials:true });
    setOrders(orders.map(o => o._id === data._id ? data : o));
    setEditing(null);
    alert("Order updated");
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Order Management</h2>
      {editing && (
        <Modal onClose={() => setEditing(null)}>
          <h3 className="font-bold mb-2">Edit Order #{editing.order_id.slice(-6)}</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <input name="order_id" value={formData.order_id} onChange={e=>setFormData({...formData,[e.target.name]:e.target.value})} className="border p-2 rounded w-full"/>
            <input name="location" value={formData.location} onChange={e=>setFormData({...formData,[e.target.name]:e.target.value})} className="border p-2 rounded w-full"/>
            <textarea name="description" value={formData.description} onChange={e=>setFormData({...formData,[e.target.name]:e.target.value})} className="border p-2 rounded w-full" rows={3}/>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={()=>setEditing(null)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
            </div>
          </form>
        </Modal>
      )}
      <Table loading={loading} columns={["ID","User","Location","Items","Date","Actions"]}>
        {orders.map(order=>(
          <tr key={order._id} className="hover:bg-gray-100">
            <td className="px-4 py-2">{order.order_id.slice(-8)}</td>
            <td className="px-4 py-2">{order.user?.FirstName} {order.user?.LastName}</td>
            <td className="px-4 py-2">{order.location}</td>
            <td className="px-4 py-2">
              {order.resort && <span className="badge-blue">Resort</span>}
              {order.guide && <span className="badge-green">Guide</span>}
              {order.driver && <span className="badge-yellow">Driver</span>}
              {order.product && <span className="badge-purple">Product</span>}
            </td>
            <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
            <td className="px-4 py-2 flex gap-2">
              <button onClick={() => handleEdit(order)}><FaPenToSquare/></button>
              <button onClick={() => handleDelete(order._id)}><FaCircleXmark/></button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}