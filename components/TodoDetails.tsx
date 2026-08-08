"use client";

import { useQuery } from "@tanstack/react-query";

import createTodoQueryOptions from "@/query-options/createTodoQueryOptions";

export default function TodoDetails({ id }: { id: number }) {
  const { data, isPending, isError, error } = useQuery(
    createTodoQueryOptions(id),
  );

  return (
    <section className="rounded-xl border p-5">
      <h2 className="mb-3 font-semibold">Todo details</h2>
      {isPending && <p>Loading...</p>}
      {isError && <p className="text-destructive">{error.message}</p>}
      {data && (
        <pre className="overflow-x-auto whitespace-pre-wrap text-xs">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </section>
  );
}
