"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Product } from "@/types/product";

const ProductPage = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/products/${id}`);
        setProduct(data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <Image
            src={`http://localhost:8000/${product.image}`}
            alt={product.name}
            width={400}
            height={400}
            className="rounded"
          />
        </div>
        <div className="flex-1 space-y-4 text-black">
          <h1 className="text-2xl text-blue-dark">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-lg font-semibold">Brand: {product.brand}</p>
          <p className="text-xl font-bold text-blue-600">
            Price: ${product.sell_price}
          </p>
          <p>Rating: {product.rating}/5</p>
          <p>Available Quantity: {product.quantity}</p>

          <button className="submitButton p-3 rounded-md">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
