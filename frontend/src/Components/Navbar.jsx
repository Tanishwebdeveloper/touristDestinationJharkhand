import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Check initial login state
    const checkAuthState = () => {
      const role = localStorage.getItem("userRole");
      if (role) {
        setIsLoggedIn(true);
        setUserRole(role.toLowerCase());
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
      }
    };

    // Check on mount
    checkAuthState();

    // Listen for storage changes (when localStorage is updated)
    window.addEventListener('storage', checkAuthState);
    
    // Custom event listener for same-tab localStorage changes
    window.addEventListener('authStateChanged', checkAuthState);

    return () => {
      window.removeEventListener('storage', checkAuthState);
      window.removeEventListener('authStateChanged', checkAuthState);
    };
  }, []);

  // Handle logout action
  const handleLogout = () => {
    // Clear login info
    localStorage.removeItem("userRole");
    // Optionally clear token/cookie - you might need to call backend logout API
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/loginpage");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Resorts", path: "/resortpage" },
    { name: "Guides", path: "/guidepage" },
    { name: "Drivers", path: "/driverpage" },
    { name: "Orders", path: "/orderpage" },
    { name: "Products", path: "/ecommercecartpage" },
    // { name: "Login", path: "/loginpage" },
    // { name: "Signup", path: "/signuppage" },
    // {name:"DashBoard", path:"/dashboard"}
  ];

  // Add Dashboard item only if logged in
  if (isLoggedIn) {
    let dashboardPath = "/";
    switch (userRole) {
      case "tourist":
        dashboardPath = "/tourist";
        break;
      case "admin":
        dashboardPath = "/admin";
        break;
      case "service":
        dashboardPath = "/service";
        break;
      case "analytic":
        dashboardPath = "/analytics";
        break;
      default:
        dashboardPath = "/";
    }
    navItems.push({ name: "Dashboard", path: dashboardPath });
  }

  // Add login/logout option
  if (!isLoggedIn) {
    navItems.push({ name: "Login", path: "/loginpage" });
    // navItems.push({ name: "Signup", path: "/signuppage" });
  } else {
    navItems.push({ name: "Logout", onClick: handleLogout });
  }

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
              item.onClick ? (
                // Render button for logout
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                >
                  {item.name}
                </button>
              ) : (
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
              )
            )
            )}
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
