import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

const Employeeprotectedroutes = ({ component: Component }) => {
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
        return <Component />; // Render the component if logged in
    } else {
        return <Navigate to="/login" />; // Redirect to login if not logged in
    }
};

export default Employeeprotectedroutes