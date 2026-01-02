"use client";

import { useEffect, useState } from "react";
import { Coins } from "lucide-react";

interface UserCoin {
  username: string;
  coin: number;
}

interface CoinPageProps {
  variant?: "default" | "shop";
}

export default function CoinPage({ variant = "default" }: CoinPageProps) {
  const [userCoin, setUserCoin] = useState<UserCoin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await fetch("/api/getCoin");
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        setUserCoin(data);
      } catch {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, []);

  const isShop = variant === "shop";

  const containerClass = isShop
    ? "w-[275px] rounded-xl border border-slate-200 bg-gradient-to-br from-[#020617] via-[#050B14] to-[#0F172A] shadow-sm p-5"
    : `w-[360px] rounded-xl border border-green-300/40
       bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-green-900/10
       shadow-[0_25px_80px_-20px_rgba(0,0,0,0.9)] p-6 transition hover:scale-[1.02]`;

  const titleClass = isShop
    ? "text-sm font-semibold text-slate-200 flex items-center gap-2 mb-4"
    : "text-white text-2xl font-bold mb-6 flex items-center gap-2";

  const boxClass = isShop
    ? "rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 flex justify-between"
    : "rounded-2xl bg-white/5 px-5 py-4 flex justify-between";

  const labelClass = isShop
    ? "text-xs text-slate-500"
    : "text-gray-400 text-sm";

  const valueClass = isShop
    ? "text-sm font-medium text-slate-800 truncate max-w-[160px]"
    : "text-white font-semibold truncate max-w-[180px]";

  const coinClass = isShop
    ? "text-xl font-semibold text-emerald-600"
    : "text-yellow-400 font-bold text-2xl";

  return (
    <div className={containerClass}>
      <div className={titleClass}>
        <Coins size={isShop ? 16 : 22} />
        Your Coins
      </div>

      {loading && (
        <div className="space-y-3 animate-pulse">
          <div className="h-10 rounded-lg bg-slate-200/50" />
          <div className="h-10 rounded-lg bg-slate-200/50" />
        </div>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {userCoin && !loading && (
        <div className="space-y-3">
          <div className={boxClass}>
            <span className={labelClass}>Username</span>
            <span className={valueClass}>{userCoin.username}</span>
          </div>

          <div className={boxClass}>
            <span className={labelClass}>Balance</span>
            <span className={coinClass}>
              {userCoin.coin}
              {!isShop && " 🪙"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
