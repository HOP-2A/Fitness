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

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;
  if (!item) return <p className="text-center mt-20">No item found</p>;

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
    <div className="min-h-screen bg-slate-50 relative">
      <div className="fixed top-17 right-44 z-50 flex flex-col items-end gap-4">
        <div className="w-[300px]">
          <CoinPage variant="shop" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-6">
        <button
          onClick={() => router.push("/shop")}
          className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <img
                src={item.image}
                alt={item.productName}
                className="w-full h-[360px] object-cover bg-slate-100"
              />

              <div className="p-6 space-y-4">
                <h1 className="text-2xl font-semibold text-slate-900">
                  {item.productName}
                </h1>

                <p className="text-sm text-slate-500">{item.title}</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm pt-2">
                  <p>
                    <span className="text-slate-400 text-xs">Stock</span>
                    <br />
                    <span className="font-medium text-slate-800">
                      {item.stock}
                    </span>
                  </p>
                  <p>
                    <span className="text-slate-400 text-xs">Daily Limit</span>
                    <br />
                    <span className="font-medium text-slate-800">
                      {item.dailyLimit}
                    </span>
                  </p>
                  <p>
                    <span className="text-slate-400 text-xs">Sold Today</span>
                    <br />
                    <span className="font-medium text-slate-800">
                      {item.soldToday}
                    </span>
                  </p>
                </div>

                <p className="text-xs text-slate-400">
                  Created: {timeAgo(item.createdAt)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
              <div className="text-center">
                <p className="text-xs text-slate-500">Price</p>
                <p className="text-3xl font-semibold text-emerald-600">
                  {item.price} coins
                </p>
              </div>

              <BuyProductPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
