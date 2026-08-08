"use client";

import { useQueries } from "@tanstack/react-query";

import createTodoQueryOptions from "@/query-options/createTodoQueryOptions";

export default function ParallelTodos({ ids }: { ids: number[] }) {
  const queries = useQueries({
    queries: ids.map((id) => createTodoQueryOptions(id)),
  });

  return (
    <section className="rounded-xl border p-5">
      <h2 className="mb-3 font-semibold">useQueries</h2>
      <ul className="space-y-2 text-sm">
        {queries.map((query, index) => (
          <li key={ids[index]}>
            {query.isPending
              ? `Loading todo ${ids[index]}...`
              : query.data?.title ?? `Todo ${ids[index]} was not found`}
          </li>
        ))}
      </ul>
    </section>
  );
}
