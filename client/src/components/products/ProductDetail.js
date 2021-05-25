import React from "react";
import { Query } from "react-apollo";
import DeleteProduct from "./DeleteProduct";
import NameDetail from "./Detail/NameDetail";
import DescriptionDetail from "./Detail/DescriptionDetail";
import AddToCart from "../cart/AddToCart";
import Queries from "../../graphql/queries";
const { FETCH_PRODUCT } = Queries;

const ProductDetail = (props) => {
  const altImage = "https://avatars.githubusercontent.com/u/16979527?v=4";
  return (
    <Query
      query={FETCH_PRODUCT}
      variables={{ _id: props.match.params.productId }}
    >
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        const { _id, name, description, cost, image } = data.product;
        return (
          <div className="product-detail">
            <DeleteProduct _id={_id} name={name} />
            <article className="product-info">
              <NameDetail _id={_id} name={name} />
              <DescriptionDetail _id={_id} description={description} />
              <AddToCart _id={_id} name={name} cost={cost} />
              <span className="product-cost">
                Cost: <b>${cost}.00</b>
              </span>
            </article>
            <figure className="product-image">
              <img src={image || altImage} alt={name} />
            </figure>
          </div>
        );
      }}
    </Query>
  );
};

export default ProductDetail;
