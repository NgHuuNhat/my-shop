import Footer from '@/shared/layout/footer/Footer'
import React from 'react'

export default function layout({ children }: any) {
    return (
        <div>
            {children}
            <Footer />
        </div>
    )
}
