import { Navigate, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";

export const ProjectRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <Home />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
      />
    </Routes>
  );
};
