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
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/shop/getProducts");
        const data: ShopItem[] = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="relative w-full py-6 bg-[#0F1419]">
      <div className="flex justify-between items-center ml-6">
        <Button
          onClick={() => router.push("/teacher")}
          className="flex items-center gap-2 text-sm text-white hover:text-white bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-lg transition-all duration-200 hover:cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
      </div>
      <h2 className="text-3xl font-semibold text-white mb-6 text-center">
        Featured Items
      </h2>

      {loading ? (
        <div className="flex min-h-screen items-center justify-center bg-[#0F1419]">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 border-4 border-white/20 border-t-[#BBF246] rounded-full animate-spin"></div>
            <span className="text-sm text-white/70">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(`/TeacherEditItem/${item.id}`)}
              className="group flex flex-col justify-between rounded-2xl border border-[#3A444D] bg-[#1F262C] backdrop-blur-lg shadow-xl shadow-black/40 p-6 m-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-emerald-500/30 hover:scale-105 cursor-pointer"
            >
              <div className="overflow-hidden rounded-t-2xl bg-black/30 relative">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.productName}
                  className="h-[180px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                  className="mt-auto h-9 rounded-xl bg-[#A3FFAB] text-black font-semibold shadow-lg shadow-emerald-500/20 transition-all hover:bg-[#8AE086] hover:shadow-emerald-400/40 active:scale-95 hover:cursor-pointer"
                >
                  Tap To See Details Or Edit The Product
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowGrid;
