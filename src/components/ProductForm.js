import React, { useState } from 'react';

/**
 * Komponen ProductForm digunakan untuk menambahkan produk baru ke dalam daftar produk.
 * 
 * @param {Object} props - Properti yang diterima oleh komponen.
 * @param {Function} props.addProduct - Fungsi yang akan dipanggil untuk menambahkan produk baru.
 * @returns {JSX.Element} - Elemen JSX yang merender form untuk menambahkan produk.
 */
const ProductForm = ({ addProduct }) => {
  // State untuk menyimpan nama produk
  const [name, setName] = useState('');
  // State untuk menyimpan harga produk
  const [price, setPrice] = useState('');

  /**
   * Fungsi handleSubmit dipanggil ketika form disubmit.
   * Fungsi ini akan memanggil fungsi addProduct dengan data produk yang baru.
   * 
   * @param {Event} e - Event yang dipicu oleh submit form.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({ name, price });
    // Mengosongkan input setelah produk ditambahkan
    setName('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded shadow">
      {/* Input untuk nama produk */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 block w-full border rounded"
          placeholder="Enter product name"
          required
        />
      </div>
      {/* Input untuk harga produk */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Product Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 p-2 block w-full border rounded"
          placeholder="Enter product price"
          required
        />
      </div>
      {/* Tombol untuk menambahkan produk */}
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;