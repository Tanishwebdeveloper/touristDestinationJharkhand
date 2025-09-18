// src/components/AdminDashboard/ResortManagement.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../common/Modal";
import Table from "../common/Table";
import { FaPenToSquare, FaCircleXmark } from "react-icons/fa6";

export default function ResortManagement() {
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ resort_id:"", name:"", type:"", days:"", cost:"", resort_description:"" });

  useEffect(() => {
    async function load() {
      await fetchResorts();
    }
    load();
  }, []);

  async function fetchResorts() {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/resorts", { withCredentials:true });
      setResorts(data);
    } catch {} finally { setLoading(false); }
  }
  function handleEdit(r) {
    setEditing(r);
    setFormData({
      resort_id: r.resort_id, name: r.name, type: r.type,
      days: r.days, cost: r.cost, resort_description: r.resort_description
    });
  }
  async function handleDelete(id) {
    if (!confirm("Delete this resort?")) return;
    await axios.delete(`/api/resorts/${id}`, { withCredentials:true });
    setResorts(resorts.filter(r=>r._id!==id));
  }
  function handleChange(e) { setFormData({...formData,[e.target.name]:e.target.value}); }
  async function handleUpdate(e) {
    e.preventDefault();
    const { data } = await axios.put(`/api/resorts/${editing._id}`, formData, { withCredentials:true });
    setResorts(resorts.map(r=>r._id===data._id?data:r));
    setEditing(null);
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Resort Management</h2>
      {editing && (
        <Modal onClose={()=>setEditing(null)}>
          <h3 className="font-bold mb-2">Edit Resort</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <input name="resort_id" value={formData.resort_id} onChange={handleChange} placeholder="ID" className="border p-2 rounded w-full" required/>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded w-full" required/>
            <input name="type" value={formData.type} onChange={handleChange} placeholder="Type" className="border p-2 rounded w-full"/>
            <input name="days" value={formData.days} onChange={handleChange} placeholder="Days" type="number" className="border p-2 rounded w-full" required/>
            <input name="cost" value={formData.cost} onChange={handleChange} placeholder="Cost" type="number" className="border p-2 rounded w-full" required/>
            <textarea name="resort_description" value={formData.resort_description} onChange={handleChange} placeholder="Description" className="border p-2 rounded w-full" rows={3}/>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={()=>setEditing(null)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
            </div>
          </form>
        </Modal>
      )}
      <Table loading={loading} columns={["ID","Name","Type","Days","Cost","Actions"]}>
        {resorts.map(r=>(
          <tr key={r._id}>
            <td className="px-4 py-2">{r.resort_id}</td>
            <td className="px-4 py-2">{r.name}</td>
            <td className="px-4 py-2">{r.type}</td>
            <td className="px-4 py-2">{r.days}</td>
            <td className="px-4 py-2">₹{r.cost}</td>
            <td className="px-4 py-2 flex gap-2">
              <button onClick={()=>handleEdit(r)}><FaPenToSquare/></button>
              <button onClick={()=>handleDelete(r._id)}><FaCircleXmark/></button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}