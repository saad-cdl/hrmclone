import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import useAuth from '../context/user.context';
// import currency from '../../../../Backend/src/models/currency.model';

export default function HrGeneral() {
    const [editmode, setEditMode] = useState(false);
    const [showsave, setShowSave] = useState(false);
    const [originalData, setOriginalData] = useState({});
    const [reset, setReset] = useState(false);
    const { user, setuser } = useAuth();
    console.log("User", user);
    const [formData, setFormData] = useState({
        companyName: 'Demo Company',
        logoname: 'demo-logo',
        companyLogo: null,
        language: 'English',
        country: 'England',
        area: 'London',
        city: 'London',
        state: 'Greater London',
        zipCode: 'SW1A 1AA',
        address: '123 Business Street',
        email: 'contact@democompany.com',
        secondary_email: 'support@democompany.com',
        phone: '+44 20 1234 5678',
        mobile: '+44 77 1234 5678',
        currency_name: 'British Pound',
        Symbol: '£',
        website: 'www.democompany.com',
    });
    const [loading, setLoading] = useState(false);
    const baseURL = 'http://localhost:8000/HRMS/api';

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!user.organization) {
                    console.log("No organization assigned to user.");
                    return;
                }

                const response = await axios.get(`${baseURL}/organization/${user.organization}`, { withCredentials: true });
                const data = response.data.data;
                console.log(data);

                if (data) {
                    setOriginalData({
                        logo_id: data.logo.id,
                        language_id: data.language.id,
                        address_id: data.address.id,
                        contact_id: data.contact.id,
                        currency_id: data.currency.id,
                        organization_id: data.organization.id,
                    });

                    setFormData({
                        logo_id: data.logo.id,
                        companyName: data.organization.name,
                        logoname: data.logo.name,
                        companyLogo: data.logo.url,
                        language: data.language.name,
                        country: data.address.country,
                        area: data.address.area,
                        city: data.address.city,
                        state: data.address.state,
                        zipCode: data.address.zip_code,
                        address: data.address.address_line,
                        email: data.contact.email,
                        secondary_email: data.contact.secondary_email,
                        phone: data.contact.phone,
                        mobile: data.contact.mobile,
                        currency_name: data.currency.name,
                        Symbol: data.currency.symbol,
                        website: data.organization.website,
                    });

                    setEditMode(true);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (user.organization) {
            fetchData();
        }
    }, [user.organization, reset]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        setFormData({
            ...formData,
            [name]: e.target.files[0],
        });
    };

    const handleCancel = () => {
        setEditMode(false);
        setShowSave(false);
        setReset(true);
        // setFormData(originalData); // Reset form data to original
    };

    const handleEdit = () => {
        setEditMode(false);
        setShowSave(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulate API call delay
        setTimeout(() => {
            toast.success('Data saved successfully!');
            setEditMode(false);
            setShowSave(true);
            setLoading(false);
        }, 1000);
    };

    const handleSave = () => {
        setLoading(true);
        
        // Simulate API call delay
        setTimeout(() => {
            toast.success('Organization updated successfully!');
            setLoading(false);
            setShowSave(false);
        }, 1000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-9 bg-white p-4 rounded-md shadow-md text-gray-800">
            <h2 className="text-xl font-semibold">Company Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                <div><label className="block font-medium">Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        disabled={editmode}
                        className="mt-1 p-2 w-full text-sm rounded-lg border border-gray-300"
                        placeholder="Company Name"
                    /></div>
                <div><label className="block font-medium">Website</label>
                    <input
                        type="link"
                        name="Website"
                        value={formData.website}
                        onChange={handleChange}
                        disabled={editmode}
                        className="mt-1 p-2 w-full text-sm rounded-lg border border-gray-300"
                        placeholder="Company Name"
                    /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <label className="block font-medium">Logo Name</label>
                    <input
                        type="text"
                        name="logoname"
                        value={formData.logoname}
                        disabled={editmode}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full text-sm rounded-lg border border-gray-300"
                    />
                </div>
                <div>
                    <label className="block font-medium">Company Logo --Recommended Size(210 x 50 px)</label>
                    <input
                        type="file"
                        name="companyLogo"
                        onChange={handleFileChange}
                        disabled={editmode}
                        className="mt-1 p-2 w-full text-sm rounded-lg border border-gray-300"
                    />
                </div>
                <div>
                    <label className="block font-medium">Language</label>
                    <select
                        name="language"
                        value={formData.language}
                        disabled={editmode}
                        onChange={handleChange}
                        className="mt-1 p-3  w-full text-sm rounded-lg border border-gray-300"
                    >
                        <option>English</option>
                        <option>French</option>
                        <option>Spanish</option>
                        <option>German</option>
                    </select>
                </div>
            </div>

            <h2 className="text-xl font-semibold">Address Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <label className="block font-medium">Country</label>
                    <select
                        name="country"
                        value={formData.country}
                        disabled={editmode}
                        onChange={handleChange}
                        className="mt-1 p-2.5  w-full text-sm rounded-lg border border-gray-300"
                    >
                        <option>England</option>
                        <option>USA</option>
                        <option>France</option>
                        <option>Germany</option>
                    </select>
                </div>
                <div>
                    <label className="block font-medium">Area</label>
                    <input
                        type="text"
                        name="area"
                        value={formData.area}
                        disabled={editmode}
                        onChange={handleChange}
                        className="mt-1 p-2.5  w-full text-sm rounded-lg border border-gray-300"
                    />
                </div>
                <div>
                    <label className="block font-medium">City</label>
                    <input
                        type="text"
                        name="city"
                        disabled={editmode}
                        value={formData.city}
                        onChange={handleChange}
                        className="mt-1 p-2.5  w-full text-sm rounded-lg border border-gray-300"
                    />
                </div>
                <div>
                    <label className="block font-medium">State</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        disabled={editmode}
                        onChange={handleChange}
                        className="mt-1 p-2.5  w-full text-sm rounded-lg border border-gray-300"
                    />
                </div>
                <div>
                    <label className="block font-medium">Zip Code</label>
                    <input
                        type="text"
                        name="zipCode"
                        disabled={editmode}
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="mt-1 p-2.5  w-full text-sm rounded-lg border border-gray-300"
                    />
                </div>
                <div>
                    <label className="block font-medium">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        disabled={editmode}
                        onChange={handleChange}
                        className="mt-1 p-2.5  w-full text-sm rounded-lg border border-gray-300"
                    />
                </div>
            </div>

            <h2 className="text-xl font-semibold">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <label className="block font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled={editmode}
                        onChange={handleChange}
                        className="mt-1 p-2.5 w-full text-sm rounded-lg border border-gray-300"
                    />
                </div>
                <div>
                    <label className="block font-medium">Secondary Email</label>
                    <input
                        type="email"
                        name="secondary_email"
                        value={formData.secondary_email}
                        disabled={editmode}
                        onChange={handleChange}
                        className="mt-1 p-2.5 w-full text-sm rounded-lg border border-gray-300"
                    />
                </div>
                <div>
                    <label className="block font-medium">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        disabled={editmode}
                        onChange={handleChange}
                        className="mt-1 p-2.5 w-full text-sm rounded-lg border border-gray-300"
                    />
                </div>
                <div>
                    <label className="block font-medium">Mobile</label>
                    <input
                        type="text"
                        name="mobile"
                        disabled={editmode}
                        value={formData.mobile}
                        onChange={handleChange}
                        className="mt-1 p-2.5 w-full text-sm rounded-lg border border-gray-300"
                    />
                </div>
            </div>
            <h2 className="text-xl font-semibold">Currency Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <label className="block font-medium">name</label>
                    <input
                        disabled={editmode}
                        type="text"
                        name="currency_name"
                        value={formData.currency_name}
                        onChange={handleChange}
                        className="mt-1 p-2.5 w-full text-sm rounded-lg border border-gray-300"
                    />
                </div>
                <div>
                    <label className="block font-medium">Currency Symbol</label>
                    <input
                        type="text"
                        name="Symbol"
                        value={formData.Symbol}
                        disabled={editmode}
                        onChange={handleChange}
                        className="mt-1 p-2.5 w-full text-sm rounded-lg border border-gray-300"
                    />
                </div>
            </div>
            <div>
                {/* This section is shown when user.organization exists */}
                {user.organization && (
                    <div>
                        {/* Show the Edit button when not in edit mode */}
                        {editmode && (
                            <button
                                type="button"
                                className="mt-4 w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-500"
                                onClick={handleEdit}
                            >
                                Edit
                            </button>
                        )}

                        {/* Show Save and Cancel buttons when in edit mode */}
                        {showsave && (
                            <div className="flex space-x-4 mt-4">
                                <button
                                    type="button"
                                    className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500"
                                    disabled={loading}
                                    onClick={handleSave}
                                >
                                    {loading ? <ClipLoader size={20} color="#ffffff" /> : 'Save'}
                                </button>
                                <button
                                    type="button"
                                    className="w-full bg-yellow-400 text-white p-2 rounded-lg hover:bg-yellow-500"
                                    disabled={loading}
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Show Submit button if user.organization does not exist */}
                {!user.organization && (
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500"
                        disabled={loading || editmode}
                    >
                        {loading ? <ClipLoader size={20} color="#ffffff" /> : 'Submit'}
                    </button>
                )}
            </div>
        </form>
    );
}
