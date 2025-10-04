"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "./UserForm";

type User = {
  id: number;
  fname: string;
  lname: string;
  email: string;
  contact?: string;
  role: "admin" | "user";
  is_active: boolean;
  privileges?: string[];
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<"" | "user" | "admin">("");
  const [filterStatus, setFilterStatus] = useState<"" | "true" | "false">("");
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (search) params.q = search;
      if (filterRole) params.role = filterRole;
      if (filterStatus !== "") params.is_active = filterStatus;

      const res = await axios.get("http://localhost:8000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setUsers(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, filterRole, filterStatus]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const toggleStatus = async (id: number) => {
    try {
      await axios.put(
        `http://localhost:8000/api/admin/users/${id}/status`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchUsers();
    } catch (err) {
      alert("Failed to toggle status");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <div className="flex gap-2 mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setEditUser(null);
            setShowForm(true);
          }}
        >
          Add User
        </button>
        <input
          type="text"
          placeholder="Search by name/email/contact"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <select
          value={filterRole}
          onChange={(e) =>
            setFilterRole(e.target.value as "" | "user" | "admin")
          }
          className="border px-2 py-1 rounded"
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(e.target.value as "" | "true" | "false")
          }
          className="border px-2 py-1 rounded"
        >
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Contact</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Privileges</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="border px-4 py-2">
                  {u.fname} {u.lname}
                </td>
                <td className="border px-4 py-2">{u.email}</td>
                <td className="border px-4 py-2">{u.contact}</td>
                <td className="border px-4 py-2">{u.role}</td>
                <td className="border px-4 py-2">
                  {u.is_active ? "Active" : "Inactive"}
                </td>
                <td className="border px-4 py-2">
                  {u.privileges?.join(", ") || "-"}
                </td>
                <td className="border px-4 py-2 flex gap-1">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => {
                      setEditUser(u);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(u.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded"
                    onClick={() => toggleStatus(u.id)}
                  >
                    {u.is_active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <UserForm
          user={editUser || undefined}
          onClose={() => setShowForm(false)}
          onSaved={fetchUsers}
        />
      )}
    </div>
  );
}
