"use client";

import BuyProductPage from "@/app/_components/BuyProduct";
import CoinPage from "@/app/_components/ShowCoin";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface ShopItem {
  id: string;
  productName: string;
  title: string;
  image: string;
  price: number;
  stock: number;
  dailyLimit: number;
  soldToday: number;
  teacherId: string;
  createdAt: string;
  updatedAt: string;
}

export default function ShopItemDetail() {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parts[2];
  const [item, setItem] = useState<ShopItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      const res = await fetch(`/api/shop/getSingleProduct?id=${id}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to fetch item");
      } else {
        setItem(data.Detail);
      }

      setLoading(false);
    };

    fetchItem();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!item) return <p>No item found</p>;

  return (
    <div className="shop-item-detail">
      <h2>{item.title}</h2>
      <p>Product Name: {item.productName}</p>
      <img src={item.image} alt={item.title} width={300} />
      <p>Price: ${item.price}</p>
      <p>Stock: {item.stock}</p>
      <p>Daily Limit: {item.dailyLimit}</p>
      <p>Sold Today: {item.soldToday}</p>
      <p>Teacher ID: {item.teacherId}</p>
      <p>Created At: {new Date(item.createdAt).toLocaleString()}</p>
      <p>Updated At: {new Date(item.updatedAt).toLocaleString()}</p>
      <BuyProductPage />
      <CoinPage />
    </div>
  );
}
