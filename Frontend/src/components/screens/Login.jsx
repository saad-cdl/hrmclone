import React, { useState, useEffect } from "react";
import backgroundImage from "../assets/Container.jpg";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import useAuth from '../context/user.context';
import Cookies from "universal-cookie";

const Login = () => {
  const { setuser } = useAuth();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const loginuser = async (event) => {
    event.preventDefault();
    // Directly navigate to hr-dboard
    navigate("/hr-dboard");
    toast.success("Login Successful");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleForgotPasswordClick = () => {
    navigate("/forget-password");
  };
  //   const [name, setname] = useState("");
  return (
    <div>
      <div
        className="relative bg-cover bg-center py-8 min-h-screen min-w-full object-fill"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute bg-black/20 inset-0"></div>
        <div className="relative flex items-center justify-center h-full">
          <div className="max-w-md p-8 backdrop-blur-sm bg-white/85 rounded-xl shadow-lg w-full space-y-4 mx-4">
            <div className="text-center space-y-4">
              <img src={Logo} alt="Logo" className="h-16 mx-auto" />
              <div className="flex flex-col items-center justify-center gap-2">
                <h2 className="font-montserrat text-3xl font-semibold text-gray-800">
                  Login
                </h2>
                <p className="font-montserrat font-normal text-gray-800 text-sm mb-4">
                  Please enter your login details
                </p>
              </div>
            </div>
            <form className="grid gap-4" onSubmit={loginuser}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-800 font-montserrat"
                >
                  Email
                </label>
                <input
                  defaultValue={email}
                  type="email"
                  id="email"
                  className="bg-white border-2 shadow-sm border-[#D0D5DD] text-gray-800 font-normal rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-primary focus:border-none focus:outline-none"
                  placeholder="Enter your email"
                  required
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-gray-800 font-montserrat"
                >
                  Password
                </label>
                <div className="relative flex items-center justify-between">
                  <input
                    defaultValue={password}
                    type="password"
                    id="password"
                    className="bg-white shadow-sm border-2 border-[#D0D5DD] text-gray-800 font-normal text-base rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-primary focus:border-none focus:outline-none"
                    placeholder="....."
                    required
                    onChange={(e) => setpassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center font-montserrat">
                <div>
                  <a
                    onClick={handleForgotPasswordClick}
                    className="text-primary font-semibold text-sm cursor-pointer"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-primary focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Login
              </button>
            </form>
            <div className="text-sm font-normal text-gray-800 font-montserrat flex items-center justify-center gap-2">
              <p>Dont have an account?</p>
              <button
                onClick={handleSignupClick}
                className="text-primary text-sm font-bold"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
