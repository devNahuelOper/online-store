import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LogoutButton from "./common/buttons/LogoutButton";
import { Query } from "react-apollo";

import Queries from "../graphql/queries";
const { IS_LOGGED_IN } = Queries;

const Nav = (props) => {
  return (
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
                <LogoutButton props={props}/>
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
  );
};

export default Nav;
