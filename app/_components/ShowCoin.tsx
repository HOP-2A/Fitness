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
      const res = await fetch("/api/getCoin");

      if (!res.ok) {
        setError("Failed to fetch coin");
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (!data) {
        setError("No data returned");
        setLoading(false);
        return;
      }

      setUserCoin(data);
      setLoading(false);
    };

    fetchCoin();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 rounded-3xl border border-[#3B434D] bg-[#1E272E] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]">
      <h1 className="text-2xl font-bold mb-4 text-white">Your Coin</h1>
      {userCoin ? (
        <div>
          <p>
            <span className="font-semibold text-white">Username:</span>{" "}
            <span className="text-white">{userCoin.username}</span>
          </p>
          <p>
            <span className="font-semibold text-white">Coin:</span>{" "}
            <span className="text-white">{userCoin.coin}</span>
          </p>
        </div>
      ) : (
        <p>No user data</p>
      )}
    </div>
  );
}
