import React, { useState, useEffect } from 'react';

const EmpLeaveHistory = () => {
    const [employeeData, setEmployeeData] = useState({
        name: '',
        role: '',
        phone: '',
        email: '',
        photo: '',
    });

    const [leaveHistory, setLeaveHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await fetch('https://api.example.com/employee');
                const result = await response.json();
                setEmployeeData({
                    name: result.name,
                    role: result.role,
                    phone: result.phone,
                    email: result.email,
                    photo: result.photo || 'default_photo.png',
                });
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployeeData();
    }, []);

    useEffect(() => {
        const fetchLeaveHistory = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://api.example.com/leave-history?page=${currentPage}`);
                const result = await response.json();
                setLeaveHistory(result.data);
                setTotalPages(result.totalPages);
            } catch (error) {
                console.error('Error fetching leave history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaveHistory();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-3">
            <div className="p-4 rounded-md shadow-md bg-white space-y-6">
                <h2 className='font-semibold'>Employee</h2>
                <div className="flex items-center space-x-4">
                    <img
                        src={employeeData.photo}
                        alt="Profile"
                        className="rounded-full w-20 h-20"
                    />
                    <div>
                        <h3>{employeeData.name}</h3>
                        <p><span className='font-semibold'>Role: </span> {employeeData.role || 'intern'}</p>
                        <p><span className='font-semibold'>Phone Number: </span>{employeeData.phone || '03040494949'}</p>
                        <p><span className='font-semibold'>Email Address: </span>{employeeData.email || 'misbah@gmail.com'}</p>
                    </div>
                </div>
            </div>

            <div className="p-4 rounded-md w-full shadow-md bg-white">
                <div className="border rounded-t-md p-4 font-semibold bg-primary/20">Leave History</div>
                <div className="overflow-x-auto w-full">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-start border px-4 py-3 whitespace-nowrap">Profile</th>
                                <th className="text-start border px-4 py-3 whitespace-nowrap">Date & Time</th>
                                <th className="text-start border px-4 py-3 whitespace-nowrap">Status</th>
                                <th className="text-start border px-4 py-3 whitespace-nowrap">Comments</th>
                                <th className="text-start border px-4 py-3 whitespace-nowrap">Type</th>
                                <th className="text-start border px-4 py-3 whitespace-nowrap">Leave Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveHistory.map((leave, index) => (
                                <tr key={index}>
                                    <td className="py-2 flex items-center">
                                        <img
                                            src={leave.profileImage || 'default_profile.png'}
                                            alt="Profile"
                                            className="rounded-full w-8 h-8 mr-2"
                                        />
                                        {leave.name}
                                    </td>
                                    <td className="text-start border px-4 py-3 whitespace-nowrap">{leave.dateTime}</td>
                                    <td className="text-start border px-4 py-3 whitespace-nowrap">{leave.status}</td>
                                    <td className="text-start border px-4 py-3 whitespace-nowrap">{leave.comments}</td>
                                    <td className="text-start border px-4 py-3 whitespace-nowrap">{leave.type}</td>
                                    <td className="text-start border px-4 py-3 whitespace-nowrap">{leave.leaveDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-gray-200 p-2 rounded-md"
                    >
                        Prev
                    </button>
                    <div>Page: {currentPage} of {totalPages}</div>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="bg-gray-200 p-2 rounded-md"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmpLeaveHistory;
