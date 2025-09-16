// src/App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUsers,
  FaUserPlus,
  FaUserMinus,
  FaEye,
  FaPenToSquare,
  FaGear,
  FaStar,
  FaLocationDot,
  FaCircleCheck,
  FaCircleXmark,
} from "react-icons/fa6";

export default function AdminDashBoard() {
  const [activeSection, setActiveSection] = useState("user-management");


  // Resort Section
  const [resorts, setResorts] = useState([]);
  const [loadingResorts, setLoadingResorts] = useState(false);
  const [editingResort, setEditingResort] = useState(null); // resort being edited
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (activeSection === "destinations") {
      fetchResorts();
    }
  }, [activeSection]);

  const fetchResorts = async () => {
    setLoadingResorts(true);
    try {
      const { data } = await axios.get("/api/resorts");
      setResorts(data);
    } catch (error) {
      console.error("Error fetching resorts", error);
    }
    setLoadingResorts(false);
  };

  const handleEditClick = (resort) => {
    setEditingResort(resort);
    setFormData({
      name: resort.name,
      type: resort.type,
      days: resort.days,
      cost: resort.cost,
      resort_description: resort.resort_description,
    });
  };

  const handleDeleteClick = async (resortId) => {
    if (window.confirm("Are you sure to delete this resort?")) {
      try {
        await axios.delete(`/api/resorts/${resortId}`);
        setResorts(resorts.filter((r) => r._id !== resortId));
      } catch (error) {
        alert("Failed to delete resort");
      }
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/resorts/${editingResort._id}`, formData);
      setResorts(resorts.map((r) => (r._id === data._id ? data : r)));
      setEditingResort(null);
      alert("Resort updated successfully");
    } catch (error) {
      alert("Failed to update resort");
    }
  };

  //Create new Resort
  const [newResortData, setNewResortData] = useState({
    name: "",
    type: "",
    days: "",
    cost: "",
    resort_description: "",
  });

  const handleNewInputChange = (e) => {
    setNewResortData({ ...newResortData, [e.target.name]: e.target.value });
  };

  const handleCreateResort = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/resorts", newResortData);
      setResorts([...resorts, data]); // Add new resort to list
      setNewResortData({ name: "", type: "", days: "", cost: "", resort_description: "" });
      alert("Resort created successfully");
    } catch (error) {
      alert("Failed to create resort");
    }
  };

  //Guide Section
  const [guides, setGuides] = useState([]);
  const [loadingGuides, setLoadingGuides] = useState(false);
  const [editingGuide, setEditingGuide] = useState(null);
  const [guideFormData, setGuideFormData] = useState({});

  useEffect(() => {
    if (activeSection === "guides") {
      fetchGuides();
    }
  }, [activeSection]);

  const fetchGuides = async () => {
    setLoadingGuides(true);
    try {
      const { data } = await axios.get("/api/guides");
      setGuides(data);
    } catch (error) {
      console.error("Error fetching guides", error);
    }
    setLoadingGuides(false);
  };

  const handleGuideEditClick = (guide) => {
    setEditingGuide(guide);
    setGuideFormData({
      guide_id: guide.guide_id,
      name: guide.name,
      language: guide.language,
      days: guide.days,
      cost: guide.cost,
      guide_description: guide.guide_description,
      worked_with_clients: guide.worked_with_clients?.join(", "),
      reviews: guide.reviews?.join(", "),
    });
  };

  const handleGuideDeleteClick = async (guideId) => {
    if (window.confirm("Are you sure to delete this guide?")) {
      try {
        await axios.delete(`/api/guides/${guideId}`);
        setGuides(guides.filter(g => g._id !== guideId));
      } catch (error) {
        alert("Failed to delete guide");
      }
    }
  };

  const handleGuideFormChange = (e) => {
    setGuideFormData({ ...guideFormData, [e.target.name]: e.target.value });
  };

  const handleGuideUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...guideFormData, 
        worked_with_clients: guideFormData.worked_with_clients.split(",").map(s => s.trim()),
        reviews: guideFormData.reviews.split(",").map(s => s.trim()),
      };
      const { data } = await axios.put(`/api/guides/${editingGuide._id}`, updatedData);
      setGuides(guides.map(g => (g._id === data._id ? data : g)));
      setEditingGuide(null);
      alert("Guide updated successfully");
    } catch (error) {
      alert("Failed to update guide");
    }
  };

  // Create new guide
  const [newGuideData, setNewGuideData] = useState({
    guide_id: "",
    name: "",
    language: "",
    days: "",
    cost: "",
    guide_description: "",
    worked_with_clients: "",
    reviews: "",
  });

  const handleNewGuideInputChange = (e) => {
    setNewGuideData({ ...newGuideData, [e.target.name]: e.target.value });
  };

  const handleCreateGuide = async (e) => {
    e.preventDefault();
    try {
      const toSend = {
        ...newGuideData,
        worked_with_clients: newGuideData.worked_with_clients.split(",").map(s => s.trim()),
        reviews: newGuideData.reviews.split(",").map(s => s.trim()),
      };
      const { data } = await axios.post("/api/guides", toSend);
      setGuides([...guides, data]);
      setNewGuideData({
        guide_id: "",
        name: "",
        language: "",
        days: "",
        cost: "",
        guide_description: "",
        worked_with_clients: "",
        reviews: "",
      });
      alert("Guide created successfully");
    } catch (error) {
      alert("Failed to create guide");
    }
  };

  // State hooks for Drivers section
  const [drivers, setDrivers] = useState([]);
  const [loadingDrivers, setLoadingDrivers] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [driverFormData, setDriverFormData] = useState({
    driver_id: "",
    name: "",
    language: "",
    days: "",
    cost: "",
    guide_description: "",
    worked_with_clients: "",
    reviews: "",
  });

  // Fetch drivers when activeSection is "drivers"
  useEffect(() => {
    if (activeSection === "drivers") {
      fetchDrivers();
    }
  }, [activeSection]);

  const fetchDrivers = async () => {
    setLoadingDrivers(true);
    try {
      const { data } = await axios.get("/api/drivers");
      setDrivers(data);
    } catch (error) {
      console.error("Error fetching drivers", error);
    }
    setLoadingDrivers(false);
  };

  const handleDriverEditClick = (driver) => {
    setEditingDriver(driver);
    setDriverFormData({
      driver_id: driver.driver_id,
      name: driver.name,
      language: driver.language,
      days: driver.days,
      cost: driver.cost,
      guide_description: driver.guide_description,
      worked_with_clients: driver.worked_with_clients?.join(", "),
      reviews: driver.reviews?.join(", "),
    });
  };

  const handleDriverDeleteClick = async (driverId) => {
    if (window.confirm("Are you sure to delete this driver?")) {
      try {
        await axios.delete(`/api/drivers/${driverId}`);
        setDrivers(drivers.filter(d => d._id !== driverId));
      } catch (error) {
        alert("Failed to delete driver");
      }
    }
  };

  const handleDriverFormChange = (e) => {
    setDriverFormData({ ...driverFormData, [e.target.name]: e.target.value });
  };

  const handleDriverUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...driverFormData,
        worked_with_clients: driverFormData.worked_with_clients.split(",").map(s => s.trim()),
        reviews: driverFormData.reviews.split(",").map(s => s.trim()),
      };
      const { data } = await axios.put(`/api/drivers/${editingDriver._id}`, updatedData);
      setDrivers(drivers.map(d => (d._id === data._id ? data : d)));
      setEditingDriver(null);
      alert("Driver updated successfully");
    } catch (error) {
      alert("Failed to update driver");
    }
  };

  const [newDriverData, setNewDriverData] = useState({
    driver_id: "",
    name: "",
    language: "",
    days: "",
    cost: "",
    guide_description: "",
    worked_with_clients: "",
    reviews: "",
  });

  const handleNewDriverInputChange = (e) => {
    setNewDriverData({ ...newDriverData, [e.target.name]: e.target.value });
  };

  const handleCreateDriver = async (e) => {
    e.preventDefault();
    try {
      const toSend = {
        ...newDriverData,
        worked_with_clients: newDriverData.worked_with_clients.split(",").map(s => s.trim()),
        reviews: newDriverData.reviews.split(",").map(s => s.trim()),
      };
      const { data } = await axios.post("/api/drivers", toSend);
      setDrivers([...drivers, data]);
      setNewDriverData({
        driver_id: "",
        name: "",
        language: "",
        days: "",
        cost: "",
        guide_description: "",
        worked_with_clients: "",
        reviews: "",
      });
      alert("Driver created successfully");
    } catch (error) {
      alert("Failed to create driver");
    }
  };
  
  return (
    <div className="font-roboto bg-orange-50 text-gray-800 min-h-screen">
     
      {/* Dashboard */}
      <section className="bg-[#10101e] text-white rounded-2xl border-2 border-black h-64 mt-6 mx-6 p-6">
        <h2 className="text-xl font-semibold">Administrator Dashboard</h2>
        <p className="text-gray-400 text-sm mt-1">
          Comprehensive platform management and oversight
        </p>

        <div className="flex justify-around items-center mt-8">
          <div>
            <h2 className="text-2xl font-bold">2,847</h2>
            <p className="text-gray-400">Total Users</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">156</h2>
            <p className="text-gray-400">Active Partners</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-yellow-400">23</h2>
            <p className="text-gray-400">Pending Approvals</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">48</h2>
            <p className="text-gray-400">Destinations</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">₹4.8M</h2>
            <p className="text-gray-400">Platform Revenue</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-green-500">98%</h2>
            <p className="text-gray-400">System Health</p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="bg-gray-100 rounded-3xl flex justify-center gap-4 py-3 px-5 mt-6 mx-6">
        {["user-management", "approvals", "destinations", "guides", "drivers", "reports"].map(
          (item) => (
            <button
              key={item}
              onClick={() => setActiveSection(item)}
              className={`px-5 py-2 rounded-2xl transition ${
                activeSection === item
                  ? "bg-white text-black shadow"
                  : "hover:bg-gray-200"
              }`}
            >
              {item
                .replace("-", " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          )
        )}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg shadow p-6 mx-6 mt-4">
        {activeSection === "user-management" && (
          <div>
            <h2 className="text-lg font-bold mb-4">User Management</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white shadow p-4 rounded-lg">
                <h3 className="text-sm text-gray-500">Total Users</h3>
                <p className="text-2xl flex items-center gap-2 mt-2">
                  <FaUsers className="text-blue-500" /> 2,847
                </p>
                <small className="text-gray-500">+12% this month</small>
              </div>

              <div className="bg-white shadow p-4 rounded-lg">
                <h3 className="text-sm text-gray-500">Active Users</h3>
                <p className="text-2xl flex items-center gap-2 mt-2">
                  <FaUserPlus className="text-green-500" /> 2,651
                </p>
                <small className="text-gray-500">93% of total</small>
              </div>

              <div className="bg-white shadow p-4 rounded-lg">
                <h3 className="text-sm text-gray-500">Suspended Users</h3>
                <p className="text-2xl flex items-center gap-2 mt-2">
                  <FaUserMinus className="text-red-500" /> 28
                </p>
                <small className="text-gray-500">1% of total</small>
              </div>
            </div>
          </div>
        )}

        {activeSection === "approvals" && (
          <div>
            <h2 className="text-lg font-bold mb-4">Pending Approvals</h2>
            {/* Map approval items here */}
          </div>
        )}

        {activeSection === "destinations" && (
          <div>        
            <h2 className="text-lg font-bold mb-4">Destination Management</h2>
            {/* Map destinations here */}

            {/* Creating new Resort */}
              <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <h3 className="font-bold mb-2 text-lg">Add New Resort</h3>
                <form onSubmit={handleCreateResort} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
                  <input
                    name="name"
                    placeholder="Name"
                    value={newResortData.name}
                    onChange={handleNewInputChange}
                    required
                    className="border rounded px-3 py-2"
                  />
                  <input
                    name="type"
                    placeholder="Type"
                    value={newResortData.type}
                    onChange={handleNewInputChange}
                    required
                    className="border rounded px-3 py-2"
                  />
                  <input
                    name="days"
                    type="number"
                    placeholder="Days"
                    value={newResortData.days}
                    onChange={handleNewInputChange}
                    required
                    className="border rounded px-3 py-2"
                  />
                  <input
                    name="cost"
                    type="number"
                    placeholder="Cost"
                    value={newResortData.cost}
                    onChange={handleNewInputChange}
                    required
                    className="border rounded px-3 py-2"
                  />
                  <textarea
                    name="resort_description"
                    placeholder="Description"
                    value={newResortData.resort_description}
                    onChange={handleNewInputChange}
                    rows="3"
                    className="border rounded px-3 py-2 md:col-span-2"
                  ></textarea>
                  <button
                    type="submit"
                    className="md:col-span-2 bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700"
                  >
                    Create Resort
                  </button>
                </form>
              </div> 

              {/* Updating and Deleting current resorts */}
              {loadingResorts ? (
                <p>Loading resorts...</p>
              ) : (
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">Name</th>
                      <th className="border px-4 py-2">Type</th>
                      <th className="border px-4 py-2">Days</th>
                      <th className="border px-4 py-2">Cost</th>
                      <th className="border px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resorts.map((resort) => (
                      <tr key={resort._id} className="hover:bg-gray-100">
                        <td className="border px-4 py-2">{resort.name}</td>
                        <td className="border px-4 py-2">{resort.type}</td>
                        <td className="border px-4 py-2">{resort.days}</td>
                        <td className="border px-4 py-2">₹{resort.cost}</td>
                        <td className="border px-4 py-2 flex gap-2">
                          <button
                            onClick={() => handleEditClick(resort)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            <FaPenToSquare />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(resort._id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <FaCircleXmark />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Edit form modal or inline editor */}
              {editingResort && (
                <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Edit Resort: {editingResort.name}</h3>
                  <form onSubmit={handleUpdateSubmit} className="space-y-4 max-w-md">
                    <div>
                      <label className="block mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block mb-1">Type</label>
                      <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleFormChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block mb-1">Days</label>
                      <input
                        type="number"
                        name="days"
                        value={formData.days}
                        onChange={handleFormChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block mb-1">Cost</label>
                      <input
                        type="number"
                        name="cost"
                        value={formData.cost}
                        onChange={handleFormChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block mb-1">Description</label>
                      <textarea
                        name="resort_description"
                        value={formData.resort_description}
                        onChange={handleFormChange}
                        rows={4}
                        className="w-full px-3 py-2 border rounded"
                      ></textarea>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingResort(null)}
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Update
                      </button>
                    </div>
                  </form>
              </div>
            )}
          </div>
        )}

        {activeSection === "guides" && (
          <div>
            <h2 className="text-lg font-bold mb-4">Guide Management</h2>
        
            {/* Create new Guide form */}
            <div className="mb-6 p-4 border rounded-lg bg-gray-50 max-w-3xl">
              <h3 className="font-bold mb-2 text-lg">Add New Guide</h3>
              <form onSubmit={handleCreateGuide} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="guide_id"
                  placeholder="Guide ID"
                  value={newGuideData.guide_id}
                  onChange={handleNewGuideInputChange}
                  required
                  className="border rounded px-3 py-2"
                />
                <input
                  name="name"
                  placeholder="Name"
                  value={newGuideData.name}
                  onChange={handleNewGuideInputChange}
                  required
                  className="border rounded px-3 py-2"
                />
                <input
                  name="language"
                  placeholder="Language"
                  value={newGuideData.language}
                  onChange={handleNewGuideInputChange}
                  className="border rounded px-3 py-2"
                />
                <input
                  name="days"
                  type="number"
                  placeholder="Days"
                  value={newGuideData.days}
                  onChange={handleNewGuideInputChange}
                  required
                  className="border rounded px-3 py-2"
                />
                <input
                  name="cost"
                  type="number"
                  placeholder="Cost"
                  value={newGuideData.cost}
                  onChange={handleNewGuideInputChange}
                  required
                  className="border rounded px-3 py-2"
                />
                <textarea
                  name="guide_description"
                  placeholder="Description"
                  value={newGuideData.guide_description}
                  onChange={handleNewGuideInputChange}
                  rows="3"
                  className="border rounded px-3 py-2 md:col-span-2"
                />
                <input
                  name="worked_with_clients"
                  placeholder="Worked With Clients (comma separated)"
                  value={newGuideData.worked_with_clients}
                  onChange={handleNewGuideInputChange}
                  className="border rounded px-3 py-2 md:col-span-2"
                />
                <input
                  name="reviews"
                  placeholder="Reviews (comma separated)"
                  value={newGuideData.reviews}
                  onChange={handleNewGuideInputChange}
                  className="border rounded px-3 py-2 md:col-span-2"
                />
                <button
                  type="submit"
                  className="md:col-span-2 bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700"
                >
                  Create Guide
                </button>
              </form>
            </div>
        
            {/* Editing Guide */}
            {editingGuide && (
              <div className="mt-6 bg-gray-100 p-4 rounded-lg max-w-3xl">
                <h3 className="font-bold mb-2">Edit Guide: {editingGuide.name}</h3>
                <form onSubmit={handleGuideUpdateSubmit} className="space-y-4">
                  <input
                    name="guide_id"
                    placeholder="Guide ID"
                    value={guideFormData.guide_id}
                    onChange={handleGuideFormChange}
                    required
                    className="border rounded px-3 py-2"
                  />
                  <input
                    name="name"
                    placeholder="Name"
                    value={guideFormData.name}
                    onChange={handleGuideFormChange}
                    required
                    className="border rounded px-3 py-2"
                  />
                  <input
                    name="language"
                    placeholder="Language"
                    value={guideFormData.language}
                    onChange={handleGuideFormChange}
                    className="border rounded px-3 py-2"
                  />
                  <input
                    name="days"
                    type="number"
                    placeholder="Days"
                    value={guideFormData.days}
                    onChange={handleGuideFormChange}
                    required
                    className="border rounded px-3 py-2"
                  />
                  <input
                    name="cost"
                    type="number"
                    placeholder="Cost"
                    value={guideFormData.cost}
                    onChange={handleGuideFormChange}
                    required
                    className="border rounded px-3 py-2"
                  />
                  <textarea
                    name="guide_description"
                    placeholder="Description"
                    value={guideFormData.guide_description}
                    onChange={handleGuideFormChange}
                    rows="3"
                    className="border rounded px-3 py-2"
                  />
                  <input
                    name="worked_with_clients"
                    placeholder="Worked With Clients (comma separated)"
                    value={guideFormData.worked_with_clients}
                    onChange={handleGuideFormChange}
                    className="border rounded px-3 py-2"
                  />
                  <input
                    name="reviews"
                    placeholder="Reviews (comma separated)"
                    value={guideFormData.reviews}
                    onChange={handleGuideFormChange}
                    className="border rounded px-3 py-2"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingGuide(null)}
                      className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Display Guides in table */}
            {loadingGuides ? (
              <p>Loading guides...</p>
            ) : (
              <table className="min-w-full bg-white border max-w-4xl">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Guide ID</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Language</th>
                    <th className="border px-4 py-2">Days</th>
                    <th className="border px-4 py-2">Cost</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {guides.map(g => (
                    <tr key={g._id} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{g.guide_id}</td>
                      <td className="border px-4 py-2">{g.name}</td>
                      <td className="border px-4 py-2">{g.language}</td>
                      <td className="border px-4 py-2">{g.days}</td>
                      <td className="border px-4 py-2">₹{g.cost}</td>
                      <td className="border px-4 py-2 flex gap-2">
                        <button
                          onClick={() => handleGuideEditClick(g)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <FaPenToSquare />
                        </button>
                        <button
                          onClick={() => handleGuideDeleteClick(g._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <FaCircleXmark />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}      

        {activeSection === "drivers" && (
          <div>
            <h2 className="text-lg font-bold mb-4">Driver Management</h2>
        
            {/* Create new Driver form */}
            <div className="mb-6 p-4 border rounded-lg bg-gray-50 max-w-3xl">
              <h3 className="font-bold mb-2 text-lg">Add New Driver</h3>
              <form onSubmit={handleCreateDriver} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="driver_id"
                  placeholder="Driver ID"
                  value={newDriverData.driver_id}
                  onChange={handleNewDriverInputChange}
                  required
                  className="border rounded px-3 py-2"
                />
                <input
                  name="name"
                  placeholder="Name"
                  value={newDriverData.name}
                  onChange={handleNewDriverInputChange}
                  required
                  className="border rounded px-3 py-2"
                />
                <input
                  name="language"
                  placeholder="Language"
                  value={newDriverData.language}
                  onChange={handleNewDriverInputChange}
                  className="border rounded px-3 py-2"
                />
                <input
                  name="days"
                  type="number"
                  placeholder="Days"
                  value={newDriverData.days}
                  onChange={handleNewDriverInputChange}
                  required
                  className="border rounded px-3 py-2"
                />
                <input
                  name="cost"
                  type="number"
                  placeholder="Cost"
                  value={newDriverData.cost}
                  onChange={handleNewDriverInputChange}
                  required
                  className="border rounded px-3 py-2"
                />
                <textarea
                  name="guide_description"
                  placeholder="Description"
                  value={newDriverData.guide_description}
                  onChange={handleNewDriverInputChange}
                  rows="3"
                  className="border rounded px-3 py-2 md:col-span-2"
                />
                <input
                  name="worked_with_clients"
                  placeholder="Worked With Clients (comma separated)"
                  value={newDriverData.worked_with_clients}
                  onChange={handleNewDriverInputChange}
                  className="border rounded px-3 py-2 md:col-span-2"
                />
                <input
                  name="reviews"
                  placeholder="Reviews (comma separated)"
                  value={newDriverData.reviews}
                  onChange={handleNewDriverInputChange}
                  className="border rounded px-3 py-2 md:col-span-2"
                />
                <button
                  type="submit"
                  className="md:col-span-2 bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700"
                >
                  Create Driver
                </button>
              </form>
            </div>
        
            {/* Editing Driver */}
            {editingDriver && (
              <div className="mt-6 bg-gray-100 p-4 rounded-lg max-w-3xl">
                <h3 className="font-bold mb-2">Edit Driver: {editingDriver.name}</h3>
                <form onSubmit={handleDriverUpdateSubmit} className="space-y-4">
                  <input
                    name="driver_id"
                    placeholder="Driver ID"
                    value={driverFormData.driver_id}
                    onChange={handleDriverFormChange}
                    required
                    className="border rounded px-3 py-2"
                  />
                  <input
                    name="name"
                    placeholder="Name"
                    value={driverFormData.name}
                    onChange={handleDriverFormChange}
                    required
                    className="border rounded px-3 py-2"
                  />
                  <input
                    name="language"
                    placeholder="Language"
                    value={driverFormData.language}
                    onChange={handleDriverFormChange}
                    className="border rounded px-3 py-2"
                  />
                  <input
                    name="days"
                    type="number"
                    placeholder="Days"
                    value={driverFormData.days}
                    onChange={handleDriverFormChange}
                    required
                    className="border rounded px-3 py-2"
                  />
                  <input
                    name="cost"
                    type="number"
                    placeholder="Cost"
                    value={driverFormData.cost}
                    onChange={handleDriverFormChange}
                    required
                    className="border rounded px-3 py-2"
                  />
                  <textarea
                    name="guide_description"
                    placeholder="Description"
                    value={driverFormData.guide_description}
                    onChange={handleDriverFormChange}
                    rows="3"
                    className="border rounded px-3 py-2"
                  />
                  <input
                    name="worked_with_clients"
                    placeholder="Worked With Clients (comma separated)"
                    value={driverFormData.worked_with_clients}
                    onChange={handleDriverFormChange}
                    className="border rounded px-3 py-2"
                  />
                  <input
                    name="reviews"
                    placeholder="Reviews (comma separated)"
                    value={driverFormData.reviews}
                    onChange={handleDriverFormChange}
                    className="border rounded px-3 py-2"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingDriver(null)}
                      className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Display Drivers in table */}
            {loadingDrivers ? (
              <p>Loading drivers...</p>
            ) : (
              <table className="min-w-full bg-white border max-w-4xl">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Driver ID</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Language</th>
                    <th className="border px-4 py-2">Days</th>
                    <th className="border px-4 py-2">Cost</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers.map((d) => (
                    <tr key={d._id} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{d.driver_id}</td>
                      <td className="border px-4 py-2">{d.name}</td>
                      <td className="border px-4 py-2">{d.language}</td>
                      <td className="border px-4 py-2">{d.days}</td>
                      <td className="border px-4 py-2">₹{d.cost}</td>
                      <td className="border px-4 py-2 flex gap-2">
                        <button
                          onClick={() => handleDriverEditClick(d)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <FaPenToSquare />
                        </button>
                        <button
                          onClick={() => handleDriverDeleteClick(d._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <FaCircleXmark />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
)}

        {activeSection === "reports" && (
          <div>
            <h2 className="text-lg font-bold mb-4">Reports & Analytics</h2>
            {/* Map reports here */}
          </div>
        )}
      </div>
    </div>
  );
}
