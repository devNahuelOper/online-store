import React from "react";
import { Query } from "react-apollo";
import CartItem from "./CartItem";

import Queries from "../../graphql/queries";
const { FETCH_CART_ITEMS } = Queries;

export default function Cart() {
  return (
    <Query query={FETCH_CART_ITEMS}>
      {({ error, loading, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;

        let cost = 0;
        
        return (
          <div className="cart">
            <h1 className="cart-title">Shopping Cart</h1>
            {!data.cart || !data.cart.length ? (
              <p>The Cart is Empty 🛒</p>
            ) : (
              <div>
                {data.cart.map((product) => {
                  cost += product.cost;
                  return <CartItem key={product._id} _id={product._id} />;
                })}
                <section className="total">
                  <hr />
                  <b>Total: ${cost}</b>
                </section>
              </div>
            )}
          </div>
        );
      }}
    </Query>
  );
}
