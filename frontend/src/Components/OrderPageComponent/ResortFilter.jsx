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
import { useState } from "react";
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
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ResortFilter() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="bg-gradient-to-br from-white via-amber-50 to-yellow-100 min-h-screen">
      {/* HERO SECTION */}
      <div className="relative bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600')] bg-cover bg-center h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <h1 className="relative z-10 text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
          Discover Luxury Resorts
        </h1>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative -mt-20 z-20">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Handpicked For You
          </h2>
          <div className="flex items-center gap-4">
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-xl transition">
                Sort by
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg overflow-hidden ring-1 ring-black/10">
                <MenuItem>
                  <button className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">
                    Price: Low to High
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">
                    Price: High to Low
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>

            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-xl transition lg:hidden"
            >
              <FunnelIcon className="h-5 w-5" />
              Filters
            </button>
          </div>
        </div>

        <section className="pt-8 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* FILTERS (Desktop) */}
            <aside className="hidden lg:block glassmorphism rounded-2xl p-6 shadow-xl bg-white/80 backdrop-blur-sm">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">
                Filters
              </h3>
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
              {images.map((img, index) => (
                <div
                  key={index}
                  className="group relative rounded-2xl overflow-hidden bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
                >
                  {/* IMAGE */}
                  <div className="h-56 overflow-hidden">
                    <img
                      src={img}
                      alt="Resort"
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 flex flex-col gap-3">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition">
                      Maldives Paradise Resort
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <StarComponent />
                      <span>(1,245 reviews)</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Escape to crystal-clear waters, private villas, and
                      world-class luxury.
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-2xl font-extrabold text-emerald-600">
                        ₹25,499
                      </span>
                      <button className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-white font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
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
    </div>
  );
}
