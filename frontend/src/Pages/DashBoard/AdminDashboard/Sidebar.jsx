// src/components/AdminDashboard/Sidebar.jsx
import React from "react";

export default function Sidebar({ active, onChange }) {
  const sections = [
    { key: "guides", label: "Guide Management" },
    { key: "resorts", label: "Resort Management" },
    { key: "drivers", label: "Driver Management" },
    { key: "products", label: "Product Management" },
    { key: "orders", label: "Order Management" },
  ];

  return (
    <nav className="w-60 bg-white border-r">
      <ul>
        {sections.map(({ key, label }) => (
          <li key={key}>
            <button
              onClick={() => onChange(key)}
              className={`block w-full text-left px-4 py-3 ${
                active === key
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}