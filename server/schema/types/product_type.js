const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
} = graphql;
const mongoose = require("mongoose");
const Product = mongoose.model("products");

const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    category: {
      type: require("./category_type"),
      resolve(parentValue) {
        return Product.findById(parentValue._id)
          .populate("category")
          .then((product) => product.category);
      },
    },
    weight: { type: GraphQLFloat },
    cost: { type: GraphQLInt },
  }),
});

module.exports = ProductType;
