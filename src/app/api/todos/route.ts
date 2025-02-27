import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams

  const take = query.get('take') ?? '10'
  const offset = query.get('offset') ?? '0'

  console.log({ take, offset })

  const todos = await prisma.todo.findMany({
    take: parseInt(take),
    skip: parseInt(offset),
  })

  return NextResponse.json({ todos })
}
