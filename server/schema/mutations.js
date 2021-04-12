const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} = graphql;
const mongoose = require("mongoose");

const Category = mongoose.model("categories");
const CategoryType = require("./types/category_type");

const Product = mongoose.model("products");
const ProductType = require("./types/product_type");

const User = mongoose.model("users");
const UserType = require("./types/user_type");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newCategory: {
      type: CategoryType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(parentValue, { name }) {
        return new Category({ name }).save();
      },
    },
    deleteCategory: {
      type: CategoryType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { _id }) {
        return Category.findById(_id).then((category) =>
          Category.deleteOne(category)
        );
      },
    },
    newProduct: {
      type: ProductType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(parentValue, { name, description }) {
        return new Product({ name, description }).save();
      },
    },
    deleteProduct: {
      type: ProductType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { _id }) {
        return Product.findById(_id).then((product) =>
          Product.deleteOne(product)
        );
      },
    },
    updateProductCategory: {
      type: ProductType,
      args: {
        productId: { type: new GraphQLNonNull(GraphQLID) },
        categoryId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, { productId, categoryId }) {
        return Product.updateProductCategory(productId, categoryId);
      },
    },
  },
});

module.exports = mutation;
