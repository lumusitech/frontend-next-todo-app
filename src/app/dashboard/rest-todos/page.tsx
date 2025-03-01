import prisma from '@/lib/prisma'
import { TodosGrid } from '@/todos'

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } })

  return (
    <div>
      <h1>Rest Todos</h1>
      <TodosGrid todos={todos} />
    </div>
  )
}
