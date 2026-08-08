"use client";

import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import createTodoQueryOptions from "@/query-options/createTodoQueryOptions";

export default function SuspenseTodo({ id }: { id: number }) {
  return (
    <Suspense fallback={<section className="rounded-xl border p-5">Loading suspense query...</section>}>
      <TodoComments id={id} />
    </Suspense>
  );
}

function TodoComments({ id }: { id: number }) {
  const { data } = useSuspenseQuery(createTodoQueryOptions(id));

  return (
    <section className="rounded-xl border p-5">
      <h2 className="mb-3 font-semibold">useSuspenseQuery</h2>
      <pre className="overflow-x-auto whitespace-pre-wrap text-xs">
        {JSON.stringify(data, null, 2)}
      </pre>
    </section>
  );
}
