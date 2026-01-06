"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, Package } from "lucide-react";
import { Footer } from "../_components/Footer";

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
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/shop/search?q=${search}`);
        const data: ShopItem[] = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
      <Footer />
      {/* Animated background blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 md:w-[600px] md:h-[600px] bg-emerald-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -right-40 w-96 h-96 md:w-[600px] md:h-[600px] bg-blue-500/20 rounded-full blur-3xl"></div>

<<<<<<< HEAD
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-6">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition hover:cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back
          </button>
=======
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
        {/* Header section */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Shop Items
              </h1>
              <p className="text-sm sm:text-base text-gray-400">
                Browse our fitness equipment and accessories
              </p>
            </div>
>>>>>>> f7317a2 (buten 180 gradus ergesen ui)

            {/* Search bar */}
            <div className="relative w-full sm:w-80">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Products grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-400 border-t-transparent mb-4"></div>
              <p className="text-gray-400">Loading products...</p>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Package className="text-gray-600 mb-4" size={64} />
            <p className="text-gray-400 text-lg">No products found</p>
            <p className="text-gray-500 text-sm">Try adjusting your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-emerald-500/20 hover:border-emerald-500/30"
              >
                <div className="overflow-hidden rounded-t-2xl bg-black/30 relative">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="h-48 sm:h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Stock badge */}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/10">
                    <p className="text-xs text-white flex items-center gap-1">
                      <Package size={12} />
                      {item.stock}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col p-5 flex-1">
                  <h2 className="text-lg font-semibold text-white leading-tight mb-2 line-clamp-1">
                    {item.productName}
                  </h2>

                  <p className="text-xs text-gray-400 mb-4 line-clamp-2 flex-1">
                    {item.title}
                  </p>

                  {/* Price section */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="text-xl font-bold text-emerald-400">
                        {item.price}
                      </p>
                    </div>
                    <span className="text-sm text-gray-400">coins</span>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => router.push(`/shop/${item.id}`)}
                    className="w-full bg-gradient-to-r from-emerald-400 to-green-500 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
