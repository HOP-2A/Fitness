"use client";

import { useEffect, useState } from "react";
import CoinPage from "./ShowCoin";
import LeaderDetail from "./LeaderDetail";

type User = {
  id: string;
  username: string;
  email: string;
  coin: number;
  createdAt: string;
};

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<User[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      setLeaderboard(data.User ?? []);
    };

    fetchLeaderboard();
  }, []);

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-2xl ml-65 space-y-6">
=======
    <div className="py-12 px-4">
      <div className="w-full ml-65 space-y-6">
>>>>>>> 82451d8 (css)
=======
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-red py-12 px-4">
      <div className="max-w-2xl ml-65 space-y-6">
>>>>>>> 2874bbf (css)
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
                  relative group
                  flex justify-between items-center
                  rounded-2xl px-6 py-4
                  border ${borderClass} ${bgClass} ${textClass}
                  shadow hover:scale-[1.01] transition-all
                `}
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

                {/* Hover detail card */}
                <div className="absolute top-1/2 left-full ml-4 -translate-y-1/2 hidden group-hover:block z-40">
                  <LeaderDetail leader={user} />
                </div>
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
}
