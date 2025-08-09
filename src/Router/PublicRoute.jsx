import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../FirebaseAuth/AuthContext";

const PublicRoute = ({ children }) => {
  const { loggedInUser, loading } = useContext(AuthContext);

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

  if (loggedInUser?._id) {
    // User is logged in, redirect to home or dashboard
    return <Navigate to="/" replace />;
  }

  // User NOT logged in, allow access
  return children;
};

export default PublicRoute;
