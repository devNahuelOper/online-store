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
};

export default Queries;
