import React from "react";
import { Route, Switch } from "react-router-dom";
import ProductIndex from "./products/ProductIndex";
import Login from "./Login";
import "../App.css";

function App() {
  return (
    <div>
      <h1>Online Store</h1>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route path="/" component={ProductIndex} />
      </Switch>
    </div>
  );
}

export default App;
