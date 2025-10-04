"use client";

import { useEffect, useState } from "react";
import Card from "../dashboard/components/Cart";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setTotalProducts(120);
    setTotalCustomers(58);
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          title="Admin/User Profile"
          value="-"
          onClick={() => router.push("/admin/profile")}
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
            onClick={() => router.push("/admin/customers")}
          >
            Manage Customers
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
