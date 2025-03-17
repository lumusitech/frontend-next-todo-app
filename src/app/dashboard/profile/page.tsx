'use client'

import { useSession } from 'next-auth/react'

export default function ProfilePage() {
  const { data } = useSession()

  const name = data?.user?.name ?? 'No Name'
  const email = data?.user?.email ?? 'No email'
  const image = data?.user?.image ?? 'No avatar'

  return (
    <div className='flex flex-col gap-2'>
      <h1 className='text-5xl'>Profile Page</h1>
      <span>Name: {name}</span>
      <span>Email: {email}</span>
      <span>Image: {image}</span>
    </div>
  )
}
