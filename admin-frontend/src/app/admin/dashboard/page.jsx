"use client";

import { useEffect, useState } from "react";
import Card from "../../../components/Card";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const router = useRouter();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTotalProducts(res.data.total_products);
        setTotalCustomers(res.data.total_customers);
        setTotalUsers(res.data.total_users);
        setActiveUsers(res.data.active_users);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Products"
          value={totalProducts}
          onClick={() => router.push("/admin/products")}
        />
        <Card
          title="Total Customers"
          value={totalCustomers}
          onClick={() => router.push("/admin/customers")}
        />
        <Card
          title="Total Users"
          value={totalUsers}
          onClick={() => router.push("/admin/users")}
        />
        <Card
          title="Active Users"
          value={activeUsers}
          onClick={() => router.push("/admin/users")}
        />
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            onClick={() => router.push("/admin/products")}
          >
            Manage Products
          </button>
          <button
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
            onClick={() => router.push("/admin/users")}
          >
            Manage Users
          </button>
          <button
            className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition"
            onClick={() => router.push("/admin/profile")}
          >
            Edit Profile
          </button>
          
        </div>
      </div>
    </div>
  );
}
