// SignUpPage.js

import React from "react";
import SignUp from "../Components/SignUp";

const SignUpPage = () => {
  const handleSignUp = (userData) => {
    // Implement sign-up functionality
    console.log("Sign Up Data:", userData);
  };

  return (
    <div className="login-signup">
      <h1>Welcome to Sign Up Page</h1>
      <div className="form">
        <SignUp onSignUp={handleSignUp} />
      </div>
    </div>
  );
};

export default SignUpPage;
