import React from "react";
import {
  Facebook,
  Twitter,
  Github,
  Instagram,
  Linkedin,
} from "lucide-react"; 

export default function FooterHome() {
  return (
    <footer className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-xl rounded-t-2xl mt-12">
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        {/* Grid Section */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-800 uppercase dark:text-gray-200 tracking-wider">
              Company
            </h2>
            <ul className="text-gray-600 dark:text-gray-400 space-y-3">
              <li>
                <a href="#" className="hover:text-indigo-600 transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition">
                  Brand Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-800 uppercase dark:text-gray-200 tracking-wider">
              Help Center
            </h2>
            <ul className="text-gray-600 dark:text-gray-400 space-y-3">
              <li>
                <a href="#" className="hover:text-indigo-600 transition">
                  Discord Server
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-800 uppercase dark:text-gray-200 tracking-wider">
              Legal
            </h2>
            <ul className="text-gray-600 dark:text-gray-400 space-y-3">
              <li>
                <a href="#" className="hover:text-indigo-600 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-800 uppercase dark:text-gray-200 tracking-wider">
              Download
            </h2>
            <ul className="text-gray-600 dark:text-gray-400 space-y-3">
              <li>
                <a href="#" className="hover:text-indigo-600 transition">
                  iOS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition">
                  Android
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition">
                  Windows
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition">
                  MacOS
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} <a href="#">TravelX™</a>. All Rights Reserved.
          </span>

          {/* Social Icons */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-indigo-600 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-indigo-600 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-indigo-600 transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-indigo-600 transition">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-indigo-600 transition">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
