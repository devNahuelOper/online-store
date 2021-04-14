import React from "react";
import Button from "@material-ui/core/Button";


const LogoutButton = (props) => {
  return (
    <Button variant="contained" className="logout-btn" onClick={e => {
      e.preventDefault();
      localStorage.removeItem("auth-token");
      props.history.push("/");
    }}>
      Logout
    </Button>
  );
}

export default LogoutButton;