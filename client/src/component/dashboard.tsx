import { rawData } from "../data/raw";

const Dashboard = () => {
  return (
    <div style={{ display: "grid", flexWrap: "wrap", gap: "10px" }}>
      {rawData.map((item) => (
        <div
          key={item.id}
          style={{ border: "1px solid #ccc", padding: "10px" }}
        >
          <p>ID: {item.id}</p>
          <p>Name: {item.name}</p>
          <p>Email: {item.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
