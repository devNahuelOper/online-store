import React from "react";
import { Query } from "react-apollo";

import Queries from "../../graphql/queries";
const { FETCH_PRODUCT } = Queries;

const CartItem = ({ _id }) => {
  return (
    <Query query={FETCH_PRODUCT} variables={{ productId: _id }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error.message}</p>;

        const { name, description, cost } = data.product;
        return (
          <>
            <div className="cart-item">
              <p>Name: {name}</p>
              <p>Description: {description}</p>
              <p>Price: ${cost}</p>
            </div>
            <hr />
          </>
        );
      }}
    </Query>
  );
};

export default CartItem;
