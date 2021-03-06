const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const UserType = require("./user_type");
const User = mongoose.model("users");

const CategoryType = require("./category_type");
const Category = mongoose.model("categories");

const ProductType = require("./product_type");
const Product = mongoose.model("products");

const axios = require("axios");
const AWSKey = require("../../../config/keys").AWSKey;

const authOptions = {
  method: "GET",
  url:
    "https://l02zs1n263.execute-api.us-east-1.amazonaws.com/default/generate-price",
  headers: {
    "x-api-key": AWSKey,
  },
};

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      },
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      },
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve() {
        return Category.find({});
      },
    },
    category: {
      type: CategoryType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Category.findById(args._id);
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve() {
        return Product.find({}).then(products => {
          return products.map(product => {
            return axios(authOptions).then(res => {
              product.cost = res.data.cost;

              return product;
            })
          })
        });
      },
    },
    product: {
      type: ProductType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Product.findById(args._id).then(product => {
          return axios(authOptions).then(res => {
            product.cost = res.data.cost;
            return product;
          })
        })
      },
    },
  }),
});

module.exports = RootQueryType;
