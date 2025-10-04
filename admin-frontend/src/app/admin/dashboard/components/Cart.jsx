"use client";

export default function Card({ title, value, onClick }) {
  return (
    <div
      className="bg-white p-6 rounded shadow cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <h3 className="text-gray-500 font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
