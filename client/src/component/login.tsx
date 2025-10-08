import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3500/api/auth";

const LoginForm = () => {
  // ✅ Hooks must be inside component
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName || !password) {
      setMessage("Please enter username and password.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed.");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard"); 
    } catch (error) {
      console.error(error);
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ padding: "20px" }}>
      <h2>Login</h2>

      <div>
        <label>Username:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
  );
};

export default LoginForm;
