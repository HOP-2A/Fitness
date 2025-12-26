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
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-10 text-emerald-300">
          🏆 Leaderboard
        </h1>

        <div className="grid gap-4">
          {leaderboard.map((user, index) => {
            let borderClass = "border-gray-700";
            let bgClass = "bg-gray-900";
            let textClass = "text-gray-200";

            if (index === 0) {
              borderClass = "border-yellow-400";
              bgClass = "bg-yellow-900/30";
              textClass = "text-yellow-300";
            } else if (index === 1) {
              borderClass = "border-gray-400";
              bgClass = "bg-gray-800/30";
              textClass = "text-gray-300";
            } else if (index === 2) {
              borderClass = "border-orange-600";
              bgClass = "bg-orange-900/30";
              textClass = "text-orange-300";
            }

            return (
              <div
                key={user.id}
                className={`
              flex justify-between items-center
              rounded-2xl px-6 py-4
              border ${borderClass} ${bgClass} ${textClass}
              shadow hover:scale-[1.01] transition-all
            `}
                onClick={() => DetailHaruulah(user.id)}
              >
                <div className="space-y-1">
                  <p className={`text-lg font-semibold ${textClass}`}>
                    {index + 1}. {user.username}
                  </p>
                  <p className="text-sm text-gray-400 truncate max-w-[220px]">
                    {user.email}
                  </p>
                </div>

                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold ${bgClass} ${textClass}`}
                >
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
