import React from "react";

import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";

import { PoolProvider } from "./context/PoolContext";

import reportWebVitals from "./reportWebVitals";

 

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(

  <React.StrictMode>

    <BrowserRouter>

      <AuthProvider>

        <PoolProvider>

          <App />

        </PoolProvider>

      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>

);

 

reportWebVitals();