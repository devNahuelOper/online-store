import React from "react";
import { Mutation } from "react-apollo";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";

import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
const { DELETE_PRODUCT } = Mutations;
const { FETCH_PRODUCTS } = Queries;

const DeleteProduct = ({ _id, name }) => {
  const history = useHistory();

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
          className="delete-product"
          onClick={(e) => {
            e.preventDefault();
            deleteProduct({ variables: { _id } });
            history.push("/products");
          }}
          title={`Delete ${name}`}
        >
          <DeleteIcon color="action" />
        </a>
      )}
    </Mutation>
  );
};

export default DeleteProduct;
