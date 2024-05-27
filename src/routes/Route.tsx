import React from "react";
import {
  Navigate,
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
} from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  //isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      element={!isAuthenticated ? <Navigate to="/login" /> : <Component />}
    />
  );
};

export default Route;
