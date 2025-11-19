
import Footer from '@/shared/layout/footer/Footer'
import Header from '@/shared/layout/header/Header'
import React from 'react'

export default function layoutHome({ children }: any) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {children}
            </main>

            <Footer />
        </div>
    )
}
