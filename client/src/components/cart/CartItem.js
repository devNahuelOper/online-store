import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";

const { FETCH_PRODUCT } = Queries;

const CartItem = (props) => {
  return (
    <Query query={FETCH_PRODUCT} variables={{ _id: props._id }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error.message}</p>;

        const { name, description, cost, image } = data.product;
        
        return (
          <>
            <div className="cart-item">
              <figure>
                <h3>{name}</h3>
                <img src={image} alt={name} className="cart-item-image" />
              </figure>
              <p>{description}</p>
              <p>Price: ${cost}</p>
            </div>
          </>
        );
      }}
    </Query>
  );
};

export default CartItem;
