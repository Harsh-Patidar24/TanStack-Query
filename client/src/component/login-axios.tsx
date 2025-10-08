import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface Props {
  showRegister?: () => void; // callback to switch to Register
}

const LoginForm = ({ showRegister }: Props) => {
  const { login, loginLoading } = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ userName, password });
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
          disabled={loginLoading}
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loginLoading}
        />
      </div>

      <button type="submit" disabled={loginLoading}>
        {loginLoading ? "Logging in..." : "Login"}
      </button>

      <p style={{ marginTop: "10px" }}>
        Don't have an account?{" "}
        <button
          type="button"
          onClick={showRegister || (() => navigate("/register"))}
          style={{
            color: "blue",
            border: "none",
            background: "none",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Register here
        </button>
      </p>

      <p>{message}</p>
    </form>
  );
};

export default LoginForm;
