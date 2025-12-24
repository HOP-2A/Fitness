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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Coin</h1>
      {userCoin ? (
        <div>
          <p>
            <span className="font-semibold">Username:</span> {userCoin.username}
          </p>
          <p>
            <span className="font-semibold">Coin:</span> {userCoin.coin}
          </p>
        </div>
      ) : (
        <p>No user data</p>
      )}
    </div>
  );
}
