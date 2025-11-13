import Search from '@/shared/components/search/Search'
import React from 'react'

export default function layout({ children }: any) {
    return (
        <div className='flex-1 flex flex-col'>
            <Search />
            {children}
        </div>
    )
}
