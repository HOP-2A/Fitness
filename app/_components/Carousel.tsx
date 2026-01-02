"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
    delay: 2000,
    stopOnInteraction: false,
    stopOnMouseEnter: false,
    stopOnLastSnap: false,
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
    <div className="flex justify-center w-full px-4">
      <Carousel
        className="w-full max-w-2xl"
        orientation="vertical"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[autoplayPlugin]}
      >
        <div className="relative">
          <CarouselContent className="-mt-4 h-[760px]">
            {items?.map((item) => (
              <CarouselItem key={item.id} className="pt-4 basis-1/4">
                <div
                  className="border rounded-xl p-4 flex items-center gap-4 shadow-sm h-[180px]"
                  onClick={() => router.push(`/Item/${item.id}`)}
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.productName}
                    className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                  />

                  <div className="flex flex-col gap-1 flex-1">
                    <h3 className="font-semibold text-lg">
                      {item.productName}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.title}
                    </p>
                    <p className="font-bold text-green-600 mt-auto">
                      ${item.price}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute -top-12 left-1/2 -translate-x-1/2" />
          <CarouselNext className="absolute -bottom-12 left-1/2 -translate-x-1/2" />
        </div>
      </Carousel>
    </div>
  );
};

export default ShowCarousel;
