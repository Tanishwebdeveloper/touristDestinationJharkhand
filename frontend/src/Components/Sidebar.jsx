import { motion, AnimatePresence } from "framer-motion";
import {
  HomeIcon,
  UserPlusIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const sidebarLinks = [
  { name: "Home", icon: HomeIcon, to: "/" },
  { name: "Resorts", icon: CalendarDaysIcon, to: "/resortpage" },
  { name: "Guides", icon: ClipboardDocumentListIcon, to: "/guidepage" },
  { name: "Orders", icon: ClipboardDocumentListIcon, to: "/orderpage" },
  { name: "Cart", icon: ClipboardDocumentListIcon, to: "/ecommercecartpage" },
  { name: "Signup", icon: UserPlusIcon, to: "/signuppage" },
];

export default function Sidebar({ isOpen, onClose }) {
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
                {sidebarLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.to}
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-lg px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all"
                    >
                      <item.icon className="h-5 w-5 text-gray-500" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4">
              <Link
                to="/loginpage"
                onClick={onClose}
                className="block w-full rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-center text-white font-medium py-2 hover:opacity-90 transition"
              >
                Login
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
