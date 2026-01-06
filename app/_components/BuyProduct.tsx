"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { Minus, Plus, ShoppingCart } from "lucide-react";

type ShopItem = {
  id: string;
  price: number;
  stock: number;
  dailyLimit: number;
  soldToday: number;
};

export default function BuyProductPage() {
  const [item, setItem] = useState<ShopItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [purchasing, setPurchasing] = useState(false);

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
      } catch {
        setError("Failed to connect to server");
        setLoading(false);
      }
    }

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-400 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
        <p className="text-red-400 text-sm text-center">{error}</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <p className="text-gray-400 text-sm text-center">Product not found</p>
      </div>
    );
  }

  const remainingToday = item.dailyLimit - item.soldToday;
  const maxQty = Math.min(item.stock, remainingToday);

  const handlePurchase = async () => {
    if (!item) return;
    setPurchasing(true);

    try {
      const res = await fetch("/api/shop/buyProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: item.id, quantity }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast(data.error || "Purchase failed");
      } else {
        toast("Purchase successful!");

        setItem({
          ...item,
          stock: item.stock - quantity,
          soldToday: item.soldToday + quantity,
        });

        setQuantity(1);
      }
    } catch {
      alert("Failed to connect to server");
    } finally {
      setPurchasing(false);
    }
    window.location.reload();
  };

  const incrementQty = () => {
    if (quantity < maxQty) setQuantity(quantity + 1);
  };

  const decrementQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-2 pb-2 border-b border-white/10">
        <div
          className={`w-2 h-2 rounded-full ${
            item.stock > 0 ? "bg-emerald-400" : "bg-red-400"
          }`}
        ></div>
        <span
          className={`text-xs ${
            item.stock > 0 ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
        </span>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
        <p className="text-xs text-gray-400 mb-1">Available today</p>
        <p className="text-lg font-bold text-white">{remainingToday}</p>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-gray-400 block text-center">
          Quantity
        </label>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={decrementQty}
            disabled={quantity <= 1}
            className=" hover:cursor-pointer w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Minus size={16} />
          </button>

          <input
            type="number"
            min={1}
            max={maxQty}
            value={quantity}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 1 && value <= maxQty) {
                setQuantity(value);
              }
            }}
            className="w-16 h-10 bg-white/5 border border-white/10 rounded-lg text-center text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
          />

          <button
            onClick={incrementQty}
            disabled={quantity >= maxQty}
            className=" hover:cursor-pointer w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-center">
        <p className="text-xs text-emerald-400 mb-1">Total</p>
        <p className="text-2xl font-bold text-emerald-400">
          {item.price * quantity} coins
        </p>
      </div>

      <button
        onClick={handlePurchase}
        disabled={
          quantity < 1 || quantity > maxQty || purchasing || item.stock === 0
        }
        className=" hover:cursor-pointer w-full bg-gradient-to-r from-emerald-400 to-green-500 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
      >
        {purchasing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            Processing...
          </>
        ) : (
          <>
            <ShoppingCart size={20} />
            Purchase Now
          </>
        )}
      </button>
    </div>
  );
}
