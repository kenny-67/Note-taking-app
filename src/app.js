import React from "react";
import ReactDOM from "react-dom";
import NoteTaker from "../src/components/NoteTaker";

// import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "./styles/bootstrap.min.css";

const appRoot = document.getElementById("app");
ReactDOM.render(<NoteTaker />, appRoot);
