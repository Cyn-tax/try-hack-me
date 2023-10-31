import React from 'react';

const LogoutButton = () => {

  const handleLogout = () => {
    // Clear the authentication token from localStorage or session storage
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
