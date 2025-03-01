import Image from 'next/image'
import Link from 'next/link'
import { JSX } from 'react'
import { CiLogout } from 'react-icons/ci'
import { LiaSitemapSolid } from 'react-icons/lia'
import { MdOutlineDashboard } from 'react-icons/md'
import { SidebarItem } from './SidebarItem'

interface Item {
  title: string
  icon: JSX.Element
  href: string
}

const items: Item[] = [
  {
    title: 'Dashboard',
    icon: <MdOutlineDashboard />,
    href: '/dashboard',
  },
  {
    title: 'Categories',
    icon: <LiaSitemapSolid />,
    href: '/',
  },
]

export const Sidebar = () => {
  return (
    <aside className='ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]'>
      <div>
        <div className='-mx-6 px-6 py-4 flex items-center justify-around'>
          <Link href='/dashboard' title='home'>
            <Image
              src='https://cdn-icons-png.flaticon.com/512/2098/2098402.png'
              width={100}
              height={100}
              className='w-16 h-16'
              alt='logo'
            />
          </Link>
          <span className='text-4xl font-bold text-cyan-600'>Todos App</span>
        </div>

        <div className='mt-8 text-center'>
          <Image
            src='https://i.pravatar.cc/150'
            width={200}
            height={200}
            alt=''
            className='w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28'
          />
          <h5 className='hidden mt-4 text-xl font-semibold text-gray-600 lg:block'>Fake User</h5>
          <span className='hidden text-gray-400 lg:block'>Admin</span>
        </div>

        <ul className='space-y-2 tracking-wide mt-8'>
          {items.map(({ href, icon, title }) => (
            <SidebarItem key={title} href={href} title={title} icon={icon} />
          ))}
        </ul>
      </div>

      <div className='px-6 -mx-6 pt-4 flex justify-between items-center border-t'>
        <button className='px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group'>
          <CiLogout />
          <span className='group-hover:text-gray-700'>Logout</span>
        </button>
      </div>
    </aside>
  )
}
