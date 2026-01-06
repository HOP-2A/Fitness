"use client";

import { useAuth } from "@/providers/authProvider";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, TrendingUp } from "lucide-react";

type ExerciseStatus = "PENDING" | "DONE" | "APPROVE";

type Exercise = {
  id: string;
  title: string;
  status: ExerciseStatus;
  rate: number;
  reward: number;
  createdAt: string;
};

const GetAssignedExercise = () => {
  const router = useRouter();
  const { user: clerkUser, isLoaded } = useUser();
  const userData = useAuth(clerkUser?.id);
  const user = userData.user;

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchExercises = async () => {
      const res = await fetch(`/api/getExercise/${user.id}`);
      const data = await res.json();
      setExercises(data);
    };

    fetchExercises();
  }, [isLoaded, user]);

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString();
  };

  const handleStatusChange = async (status: ExerciseStatus) => {
    if (!selectedExercise) return;

    await fetch("/api/changeStatus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: selectedExercise.id,
        status,
      }),
    });

    setExercises((prev) =>
      prev.map((ex) => (ex.id === selectedExercise.id ? { ...ex, status } : ex))
    );

    setShowStatusModal(false);
    setSelectedExercise(null);
  };

  const statusConfig = (status: ExerciseStatus) => {
    switch (status) {
      case "PENDING":
        return {
          bg: "bg-yellow-500/10",
          text: "text-yellow-400",
          border: "border-yellow-500/30",
          icon: "⏳",
        };
      case "DONE":
        return {
          bg: "bg-emerald-500/10",
          text: "text-emerald-400",
          border: "border-emerald-500/30",
          icon: "✓",
        };
      case "APPROVE":
        return {
          bg: "bg-purple-500/10",
          text: "text-purple-400",
          border: "border-purple-500/30",
          icon: "★",
        };
    }
  };

  if (!isLoaded) {
    return (
      <div className="ml-64 max-w-[1350px] mr-7 py-16 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-slate-400">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-700 border-t-emerald-500" />
          Loading your exercises...
        </div>
      </div>
    );
  }

  return (
    <div className="ml-64 max-w-[1350px] pb-10 pt-10 mr-7">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-3xl font-extrabold text-white">Your Exercises</h2>
          <Sparkles className="h-6 w-6 text-emerald-400" />
        </div>
        <p className="text-slate-400">
          Complete your assigned workouts and earn rewards
        </p>
      </div>

      {exercises.length === 0 ? (
        <div className="rounded-2xl border border-slate-700 bg-slate-900/50 p-12 text-center backdrop-blur-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
            <TrendingUp className="h-8 w-8 text-emerald-400" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">
            No exercises yet
          </h3>
          <p className="text-sm text-slate-400">
            Check back soon for new assignments from your trainer
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {exercises.map((ex, index) => {
            const config = statusConfig(ex.status);
            const isNew = timeAgo(ex.createdAt) === "Today";

            return (
              <motion.div
                key={ex.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-600 hover:shadow-xl hover:shadow-emerald-500/5"
              >
                <button
                  onClick={() => {
                    if (ex.status === "APPROVE") return;
                    setSelectedExercise(ex);
                    setShowStatusModal(true);
                  }}
                  disabled={ex.status === "APPROVE"}
                  className={`absolute top-4 right-4 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                    config.bg
                  } ${config.text} ${config.border} ${
                    ex.status === "APPROVE"
                      ? "cursor-not-allowed opacity-70"
                      : "hover:scale-105 cursor-pointer hover:shadow-lg"
                  }`}
                >
                  <span>{config.icon}</span>
                  {ex.status}
                </button>

                <div className="mb-4 pr-24">
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    {ex.title}
                    {isNew && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold">
                        NEW
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-slate-400 flex items-center gap-1.5">
                    <span className="text-slate-500">📅</span>
                    {timeAgo(ex.createdAt)}
                  </p>
                </div>

                <div className="mb-4 flex gap-4">
                  <div className="flex-1 rounded-lg bg-slate-800/50 p-3 border border-slate-700/50">
                    <div className="text-xs text-slate-400 mb-1">
                      Difficulty
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-lg font-bold text-white">
                        {ex.rate}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 rounded-lg bg-slate-800/50 p-3 border border-slate-700/50">
                    <div className="text-xs text-slate-400 mb-1">Reward</div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-400">💰</span>
                      <span className="text-lg font-bold text-emerald-400">
                        {ex.reward}
                      </span>
                    </div>
                  </div>
                </div>

<<<<<<< HEAD
              <div className="mt-4 flex justify-between text-xs text-gray-300">
                <span>⭐ Rate: {ex.rate}</span>
                <span>💰 Reward: {ex.reward}</span>
              </div>

              <button
                className="mt-4 text-sm text-black hover:underline hover:cursor-pointer"
                onClick={() => router.push(`/detail/${ex.id}`)}
              >
                See Details →
              </button>
            </div>
          ))}
=======
                <button
                  onClick={() => router.push(`/detail/${ex.id}`)}
                  className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95"
                >
                  View Details →
                </button>
              </motion.div>
            );
          })}
>>>>>>> f7317a2 (buten 180 gradus ergesen ui)
        </div>
      )}

      <AnimatePresence>
        {showStatusModal && selectedExercise && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowStatusModal(false)}
          >
            <motion.div
              className="w-[320px] rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="mb-6 text-center text-lg font-bold text-white">
                Update Exercise Status
              </h3>

              <div className="space-y-3">
                <button
                  onClick={() => handleStatusChange("PENDING")}
                  className="w-full rounded-lg bg-yellow-500/10 border border-yellow-500/30 px-4 py-3 text-sm font-semibold text-yellow-400 transition-all hover:bg-yellow-500/20 active:scale-95"
                >
                  <span className="mr-2">⏳</span>
                  Mark as Pending
                </button>

                <button
                  onClick={() => handleStatusChange("DONE")}
                  className="w-full rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-sm font-semibold text-emerald-400 transition-all hover:bg-emerald-500/20 active:scale-95"
                >
                  <span className="mr-2">✓</span>
                  Mark as Complete
                </button>
              </div>

              <button
                className="mt-6 w-full text-sm text-slate-400 transition-colors hover:text-white"
                onClick={() => setShowStatusModal(false)}
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GetAssignedExercise;
