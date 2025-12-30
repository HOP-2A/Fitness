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
        className="flex items-center gap-2 text-black hover:text-white transition mb-6"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="max-w-md mx-auto rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-semibold text-white">
              {leader.username}
            </h1>
            <p className="text-sm text-zinc-400">{leader.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="rounded-xl bg-zinc-800 py-3">
            <p className="text-lg font-bold text-white">{leader.coin}</p>
            <p className="text-xs text-zinc-400">Coins</p>
          </div>
          <div className="rounded-xl bg-zinc-800 py-3">
            <p className="text-lg font-bold text-white">{leader.followers}</p>
            <p className="text-xs text-zinc-400">Followers</p>
          </div>
          <div className="rounded-xl bg-zinc-800 py-3">
            <p className="text-lg font-bold text-white">{leader.following}</p>
            <p className="text-xs text-zinc-400">Following</p>
          </div>
        </div>

        <div className="text-sm text-zinc-400">
          <span className="font-medium text-zinc-300">Joined:</span>{" "}
          {new Date(leader.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
