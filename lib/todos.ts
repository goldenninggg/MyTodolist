export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos"
  );

  if (!response.ok) {
    throw new Error("Failed to load todos");
  }

  return response.json();
}

export async function getTodo(id: number): Promise<Todo> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to load todo");
  }

  return response.json();
}