import React from "react";
import { Query } from "react-apollo";

import Queries from "../../graphql/queries";
const { FETCH_PRODUCT } = Queries;

const ProductDetail = (props) => {
  return (
    <Query
      query={FETCH_PRODUCT}
      variables={{ _id: props.match.params.productId }}
    >
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        console.log(data);

        const { name, description, cost } = data.product;
        return (
          <div>
            <h1>{name}</h1>
            <p>Description: {description}</p>
            <span>
              Cost: <b>{cost}</b>
            </span>
          </div>
        );
      }}
    </Query>
  );
};

export default ProductDetail;
