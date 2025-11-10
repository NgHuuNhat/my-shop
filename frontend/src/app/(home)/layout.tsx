import Header from '@/shared/header/Header'
import React from 'react'

export default function layout({ children }: any) {
    return (
        <div className='min-h-screen flex flex-col'>
            <Header />
            <main className="flex-1 flex flex-col">
                {children}
            </main>
        </div>
    )
}
