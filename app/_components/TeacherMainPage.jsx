"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TodoList from "./TodoList";
// import { useUser } from "@clerk/nextjs";

const Page = () => {
  const [setTeachers] = useState([]);
  // const { user } = useUser();
  // console.log(user);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/teacher");
      const data = await res.json();
      setTeachers(data.teachers);
    })();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">
            Welcome back,
            {/* {user.lastName} */}
          </h1>
          <p className="text-sm text-gray-600">
            Teacher dashboard • Fitness Track
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg border">Quick actions</button>
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            ZL
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h3 className="font-semibold mb-3">Upcoming sessions</h3>
          <ul className="space-y-3">
            {/* {upcoming.map((u) => (
              <li key={u.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{u.title}</div>
                  <div className="text-sm text-gray-500">
                    {u.time} • {u.students} students
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-md border">View</button>
                  <button className="px-3 py-1 rounded-md bg-blue-600 text-white">
                    Start
                  </button>
                </div>
              </li>
            ))} */}
          </ul>
        </div>
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
            <button className="text-sm">See all</button>
          </div>
          <div className="space-y-3">
            {/* {students.map((st) => (
              <div key={st.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{st.name}</div>
                  <div className="text-xs text-gray-500">
                    Last workout: {st.lastWorkout}
                  </div>
                </div>
                <div className="text-sm text-gray-700">{st.progress}</div>
              </div>
            ))} */}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <h4 className="font-semibold mb-2">Todo List</h4>
          <TodoList />
        </div>
      </div>
    </div>
  );
};
export default Page;
