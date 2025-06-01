import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HrLeave = () => {
    const [leaves, setLeaves] = useState([]);
    const [filter, setFilter] = useState('applied');
    const [currentPage, setCurrentPage] = useState(1); // Define state for currentPage
    const [totalPages, setTotalPages] = useState(1); // Define state for totalPages
    const [loading, setLoading] = useState(true); // Define state for loading

    useEffect(() => {
        const fetchLeaves = async () => {
            setLoading(true); // Set loading to true before fetching data
            try {
                const response = await axios.get(`https://dummy-url/leaves?status=${filter}&page=${currentPage}`);
                setLeaves(response.data.leaves);
                setTotalPages(response.data.totalPages); // Assume the response contains totalPages
            } catch (error) {
                console.error('Error fetching leave data:', error);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchLeaves();
    }, [filter, currentPage]); // Add currentPage as a dependency

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.patch(`https://dummy-url/leaves/${id}`, { status: newStatus });
            setLeaves(leaves.map(leave =>
                leave.id === id ? { ...leave, status: newStatus } : leave
            ));
        } catch (error) {
            console.error('Error updating leave status:', error);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-start items-center bg-white p-4 rounded-md shadow-md">
                <h1 className="text-xl font-semibold">Leave Status</h1>
            </div>

            <div className="flex bg-white p-4 rounded-md shadow-md">
                <button
                    className={`px-4 py-2 rounded-l ${filter === 'applied' ? 'bg-primary text-white' : 'bg-gray-200'}`}
                    onClick={() => setFilter('applied')}>
                    Applied
                </button>
                <button
                    className={`px-4 py-2 ${filter === 'rejected' ? 'bg-primary text-white' : 'bg-gray-200'}`}
                    onClick={() => setFilter('rejected')}>
                    Rejected
                </button>
                <button
                    className={`px-4 py-2 rounded-r ${filter === 'accepted' ? 'bg-primary text-white' : 'bg-gray-200'}`}
                    onClick={() => setFilter('accepted')}>
                    Accepted
                </button>
            </div>

            <div className="p-4 rounded-md w-full shadow-md bg-white">
                <div className="overflow-x-auto w-full">
                    <table className="w-full">
                        <thead className='bg-primary/20'>
                            <tr>
                                <th className="text-start border px-4 py-3 whitespace-nowrap">Profile</th>
                                <th className="text-start border px-4 py-3 whitespace-nowrap">Date & Time</th>
                                <th className="text-start border px-4 py-3 whitespace-nowrap">Duration</th>
                                <th className="text-start border px-4 py-3 whitespace-nowrap">Department</th>
                                <th className="text-start border px-4 py-3 whitespace-nowrap">Type</th>
                                <th className="text-start border px-4 py-3 whitespace-nowrap">Attachment</th>
                                <th className="text-start border px-4 py-3 whitespace-nowrap">Status</th>
                                <th className="text-start border px-4 py-3 whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaves.map((leave) => (
                                <tr key={leave.id}>
                                    <td className="py-2 flex items-center">
                                        <img
                                            src={leave.profile}
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full mr-2"
                                        />
                                        {leave.name}
                                    </td>
                                    <td className="text-start border px-4 py-3 whitespace-nowrap">{leave.date}</td>
                                    <td className="text-start border px-4 py-3 whitespace-nowrap">{leave.duration}</td>
                                    <td className="text-start border px-4 py-3 whitespace-nowrap">{leave.department}</td>
                                    <td className="text-start border px-4 py-3 whitespace-nowrap">{leave.type}</td>
                                    <td className="text-start border px-4 py-3 whitespace-nowrap">
                                        <a href={leave.attachment} className="text-blue-500">Download</a>
                                    </td>
                                    <td className="py-2">
                                        <span
                                            className={`px-2 py-1 rounded ${leave.status === 'Accepted'
                                                ? 'bg-green-200 text-green-800'
                                                : leave.status === 'Rejected'
                                                    ? 'bg-red-200 text-red-800'
                                                    : 'bg-yellow-200 text-yellow-800'
                                                }`}
                                        >
                                            {leave.status}
                                        </span>
                                    </td>
                                    <td className="py-2 relative">
                                        <div className="inline-block relative group">
                                            <button className="text-gray-500">
                                                &#x22EE; {/* 3 dot icon */}
                                            </button>
                                            <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded hidden group-hover:block">
                                                {filter === 'applied' && (
                                                    <>
                                                        <button
                                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                            onClick={() => handleStatusChange(leave.id, 'Accepted')}
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                            onClick={() => handleStatusChange(leave.id, 'Rejected')}
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </td>
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

export default HrLeave;
