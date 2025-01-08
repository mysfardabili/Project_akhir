import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import db from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";

const ProductList = ({ products, setProducts }) => {
  const [editMode, setEditMode] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  const handleSelectProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleProceedToOrder = () => {
    const selectedProductsData = products.filter((product) =>
      selectedProducts.includes(product.id)
    );
    navigate("/Order", { state: { selectedProducts: selectedProductsData } });
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditMode(product.id);
    setEditName(product.name);
    setEditPrice(product.price);
  };

  const handleSave = async (id) => {
    try {
      const productDoc = doc(db, "products", id);
      await updateDoc(productDoc, { name: editName, price: Number(editPrice) });
      setProducts(
        products.map((product) =>
          product.id === id ? { ...product, name: editName, price: Number(editPrice) } : product
        )
      );
      setEditMode(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCancel = () => {
    setEditMode(null);
  };

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="border p-4 mb-2 flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.id)}
                onChange={() => handleSelectProduct(product.id)}
                className="mr-4"
              />
              {editMode === product.id ? (
                <div>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border px-2 py-1 mr-2"
                  />
                  <input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="border px-2 py-1 mr-2"
                  />
                </div>
              ) : (
                <div>
                  <h3 className="font-bold">{product.name}</h3>
                  <p>Harga: Rp{product.price}</p>
                </div>
              )}
            </div>
            <div className="flex">
              {editMode === product.id ? (
                <>
                  <button
                    onClick={() => handleSave(product.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Batal
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete (product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Hapus
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={handleProceedToOrder}
        className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
      >
        Lanjut Order
      </button>
    </div>
  );
};

export default ProductList;