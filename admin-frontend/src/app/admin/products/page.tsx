"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Product = {
  id: number;
  brand: string;
  name: string;
  image: string;
  quantity: number;
  cost_price: number;
  sell_price: number;
  description: string;
  rating: number;
  status: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    brand: "",
    name: "",
    image: "",
    quantity: 0,
    cost_price: 0,
    sell_price: 0,
    description: "",
    rating: 1,
  });

  const [filter, setFilter] = useState({
    brand: "",
    name: "",
    status: "",
    rating: "",
  });

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/products", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Products response:", res.data);
      setProducts(res.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  const toggleStatus = async (p: Product) => {
    try {
      const newStatus = p.status === "active" ? "inactive" : "active";
      await axios.put(
        `http://localhost:8000/api/products/${p.id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(
        products.map((prod) =>
          prod.id === p.id ? { ...prod, status: newStatus } : prod
        )
      );
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const openModal = (p?: Product) => {
    if (p) {
      setEditingProduct(p);
      setFormData({ ...p });
    } else {
      setEditingProduct(null);
      setFormData({
        brand: "",
        name: "",
        image: "",
        quantity: 0,
        cost_price: 0,
        sell_price: 0,
        description: "",
        rating: 1,
      });
    }
    setModalOpen(true);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(
          `http://localhost:8000/api/products/${editingProduct.id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post("http://localhost:8000/api/products", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setModalOpen(false);
      fetchProducts();
    } catch (err) {
      alert("Failed to save product");
    }
  };

  const filteredProducts = products.filter((p) => {
    return (
      (!filter.brand ||
        p.brand.toLowerCase().includes(filter.brand.toLowerCase())) &&
      (!filter.name ||
        p.name.toLowerCase().includes(filter.name.toLowerCase())) &&
      (!filter.status || p.status === filter.status) &&
      (!filter.rating || p.rating.toString() === filter.rating)
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="flex gap-4 mb-4 flex-wrap">
        <input
          placeholder="Brand"
          value={filter.brand}
          onChange={(e) => setFilter({ ...filter, brand: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Name"
          value={filter.name}
          onChange={(e) => setFilter({ ...filter, name: e.target.value })}
          className="border p-2 rounded"
        />
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select
          value={filter.rating}
          onChange={(e) => setFilter({ ...filter, rating: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">All Ratings</option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <button
          onClick={() => openModal()}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Add Product
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Brand</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Cost Price</th>
              <th className="border px-4 py-2">Sell Price</th>
              <th className="border px-4 py-2">Rating</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id}>
                <td className="border px-4 py-2">{p.brand}</td>
                <td className="border px-4 py-2">{p.name}</td>
                <td className="border px-4 py-2">
                  <img
                    src={`http://localhost:8000/${p.image}`}
                    alt={p.name}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="border px-4 py-2">{p.quantity}</td>
                <td className="border px-4 py-2">{p.cost_price}</td>
                <td className="border px-4 py-2">{p.sell_price}</td>
                <td className="border px-4 py-2">{p.rating}</td>
                <td className="border px-4 py-2">{p.status}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => openModal(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded"
                    onClick={() => toggleStatus(p)}
                  >
                    {p.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              {[
                "brand",
                "name",
                "image",
                "quantity",
                "cost_price",
                "sell_price",
                "description",
                "rating",
              ].map((key) => (
                <input
                  key={key}
                  type={
                    key.includes("price") ||
                    key === "quantity" ||
                    key === "rating"
                      ? "number"
                      : "text"
                  }
                  name={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={(formData as any)[key]}
                  onChange={handleFormChange}
                  className="border p-2 rounded"
                  required
                />
              ))}
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
