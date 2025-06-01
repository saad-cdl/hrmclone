import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const EmpLeave = () => {
    const [employeeData, setEmployeeData] = useState({
        name: '',
        role: '',
        phone: '',
        email: '',
        paidLeave: 0,
        unpaidLeave: 0,
        leavesTaken: 0,
    });

    const [leaveData, setLeaveData] = useState({
        type: 'paid',
        startDate: '',
        endDate: '',
        reason: ''
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const employeeResponse = await fetch('https://api.example.com/employee');
                const employeeResult = await employeeResponse.json();

                setEmployeeData({
                    name: employeeResult.name,
                    role: employeeResult.role,
                    phone: employeeResult.phone,
                    email: employeeResult.email,
                    paidLeave: employeeResult.paidLeave,
                    unpaidLeave: employeeResult.unpaidLeave,
                    leavesTaken: employeeResult.leavesTaken,
                });
            } catch (error) {
                console.error('Error fetching employee data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLeaveData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate successful leave submission
        toast.success('Leave application submitted successfully');
        // Reset form
        setLeaveData({
            type: 'paid',
            startDate: '',
            endDate: '',
            reason: ''
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-3">
            <div className="border bg-white rounded-md shadow-md p-4">
                <div className="flex justify-between items-center">
                    <h2 className='text-lg font-semibold'>Employee Details</h2>
                    <button className="bg-primary px-3 py-1 rounded text-white">
                        <NavLink to="/emp-dboard/employee-leave-history">History</NavLink>
                    </button>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                    <img
                        src={employeeData.photo || 'default_photo.png'}
                        alt="Profile"
                        className="rounded-full w-20 h-20"
                    />
                    <div>
                        <h3 className="text-lg font-semibold my-3">{employeeData.name || 'Alex Hales'}</h3>
                        <p><span className='font-semibold'>Role:</span> {employeeData.role || 'IT Lead'}</p>
                        <p><span className='font-semibold'>Phone Number:</span> {employeeData.phone || '+92345678903'}</p>
                        <p><span className='font-semibold'>Email Address:</span> {employeeData.email || 'example@gmail.com'}</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="flex flex-col items-center justify-center py-3 bg-primary/20 rounded-md">
                        <p>{employeeData.paidLeave || 0}</p>
                        <p className='whitespace-nowrap'>Paid Leave</p>
                    </div>
                    <div className="flex flex-col items-center justify-center py-3 bg-primary/20 rounded-md">
                        <p>{employeeData.unpaidLeave || 0}</p>
                        <p className='whitespace-nowrap'>Unpaid Leave</p>
                    </div>
                    <div className="flex flex-col items-center justify-center py-3 bg-primary/20 rounded-md">
                        <p>{employeeData.leavesTaken || 0}</p>
                        <p className='whitespace-nowrap'>Leaves Taken</p>
                    </div>
                </div>
            </div>

            <div className="border bg-white rounded-md shadow-md p-4 space-y-4">
                <div className="flex justify-between items-center font-semibold">
                    <h2>Leave Application</h2>
                    <p>Date: {new Date().toLocaleDateString()}</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="type" className="block">Type:</label>
                        <select
                            id="type"
                            name="type"
                            value={leaveData.type}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md w-full"
                            required
                        >
                            <option value="paid">Paid</option>
                            <option value="unpaid">Unpaid</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="startDate" className="block">Start Date:</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={leaveData.startDate}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md w-full"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block">End Date:</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={leaveData.endDate}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md w-full"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="reason" className="block">Reason:</label>
                        <textarea
                            id="reason"
                            name="reason"
                            value={leaveData.reason}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md w-full"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-primary text-white px-4 py-1 rounded">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default EmpLeave;
