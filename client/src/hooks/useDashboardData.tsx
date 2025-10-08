import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export const useDashboardData = () => {
  const token = localStorage.getItem("token");

  const query = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const res = await api.get("/api/protected/rawdata", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    enabled: !!token, 
  });

  return query;
};
