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
        orientation="horizontal"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[autoplayPlugin]}
      >
        <div className="relative">
          <CarouselContent className="mt-4">
            {items?.map((item) => (
              <CarouselItem key={item.id} className="pt-4 basis-1/4">
                <div
                  className="border rounded-xl p-4 flex items-center gap-4 shadow-lg hover:shadow-xl h-[240px] transition duration-300 ease-in-out"
                  onClick={() => router.push(`/Item/${item.id}`)}
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.productName}
                    className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                  />

                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="font-semibold text-lg text-gray-800 hover:text-green-600 transition duration-200 ease-in-out">
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

          <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 opacity-0 pointer-events-none" />
          <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-0 pointer-events-none" />
        </div>
      </Carousel>
    </div>
  );
};

export default ShowCarousel;
