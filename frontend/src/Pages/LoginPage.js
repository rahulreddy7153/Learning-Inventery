// LoginPage.js

import React, { useEffect } from "react";
import Login from "../Components/Login";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const handleLogin = (userData) => {
    // Implement login functionality
    console.log("Login Data:", userData);
  };

  const navigate = useNavigate();

  useEffect(() => {}, [navigate]);

  return (
    <div className="login-signup">
      <h1>Welcome to Login Page</h1>
      <div className="form">
        <Login onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
