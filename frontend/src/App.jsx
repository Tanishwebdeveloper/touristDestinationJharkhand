import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import SignupPage from "./Pages/SignupPage.jsx";
import OrderPage from "./Pages/OrderPage.jsx";
import ResortPage from "./Pages/ResortPage.jsx";
import GuidePage from "./Pages/GuidePage.jsx";
import Navbar from "./Components/Navbar.jsx";
import FooterHome from "./Components/HomePageComponent/FooterHome.jsx";
import EcommerceCartPage from "./Pages/EcommrceCartPage.jsx";
import DashBoard from "./Pages/DashBoard/DashBoard.jsx";
import AdminDashBoard from "./Pages/DashBoard/AdminDashBoard.jsx";
import TouristDashboard from "./Pages/DashBoard/TouristDashboard.jsx";
import "./App.css";
import AnalyticsDashBoard from "./Pages/DashBoard/AnalyticsDashBoard.jsx";

const App = () => {
  return (
    <div className="AppMaindiv bg-gradient-to-br from-white via-amber-50 to-yellow-100 min-h-screen">
      <BrowserRouter>
        <header>
          <Navbar />
        </header>
        <Routes>
          <Route element={<Home />} path="/"></Route>
          <Route element={<LoginPage />} path="loginpage"></Route>
          <Route element={<SignupPage />} path="signuppage"></Route>
          <Route element={<OrderPage />} path="orderpage"></Route>
          <Route element={<ResortPage />} path="resortpage"></Route>
          <Route element={<GuidePage />} path="guidepage"></Route>
          <Route
            element={<EcommerceCartPage />}
            path="ecommercecartpage"
          ></Route>
          <Route element={<DashBoard />} path="dashboard"></Route>
          <Route path="dashboard/:role"></Route>
          <Route element={<AnalyticsDashBoard />} path="analyticsdashboard"></Route>
          <Route element={<AdminDashBoard/>} path="admindashboard"></Route>
          <Route element={<TouristDashboard/>} path="touristdashboard"></Route>
        </Routes>
        <footer>
          <FooterHome />
        </footer>
      </BrowserRouter>
    </div>
  );
};

export default App;
