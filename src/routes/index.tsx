import { Navigate, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
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
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
      />
      {/* <Route
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
      /> */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
      />
    </Routes>
  );
};
