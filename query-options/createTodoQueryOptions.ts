import { queryOptions } from "@tanstack/react-query";
import { getTodo } from "@/lib/todos";

export default function createTodoQueryOptions(id: number) {
  return queryOptions({
    queryKey: ["todo", id],
    queryFn: () => getTodo(id),
  });
}