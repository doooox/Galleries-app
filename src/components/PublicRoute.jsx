import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { selectIsAuthenticated } from "../store/auth/selectors";


const PublicRoute = ({ children, ...props }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <>
      <Route {...props}>
        {isAuthenticated ? <Redirect to='/' /> : children}
      </Route>
    </>
  );
}

export default PublicRoute;