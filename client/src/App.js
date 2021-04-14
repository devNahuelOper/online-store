import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const FETCH_PRODUCTS = gql`
  {
    products {
      _id
      name
    }
  }
`;

function App() {
  return (
    <Query query={FETCH_PRODUCTS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <ul>
            {data.products.map(product => (
              <li key={product._id}>{product.name}</li>
            ))}
          </ul>
        )
      }}
    </Query>
  );
}

export default App;
