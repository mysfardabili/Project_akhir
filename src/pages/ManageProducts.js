import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import db from "../utils/firebaseConfig";
import ProductList from "../components/ProductList";

/**
 * Komponen ManageProducts digunakan untuk mengelola daftar produk, termasuk menambahkan produk baru dan mencari produk.
 * 
 * @returns {JSX.Element} - Elemen JSX yang merender antarmuka untuk mengelola produk.
 */
const ManageProducts = () => {
  // State untuk menyimpan daftar produk
  const [products, setProducts] = useState([]);
  // State untuk menyimpan nama produk baru
  const [newName, setNewName] = useState("");
  // State untuk menyimpan harga produk baru
  const [newPrice, setNewPrice] = useState("");
  // State untuk menyimpan kata kunci pencarian
  const [search, setSearch] = useState("");

  // Mengambil data produk dari Firestore saat komponen pertama kali di-render.
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsArray);
    };

    fetchProducts();
  }, []);

  
  // Menambahkan produk baru ke Firestore dan memperbarui daftar produk.
  const handleAddProduct = async () => {
    if (newName && newPrice) {
      const newProduct = { name: newName, price: Number(newPrice) };

      const docRef = await addDoc(collection(db, "products"), newProduct);
      setProducts([...products, { id: docRef.id, ...newProduct }]);
      setNewName("");
      setNewPrice("");
    }
  };

  
  // Memfilter produk berdasarkan kata kunci pencarian.
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      {/* Form untuk menambahkan produk baru */}
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
      {/* Input untuk mencari produk */}
      <input
        type="text"
        placeholder="Cari produk..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      {/* Menampilkan daftar produk yang sudah difilter */}
      <ProductList products={filteredProducts} setProducts={setProducts} />
    </div>
  );
};

export default ManageProducts;