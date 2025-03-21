// only can be used in pages, layouts, and router handlers, not in components
export const dynamic = 'force-dynamic' // force revalidation every request
export const revalidate = 0 // revalidate every 0 seconds, it's meaning no cache

import prisma from '@/lib/prisma'
import { NewTodo, TodosGrid } from '@/todos'

export const metadata = {
  title: 'REST Todos Page',
  description: 'REST Todos Page',
}

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } })

  return (
    <div>
      <div className='w-full px-3 mx-5 mb-5'>
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  )
}
