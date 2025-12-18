"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  username: string;
  email: string;
  coin: string;
  createdAt: string;
};

export const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<User[]>([]);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      setLeaderboard(data.User);
    };
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-10 text-emerald-800">
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
                      ? "border-emerald-300 bg-emerald-100/60 shadow-[0_10px_25px_-10px_rgba(16,185,129,0.35)]"
                      : "border-emerald-100 bg-white shadow-[0_8px_20px_-12px_rgba(16,185,129,0.25)]"
                  }
                  hover:scale-[1.01]
                `}
              >
                {/* User Info */}
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-emerald-800">
                    {index + 1}. {user.username}
                  </p>
                  <p className="text-sm text-emerald-600 truncate max-w-[220px]">
                    {user.email}
                  </p>
                </div>

                {/* Coins */}
                <div className="flex items-center gap-2">
                  <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-emerald-200 text-emerald-800">
                    {user.coin} 🪙
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
