import React, { useState, useEffect } from 'react';
import useAuth from '../context/user.context';
import axios from 'axios';
import { toast } from 'react-toastify';
// import employee from '../../../../Backend/src/models/employee.model';

const HrEmployee = () => {
    const baseURL = 'http://localhost:8000/HRMS/api';
    const [employees, setEmployees] = useState([]);
    const [rerender, setRerender] = useState(false);
    const [addnewemployee, setAddnewemployee] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Track if editing or adding
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null); // To track the employee being edited
    const [newEmployee, setNewEmployee] = useState({
        user: '',
        username: '',
        password: '',
        phone: '',
        address: '',
        admin: false,
        role: '',
        location: 'Remote',
        Salary: '',
        paid_leave: '',
        unpaid_leave: '',
        attendance: ''
    });
    const { user } = useAuth();

    const extract_date = (data) => {
        const dateString = data;
        const dateObject = new Date(dateString);
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1; // Months are 0-based, so add 1
        const day = dateObject.getDate();
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        return formattedDate;
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const resp = await axios.get(baseURL + '/employee/organization/' + user.organization, { withCredentials: true });
                setEmployees(resp.data.data);
                console.log(resp.data.data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };
        fetchEmployees();
        setRerender(false);
    }, [rerender]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewEmployee({
            ...newEmployee,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleAddEmployee = async () => {
        try {
            newEmployee.organization = user.organization;
            console.log(newEmployee);
            const response = await axios.post(baseURL + '/employee/', newEmployee, { withCredentials: true });
            console.log(response);
            if (response.data.StatusCode === 200) {
                setAddnewemployee(false);
                setRerender(!rerender);
                toast.success('Employee added successfully');
                setNewEmployee(response.data.data);
                setIsModalOpen(false);
            }
            // setEmployees([...employees, response.data.data]);
        } catch (error) {
            console.error('Error adding new employee:', error);
        }
    };

    const handleEditEmployee = async () => {
        try {
            // console.log(newEmployee);
            const response = await axios.put(baseURL + '/employee/' + newEmployee.user, newEmployee, { withCredentials: true });
            if (response.data.StatusCode === 200) {
                console.log(response);
                setEmployees(
                    employees.map(emp => (emp.id === selectedEmployeeId ? response.data.data : emp))
                );
                console.log(employees);
                setIsModalOpen(false);
                setIsEditing(false);
                setSelectedEmployeeId(null);
                setRerender(!rerender);
                toast.success('Employee updated successfully');
            }
            console.log(response);
        } catch (error) {
            console.error('Error editing employee:', error);
        }
    };

    const handleDeleteEmployee = async (employee) => {
        try {
            if (!window.confirm('Are you sure you want to delete this employee?')) return;
            if (employee.role === 'Owner') {
                alert('Cannot delete owner');
                return;
            }
            await axios.delete(baseURL + '/employee/' + employee.id, { withCredentials: true });
            setRerender(!rerender);
            // setEmployees(employees.filter(emp => emp.id !== id));

        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleEditClick = (employee) => {
        setNewEmployee({
            id: employee.id,
            user: employee.user,
            username: '',
            password: '',
            phone: employee.phone,
            address: employee.address || '',
            admin: employee.admin,
            role: employee.role,
            location: employee.location,
            Salary: employee.Salary,
            paid_leave: employee.paid_leave,
            unpaid_leave: employee.unpaid_leave,
            attendance: employee.attendance || ''
        });
        setIsEditing(true);
        setSelectedEmployeeId(employee.id);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center p-4 rounded-md shadow-md bg-white">
                <h1 className="text-xl font-semibold">All Employees</h1>
                <button
                    className="bg-primary text-white px-4 py-2 rounded"
                    onClick={() => {
                        setAddnewemployee(true);
                        setIsEditing(false);
                        setNewEmployee({
                            username: '',
                            password: '',
                            user: '',
                            phone: '',
                            address: '',
                            admin: false,
                            role: '',
                            location: 'Remote',
                            Salary: '',
                            paid_leave: '',
                            unpaid_leave: '',
                            attendance: ''
                        });
                        setIsModalOpen(true);
                    }}>
                    + Add Employee
                </button>
            </div>

            <div className="p-4 rounded-md shadow-md bg-white space-y-3">
                <input type="text" placeholder="Search" className="border bg-gray-100 p-2 w-full rounded-md focus:border-none focus:outline-primary" />

                <div className='overflow-x-auto w-full'>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-start border px-4 py-3">username</th>
                                <th className="text-start border px-4 py-3">ID</th>
                                <th className="text-start border px-4 py-3">Location</th>
                                <th className="text-start border px-4 py-3">Phone</th>
                                <th className="text-start border px-4 py-3">Joining Date</th>
                                <th className="text-start border px-4 py-3">Role</th>
                                <th className="text-start border px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee, index) => (
                                <tr key={index}>
                                    <td className="py-2 flex items-center">

                                        {employee.user.name}
                                    </td>
                                    <td className="text-start border px-4 py-3">{employee.user.id}</td>
                                    <td className="text-start border px-4 py-3">{employee.location}</td>
                                    <td className="text-start border px-4 py-3">{employee.phone}</td>
                                    <td className="text-start border px-4 py-3">{extract_date(employee.createdAt)}</td>
                                    <td className="text-start border px-4 py-3">{employee.role}</td>
                                    <td className="text-start border px-4 py-3 space-x-2">
                                        <button
                                            className="text-blue-600"
                                            onClick={() => handleEditClick(employee)}>
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-600"
                                            onClick={() => handleDeleteEmployee(employee)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center h-screen">
                    <div className="bg-white px-8 py-4 rounded shadow-lg max-w-lg mx-auto h-full overflow-y-auto space-y-4">
                        <h2 className="text-xl">{isEditing ? 'Edit Employee' : 'Add New Employee'}</h2>
                        <div className='space-y-2'>
                            <input
                                type="number"
                                name="user"
                                placeholder="User ID"
                                disabled={true}
                                className={`${addnewemployee ? "hidden" : "border p-2 w-full rounded"}`}
                                value={newEmployee.user}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                // disabled={true}
                                className={`${!addnewemployee ? "hidden" : "border p-2 w-full rounded"}`}
                                value={newEmployee.username}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="password"
                                placeholder="Password"
                                // disabled={true}
                                className={`${!addnewemployee ? "hidden" : "border p-2 w-full rounded"}`}
                                value={newEmployee.password}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                className="border p-2 w-full rounded"
                                value={newEmployee.phone}
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                name="address"
                                placeholder="Address ID"
                                className="border p-2 w-full rounded"
                                value={newEmployee.address}
                                onChange={handleInputChange}
                            />
                            <div className="mb-2 flex items-center">
                                <input
                                    type="checkbox"
                                    name="admin"
                                    className="mr-2"
                                    checked={newEmployee.admin}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="admin">Admin</label>
                            </div>
                            <input
                                type="text"
                                name="role"
                                placeholder="Role"
                                className="border p-2 w-full rounded"
                                value={newEmployee.role}
                                onChange={handleInputChange}
                            />
                            <select
                                name="location"
                                className="border p-2 w-full rounded"
                                value={newEmployee.location}
                                onChange={handleInputChange}
                            >
                                <option value="Remote">Remote</option>
                                <option value="Onsite">Onsite</option>
                            </select>
                            <input
                                type="text"
                                name="Salary"
                                placeholder="Salary"
                                className="border p-2 w-full rounded"
                                value={newEmployee.Salary}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="paid_leave"
                                placeholder="Paid Leave"
                                className="border p-2 w-full rounded"
                                value={newEmployee.paid_leave}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="unpaid_leave"
                                placeholder="Unpaid Leave"
                                className="border p-2 w-full rounded"
                                value={newEmployee.unpaid_leave}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="attendance"
                                placeholder="Attendance"
                                className="border p-2 w-full rounded"
                                value={newEmployee.attendance}
                                onChange={handleInputChange}
                            />
                            <button
                                className="bg-primary text-white px-4 py-2 rounded"
                                onClick={isEditing ? handleEditEmployee : handleAddEmployee}>
                                {isEditing ? 'Save Changes' : 'Add Employee'}
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setAddnewemployee(false);
                                }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HrEmployee;
