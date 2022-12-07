import React from "react";
import { Switch, Route } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const Routes = () => {
  return (
    <>
      <Switch>
        <PublicRoute exact path="/">
          <HomePage />
        </PublicRoute>
        <PublicRoute path="/login">
          <LoginPage />
        </PublicRoute>
        <PublicRoute path="/register">
          <RegisterPage />
        </PublicRoute>
      </Switch>
    </>
  );
};

export default Routes;
