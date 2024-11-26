import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

const PrivateRoute = ({ element }) => {
  const { isLoggedIn } = useSelector((state) => state.user); 


  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return element; 
};

export default PrivateRoute;
