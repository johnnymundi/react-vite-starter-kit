import { Navigate, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Login } from "../pages/Login";

export const ProjectRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={isAuthenticated ? "<HomePage />" : <Navigate to="/login" />}
      />
      <Route
        path="/min-max-standard"
        element={
          isAuthenticated ? "<MinMaxStandard />" : <Navigate to="/login" />
        }
      />
      <Route
        path="/color-library"
        element={
          isAuthenticated ? "<ColorLibrary />" : <Navigate to="/login" />
        }
      />
      <Route
        path="/upload"
        element={isAuthenticated ? "<Upload />" : <Navigate to="/login" />}
      />
      <Route
        path="/certification"
        element={
          isAuthenticated ? "<Certification />" : <Navigate to="/login" />
        }
      />
      <Route
        path="/hub"
        element={isAuthenticated ? "<Hub />" : <Navigate to="/login" />}
      />
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
      />
    </Routes>
  );
};
