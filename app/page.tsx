import { Button } from "@/components/ui/button"
import { AddTodo } from "@/components/AddTodo"
import { SearchInput } from "@/components/SearchInput"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <form role="search">
        <SearchInput />
      </form>

      <AddTodo />

      <Button>Default</Button>
    </main>
  )
}
