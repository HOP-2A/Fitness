"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";

type Exercise = {
  id: string;
  title: string;
  description: string;
  target: string;
  rate: number;
  status: "PENDING" | "DONE";
  createdAt: string;
  reward: number;
};

type Student = {
  id: string;
  username: string;
  email?: string;
  coin: number;
};

export default function ExercisePage() {
  const { isLoaded } = useUser();
  const params = useParams();
  const router = useRouter();

  const userId = params.userId as string;

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [student, setStudent] = useState<Student | null>(null);

  const [loadingExercises, setLoadingExercises] = useState(true);
  const [loadingStudent, setLoadingStudent] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);

  const fetchExercises = async () => {
    try {
      const res = await fetch(`/api/getExercise/${userId}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setExercises(data);
    } catch {
      setError("Could not load exercises");
    } finally {
      setLoadingExercises(false);
    }
  };

  const fetchStudent = async () => {
    try {
      const res = await fetch(`/api/studentData/${userId}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setStudent(data.user);
    } catch {
      setError("Could not load student");
    } finally {
      setLoadingStudent(false);
    }
  };

  useEffect(() => {
    if (!isLoaded || !userId) return;
    fetchExercises();
    fetchStudent();
  }, [isLoaded, userId]);

  const deleteTask = async (id: string) => {
    await fetch("/api/deleteTask", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setExercises((prev) => prev.filter((e) => e.id !== id));
  };

  const saveEdit = async () => {
    if (!editingExercise) return;

    await fetch("/api/editExercise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingExercise),
    });

    setEditingExercise(null);
    fetchExercises();
  };

  if (loadingExercises || loadingStudent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0b0b] text-white">
        Loading...
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
              text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            ← Back
          </button>

          <div>
            <h1 className="text-xl font-semibold">👤 {student?.username}</h1>
            <p className="text-sm text-white/60">
              User Email: {student?.email}
            </p>
            <p className="text-sm text-white/60">User coin: {student?.coin}</p>
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
              className="rounded-xl bg-[#161c20] border border-white/10 p-5"
            >
              <div className="flex justify-between mb-2">
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

              <div className="flex justify-between text-sm">
                <span className="text-white/60">🎯 {ex.target}</span>
                <span className="text-green-400">+{ex.rate} pts</span>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => deleteTask(ex.id)}
                  className="text-xs px-3 py-1 rounded bg-red-600/80 hover:bg-red-600"
                >
                  Delete
                </button>

                <button
                  onClick={() => setEditingExercise(ex)}
                  className="text-xs px-3 py-1 rounded bg-blue-600/80 hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-md rounded-xl bg-[#161c20] p-6 border border-white/10">
            <h2 className="text-lg font-semibold mb-4">Edit Exercise</h2>

            <div className="space-y-3">
              <input
                className="w-full rounded bg-black/30 border border-white/10 px-3 py-2 text-sm"
                placeholder="Title"
                value={editingExercise.title}
                onChange={(e) =>
                  setEditingExercise({
                    ...editingExercise,
                    title: e.target.value,
                  })
                }
              />

              <textarea
                className="w-full rounded bg-black/30 border border-white/10 px-3 py-2 text-sm"
                placeholder="Description"
                value={editingExercise.description}
                onChange={(e) =>
                  setEditingExercise({
                    ...editingExercise,
                    description: e.target.value,
                  })
                }
              />

              <input
                className="w-full rounded bg-black/30 border border-white/10 px-3 py-2 text-sm"
                placeholder="Target"
                value={editingExercise.target}
                onChange={(e) =>
                  setEditingExercise({
                    ...editingExercise,
                    target: e.target.value,
                  })
                }
              />

              <input
                type="number"
                className="w-full rounded bg-black/30 border border-white/10 px-3 py-2 text-sm"
                placeholder="Rate"
                value={editingExercise.rate}
                onChange={(e) =>
                  setEditingExercise({
                    ...editingExercise,
                    rate: Number(e.target.value) || 0,
                  })
                }
              />

              <input
                type="number"
                placeholder="Reward"
                className="w-full rounded bg-black/30 border border-white/10 px-3 py-2 text-sm"
                value={editingExercise.reward}
                onChange={(e) =>
                  setEditingExercise({
                    ...editingExercise,
                    reward: Number(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setEditingExercise(null)}
                className="px-4 py-2 text-sm rounded bg-white/10 hover:bg-white/20"
              >
                Cancel
              </button>

              <button
                onClick={saveEdit}
                className="px-4 py-2 text-sm rounded bg-blue-600 hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
