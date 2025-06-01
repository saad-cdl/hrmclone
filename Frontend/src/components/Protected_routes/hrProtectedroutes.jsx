import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';  // Import the custom hook

const HrProtectedroutes = ({ component: Component }) => {
  const { isloggedIn, admin, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading state while authentication is being checked
  }
  console.log(isloggedIn, admin);
  if (isloggedIn && admin) {
    return <Component />;
  } else if (isloggedIn && !admin) {
    toast.error("Admin access only");
    return <Navigate to="/emp-dboard" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default HrProtectedroutes;
