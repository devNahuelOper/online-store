const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const mongoose = require("mongoose");

const CategoryType = new GraphQLObjectType({
  name: "CategoryType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    products: { type: new GraphQLList(require("./product_type"))}
  }),
});

module.exports = CategoryType;