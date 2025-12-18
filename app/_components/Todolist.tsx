"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

type Todo = {
  id: string;
  task: string;
  teacherId: string;
};

type TodoListProps = {
  teacherId: string;
};

const Todolist = ({ teacherId }: TodoListProps) => {
  const { user: clerkUser } = useUser();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    if (clerkUser) {
      const getTodos = async () => {
        const res = await fetch(`/api/todo?teacherId=${clerkUser.id}`);
        const data: Todo[] = await res.json();
        setTodos(data);
      };
      getTodos();
    }
  }, [clerkUser]);

  const addTodo = async () => {
    if (!task || !teacherId) return;

    const res = await fetch("/api/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, teacherId }),
    });

    if (!res.ok) return;

    const newTodo = await res.json();
    setTodos((prev) => [newTodo, ...prev]);
    setTask("");
  };

  const deleteTodo = async (id: string) => {
    await fetch("/api/todo", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto bg-[#1E2429] rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-[#A3FFAB] mb-4 flex items-center gap-2">
        📋 Todo List
      </h2>

      <div className="flex gap-2 mb-5">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Write a new task..."
          className="flex-1 rounded-lg bg-[#2C333A] border border-[#3B434D] px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A3FFAB] transition"
        />
        <button
          onClick={addTodo}
          className="bg-[#A3FFAB] text-[#1E2429] px-5 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition transform hover:scale-105"
        >
          Add
        </button>
      </div>

      {todos.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-6">
          No todos yet — add one 👆
        </p>
      ) : (
        <ul className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-[#A3FFAB]/50 scrollbar-track-[#2C333A]">
          {todos.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between bg-[#2C333A] border border-[#3B434D] rounded-lg px-4 py-2 hover:bg-[#37404B] hover:shadow-sm transition"
            >
              <span className="text-white text-sm">{t.task}</span>
              <button
                onClick={() => deleteTodo(t.id)}
                className="text-[#FF6B6B] hover:text-[#FF4C4C] text-xs font-medium transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todolist;
