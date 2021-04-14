import React from "react";
import Button from "@material-ui/core/Button";

const LogoutButton = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      id="logout-btn"
      className="logout-btn"
      onClick={onClick}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
