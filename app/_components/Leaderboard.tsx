"use client";

import { useEffect, useState } from "react";
import {
  Trophy,
  Medal,
  Award,
  Coins,
  Crown,
  Calendar,
  Hash,
} from "lucide-react";

type User = {
  id: string;
  username: string;
  email: string;
  profilePicture: string | null;
  coin: number;
  adminName: string;
  createdAt: Date;
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
            bg: "bg-emerald-500/5",
            text: "text-emerald-400",
            gradient: "from-emerald-500/10 to-emerald-600/5",
          },
          {
            border: "border-blue-500/30",
            bg: "bg-blue-500/5",
            text: "text-blue-400",
            gradient: "from-blue-500/10 to-blue-600/5",
          },
          {
            border: "border-purple-500/30",
            bg: "bg-purple-500/5",
            text: "text-purple-400",
            gradient: "from-purple-500/10 to-purple-600/5",
          },
        ];

        const styledUsers: UserWithStyle[] = users.map((user, index) => {
          let style;
          if (index < topStyles.length) {
            style = topStyles[index];
          } else {
            style = extraColors[index % extraColors.length] || {
              border: "border-slate-700/50",
              bg: "bg-slate-800/50",
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
    if (index === 0) return "1st Place";
    if (index === 1) return "2nd Place";
    if (index === 2) return "3rd Place";
    return `${index + 1}th Ranking`;
  };

  return (
    <div className="min-h-screen py-12 px-4 ml-64 bg-[#0a0c10]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <Trophy className="h-10 w-10 text-yellow-500 animate-pulse" />
            <h1 className="text-4xl font-black text-white tracking-tight italic">
              LEADERBOARD
            </h1>
            <Trophy className="h-10 w-10 text-yellow-500 animate-pulse" />
          </div>
          <p className="text-slate-400 font-medium uppercase tracking-widest text-sm">
            Top performers ranked by coins earned
          </p>
        </div>

        {leaderboard.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
            <Trophy className="mx-auto mb-4 h-12 w-12 text-slate-700" />
            <p className="text-slate-500 font-medium">
              No rankings available yet
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {leaderboard.map((user, index) => (
              <div
                key={user.id}
                className={`
                  group relative overflow-hidden
                  rounded-2xl border ${user.style.border}
                  ${user.style.bg}
                  backdrop-blur-md p-1
                  transition-all duration-300
                  hover:shadow-[0_0_20px_rgba(0,0,0,0.4)]
                  ${index < 3 ? "scale-[1.02]" : "hover:scale-[1.01]"}
                `}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-5">
                      <div
                        className={`
                        flex h-12 w-12 items-center justify-center rounded-xl 
                        ${index < 3 ? "bg-white/10" : "bg-black/20"} 
                        text-xl font-black ${user.style.text}
                      `}
                      >
                        {index + 1}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-lg font-bold text-white tracking-wide uppercase">
                            {user.username}
                          </p>
                          {index < 3 && (
                            <span
                              className={`text-[10px] font-black px-2 py-0.5 rounded-md bg-white/10 ${user.style.text} border border-current/20`}
                            >
                              {getPodiumPosition(index)}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 font-medium truncate italic">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`
                      flex items-center gap-2
                      rounded-xl border ${user.style.border}
                      bg-black/20 px-4 py-2
                    `}
                    >
                      <Coins className={`h-4 w-4 ${user.style.text}`} />
                      <span className={`text-lg font-black ${user.style.text}`}>
                        {user.coin.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-rows-[0fr] transition-all duration-300 ease-in-out group-hover:grid-rows-[1fr] opacity-0 group-hover:opacity-100">
                    <div className="overflow-hidden">
                      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex gap-6">
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold uppercase tracking-tighter">
                            <Calendar className="h-3.5 w-3.5" />
                            Joined:{" "}
                            {new Date(user.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold uppercase tracking-tighter">
                            <Hash className="h-3.5 w-3.5" />
                            ID: {user.id.slice(0, 8)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {leaderboard.length > 0 && (
          <div className="mt-10 rounded-3xl border border-slate-800/50 bg-slate-900/30 p-8 backdrop-blur-sm">
            <div className="grid grid-cols-3 divide-x divide-slate-800">
              <div className="px-4 text-center">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                  Players
                </p>
                <p className="text-3xl font-black text-white">
                  {leaderboard.length}
                </p>
              </div>
              <div className="px-4 text-center">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                  Highest
                </p>
                <p className="text-3xl font-black text-yellow-500">
                  {leaderboard[0]?.coin.toLocaleString()}
                </p>
              </div>
              <div className="px-4 text-center">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                  Total Supply
                </p>
                <p className="text-3xl font-black text-emerald-500">
                  {leaderboard
                    .reduce((sum, u) => sum + u.coin, 0)
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
