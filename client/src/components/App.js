import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "../util/route_util";
import ProductIndex from "./products/ProductIndex";
import Login from "./Login";
import "../App.css";

function App() {
  return (
    <div>
      <h1>Online Store</h1>
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth"/>
        <Route path="/" component={ProductIndex} />
      </Switch>
    </div>
  );
}

export default App;
