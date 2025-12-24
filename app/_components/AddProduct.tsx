"use client";

import { useState } from "react";

export default function AddProductState() {
  // 1️⃣ Бүх input-г тус тусад нь state болгож үүсгэнэ
  const [productName, setProductName] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [dailyLimit, setDailyLimit] = useState(0);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // 2️⃣ Хоосон утга байгаа эсэхийг шалгах
    if (!productName || !title || !image) {
      setMessage("❌ Please fill in all text fields");
      setLoading(false);
      return;
    }

    // 3️⃣ Fetch POST хийх
    const body = { productName, title, image, price, stock, dailyLimit };
    try {
      const res = await fetch("/api/shop/postProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setMessage("✅ Product added successfully");
        // 4️⃣ Submit болсны дараа бүх state-г reset хийх
        setProductName("");
        setTitle("");
        setImage("");
        setPrice(0);
        setStock(0);
        setDailyLimit(0);
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
    <div className="min-h-screen flex items-center justify-center bg-[#192126]">
      <div className="w-full max-w-md bg-[#192126] border-zinc-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-white text-xl font-semibold mb-6 text-center">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
            required
            className="w-full bg-black border border-zinc-700 text-white px-3 py-2 rounded-md"
          />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="w-full bg-black border border-zinc-700 text-white px-3 py-2 rounded-md"
          />
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL"
            required
            className="w-full bg-black border border-zinc-700 text-white px-3 py-2 rounded-md"
          />
          <input
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            type="number"
            placeholder="Price"
            required
            className="w-full bg-black border border-zinc-700 text-white px-3 py-2 rounded-md"
          />
          <input
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            type="number"
            placeholder="Stock"
            required
            className="w-full bg-black border border-zinc-700 text-white px-3 py-2 rounded-md"
          />
          <input
            value={dailyLimit}
            onChange={(e) => setDailyLimit(Number(e.target.value))}
            type="number"
            placeholder="Daily Limit"
            required
            className="w-full bg-black border border-zinc-700 text-white px-3 py-2 rounded-md"
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
