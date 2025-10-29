import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import BooksPage from "./pages/BooksPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CategoriesPage />} />
        <Route path="/books/:category" element={<BooksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;