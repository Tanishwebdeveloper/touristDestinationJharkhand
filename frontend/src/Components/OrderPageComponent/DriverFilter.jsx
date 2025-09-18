import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import image4 from "../../assets/image4.png";
import image5 from "../../assets/image5.png";
import image6 from "../../assets/image6.png";
import image7 from "../../assets/image7.png";
import image8 from "../../assets/image8.png";
import image9 from "../../assets/image9.png";
import image10 from "../../assets/image10.png";
import image11 from "../../assets/image11.png";
import image12 from "../../assets/image12.png";
import image13 from "../../assets/image13.png";
import image14 from "../../assets/image14.png";

import StarComponent from "./StarComponent";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";


const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
];


export default function DriverFilter() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedDriver, setSelectedDriver] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is logged in
  const isLoggedIn = () => {
    return localStorage.getItem("userRole") !== null;
  };

  useEffect(() => {
    async function fetchDrivers() {
      try {
        const { data } = await axios.get("/api/drivers");
        // Add images by cycling through list
        const driversWithImages = data.map((driver, idx) => ({
          ...driver,
          image: images[idx % images.length],
        }));
        setDrivers(driversWithImages);
      } catch (error) {
        setDrivers([]);
        console.error("Error fetching drivers:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDrivers();
  }, []);

  // Handler for Book Driver button - check auth first
  const handleBookDriver = (driver) => {
    if (!isLoggedIn()) {
      // Store current location and intended driver for redirect after login
      const currentPath = location.pathname;
      const returnTo = `${currentPath}?driverId=${driver.driver_id || driver._id}`;
      
      // Store in localStorage for persistent redirect
      localStorage.setItem("redirectAfterLogin", returnTo);
      localStorage.setItem("intendedDriver", JSON.stringify(driver));
      
      // Redirect to login
      navigate("/loginpage");
      return;
    }

    // User is logged in, proceed with booking
    handleAddToCart(driver);
  };

  // Original add to cart handler (for logged-in users)
  const handleAddToCart = async (driver) => {
    try {
      const payload = {
        itemType: "Driver",
        itemId: driver._id,
        quantity: 1,
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/cart/add",
        payload,
        { withCredentials: true }
      );
      console.log("Cart:", data);
      alert(`"${driver.name}" added to cart!`);
    } catch (err) {
      console.error("Add to cart failed", err);
      alert("Failed to add to cart.");
    }
  };

  // Check for redirect after login on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const driverId = urlParams.get('driverId');
    
    if (driverId && isLoggedIn()) {
      // User was redirected here after login, find the driver and show it
      const intendedDriver = localStorage.getItem("intendedDriver");
      if (intendedDriver) {
        const driver = JSON.parse(intendedDriver);
        setSelectedDriver(driver);
        
        // Clean up
        localStorage.removeItem("redirectAfterLogin");
        localStorage.removeItem("intendedDriver");
        
        // Clean URL
        navigate(location.pathname, { replace: true });
      }
    }
  }, [location, navigate]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Mobile Filter */}
      <Transition show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel className="ml-auto flex w-full max-w-xs flex-col overflow-y-auto bg-white shadow-xl p-4">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title className="text-lg font-semibold text-gray-900">
                    Filters
                  </Dialog.Title>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 rounded-md hover:bg-gray-100 transition"
                  >
                    <XMarkIcon className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                {/* Put filter UI here similarly as your GuideFilter if needed */}

              </DialogPanel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Best Drivers</h1>

          {/* Add sorting, filter, grid buttons here if needed */}
        </div>

        {loading ? (
          <p className="text-center text-gray-400">Loading drivers...</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {drivers.map((driver, index) => (
              <div
                key={driver._id}
                className="flex flex-col gap-4 bg-white rounded-2xl py-6 px-4 shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
                onClick={() => setSelectedDriver(driver)}
              >
                <div className="flex items-center justify-center h-52 rounded-xl overflow-hidden shadow-md bg-white">
                  <img
                    src={driver.image}
                    alt={driver.name}
                    className="h-full w-auto object-contain rounded-xl"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold text-gray-900">{driver.name}</h2>
                  <p className="text-gray-600 text-sm">{driver.guide_description}</p>
                  <p className="font-semibold text-gray-700">Language: {driver.language || "-"}</p>
                  <p className="font-semibold text-gray-700">Days: {driver.days}</p>
                  <p className="font-semibold text-gray-700 text-green-600">Cost: ₹{driver.cost}</p>

                  {/* Rating & reviews count can be shown here */}
                  <div className="flex items-center gap-2">
                    <StarComponent />
                    <span className="text-gray-500 text-sm">
                      ({driver.reviews?.length ?? 0} reviews)
                    </span>
                  </div>

                  <button
                    className="mt-auto rounded-full bg-indigo-500 text-white py-2 px-6 font-semibold hover:bg-indigo-600 transition"
                    onClick={(e) => {
                      handleBookDriver(driver); // Updated handler
                    }}
                  >
                    {isLoggedIn() ? "Book Driver" : "Login to Book"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Dialog
        open={!!selectedDriver}
        onClose={() => setSelectedDriver(null)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        <DialogPanel className="mx-auto my-10 max-w-lg rounded-3xl bg-white p-6 shadow-xl relative">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            onClick={() => setSelectedDriver(null)}
            aria-label="Close details"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          {selectedDriver && (
            <>
              <img
                src={selectedDriver.image}
                alt={selectedDriver.name}
                className="rounded-lg w-full h-56 object-cover"
              />
              <h2 className="mt-4 text-2xl font-bold text-gray-900">{selectedDriver.name}</h2>
              <p className="mt-2 text-gray-700">{selectedDriver.driver_description}</p>
              <p className="mt-2 font-semibold text-gray-900">
                Language: {selectedDriver.language}
              </p>
              <p>Duration: {selectedDriver.days} days</p>
              <p className="text-2xl font-bold text-emerald-600 mt-2">
                ₹{selectedDriver.cost}
              </p>
              <div className="mt-4">
                <button
                  className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-white font-semibold shadow-md hover:shadow-xl hover:scale-105 transition transform duration-300"
                  onClick={() => {
                    handleBookDriver(selectedDriver);
                    if (isLoggedIn()) {
                      setSelectedDriver(null);
                    }
                  }}
                >
                  {isLoggedIn() ? "Book This Driver" : "Login to Book"}
                </button>
              </div>
            </>
          )}
        </DialogPanel>
      </Dialog>      
    </div>
  );
}