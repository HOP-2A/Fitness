"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";
import { Coins } from "lucide-react";

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
      const res = await fetch("/api/shop/getProducts");
      const data = await res.json();
      setItems(data);
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
                className="group cursor-pointer rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900/80 to-slate-900/40 overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1"
              >
                <div className="relative h-56 bg-slate-900/50 flex items-center justify-center p-6 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.productName}
                    className="relative z-10 h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1.5 shadow-lg shadow-emerald-500/20">
                    <Coins className="h-3.5 w-3.5 text-white" />
                    <span className="text-xs font-bold text-white">
                      {item.price}
                    </span>
                  </div>

                  {item.stock <= 5 && (
                    <div className="absolute top-3 left-3 rounded-full bg-red-500/90 px-2.5 py-1 text-[10px] font-semibold text-white">
                      Only {item.stock} left!
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-white text-base mb-1 line-clamp-1 group-hover:text-emerald-400 transition-colors">
                      {item.productName}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.title}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                    <span className="text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                      View Details →
                    </span>
                    <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all">
                      <span className="text-emerald-400 text-xs">→</span>
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
