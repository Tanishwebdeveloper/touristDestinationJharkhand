// src/components/AdminDashboard/ProductManagement.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../common/Modal";
import Table from "../common/Table";
import { FaPenToSquare, FaCircleXmark } from "react-icons/fa6";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    product_id:"", product_name:"", product_real_price:"", product_discounted_price:"", product_description:""
  });

  useEffect(() => {
    async function load() {
      await fetchProducts();
    }
    load();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/products", { withCredentials:true });
      setProducts(data);
    } catch {} finally { setLoading(false); }
  }
  function handleEdit(p) {
    setEditing(p);
    setFormData({
      product_id: p.product_id,
      product_name: p.product_name,
      product_real_price: p.product_real_price,
      product_discounted_price: p.product_discounted_price,
      product_description: p.product_description
    });
  }
  async function handleDelete(id) {
    if (!confirm("Delete this product?")) return;
    await axios.delete(`/api/products/${id}`, { withCredentials:true });
    setProducts(products.filter(p=>p._id!==id));
  }
  function handleChange(e) { setFormData({...formData,[e.target.name]:e.target.value}); }
  async function handleUpdate(e) {
    e.preventDefault();
    const { data } = await axios.put(`/api/products/${editing._id}`, formData, { withCredentials:true });
    setProducts(products.map(p=>p._id===data._id?data:p));
    setEditing(null);
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Product Management</h2>
      {editing && (
        <Modal onClose={()=>setEditing(null)}>
          <h3 className="font-bold mb-2">Edit Product</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <input name="product_id" value={formData.product_id} onChange={handleChange} placeholder="ID" className="border p-2 rounded w-full" required/>
            <input name="product_name" value={formData.product_name} onChange={handleChange} placeholder="Name" className="border p-2 rounded w-full" required/>
            <input name="product_real_price" value={formData.product_real_price} onChange={handleChange} placeholder="Real Price" type="number" className="border p-2 rounded w-full" required/>
            <input name="product_discounted_price" value={formData.product_discounted_price} onChange={handleChange} placeholder="Discounted Price" type="number" className="border p-2 rounded w-full" required/>
            <textarea name="product_description" value={formData.product_description} onChange={handleChange} placeholder="Description" className="border p-2 rounded w-full" rows={3}/>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={()=>setEditing(null)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
            </div>
          </form>
        </Modal>
      )}
      <Table loading={loading} columns={["ID","Name","Real Price","Discounted Price","Actions"]}>
        {products.map(p=>(
          <tr key={p._id}>
            <td className="px-4 py-2">{p.product_id}</td>
            <td className="px-4 py-2">{p.product_name}</td>
            <td className="px-4 py-2">₹{p.product_real_price}</td>
            <td className="px-4 py-2">₹{p.product_discounted_price}</td>
            <td className="px-4 py-2 flex gap-2">
              <button onClick={()=>handleEdit(p)}><FaPenToSquare/></button>
              <button onClick={()=>handleDelete(p._id)}><FaCircleXmark/></button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}