import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./component/login";
import RegisterForm from "./component/register";
import Dashboard from "./component/dashboard";
import ProtectedRoute from "./component/ProtectedRoute";
import Home from "./component/home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
