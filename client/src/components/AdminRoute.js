import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import api from '../utils/api';

const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const response = await api.get('/admin/verify');
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        setIsAdmin(false);
        if (error.response?.status === 401) {
          localStorage.removeItem('role');
          localStorage.removeItem('token');
        }
      }
    };

    if (token) {
      verifyAdmin();
    } else {
      setIsAdmin(false);
    }
  }, [token]);

  if (isAdmin === null) {
    return <LoadingSpinner />;
  }

  if (!token || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute; 