import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import axios from "axios";
import Logo from "../assets/Logo.png";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    const toggleSettings = () => {
        setIsSettingsOpen(prevState => !prevState);
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
            if (isSettingsOpen) {
                setIsSettingsOpen(false);
            }
        }
    };

    const handleOverlayClick = () => {
        if (isSidebarOpen) {
            setIsSidebarOpen(false);
        }
        if (isSettingsOpen) {
            setIsSettingsOpen(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);
    const handleLogout = async () => {
        try {
            const resp = await axios.post(
                'http://localhost:8000/HRMS/api/user/logout',
                {},  // Empty body
                { withCredentials: true } // Configuration object for axios
            );
            if (resp.status === 200) {
                localStorage.removeItem('user');
                console.log('Logout successful:', resp);
                navigate('/login');
            }
        } catch (error) {
            console.error('Failed to log out:', error);
        }
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
                            <NavLink to="/hr-dboard" className="flex items-center justify-start gap-2">
                                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z" />
                                </svg>
                                <span className="font-medium">Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="hover:bg-primary text-gray-800 hover:text-white rounded-md px-3 py-2">
                            <NavLink to="/hr-dboard/jobdesk" className="flex items-center justify-start gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                                </svg>
                                <span className="font-medium">Job Desk</span>
                            </NavLink>
                        </li>
                        <li className="hover:bg-primary text-gray-800 hover:text-white rounded-md px-3 py-2">
                            <NavLink to="/hr-dboard/employee" className="flex items-center justify-start gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                                <span className="font-medium">Employee</span>
                            </NavLink>
                        </li>
                        <li className="hover:bg-primary text-gray-800 hover:text-white rounded-md px-3 py-2">
                            <NavLink to="/hr-dboard/leave" className="flex items-center justify-start gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                                </svg>
                                <span className="font-medium">Leave</span>
                            </NavLink>
                        </li>
                        <li className="hover:bg-primary text-gray-800 hover:text-white rounded-md px-3 py-2">
                            <NavLink to="/hr-dboard/attendance" className="flex items-center justify-start gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <span className="font-medium">Attendance</span>
                            </NavLink>
                        </li>
                        <li className="relative">
                            <button
                                className="hover:bg-primary text-gray-800 hover:text-white rounded-md px-3 py-2 w-full flex items-center justify-between"
                                onClick={toggleSettings}>
                                <span className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    <span className="font-medium">Setting</span>
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                </svg>
                            </button>
                            {isSettingsOpen && (
                                <ul className="absolute left-0 w-full bg-gray-200 shadow-md rounded-md mt-2 z-20">
                                    <li className="hover:bg-primary text-gray-800 hover:text-white rounded-md px-3 py-2">
                                        <NavLink to="/hr-dboard/setting/general" className="flex items-center justify-start gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                                            </svg>
                                            <span className="font-medium">General</span>
                                        </NavLink>
                                    </li>
                                    <li className="hover:bg-primary text-gray-800 hover:text-white rounded-md px-3 py-2">
                                        <NavLink to="/hr-dboard/setting/payroll" className="flex items-center justify-start gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                            </svg>
                                            <span className="font-medium">Payroll</span>
                                        </NavLink>
                                    </li>
                                    <li className="hover:bg-primary text-gray-800 hover:text-white rounded-md px-3 py-2">
                                        <NavLink to="/hr-dboard/setting/announcement" className="flex items-center justify-start gap-2">
                                            <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 9H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6m0-6v6m0-6 5.419-3.87A1 1 0 0 1 18 5.942v12.114a1 1 0 0 1-1.581.814L11 15m7 0a3 3 0 0 0 0-6M6 15h3v5H6v-5Z" />
                                            </svg>
                                            <span className="font-medium">Announcement</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </div>

            <div
                id="overlay"
                className={`fixed lg:hidden inset-0 bg-black bg-opacity-40 z-40 ${isSidebarOpen || isSettingsOpen ? "" : "hidden"}`}
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