import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
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
import { XMarkIcon, EyeIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
// ... other imports

const images = [image1, image2, /* ... other images */];

const sortOptions = [
  { name: "Newest", href: "#", current: true },
  { name: "Oldest", href: "#", current: false },
];

const filters = [
  {
    id: "type",
    name: "Order Type",
    options: [
      { value: "resort", label: "Resort Bookings" },
      { value: "guide", label: "Guide Services" },
      { value: "driver", label: "Driver Services" },
      { value: "product", label: "Product Orders" },
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
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

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
    
    if (isLoggedIn()) {
      fetchOrders();
    }
  }, []);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const getOrderItemName = (order) => {
    if (order.resort) return order.resort.name;
    if (order.guide) return `Guide: ${order.guide.name}`;
    if (order.driver) return `Driver: ${order.driver.name}`;
    if (order.product) return order.product.product_name;
    return order.location;
  };

  const getOrderItemPrice = (order) => {
    if (order.resort) return `₹${order.resort.cost}`;
    if (order.guide) return `₹${order.guide.cost}`;
    if (order.driver) return `₹${order.driver.cost}`;
    if (order.product) return `₹${order.product.product_discounted_price}`;
    return "Price not available";
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
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
            <form className="mt-4 px-4">
              {filters.map((section) => (
                <Disclosure key={section.id} as="div" className="border-b py-4">
                  <DisclosureButton className="group flex w-full items-center justify-between text-gray-700 hover:text-gray-900">
                    <span className="font-medium">{section.name}</span>
                    <span className="ml-2">
                      <PlusIcon className="h-5 w-5 group-data-open:hidden" />
                      <MinusIcon className="h-5 w-5 hidden group-data-open:block" />
                    </span>
                  </DisclosureButton>
                  <DisclosurePanel className="pt-3 space-y-3">
                    {section.options.map((option, idx) => (
                      <div key={option.value} className="flex items-center gap-2">
                        <input
                          id={`filter-mobile-${section.id}-${idx}`}
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor={`filter-mobile-${section.id}-${idx}`} className="text-sm text-gray-600">
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

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-gray-200 pt-24 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            My Orders
          </h1>
          <div className="flex items-center gap-4">
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
                          option.current ? "font-semibold text-indigo-600" : "text-gray-700 hover:bg-gray-100",
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
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-md"
            >
              <FunnelIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <section className="pt-8 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Sidebar Filters */}
            <aside className="hidden lg:block space-y-6">
              {filters.map((section) => (
                <Disclosure key={section.id} as="div" className="border-b pb-6">
                  <DisclosureButton className="group flex w-full items-center justify-between text-gray-700 hover:text-gray-900">
                    <span className="font-medium">{section.name}</span>
                    <span className="ml-2">
                      <PlusIcon className="h-5 w-5 group-data-open:hidden" />
                      <MinusIcon className="h-5 w-5 hidden group-data-open:block" />
                    </span>
                  </DisclosureButton>
                  <DisclosurePanel className="pt-4 space-y-3">
                    {section.options.map((option, idx) => (
                      <div key={option.value} className="flex items-center gap-2">
                        <input
                          id={`filter-${section.id}-${idx}`}
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor={`filter-${section.id}-${idx}`} className="text-sm text-gray-600">
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
                      <div className="relative h-52 w-full overflow-hidden">
                        <img
                          src={images[idx % images.length]}
                          alt={order.location}
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                          Order #{order.order_id?.slice(-6)}
                        </span>
                      </div>
                      <div className="p-5 flex flex-col h-[200px]">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                          {getOrderItemName(order)}
                        </h2>
                        <p className="text-sm text-gray-500 mb-2">
                          Location: {order.location}
                        </p>
                        <p className="text-sm text-green-600 font-semibold mb-4">
                          {getOrderItemPrice(order)}
                        </p>
                        <button
                          className="mt-auto w-full py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                          onClick={() => handleViewOrder(order)}
                        >
                          View Details
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

      {/* Order Details Modal */}
      <Dialog
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <DialogPanel className="relative mx-auto my-10 max-w-2xl bg-white p-6 rounded-3xl shadow-xl">
          <button
            onClick={() => setSelectedOrder(null)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          {selectedOrder && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Order Details
              </h2>
              <div className="space-y-3">
                <p><strong>Order ID:</strong> {selectedOrder.order_id}</p>
                <p><strong>Location:</strong> {selectedOrder.location}</p>
                {selectedOrder.description && (
                  <p><strong>Description:</strong> {selectedOrder.description}</p>
                )}
                {selectedOrder.resort && (
                  <div className="bg-blue-50 p-3 rounded">
                    <p><strong>Resort:</strong> {selectedOrder.resort.name}</p>
                    <p><strong>Type:</strong> {selectedOrder.resort.type}</p>
                    <p><strong>Cost:</strong> ₹{selectedOrder.resort.cost}</p>
                  </div>
                )}
                {selectedOrder.guide && (
                  <div className="bg-green-50 p-3 rounded">
                    <p><strong>Guide:</strong> {selectedOrder.guide.name}</p>
                    <p><strong>Language:</strong> {selectedOrder.guide.language}</p>
                    <p><strong>Cost:</strong> ₹{selectedOrder.guide.cost}</p>
                  </div>
                )}
                {selectedOrder.driver && (
                  <div className="bg-yellow-50 p-3 rounded">
                    <p><strong>Driver:</strong> {selectedOrder.driver.name}</p>
                    <p><strong>Language:</strong> {selectedOrder.driver.language}</p>
                    <p><strong>Cost:</strong> ₹{selectedOrder.driver.cost}</p>
                  </div>
                )}
                {selectedOrder.product && (
                  <div className="bg-purple-50 p-3 rounded">
                    <p><strong>Product:</strong> {selectedOrder.product.product_name}</p>
                    <p><strong>Price:</strong> ₹{selectedOrder.product.product_discounted_price}</p>
                  </div>
                )}
                <p className="text-sm text-gray-500">
                  <strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </DialogPanel>
      </Dialog>
    </div>
  );
}