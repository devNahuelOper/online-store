import React from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
const { DELETE_PRODUCT } = Mutations;
const { FETCH_PRODUCTS } = Queries;

const DeleteProduct = (props) => {
  return (
    <Mutation
      mutation={DELETE_PRODUCT}
      refetchQueries={() => {
        return [
          {
            query: FETCH_PRODUCTS,
          },
        ];
      }}
    >
      {(deleteProduct, { data }) => (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            deleteProduct({ variables: { _id: props._id } });
          }}
        >
          <span>Delete Product</span>
        </a>
      )}
    </Mutation>
  );
};

export default DeleteProduct;
