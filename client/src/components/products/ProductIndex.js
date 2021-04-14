import React from "react";
import { Query } from "react-apollo";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

import Queries from "../../graphql/queries";
const { FETCH_PRODUCTS } = Queries;

const ProductIndex = () => {
  return (
    <Query query={FETCH_PRODUCTS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <List>
            {data.products.map((product) => (
              <ListItem key={product._id}>
                <Typography variant="h6">{product.name}</Typography>
              </ListItem>
            ))}
          </List>
        );
      }}
    </Query>
  );
}

export default ProductIndex;