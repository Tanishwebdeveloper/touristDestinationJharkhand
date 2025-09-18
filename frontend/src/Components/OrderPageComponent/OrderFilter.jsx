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

const images = [
  image1, image2, image3, image4, image5, image6, image7,
  image8, image9, image10, image11, image12, image13, image14,
];

//Newly added
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// import { useState } from "react";
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
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const subCategories = [];

const filters = [
  {
    id: "Venue",
    name: "Venue",
    options: [
      { value: "Mountain", label: "Mountain", checked: false },
      { value: "Riverside", label: "Riverside", checked: false },
      { value: "Pilgrimage", label: "Pilgrimage", checked: false },
      { value: "Forest and Folklore", label: "Forest and Folklore", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function OrderFilter() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is logged in
  const isLoggedIn = () => !!localStorage.getItem("userRole");

  useEffect(() => {
    async function fetchOrders() {
      setLoadingOrders(true);
      try {
        const { data } = await axios.get("http://localhost:5000/api/orders", {
          withCredentials: true,
        });
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
      setLoadingOrders(false);
    }
    fetchOrders();
  }, []);

  // Handler for "Visit Location" button
  const handleVisitLocation = (order) => {
    if (!isLoggedIn()) {
      // store redirect info
      const returnTo = `${location.pathname}?orderId=${order.order_id}`;
      localStorage.setItem("redirectAfterLogin", returnTo);
      localStorage.setItem("intendedOrder", JSON.stringify(order));
      return navigate("/loginpage");
    }
    // proceed when logged in
    alert(`Visiting ${order.location}!`);
  };

  // After login redirect
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderId = params.get("orderId");
    if (orderId && isLoggedIn()) {
      const intended = localStorage.getItem("intendedOrder");
      if (intended) {
        const order = JSON.parse(intended);
        alert(`Redirected to order at ${order.location}`); 
        // optionally open modal or navigate to detail
        localStorage.removeItem("redirectAfterLogin");
        localStorage.removeItem("intendedOrder");
        navigate(location.pathname, { replace: true });
      }
    }
  }, [location, navigate]);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/40 transition-opacity duration-300 ease-linear" />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel className="relative ml-auto flex h-full max-w-xs w-full transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full">
              <div className="flex items-center justify-between px-4 border-b pb-4">
                <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-100 transition"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 px-4">
                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-b py-4">
                    <h3>
                      <DisclosureButton className="group flex w-full items-center justify-between text-gray-700 hover:text-gray-900">
                        <span className="font-medium">{section.name}</span>
                        <span className="ml-2">
                          <PlusIcon className="h-5 w-5 group-data-open:hidden" />
                          <MinusIcon className="h-5 w-5 hidden group-data-open:block" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-3 space-y-3">
                      {section.options.map((option, idx) => (
                        <div key={option.value} className="flex items-center gap-2">
                          <input
                            id={`filter-mobile-${section.id}-${idx}`}
                            type="checkbox"
                            defaultChecked={option.checked}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-mobile-${section.id}-${idx}`}
                            className="text-sm text-gray-600"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Main Content */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="flex items-center justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Discover Venues
            </h1>

            <div className="flex items-center gap-4">
              {/* Sort Menu */}
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                </MenuButton>

                <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-20">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current
                              ? "font-semibold text-indigo-600"
                              : "text-gray-700 hover:bg-gray-100",
                            "block px-4 py-2 text-sm rounded-md"
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              {/* Grid View */}
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-md"
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>

              {/* Filter Button (Mobile) */}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-md"
              >
                <FunnelIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <section className="pt-8 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
              {/* Sidebar Filters */}
              <aside className="hidden lg:block space-y-6">
                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-b pb-6">
                    <h3>
                      <DisclosureButton className="group flex w-full items-center justify-between text-gray-700 hover:text-gray-900">
                        <span className="font-medium">{section.name}</span>
                        <span className="ml-2">
                          <PlusIcon className="h-5 w-5 group-data-open:hidden" />
                          <MinusIcon className="h-5 w-5 hidden group-data-open:block" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-4 space-y-3">
                      {section.options.map((option, idx) => (
                        <div key={option.value} className="flex items-center gap-2">
                          <input
                            id={`filter-${section.id}-${idx}`}
                            type="checkbox"
                            defaultChecked={option.checked}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-${section.id}-${idx}`}
                            className="text-sm text-gray-600"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </aside>
              
              {/* Orders Grid */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {loadingOrders ? (
                    <p>Loading orders...</p>
                  ) : orders.length === 0 ? (
                    <p>No orders available.</p>
                  ) : (
                    orders.map((order, idx) => (
                      <div
                        key={order._id}
                        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 group"
                      >
                        {/* Image */}
                        <div className="relative h-52 w-full overflow-hidden">
                          <img
                            src={images[idx % images.length]}
                            alt={order.location}
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                            Order
                          </span>
                        </div>
                        {/* Card Body */}
                        <div className="p-5 flex flex-col h-[200px]">
                          <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            {order.location}
                          </h2>
                          <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                            {order.description || "No description available."}
                          </p>
                          <button
                            className="mt-auto w-full py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                            onClick={() => handleVisitLocation(order)}
                          >
                            {isLoggedIn() ? "Visit Location" : "Login to Visit"}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
