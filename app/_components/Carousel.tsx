"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";

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
    delay: 2500,
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

  return (
    <div className="w-full py-6">
      <Carousel
        opts={{ align: "start", loop: true, slidesToScroll: 1 }}
        plugins={[autoplayPlugin]}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {items.map((item) => (
            <CarouselItem
              key={item.id}
              className="pl-3 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div
                onClick={() => router.push(`/Item/${item.id}`)}
                className="
                  group cursor-pointer rounded-xl bg-gray-800/50 border border-gray-700/50
                  shadow-sm hover:shadow-lg
                  transition-all duration-300
                  hover:-translate-y-1
                  overflow-hidden
                "
              >
                <div className="relative h-56 bg-gray-900/50 flex items-center justify-center p-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.productName}
                    className="
                      h-full w-full
                      object-contain
                      transition-transform duration-300
                      group-hover:scale-105
                    "
                  />

                  <div className="absolute top-2 right-2 bg-green-600 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full shadow">
                    coin:{item.price}
                  </div>
                </div>

                <div className="p-3 flex flex-col gap-1.5">
                  <h3 className="font-semibold text-gray-100 text-sm line-clamp-1">
                    {item.productName}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-2">
                    {item.title}
                  </p>

                  <div className="mt-2">
                    <span className="inline-block text-[11px] px-2.5 py-1 rounded-full bg-green-50 text-green-700 font-medium">
                      View details →
                    </span>
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
