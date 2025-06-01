import React, { useState, useEffect } from 'react';

const EmpAttendanceHistory = () => {
    const [employeeData, setEmployeeData] = useState({
        name: '',
        role: '',
        phone: '',
        email: '',
        photo: '',
    });

    const [attendanceHistory, setAttendanceHistory] = useState([]);
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
        const fetchAttendanceHistory = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://api.example.com/attendance-history?page=${currentPage}`); // Replace with actual URL
                const result = await response.json();
                setAttendanceHistory(result.data);
                setTotalPages(result.totalPages);
            } catch (error) {
                console.error('Error fetching attendance history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendanceHistory();
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

            <div className="p-4 rounded-md shadow-md bg-white">
                <div className="border rounded-t-md p-4 font-semibold bg-primary/20">Leave History</div>
                <div className="overflow-x-auto w-full">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-start border px-4 py-3 whitespace-nowrap">Date & Time</th>
                                <th className="text-start border px-4 py-3 whitespace-nowrap">Duration</th>
                                <th className="text-start border px-4 py-3 whitespace-nowrap">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceHistory.map((record, index) => (
                                <tr key={index}>
                                    <td className="text-start border px-4 py-3 whitespace-nowrap">{record.dateTime}</td>
                                    <td className="text-start border px-4 py-3 whitespace-nowrap">{record.duration}</td>
                                    <td className="text-start border px-4 py-3 whitespace-nowrap">{record.status}</td>
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

export default EmpAttendanceHistory;
