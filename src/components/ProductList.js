import React, { useState } from "react";

const ProductList = ({ products, setProducts }) => {
    const [editMode, setEditMode] = useState(null); // ID produk yang sedang diedit
    const [editName, setEditName] = useState(""); // Nama produk baru
    const [editPrice, setEditPrice] = useState(""); // Harga produk baru

    // Fungsi hapus produk
    const handleDelete = (id) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
    };

    // Fungsi mengaktifkan mode edit
    const handleEdit = (product) => {
        setEditMode(product.id); // Aktifkan mode edit untuk produk tertentu
        setEditName(product.name); // Isi nilai awal nama produk
        setEditPrice(product.price); // Isi nilai awal harga produk
    };

    // Fungsi menyimpan hasil edit
    const handleSave = (id) => {
        const updatedProducts = products.map((product) =>
            product.id === id
                ? { ...product, name: editName, price: editPrice }
                : product
        );
        setProducts(updatedProducts); // Update state produk
        setEditMode(null); // Nonaktifkan mode edit
    };

    // Fungsi membatalkan edit
    const handleCancel = () => {
        setEditMode(null); // Nonaktifkan mode edit tanpa menyimpan
    };

    return (
        <ul className="w-full max-w-md mx-auto">
            {products.map((product) => (
                <li
                    key={product.id}
                    className="border p-4 mb-2 flex justify-between items-center"
                >
                    {editMode === product.id ? (
                        // Tampilan untuk mode edit
                        <div className="flex-1">
                            <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="border px-2 py-1 mr-2 w-full"
                                placeholder="Nama Produk"
                            />
                            <input
                                type="number"
                                value={editPrice}
                                onChange={(e) => setEditPrice(e.target.value)}
                                className="border px-2 py-1 mr-2 w-full"
                                placeholder="Harga Produk"
                            />
                        </div>
                    ) : (
                        // Tampilan default
                        <div>
                            <h3 className="font-bold">{product.name}</h3>
                            <p>Harga: Rp{product.price}</p>
                        </div>
                    )}
                    <div className="flex">
                        {editMode === product.id ? (
                            // Tombol untuk mode edit
                            <>
                                <button
                                    onClick={() => handleSave(product.id)}
                                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                >
                                    Simpan
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Batal
                                </button>
                            </>
                        ) : (
                            // Tombol untuk tampilan default
                            <button
                                onClick={() => handleEdit(product)}
                                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Edit
                            </button>
                        )}
                        <button
                            onClick={() => handleDelete(product.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Hapus
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ProductList;
