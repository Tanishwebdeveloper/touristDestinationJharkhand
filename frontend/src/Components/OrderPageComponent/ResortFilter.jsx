// import image1 from "../../assets/image1.png";
// import image2 from "../../assets/image2.png";
// import image3 from "../../assets/image3.png";
// import image4 from "../../assets/image4.png";
// import image5 from "../../assets/image5.png";
// import image6 from "../../assets/image6.png";
// import image7 from "../../assets/image7.png";
// import image8 from "../../assets/image8.png";
// import image9 from "../../assets/image9.png";
// import image10 from "../../assets/image10.png";
// import image11 from "../../assets/image11.png";
// import image12 from "../../assets/image12.png";
// import image13 from "../../assets/image13.png";
// import image14 from "../../assets/image14.png";

// import StarComponent from "./StarComponent";
// import { useState } from "react";
// import {
//   Dialog,
//   DialogBackdrop,
//   DialogPanel,
//   Disclosure,
//   DisclosureButton,
//   DisclosurePanel,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuItems,
// } from "@headlessui/react";
// import {
//   XMarkIcon,
//   ChevronDownIcon,
//   FunnelIcon,
//   MinusIcon,
//   PlusIcon,
//   Squares2X2Icon,
// } from "@heroicons/react/24/outline";

// const images = [
//   image1,
//   image2,
//   image3,
//   image4,
//   image5,
//   image6,
//   image7,
//   image8,
//   image9,
//   image10,
//   image11,
//   image12,
//   image13,
//   image14,
// ];

// const filters = [
//   {
//     id: "Resort",
//     name: "Resort Type",
//     options: [
//       { value: "Beach", label: "Beach" },
//       { value: "Mountain", label: "Mountain" },
//       { value: "Island", label: "Island" },
//       { value: "Luxury", label: "Luxury" },
//       { value: "Eco", label: "Eco-Friendly" },
//       { value: "Wellness", label: "Wellness & Spa" },
//     ],
//   },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function ResortFilter() {
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

//   return (
//     <div className="bg-gradient-to-br from-white via-amber-50 to-yellow-100 min-h-screen">
//       {/* HERO SECTION */}
//       <div className="relative bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600')] bg-cover bg-center h-[400px] flex items-center justify-center">
//         <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
//         <h1 className="relative z-10 text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
//           Discover Luxury Resorts
//         </h1>
//       </div>

//       <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative -mt-20 z-20">
//         <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
//           <h2 className="text-3xl font-extrabold text-gray-900">
//             Handpicked For You
//           </h2>
//           <div className="flex items-center gap-4">
//             <Menu as="div" className="relative">
//               <MenuButton className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-xl transition">
//                 Sort by
//                 <ChevronDownIcon className="h-5 w-5 text-gray-500" />
//               </MenuButton>
//               <MenuItems className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg overflow-hidden ring-1 ring-black/10">
//                 <MenuItem>
//                   <button className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">
//                     Price: Low to High
//                   </button>
//                 </MenuItem>
//                 <MenuItem>
//                   <button className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">
//                     Price: High to Low
//                   </button>
//                 </MenuItem>
//               </MenuItems>
//             </Menu>

//             <button
//               onClick={() => setMobileFiltersOpen(true)}
//               className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-xl transition lg:hidden"
//             >
//               <FunnelIcon className="h-5 w-5" />
//               Filters
//             </button>
//           </div>
//         </div>

//         <section className="pt-8 pb-24">
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
//             {/* FILTERS (Desktop) */}
//             <aside className="hidden lg:block glassmorphism rounded-2xl p-6 shadow-xl bg-white/80 backdrop-blur-sm">
//               <h3 className="font-semibold text-lg text-gray-900 mb-4">
//                 Filters
//               </h3>
//               {filters.map((section) => (
//                 <Disclosure key={section.id} className="mt-6">
//                   {({ open }) => (
//                     <>
//                       <DisclosureButton className="flex justify-between w-full text-left text-gray-700 font-medium">
//                         {section.name}
//                         {open ? (
//                           <MinusIcon className="h-5 w-5" />
//                         ) : (
//                           <PlusIcon className="h-5 w-5" />
//                         )}
//                       </DisclosureButton>
//                       <DisclosurePanel className="mt-4 space-y-3">
//                         {section.options.map((option) => (
//                           <label key={option.value} className="flex items-center gap-2">
//                             <input
//                               type="checkbox"
//                               className="h-4 w-4 rounded border-gray-300 text-indigo-600"
//                             />
//                             <span className="text-gray-600">{option.label}</span>
//                           </label>
//                         ))}
//                       </DisclosurePanel>
//                     </>
//                   )}
//                 </Disclosure>
//               ))}
//             </aside>

