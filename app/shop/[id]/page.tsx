"use client";

import BuyProductPage from "@/app/_components/BuyProduct";
import CoinPage from "@/app/_components/ShowCoin";
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
  const butsah = () => {
    router.push("/shop");
  };
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
    <div className="min-h-screen bg-[#192126] flex items-center justify-center px-4 py-10 gap-5">
      <div className="bg-amber-50" onClick={butsah}>
        Back
      </div>
      <div className="relative max-w-xl w-full rounded-3xl border border-[#3B434D] bg-[#1E272E] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] p-8 text-gray-200 space-y-4">
        <h2 className="text-2xl font-semibold text-[#A3FFAB]">{item.title}</h2>

        <p className="text-sm text-gray-400">
          Product Name:{" "}
          <span className="text-gray-200">{item.productName}</span>
        </p>

        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover rounded-xl border border-[#3B434D]"
        />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <p>
            <span className="text-gray-400">Price:</span>{" "}
            <span className="text-white font-medium">${item.price}</span>
          </p>
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
        </div>

        <div className="text-xs text-gray-400 space-y-1 pt-2">
          <p>Teacher ID: {item.teacherId}</p>
          <p>Created: {new Date(item.createdAt).toLocaleString()}</p>
          <p>Updated: {new Date(item.updatedAt).toLocaleString()}</p>
        </div>

        <div className="fixed top-17 right-4.5 z-50">
          <CoinPage />
        </div>
      </div>
      <div className="rounded-3xl border border-[#3B434D] bg-[#1E272E] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] text-white">
        <BuyProductPage />
      </div>
    </div>
  );
}
