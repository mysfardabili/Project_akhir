import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import productsData from "../data/products.json"; // Import data produk dari JSON

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [newName, setNewName] = useState("");
    const [newPrice, setNewPrice] = useState("");

    // Memuat data produk dari file JSON
    useEffect(() => {
        setProducts(productsData);
    }, []);

    // Fungsi untuk menambah produk
    const handleAddProduct = () => {
        if (newName && newPrice) {
            const newProduct = {
                id: products.length + 1,
                name: newName,
                price: newPrice
            };
            setProducts([...products, newProduct]);
            setNewName("");
            setNewPrice("");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Product List</h1>

            {/* Form untuk menambah produk */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Nama Produk"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="border px-2 py-1 mr-2"
                />
                <input
                    type="number"
                    placeholder="Harga Produk"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="border px-2 py-1 mr-2"
                />
                <button
                    onClick={handleAddProduct}
                    className="bg-blue-500 text-white px-4 py-2"
                >
                    Tambah Produk
                </button>
            </div>

            {/* Tampilkan daftar produk */}
            <ProductList products={products} setProducts={setProducts} />
        </div>
    );
};

export default ManageProducts;
