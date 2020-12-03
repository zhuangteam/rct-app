import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, createMuiTheme, CssBaseline } from "@material-ui/core";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <ThemeProvider theme={createMuiTheme({ palette: { type: "light" } })}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
