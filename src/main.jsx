import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";
import { Login } from "./pages/Login/index";
import { Otp } from "./pages/Otp/index";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/* <Otp /> */}
  </React.StrictMode>
);
