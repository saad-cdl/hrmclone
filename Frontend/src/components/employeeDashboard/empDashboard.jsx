import React, { useState, useEffect } from "react";

const EmpDashboard = () => {
    const [leaveData, setLeaveData] = useState({
        totalAllowance: 20,
        paid: 15,
        unpaid: 5,
        taken: 3,
        available: 17,
        pending: 2
    });

    const [timeLog, setTimeLog] = useState({
        today: {
            scheduled: "08:00",
            balance: "12:00",
            worked: "05:00"
        },
        thisMonth: {
            total: 216,
            shortage: 23,
            overtime: 56,
            fullTotal: 240
        }
    });

    const [announcements, setAnnouncements] = useState([
        {
            id: 1,
            title: "Company Holiday",
            message: "Office will be closed on December 25th for Christmas",
            date: "2024-12-20"
        },
        {
            id: 2,
            title: "New Policy Update",
            message: "Remote work policy has been updated. Please check the HR portal for details.",
            date: "2024-12-15"
        }
    ]);

    useEffect(() => {
        // Data is already set in the initial state
    }, []);

    return (
        <div className="space-y-3">
            <div className="bg-white p-4 flex items-center justify-between rounded-md shadow-md">
                <h2 className="font-semibold">Dashboard</h2>
                <button className="font-semibold px-3 py-1 bg-primary text-white rounded">Technical Lead</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2 bg-white p-4 rounded shadow">
                    <h2 className="font-semibold">Total Leaves Allowance</h2>
                    <p>{leaveData.totalAllowance}</p>
                    <div className="inline-flex gap-4 items-center justify-start">
                        <p className="text-green-400">Paid {leaveData.paid}</p>
                        <p className="text-red-400">Unpaid {leaveData.unpaid}</p>
                    </div>
                </div>
                <div className="space-y-2 bg-white p-4 rounded shadow">
                    <h2 className="font-semibold">Total Leave Taken</h2>
                    <p>{leaveData.taken}</p>
                    <div className="inline-flex gap-4 items-center justify-start">
                        <p className="text-green-400">Paid {leaveData.paid}</p>
                        <p className="text-red-400">Unpaid {leaveData.unpaid}</p>
                    </div>
                </div>
                <div className="space-y-2 bg-white p-4 rounded shadow">
                    <h2 className="font-semibold">Total Leave Available</h2>
                    <p>{leaveData.available}</p>
                    <div className="inline-flex gap-4 items-center justify-start">
                        <p className="text-green-400">Paid {leaveData.paid}</p>
                        <p className="text-red-400">Unpaid {leaveData.unpaid}</p>
                    </div>
                </div>
                <div className="space-y-2 bg-white p-4 rounded shadow">
                    <h2 className="font-semibold">Leave Request Pending</h2>
                    <p>{leaveData.pending}</p>
                    <div className="inline-flex gap-4 items-center justify-start">
                        <p className="text-green-400">Paid {leaveData.paid}</p>
                        <p className="text-red-400">Unpaid {leaveData.unpaid}</p>
                    </div>
                </div>

            </div>
            <div className="bg-white space-y-3 p-4 rounded-md shadow-md">
                <div className="font-semibold">Time Log</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <div className="font-medium border-b-2">Today</div>
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
                                    <p>Total</p>
                                    <p>{timeLog.thisMonth.total} hours</p>
                                </div>
                                <div className="bg-gray-200 rounded-full h-1.5">
                                    <div className="bg-[#7AA2E3] h-1.5 rounded-full w-100"></div>
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
                                    <td className="text-start border px-4 py-3 whitespace-nowrap">{announcement.date}</td>
                                    <td className="text-start border px-4 py-3 whitespace-nowrap">{announcement.date}</td>
                                    <td className="text-start border px-4 py-3 whitespace-nowrap">{announcement.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}
export default EmpDashboard;