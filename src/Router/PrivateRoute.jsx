import React, { use } from 'react';
import { AuthContext } from '../FirebaseAuth/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {

    const { loggedInUser, loading } = use(AuthContext);
    const location = useLocation();


    if (loading) {
        return <div className='w-full mx-auto mt-12'>
            <span className="loading loading-spinner text-primary"></span>
            <span className="loading loading-spinner text-secondary"></span>
            <span className="loading loading-spinner text-accent"></span>
            <span className="loading loading-spinner text-neutral"></span>
            <span className="loading loading-spinner text-info"></span>
            <span className="loading loading-spinner text-success"></span>
            <span className="loading loading-spinner text-warning"></span>
            <span className="loading loading-spinner text-error"></span>
        </div>;
    }



    if (!loggedInUser) {
        return <Navigate to='/login' state={location?.pathname} ></Navigate>
    }



    return children;
};

export default PrivateRoute;