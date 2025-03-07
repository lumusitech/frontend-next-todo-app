'use client'

import { Todo } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { toggleTodo } from '../actions/todo-action'
import { TodoItem } from './TodoItem'

interface Props {
  todos?: Todo[]
}

export const TodosGrid = ({ todos = [] }: Props) => {
  const router = useRouter()

  //? withouth the server actions, we need to use the api to update the todo
  // const toggleTodo = async (id: string, completed: boolean) => {
  //   await api.updateTodo(id, completed)

  //   router.refresh()
  // }

  return (
    <div className='grid grid-cols-1 gap-2 sm:grid-cols-3 '>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  )
}
