import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import GuideManagement from "./GuideManagement";
import ResortManagement from "./ResortManagement";
import DriverManagement from "./DriverManagement";
import ProductManagement from "./ProductManagement";
import OrderManagement from "./OrderManagement";
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
        {["user-management", "approvals", "guides", "drivers", "products", "orders", "reports"].map(
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

        <div className="flex">
          {/* <Sidebar active={activeSection} onChange={setActiveSection}/> */}
          <main className="p-6 flex-1">
            {activeSection === "guides" && <GuideManagement/>}
            {activeSection === "resorts" && <ResortManagement/>}
            {activeSection === "drivers" && <DriverManagement/>}
            {activeSection === "products" && <ProductManagement/>}
            {activeSection === "orders" && <OrderManagement/>}
          </main>
        </div>

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