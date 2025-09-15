import React from "react";

export default function TouristDashboard() {
  return (
    <div className="font-roboto bg-orange-50 text-gray-800 min-h-screen">

      {/* Welcome Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white mx-10 my-6 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-2">
          Welcome to Jharkhand Tribal Tourism
        </h2>
        <p className="mb-4">
          Discover the rich cultural heritage and pristine natural beauty of
          Jharkhand's tribal communities
        </p>
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-users"></i> 15+ Tribal Communities
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-location-dot"></i> 50+ Destinations
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-regular fa-star"></i> 4.7 Average Rating
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white mx-10 p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">
          Find Your Perfect Tribal Experience
        </h3>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search destinations, tribes, or experiences..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-5 py-2 rounded-lg text-sm">
            <i className="fa-solid fa-magnifying-glass"></i> Search
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex gap-6 mx-10 my-6">
        {/* Left Panel */}
        <div className="flex-2 w-2/3">
          {/* Tabs */}
          <div className="flex gap-3 mb-6">
            <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-sm">
              Destinations
            </button>
            <button className="bg-white shadow px-4 py-2 rounded-full text-sm">
              Service Partners
            </button>
            <button className="bg-white shadow px-4 py-2 rounded-full text-sm">
              Special Offers
            </button>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>

            {/* Destination Card */}
            <div className="flex gap-4 bg-white p-4 rounded-xl shadow mb-4">
              <img
                src="assets/saranda.jpeg"
                alt="Saranda Forest"
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold">Saranda Forest</h4>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <i className="fa-solid fa-location-dot"></i> West Singhbhum
                </p>
                <div className="text-orange-500 text-xs mb-2">Ho Tribe</div>
                <div className="flex flex-wrap gap-2 mb-3 text-xs">
                  <span className="bg-orange-100 px-2 py-1 rounded">
                    Dense Forest
                  </span>
                  <span className="bg-orange-100 px-2 py-1 rounded">
                    Wildlife Safari
                  </span>
                  <span className="bg-orange-100 px-2 py-1 rounded">
                    Tribal Villages
                  </span>
                  <span className="bg-orange-100 px-2 py-1 rounded">
                    Iron Ore Mines
                  </span>
                </div>
                <div className="flex justify-between text-xs mb-2">
                  <div className="flex items-center gap-1">
                    <i className="fa-regular fa-star"></i> 4.8
                  </div>
                  <div className="text-orange-500 font-semibold">₹12,000</div>
                  <div>3 Days</div>
                </div>
                <div className="flex gap-2">
                  <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded text-xs">
                    Book Now
                  </button>
                  <button className="bg-gray-200 px-3 py-1 rounded text-xs">
                    View Details
                  </button>
                  <button className="bg-gray-200 px-3 py-1 rounded text-xs">
                    Contact Partner
                  </button>
                </div>
              </div>
            </div>
            {/* You can copy this block and adjust for Netarhat + Palamu */}
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col gap-6">
          {/* My Bookings */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-3">My Bookings</h4>
            <div className="border-t pt-3 text-sm">
              <div className="flex justify-between items-center">
                <h5 className="font-medium">Saranda Forest</h5>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                  Confirmed
                </span>
              </div>
              <p className="text-xs">
                <i className="fa-regular fa-calendar"></i> 2024-02-15
              </p>
              <p className="text-xs">
                <i className="fa-solid fa-users"></i> 4 guests
              </p>
              <p className="text-xs">with Tribal Heritage Resort</p>
              <p className="text-orange-500 font-semibold">₹48,000</p>
              <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded text-xs">
                Message
              </button>
            </div>
          </div>

          {/* Partner Messages */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-3">
              Partner Messages{" "}
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                1 New
              </span>
            </h4>
            <div className="border-t pt-3 text-sm">
              <p>
                <strong>Tribal Heritage Resort</strong>
              </p>
              <small className="text-gray-500">2 hours ago</small>
              <p className="my-1">
                Thank you for your booking! We have special cultural activities
                planned for your visit.
              </p>
              <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded text-xs">
                Reply
              </button>
            </div>
          </div>

          {/* Upcoming Cultural Events */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-3">Upcoming Cultural Events</h4>
            <div className="border-t pt-3 text-sm">
              <h5 className="font-medium">Sarhul Festival</h5>
              <p className="text-xs">
                <i className="fa-regular fa-calendar"></i> 2024-03-21
              </p>
              <p className="text-xs">
                <i className="fa-solid fa-location-dot"></i> Ranchi
              </p>
              <p className="text-xs">
                Traditional spring festival celebrating nature and tribal
                heritage.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-3">Quick Actions</h4>
            <div className="flex items-center gap-3 mb-2">
              <i className="fa-solid fa-location-dot text-xl"></i>
              <button className="bg-gray-100 w-full px-3 py-2 rounded-lg text-left text-sm hover:bg-orange-100">
                Plan Trip
              </button>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <i className="fa-solid fa-users text-xl"></i>
              <button className="bg-gray-100 w-full px-3 py-2 rounded-lg text-left text-sm hover:bg-orange-100">
                Find Guide
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
