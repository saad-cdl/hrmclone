import React, { useState } from "react";
import backgroundImage from '../assets/Container.jpg';
import Logo from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";

const ConfirmPassword = () => {
    const navigate = useNavigate();
    const email = window.location.href.split("/").pop();
    const [key, setkey] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpass, setconfirmpass] = useState("")

    const confirmpasspost = async (event) => {
        event.preventDefault();
        try {
            if (password === confirmpass) {
                const resp = await axios.post("http://localhost:8000/HRMS/api/user/resetpassword", {
                    email: email,
                    key: key,
                    password: password
                })
                if (resp) {
                    console.log(resp);
                    toast.success(resp.data.message);
                    navigate('/login');
                }
            }
            else
                console.log("Confirm pass and password donot match");
            // toast.error("Confirm pass and password doesn't match");
        } catch (error) {
            console.log(error.response.data);
            toast.error("Invalid Credentials");
        }
    }

    const handleLoginRedirect = () => {
        navigate('/');
    };
    return (
        <div>
            <div className="relative bg-cover bg-center py-8 min-h-screen min-w-full object-fill"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <div className="absolute bg-black/20 inset-0"></div>
                <div className="relative flex items-center justify-center h-full">
                    <div className="max-w-md p-8 backdrop-blur-sm bg-white/85 rounded-xl shadow-lg w-full space-y-4 mx-4">
                        <div className="text-center space-y-4">
                            <img src={Logo} className="h-16 mx-auto" alt="Logo" />
                            <div className="flex flex-col items-center justify-center gap-2">
                                <h2 className="font-montserrat text-3xl font-semibold text-gray-800">Create New Password</h2>
                                <p className="font-montserrat font-normal text-gray-800 text-sm mb-4">Enter your password to unlock the screen</p>
                            </div>
                        </div>
                        <form className="grid gap-4" onSubmit={confirmpasspost}>
                            <div htmlFor="key" className="block mb-1 text-sm font-medium text-gray-800 font-montserrat">
                                <label htmlFor="key" className="block mb-1 text-sm font-medium text-gray-800 font-montserrat">Key</label>

                                <div className="relative flex items-center justify-between">

                                    <input
                                        type="key"
                                        id="key"
                                        className="bg-white shadow-sm border-2 border-[#D0D5DD] text-gray-800 font-normal text-base rounded-lg block w-full p-2.5 items-center focus:ring-2 focus:ring-primary focus:border-none focus:outline-none"
                                        placeholder="........."
                                        required
                                        onChange={(e) => setkey(e.target.value)}
                                    /></div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-800 font-montserrat">Password</label>
                                <div className="relative flex items-center justify-between">
                                    <input
                                        type="password"
                                        id="password"
                                        className="bg-white shadow-sm border-2 border-[#D0D5DD] text-gray-800 font-normal text-base rounded-lg block w-full p-2.5 items-center focus:ring-2 focus:ring-primary focus:border-none focus:outline-none"
                                        placeholder="........."
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
                            <div>
                                <label htmlFor="confirm-password" className="block mb-1 text-sm font-medium text-gray-800 font-montserrat">Confirm Password</label>
                                <div className="relative flex items-center justify-between">
                                    <input
                                        type="password"
                                        id="confirm-password"
                                        className="bg-white shadow-sm border-2 border-[#D0D5DD] text-gray-800 font-normal text-base rounded-lg block w-full p-2.5 items-center focus:ring-2 focus:ring-primary focus:border-none focus:outline-none"
                                        placeholder="........."
                                        required
                                        onChange={(e) => setconfirmpass(e.target.value)}
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
                            <div className="flex items-start font-montserrat gap-2">
                                <div className="flex items-center h-5">
                                    <input
                                        id="accept-terms"
                                        type="checkbox"
                                        value=""
                                        className="w-3 h-3 rounded bg-white border-none"
                                    />
                                </div>
                                <label htmlFor="accept-terms" className="text-sm font-medium text-gray-800">
                                    You accept our <a href="#" className="text-primary hover:underline">Terms and Conditions</a>.
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="mt-1 mb-1 text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Reset Password
                            </button>
                        </form>
                        <div className="text-sm font-normal text-gray-800 font-montserrat flex items-center justify-center gap-2">
                            <p>Not now? Return</p>
                            <button onClick={handleLoginRedirect} className="text-primary text-sm font-bold">Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPassword;
