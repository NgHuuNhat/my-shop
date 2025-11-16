'use client'
import FilterSidebar from '@/shared/components/filter/Filter'
import Search from '@/shared/components/search/Search'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Layout({ children }: any) {
    const pathname = usePathname()
    const show = pathname === '/products'

    return (
        <div className="flex-1 flex w-full max-w-7xl mx-auto">
            {show && <FilterSidebar />}
            <div className="flex-1 flex flex-col">
                {show && <Search />}
                <div className="flex-1 flex">
                    {children}
                </div>
            </div>
        </div>
    )
}
