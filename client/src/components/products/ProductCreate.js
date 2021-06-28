import React from "react";
import { Mutation } from "react-apollo";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import CreateButton from "../common/buttons/CreateButton";
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
      messageType: "success",
      image: null,
      preview: null,
    };
  }

  updateField(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  updateImage(file) {
    const src = URL.createObjectURL(file);
    this.setState({ image: file, preview: src });
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

    const { name, description, weight, image } = this.state;
    newProduct({
      variables: {
        name,
        description,
        weight: parseInt(weight),
        image,
      },
    });
  }

  render() {
    const { name, description, weight, message, messageType, preview } =
      this.state;

    return (
      <Mutation
        mutation={CREATE_PRODUCT}
        onError={(err) =>
          this.setState({ message: err.message, messageType: "error" })
        }
        update={(cache, data) => this.updateCache(cache, data)}
        onCompleted={(data) => {
          console.log(data);
          this.setState({
            message: `${data.newProduct.name} created successfully`,
            messageType: "success",
          });
          const goToProduct = () =>
            this.props.history.push(`/products/${data.newProduct._id}`);
          setTimeout(goToProduct, 1000);
        }}
      >
        {(newProduct, { data }) => (
          <div className="form__wrap create__product__wrap">
            <form
              id="createProductForm"
              onSubmit={(e) => this.handleSubmit(e, newProduct)}
            >
              <NameField
                name={name}
                entity="Product"
                onChange={this.updateField("name")}
              />
              <br />
              <TextareaAutosize
                aria-label="minimum height"
                className="new-description"
                rowsMin={5}
                placeholder="Description"
                value={description}
                onChange={this.updateField("description")}
              />
              <br />
              <Input
                className="product-weight"
                type="number"
                placeholder="Weight"
                fullWidth
                value={weight}
                onChange={this.updateField("weight")}
              />
              <br />
              <figure className="preview__wrap">
                <Button variant="contained" component="label">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={({
                      target: {
                        validity,
                        files: [file],
                      },
                    }) => validity.valid && this.updateImage(file)}
                  />
                </Button>
                {preview && <img src={preview} className="image-preview" alt="Product Preview"/>}
              </figure>
              <br />
              <CreateButton entity="product" />
            </form>
            <p className={messageType}>{message}</p>
          </div>
        )}
      </Mutation>
    );
  }
}

export default ProductCreate;
