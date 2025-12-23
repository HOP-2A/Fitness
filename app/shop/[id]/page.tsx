"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Product = {
  id: string;
  productName: string;
  title: string;
  image: string;
  price: number;
  stock: number;
  description?: string;
};

interface Props {
  params: {
    id: string;
  };
}

const ProductPage = ({ params }: Props) => {
  const { id } = params;
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/shop/getEachProduct/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="p-10 text-center text-white min-h-screen bg-[#192126]">
        Loading product...
      </div>
    );
  if (!product)
    return (
      <div className="p-10 text-center text-white min-h-screen bg-[#192126]">
        Product not found.
      </div>
    );
  console.log(product);
  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen bg-[#192126] text-white">
      <button className="mb-6 text-blue-400" onClick={() => router.back()}>
        &larr; Back
      </button>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-full md:w-1/2 h-80">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
          <p className="text-gray-300 mb-4">{product.title}</p>
          {product.description && (
            <p className="text-gray-400 mb-4">{product.description}</p>
          )}

          <span className="font-bold text-2xl mb-6">{product.price}₮</span>

          <Button disabled={product.stock <= 0} className="w-40 rounded-xl">
            {product.stock > 0 ? "Buy" : "Out of stock"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
