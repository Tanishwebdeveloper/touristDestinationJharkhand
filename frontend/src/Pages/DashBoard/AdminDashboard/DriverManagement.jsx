// src/components/AdminDashboard/DriverManagement.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../common/Modal";
import Table from "../common/Table";
import { FaPenToSquare, FaCircleXmark } from "react-icons/fa6";

export default function DriverManagement() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    driver_id: "",
    name: "",
    language: "",
    days: "",
    cost: "",
    driver_description: ""
  });

  // Corrected effect
  useEffect(() => {
    fetchDrivers();
  }, []);

  async function fetchDrivers() {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/drivers", { withCredentials: true });
      setDrivers(data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(d) {
    setEditing(d);
    setFormData({
      driver_id: d.driver_id,
      name: d.name,
      language: d.language,
      days: d.days,
      cost: d.cost,
      driver_description: d.driver_description
    });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this driver?")) return;
    try {
      await axios.delete(`/api/drivers/${id}`, { withCredentials: true });
      setDrivers(drivers.filter(d => d._id !== id));
    } catch {
      alert("Failed to delete driver");
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/drivers/${editing._id}`,
        formData,
        { withCredentials: true }
      );
      setDrivers(drivers.map(d => (d._id === data._id ? data : d)));
      setEditing(null);
    } catch {
      alert("Failed to update driver");
    }
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Driver Management</h2>

      {editing && (
        <Modal onClose={() => setEditing(null)}>
          <h3 className="font-bold mb-2">Edit Driver</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              name="driver_id"
              value={formData.driver_id}
              onChange={handleChange}
              placeholder="ID"
              className="border p-2 rounded w-full"
              required
            />
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="border p-2 rounded w-full"
              required
            />
            <input
              name="language"
              value={formData.language}
              onChange={handleChange}
              placeholder="Language"
              className="border p-2 rounded w-full"
            />
            <input
              name="days"
              value={formData.days}
              onChange={handleChange}
              placeholder="Days"
              type="number"
              className="border p-2 rounded w-full"
              required
            />
            <input
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              placeholder="Cost"
              type="number"
              className="border p-2 rounded w-full"
              required
            />
            <textarea
              name="driver_description"
              value={formData.driver_description}
              onChange={handleChange}
              placeholder="Description"
              className="border p-2 rounded w-full"
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </form>
        </Modal>
      )}

      <Table loading={loading} columns={["ID","Name","Language","Days","Cost","Actions"]}>
        {drivers.map(d => (
          <tr key={d._id}>
            <td className="px-4 py-2">{d.driver_id}</td>
            <td className="px-4 py-2">{d.name}</td>
            <td className="px-4 py-2">{d.language}</td>
            <td className="px-4 py-2">{d.days}</td>
            <td className="px-4 py-2">₹{d.cost}</td>
            <td className="px-4 py-2 flex gap-2">
              <button onClick={() => handleEdit(d)}><FaPenToSquare/></button>
              <button onClick={() => handleDelete(d._id)}><FaCircleXmark/></button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}