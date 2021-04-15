import React from "react";
import { Mutation } from "react-apollo";
import Button from "@material-ui/core/Button";
import PasswordField from "../common/fields/PasswordField";
import EmailField from "../common/fields/EmailField";
import NameField from "../common/fields/NameField";
import "./session.css";

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
      <Mutation
        mutation={REGISTER_USER}
        onError={(err) => this.setState({ message: err.message })}
        onCompleted={(data) => {
          console.log(data);
          const { token } = data.register;
          localStorage.setItem("auth-token", token);
          this.props.history.push("/");
        }}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(registerUser) => (
          <div className="form__wrap register__wrap">
            <form
              id="registerForm"
              onSubmit={(e) => {
                e.preventDefault();
                registerUser({
                  variables: {
                    name,
                    email,
                    password,
                  },
                });
              }}
            >
              <NameField name={name} onChange={this.updateField("name")} />
              <br />
              <EmailField email={email} onChange={this.updateField("email")} />
              <br />
              <PasswordField
                password={password}
                showPassword={showPassword}
                onChange={this.updateField("password")}
                onClick={this.toggleShowPassword}
              />
              <br />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="submit-btn register-btn"
              >
                Register
              </Button>
            </form>
            <p className="error">{message}</p>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Register;
