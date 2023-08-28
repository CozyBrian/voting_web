import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { GlobalContextProvider } from "./context";
import AppRouter from "./AppRouter.jsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </GlobalContextProvider>
  </React.StrictMode>
);
