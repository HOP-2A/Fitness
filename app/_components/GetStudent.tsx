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
    <div className="w-80 border border-[#3B434D] rounded-xl shadow-lg p-4 bg-[#192126]">
      <h2 className="text-xl font-bold text-[#A3FFAB] mb-3 flex items-center gap-2">
        🌱 Students
      </h2>

      <ul className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-[#A3FFAB]/50 scrollbar-track-[#2C333A]">
        {users.map((user) => (
          <li
            key={user.id}
            className="p-3 rounded-lg border border-[#3B434D] bg-[#192126] text-white hover:bg-[#37404B] transition-colors shadow-sm hover:cursor-pointer"
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
