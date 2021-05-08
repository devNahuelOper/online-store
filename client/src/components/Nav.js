import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LogoutButton from "./common/buttons/LogoutButton";
import { Query } from "react-apollo";
import { ApolloConsumer } from "react-apollo";

import Queries from "../graphql/queries";
const { IS_LOGGED_IN } = Queries;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    border: "1px solid #3506ef87",
    boxShadow:
      "0px 0px 4px 2px inset #9d39b2, 0px -2px 2px 4px #9d39b2b3, 0px -3px 4px 2px #010da4c9",
  },
  title: {
    flexGrow: 1,
    color: "#fff",
    fontSize: `${1.5}rem`,
    "&:hover": {
      textShadow: "2px 2px #111111cf",
      transform: "perspective(500px) translateZ(10px)",
      transition: "0.5s",
    },
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-around",
  },
}));

const Nav = (props) => {
  const classes = useStyles();

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#363636",
      },
    },
  });

  return (
    <ApolloConsumer>
      {(client) => (
        <Query query={IS_LOGGED_IN}>
          {({ data }) => {
            return (
              <MuiThemeProvider theme={theme}>
                <AppBar position="static" className={classes.root}>
                  <Toolbar component="nav" className="nav">
                    <Link to="/products">
                      <Typography
                        variant="h5"
                        className={`nav-title ${classes.title}`}
                      >
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
                        <Typography
                          variant="h5"
                          className={`nav-title ${classes.title}`}
                        >
                          Login
                        </Typography>
                      </Link>
                    )}
                    <Link to="/register">
                      <Typography
                        variant="h5"
                        className={`nav-title ${classes.title}`}
                      >
                        Register
                      </Typography>
                    </Link>
                    <Link to="/cart">
                      <Typography
                        variant="h5"
                        className={`nav-title ${classes.title}`}
                      >
                        Cart
                      </Typography>
                    </Link>
                  </Toolbar>
                </AppBar>
              </MuiThemeProvider>
            );
          }}
        </Query>
      )}
    </ApolloConsumer>
  );
};

export default Nav;
