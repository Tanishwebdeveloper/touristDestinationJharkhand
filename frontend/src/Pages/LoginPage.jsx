import React from "react";
import image15 from "../assets/image15.png";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Google icon


export default function LoginPage() {
  return (
    <div className="LoginMaindiv m-5">
      <div className=" min-h-screen flex items-center justify-center bg-white-100 px-4">
        <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Left Side - Login Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
              Welcome Back
            </h1>
            <p className="text-gray-600 mb-8">Sign in to access your account</p>

            {/* Google Sign-In */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-3 mb-6 hover:bg-gray-100 transition-all"
            >
              <FcGoogle size={24} />
              Sign in with Google
            </button>

            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-2 block w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-sm"
                  placeholder="you@example.com"
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
                  name="password"
                  id="password"
                  required
                  className="mt-2 block w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-sm"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-teal-500 focus:ring-teal-400 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 text-gray-700">
                    Remember me
                  </label>
                </div>

                <Link
                  to="/forgot-password"
                  className="text-teal-600 hover:text-teal-500"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all text-sm"
              >
                Sign in
              </button>
            </form>

            <p className="mt-6 text-sm text-gray-600 text-center md:text-left">
              Not a member?{" "}
              <Link
                to="/signup"
                className="text-teal-500 font-semibold hover:text-teal-600"
              >
                Start your free trial
              </Link>
            </p>
          </div>

          {/* Right Side - Image */}
          <div className="hidden md:block md:w-1/2">
            <img
              src={image15}
              alt="Login visual"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
