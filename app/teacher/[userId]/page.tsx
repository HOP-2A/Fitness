"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

type Exercise = {
  id: string;
  title: string;
  description: string;
  target: string;
  rate: number;
  status: "PENDING" | "DONE";
  createdAt: string;
};

export default function ExercisePage() {
  const { isLoaded } = useUser();
  const params = useParams();
  const userId = params.userId as string;

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded || !userId) return;

    const fetchExercises = async () => {
      try {
        const res = await fetch(`/api/getExercise/${userId}`);

        if (!res.ok) {
          throw new Error("Failed to fetch exercises");
        }

        const data = await res.json();
        setExercises(data);
      } catch (err) {
        setError("Could not load exercises");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [isLoaded, userId]);

  const deleteTask = async (id: string) => {
    await fetch("/api/deleteTask", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setExercises((prev) => prev.filter((d) => d.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0b0b] text-white">
        Loading exercises...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0b0b] text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#192126] p-8 text-white">
      <div className="mb-8 flex items-center justify-between rounded-xl bg-[#161c20] border border-white/10 p-5">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 
                 text-white/80 hover:text-white hover:bg-white/10 transition hover:cursor-pointer"
          >
            ← Back
          </button>

          <div>
            <h1 className="text-xl font-semibold">👤 Student</h1>
            <p className="text-sm text-white/60">User ID: {userId}</p>
          </div>
        </div>

        <div className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 text-sm">
          Exercises: {exercises.length}
        </div>
      </div>

      {exercises.length === 0 ? (
        <div className="text-white/50 text-sm">No exercises assigned yet</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {exercises.map((ex) => (
            <div
              key={ex.id}
              className="rounded-xl bg-[#161c20] border border-white/10 p-5 shadow-lg hover:shadow-green-500/10 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{ex.title}</h3>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    ex.status === "PENDING"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {ex.status}
                </span>
              </div>
              <p className="text-sm text-white/70 mb-3">{ex.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">🎯 {ex.target}</span>

                <span className="text-green-400 font-medium">
                  +{ex.rate} pts
                </span>
              </div>
              <div className="mt-3 text-xs text-white/40">
                {new Date(ex.createdAt).toLocaleDateString()}
              </div>
              <button className="bg-red-700" onClick={() => deleteTask(ex.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
