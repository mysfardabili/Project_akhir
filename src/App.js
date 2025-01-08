import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ManageProducts from "./pages/ManageProducts";
import Order from "./pages/Order";

const App = () => {
  return (
    <div className="bg-white text-black min-h-screen">
      <Router>
        <nav className="bg-blue-500 text-white p-4">
          <div className="container mx-auto flex justify-between">
            <Link to="/" className="font-bold">Home</Link>
            <Link to="/Daftar Produk" className="font-bold">Product List</Link>
            <Link to="/Order" className="font-bold">Pesan Produk</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Daftar Produk" element={<ManageProducts />} />
          <Route path="/Order" element={<Order />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;