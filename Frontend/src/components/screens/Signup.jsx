import React, { useState } from "react";
import backgroundImage from '../assets/Container.jpg';
import Logo from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const signupuser = async (event) => {
        event.preventDefault();
        // Simulate success
        setTimeout(() => {
            toast.success("Registration is Successful (dummy)");
            navigate('/login');
        }, 500);
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
                                <h2 className="font-montserrat text-3xl font-semibold text-gray-800">Sign Up</h2>
                                <p className="font-montserrat font-normal text-gray-800 text-sm mb-4">Create your account</p>
                            </div>
                        </div>
                        <form className="grid gap-4" onSubmit={signupuser}>
                            <div>
                                <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-800 font-montserrat">Name</label>
                                <input type="text" id="name" className="bg-white border-2 shadow-sm border-[#D0D5DD] text-gray-800 font-normal rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-primary focus:border-none focus:outline-none" placeholder="Enter your name" required onChange={(e) => setname(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-800 font-montserrat">Email</label>
                                <input type="email" id="email" className="bg-white border-2 shadow-sm border-[#D0D5DD] text-gray-800 font-normal rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-primary focus:border-none focus:outline-none" placeholder="Enter your email" required onChange={(e) => setemail(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-800 font-montserrat">Password</label>
                                <input type="password" id="password" className="bg-white border-2 shadow-sm border-[#D0D5DD] text-gray-800 font-normal rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-primary focus:border-none focus:outline-none" placeholder="....." required onChange={(e) => setpassword(e.target.value)} />
                            </div>
                            <button type="submit" className="text-white bg-primary focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Sign Up</button>
                        </form>
                        <div className="text-sm font-normal text-gray-800 font-montserrat flex items-center justify-center gap-2">
                            <p>Already have an account?</p>
                            <button onClick={handleLoginRedirect} className="text-primary text-sm font-bold">Sign in</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
