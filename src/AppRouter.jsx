import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "./Pages/Categories";

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
