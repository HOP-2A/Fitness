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
    <div>
      <div className="flex gap-2 mb-3">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Write task..."
          className="border p-2 rounded-md flex-1"
        />
        <button
          onClick={addTodo}
          className="bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No todo defined, add one please
          </p>
        ) : (
          todos.map((t) => (
            <li key={t.id} className="flex justify-between border-b pb-1">
              {t.task}
              <button
                onClick={() => deleteTodo(t.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Todolist;
