"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

type Detail = {
  id: string;
  username: string;
  email: string;
  clerkId: string;
  coin: number;
  followers: number;
  following: number;
  createdAt: string;
};

export default function LeaderDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [leader, setLeader] = useState<Detail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadLeader = async () => {
      const res = await fetch(`/api/showLeaderDetail?id=${id}`);
      const data = await res.json();
      setLeader(data.Detail);
      setLoading(false);
    };

    loadLeader();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-zinc-400">
        Loading...
      </div>
    );

  if (!leader)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-zinc-400">
        No data found
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-red px-4 py-6">
      <button
        onClick={() => router.push("/leader")}
        className="flex items-center gap-2 text-black hover:text-white transition mb-6 hover:cursor-pointer"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div
        className="max-w-md mx-auto rounded-xl border border-green-300/40
              bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-green-900/10
              p-6 shadow-xl transition hover:scale-[1.02]"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-white">
            {leader.username}
          </h1>
          <span className="text-sm text-zinc-400">Email: {leader.email}</span>
          <span className="text-sm text-yellow-400 font-medium">
            Coins: {leader.coin}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 text-center">
          <div
            className="rounded-xl border border-green-300/40
              bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-green-900/10
              py-4 transition hover:scale-[1.02]"
          >
            <p className="text-lg font-bold text-white">COMING SOON ...</p>
            <p className="text-xs text-zinc-400">Followers</p>
          </div>
          <div
            className="rounded-xl border border-green-300/40
              bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-green-900/10
              py-4 transition hover:scale-[1.02]"
          >
            <p className="text-lg font-bold text-white">COMING SOON ...</p>
            <p className="text-xs text-zinc-400">Following</p>
          </div>
        </div>

        <div className="mt-4 text-sm text-zinc-400 text-center">
          <span className="font-medium text-zinc-300">Joined:</span>{" "}
          {new Date(leader.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
