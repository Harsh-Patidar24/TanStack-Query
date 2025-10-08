import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface Props {
  showLogin?: () => void; // callback to switch to Login
}

const RegisterForm = ({ showLogin }: Props) => {
  const { register, registerLoading } = useAuth();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    register({ userName, email, role, password });
  };

  return (
    <form onSubmit={handleRegister} style={{ padding: "20px" }}>
      <h2>Register</h2>

      <div>
        <label>Username:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          disabled={registerLoading}
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={registerLoading}
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={registerLoading}
        />
      </div>

      <div>
        <label>Role:</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          disabled={registerLoading}
        />
      </div>

      <button type="submit" disabled={registerLoading}>
        {registerLoading ? "Registering..." : "Register"}
      </button>

      <p style={{ marginTop: "10px" }}>
        Already have an account?{" "}
        <button
          type="button"
          onClick={showLogin || (() => navigate("/login"))}
          style={{
            color: "blue",
            border: "none",
            background: "none",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Login here
        </button>
      </p>

      <p>{message}</p>
    </form>
  );
};

export default RegisterForm;
