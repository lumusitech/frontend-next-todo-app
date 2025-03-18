'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  title: string
  icon: React.ReactNode
  href: string
}

export const SidebarItem = ({ title, icon, href }: Props) => {
  const currentPath = usePathname()
  return (
    <>
      <li>
        <Link
          href={href}
          className={`${
            currentPath === href
              ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400'
              : 'text-gray-700'
          } px-4 py-3 flex items-center space-x-4 rounded-md group hover:bg-gradient-to-r hover:bg-sky-500 hover:text-white`}
        >
          {icon}
          <span className='-mr-1 font-medium'>{title}</span>
        </Link>
      </li>
    </>
  )
}
