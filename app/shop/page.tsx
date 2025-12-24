"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BuyProduct from "../_components/BuyProduct";
import CoinPage from "../_components/ShowCoin";

interface ShopItem {
  id: string;
  productName: string;
  title: string;
  image: string;
  price: number;
  stock: number;
}

export default function ShopPage() {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    async function fetchItems() {
      const res = await fetch("/api/shop/getProducts");
      const data: ShopItem[] = await res.json();
      setItems(data);
      setLoading(false);
    }

    fetchItems();
  }, []);

  if (loading)
    return (
      <div
        style={{
          color: "white",
          backgroundColor: "#111",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
        }}
      >
        Loading...
      </div>
    );

  return (
    <div
      style={{
        backgroundColor: "#111",
        color: "white",
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <CoinPage />

      <h1 style={{ borderBottom: "2px solid #333", paddingBottom: "0.5rem" }}>
        Shop Items
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginTop: "2rem",
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: "#1a1a1a",
              padding: "1rem",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
              transition: "transform 0.2s",
            }}
            onClick={() => router.push(`/shop/${item.id}`)}
          >
            <img
              src={item.image}
              alt={item.productName}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "6px",
                marginBottom: "0.5rem",
              }}
            />
            <h2 style={{ margin: "0.5rem 0" }}>{item.title}</h2>
            <p>Product: {item.productName}</p>
            <p>Price: {item.price} coin</p>
            <p>Stock: {item.stock}</p>
            <button onClick={() => router.push(`/shop/${item.id}`)}>
              See Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
