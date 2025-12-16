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
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 Todo List</h2>

      <div className="flex gap-2 mb-5">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Write a new task..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={addTodo}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md shadow-green-300/50 transition transform hover:scale-105"
          style={{ boxShadow: "0 0 20px rgba(34,197,94,0.6)" }}
        >
          Add
        </button>
      </div>

      {todos.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-6">
          No todos yet — add one 👆
        </p>
      ) : (
        <ul className="space-y-3">
          {todos.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 hover:shadow-sm transition"
            >
              <span className="text-gray-700 text-sm">{t.task}</span>
              <button
                onClick={() => deleteTodo(t.id)}
                className="text-red-500 hover:text-red-700 text-xs font-medium transition"
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
