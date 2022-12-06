import React from "react";
import { Switch, Route } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route>
          <PublicRoute />
        </Route>
      </Switch>
    </>
  );
};

export default Routes;
