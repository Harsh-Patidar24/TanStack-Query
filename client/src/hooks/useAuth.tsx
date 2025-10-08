import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export const useAuth = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (credentials: { userName: string; password: string }) => {
      const res = await api.post("/api/auth/login", credentials);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      }
    },
    onError: (err) => {
      console.error("Login failed", err);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (payload: {
      userName: string;
      email: string;
      role: string;
      password: string;
    }) => {
      const res = await api.post("/api/auth/register", payload);
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Registered successfully", data);
      navigate("/login");
    },
    onError: (err) => {
      console.error("Registration failed", err);
    },
  });

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    loginLoading: loginMutation.isPending,
    registerLoading: registerMutation.isPending,
  };
};
