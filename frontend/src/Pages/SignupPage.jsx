import React, { useState } from "react";
import image15 from "../assets/image15.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    EmailAddress: "",
    Password: "",
    role: "",
  });

  const ChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/registeruser",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // allow cookies if your backend sets them
        }
      );
      if (response.data.success) {
        alert(response.data.message);
        navigate("/loginpage"); // Redirect after successful signup
      } else {
        alert(response.data.message || "Signup failed");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message ||
          "An error occurred during signup"
      );
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="SignupMaindiv m-5">
      <div className="min-h-screen flex items-center justify-center bg-white-100 px-4">
        <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
              Create Your Account
            </h1>
            <p className="text-gray-600 mb-8">
              Sign up to get started with your journey
            </p>
            <form className="space-y-6" onSubmit={SubmitHandler}>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="FirstName"
                  id="firstName"
                  required
                  className="mt-2 block w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 
                             focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-sm"
                  placeholder="John"
                  onChange={ChangeHandler}
                  value={formData.FirstName}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="LastName"
                  id="lastName"
                  required
                  className="mt-2 block w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 
                             focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-sm"
                  placeholder="Doe"
                  onChange={ChangeHandler}
                  value={formData.LastName}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  type="email"
                  name="EmailAddress"
                  id="email"
                  required
                  className="mt-2 block w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 
                             focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-sm"
                  placeholder="you@example.com"
                  onChange={ChangeHandler}
                  value={formData.EmailAddress}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="Password"
                  id="password"
                  required
                  className="mt-2 block w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 
                             focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-sm"
                  placeholder="••••••••"
                  onChange={ChangeHandler}
                  value={formData.Password}
                />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  name="role"
                  id="role"
                  required
                  className="mt-2 block w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-sm"
                  onChange={ChangeHandler}
                  value={formData.role || "tourist"} // default to tourist
                >
                  <option value="tourist">Tourist</option>
                  <option value="service">Service</option>
                </select>
                <p className="text-xs mt-1 text-gray-500">
                  *For developers only: roles "admin" and "analytic" must be added manually via backend.
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all"
                aria-label="Sign up"
              >
                Sign up
              </button>
            </form>
            <p className="mt-6 text-sm text-gray-600 text-center md:text-left">
              Already have an account?{" "}
              <Link
                to="/loginpage"
                className="text-teal-500 font-semibold hover:text-teal-600"
              >
                Log in
              </Link>
            </p>
          </div>
          <div className="hidden md:block md:w-1/2">
            <img
              src={image15}
              alt="Signup visual"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}