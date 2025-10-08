import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export const userAuth = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [user, setUser] = useState<any>(null);

  const Register = async (
    userName: string,
    email: string,
    role: string,
    password: string
  ) => {
    setLoading(true);
    try {
      const response = await api.post("/api/auth/register", {
        userName,
        email,
        role,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      console.log("registered sucessfully");
      navigate("/login");
    } catch (error: any) {
      console.error(error);
    }
    setLoading(false);
  };

  const login = async (userName: string, password: string) => {
    setLoading(true);

    try {
      const response = await api.post("/api/auth/login", {
        userName,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

   return { Register, login};
};
