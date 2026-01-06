"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";
import { Coins, Package } from "lucide-react";

type ShopItem = {
  id: string;
  productName: string;
  title: string;
  image: string;
  price: number;
  stock: number;
};

const ShowCarousel = () => {
  const [items, setItems] = useState<ShopItem[]>([]);
  const router = useRouter();

  const autoplayPlugin = Autoplay({
    delay: 3000,
    stopOnInteraction: false,
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/shop/getProducts");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetchItems();
  }, []);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-900/50 p-12 text-center">
        <div className="text-slate-400">Loading shop items...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Carousel
        opts={{ align: "start", loop: true, slidesToScroll: 1 }}
        plugins={[autoplayPlugin]}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {items.map((item) => (
            <CarouselItem
              key={item.id}
              className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div
                onClick={() => router.push(`/Item/${item.id}`)}
                className="group cursor-pointer rounded-3xl border border-slate-800 bg-slate-900/40 p-3 backdrop-blur-md transition-all duration-500 hover:border-emerald-500/40 hover:bg-slate-900/60 hover:-translate-y-2"
              >
                <div className="flex items-center justify-between mb-4 px-1">
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-2xl">
                    <Coins className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-black text-emerald-400">
                      {item.price.toLocaleString()}
                    </span>
                  </div>

                  {item.stock <= 5 ? (
                    <div className="bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-2xl">
                      <span className="text-[10px] font-bold text-red-400 uppercase tracking-tight">
                        Only {item.stock} left
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-slate-500 px-2">
                      <Package className="h-3 w-3" />
                      <span className="text-[11px] font-medium">
                        {item.stock}
                      </span>
                    </div>
                  )}
                </div>

                <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-2xl bg-slate-950/50 border border-white/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.productName}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="px-1 space-y-2">
                  <h3 className="font-bold text-white text-lg line-clamp-1 group-hover:text-emerald-400 transition-colors">
                    {item.productName}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 min-h-[32px] leading-relaxed">
                    {item.title}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-emerald-400 transition-all">
                      Details
                    </span>
                    <div className="h-7 w-7 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-emerald-500 transition-all duration-300">
                      <span className="text-white text-xs group-hover:translate-x-0.5 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ShowCarousel;
