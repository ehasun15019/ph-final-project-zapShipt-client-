import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center my-6">
        <span className="loading loading-infinity loading-xl text-primary"></span>
      </div>
    );
  }

  if(!user) {
   return  <Navigate to="/login"></Navigate>
  }

  return children;
};

export default PrivateRoutes;
