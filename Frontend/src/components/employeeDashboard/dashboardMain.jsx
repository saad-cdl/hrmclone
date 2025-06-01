import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Logo from "../assets/Logo.png";
import { toast } from 'react-toastify';

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    const handleClickOutside = (event) => {
        const sidebar = document.getElementById("sidebar");
        const hamburger = document.getElementById("hamburger");
        const isClickInsideSidebar = sidebar && sidebar.contains(event.target);
        const isClickInsideHamburger = hamburger && hamburger.contains(event.target);

        if (!isClickInsideSidebar && !isClickInsideHamburger) {
            if (isSidebarOpen) {
                setIsSidebarOpen(false);
            }
        }
    };

    const handleOverlayClick = () => {
        if (isSidebarOpen) {
            setIsSidebarOpen(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);
    const handleLogout = () => {
        toast.success('Logged out (dummy)');
        navigate('/login');
    };

    return (
        <div className="relative flex font-inter bg-pink-200">
            <div
                id="sidebar"
                className={`lg:fixed -translate-x-full z-50 lg:z-auto text-white ease-in-out 
                absolute h-full min-h-screen overflow-auto scrollbar-none lg:top-0 left-0 w-56 p-3 transition-transform duration-500 transform
                bg-white shadow-lg space-y-6 ${isSidebarOpen ? "translate-x-0" : ""}`}>

                <div className="flex items-center justify-center">
                    <img src={Logo} className="h-12" alt="Logo" />
                </div>

                <div className="font-inter">
                    <ul className="grid gap-2">
                        <li className="hover:bg-primary text-gray-800 hover:text-white rounded-md px-3 py-2">
                            <NavLink to="/emp-dboard" className="flex items-center justify-start gap-2">
                                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z" />
                                </svg>
                                <span className="font-medium">Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="hover:bg-primary text-gray-800 hover:text-white rounded-md px-3 py-2">
                            <NavLink to="/emp-dboard/leave" className="flex items-center justify-start gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                                </svg>
                                <span className="font-medium">Leave</span>
                            </NavLink>
                        </li>
                        <li className="hover:bg-primary text-gray-800 hover:text-white rounded-md px-3 py-2">
                            <NavLink to="/emp-dboard/attendance" className="flex items-center justify-start gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <span className="font-medium">Attendance</span>
                            </NavLink>
                        </li>
                        <li className="hover:bg-primary text-gray-800 hover:text-white rounded-md px-3 py-2">
                            <NavLink to="/emp-dboard/employee-leave-history" className="flex items-center justify-start gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                </svg>
                                <span className="font-medium">Leave History</span>
                            </NavLink>
                        </li>
                        <li className="hover:bg-primary text-gray-800 hover:text-white rounded-md px-3 py-2">
                            <NavLink to="/emp-dboard/employee-attendance-history" className="flex items-center justify-start gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                                <span className="font-medium">Attendance History</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>

            <div
                id="overlay"
                className={`fixed lg:hidden inset-0 bg-black bg-opacity-40 z-40 ${isSidebarOpen ? "" : "hidden"}`}
                onClick={handleOverlayClick}>
            </div>

            <div
                id="main-content"
                className={`border w-full font-inter transition-all duration-500 lg:ml-0 bg-white overflow-hidden ${isSidebarOpen ? "lg:ml-56" : ""}`}>

                <div className="bg-white p-4 shadow">
                    <div className="flex items-center justify-between">
                        <div
                            id="hamburger"
                            className={`flex items-center cursor-pointer rotate-180 transition-transform duration-300 ${isSidebarOpen ? "rotate-0" : ""}`}
                            onClick={toggleSidebar}>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-7 w-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                            </svg>
                        </div>

                        <button onClick={handleLogout}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-7 w-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                            </svg>
                        </button>
                    </div>
                </div>
                <section className="flex-1 w-full p-4 bg-gray-100">
                    <Outlet />
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
