"use client";

import { useAuth } from "@/providers/authProvider";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Product = {
  id: string;
  productName: string;
  title: string;
  image: string;
  price: number;
  stock: number;
};

const ShopPage = () => {
  const router = useRouter();
  const { user: clerkUser, isLoaded } = useUser();
  const userData = useAuth(clerkUser?.id);
  const user = userData.user;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/shop/getProduct");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [isLoaded, user]);

  if (!isLoaded || loading) {
    return (
      <div className="p-10 text-center text-white min-h-screen bg-[#192126]">
        Loading shop...
      </div>
    );
  }

  return (
    <div className="p-8 mx-auto min-h-screen bg-[#192126] ">
      <h1 className="text-3xl font-bold mb-8 text-white">🛒 Shop</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl bg-gradient-to-b from-[#261E19] via-[#3a6bbf] to-[#37a3e7] hover:from-[#3b1f1a] hover:via-[#4a7fd0] hover:to-[#4bb8f2]"
            onClick={() => router.push(`/shop/${product.id}`)}
          >
            <CardContent className="p-4 flex flex-col">
              <div className="relative w-full h-40 mb-4">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>

              <h2 className="font-semibold text-lg text-white">
                {product.productName}
              </h2>
              <p className="text-sm text-gray-300 mb-2">{product.title}</p>

              <div className="flex justify-between items-center mt-auto">
                <span className="font-bold text-lg text-white">
                  {product.price}₮
                </span>

                <Button disabled={product.stock <= 0} className="rounded-xl">
                  {product.stock > 0 ? "Buy" : "Out of stock"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
