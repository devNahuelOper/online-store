import React from "react";
import { Mutation } from "react-apollo";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PasswordField from "./common/fields/PasswordField";

import Mutations from "../graphql/mutations";
const { LOGIN_USER } = Mutations;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  updateCache(client, { data }) {
    console.log(data);

    client.writeData({
      data: { isLoggedIn: data.login.loggedIn },
    });
  }

  render() {
    const { email, password, showPassword, message } = this.state;

    return (
      <Mutation
        mutation={LOGIN_USER}
        onError={(err) => this.setState({ message: err.message })}
        onCompleted={(data) => {
          const { token } = data.login;
          localStorage.setItem("auth-token", token);
          this.props.history.push("/");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {(loginUser) => (
          <div className="form__wrap login__wrap">
            <form
              id="loginForm"
              onSubmit={(e) => {
                e.preventDefault();
                loginUser({
                  variables: {
                    email,
                    password,
                  },
                });
              }}
            >
              <TextField
                label="Email"
                placeholder="Email"
                type="email"
                value={email}
                variant="outlined"
                fullWidth
                onChange={this.updateField("email")}
              />
              <br />
              <PasswordField
                showPassword={showPassword}
                password={password}
                onChange={this.updateField("password")}
                onClick={this.toggleShowPassword}
              />
              <br />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="submit-btn login-btn"
              >
                Login
              </Button>
            </form>
            <br />
            <p className="error">{message}</p>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Login;
