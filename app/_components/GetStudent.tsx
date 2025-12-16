"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  username: string;
  email: string;
  createdAt: string;
};

export const GetStudent = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/student");
      const data = await res.json();
      setUsers(data.User);
    };
    getUser();
  }, []);
  return (
    <div className="w-80 border-2 border-green-400 rounded-xl shadow-lg p-4 bg-white">
      <h2 className="text-xl font-bold text-green-600 mb-3">🌱 Students</h2>

      <ul className="space-y-2 max-h-60 overflow-y-auto">
        {users.map((user) => (
          <li
            key={user.id}
            className="p-2 rounded-md border border-green-300 text-green-800 hover:bg-green-100 transition"
          >
            <p className="font-semibold">{user.username}</p>
            <p className="text-sm">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
