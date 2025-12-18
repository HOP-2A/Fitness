"use client";

import { useAuth } from "@/providers/authProvider";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

type Exercise = {
  id: string;
  title: string;
  description: string;
  status: string;
  rate: number;
  reward: number;
  createdAt: string;
};

const GetAssignedExercise = () => {
  const { user: clerkUser, isLoaded } = useUser();
  const userData = useAuth(clerkUser?.id);
  const user = userData.user;
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchExercises = async () => {
      const res = await fetch(`/api/getExercise/${user.id}`);
      const data = await res.json();
      setExercises(data);
    };

    fetchExercises();
  }, [isLoaded, user]);

  if (!isLoaded) {
    return (
      <div className="py-16 text-center text-sm text-green-300 animate-pulse">
        Loading your exercises…
      </div>
    );
  }

  const statusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-200/30 text-yellow-600 border-yellow-300/50";
      case "COMPLETED":
        return "bg-green-200/30 text-green-700 border-green-400/50";
      case "OVERDUE":
        return "bg-red-200/30 text-red-600 border-red-400/50";
      default:
        return "bg-gray-200/30 text-gray-500 border-gray-400/50";
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-3xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-6">
        Assigned Exercises
      </h2>

      {exercises.length === 0 ? (
        <div className="rounded-xl border border-green-300/40 bg-green-900/10 p-6 text-sm text-green-200 shadow-md shadow-green-400/10">
          🌱 No exercises assigned yet.
        </div>
      ) : (
        exercises.map((ex) => (
          <div
            key={ex.id}
            className="group relative overflow-hidden rounded-xl border border-green-300/40
                       bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-green-900/10
                       p-6 transition-all duration-300
                       hover:scale-[1.03] hover:border-black hover:shadow-lg hover:shadow-green-500/20"
          >
            <span
              className={`absolute top-4 right-4 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${statusColor(
                ex.status
              )}`}
            >
              {ex.status}
            </span>

            <h3 className="text-xl font-semibold text-black">{ex.title}</h3>

            <p className="mt-2 text-sm text-black">{ex.description}</p>

            <div className="mt-4 flex items-center justify-between text-xs text-black">
              <span className="flex items-center gap-1">
                ⭐ Rate: <strong>{ex.rate}</strong>
              </span>
              <span className="flex items-center gap-1">
                💰 Reward: <strong>{ex.reward}</strong>
              </span>
            </div>

            <div className="mt-2 text-xs text-black">
              Created on {new Date(ex.createdAt).toLocaleDateString()}
            </div>

            <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-emerald-400/10 to-s-500/10" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GetAssignedExercise;
