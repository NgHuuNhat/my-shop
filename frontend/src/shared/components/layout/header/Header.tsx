'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCart } from '@/modules/cart/hooks/useCart'

import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'
import HeaderContent from './HeaderContent'
import Draw from '../../ui/draw/Draw'
import { useOrder } from '@/modules/order/hooks/useOrder'

export default function Header() {
    const [open, setOpen] = useState(false)
    const { cartLength } = useCart()
    const { ordersLength } = useOrder()

    useEffect(() => {
        document.body.classList.toggle("overflow-hidden", open)
        return () => document.body.classList.remove("overflow-hidden")
    }, [open])

    return (
        <>
            <header className="bg-white sticky top-0 z-50 h-[50px] shadow-sm flex items-center justify-center">
                <nav className="w-full max-w-7xl mx-auto flex items-center justify-between px-4">

                    {/* Logo */}
                    <div className="hidden lg:flex gap-8 items-center">
                        <Link href="/" className="w-20 h-20 flex items-center text-[#111] hover:text-[#707072] transition-colors">
                            <svg aria-hidden="true" className="w-full h-full lg:-ml-2.5" viewBox="0 0 24 24" fill="none">
                                <path fill="currentColor" clipRule="evenodd" fillRule="evenodd"
                                    d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.760-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.200.666.298 1.147.298.386 0 .829-.063 1.316-.190L21 8.719z"
                                />
                            </svg>
                        </Link>
                    </div>

                    {/* Menu desktop */}
                    <div className="hidden lg:flex gap-8 items-center">
                        <HeaderContent />
                    </div>

                    {/* Actions desktop */}
                    <DesktopNav cartLength={cartLength()} ordersLength={ordersLength()} />

                    {/* Mobile */}
                    <MobileNav cartLength={cartLength()} onOpen={() => setOpen(true)} ordersLength={ordersLength()} />

                </nav>
            </header>

            {/* Drawer */}
            <Draw open={open} setOpen={setOpen} content={<HeaderContent setOpen={setOpen} />} />
        </>
    )
}
