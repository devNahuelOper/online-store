import React from "react";
import TextField from "@material-ui/core/TextField";

const EmailField = ({ email, onChange }) => {
  return (
    <TextField
      label="Email"
      placeholder="Email"
      type="email"
      variant="outlined"
      fullWidth
      email={email}
      onChange={onChange}
    />
  );
}

export default EmailField;