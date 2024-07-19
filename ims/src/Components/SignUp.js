import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SignUp = ({ onSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });
  const handleSignUp = async () => {
    let result = await fetch("http://localhost:5000/signup", {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (username.length > 3 && password.length > 3) {
      result = await result.json();
      localStorage.setItem("user", JSON.stringify(result));
      console.log(result);
      navigate("/");
    } else {
      alert(" Username or Password is not valid");

      navigate("/signup");
    }

    // Validate input fields
    if (!username || !password) {
      alert("Please enter username and password");
      navigate("/signup");

      return;
    }

    // Call parent component function
    onSignUp({ username, password });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <span>Already have an account?</span>

      <NavLink className="Link" to="/login">
        Login
      </NavLink>
    </div>
  );
};

export default SignUp;
