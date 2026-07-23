"use client"

import { useForm } from "react-hook-form"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type TodoFormValues = {
  title: string
  description: string
}

type AddTodoProps = {
  onAdd?: (todo: { title: string; description?: string }) => void
}

export function AddTodo({ onAdd }: AddTodoProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormValues>({
    defaultValues: { title: "", description: "" },
  })

  function onSubmit({ title, description }: TodoFormValues) {
    const trimmedDescription = description.trim()

    onAdd?.({
      title: title.trim(),
      ...(trimmedDescription ? { description: trimmedDescription } : {}),
    })
    reset()
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2">
        <Input
          aria-invalid={Boolean(errors.title)}
          aria-label="New to-do title"
          placeholder="Add a to-do..."
          {...register("title", { required: "A title is required." })}
        />
        <Button type="submit">
          <Plus aria-hidden="true" />
          Add
        </Button>
      </div>
      {errors.title && (
        <p className="text-sm text-destructive" role="alert">
          {errors.title.message}
        </p>
      )}
      <Textarea
        aria-label="To-do description"
        placeholder="Add details (optional)..."
        {...register("description")}
      />
    </form>
  )
}
