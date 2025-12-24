"use client";

import { useState } from "react";

export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);

    const body = {
      productName: formData.get("productName"),
      title: formData.get("title"),
      image: formData.get("image"),
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      dailyLimit: Number(formData.get("dailyLimit")),
    };

    const res = await fetch("/api/shop/postProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Something went wrong");
    } else {
      setMessage("✅ Product added successfully");
      e.currentTarget.reset();
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-white text-xl font-semibold mb-6 text-center">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="productName"
            placeholder="Product Name"
            required
            className="w-full bg-black border border-zinc-700 text-white px-3 py-2 rounded-md focus:outline-none focus:border-white"
          />

          <input
            name="title"
            placeholder="Title"
            required
            className="w-full bg-black border border-zinc-700 text-white px-3 py-2 rounded-md focus:outline-none focus:border-white"
          />

          <input
            name="image"
            placeholder="Image URL"
            required
            className="w-full bg-black border border-zinc-700 text-white px-3 py-2 rounded-md focus:outline-none focus:border-white"
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            required
            className="w-full bg-black border border-zinc-700 text-white px-3 py-2 rounded-md focus:outline-none focus:border-white"
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            required
            className="w-full bg-black border border-zinc-700 text-white px-3 py-2 rounded-md focus:outline-none focus:border-white"
          />

          <input
            name="dailyLimit"
            type="number"
            placeholder="Daily Limit"
            required
            className="w-full bg-black border border-zinc-700 text-white px-3 py-2 rounded-md focus:outline-none focus:border-white"
          />

          <button
            disabled={loading}
            className="w-full bg-white text-black py-2 rounded-md font-medium hover:bg-gray-200 transition disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post Product"}
          </button>
        </form>

        {message && (
          <p className="text-center text-sm text-gray-300 mt-4">{message}</p>
        )}
      </div>
    </div>
  );
}
