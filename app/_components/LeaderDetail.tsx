"use client";

type Leader = {
  id: string;
  username: string;
  email: string;
  coin: number;
  createdAt: string;
};

export default function LeaderDetail({ leader }: { leader: Leader }) {
  return (
    <div
      className="w-128 rounded-xl border border-green-300/40
      bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-green-900/10
      p-4 shadow-xl"
    >
      <h2 className="text-xl font-bold text-white">{leader.username}</h2>

      <p className="text-s text-zinc-400 truncate">{leader.email}</p>

      <p className="mt-2 text-s text-yellow-400 font-medium">
        🪙 Coins: {leader.coin}
      </p>

      <p className="mt-2 text-xs text-zinc-400">
        Joined: {new Date(leader.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
