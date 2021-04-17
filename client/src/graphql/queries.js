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
        weight
        image
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
        weight
        category {
          _id
          name
        }
        image
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
