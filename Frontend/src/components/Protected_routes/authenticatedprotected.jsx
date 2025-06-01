import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Authenticatedprotected = ({ component:Component }) => {
    const [isloggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // To handle the loading state

    useEffect(() => {
        const fn = async () => {
            try {
                const resp = await axios.post(
                    "http://localhost:8000/HRMS/api/user/login",
                    {},
                    { withCredentials: true }
                );
                if (resp.status === 200) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.log(error.response.data);
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false); // Set loading to false after checking
            }
        };
        fn();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Show a loading state while the authentication is being checked
    }

    if (isloggedIn) {
        return <Navigate to="/emp-dboard" />; // Redirect to login if not logged in
    } else {
        return <Component />; // Render the component if logged in
    }
};

export default Authenticatedprotected;