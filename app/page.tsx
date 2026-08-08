"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import ParallelTodos from "@/components/ParallelTodos";
import SuspenseTodo from "@/components/SuspenseTodo";
import TodoDetails from "@/components/TodoDetails";
import { getTodos } from "@/lib/todos";

export default function Home() {
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState("all");
  const [selectedTodoId, setSelectedTodoId] = useState(1);
  const { data, isPending, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  if (isPending) {
    return <main className="grid min-h-screen place-items-center">Loading todos...</main>;
  }

  if (isError) {
    return (
      <main className="grid min-h-screen place-items-center text-destructive">
        Error: {error.message}
      </main>
    );
  }

  const filteredTodos = data
    .filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase()))
    .filter((todo) => userId === "all" || todo.userId === Number(userId));

  return (
    <main className="min-h-screen p-6 sm:p-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-xl border p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">TanStack Query todo app</p>
              <h1 className="text-3xl font-bold">Your todos</h1>
            </div>
            <button className="rounded-lg border px-4 py-2" onClick={() => refetch()}>
              {isFetching ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 font-semibold">
              Search todos
              <input
                className="w-full rounded-lg border bg-transparent p-3 font-normal"
                placeholder="e.g. delectus"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <label className="grid gap-2 font-semibold">
              Filter by user
              <select
                className="w-full rounded-lg border bg-transparent p-3 font-normal"
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
              >
                <option value="all">All users</option>
                {Array.from({ length: 10 }, (_, index) => index + 1).map((id) => (
                  <option key={id} value={id}>
                    User {id}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="space-y-3">
            {filteredTodos.slice(0, 20).map((todo) => (
              <button
                key={todo.id}
                onClick={() => setSelectedTodoId(todo.id)}
                className="flex w-full items-center justify-between rounded-lg border p-4 text-left hover:bg-muted"
              >
                <span className="flex items-center gap-4">
                  <span aria-label={todo.completed ? "Completed" : "Incomplete"}>
                    {todo.completed ? "✓" : "○"}
                  </span>
                  <span className="capitalize">{todo.title}</span>
                </span>
                <span>#{todo.id}</span>
              </button>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <TodoDetails id={selectedTodoId} />
          <SuspenseTodo id={1} />
          <ParallelTodos ids={[1, 2, 3]} />
        </aside>
      </div>
    </main>
  );
}
