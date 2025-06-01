import React from "react";
import backgroundImage from '../assets/Container.jpg';
import Logo from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";

const ForgetPassword = () => {
    const [email, setemail] = React.useState("");
    const navigate = useNavigate();
    const requestforgetpassword = async (event) => {
        event.preventDefault();
        try {
            const resp = await axios.post("http://localhost:8000/HRMS/api/user/forgetpassword", {
                email: email
            }, { withCredentials: true })
            if (resp) {
                console.log(resp.data);
                toast.success("Email Received");
                navigate("/confirm-password/email:" + email);
            }
        } catch (error) {
            console.log(error.response.data);
            toast.error("Invalid Email Address");
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
                                <h2 className="font-montserrat text-3xl font-semibold text-gray-800">Forget Your Password?</h2>
                                <p className="font-montserrat font-normal text-gray-800 text-sm mb-4">Enter your email & instructions will be sent to you</p>
                            </div>
                        </div>
                        <form className="grid gap-6" onSubmit={requestforgetpassword}>
                            <div>
                                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-800 font-montserrat">Email</label>
                                <input type="email" id="email" className="bg-white border-2 shadow-sm border-[#D0D5DD] text-gray-800 font-normal text-base rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-primary focus:border-none focus:outline-none" placeholder="Enter your email" required onChange={(e) => setemail(e.target.value)} />
                            </div>
                            <button type="submit" className="mb-4 text-white bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Send Recovery Email
                            </button>
                        </form>
                        <div className="text-sm font-normal text-gray-800 font-montserrat flex items-center justify-center gap-2">
                            <p>Forget it. Send me back to</p>
                            <button onClick={handleLoginRedirect} className="text-primary text-sm font-bold">Sign in</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
