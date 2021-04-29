import React, { useState } from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Query } from "react-apollo";

import Queries from "../../graphql/queries";
const { FETCH_CART_ITEMS } = Queries;

const AddToCart = ({ _id, name, cost }) => {

  const addItemToCart = (e, cache) => {
    e.preventDefault();
    const addedItem = { _id, cost, name };
    console.log('cache', cache);
    console.log('item', addedItem);
    let cart;

    try {
      cart = cache.readQuery({ query: FETCH_CART_ITEMS });
    } catch (err) {
      return;
    }

    // inCart = cart?.cart.find((item) => item._id == _id);

    if (cart) {
      let cartArray = cart.cart;
      cache.writeQuery({
        query: FETCH_CART_ITEMS,
        data: { cart: [...cartArray, addedItem] },
      });
    }

    console.log(cart);
  };

  return (
    <Query query={FETCH_CART_ITEMS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        console.log(data.cart);

        const inCart = data.cart.find((item) => item._id == _id);
        console.log(inCart);

        if (!inCart) {
          return (
            <div>
              <AddShoppingCartIcon className="add-to-cart" title={`Add ${name} to Cart`} onClick={(e, cache) => addItemToCart(e, cache)}/>
            </div>
          );
        } else {
          return (
            <div>
              <RemoveShoppingCartIcon />
            </div>
          );
        }
      }}
    </Query>
  );
  // if (!inCart) {
  //   return (
  //     <div>
  //       <AddShoppingCartIcon
  //         className="add-to-cart"
  //         title={`Add ${name} to Cart`}
  //         onClick={(cache) => addItemToCart(cache)}
  //       />
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div>
  //       <RemoveShoppingCartIcon />
  //     </div>
  //   );
  // }
};

export default AddToCart;
