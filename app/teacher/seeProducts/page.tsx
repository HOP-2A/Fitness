"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type ShopItem = {
  id: string;
  productName: string;
  title: string;
  image: string;
  price: number;
  stock: number;
};

const ShowGrid = () => {
  const [items, setItems] = useState<ShopItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch("/api/shop/getProducts");
      const data: ShopItem[] = await res.json();
      setItems(data);
    };
    fetchItems();
  }, []);

  return (
    <div className="relative w-full py-6">
      <button
        onClick={() => router.push("/teacher")}
        className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={16} />
        Back
      </button>
      <h2 className="text-2xl font-semibold text-white mb-4 text-center">
        Featured Items
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => router.push(`/TeacherEditItem/${item.id}`)}
            className="
              group flex flex-col
              rounded-2xl border border-white/10
              bg-white/5 backdrop-blur-xl
              shadow-lg shadow-black/40
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-emerald-500/20
              cursor-pointer
            "
          >
            <div className="overflow-hidden rounded-t-2xl bg-black/30 relative">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.productName}
                className="
                  h-[180px] w-full object-cover
                  transition-transform duration-300
                  group-hover:scale-105
                "
              />
              {item.stock === 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            <div className="flex flex-col p-4 flex-1">
              <h3 className="text-base font-semibold text-white mb-1">
                {item.productName}
              </h3>
              <p className="text-xs text-gray-400 mb-3 line-clamp-2">
                {item.title}
              </p>

              <div className="text-sm space-y-1 mb-4">
                <p className="font-semibold text-emerald-400">
                  {item.price} coin
                </p>
                <p className="text-xs text-gray-500">Stock: {item.stock}</p>
              </div>

              <Button
                onClick={() => router.push(`/TeacherEditItem/${item.id}`)}
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
                Tap To See Details Or Edit The Product
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowGrid;
