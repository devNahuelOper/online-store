import gql from "graphql-tag";

const Queries = {
  FETCH_PRODUCTS: gql`
    query FetchProducts{
      products {
        _id
        name
        description
        cost
        category {
          _id
          name
        }
      }
    }
  `,
  FETCH_PRODUCT: gql`
    query FetchProduct($_id: ID!) {
      product(_id: $_id) {
        _id
        name
        description
        cost
        category {
          _id
          name
        }
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
