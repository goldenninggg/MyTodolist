import { queryOptions } from "@tanstack/react-query";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function getPost(id: number): Promise<Post> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (!response.ok) throw new Error("Failed to load post");

  return response.json();
}

export default function createPostQueryOptions(id: number) {
  return queryOptions({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });
}
