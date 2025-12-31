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
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <input
            type="text"
            placeholder="Search product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-auto w-[320px] rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">Shop Items</h1>
          <p className="text-sm text-slate-500">
            Browse our fitness equipment and accessories
          </p>
        </div>

        <div className="flex gap-8">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="
                  group
                  flex flex-col
                  rounded-xl
                  border border-slate-200
                  bg-white
                  shadow-sm
                  transition-all
                  hover:-translate-y-0.5
                  hover:shadow-lg
                "
              >
                <div className="overflow-hidden rounded-t-xl bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="
                      h-[180px]
                      w-full
                      object-cover
                      transition-transform
                      duration-300
                      group-hover:scale-105
                    "
                  />
                </div>

                <div className="flex flex-col p-4 flex-1">
                  <h2 className="text-base font-semibold text-slate-900 leading-tight mb-0.5">
                    {item.productName}
                  </h2>

                  <p className="text-xs text-slate-500 mb-2">{item.title}</p>

                  <div className="text-sm space-y-1 mb-4">
                    <p className="font-semibold text-emerald-600">
                      {item.price} coin
                    </p>
                    <p className="text-xs text-slate-400">
                      Stock: {item.stock}
                    </p>
                  </div>

                  <Button
                    onClick={() => router.push(`/shop/${item.id}`)}
                    className="
                      mt-auto
                      h-9
                      rounded-lg
                      bg-slate-900
                      text-white
                      hover:bg-slate-800
                    "
                  >
                    See Detail
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="w-[300px] sticky top-6 h-fit">
            <CoinPage variant="shop" />
          </div>
        </div>
      </div>
    </div>
  );
}
