import React from 'react'
import { Navigate } from 'react-router-dom';

const Authenticatedprotected = ({ component:Component }) => {
    // Always render the component without authentication check
    return <Component />;
};

export default Authenticatedprotected;