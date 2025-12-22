"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
type Detail = {
  id: number;
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
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [exercise, setExercise] = useState<Detail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadExercise = async () => {
      const res = await fetch(`/api/assignedExercise?id=${id}`);
      const data = await res.json();
      setExercise(data.Detail);
      setLoading(false);
    };

    loadExercise();
  }, [id]);

  if (loading) return <div className="p-6 text-gray-500">Loading...</div>;
  if (!exercise) return <div className="p-6 text-gray-500">No data found</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-2">{exercise.title}</h1>
      <p className="text-gray-700 mb-2">{exercise.description}</p>
      <p className="text-gray-500 mb-2">Target: {exercise.target}</p>
      <p className="text-gray-500 mb-2">Rate: {exercise.rate}</p>
      <p className="text-gray-500 mb-2">Reward: {exercise.reward}</p>
      <p className="text-gray-400 text-sm">
        Status: {exercise.status} | Created at:{" "}
        {new Date(exercise.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
