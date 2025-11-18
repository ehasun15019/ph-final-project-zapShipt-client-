import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center my-6">
        <span className="loading loading-infinity loading-xl text-primary"></span>
      </div>
    );
  }

  if(!user) {
   return  <Navigate state={location.pathname} to="/login"></Navigate>
  }

  return children;
};

export default PrivateRoutes;
