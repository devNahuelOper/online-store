import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LogoutButton from "./common/buttons/LogoutButton";
import { Query } from "react-apollo";
import { ApolloConsumer } from "react-apollo";

import Queries from "../graphql/queries";
const { IS_LOGGED_IN } = Queries;

const Nav = (props) => {
  return (
    <ApolloConsumer>
      {(client) => (
        <Query query={IS_LOGGED_IN}>
          {({ data }) => {
            return (
              <AppBar position="static">
                <Toolbar component="nav" className="nav">
                  <Link to="/">
                    <Typography variant="h5" className="nav-title">
                      Products
                    </Typography>
                  </Link>
                  {data.isLoggedIn ? (
                    <LogoutButton
                      onClick={(e) => {
                        e.preventDefault();
                        localStorage.removeItem("auth-token");
                        client.writeData({ data: { isLoggedIn: false } });
                        props.history && props.history.push("/");
                      }}
                    />
                  ) : (
                    <Link to="/login">
                      <Typography variant="h5" className="nav-title">
                        Login
                      </Typography>
                    </Link>
                  )}
                </Toolbar>
              </AppBar>
            );
          }}
        </Query>
      )}
    </ApolloConsumer>
  );
};

export default Nav;
