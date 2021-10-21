import React from "react";
import "./products.css";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Queries from "../../graphql/queries";

const { FETCH_PRODUCTS } = Queries;

const ProductIndex = () => {
  const altImage = "https://avatars.githubusercontent.com/u/16979527?v=4";
  return (
    <Query query={FETCH_PRODUCTS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <div className="product-index">
            <List id="product-list" className="product-list">
              {data.products.map((product) => (
                <ListItem key={product._id} className="product">
                  <Link to={`/products/${product._id}`}>
                    <Typography variant="h6" className="product-name">
                      {product.name}
                    </Typography>
                  </Link>
                  <br />
                  <img className="product-avatar" src={product.image || altImage} alt={product.name}/>
                </ListItem>
              ))}
            </List>
            <Link to="/new" className="new-product-link">
              <Typography variant="h6" className="product-name">
                Create Product
              </Typography>
            </Link>
          </div>
        );
      }}
    </Query>
  );
};

export default ProductIndex;
