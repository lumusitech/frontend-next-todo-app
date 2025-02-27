import prisma from '@/lib/prisma'
import { Todo } from '@prisma/client'
import { NextResponse } from 'next/server'
import { boolean, object, string } from 'yup'

interface Segments {
  params: {
    id: string
  }
}
const getTodo = async (id: string): Promise<Todo | null> => {
  return await prisma.todo.findUnique({ where: { id } })
}

export async function GET(request: Request, segments: Segments) {
  const params = await segments.params
  const todo = await getTodo(params.id)

  if (!todo) {
    return NextResponse.json({ message: `Todo with id ${params.id} is not exists`, status: 404 })
  }

  return NextResponse.json({ todo })
}

const putSchema = object({
  description: string().optional(),
  completed: boolean().optional().default(false),
})

export async function PUT(request: Request, segments: Segments) {
  const params = await segments.params
  const todo = await getTodo(params.id)

  if (!todo) {
    return NextResponse.json({ message: `Todo with id ${params.id} is not exists`, status: 404 })
  }

  try {
    const { description, completed } = await putSchema.validate(await request.json())

    const updatedTodo = await prisma.todo.update({
      where: { id: params.id },
      data: { description, completed },
    })

    return NextResponse.json(updatedTodo)
  } catch (error) {
    return NextResponse.json({ error, status: 400 })
  }
}
