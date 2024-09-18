// src/components/Auth/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth-context/auth-context';

const ProtectedRoute = ({ children }) => {
  const { user, token } = useAuth();
  console.log(user, token);
  if (!user || !token) {
    return <Navigate to="/landingpage" replace />;
  }

  return children;
};

export default ProtectedRoute;
