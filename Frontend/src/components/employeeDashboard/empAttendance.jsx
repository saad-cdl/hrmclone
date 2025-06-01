import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const EmpAttendance = () => {
    const baseurl = 'http://localhost:8000/HRMS/api/';
    const [employeeData, setEmployeeData] = useState({});
    const [attendanceData, setAttendanceData] = useState({});
    const [attendanceStatus, setAttendanceStatus] = useState('');
    // const [status, setAttendanceStatus] = useState('');

    const workStartTime = new Date();
    workStartTime.setHours(9, 0, 0); // 9 AM
    const workEndTime = new Date();
    workEndTime.setHours(18, 0, 0); // 6 PM

    // Function to check if the current time is within work hours
    const calculatestatus = () => {
        const currentTime = new Date();
        if (currentTime < workStartTime) {
            return ('You can only check in after 9 AM.');
        } else if (currentTime > workEndTime) {
            return ('You can only check out before 6 PM.');
        } else {
            return ('late for: ' + (currentTime - workStartTime) + ' minutes');
        }
    }
    const isWithinWorkHours = (currentTime) => {
        return currentTime >= workStartTime && currentTime <= workEndTime;
    };

    // Fetch employee and attendance data on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseurl + '/attendance', { withCredentials: true });
                console.log('Employee data:', response.data.data);
                if (response.data.data.message) {
                    setAttendanceData(response.data.data.message);
                }
            } catch (error) {
                console.error('Error fetching employee and attendance data:', error);
            }
        };
        fetchData();
    }, []);

    // Handle check-in action
    const handleCheckIn = async () => {
        const currentTime = new Date();

        if (!isWithinWorkHours(currentTime)) {
            toast.error("You can only check in between 9 AM and 6 PM.");
            return;
        }

        try {
            const response = await axios.post(baseurl + '/attendance/checkin', { 'checkin': currentTime.toISOString() }, { withCredentials: true });
            setAttendanceStatus('Checked In');
            console.log('Checked in successfully:', response.data);
            toast.success('Checked in successfully');
        } catch (error) {
            toast.error(error.response.data.message);
            console.error('Error during check-in:', error);
        }
    };

    // Handle check-out action
    const handleCheckOut = async () => {
        const currentTime = new Date();

        if (!isWithinWorkHours(currentTime)) {
            toast.error("You can only check out between 9 AM and 6 PM.");
            return;
        }

        try {
            const response = await axios.post(baseurl + '/attendance/checkout', { 'checkout': currentTime.toISOString() }, { withCredentials: true });
            setAttendanceStatus('Checked Out');
            console.log('Checked out successfully:', response.data);
            toast.success('Checked out successfully');
        } catch (error) {
            toast.error(error.response.data.message);
            console.error('Error during check-out:', error);
        }
    };

    return (
        <div className="space-y-3">
            <div className="p-4 rounded-md shadow-md bg-white space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Employee Details</h2>
                    <button className="bg-primary px-3 py-1 rounded text-white">
                        <NavLink to="/emp-dboard/employee-attendance-history">History</NavLink>
                    </button>
                </div>
                <div className="flex items-center">
                    <img
                        src={employeeData.profilePic || 'default-profile-pic-url'}
                        alt="Employee Profile"
                        className="rounded-full w-16 h-16 mr-4"
                    />
                    <div className="flex-grow">
                        <h3 className="text-lg font-semibold my-3">{employeeData.name || 'Alex Hales'}</h3>
                        <p><span className="font-semibold">Role: </span>{employeeData.role || 'IT Lead'}</p>
                        <p><span className="font-semibold">Phone Number: </span>{employeeData.phoneNumber || '+92345678903'}</p>
                        <p><span className="font-semibold">Email Address: </span>{employeeData.email || 'Example@gmail.com'}</p>
                    </div>
                </div>
                <div className="flex items-center justify-around">
                    <div className="text-center">
                        <div className="bg-primary/20 px-7 py-2 rounded-full">
                            <p className="text-gray-800 text-lg">{employeeData.attendance || '90%'}</p>
                        </div>
                        <p className="text-gray-600 text-sm">Attendance</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-primary/20 px-7 py-2 rounded-full">
                            <p className="text-gray-800 text-lg">{employeeData.avgCheckIn || '08:45'}</p>
                        </div>
                        <p className="text-gray-600 text-sm">Avg Check In</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-primary/20 px-7 py-2 rounded-full">
                            <p className="text-gray-800 text-lg">{employeeData.avgCheckOut || '05:56'}</p>
                        </div>
                        <p className="text-gray-600 text-sm">Avg Check Out</p>
                    </div>
                </div>
            </div>

            <div className="p-4 rounded-md shadow-md bg-white">
                <h2 className="text-lg font-bold mb-4">Attendance</h2>
                <div className="flex justify-between">
                    <div>
                        <p className="text-sm text-gray-600">Date: {attendanceData.date || '8 August 2024'}</p>
                        <p className="text-sm text-gray-600">Time: {attendanceData.time || '8:24 AM'}</p>
                    </div>
                    <p className="text-red-600 font-bold">Status: {calculatestatus()}</p>
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleCheckIn}
                        className="bg-blue-500 text-white py-1 px-4 rounded mr-2"
                    >
                        Check In
                    </button>
                    <button
                        onClick={handleCheckOut}
                        className="bg-pink-500 text-white py-1 px-4 rounded"
                    >
                        Check Out
                    </button>
                </div>
                <div className="text-center mt-4">
                    <p className="text-green-500">{attendanceStatus}</p>
                </div>
            </div>
        </div>
    );
};

export default EmpAttendance;