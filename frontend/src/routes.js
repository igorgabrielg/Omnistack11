import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import Profile from "./pages/Profile";
import NovoCaso from "./pages/NovoCaso";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/register" component={Registrar} exact />
        <Route path="/profile" component={Profile} exact />
        <Route path="/casos/novo" component={NovoCaso} exact />
      </Switch>
    </BrowserRouter>
  );
}