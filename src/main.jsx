import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Categories from "./Pages/Categories.jsx";
import CandidateList from "./Pages/CandidateList.jsx";
import AuthenticationPage from "./Pages/AuthenticationPage.jsx";
import CandidateForm from "./Pages/CandidateForm.jsx";
import ConfirmOTP from "./Pages/ConfirmOTP.jsx";
import CreateUserForm from "./Pages/UserSignUp.jsx";
import { GlobalContextProvider } from "./context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/authenticationpage",
    element: <AuthenticationPage />,
  },
  {
    path: "/confirmotp",
    element: <ConfirmOTP />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/candidatelist",
    element: <CandidateList />,
  },
  {
    path: "/signup",
    element: <CreateUserForm />,
  },
  {
    path: "/candidateform",
    element: <CandidateForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <RouterProvider router={router} />
    </GlobalContextProvider>
  </React.StrictMode>
);