//             {/* RESORT CARDS */}
//             <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-10">
//               {images.map((img, index) => (
//                 <div
//                   key={index}
//                   className="group relative rounded-2xl overflow-hidden bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
//                 >
//                   {/* IMAGE */}
//                   <div className="h-56 overflow-hidden">
//                     <img
//                       src={img}
//                       alt="Resort"
//                       className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
//                     />
//                   </div>

//                   {/* CONTENT */}
//                   <div className="p-6 flex flex-col gap-3">
//                     <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition">
//                       Maldives Paradise Resort
//                     </h3>
//                     <div className="flex items-center gap-2 text-sm text-gray-600">
//                       <StarComponent />
//                       <span>(1,245 reviews)</span>
//                     </div>
//                     <p className="text-gray-600 text-sm leading-relaxed">
//                       Escape to crystal-clear waters, private villas, and
//                       world-class luxury.
//                     </p>
//                     <div className="flex justify-between items-center mt-4">
//                       <span className="text-2xl font-extrabold text-emerald-600">
//                         ₹25,499
//                       </span>
//                       <button className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-white font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
//                         Reserve Now
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";

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
} from "@headlessui/react";
import {
  XMarkIcon,
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

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

const filters = [
  {
    id: "Resort",
    name: "Resort Type",
    options: [
      { value: "Beach", label: "Beach" },
      { value: "Mountain", label: "Mountain" },
      { value: "Island", label: "Island" },
      { value: "Luxury", label: "Luxury" },
      { value: "Eco", label: "Eco-Friendly" },
      { value: "Wellness", label: "Wellness & Spa" },
    ],
  },
];

// Static resorts matching your UI sample as initial display
const staticResorts = [
  {
    resort_id: "resort1",
    name: "Maldives Paradise Resort",
    type: "Beach",
    days: 5,
    cost: 25499,
    resort_description:
      "Escape to crystal-clear waters, private villas, and world-class luxury.",
    reviews: ["Amazing!", "Best trip ever!"],
    image: image1,
  },
  {
    resort_id: "resort2",
    name: "Mountain Escape Lodge",
    type: "Mountain",
    days: 7,
    cost: 18500,
    resort_description: "Experience serenity in the heart of the mountains.",
    reviews: ["Peaceful and beautiful.", "Highly recommended!"],
    image: image2,
  },
  // Add more static items as needed...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// (Assuming filters and staticResorts remain as in your code)

export default function ResortFilter() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [resorts, setResorts] = useState(staticResorts);
  const [loading, setLoading] = useState(false);

  // NEW: Track selected resort for show modal
  const [selectedResort, setSelectedResort] = useState(null);

  useEffect(() => {
    const fetchResorts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/resorts");
        if (data && data.length > 0) {
          const resortsWithImages = data.map((resort, idx) => ({
            ...resort,
            image: images[idx % images.length],
          }));
          setResorts(resortsWithImages);
        }
      } catch (error) {
        console.error("Failed to fetch resorts:", error);
      }
      setLoading(false);
    };
    fetchResorts();
  }, []);

  // Handler for Add to Cart button (implement as needed)
  const handleAddToCart = (resort) => {
    // Example: console log or update cart state / API call
    console.log("Add to cart:", resort);
    alert(`"${resort.name}" added to cart!`);
  };

  return (
    <div className="bg-gradient-to-br from-white via-amber-50 to-yellow-100 min-h-screen">
      {/* ... Existing hero and filters UI unchanged ... */}
      <div
        className="relative bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600')] bg-cover bg-center h-[400px] flex items-center justify-center"
        aria-label="Hero section image"
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <h1 className="relative z-10 text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
          Discover Luxury Resorts
        </h1>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative -mt-20 z-20">
        {/* ... existing sort and filter bar here ... */}
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
          <h2 className="text-3xl font-extrabold text-gray-900">Handpicked For You</h2>
          <div className="flex items-center gap-4">
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-xl transition">
                Sort by
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg overflow-hidden ring-1 ring-black/10">
                <MenuItem>
                  {({ active }) => (
                    <button
                      className={classNames(
                        "block px-4 py-2 text-sm w-full text-left",
                        active ? "bg-gray-100" : ""
                      )}
                    >
                      Price: Low to High
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      className={classNames(
                        "block px-4 py-2 text-sm w-full text-left",
                        active ? "bg-gray-100" : ""
                      )}
                    >
                      Price: High to Low
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>

            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-xl transition lg:hidden"
              aria-label="Open filters"
            >
              <FunnelIcon className="h-5 w-5" />
              Filters
            </button>
          </div>
        </div>        
        <section className="pt-8 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Filters */}
            <aside className="hidden lg:block glassmorphism rounded-2xl p-6 shadow-xl bg-white/80 backdrop-blur-sm">
              {/* Filters UI unchanged */}
             <h3 className="font-semibold text-lg text-gray-900 mb-4">Filters</h3>
              {filters.map((section) => (
                <Disclosure key={section.id} className="mt-6">
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex justify-between w-full text-left text-gray-700 font-medium">
                        {section.name}
                        {open ? (
                          <MinusIcon className="h-5 w-5" />
                        ) : (
                          <PlusIcon className="h-5 w-5" />
                        )}
                      </DisclosureButton>
                      <DisclosurePanel className="mt-4 space-y-3">
                        {section.options.map((option) => (
                          <label key={option.value} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600"
                            />
                            <span className="text-gray-600">{option.label}</span>
                          </label>
                        ))}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}              
            </aside>

            {/* RESORT CARDS */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-10">
              {loading && <p>Loading resorts...</p>}

              {resorts.map((resort, index) => (
                <div
                  key={resort.resort_id || index}
                  className="group relative rounded-2xl overflow-hidden bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                  onClick={() => setSelectedResort(resort)} // Open modal on click
                >
                  {/* IMAGE */}
                  <div className="h-56 overflow-hidden">
                    <img
                      src={resort.image}
                      alt={resort.name || "Resort Image"}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 flex flex-col gap-3">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition">
                      {resort.name || "Unnamed Resort"}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <StarComponent />
                      <span>
                        ({resort.reviews?.length || 0}{" "}
                        {resort.reviews?.length === 1 ? "review" : "reviews"})
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {resort.resort_description || "No description available."}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-2xl font-extrabold text-emerald-600">
                        ₹{resort.cost || "N/A"}
                      </span>
                      <button
                        className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-white font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click when button clicked
                          handleAddToCart(resort);
                        }}
                      >
                        Reserve Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* MODAL / SHOW ROUTE DETAILS */}
      <Dialog
        open={!!selectedResort}
        onClose={() => setSelectedResort(null)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        <DialogPanel className="mx-auto my-10 max-w-lg rounded-3xl bg-white p-6 shadow-xl relative">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            onClick={() => setSelectedResort(null)}
            aria-label="Close details"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          {selectedResort && (
            <>
              <img
                src={selectedResort.image}
                alt={selectedResort.name}
                className="rounded-lg w-full h-56 object-cover"
              />
              <h2 className="mt-4 text-2xl font-bold text-gray-900">{selectedResort.name}</h2>
              <p className="mt-2 text-gray-700">{selectedResort.resort_description}</p>
              <p className="mt-2 font-semibold text-gray-900">
                Type: {selectedResort.type}
              </p>
              <p>Duration: {selectedResort.days} days</p>
              <p className="text-2xl font-bold text-emerald-600 mt-2">
                ₹{selectedResort.cost}
              </p>
              <div className="mt-4">
                <button
                  className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-white font-semibold shadow-md hover:shadow-xl hover:scale-105 transition transform duration-300"
                  onClick={() => {
                    handleAddToCart(selectedResort);
                    setSelectedResort(null);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </>
          )}
        </DialogPanel>
      </Dialog>
    </div>
  );
}