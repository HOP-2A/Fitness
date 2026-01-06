"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Award,
  Target,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
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

  const getStatusDisplay = (status: ExerciseStatus) => {
    switch (status) {
      case "APPROVE":
        return {
          icon: <CheckCircle2 size={16} />,
          text: "APPROVED",
          className:
            "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 border-purple-400/50",
        };
      case "DONE":
        return {
          icon: <CheckCircle2 size={16} />,
          text: "DONE",
          className:
            "bg-gradient-to-r from-emerald-500/30 to-emerald-600/30 text-emerald-200 border-emerald-400/50",
        };
      case "PENDING":
        return {
          icon: <Clock size={16} />,
          text: "PENDING",
          className:
            "bg-gradient-to-r from-amber-500/30 to-amber-600/30 text-amber-200 border-amber-400/50",
        };
      default:
        return {
          icon: <AlertCircle size={16} />,
          text: status,
          className: "bg-slate-700/30 text-slate-300 border-slate-600/50",
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-slate-400 text-lg">Loading...</div>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-slate-400 text-lg">No data found</div>
      </div>
    );
  }

  const isApproved = exercise.status === "APPROVE";
  const statusDisplay = getStatusDisplay(exercise.status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-8">
      <button
        onClick={() => router.back()}
        className="group flex items-center gap-2 text-slate-400 hover:text-white transition-all mb-8 px-4 py-2 rounded-lg hover:bg-white/5  hover:cursor-pointer "
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="font-medium">Back</span>
      </button>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr,420px] gap-8">
        <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 p-8 border-b border-slate-700/50">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
                  {exercise.title}
                </h1>
                {exercise.description && (
                  <p className="text-lg text-slate-300 leading-relaxed">
                    {exercise.description}
                  </p>
                )}
              </div>
              <div className="ml-4">
                <span
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border shadow-lg ${statusDisplay.className}`}
                >
                  {statusDisplay.icon}
                  {statusDisplay.text}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {exercise.target && (
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl p-5 border border-blue-500/20 hover:border-blue-500/40 transition-all group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-500/20 rounded-lg group-hover:scale-110 transition-transform">
                      <Target size={20} className="text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-400">
                      Target
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {exercise.target}
                  </p>
                </div>
              )}

              <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-2xl p-5 border border-amber-500/20 hover:border-amber-500/40 transition-all group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-amber-500/20 rounded-lg group-hover:scale-110 transition-transform">
                    <TrendingUp size={20} className="text-amber-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-400">
                    Rate
                  </span>
                </div>
                <p className="text-2xl font-bold text-white">{exercise.rate}</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-2xl p-5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-500/20 rounded-lg group-hover:scale-110 transition-transform">
                    <Award size={20} className="text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-400">
                    Reward
                  </span>
                </div>
                <p className="text-2xl font-bold text-white flex items-center gap-2">
                  {exercise.reward} <span className="text-3xl">🪙</span>
                </p>
              </div>
            </div>

            {!isApproved && (
              <div className="flex gap-4 pt-4">
                <button
                  disabled={updating}
                  onClick={() => changeStatus("PENDING")}
                  className="flex-1 px-6 py-4 rounded-xl font-semibold bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-300 border border-amber-500/30 hover:from-amber-500/30 hover:to-amber-600/30 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed group   hover:cursor-pointer "
                >
                  <span className="flex items-center justify-center gap-2">
                    <Clock
                      size={18}
                      className="group-hover:rotate-12 transition-transform"
                    />
                    Mark as PENDING
                  </span>
                </button>
                <button
                  disabled={updating}
                  onClick={() => changeStatus("DONE")}
                  className="flex-1 px-6 py-4 rounded-xl font-semibold bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:from-emerald-500/30 hover:to-emerald-600/30 hover:cursor-pointer  hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle2
                      size={18}
                      className="group-hover:scale-110 transition-transform"
                    />
                    Mark as DONE
                  </span>
                </button>
              </div>
            )}

            <div className="flex items-center gap-2 pt-6 border-t border-slate-700/50 text-slate-400">
              <Calendar size={16} />
              <span className="text-sm">
                Created{" "}
                {new Date(exercise.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-8 h-fit">
          <AskTeacher exerciseId={exercise.id} />
        </div>
      </div>
    </div>
  );
}
