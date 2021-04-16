import React from "react";
import { Mutation } from "react-apollo";
import TextField from "@material-ui/core/TextField";
import NameField from "../common/fields/NameField";

import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
const { CREATE_PRODUCT } = Mutations;
const { FETCH_PRODUCTS } = Queries;

class ProductCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      weight: "",
      message: "",
    };
  }

  updateField(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  updateCache(cache, { data }) {
    let products;

    try {
      products = cache.readQuery({ query: FETCH_PRODUCTS });
    } catch (err) {
      return;
    }

    if (products) {
      let productArray = products.products;
      let newProduct = data.newProduct;
      cache.writeQuery({
        query: FETCH_PRODUCTS,
        data: { products: [...productArray, newProduct] },
      });
    }
  }

  handleSubmit(e, newProduct) {
    e.preventDefault();

    const { name, description, weight } = this.state;
    newProduct({
      variables: {
        name,
        description,
        weight: parseInt(weight),
      },
    });
  }

  render() {
    const { name, description, weight, message } = this.state;

    return (
      <Mutation
        mutation={CREATE_PRODUCT}
        onError={(err) => this.setState({ message: err.message })}
        update={(cache, data) => this.updateCache(cache, data)}
        onCompleted={data => {
          this.setState({ message: `${data.newProduct.name} created successfully`});
          const goToProduct = () => this.props.history.push(`/products/${data.newProduct._id}`);
          setTimeout(goToProduct, 1000);
        }}
      ></Mutation>
    );
  }
}

export default ProductCreate;
