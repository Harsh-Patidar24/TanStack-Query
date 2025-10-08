import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // User is not logged in, redirect to home
    return <Navigate to="/" replace />;
  }

  // User is logged in, allow access
  return children;
};

export default ProtectedRoute;
