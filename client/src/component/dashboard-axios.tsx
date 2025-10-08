import { rawData } from "../data/raw"; 
// import { useUsers } from "../hooks/useAuth";


const Dashboard = () => {
    // const { data: users, isLoading, isError } = useUsers();

    //   if (isLoading) return <div>Loading raw data...</div>;
    //   if (isError) return <div>Error loading data!</div>;
  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard Raw Data</h2>
      <pre style={{ background: "#f4f4f4", padding: "10px" }}>
        {JSON.stringify(rawData, null, 2)}
      </pre>
    </div>
  );
};

export default Dashboard;
