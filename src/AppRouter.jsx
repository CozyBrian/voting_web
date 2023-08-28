import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Categories from "./Pages/Categories.jsx";
import CandidateList from "./Pages/CandidateList.jsx";
import AuthenticationPage from "./Pages/AuthenticationPage.jsx";
import CandidateForm from "./Pages/CandidateForm.jsx";
import ConfirmOTP from "./Pages/ConfirmOTP.jsx";
import CreateUserForm from "./Pages/UserSignUp.jsx";
import ProtectPages from "./protectPages.jsx";
import Results from "./Pages/results.jsx";
import Admin from "./Pages/admin.jsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route element={<ProtectPages />}>
          <Route path="/authenticationpage" element={<AuthenticationPage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/candidatelist" element={<CandidateList />} />
          <Route path="/confirmotp" element={<ConfirmOTP />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
        <Route path="/results" element={<Results />} />
        <Route path="/signup" element={<CreateUserForm />} />
        <Route path="/candidateform" element={<CandidateForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
