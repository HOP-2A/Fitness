"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  id: number;
  username: string;
  email: string;
  createdAt: string;
};

export const GetStudent = () => {
  const [users, setUsers] = useState<User[]>([]);

  const { push } = useRouter();
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/student");
      const data = await res.json();
      setUsers(data.User);
    };
    getUser();
  }, []);

  return (
    <div className="w-full border border-[#3B434D] rounded-xl shadow-lg p-4 bg-[#1F262C] hover:shadow-[#A3FFAB]/30 transition-all duration-300">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold text-[#A3FFAB] mb-3 flex items-center gap-2">
          🌱 Students
        </h2>
        <div className="border border-[#3B434D] rounded h-[24px] w-[24px] flex justify-center items-center text-">
          {users.length}
        </div>
      </div>

      <ul className="space-y-2  overflow-y-auto">
        {users.map((user) => (
          <li
            key={user.id}
            className="p-3 rounded-lg border border-[#3B434D] bg-[#0E1113] text-white hover:bg-[#37404B] transition-colors shadow-sm hover:cursor-pointer"
            onClick={() => push(`/teacher/${user.id}`)}
          >
            <p className="font-semibold">{user.username}</p>
            <p className="text-sm text-gray-300">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
