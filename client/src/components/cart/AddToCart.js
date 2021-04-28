import React, { useState } from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Query } from "react-apollo";

import Queries from "../../graphql/queries";
const { FETCH_CART_ITEMS } = Queries;

const AddToCart = ({ _id, name, cost }) => {
  
  return (
    <Query query={FETCH_CART_ITEMS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        console.log(data.cart);

        const inCart = data.cart.find((item) => item._id == _id);

        const addToCart = (cache, { data }) => {
          const addedItem = { _id, cost, name };
          let cart;

          try {
            cart = cache.readQuery({query: FETCH_CART_ITEMS});
          } catch (err) {
            return;
          }
        }
        if (!inCart) {
          return (
            <div>
              <AddShoppingCartIcon />
            </div>
          )
        } else {
          return (
            <div>
              <RemoveShoppingCartIcon />
            </div>
          )
        }
      }}
    </Query>
  );
};

export default AddToCart;
