import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      try {
        const response = await fetch("http://localhost:3500/api/protected", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if(!response.ok){
          localStorage.removeItem("token");
          navigate("/");
          return;
        }

        const data = await response.json();
        setUser(data.user);
        setLoading(false);
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };
    verifyToken();
  },[]);
  if(loading) return <div>loading......</div>

  return <div>dashboard</div>;
}

export default dashboard;
