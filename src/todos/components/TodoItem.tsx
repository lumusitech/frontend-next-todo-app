'use client'

import { Todo } from '@prisma/client'
import { startTransition, useOptimistic } from 'react'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5'
import styles from './TodoItem.module.css'

interface Props {
  todo: Todo
  toggleTodo: (id: string, completed: boolean) => Promise<Todo | void>
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  // new feature of useOptimistic
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({ ...state, completed: newCompleteValue }),
  )

  const onToggleTodo = async () => {
    try {
      // first, update the optimistic state
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.completed))

      // then, update the real state
      await toggleTodo(todoOptimistic.id, !todoOptimistic.completed)
    } catch (error) {
      // if there is an error, revert the optimistic state
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.completed))
      // TODO: show a toast message to the user with the error

      console.log(error)
    }
  }

  return (
    <div className={todoOptimistic.completed ? styles.todoDone : styles.todoPending}>
      <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>
        <div
          onClick={onToggleTodo}
          className={`
          flex p-2 rounded-md cursor-pointer
          hover:bg-opacity-60
          ${todoOptimistic.completed ? 'bg-blue-100' : 'bg-red-100'}
          `}
        >
          {todoOptimistic.completed ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>

        <div className='text-center sm:text-left'>{todoOptimistic.description}</div>
      </div>
    </div>
  )
}
