import React from "react";
import { Mutation } from "react-apollo";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PasswordField from "../common/fields/PasswordField";
import EmailField from "../common/fields/EmailField";

import Mutations from "../../graphql/mutations";
const { REGISTER_USER } = Mutations;

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      showPassword: false,
      message: "",
    };

    this.toggleShowPassword = this.toggleShowPassword.bind(this);
  }

  toggleShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  updateField(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  updateCache(cache, { data }) {
    cache.writeData({
      data: { isLoggedIn: data.register.loggedIn },
    });
  }

  render() {
    const { name, email, password, showPassword, message } = this.state;

    return (
      <Mutation mutation={REGISTER_USER}>

      </Mutation>
    )
  }
}

export default Register;
