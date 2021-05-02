import React from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Query, ApolloConsumer } from "react-apollo";

import Queries from "../../graphql/queries";
const { FETCH_CART_ITEMS } = Queries;

const AddToCart = (props) => {
  const addItemToCart = (e, cache) => {
    e.preventDefault();

    const addedItem = { _id: props._id, name: props.name, cost: props.cost };
    let cart;

    try {
      cart = cache.readQuery({ query: FETCH_CART_ITEMS });
    } catch (err) {
      return;
    }

    if (cart) {
      let cartArray = cart.cart;
      cache.writeQuery({
        query: FETCH_CART_ITEMS,
        data: { cart: [...cartArray, addedItem] },
      });
    }
  };

  const removeItemFromCart = (e, cache) => {
    e.preventDefault();

    let cart;

    try {
      cart = cache.readQuery({ query: FETCH_CART_ITEMS });
    } catch (err) {
      return;
    }

    if (cart) {
      cache.writeQuery({
        query: FETCH_CART_ITEMS,
        data: { cart: cart.cart.filter((item) => item._id !== props._id) },
      });
    }
  };

  return (
    <ApolloConsumer>
      {(cache) => (
        <Query query={FETCH_CART_ITEMS} variables={{ productId: props._id }}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            const inCart = data.cart.some((item) => item._id == props._id);

            if (!inCart) {
              return (
                <div>
                  <AddShoppingCartIcon
                    className="add-to-cart"
                    title={`Add ${props.name} to Cart`}
                    onClick={(e) => addItemToCart(e, cache)}
                  />
                </div>
              );
            } else {
              return (
                <div>
                  <RemoveShoppingCartIcon
                    className="add-to-cart"
                    title={`Remove ${props.name} from Cart`}
                    onClick={e => removeItemFromCart(e, cache)}
                  />
                </div>
              );
            }
          }}
        </Query>
      )}
    </ApolloConsumer>
  );
};

export default AddToCart;
