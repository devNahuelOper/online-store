import gql from "graphql-tag";

const Queries = {
  FETCH_PRODUCTS: gql`
    {
      products {
        _id
        name
      }
    }
  `,
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
};

export default Queries;
