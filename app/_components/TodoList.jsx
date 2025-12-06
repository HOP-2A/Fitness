"use client";

import { useEffect, useState } from "react";

const TodoList = ({ teacherId }) => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    if (!teacherId) return;

    const getTodos = async () => {
      const res = await fetch(`/api/todo?teacherId=${teacherId}`);
      const data = await res.json();
      setTodos(data);
    };

    getTodos();
  }, [teacherId]);

  const addTodo = async () => {
    if (!task) return;

    const res = await fetch("/api/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, teacherId }),
    });

    const newTodo = await res.json();
    setTodos((prev) => [newTodo, ...prev]);
    setTask("");
  };

  const deleteTodo = async (id) => {
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
        {todos.map((t) => (
          <li key={t.id} className="flex justify-between border-b pb-1">
            {t.task}
            <button
              onClick={() => deleteTodo(t.id)}
              className="text-red-500 text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
