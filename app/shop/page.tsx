"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoinPage from "../_components/ShowCoin";

interface ShopItem {
  id: string;
  productName: string;
  title: string;
  image: string;
  price: number;
  stock: number;
}

export default function ShopPage() {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const res = await fetch(`/api/shop/search?q=${search}`);
      const data: ShopItem[] = await res.json();
      setItems(data);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
  <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#020617] via-[#050B14] to-[#0F172A]">
    <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px]" />
    <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] bg-green-400/10 rounded-full blur-[140px]" />

    <div className="relative z-10 mx-auto max-w-7xl px-6 py-6">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <input
          type="text"
          placeholder="Search product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            ml-auto w-[320px]
            rounded-xl
            bg-white/5
            border border-white/10
            px-4 py-2 text-sm text-gray-200
            placeholder:text-gray-500
            focus:outline-none
            focus:ring-2 focus:ring-emerald-500/40
          "
        />
      </div>

      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-white">Shop Items</h1>
        <p className="text-sm text-gray-400">
          Browse our fitness equipment and accessories
        </p>
      </div>

      <div className="flex gap-8">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="
                group flex flex-col
                rounded-2xl
                border border-white/10
                bg-white/5
                backdrop-blur-xl
                shadow-lg shadow-black/40
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-emerald-500/10
              "
            >
              <div className="overflow-hidden rounded-t-2xl bg-black/30">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="
                    h-[180px] w-full object-cover
                    transition-transform duration-300
                    group-hover:scale-105
                  "
                />
              </div>

              <div className="flex flex-col p-4 flex-1">
                <h2 className="text-base font-semibold text-white leading-tight mb-1">
                  {item.productName}
                </h2>

                <p className="text-xs text-gray-400 mb-3">
                  {item.title}
                </p>

                <div className="text-sm space-y-1 mb-4">
                  <p className="font-semibold text-emerald-400">
                    {item.price} coin
                  </p>
                  <p className="text-xs text-gray-500">
                    Stock: {item.stock}
                  </p>
                </div>

                <Button
                  onClick={() => router.push(`/shop/${item.id}`)}
                  className="
                    mt-auto h-9 rounded-xl
                    bg-emerald-500 text-black font-semibold
                    shadow-lg shadow-emerald-500/20
                    transition-all
                    hover:bg-emerald-400
                    hover:shadow-emerald-400/40
                    active:scale-95
                  "
                >
                  See Detail
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="w-[300px] sticky top-6 h-fit">
          <div className="
            rounded-2xl
            border border-white/10
            bg-white/5
            backdrop-blur-xl
            shadow-xl
            p-3
          ">
            <CoinPage variant="shop" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

}
