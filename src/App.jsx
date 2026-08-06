import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct.jsx";
import UpdateProduct from "./pages/UpdateProduct.jsx";
import Header from "./components/Header.jsx";
import Login from "./pages/Login.jsx";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/update/:id" element={<UpdateProduct />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
