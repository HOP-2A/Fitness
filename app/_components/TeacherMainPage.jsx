"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TodoList from "./TodoList";
import { useUser } from "@clerk/nextjs";

const Page = () => {
  const [teacher, setTeacher] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) return;

    const getTeacher = async () => {
      const res = await fetch(`/api/teacher/${user.id}`);

      if (!res.ok) return;

      const data = await res.json();
      setTeacher(data.teacher);
    };

    getTeacher();
  }, [user?.id]);
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">
            Welcome back,{teacher?.adminName}
          </h1>
          <p className="text-sm text-gray-600">
            Teacher dashboard • Fitness Track
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg border">Quick actions</button>
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            {teacher?.adminName?.[0] || "ZL"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-8 bg-white rounded-xl shadow-sm p-4 mb-4">
          <h3 className="font-semibold mb-3">Upcoming sessions</h3>
        </div>

        <div className="col-span-4 space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">Students</h4>
              <Link href={"/teacher/exercise"}>
                <button className="text-sm px-4 py-2 rounded-lg border">
                  Give exercises
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <h4 className="font-semibold mb-2">Todo List</h4>

            {teacher?.id ? (
              <TodoList teacherId={teacher.id} />
            ) : (
              <p className="text-sm text-gray-500">Loading todo...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
