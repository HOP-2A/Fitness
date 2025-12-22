"use client";

import { useParams } from "next/navigation";
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
  const params = useParams();
  const id = params.id as string;
  console.log(id);
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

  if (loading) return <div>Loading...</div>;
  if (!exercise) return <div>No data found</div>;
  console.log(exercise.id);

  return (
    <div className="p-6 space-y-3 rounded-lg border">
      <h1 className="text-2xl font-bold">{exercise.title}</h1>

      {exercise.description && (
        <p className="text-gray-600">{exercise.description}</p>
      )}

      <div className="text-sm text-gray-500 space-y-1">
        {exercise.target && (
          <p>
            <span className="font-medium">Target:</span> {exercise.target}
          </p>
        )}

        <p>
          <span className="font-medium">Rate:</span> {exercise.rate}
        </p>

        <p>
          <span className="font-medium">Status:</span> {exercise.status}
        </p>

        <p>
          <span className="font-medium">Reward:</span> {exercise.reward} 🪙
        </p>

        <p>
          <span className="font-medium">Created at:</span>{" "}
          {new Date(exercise.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
