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

import { useState, Fragment } from "react";
import {
  Dialog,
  Disclosure,
  Menu,
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

const items3 = new Array(10).fill(1);

const sortOptions = [
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const filters = [
  {
    id: "Guide",
    name: "Guide Language",
    options: [
      { value: "Hindi", label: "Hindi", checked: false },
      { value: "English", label: "English", checked: false },
      { value: "Jharkhandi", label: "Jharkhandi (Local Language)", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EcommerceFilter() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
              <Dialog.Panel className="ml-auto flex w-full max-w-xs flex-col overflow-y-auto bg-white shadow-xl p-4">
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

                <form className="space-y-6">
                  {filters.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-b pb-4">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full justify-between text-gray-700 font-medium hover:text-gray-900">
                            <span>{section.name}</span>
                            {open ? (
                              <MinusIcon className="h-5 w-5" />
                            ) : (
                              <PlusIcon className="h-5 w-5" />
                            )}
                          </Disclosure.Button>
                          <Disclosure.Panel className="pt-3 space-y-2">
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
                                  className="text-gray-600 text-sm"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Best Products
          </h1>

          <div className="flex items-center gap-4">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex items-center gap-1 text-gray-700 hover:text-gray-900 font-medium">
                Price Range
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-xl ring-1 ring-black/5 focus:outline-none">
                {sortOptions.map((option) => (
                  <Menu.Item key={option.name}>
                    {({ active }) => (
                      <a
                        href={option.href}
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-gray-500",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        {option.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>

            <button className="p-2 text-gray-400 hover:text-gray-500 rounded-md">
              <Squares2X2Icon className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-md lg:hidden"
            >
              <FunnelIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Products Section */}
        <section className="pt-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Sidebar */}
            <form className="hidden lg:block">
              {filters.map((section) => (
                <Disclosure key={section.id} as="div" className="border-b py-6">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between text-gray-700 font-medium hover:text-gray-900">
                        <span>{section.name}</span>
                        {open ? <MinusIcon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}
                      </Disclosure.Button>
                      <Disclosure.Panel className="pt-4 space-y-3">
                        {section.options.map((option, idx) => (
                          <div key={option.value} className="flex items-center gap-2">
                            <input
                              id={`filter-${section.id}-${idx}`}
                              type="checkbox"
                              defaultChecked={option.checked}
                              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label htmlFor={`filter-${section.id}-${idx}`} className="text-gray-600 text-sm">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>

            {/* Guides Grid */}
            <div className="lg:col-span-3 space-y-6">
              {items3.map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col lg:flex-row gap-6 p-6 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="flex items-center justify-center w-full lg:w-[260px] h-[260px] bg-white rounded-2xl shadow-md">
                    <img
                      src={images[index % images.length]}
                      alt="Guide"
                      className="h-[200px] w-auto object-contain rounded-xl"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      Expert Guide for Your Destination
                    </h2>

                    <div className="text-green-600 font-bold text-lg mb-2">₹11,999.00</div>

                    <div className="flex items-center mb-2">
                      <StarComponent />
                      <span className="ml-2 text-gray-500 text-sm">(1,245 reviews)</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      Fluent in Hindi, English & local languages. Experienced in guiding
                      tourists to explore safely and comfortably.
                    </p>

                    <button className="self-start px-6 py-2 text-sm font-semibold bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition">
                      Reserve Guide
                    </button>
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
