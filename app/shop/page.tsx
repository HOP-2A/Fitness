"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CoinPage from "../_components/ShowCoin";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      async function fetchItems() {
        const res = await fetch(`/api/shop/search?q=${search}`);
        const data: ShopItem[] = await res.json();
        setItems(data);
      }
      fetchItems();
    }, 100);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div
      style={{
        backgroundColor: "#192126",
        color: "white",
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div className="flex gap-8">
        <div className="flex-1">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition mb-4"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="flex items-center gap-6 mb-8">
            <h1
              style={{
                borderBottom: "2px solid #333",
                paddingBottom: "0.5rem",
                whiteSpace: "nowrap",
              }}
            >
              Shop Items
            </h1>

            <input
              type="text"
              placeholder="Search product name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "6px",
                width: "420px",
                height: "45px",
                backgroundColor: "#111",
                color: "white",
                border: "1px solid #333",
                outline: "none",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "1.5rem",
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
                }}
                className="flex flex-col justify-between"
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

                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p>Product: {item.productName}</p>
                <p>Price: {item.price} coin</p>
                <p>Stock: {item.stock}</p>

                <Button
                  onClick={() => router.push(`/shop/${item.id}`)}
                  variant="outline"
                  className="mt-3"
                >
                  See Detail...
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="w-[320px] sticky top-8 h-fit">
          <CoinPage />
        </div>
      </div>
    </div>
  );
}
