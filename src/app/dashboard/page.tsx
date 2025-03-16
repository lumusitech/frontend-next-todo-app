import { WidgetItem } from '@/components'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'

export const metadata = {
  title: 'Dashboard Page',
  description: 'Dashboard Page',
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <>
      <div className='grid gap-6 grid-cols-1 sm:grid-cols-2'>
        {/* TODO: Posibly replace with widgetsGrid component */}
        <WidgetItem title='User Connected - Server Side'>
          <div className='flex flex-col'>
            <span>{session.user?.name}</span>
            <span>{session.user?.image}</span>
            <span>{session.user?.email}</span>
          </div>
        </WidgetItem>
      </div>
    </>
  )
}
