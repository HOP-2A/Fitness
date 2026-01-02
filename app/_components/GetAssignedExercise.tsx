"use client";

import { useAuth } from "@/providers/authProvider";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

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

  const statusColor = (status: ExerciseStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-200/30 text-yellow-600 border-yellow-300/50";
      case "DONE":
        return "bg-green-200/30 text-green-700 border-green-400/50";
      case "APPROVE":
        return "bg-purple-200/30 text-purple-700 border-purple-400/50";
    }
  };

  if (!isLoaded) {
    return (
      <div className="py-16 text-center text-sm text-green-300 animate-pulse">
        Loading your exercises…
      </div>
    );
  }

  return (
    <div className="max-w-2xl ml-65 space-y-6">
      <h2 className="text-3xl font-extrabold text-black ">
        Assigned Exercises
      </h2>

      {exercises.length === 0 ? (
        <div className="rounded-xl border border-green-300/40 bg-green-900/10 p-6 text-sm text-green-200">
          🌱 No exercises assigned yet
        </div>
      ) : (
        exercises.map((ex) => (
          <div
            key={ex.id}
            className="relative rounded-xl border border-green-300/40
              bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-green-900/10
              p-6 transition hover:scale-[1.02]"
          >
            <button
              onClick={() => {
                if (ex.status === "APPROVE") return;
                setSelectedExercise(ex);
                setShowStatusModal(true);
              }}
              className={`absolute top-4 right-4 rounded-full border px-3 py-1
                text-xs font-semibold tracking-wide transition
                ${
                  ex.status === "APPROVE"
                    ? "cursor-not-allowed opacity-70"
                    : "hover:scale-105 cursor-pointer"
                }
                ${statusColor(ex.status)}`}
            >
              {ex.status}
            </button>

            <h3 className="text-xl font-semibold text-black flex items-center gap-2">
              {ex.title}
              {timeAgo(ex.createdAt) === "Today" && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                  NEW
                </span>
              )}
            </h3>

            <p className="mt-1 text-xs text-gray-300">
              📅 Posted: {timeAgo(ex.createdAt)}
            </p>

            <div className="mt-4 flex justify-between text-xs text-black">
              <span>⭐ Rate: {ex.rate}</span>
              <span>💰 Reward: {ex.reward}</span>
            </div>

            <button
              className="mt-4 text-sm underline text-black"
              onClick={() => router.push(`/detail/${ex.id}`)}
            >
              See Details →
            </button>
          </div>
        ))
      )}

      <AnimatePresence>
        {showStatusModal && selectedExercise && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#161c20] p-5 rounded-xl border border-white/10 w-[260px]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h3 className="text-sm font-bold mb-4 text-white text-center">
                Change Status
              </h3>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleStatusChange("PENDING")}
                  className="py-2 rounded bg-yellow-500/20
                    text-yellow-400 hover:bg-yellow-500/30"
                >
                  🟡 PENDING
                </button>

                <button
                  onClick={() => handleStatusChange("DONE")}
                  className="py-2 rounded bg-green-500/20
                    text-green-400 hover:bg-green-500/30"
                >
                  🟢 DONE
                </button>
              </div>

              <button
                className="mt-4 w-full text-xs text-white/50 hover:text-white"
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
