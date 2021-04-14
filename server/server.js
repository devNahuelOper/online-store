const { User, Category, Product } = require("./models/index");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../config/keys").mongoURI;

const expressGraphQL = require("express-graphql").graphqlHTTP;
const schema = require("./schema/schema");
const cors = require("cors");

const app = express();

if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Successfully"))
  .catch((err) => console.log(err));


app.use(cors());

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

module.exports = app;
