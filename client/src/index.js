import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
// import { createHttpLink } from "apollo-link-http";
import { createUploadLink } from "apollo-upload-client";
import { ApolloProvider } from "react-apollo";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import Mutations from "./graphql/mutations";
const { VERIFY_USER } = Mutations;

const cache = new InMemoryCache({
  dataIdFromObject: (object) => object._id || null,
});

const httpLink = createUploadLink({
  uri: "http://localhost:5000/graphql",
  headers: {
    authorization: localStorage.getItem("auth-token"),
  },
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  link: ApolloLink.from([errorLink, httpLink]),
  cache,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  },
});

const token = localStorage.getItem("auth-token");

cache.writeData({
  data: {
    isLoggedIn: Boolean(token),
  },
});

if (token) {
  client
    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      cache.writeData({
        data: {
          isLoggedIn: data.verifyUser.loggedIn,
        },
      });
    });
}

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <App />
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
