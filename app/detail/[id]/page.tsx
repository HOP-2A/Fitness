// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// type Detail = {
//   id: number;
//   teacherId: string;
//   teacher: string;
//   title: string;
//   description: string;
//   target: string;
//   rate: number;
//   status: string;
//   reward: number;
//   createdAt: string;
//   updatedAt: string;
// };
// export default function DetailPage() {
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");

//   const [exercise, setExercise] = useState<Detail | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadExercise = async () => {
//       const res = await fetch(`/api/assignedExercise?id=${id}`);
//       const data = await res.json();
//       setExercise(data.Detail);
//       setLoading(false);
//     };

//     loadExercise();
//   }, [id]);

//   if (loading) return <div>Loading...</div>;
//   if (!exercise) return <div>No data found</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold">{exercise.title}</h1>
//       <p>{exercise.description}</p>
//       <p>Target: {exercise.target}</p>
//       <p>Status: {exercise.status}</p>
//     </div>
//   );
// }
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

  if (loading) return <div>Loading...</div>;
  if (!exercise) return <div>No data found</div>;
  console.log(exercise.id);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{exercise.title}</h1>
      <p>{exercise.description}</p>
    </div>
  );
}
