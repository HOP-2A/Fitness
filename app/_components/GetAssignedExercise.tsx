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
      <div className="py-16 text-center text-sm text-gray-400 animate-pulse">
        Fetching your exercises…
      </div>
    );
  }

  const statusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500/20 text-yellow-400";
      case "COMPLETED":
        return "bg-green-500/20 text-green-400";
      case "OVERDUE":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold text-white">Assigned Exercises</h2>

      {exercises.length === 0 ? (
        <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-sm text-white/50">
          No exercises assigned yet.
        </div>
      ) : (
        exercises.map((ex) => (
          <div
            key={ex.id}
            className="group relative overflow-hidden rounded-lg
                       bg-gray-900/40 p-4 transition hover:bg-gray-900/60"
          >
            <span
              className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(
                ex.status
              )}`}
            >
              {ex.status}
            </span>

            <h3 className="text-lg font-semibold text-white">{ex.title}</h3>
            <p className="mt-1 text-sm text-gray-300">{ex.description}</p>

            <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
              <span>Rate: {ex.rate}</span>
              <span>Reward: {ex.reward}</span>
            </div>

            <div className="mt-1 text-xs text-gray-500">
              Created: {new Date(ex.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GetAssignedExercise;
