import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // If user not logged in, redirect to login
  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  // return children;

  if (loading) return <p>Loading...</p>; // or a nice spinner

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
