import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "../util/route_util";
import ProductIndex from "./products/ProductIndex";
import Login from "./session/Login";
import Register from "./session/Register";
import Nav from "./Nav";
import "../App.css";

function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth"/>
        <Route exact path="/register" component={Register}/>
        <Route path="/" component={ProductIndex} />
      </Switch>
    </div>
  );
}

export default App;
