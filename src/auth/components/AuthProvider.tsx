'use client'

import { SessionProvider } from 'next-auth/react'

interface Props {
  children: React.ReactNode
}

export default function AuthPage({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>
}
