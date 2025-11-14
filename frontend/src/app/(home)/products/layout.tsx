'use client'
import Search from '@/shared/components/search/Search'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function layout({ children }: any) {
    const pathname = usePathname()

    const show = pathname === '/products'

    return (
        <div className='flex-1 flex flex-col'>
            {show && <Search />}
            {children}
        </div>
    )
}
