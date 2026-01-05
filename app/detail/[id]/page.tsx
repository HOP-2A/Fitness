"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import AskTeacher from "@/app/_components/AskTeacher";

type ExerciseStatus = "PENDING" | "DONE" | "APPROVE";

type Detail = {
  id: string;
  title: string;
  description: string;
  target: string;
  rate: number;
  status: ExerciseStatus;
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
  const [updating, setUpdating] = useState(false);

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

  const changeStatus = async (status: ExerciseStatus) => {
    if (!exercise) return;

    setUpdating(true);

    const res = await fetch("/api/changeStatus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: exercise.id,
        status,
      }),
    });

    if (!res.ok) {
      alert("Failed to update status");
      setUpdating(false);
      return;
    }

    setExercise((prev) => (prev ? { ...prev, status } : prev));
    setUpdating(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#192126] text-zinc-500">
        Loading...
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#192126] text-zinc-500">
        No data found
      </div>
    );
  }

  const isApproved = exercise.status === "APPROVE";

  return (
    <div className="bg-[#192126] px-4 py-8 min-h-screen">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-zinc-400 hover:text-white transition mb-8 hover:cursor-pointer"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="flex flex-col lg:flex-row gap-8 max-w-[1500px] mx-auto">
        <div className="flex-1 rounded-3xl bg-zinc-900/80 border border-zinc-800 p-8 space-y-6 shadow-2xl flex flex-col">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold text-white">{exercise.title}</h1>
            {exercise.description && (
              <p className="text-xl text-zinc-400">{exercise.description}</p>
            )}
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="text-xl text-zinc-500 font-medium">Status</span>
            <span
              className={`px-4 py-1 rounded-full text-lg font-semibold
              ${
                exercise.status === "APPROVE"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : exercise.status === "DONE"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {exercise.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-zinc-300">
            {exercise.target && (
              <div className="flex justify-between">
                <span className="text-zinc-500 font-medium">Target</span>
                <span>{exercise.target}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-zinc-500 font-medium">Rate</span>
              <span>{exercise.rate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 font-medium">Reward</span>
              <span className="font-semibold text-white">
                {exercise.reward} 🪙
              </span>
            </div>
          </div>

          {!isApproved && (
            <div className="flex gap-4 pt-6 border-t border-zinc-800 mt-auto">
              <button
                disabled={updating}
                onClick={() => changeStatus("PENDING")}
                className="flex-1 px-6 py-3 rounded-xl bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition"
              >
                Mark as PENDING
              </button>
              <button
                disabled={updating}
                onClick={() => changeStatus("DONE")}
                className="flex-1 px-6 py-3 rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/30 transition"
              >
                Mark as DONE
              </button>
            </div>
          )}

          <div className="pt-4 border-t border-zinc-800 text-sm text-zinc-500">
            Created {new Date(exercise.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="w-full lg:w-[400px] flex-shrink-0">
          <AskTeacher exerciseId={exercise.id} />
        </div>
      </div>
    </div>
  );
}
