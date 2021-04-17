import React from "react";
import { Query } from "react-apollo";
import DeleteProduct from "./DeleteProduct";
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

        const { _id, name, description, cost, image } = data.product;
        return (
          <div className="product-detail">
            <DeleteProduct _id={_id} name={name} />
            <article className="product-info">
              <h1 className="product-name">{name}</h1>
              <p className="product-description">{description}</p>
              <span className="product-cost">
                Cost: <b>${cost}.00</b>
              </span>
            </article>
            <figure className="product-image">{image && <img src={image} />}</figure>
          </div>
        );
      }}
    </Query>
  );
};

export default ProductDetail;
