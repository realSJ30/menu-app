import { useAuth } from "@/hooks/use-auth";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import Register from "@/pages/register";
import { Navigate, Route, Routes } from "react-router-dom";

const RoutesComponent = () => {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={!currentUser ? <Login /> : <Navigate to={"/dashboard"} />}
      />
      <Route
        path="/register"
        element={!currentUser ? <Register /> : <Navigate to={"/dashboard"} />}
      />
      <Route
        path="/dashboard"
        element={currentUser ? <Dashboard /> : <Navigate to={"/"} />}
      />
    </Routes>
  );
};

export default RoutesComponent;
