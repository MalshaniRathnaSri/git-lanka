"use client";

import { useEffect, useState, ChangeEvent } from "react";
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
  is_active: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [costPrice, setCostPrice] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(1);
  const [status, setStatus] = useState(1);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("brand", brand);
    formData.append("name", name);
    formData.append("quantity", quantity.toString());
    formData.append("cost_price", costPrice.toString());
    formData.append("sell_price", sellPrice.toString());
    formData.append("description", description);
    formData.append("rating", rating.toString());
    formData.append("is_active", status.toString());
    if (imageFile) formData.append("image", imageFile);

    try {
      if (editProduct) {
        formData.append("_method", "PUT");

        await axios.post(
          `http://localhost:8000/api/products/${editProduct.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post("http://localhost:8000/api/products", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setShowForm(false);
      setEditProduct(null);
      fetchProducts();
    } catch (err: any) {
      console.log(err.response?.data);
      alert("Failed to save product");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  const toggleStatus = async (p: Product) => {
    try {
      await axios.put(
        `http://localhost:8000/api/products/${p.id}/toggle`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchProducts();
    } catch (err) {
      alert("Failed to toggle status");
    }
  };

  const handleEdit = (p: Product) => {
    setEditProduct(p);
    setBrand(p.brand);
    setName(p.name);
    setQuantity(p.quantity);
    setCostPrice(p.cost_price);
    setSellPrice(p.sell_price);
    setDescription(p.description);
    setRating(p.rating);
    setStatus(p.is_active);
    setShowForm(true);
  };

  const [filterBrand, setFilterBrand] = useState("");
  const [filterStatus, setFilterStatus] = useState<"" | 1 | 0>("");

  const filteredProducts = products.filter((p) => {
    return (
      p.brand.toLowerCase().includes(filterBrand.toLowerCase()) &&
      (filterStatus === "" || p.is_active === filterStatus)
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>

        <input
          type="text"
          placeholder="Search by brand"
          value={filterBrand}
          onChange={(e) => setFilterBrand(e.target.value)}
          className="border px-2 rounded"
        />

        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(
              e.target.value === "" ? "" : (Number(e.target.value) as 1 | 0)
            )
          }
          className="border px-2 rounded"
        >
          <option value="">All Status</option>
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>
      </div>

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
                <td className="border px-4 py-2">
                  {p.is_active ? "Active" : "Inactive"}
                </td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => handleEdit(p)}
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
                    {p.is_active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editProduct ? "Edit Product" : "Add Product"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
                className="border px-2 py-1 rounded"
              />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border px-2 py-1 rounded"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
                className="border px-2 py-1 rounded"
              />
              <input
                type="number"
                placeholder="Cost Price"
                value={costPrice}
                onChange={(e) => setCostPrice(Number(e.target.value))}
                required
                className="border px-2 py-1 rounded"
              />
              <input
                type="number"
                placeholder="Sell Price"
                value={sellPrice}
                onChange={(e) => setSellPrice(Number(e.target.value))}
                required
                className="border px-2 py-1 rounded"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border px-2 py-1 rounded"
              />
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border px-2 py-1 rounded"
              >
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <select
                value={status}
                onChange={(e) => setStatus(Number(e.target.value))}
                className="border px-2 py-1 rounded"
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
              <input
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files) setImageFile(e.target.files[0]);
                }}
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {editProduct ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => {
                    setShowForm(false);
                    setEditProduct(null);
                  }}
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
