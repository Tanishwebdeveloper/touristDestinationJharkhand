// import React from "react";
// import image15 from "../assets/image15.png";
// import { Link } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc"; // Google icon
// import Navbar from "../Components/Navbar";

// export default function SignupPage() {
//   return (
//     <div className="SignupMaindiv m-5">
//       <div className="min-h-screen flex items-center justify-center bg-white-100 px-4">
//         <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
//           {/* Left Side - Signup Form */}
//           <div className="w-full md:w-1/2 p-8 md:p-12">
//             <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
//               Create Your Account
//             </h1>
//             <p className="text-gray-600 mb-8">
//               Sign up to get started with your journey
//             </p>

//             {/* Google Sign-In */}
//             <button
//               type="button"
//               className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-3 mb-6 hover:bg-gray-100 transition-all"
//             >
//               <FcGoogle size={24} /> Sign up with Google
//             </button>

//             <form className="space-y-6">
//               {/* First Name */}
//               <div>
//                 <label
//                   htmlFor="firstName"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   id="firstName"
//                   required
//                   className="mt-2 block w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 
//                   focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-sm"
//                   placeholder="John"
//                 />
//               </div>

//               {/* Last Name */}
//               <div>
//                 <label
//                   htmlFor="lastName"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   id="lastName"
//                   required
//                   className="mt-2 block w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 
//                   focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-sm"
//                   placeholder="Doe"
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Email address
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   required
//                   className="mt-2 block w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 
//                   focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-sm"
//                   placeholder="you@example.com"
//                 />
//               </div>

//               {/* Password */}
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   id="password"
//                   required
//                   className="mt-2 block w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 
//                   focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-sm"
//                   placeholder="••••••••"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all text-sm"
//               >
//                 Sign up
//               </button>
//             </form>

//             <p className="mt-6 text-sm text-gray-600 text-center md:text-left">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="text-teal-500 font-semibold hover:text-teal-600"
//               >
//                 Sign in
//               </Link>
//             </p>
//           </div>

//           {/* Right Side - Image */}
//           <div className="hidden md:block md:w-1/2">
//             <img
//               src={image15}
//               alt="Signup visual"
//               className="object-cover w-full h-full"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import image15 from "../assets/image15.png";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from "axios";

export default function SignupPage() {
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
        "http://localhost:5000/api/auth/registeruser",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="SignupMaindiv m-5">
      <div className="min-h-screen flex items-center justify-center bg-white-100 px-4">
        <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Left Side - Signup Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
              Create Your Account
            </h1>
            <p className="text-gray-600 mb-8">
              Sign up to get started with your journey
            </p>

            <form className="space-y-6" onSubmit={SubmitHandler}>
              {/* First Name */}
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
                />
              </div>

              {/* Last Name */}
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
                />
              </div>

              {/* Email */}
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
                />
              </div>

              {/* Password */}
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
                />
              </div>

              {/* Role */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  required
                  className="mt-2 block w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 
                  focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-sm"
                  placeholder="Tourist"
                  onChange={ChangeHandler}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all text-sm"
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

          {/* Right Side - Image */}
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