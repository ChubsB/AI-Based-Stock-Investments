import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ path, element }) => {
  const { isAuthenticated } = useAuth();
  // const navigate = useNavigate();

  // if (!isAuthenticated) {
  //   navigate('/login');
  //   return null;
  // }
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  // return <Route path={path} element={element} />;
};

export default ProtectedRoute;
