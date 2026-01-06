"use client";

import BuyProductPage from "@/app/_components/BuyProduct";
import {
  ArrowLeft,
  Package,
  TrendingUp,
  Clock,
  ShoppingCart,
} from "lucide-react";
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

  if (loading)
    return <p className="text-center mt-20 text-white">Loading...</p>;
  if (error) return <p className="text-red-400 text-center mt-20">{error}</p>;
  if (!item)
    return <p className="text-center mt-20 text-white">No item found</p>;

  const timeAgo = (dateString: string) => {
    const createdDate = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - createdDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 md:w-[600px] md:h-[600px] bg-emerald-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -right-40 w-96 h-96 md:w-[600px] md:h-[600px] bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-6">
        <button
          onClick={() => router.push("/shop")}
          className="mb-6 flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group hover:cursor-pointer "
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
              <img
                src={item.image}
                alt={item.productName}
                className="w-full h-64 sm:h-80 lg:h-[360px] object-cover bg-slate-900"
              />

              <div className="p-6 space-y-4">
                <h1 className="text-2xl font-semibold text-white">
                  {item.productName}
                </h1>

                <p className="text-sm text-gray-400">{item.title}</p>

                <div className="grid grid-cols-3 gap-3 sm:gap-4 text-sm pt-2">
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <div className="flex items-center gap-1 mb-1">
                      <Package size={14} className="text-emerald-400" />
                      <span className="text-xs text-gray-400">Stock</span>
                    </div>
                    <span className="font-medium text-white text-lg">
                      {item.stock}
                    </span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <div className="flex items-center gap-1 mb-1">
                      <TrendingUp size={14} className="text-blue-400" />
                      <span className="text-xs text-gray-400">Daily Limit</span>
                    </div>
                    <span className="font-medium text-white text-lg">
                      {item.dailyLimit}
                    </span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <div className="flex items-center gap-1 mb-1">
                      <ShoppingCart size={14} className="text-purple-400" />
                      <span className="text-xs text-gray-400">Total Sold</span>
                    </div>
                    <span className="font-medium text-white text-lg">
                      {item.soldToday}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 flex items-center gap-1 pt-2 border-t border-white/10">
                  <Clock size={12} />
                  Created: {timeAgo(item.createdAt)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 space-y-4">
              <div className="text-center">
                <p className="text-xs text-gray-400">Price</p>
                <p className="text-5xl font-semibold text-emerald-400 my-2">
                  {item.price}
                </p>
                <p className="text-sm text-gray-400">coins</p>
              </div>

              <BuyProductPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
