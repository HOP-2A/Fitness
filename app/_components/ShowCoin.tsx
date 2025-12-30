"use client";

import { useEffect, useState } from "react";

interface UserCoin {
  username: string;
  coin: number;
}

export default function CoinPage() {
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

  return (
    <div
      className="w-[360px] rounded-xl border border-green-300/40
              bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-green-900/10
              p-6 transition hover:scale-[1.02]
      shadow-[0_25px_80px_-20px_rgba(0,0,0,0.9)] p-6"
    >
      <h1 className="text-white text-2xl font-bold mb-6 flex items-center gap-2">
        💰 Your Coins
      </h1>

      {loading && (
        <div className="space-y-4 animate-pulse">
          <div className="h-14 rounded-xl bg-white/5" />
          <div className="h-14 rounded-xl bg-white/5" />
        </div>
      )}

      {error && <p className="text-red-400">{error}</p>}

      {userCoin && !loading && (
        <div className="space-y-5">
          <div className="rounded-2xl bg-white/5 px-5 py-4 flex justify-between">
            <span className="text-gray-400 text-sm">Username</span>
            <span className="text-white font-semibold truncate max-w-[180px]">
              {userCoin.username}
            </span>
          </div>

          <div className="rounded-2xl bg-white/5 px-5 py-4 flex justify-between">
            <span className="text-gray-400 text-sm">Balance</span>
            <span className="text-yellow-400 font-bold text-2xl">
              {userCoin.coin}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
