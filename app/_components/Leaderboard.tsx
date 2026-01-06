"use client";

import { useEffect, useState } from "react";
import LeaderDetail from "./LeaderDetail";
import { Trophy, Medal, Award, Coins, Crown } from "lucide-react";

type User = {
  id: string;
  username: string;
  email: string;
  coin: number;
  createdAt: string;
};

type UserWithStyle = User & {
  style: { border: string; bg: string; text: string; gradient: string };
  icon?: React.ReactNode;
};

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<UserWithStyle[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("/api/leaderboard");
        const data = await res.json();
        const users: User[] = data?.User ?? [];

        const topStyles = [
          {
            border: "border-yellow-500/50",
            bg: "bg-gradient-to-br from-yellow-500/10 to-yellow-600/5",
            text: "text-yellow-400",
            gradient: "from-yellow-500/20 to-yellow-600/10",
            icon: <Crown className="h-5 w-5" />,
          },
          {
            border: "border-slate-400/50",
            bg: "bg-gradient-to-br from-slate-400/10 to-slate-500/5",
            text: "text-slate-300",
            gradient: "from-slate-400/20 to-slate-500/10",
            icon: <Medal className="h-5 w-5" />,
          },
          {
            border: "border-orange-500/50",
            bg: "bg-gradient-to-br from-orange-500/10 to-orange-600/5",
            text: "text-orange-400",
            gradient: "from-orange-500/20 to-orange-600/10",
            icon: <Award className="h-5 w-5" />,
          },
        ];

        const extraColors = [
          {
            border: "border-emerald-500/30",
            bg: "bg-gradient-to-br from-emerald-500/5 to-emerald-600/5",
            text: "text-emerald-400",
            gradient: "from-emerald-500/10 to-emerald-600/5",
          },
          {
            border: "border-blue-500/30",
            bg: "bg-gradient-to-br from-blue-500/5 to-blue-600/5",
            text: "text-blue-400",
            gradient: "from-blue-500/10 to-blue-600/5",
          },
          {
            border: "border-purple-500/30",
            bg: "bg-gradient-to-br from-purple-500/5 to-purple-600/5",
            text: "text-purple-400",
            gradient: "from-purple-500/10 to-purple-600/5",
          },
          {
            border: "border-pink-500/30",
            bg: "bg-gradient-to-br from-pink-500/5 to-pink-600/5",
            text: "text-pink-400",
            gradient: "from-pink-500/10 to-pink-600/5",
          },
        ];

        const styledUsers: UserWithStyle[] = users.map((user, index) => {
          let style;
          if (index < topStyles.length) {
            style = topStyles[index];
          } else if (index < 10) {
            const colorIndex = (index - 3) % extraColors.length;
            style = extraColors[colorIndex];
          } else {
            style = {
              border: "border-slate-700/50",
              bg: "bg-gradient-to-br from-slate-800/50 to-slate-900/50",
              text: "text-slate-300",
              gradient: "from-slate-800/30 to-slate-900/30",
            };
          }
          return { ...user, style };
        });

        setLeaderboard(styledUsers);
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
        setLeaderboard([]);
      }
    };

    fetchLeaderboard();
  }, []);

  const getPodiumPosition = (index: number) => {
    if (index === 0) return "1st";
    if (index === 1) return "2nd";
    if (index === 2) return "3rd";
    return `${index + 1}th`;
  };

  return (
    <div className="min-h-screen py-12 px-4 ml-64 ">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <Trophy className="h-10 w-10 text-yellow-400" />
            <h1 className="text-4xl font-extrabold text-white">Leaderboard</h1>
            <Trophy className="h-10 w-10 text-yellow-400" />
          </div>
          <p className="text-slate-400">
            Top performers ranked by coins earned
          </p>
        </div>

        {leaderboard.length === 0 ? (
          <div className="rounded-2xl border border-slate-700 bg-slate-900/50 p-12 text-center backdrop-blur-sm">
            <Trophy className="mx-auto mb-4 h-12 w-12 text-slate-600" />
            <p className="text-slate-400">No rankings available yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {leaderboard.map((user, index) => (
              <div
                key={user.id}
                className={`
                  group relative
                  flex items-center justify-between gap-4
                  rounded-2xl border ${user.style.border}
                  ${user.style.bg}
                  backdrop-blur-sm
                  p-5
                  transition-all duration-300
                  hover:scale-[1.02] hover:shadow-xl
                  ${index < 3 ? "shadow-lg" : ""}
                `}
              >
                <div className="flex items-center gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`text-lg font-bold ${user.style.text}`}>
                        {user.username}
                      </p>
                      {index < 3 && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white">
                          {getPodiumPosition(index)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 truncate max-w-xs">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div
                  className={`
                    flex items-center gap-2
                    rounded-full border ${user.style.border}
                    bg-gradient-to-r ${user.style.gradient}
                    px-4 py-2
                    backdrop-blur-sm
                  `}
                >
                  <Coins className={`h-4 w-4 ${user.style.text}`} />
                  <span className={`text-lg font-bold ${user.style.text}`}>
                    {user.coin.toLocaleString()}
                  </span>
                </div>

                <div className="absolute top-1/2 left-full ml-4 -translate-y-1/2 hidden group-hover:block z-50">
                  <LeaderDetail leader={user} />
                </div>
              </div>
            ))}
          </div>
        )}

        {leaderboard.length > 0 && (
          <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/50 p-6 backdrop-blur-sm">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-slate-400 mb-1">Total Players</p>
                <p className="text-2xl font-bold text-white">
                  {leaderboard.length}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Top Earner</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {leaderboard[0]?.coin.toLocaleString() || 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Total Coins</p>
                <p className="text-2xl font-bold text-emerald-400">
                  {leaderboard
                    .reduce((sum, user) => sum + user.coin, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
