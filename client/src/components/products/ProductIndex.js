import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
// import "./products.css";

import Queries from "../../graphql/queries";
const { FETCH_PRODUCTS } = Queries;

const ProductIndex = () => {
  return (
    <Query query={FETCH_PRODUCTS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        console.log(data);
        return (
          <List className="product-index">
            {data.products.map((product) => (
              <ListItem key={product._id} className="product">
                <Link to={`/products/${product._id}`}>
                  <Typography variant="h6">{product.name}</Typography>
                </Link>
              </ListItem>
            ))}
          </List>
        );
      }}
    </Query>
  );
};

export default ProductIndex;
