import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import LocationProvider from "./context/LocationProvider";
import './index.css'
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LocationProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </LocationProvider>
);