import React from "react";
import { Query } from "react-apollo";

import Queries from "../../graphql/queries";
const { FETCH_CART_ITEMS } = Queries;

const Cart = () => {
  return (
    <Query query={FETCH_CART_ITEMS}>
      {({ error, loading, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;

        let cost = 0;

        return (
          <div>
            <h3>Shopping Cart</h3>
          </div>
        )
      }}
    </Query>
  );
};

export default Cart;
