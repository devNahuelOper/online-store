const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
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

const AuthService = require("../services/auth");

const { singleFileUpload } = require("../services/s3");
const { GraphQLUpload } = require("graphql-upload");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(_, args) {
        return AuthService.register(args);
      },
    },
    logout: {
      type: UserType,
      args: {
        _id: { type: GraphQLID },
      },
      resolve(_, args) {
        return AuthService.logout(args);
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(_, args) {
        return AuthService.login(args);
      },
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString },
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      },
    },
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
        weight: { type: GraphQLFloat },
        image: { type: GraphQLUpload },
      },
      async resolve(_, { name, description, weight, image }, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });
        const newObj = {};
        if (validUser.loggedIn) {
          if (image) newObj.image = await singleFileUpload(image);
          return new Product({ name, description, weight, ...newObj }).save();
        } else {
          throw new Error(
            "Sorry, you need to be logged in to create a product."
          );
        }
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
