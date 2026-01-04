"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ShopItem {
  id: string;
  productName: string;
  title: string;
  image: string;
  price: number;
  stock: number;
  dailyLimit: number;
  soldToday: number;
  teacherId: string;
  createdAt: string;
  updatedAt: string;
}

export default function ShopItemDetail() {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const router = useRouter();
  const id = parts[2];
  const [item, setItem] = useState<ShopItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    productName: "",
    title: "",
    image: "",
    price: 0,
    stock: 0,
    dailyLimit: 0,
  });

  useEffect(() => {
    const fetchItem = async () => {
      const res = await fetch(`/api/shop/getSingleProduct?id=${id}`);
      const data = await res.json();

      if (!res.ok) setError(data.error || "Failed to fetch item");
      else {
        setItem(data.Detail);
        setForm({
          productName: data.Detail.productName,
          title: data.Detail.title,
          image: data.Detail.image,
          price: data.Detail.price,
          stock: data.Detail.stock,
          dailyLimit: data.Detail.dailyLimit,
        });
      }

      setLoading(false);
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0F1419]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-white/20 border-t-[#BBF246] rounded-full animate-spin"></div>
          <span className="text-sm text-white/70">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;
  if (!item) return <p className="text-center mt-20">No item found</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/editProduct", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...form }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to update");
      } else {
        setItem(data.product);
        setEditing(false);
        alert("Product updated successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#1F262C] text-white relative">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <button
          onClick={() => router.push("/teacher/seeProducts")}
          className="mb-6 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-600"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-[#2a2f3a] bg-[#2A323A] shadow-lg overflow-hidden">
              <img
                src={form.image}
                alt={form.productName}
                className="w-full h-[360px] object-cover bg-gray-200"
              />

              <div className="p-6 space-y-6">
                {!editing ? (
                  <>
                    <h1 className="text-3xl font-semibold">
                      {item.productName}
                    </h1>
                    <p className="text-sm text-gray-400">{item.title}</p>
                    <p className="text-xl font-semibold text-emerald-500">
                      ${item.price}
                    </p>
                    <p className="text-sm text-gray-400">Stock: {item.stock}</p>
                    <p className="text-sm text-gray-400">
                      Daily Limit: {item.dailyLimit}
                    </p>
                    <button
                      onClick={() => setEditing(true)}
                      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                    >
                      Edit Product
                    </button>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="productName"
                        value={form.productName}
                        onChange={handleChange}
                        placeholder="Product Name"
                        className="border border-[#3A444D] px-4 py-2 w-full rounded-lg bg-[#1F262C] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="border border-[#3A444D] px-4 py-2 w-full rounded-lg bg-[#1F262C] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                        className="border border-[#3A444D] px-4 py-2 w-full rounded-lg bg-[#1F262C] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="border border-[#3A444D] px-4 py-2 w-full rounded-lg bg-[#1F262C] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        placeholder="Stock"
                        className="border border-[#3A444D] px-4 py-2 w-full rounded-lg bg-[#1F262C] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="number"
                        name="dailyLimit"
                        value={form.dailyLimit}
                        onChange={handleChange}
                        placeholder="Daily Limit"
                        className="border border-[#3A444D] px-4 py-2 w-full rounded-lg bg-[#1F262C] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditing(false)}
                        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
