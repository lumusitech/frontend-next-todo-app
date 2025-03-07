'use server'

import prisma from '@/lib/prisma'
import { Todo } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export const sleep = async (ms: number): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), ms)
  })
}
export const toggleTodo = async (id: string, completed: boolean): Promise<Todo> => {
  await sleep(3000)

  const todo = await prisma.todo.findFirst({
    where: {
      id,
    },
  })

  if (!todo) throw `Todo with id ${id} not found`

  revalidatePath('/dashboard/server-todos')

  return await prisma.todo.update({
    where: {
      id,
    },
    data: {
      completed,
    },
  })
}

export const addTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({
      data: { description },
    })

    revalidatePath('/dashboard/server-todos')
    return todo
  } catch (error) {
    return {
      message: `Error creating todo - ${error}`,
    }
  }
}

export const deleteCompleted = async (): Promise<void> => {
  await prisma.todo.deleteMany({
    where: {
      completed: true,
    },
  })

  revalidatePath('/dashboard/server-todos')
}
