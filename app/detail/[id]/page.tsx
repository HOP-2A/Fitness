"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

type Detail = {
  id: string;
  teacherId: string;
  teacher: string;
  title: string;
  description: string;
  target: string;
  rate: number;
  status: string;
  reward: number;
  createdAt: string;
  updatedAt: string;
};

export default function DetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [exercise, setExercise] = useState<Detail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadExercise = async () => {
      const res = await fetch(`/api/showTeacherTaskDetail?id=${id}`);
      const data = await res.json();
      setExercise(data.Detail);
      setLoading(false);
    };

    loadExercise();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#192126] text-zinc-500">
        Loading...
      </div>
    );

  if (!exercise)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#192126] text-zinc-500">
        No data found
      </div>
    );

  return (
    <div className="min-h-screen bg-[#192126] px-4 py-8">
      {/* Back */}
      <button
        onClick={() => router.push("/ ")}
        className="flex items-center gap-2 text-zinc-400 hover:text-white transition mb-8"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="max-w-[1700px] max-h-full mx-auto rounded-3xl bg-zinc-900/80 backdrop-blur border border-zinc-800 p-7 space-y-6 shadow-2xl">
        <div className="space-y-2">
          <h1 className="text-8xl font-bold text-white tracking-tight">
            {exercise.title}
          </h1>

          {exercise.description && (
            <p className="text-2xl leading-relaxed text-zinc-400">
              {exercise.description}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center h-[70px]">
          <span className="text-3xl uppercase tracking-wide text-zinc-500">
            Status
          </span>
          <span
            className={`px-3 py-1 rounded-full text-3xl font-medium
              ${
                exercise.status === "APPROVE"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : exercise.status === "PENDING"
                  ? "bg-yellow-500/10 text-yellow-400"
                  : "bg-red-500/10 text-red-400"
              }
            `}
          >
            {exercise.status}
          </span>
        </div>

        <div className="space-y-4 text-3xl">
          {exercise.target && (
            <div className="flex justify-between h-[70px] text-zinc-300">
              <span className="text-zinc-500">Target</span>
              <span>{exercise.target}</span>
            </div>
          )}

          <div className="flex justify-between h-[70px] text-zinc-300">
            <span className="text-zinc-500">Rate</span>
            <span>{exercise.rate}</span>
          </div>

          <div className="flex justify-between h-[70px] text-zinc-300">
            <span className="text-zinc-500">Reward</span>
            <span className="font-semibold text-white">
              {exercise.reward} 🪙
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800 text-xl text-zinc-500 flex justify-between">
          <span>
            Created {new Date(exercise.createdAt).toLocaleDateString()}
          </span>
          <span className="text-zinc-400">Teacher Task</span>
        </div>
      </div>
    </div>
  );
}
