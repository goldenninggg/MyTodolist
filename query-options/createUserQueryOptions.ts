import { queryOptions } from "@tanstack/react-query";

export type User = {
  id: number;
  name: string;
};

async function getUsers(): Promise<User[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) throw new Error("Failed to load users");

  return response.json();
}

export default function createUserQueryOptions() {
  return queryOptions({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}
