import React from 'react'
import CarouselHome from '../Components/HomePageComponent/CarouselHome';
import FooterHome from '../Components/HomePageComponent/FooterHome';
import SliderHome from '../Components/HomePageComponent/sliderHome'
import Navbar from '../Components/Navbar';
const Home = () => {
  return (
    <div className='HomeMainDiv'>
    <main className='p-5'>
       <CarouselHome/>
       <h1 className="text-4xl text-gray-400 font-bold">Top Pick's For You</h1>
       <SliderHome/>
    </main>
    </div>
 
  )
}

export default Home;