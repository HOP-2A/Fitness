"use client";

import { useState } from "react";

export default function AddProductState() {
  const [productName, setProductName] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [dailyLimit, setDailyLimit] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (
      !productName ||
      !title ||
      !image ||
      price === "" ||
      stock === "" ||
      dailyLimit === ""
    ) {
      setMessage("❌ Please fill in all fields");
      setLoading(false);
      return;
    }

    const body = {
      productName,
      title,
      image,
      price: Number(price),
      stock: Number(stock),
      dailyLimit: Number(dailyLimit),
    };

    try {
      const res = await fetch("/api/shop/postProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setMessage("✅ Product added successfully");
        setProductName("");
        setTitle("");
        setImage("");
        setPrice("");
        setStock("");
        setDailyLimit("");
      } else {
        setMessage("❌ Failed to add product");
      }
    } catch {
      setMessage("❌ Failed to add product");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  }

  return (
    <div className="flex items-center justify-center p-4 absolute top-45">
      <div className="w-full max-w-md bg-[#1F262C] border border-zinc-700 rounded-2xl p-6 shadow-2xl hover:shadow-[#A3FFAB]/30 transition-all duration-300">
        <h2 className="text-[#A3FFAB] text-2xl font-bold mb-6 text-center tracking-wide">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
            required
            className="w-full bg-[#0E1113] border border-zinc-600 text-white px-4 py-2 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A3FFAB] focus:border-transparent transition"
          />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="w-full bg-[#0E1113] border border-zinc-600 text-white px-4 py-2 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A3FFAB] focus:border-transparent transition"
          />
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL"
            required
            className="w-full bg-[#0E1113] border border-zinc-600 text-white px-4 py-2 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A3FFAB] focus:border-transparent transition"
          />
          <div className="grid grid-cols-3 gap-3">
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="Price"
              max={1000}
              min={1}
              required
              className="w-full bg-[#0E1113] border border-zinc-600 text-white px-3 py-2 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A3FFAB] focus:border-transparent transition"
            />
            <input
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              type="number"
              placeholder="Stock"
              required
              max={200}
              min={1}
              className="w-full bg-[#0E1113] border border-zinc-600 text-white px-3 py-2 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A3FFAB] focus:border-transparent transition"
            />
            <input
              value={dailyLimit}
              onChange={(e) => setDailyLimit(e.target.value)}
              type="number"
              placeholder="Daily Limit"
              required
              max={100}
              min={1}
              className="w-full bg-[#0E1113] border border-zinc-600 text-white px-3 py-2 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A3FFAB] focus:border-transparent transition"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#A3FFAB] to-[#6BD48F] text-[#1E2429] py-2 rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition transform disabled:opacity-50"
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
