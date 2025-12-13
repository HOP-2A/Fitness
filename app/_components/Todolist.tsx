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
  const [task, setTask] = useState<string>("");

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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task, teacherId }),
    });

    if (!res.ok) {
      console.error("GG");
      return;
    }

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
    <div className="max-w-md mx-auto mt-10 p-6 bg-green-50 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">
        My Todos
      </h1>

      <div className="flex gap-2 mb-4">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Write a task..."
          className="border border-green-300 focus:border-green-500 focus:ring focus:ring-green-200 p-2 rounded-md flex-1 outline-none transition"
        />
        <button
          onClick={addTodo}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition"
        >
          Add
        </button>
      </div>

      <ul className="space-y-3">
        {todos.map((t) => (
          <li
            key={t.id}
            className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-green-100"
          >
            <span className="text-gray-800">{t.task}</span>
            <button
              onClick={() => deleteTodo(t.id)}
              className="text-red-500 hover:text-red-700 text-sm font-semibold"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todolist;
