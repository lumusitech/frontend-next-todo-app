'use client'

import { useState } from 'react'

// https://tailwindcomponents.com/component/radio-buttons-1

interface Props {
  currentTab?: number
  tabsOptions?: number[]
}

export const TabBar = ({ tabsOptions = [1, 2, 3, 4], currentTab = 1 }: Props) => {
  const [selected, setSelected] = useState(currentTab)

  const onTabSelected = (tab: number) => {
    setSelected(tab)
  }

  return (
    <div
      className={`grid w-full space-x-2 rounded-xl bg-gray-200 p-2 ${
        'grid-cols-' + tabsOptions.length
      }`}
    >
      {tabsOptions.map(tab => (
        <div key={tab}>
          <input
            onChange={() => {}}
            checked={selected === tab}
            type='radio'
            id={String(tab)}
            className='peer hidden'
          />
          <label
            onClick={() => onTabSelected(tab)}
            className='transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  )
}
