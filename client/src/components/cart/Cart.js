import React from "react";
import { Query } from "react-apollo";
import CartItem from "./CartItem";

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
            {!data.cart || !data.cart.length  ? (
              <p>The Cart is Empty</p>
            ) : (
              <div>
                {data.cart.map(product => {
                  cost += product.cost;
                  return <CartItem key={product._id} _id={product._id}/>
                })}
                <b>Total: ${cost}</b>
              </div>
            )}
          </div>
        )
      }}
    </Query>
  );
};

export default Cart;
