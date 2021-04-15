import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "../util/route_util";
import ProductIndex from "./products/ProductIndex";
import Login from "./session/Login";
import Nav from "./Nav";
import "../App.css";

function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth"/>
        {/* <Route exact path="/login" component={Login}/> */}
        <Route path="/" component={ProductIndex} />
      </Switch>
    </div>
  );
}

export default App;
