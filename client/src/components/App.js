import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ProductIndex from "./products/ProductIndex";

function App() {
  return (
    <div>
      <h1>Online Store</h1>
      <Switch>
        <Route exact path="/" component={ProductIndex} />
      </Switch>
    </div>
  );
}

export default App;
