import React from "react";
import TextField from "@material-ui/core/TextField";

const NameField = ({ name, entity = "", variant = "outlined", onChange }) => {
  return (
    <TextField
      label={`${entity} Name`}
      placeholder={`${entity} Name`}
      type="text"
      variant={variant}
      fullWidth
      value={name}
      onChange={onChange}
    />
  );
};

export default NameField;
