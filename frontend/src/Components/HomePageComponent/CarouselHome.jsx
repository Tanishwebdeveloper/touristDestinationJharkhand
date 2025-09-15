import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

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
import "./CarouselHome.css";

const responsive = {
  0: { items: 1 },
  768: { items: 1 },
  1200: { items: 1 },
};

const images = [
  { src: image1, title: "Explore the Mountains", desc: "Find peace in serene valleys and breathtaking peaks." },
  { src: image2, title: "Luxury Beach Resorts", desc: "Unwind with waves, sunsets, and luxury vibes." },
  { src: image3, title: "Adventure Awaits", desc: "Thrill-seekers, your perfect journey starts here." },
  { src: image4, title: "Island Paradise", desc: "Escape into crystal-clear waters and white sands." },
  { src: image5, title: "Cultural Escapes", desc: "Discover heritage, traditions, and timeless experiences." },
  { src: image6, title: "Riverside Bliss", desc: "Relax with nature’s calmness by flowing rivers." },
  // ... add more captions for rest if needed
];

const items = images.map((img, index) => (
  <div
    key={index}
    className="relative flex items-center justify-center h-[700px] w-full overflow-hidden rounded-2xl shadow-xl"
    data-value={index + 1}
  >
    {/* Background Image */}
    <img
      src={img.src}
      alt={`slide-${index + 1}`}
      className="h-full w-full object-cover transition-transform duration-1000 ease-in-out scale-105 hover:scale-110"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

    {/* Text Content */}
    <div className="absolute bottom-16 left-10 text-white max-w-xl">
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
        {img.title}
      </h2>
      <p className="mt-3 text-lg text-gray-200 drop-shadow-md">{img.desc}</p>
      <button className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 font-semibold shadow-md hover:from-amber-500 hover:to-orange-600 transition">
        Book Now
      </button>
    </div>
  </div>
));

const CarouselHome = () => (
  <AliceCarousel
    mouseTracking
    items={items}
    autoPlay
    autoPlayInterval={4000}
    infinite
    disableButtonsControls
    animationType="fadeout"
    animationDuration={1000}
    responsive={responsive}
  />
);

export default CarouselHome;
