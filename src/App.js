import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Sesuaikan path dengan file Home.js
import ManageProducts from "./pages/ManageProducts"; // Sesuaikan path dengan file ManageProducts.js

const App = () => {
    return (
        <Router>
            <div>
                <nav className="bg-blue-500 text-white p-4">
                    <div className="container mx-auto flex justify-between">
                        <a href="/" className="font-bold">Home</a>
                        <a href="/Daftar Produk" className="font-bold">Product List</a>
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Daftar Produk" element={<ManageProducts />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
