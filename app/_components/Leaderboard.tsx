"use client";

import { useEffect, useState } from "react";
import LeaderDetail from "./LeaderDetail";

type User = {
  id: string;
  username: string;
  email: string;
  coin: number;
  createdAt: string;
};

type UserWithStyle = User & {
  style: { border: string; bg: string; text: string };
};

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<UserWithStyle[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("/api/leaderboard");
        const data = await res.json();
        const users: User[] = data?.User ?? []; // safe fallback

        const topStyles = [
          {
            border: "border-yellow-400",
            bg: "bg-yellow-900/30",
            text: "text-yellow-300",
          },
          {
            border: "border-gray-400",
            bg: "bg-gray-800/30",
            text: "text-gray-300",
          },
          {
            border: "border-orange-600",
            bg: "bg-orange-900/30",
            text: "text-orange-300",
          },
        ];

        const extraColors = [
          {
            border: "border-purple-600",
            bg: "bg-purple-900/20",
            text: "text-purple-300",
          },
          {
            border: "border-teal-500",
            bg: "bg-teal-900/20",
            text: "text-teal-300",
          },
          {
            border: "border-pink-500",
            bg: "bg-pink-900/20",
            text: "text-pink-300",
          },
          {
            border: "border-blue-500",
            bg: "bg-blue-900/20",
            text: "text-blue-300",
          },
        ];

        // Assign styles safely
        const styledUsers: UserWithStyle[] = users.map((user, index) => {
          let style;
          if (index < topStyles.length) {
            style = topStyles[index];
          } else if (index < 10) {
            const randomIndex = Math.floor(Math.random() * extraColors.length);
            style = extraColors[randomIndex];
          } else {
            style = {
              border: "border-gray-700",
              bg: "bg-gray-900",
              text: "text-gray-200",
            };
          }
          return { ...user, style };
        });

        setLeaderboard(styledUsers);
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
        setLeaderboard([]); // fallback to empty array
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 to-blue-900 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-center mb-10 text-emerald-300">
          🏆 Leaderboard
        </h1>

        <div className="grid gap-4">
          {leaderboard.map((user, index) => (
            <div
              key={user.id}
              className={`
                relative group
                flex justify-between items-center
                rounded-2xl px-6 py-4
                border ${user.style?.border} ${user.style?.bg} ${user.style?.text}
                shadow hover:scale-[1.01] transition-all
              `}
            >
              <div className="space-y-1">
                <p className={`text-lg font-semibold ${user.style?.text}`}>
                  {index + 1}. {user.username}
                </p>
                <p className="text-sm text-gray-400 truncate max-w-[220px]">
                  {user.email}
                </p>
              </div>

              <span
                className={`px-4 py-1.5 rounded-full text-sm font-semibold ${user.style?.bg} ${user.style?.text}`}
              >
                {user.coin} 🪙
              </span>

              <div className="absolute top-1/2 left-full ml-4 -translate-y-1/2 hidden group-hover:block z-40">
                <LeaderDetail leader={user} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
