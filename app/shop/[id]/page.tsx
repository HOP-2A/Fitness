"use client";

import BuyProductPage from "@/app/_components/BuyProduct";
import CoinPage from "@/app/_components/ShowCoin";
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

  useEffect(() => {
    const fetchItem = async () => {
      const res = await fetch(`/api/shop/getSingleProduct?id=${id}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to fetch item");
      } else {
        setItem(data.Detail);
      }

      setLoading(false);
    };

    fetchItem();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!item) return <p>No item found</p>;

  return (
    <div className="min-h-screen bg-[#192126] flex justify-center px-4 py-10">
      <button
        onClick={() => router.push("/shop")}
        className="flex items-center gap-2 text-zinc-400 hover:text-white transition absolute left-5 top-5"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="w-full h-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 rounded-3xl border border-[#3B434D] bg-[#1E272E] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] p-6 text-gray-200 space-y-4">
          <h2 className="text-2xl font-semibold text-[#A3FFAB]">
            {item.title}
          </h2>

          <p className="text-sm text-gray-400">
            Product Name:{" "}
            <span className="text-gray-200">{item.productName}</span>
          </p>

          <img
            src={item.image}
            alt={item.title}
            className="w-full max-h-[400px] object-cover rounded-xl border border-[#3B434D]"
          />

          <div className="grid grid-cols-2 gap-4 text-sm pt-2">
            <p>
              <span className="text-gray-400">Stock:</span>{" "}
              <span className="text-white">{item.stock}</span>
            </p>
            <p>
              <span className="text-gray-400">Daily Limit:</span>{" "}
              <span className="text-white">{item.dailyLimit}</span>
            </p>
            <p>
              <span className="text-gray-400">Sold Today:</span>{" "}
              <span className="text-white">{item.soldToday}</span>
            </p>
            <p>
              <span className="text-gray-400">Teacher ID:</span>{" "}
              <span className="text-white">{item.teacherId}</span>
            </p>
          </div>

          <div className="text-xs text-gray-400 pt-3 space-y-1">
            <p>Created: {new Date(item.createdAt).toLocaleString()}</p>
            <p>Updated: {new Date(item.updatedAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-[#3B434D] bg-[#1E272E] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] p-6 text-white space-y-6">
          <div className="text-center">
            <p className="text-sm text-gray-400">Price</p>
            <p className="text-3xl font-bold text-[#A3FFAB]">
              {item.price} Coins
            </p>
          </div>

          <div className="border border-[#3B434D] rounded-xl p-4">
            <BuyProductPage />
          </div>
        </div>
      </div>

      <div className="fixed top-20 right-5 z-50">
        <CoinPage />
      </div>
    </div>
  );
}
