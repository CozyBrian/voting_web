import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { GlobalContextProvider } from "./context";
import AppRouter from "./AppRouter.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <AppRouter />
    </GlobalContextProvider>
  </React.StrictMode>
);
