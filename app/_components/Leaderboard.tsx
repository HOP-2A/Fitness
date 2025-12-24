"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CoinPage from "./ShowCoin";

type User = {
  id: string;
  username: string;
  email: string;
  coin: number;
  createdAt: string;
};

export const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const router = useRouter();
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      setLeaderboard(data.User);
    };
    getUser();
  }, []);
  const DetailHaruulah = (id: string) => {
    router.push(`/leaderDetail/${id}`);
  };
  return (
    <div className="min-h-screen bg-[#192126] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-10 text-emerald-300">
          🏆 Leaderboard
        </h1>

        <div className="grid gap-4">
          {leaderboard.map((user, index) => {
            const isTopThree = index < 3;

            return (
              <div
                key={user.id}
                className={`
                  flex justify-between items-center
                  rounded-2xl px-6 py-4
                  border transition-all
                  ${
                    isTopThree
                      ? "border-emerald-600 bg-emerald-900/40"
                      : "border-gray-700 bg-gray-900"
                  }
                  shadow hover:scale-[1.01]
                `}
                onClick={() => DetailHaruulah(user.id)}
              >
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-emerald-200">
                    {index + 1}. {user.username}
                  </p>
                  <p className="text-sm text-gray-400 truncate max-w-[220px]">
                    {user.email}
                  </p>
                </div>

                <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-emerald-800 text-emerald-200">
                  {user.coin} 🪙
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="fixed top-17 right-4.5 z-50">
        <CoinPage />
      </div>
    </div>
  );
};
