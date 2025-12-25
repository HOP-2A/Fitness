"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

type ShopItem = {
  id: string;

  price: number;
  stock: number;
};

export default function BuyProductPage() {
  const [item, setItem] = useState<ShopItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parts[2];

  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await fetch(`/api/shop/getSingleProduct?id=${id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Product not found");
          setLoading(false);
          return;
        }

        setItem(data.Detail);
        setLoading(false);
      } catch (err) {
        setError("Failed to connect to server");
        setLoading(false);
      }
    }

    fetchItem();
  }, [id]);

  const handlePurchase = async () => {
    if (!item) return;

    try {
      const res = await fetch("/api/shop/buyProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: item.id, quantity }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Purchase failed");
      } else {
        alert("Purchase successful!");
        setItem({ ...item, stock: item.stock - quantity });
        setQuantity(1);
      }
    } catch (err) {
      alert("Failed to connect to server");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!item) return <p>Product not found</p>;

  return (
    <div
      style={{ padding: "2rem" }}
      className="flex flex-col gap-3 content-start"
    >
      <p className="font-bold">Price: {item.price} coins</p>
      <p className="font-bold">Stock: {item.stock}</p>

      <label className="border border-[#A3FFAB] rounded-xl p-3 text-center font-semibold">
        Quantity:
        <input
          className="border rounded-xl p-1 text-center"
          type="number"
          min={1}
          max={item.stock}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          style={{ marginLeft: "0.5rem", width: "60px" }}
        />
      </label>

      <button
        onClick={handlePurchase}
        style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}
        disabled={quantity > item.stock || quantity < 1}
        className="border border-[#A3FFAB] rounded-xl p-3 text-center font-semibold hover:bg-[#A3FFAB] hover:text-black transition cursor-pointer"
      >
        Buy
      </button>
    </div>
  );
}
