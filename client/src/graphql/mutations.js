import gql from "graphql-tag";

const Mutations = {
  LOGIN_USER: gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        loggedIn
      }
    }
  `,
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        loggedIn
      }
    }
  `,
  REGISTER_USER: gql`
    mutation RegisterUser($name: String!, $email: String!, $password: String!) {
      register(name: $name, email: $email, password: $password) {
        _id
        name
        email
        token
        loggedIn
      }
    }
  `,
  CREATE_PRODUCT: gql`
    mutation CreateProduct($name: String, $description: String, $weight: Float, $image: Upload) {
      newProduct(name: $name, description: $description, weight: $weight, image: $image) {
        _id
        name
        description
        weight
        image
      }
    }
  `,
  DELETE_PRODUCT: gql`
    mutation DeleteProduct($_id: ID!) {
      deleteProduct(_id: $_id) {
        _id
      }
    }
  `
};

export default Mutations;
