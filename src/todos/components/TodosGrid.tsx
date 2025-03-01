'use client'

import * as api from '@/todos/helpers/todos'
import { Todo } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { TodoItem } from './TodoItem'

interface Props {
  todos?: Todo[]
}

export const TodosGrid = ({ todos = [] }: Props) => {
  const router = useRouter()

  const toggleTodo = async (id: string, completed: boolean) => {
    await api.updateTodo(id, completed)

    router.refresh()
  }

  return (
    <div className='grid grid-cols-1 gap-2 sm:grid-cols-3 '>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  )
}
