import React from "react";
import { Mutation } from "react-apollo";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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

  render() {
    const { email, password, showPassword, message } = this.state;

    return (
      <Mutation
        mutation={LOGIN_USER}
        onError={(err) => this.setState({ message: err.message })}
        onCompleted={(data) => {
          const { token } = data.login;
          console.log(token);
          localStorage.setItem("auth-token", token);
          this.props.history.push("/");
        }}
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
              <TextField
                label="Password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                variant="outlined"
                fullWidth
                onChange={this.updateField("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle Password Visibility"
                        onClick={this.toggleShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
