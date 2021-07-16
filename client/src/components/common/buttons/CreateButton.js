import React from "react";
import Button from "@material-ui/core/Button";
import {
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

const CreateButton = ({ entity, color = "#363636" }) => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: color,
      },
    },
  });
  return (
    <MuiThemeProvider theme={theme}>
      <Button variant="contained" color="primary" type="submit" className={`create-btn create-${entity}-btn`}>
        Create {entity}
      </Button>
    </MuiThemeProvider>
  );
};

export default CreateButton;
