import { motion, AnimatePresence } from "framer-motion";
import {
  HomeIcon,
  UserPlusIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  XMarkIcon,
  BuildingOfficeIcon,
  UserIcon,
  TruckIcon,
  ShoppingCartIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

// Icon mapping for dynamic nav items
const getIconForNavItem = (name) => {
  const iconMap = {
    Home: HomeIcon,
    Resorts: BuildingOfficeIcon,
    Guides: UserIcon,
    Drivers: TruckIcon,
    Orders: ClipboardDocumentListIcon,
    Products: ShoppingCartIcon,
    Dashboard: Cog6ToothIcon,
    Login: UserPlusIcon,
    Signup: UserPlusIcon,
  };
  return iconMap[name] || ClipboardDocumentListIcon;
};

export default function Sidebar({ isOpen, onClose, navItems }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 80 }}
            className="fixed top-0 left-0 z-50 h-full w-64 bg-white/90 backdrop-blur-xl shadow-xl border-r border-gray-200 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Jharkhand Darshan
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-gray-100 transition"
              >
                <XMarkIcon className="h-6 w-6 text-gray-700" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-2 px-3">
                {navItems.map((item) => {
                  const IconComponent = getIconForNavItem(item.name);
                  
                  return (
                    <li key={item.name}>
                      {item.onClick ? (
                        // Render button for logout
                        <button
                          onClick={() => {
                            item.onClick();
                            onClose();
                          }}
                          className="flex items-center gap-3 rounded-lg px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all w-full text-left"
                        >
                          <IconComponent className="h-5 w-5 text-gray-500" />
                          <span className="text-sm font-medium">{item.name}</span>
                        </button>
                      ) : (
                        // Render Link for other items
                        <Link
                          to={item.path}
                          onClick={onClose}
                          className="flex items-center gap-3 rounded-lg px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all"
                        >
                          <IconComponent className="h-5 w-5 text-gray-500" />
                          <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer - You can remove this since Login/Logout is now in the nav items */}
            <div className="border-t border-gray-200 p-4 text-center text-xs text-gray-500">
              © 2024 Jharkhand Darshan
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}