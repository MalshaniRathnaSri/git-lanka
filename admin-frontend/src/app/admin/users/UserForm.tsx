"use client";

import { useState, useEffect } from "react";
import axios from "axios";

type User = {
  id?: number;
  fname: string;
  lname: string;
  email: string;
  contact?: string;
  role: "admin" | "user";
  is_active?: boolean;
  privileges?: string[];
};

type UserFormProps = {
  user?: User;
  onClose: () => void;
  onSaved: () => void;
};

const availablePrivileges = [
  "add_product",
  "update_product",
  "delete_product",
  "view_orders",
  "manage_users",
];

export default function UserForm({ user, onClose, onSaved }: UserFormProps) {
  const [fname, setFname] = useState(user?.fname || "");
  const [lname, setLname] = useState(user?.lname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [contact, setContact] = useState(user?.contact || "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "user">(user?.role || "user");
  const [privileges, setPrivileges] = useState<string[]>(user?.privileges || []);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handlePrivilegeChange = (priv: string) => {
    if (privileges.includes(priv)) {
      setPrivileges(privileges.filter((p) => p !== priv));
    } else {
      setPrivileges([...privileges, priv]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (user?.id) {
        await axios.put(
          `http://localhost:8000/api/admin/users/${user.id}`,
          { fname, lname, email, contact, role, privileges, ...(password && { password }) },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Create new user
        await axios.post(
          `http://localhost:8000/api/admin/users`,
          { fname, lname, email, contact, role, privileges, password },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      onSaved();
      onClose();
    } catch (err: any) {
      console.error(err.response?.data);
      alert("Failed to save user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{user ? "Edit User" : "Add User"}</h2>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
            className="border px-2 py-1 rounded"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
            className="border px-2 py-1 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border px-2 py-1 rounded"
          />
          <input
            type="text"
            placeholder="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <input
            type="password"
            placeholder="Password (leave blank to keep unchanged)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-2 py-1 rounded"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "admin" | "user")}
            className="border px-2 py-1 rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {role === "admin" && (
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Privileges:</p>
              {availablePrivileges.map((p) => (
                <label key={p} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={privileges.includes(p)}
                    onChange={() => handlePrivilegeChange(p)}
                  />
                  {p}
                </label>
              ))}
            </div>
          )}

          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {user ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
