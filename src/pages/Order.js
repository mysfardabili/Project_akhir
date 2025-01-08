import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Komponen Order digunakan untuk menampilkan form pemesanan produk.
 * 
 * @returns {JSX.Element} - Elemen JSX yang merender form pemesanan produk.
 */
const Order = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  /**
   * Mengambil data produk yang dipilih dari state location.
   */
  useEffect(() => {
    if (location.state) {
      setProducts(location.state.selectedProducts);
    }
  }, [location]);

  /**
   * Menghitung total harga produk yang dipilih.
   * 
   * @returns {number} - Total harga produk yang dipilih.
   */
  const calculateTotalPrice = () => {
    return products.reduce((total, product) => total + product.price, 0);
  };

  /**
   * Mengirimkan pesanan ke WhatsApp.
   */
  const handleSubmit = () => {
    const totalPrice = calculateTotalPrice();
    const productDetails = products
      .map((product) => `- ${product.name}: Rp${product.price}`)
      .join("\n");

    const message = `
Nama Pemesan: ${name}
Jenis Kelamin: ${gender}
Metode Pembayaran: ${paymentMethod}
Produk yang Dipesan:
${productDetails}
Total Harga: Rp${totalPrice}
    `;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "6282223834496";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Form Pemesanan</h1>
      <form onSubmit={(e) => e.preventDefault()} className="p-4 bg-gray-100 rounded shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nama Pemesan</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 block w-full border rounded"
            placeholder="Masukkan nama Anda"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 p-2 block w-full border rounded"
            required
          >
            <option value="">Pilih jenis kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Metode Pembayaran</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mt-1 p-2 block w-full border rounded"
            required
          >
            <option value="">Pilih metode pembayaran</option>
            <option value="COD">COD (Bayar di tempat)</option>
            <option value="QRIS">QRIS</option>
          </select>
        </div>

        {/* Menampilkan gambar QRIS jika metode pembayaran adalah QRIS */}
        {paymentMethod === "QRIS" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">QRIS Code</label>
            <img src="/qris.png" alt="QRIS Code" className="mt-2 w-64 h-64" />
          </div>
        )}

        <h2 className="text-xl font-bold mb-2">Daftar Produk</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id} className="mb-4">
              <div className="flex justify-between items-center">
                <span>
                  {product.name} - Rp {product.price}
                </span>
                <span className="text-sm text-gray-500">{product.quantity} pcs</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center mt-4">
          <span className="font-bold">Total Harga:</span>
          <span className="text-lg">Rp {calculateTotalPrice()}</span>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Kirim Pesanan
        </button>
      </form>
    </div>
  );
};

export default Order;