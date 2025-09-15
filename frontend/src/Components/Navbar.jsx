import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icons for open/close
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Resorts", path: "/resortpage" },
    { name: "Guides", path: "/guidepage" },
    { name: "Orders", path: "/orderpage" },
    { name: "Cart", path: "/ecommercecartpage" },
    { name: "Login", path: "/loginpage" },
    { name: "Signup", path: "/signuppage" },
    {name:"DashBoard", path:"/dashboard"}
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Left: Hamburger Icon */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-200 transition"
          >
            <Menu size={26}  />
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition"
          >
            Jharkhand Darshan
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Placeholder for alignment */}
          <div className="md:hidden w-8"></div>
        </div>
      </nav>

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
