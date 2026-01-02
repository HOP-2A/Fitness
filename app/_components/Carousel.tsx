"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch("/api/shop/getProducts");
      const data = await res.json();

      setItems(data);
    };
    fetchItems();
  }, []);
  return (
    <div className="flex justify-center">
      <Carousel className="w-full max-w-sm">
        <CarouselContent>
          {items?.map((item) => (
            <CarouselItem key={item.id} className="p-2">
              <div className="border rounded-xl p-4 flex flex-col items-center gap-2 shadow-sm">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <h3 className="font-semibold text-lg">{item.productName}</h3>

                <p className="text-sm text-gray-500">{item.title}</p>

                <p className="font-bold text-green-600">{item.price}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ShowCarousel;
