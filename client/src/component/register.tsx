import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3500/api/auth";

const RegisterForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent form reload

    if (!userName || !email || !password) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email, role, password }),
      });

      const data = await res.json();
      console.log("response", data);

      // ✅ Save token if backend returns it (you can modify backend to send one)
      if (data.token) {
        localStorage.setItem("token", data.token);
        // setMessage("Registration successful! Token saved.");
      } else {
        setMessage(data.message || "User registered successfully.");
      }
      navigate("/login");
    } catch (err) {
      console.error(err);
      setMessage("Registration failed. Try again.");
    }
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
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

      <div>
        <label>Role:</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>

      <button type="submit">Register</button>
      <p>{message}</p>
    </form>
  );
};

export default RegisterForm;
