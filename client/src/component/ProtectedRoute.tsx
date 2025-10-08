import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

interface ProtectedProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedProps) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        setIsAuth(false);
        return;
      }

      try {
        const response = await api.get("/api/protected", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAuth(response.data.ok); // backend verifies token
      } catch (err) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!isAuth) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
