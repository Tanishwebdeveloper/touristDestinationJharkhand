import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // modern icons

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
  { src: image1, title: "Serene Beaches", desc: "Relax by crystal clear waters" },
  { src: image2, title: "Majestic Mountains", desc: "Breathe in the fresh alpine air" },
  { src: image3, title: "Cultural Escapes", desc: "Discover timeless traditions" },
  { src: image4, title: "Luxury Resorts", desc: "Indulge in ultimate comfort" },
  { src: image5, title: "Adventure Trails", desc: "Hike, trek & explore nature" },
  { src: image6, title: "Island Retreats", desc: "Unwind on tropical islands" },
  { src: image7, title: "Urban Skylines", desc: "Modern vibes, classic elegance" },
  { src: image8, title: "Historic Wonders", desc: "Step into ancient civilizations" },
  { src: image9, title: "Romantic Getaways", desc: "Perfect for couples" },
  { src: image10, title: "Wildlife Safaris", desc: "Witness nature's raw beauty" },
  { src: image11, title: "Spa & Wellness", desc: "Rejuvenate your soul" },
  { src: image12, title: "Desert Adventures", desc: "Golden sands, endless skies" },
  { src: image13, title: "Snowy Escapes", desc: "Embrace the winter wonderland" },
  { src: image14, title: "Hidden Gems", desc: "Offbeat places worth exploring" },
];

const SliderHome = () => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -720, behavior: "smooth" }); // 3 cards width
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 720, behavior: "smooth" }); // 3 cards width
    }
  };

  return (
    <div className="relative w-full bg-gradient-to-r from-blue-50 to-indigo-100 shadow-2xl rounded-2xl p-8">
      {/* Left Button */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white rounded-full p-3 shadow-md hover:shadow-xl transition"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      {/* Slider Container */}
      <div
        ref={sliderRef}
        className="flex gap-8 overflow-x-scroll no-scrollbar scroll-smooth"
      >
        {images.map((item, index) => (
          <div
            key={index}
            className="group relative h-[320px] w-[240px] shrink-0 overflow-hidden rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-500 ease-in-out"
          >
            <img
              src={item.src}
              alt={`slide-${index}`}
              className="h-full w-full object-cover transform group-hover:scale-110 transition-all duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-90 transition duration-500"></div>

            {/* Text Overlay */}
            <div className="absolute bottom-6 left-4 right-4 text-white z-10">
              <h3 className="text-lg font-bold drop-shadow-md">{item.title}</h3>
              <p className="text-sm opacity-90">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white rounded-full p-3 shadow-md hover:shadow-xl transition"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>
    </div>
  );
};

export default SliderHome;
