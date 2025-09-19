import React from 'react'
import CarouselHome from '../Components/HomePageComponent/CarouselHome';
import SliderHome from '../Components/HomePageComponent/sliderHome';
import RateChatbot from '../Components/HomePageComponent/RateChatbot';
import JharkhandTourismChatbot from '../Components/HomePageComponent/JharkhandTourismChatbot';

const Home = () => {
  return (
    <div className='HomeMainDiv flex flex-col min-h-screen bg-gradient-to-b from-indigo-50 to-blue-50'>
      {/* Main Content */}
      <main className='flex-grow px-6 py-10 max-w-7xl mx-auto w-full'>
        <CarouselHome />

        <h1 className="mt-10 mb-6 text-4xl text-indigo-900 font-extrabold tracking-tight">
          Top Picks For You
        </h1>

        <SliderHome />

        {/* Chatbots Section */}
        <section className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <RateChatbot />
          </div>
            <JharkhandTourismChatbot />
        </section>
      </main>
    </div>
  )
}

export default Home;