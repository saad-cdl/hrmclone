import React, { useState, useEffect } from 'react';

const HrDashboard = () => {
    const [organizationStats, setOrganizationStats] = useState({
        totalEmployees: 0,
        employeesOnLeave: 0,
        interviewsPending: 0,
        leaveRequestsPending: 0,
    });

    const [timeLog, setTimeLog] = useState({
        today: {
            scheduled: '08:00',
            balance: '12:00',
            worked: '05:00',
        },
        thisMonth: {
            total: 216,
            worked: 189,
            shortage: 23,
            overtime: 56,
            fullTotal: 240,
        },
    });

    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orgStatsResponse = await fetch('https://dummy-url.org-stats');
                const orgStatsData = await orgStatsResponse.json();
                setOrganizationStats({
                    totalEmployees: orgStatsData.totalEmployees,
                    employeesOnLeave: orgStatsData.employeesOnLeave,
                    interviewsPending: orgStatsData.interviewsPending,
                    leaveRequestsPending: orgStatsData.leaveRequestsPending,
                });

                const timeLogResponse = await fetch('https://dummy-url.time-log');
                const timeLogData = await timeLogResponse.json();
                setTimeLog({
                    today: {
                        scheduled: timeLogData.today.scheduled,
                        balance: timeLogData.today.balance,
                        worked: timeLogData.today.worked,
                    },
                    thisMonth: {
                        total: timeLogData.thisMonth.total,
                        worked: timeLogData.thisMonth.worked,
                        shortage: timeLogData.thisMonth.shortage,
                        overtime: timeLogData.thisMonth.overtime,
                    },
                });

                const announcementsResponse = await fetch('https://dummy-url.announcements');
                const announcementsData = await announcementsResponse.json();
                setAnnouncements(announcementsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="space-y-3">
            <div className=" p-4 rounded-md shadow-md bg-white">
                <h1 className="text-xl font-semibold">HR Dashboard</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-blue-500 text-2xl">{organizationStats.totalEmployees}</h2>
                    <p className="text-gray-600">Total Organization Employees</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-blue-500 text-2xl">{organizationStats.employeesOnLeave}</h2>
                    <p className="text-gray-600">Employee on Leave</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-blue-500 text-2xl">{organizationStats.interviewsPending}</h2>
                    <p className="text-gray-600">Interviews Pending Today</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-blue-500 text-2xl">{organizationStats.leaveRequestsPending}</h2>
                    <p className="text-gray-600">Leave Requests Pending</p>
                </div>
            </div>
            <div className="bg-white space-y-3 p-4 rounded-md shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <h2 className="font-medium border-b-2">Today</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-2 border rounded p-2 bg-primary/20">
                                <p>{timeLog.today.scheduled}</p>
                                <p>Scheduled</p>
                            </div>
                            <div className="flex flex-col gap-2 border rounded p-2 bg-primary/20">
                                <p>{timeLog.today.balance}</p>
                                <p>Balance</p>
                            </div>
                            <div className="flex flex-col gap-2 border rounded p-2 bg-primary/20">
                                <p>{timeLog.today.worked}</p>
                                <p>Worked</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="font-medium border-b-2">This Month</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <p>Total</p>
                                    <p>{timeLog.thisMonth.total} hours</p>
                                </div>
                                <div className="bg-gray-200 rounded-full h-1.5">
                                    <div className="bg-[#7AA2E3] h-1.5 rounded-full" style={{ width: `${(timeLog.thisMonth.total / timeLog.thisMonth.fullTotal) * 100}%` }}></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <p>Shortage</p>
                                    <p>{timeLog.thisMonth.shortage} hours</p>
                                </div>
                                <div className="bg-gray-200 rounded-full h-1.5">
                                    <div className="bg-[#7AA2E3] h-1.5 rounded-full" style={{ width: `${(timeLog.thisMonth.shortage / timeLog.thisMonth.fullTotal) * 100}%` }}></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <p>Overtime</p>
                                    <p>{timeLog.thisMonth.overtime} hours</p>
                                </div>
                                <div className="bg-gray-200 rounded-full h-1.5">
                                    <div className="bg-[#7AA2E3] h-1.5 rounded-full" style={{ width: `${(timeLog.thisMonth.overtime / timeLog.thisMonth.fullTotal) * 100}%` }}></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <p>Worked Time</p>
                                    <p>{timeLog.thisMonth.worked} hours</p>
                                </div>
                                <div className="bg-gray-200 rounded-full h-1.5">
                                    <div className="bg-[#7AA2E3] h-1.5 rounded-full" style={{ width: `${(timeLog.thisMonth.worked / timeLog.thisMonth.fullTotal) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white p-4 w-full rounded-md shadow-md">
                <div className="border rounded-t-md p-4 font-semibold bg-primary/20">Announcements</div>
                <div className="overflow-x-auto w-full">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-start border px-4 py-3 whitespace-nowrap">Title</th>
                                <th className="text-start border px-4 py-3 whitespace-nowrap">Start Date</th>
                                <th className="text-start border px-4 py-3 whitespace-nowrap">End Date</th>
                                <th className="text-start border px-4 py-3 whitespace-nowrap">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {announcements.map((announcement, index) => (
                                <tr key={index}>
                                    <td className="text-start border px-4 py-3 whitespace-nowrap">{announcement.title}</td>
                                    <td className="text-start border px-4 py-3 whitespace-nowrap">{announcement.startDate}</td>
                                    <td className="text-start border px-4 py-3 whitespace-nowrap">{announcement.endDate}</td>
                                    <td className="text-start border px-4 py-3 whitespace-nowrap">{announcement.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HrDashboard;
