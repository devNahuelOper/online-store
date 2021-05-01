import React, { useState, useRef } from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Query, Mutation } from "react-apollo";

import Queries from "../../graphql/queries";
const { FETCH_CART_ITEMS } = Queries;

const AddCart = ({ _id, name, cost }) => {
  
  return (
    <Query query={FETCH_CART_ITEMS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        const inCart = data.cart.find((item) => item._id == _id);
        console.log(inCart);

        if (!inCart) {
          return (
            <div>
              <AddShoppingCartIcon
                className="add-to-cart"
                title={`Add ${name} to Cart`}
                onClick={(cache, { _id, name, cost }) =>
                  addItemToCart(cache, { _id, name, cost })
                }
              />
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

export default AddCart;