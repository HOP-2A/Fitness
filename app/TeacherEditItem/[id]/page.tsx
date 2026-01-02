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

  if (loading) return <p className="text-center mt-20">Loading...</p>;
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
    <div className="min-h-screen bg-slate-50 relative">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <button
          onClick={() => router.push("/teacher/seeProducts")}
          className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <img
                src={form.image}
                alt={form.productName}
                className="w-full h-[360px] object-cover bg-slate-100"
              />

              <div className="p-6 space-y-4">
                {!editing ? (
                  <>
                    <h1 className="text-2xl font-semibold text-slate-900">
                      {item.productName}
                    </h1>
                    <p className="text-sm text-slate-500">{item.title}</p>
                    <p className="text-green-600 font-bold">${item.price}</p>
                    <p>Stock: {item.stock}</p>
                    <p>Daily Limit: {item.dailyLimit}</p>
                    <button
                      onClick={() => setEditing(true)}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                    >
                      Edit Product
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      name="productName"
                      value={form.productName}
                      onChange={handleChange}
                      placeholder="Product Name"
                      className="border px-2 py-1 w-full rounded"
                    />
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Title"
                      className="border px-2 py-1 w-full rounded"
                    />
                    <input
                      type="text"
                      name="image"
                      value={form.image}
                      onChange={handleChange}
                      placeholder="Image URL"
                      className="border px-2 py-1 w-full rounded"
                    />
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="Price"
                      className="border px-2 py-1 w-full rounded"
                    />
                    <input
                      type="number"
                      name="stock"
                      value={form.stock}
                      onChange={handleChange}
                      placeholder="Stock"
                      className="border px-2 py-1 w-full rounded"
                    />
                    <input
                      type="number"
                      name="dailyLimit"
                      value={form.dailyLimit}
                      onChange={handleChange}
                      placeholder="Daily Limit"
                      className="border px-2 py-1 w-full rounded"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditing(false)}
                        className="px-4 py-2 bg-gray-400 text-white rounded"
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
