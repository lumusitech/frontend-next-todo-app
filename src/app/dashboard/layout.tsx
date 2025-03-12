// Admin Dashboard https://tailwindcomponents.com/component/dashboard-12
import { Sidebar } from '@/components/Sidebar'
import { TopMenu } from '@/components/TopMenu'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />

      <div className='ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen bg-slate-100'>
        <TopMenu />
        <div className='px-6 pt-6 bg-white p-2 m-2 rounded pb-5'>{children}</div>
      </div>
    </>
  )
}
