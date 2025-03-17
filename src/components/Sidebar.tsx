import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CiLogout } from 'react-icons/ci'
import {
  IoAtCircleOutline,
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoListOutline,
  IoPersonOutline,
} from 'react-icons/io5'
import { SidebarItem } from './SidebarItem'

interface Item {
  title: string
  icon: React.ReactNode
  href: string
}

const items: Item[] = [
  {
    title: 'Dashboard',
    icon: <IoCalendarOutline />,
    href: '/dashboard',
  },
  {
    title: 'Rest Todos',
    icon: <IoCheckboxOutline />,
    href: '/dashboard/rest-todos',
  },
  {
    title: 'Server Actions',
    icon: <IoListOutline />,
    href: '/dashboard/server-todos',
  },
  {
    title: 'Cookies',
    icon: <IoAtCircleOutline />,
    href: '/dashboard/cookies',
  },
  {
    title: 'Products',
    icon: <IoBasketOutline />,
    href: '/dashboard/products',
  },
  {
    title: 'Profile',
    icon: <IoPersonOutline />,
    href: '/dashboard/profile',
  },
]

export const Sidebar = async () => {
  const session = await getServerSession(authOptions)

  const userName = session?.user?.name ?? 'No Name'
  const avatarURL = session?.user?.image ?? 'https://i.pravatar.cc/150'

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
              priority
            />
          </Link>
          <span className='text-4xl font-bold text-cyan-600'>Todos App</span>
        </div>

        <div className='mt-8 text-center'>
          <Image
            src={avatarURL}
            width={200}
            height={200}
            alt=''
            className='w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28'
            priority
          />
          <h5 className='hidden mt-4 text-xl font-semibold text-gray-600 lg:block'>{userName}</h5>
          <span className='hidden text-gray-400 lg:block'>Admin</span>
        </div>

        <ul className='space-y-2 tracking-wide mt-8'>
          {items.map(({ href, icon, title }) => (
            <SidebarItem key={href} href={href} title={title} icon={icon} />
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
