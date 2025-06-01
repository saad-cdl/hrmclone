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
        companyName: '',
        logoname: '',
        companyLogo: null,
        logo_id: '',
        language: 'English',
        country: 'England',
        area: '',
        city: '',
        state: '',
        zipCode: '',
        address: '',
        email: '',
        secondary_email: '',
        phone: '',
        mobile: '',
        currency_name: '',
        Symbol: '',
        website: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user.organization) {
            toast.warn('Organization already exists.');
            return;
        }

        setLoading(true);

        const logoData = new FormData();
        logoData.append('name', formData.logoname);
        if (formData.companyLogo) {
            logoData.append('image', formData.companyLogo);
        }

        const languageData = {
            name: formData.language,
            website: formData.website
        };

        const addressData = {
            country: formData.country,
            area: formData.area,
            city: formData.city,
            state: formData.state,
            zip_code: formData.zipCode,
            address_line: formData.address,
        };

        const contactData = {
            email: formData.email,
            secondary_email: formData.secondary_email,
            phone: formData.phone,
            mobile: formData.mobile,
        };

        const currencyData = {
            name: formData.currency_name,
            symbol: formData.Symbol,
        };

        try {
            const logoResponse = await axios.post(`${baseURL}/logo`, logoData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            const logoId = logoResponse.data.data.id;

            const languageResponse = await axios.post(`${baseURL}/language`, languageData, { withCredentials: true });
            const languageId = languageResponse.data.data.id;

            const addressResponse = await axios.post(`${baseURL}/address`, addressData, { withCredentials: true });
            const addressId = addressResponse.data.data.id;

            const contactResponse = await axios.post(`${baseURL}/contact`, contactData, { withCredentials: true });
            const contactId = contactResponse.data.data.id;

            const currencyResponse = await axios.post(`${baseURL}/currency`, currencyData, { withCredentials: true });
            const currencyId = currencyResponse.data.data.id;

            const organizationData = {
                name: formData.companyName,
                logo_id: logoId,
                language_id: languageId,
                address_id: addressId,
                contact_id: contactId,
                currency_id: currencyId,
                website: formData.website,
            };

            const orgResponse = await axios.post(`${baseURL}/organization`, organizationData, { withCredentials: true });
            if (orgResponse?.data?.StatusCode === 201) {
                toast.success('Data saved successfully!');
                setEditMode(false);
                setShowSave(true);
                user.organization = orgResponse.data.data.id;
                console.log("Hello", user)
                localStorage.setItem('user', JSON.stringify(user));

            } else {
                throw new Error('Failed to save organization data');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.response.data.message || 'Error saving data!');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            if (formData.logoname !== originalData.logoname || formData.companyLogo || false) {
                const logoData = new FormData();
                logoData.append('name', formData.logoname);
                logoData.append('image', formData.companyLogo);
                console.log("Original", originalData)
                if (formData.companyLogo) {
                    logoData.append('image', formData.companyLogo);
                }
                const logoResponse = await axios.put(`${baseURL}/logo/${originalData.logo_id}`, logoData, {
                    withCredentials: true,
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }

            if (formData.language !== originalData.language || formData.website !== originalData.website) {
                const languageData = {
                    name: formData.language,
                    website: formData.website,
                };
                await axios.put(`${baseURL}/language/${originalData.language_id}`, languageData, { withCredentials: true });
            }

            if (formData.country !== originalData.country ||
                formData.area !== originalData.area ||
                formData.city !== originalData.city ||
                formData.state !== originalData.state ||
                formData.zipCode !== originalData.zipCode ||
                formData.address !== originalData.address) {
                const addressData = {
                    country: formData.country,
                    area: formData.area,
                    city: formData.city,
                    state: formData.state,
                    zip_code: formData.zipCode,
                    address_line: formData.address,
                };
                await axios.put(`${baseURL}/address/${originalData.address_id}`, addressData, { withCredentials: true });
            }

            if (formData.email !== originalData.email ||
                formData.secondary_email !== originalData.secondary_email ||
                formData.phone !== originalData.phone ||
                formData.mobile !== originalData.mobile) {
                const contactData = {
                    email: formData.email,
                    secondary_email: formData.secondary_email,
                    phone: formData.phone,
                    mobile: formData.mobile,
                };
                await axios.put(`${baseURL}/contact/${originalData.contact_id}`, contactData, { withCredentials: true });
            }

            if (formData.currency_name !== originalData.currency_name || formData.Symbol !== originalData.Symbol) {
                const currencyData = {
                    name: formData.currency_name,
                    symbol: formData.Symbol,
                };
                await axios.put(`${baseURL}/currency/${originalData.currency_id}`, currencyData, { withCredentials: true });
            }

            if (formData.companyName !== originalData.companyName || formData.website !== originalData.website) {
                const organizationData = {
                    name: formData.companyName,
                    logo_id: originalData.logo_id,
                    language_id: originalData.language_id,
                    address_id: originalData.address_id,
                    contact_id: originalData.contact_id,
                    currency_id: originalData.currency_id,
                    website: formData.website,
                };
                const orgResponse = await axios.put(`${baseURL}/organization/${originalData.organization_id}`, organizationData, { withCredentials: true });
                if (orgResponse?.data?.StatusCode === 200) {
                    toast.success('Organization updated successfully!');
                    user.organization = orgResponse.data.data.id;
                    localStorage.setItem('user', JSON.stringify(user));
                    setuser(user);
                } else {
                    throw new Error('Failed to update organization');
                }
            }
        } catch (error) {
            console.error('Error updating organization:', error);
            toast.error('Error updating data!');
        } finally {
            setLoading(false);
            setReset(false);
        }
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
