// src/components/AdminDashboard/GuideManagement.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../common/Modal";
import Table from "../common/Table";
import { FaPenToSquare, FaCircleXmark } from "react-icons/fa6";

export default function GuideManagement() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    guide_id: "",
    name: "",
    language: "",
    days: "",
    cost: "",
    guide_description: "",
    worked_with_clients: "",
    reviews: "",
  });

  useEffect(() => {
    async function load() {
      await fetchGuides();
    }
    load();
  }, []);

  async function fetchGuides() {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/guides", { withCredentials: true });
      setGuides(data);
    } catch {
      console.error("Error fetching guides");
    }
    setLoading(false);
  }

  function handleEdit(g) {
    setEditing(g);
    setFormData({
      guide_id: g.guide_id,
      name: g.name,
      language: g.language,
      days: g.days,
      cost: g.cost,
      guide_description: g.guide_description,
      worked_with_clients: g.worked_with_clients?.join(", "),
      reviews: g.reviews?.join(", "),
    });
  }

  async function handleDelete(id) {
    if (!confirm("Delete this guide?")) return;
    await axios.delete(`/api/guides/${id}`, { withCredentials: true });
    setGuides(guides.filter(g => g._id !== id));
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const payload = {
      ...formData,
      worked_with_clients: formData.worked_with_clients.split(",").map(s => s.trim()),
      reviews: formData.reviews.split(",").map(s => s.trim()),
    };
    const { data } = await axios.put(`/api/guides/${editing._id}`, payload, { withCredentials: true });
    setGuides(guides.map(g => (g._id === data._id ? data : g)));
    setEditing(null);
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Guide Management</h2>
      {editing && (
        <Modal onClose={() => setEditing(null)}>
          <h3 className="font-bold mb-2">Edit Guide</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <input name="guide_id" value={formData.guide_id} onChange={handleChange} placeholder="Guide ID" className="w-full border p-2 rounded" required />
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded" required />
            <input name="language" value={formData.language} onChange={handleChange} placeholder="Language" className="w-full border p-2 rounded" />
            <input name="days" value={formData.days} onChange={handleChange} placeholder="Days" type="number" className="w-full border p-2 rounded" required />
            <input name="cost" value={formData.cost} onChange={handleChange} placeholder="Cost" type="number" className="w-full border p-2 rounded" required />
            <textarea name="guide_description" value={formData.guide_description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" rows={3} />
            <input name="worked_with_clients" value={formData.worked_with_clients} onChange={handleChange} placeholder="Worked With Clients" className="w-full border p-2 rounded" />
            <input name="reviews" value={formData.reviews} onChange={handleChange} placeholder="Reviews" className="w-full border p-2 rounded" />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
            </div>
          </form>
        </Modal>
      )}
      <Table loading={loading} columns={["ID","Name","Language","Days","Cost","Actions"]}>
        {guides.map(g => (
          <tr key={g._id}>
            <td className="px-4 py-2">{g.guide_id}</td>
            <td className="px-4 py-2">{g.name}</td>
            <td className="px-4 py-2">{g.language}</td>
            <td className="px-4 py-2">{g.days}</td>
            <td className="px-4 py-2">₹{g.cost}</td>
            <td className="px-4 py-2 flex gap-2">
              <button onClick={() => handleEdit(g)}><FaPenToSquare/></button>
              <button onClick={() => handleDelete(g._id)}><FaCircleXmark/></button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
);
}