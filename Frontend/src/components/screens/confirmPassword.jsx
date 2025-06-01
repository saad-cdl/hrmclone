import React, { useState } from "react";
import backgroundImage from '../assets/Container.jpg';
import Logo from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ConfirmPassword = () => {
    const navigate = useNavigate();
    const email = window.location.href.split("/").pop();
    const [key, setkey] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpass, setconfirmpass] = useState("")

    const confirmpasspost = async (event) => {
        event.preventDefault();
        if (password === confirmpass) {
            setTimeout(() => {
                toast.success("Password reset successful (dummy)");
                navigate('/login');
            }, 500);
        } else {
            toast.error("Confirm pass and password doesn't match");
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
                                <h2 className="font-montserrat text-3xl font-semibold text-gray-800">Reset Password</h2>
                                <p className="font-montserrat font-normal text-gray-800 text-sm mb-4">Enter your new password</p>
                            </div>
                        </div>
                        <form className="grid gap-4" onSubmit={confirmpasspost}>
                            <div>
                                <label htmlFor="key" className="block mb-1 text-sm font-medium text-gray-800 font-montserrat">Reset Key</label>
                                <input type="text" id="key" className="bg-white border-2 shadow-sm border-[#D0D5DD] text-gray-800 font-normal rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-primary focus:border-none focus:outline-none" placeholder="Enter reset key" required onChange={(e) => setkey(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-800 font-montserrat">New Password</label>
                                <input type="password" id="password" className="bg-white border-2 shadow-sm border-[#D0D5DD] text-gray-800 font-normal rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-primary focus:border-none focus:outline-none" placeholder="....." required onChange={(e) => setpassword(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="confirmpass" className="block mb-1 text-sm font-medium text-gray-800 font-montserrat">Confirm Password</label>
                                <input type="password" id="confirmpass" className="bg-white border-2 shadow-sm border-[#D0D5DD] text-gray-800 font-normal rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-primary focus:border-none focus:outline-none" placeholder="....." required onChange={(e) => setconfirmpass(e.target.value)} />
                            </div>
                            <button type="submit" className="text-white bg-primary focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Reset Password</button>
                        </form>
                        <div className="text-sm font-normal text-gray-800 font-montserrat flex items-center justify-center gap-2">
                            <p>Back to</p>
                            <button onClick={handleLoginRedirect} className="text-primary text-sm font-bold">Sign in</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPassword;
