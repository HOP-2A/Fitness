"use client";

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
  console.log(teacherId, "ggg");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>("");

  useEffect(() => {
    const getTodos = async () => {
      const res = await fetch(`/api/todo?clerkId=${teacherId}`);
      const data: Todo[] = await res.json();
      setTodos(data);
    };
    if (!teacherId) return;
    getTodos();
  }, [teacherId]);

  const addTodo = async () => {
    if (!task) return;

    const res = await fetch("/api/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, teacherId }),
    });

    const newTodo: Todo = await res.json();
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
  console.log(todos);
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

export default Todolist;
