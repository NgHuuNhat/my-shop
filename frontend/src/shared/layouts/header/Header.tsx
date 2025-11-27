'use client'

import Link from 'next/link'
import { FaBars, FaClipboardList, FaShoppingCart, FaUser } from 'react-icons/fa'
import { useEffect, useRef, useState } from 'react'
import Draw from '@/shared/modules/draw/Draw'
import HeaderContent from './components/HeaderContent'
import { useCart } from '@/modules/cart/hooks/useCart'

export default function Header() {
    const [open, setOpen] = useState(false)
    const { cartLength } = useCart()
    const [mounted, setMounted] = useState(false)
    const [animate, setAnimate] = useState(false)
    const refBadge = useRef(0)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return
        if (refBadge.current !== cartLength()) {
            setAnimate(true)
            refBadge.current = cartLength()
            const timer = setTimeout(() => setAnimate(false), 500)
            return () => clearTimeout(timer)
        }
    }, [cartLength(), mounted])


    useEffect(() => {
        document.body.classList.toggle("overflow-hidden", open)
        return () => document.body.classList.remove("overflow-hidden")
    }, [open])

    const Badge = ({ length }: { length: number }) => (
        <span className={`absolute -top-2 -right-3 bg-red-600 text-white font-bold w-4 h-4 text-xs flex items-center justify-center rounded-full ${animate ? 'animate-bounce' : ''}`}>
            {mounted ? cartLength() : 0}
        </span>
    )

    return (
        <>
            <header className="bg-white sticky top-0 z-50 h-[50px] shadow-sm flex items-center justify-center overflow-hidden">
                <nav className="w-full max-w-7xl mx-auto flex items-center justify-between px-4">
                    {/* nav desktop */}
                    <div className="hidden lg:flex gap-8 items-center">
                        <Link href="/" className="w-20 h-20 flex items-center text-[#111] hover:text-[#707072] transition-colors">
                            {/* SVG logo */}
                        </Link>
                        <HeaderContent />
                    </div>

                    <div className="hidden lg:flex gap-8 items-center text-xl">
                        <Link href="/order" className="relative text-[#111] hover:text-[#707072] transition-colors">
                            <FaClipboardList />
                            <span className="absolute -top-2 -right-3 bg-blue-600 text-white font-bold w-4 h-4 text-sm flex items-center justify-center rounded-full">0</span>
                        </Link>
                        <Link href="/cart" className="relative text-[#111] hover:text-[#707072] transition-colors">
                            <FaShoppingCart />
                            <Badge length={cartLength()} />
                        </Link>
                        <Link href="/auth" className="text-[#111] hover:text-[#707072] transition-colors"><FaUser /></Link>
                    </div>

                    {/* nav mobile */}
                    <div className="lg:hidden w-full max-w-7xl mx-auto flex items-center justify-between text-base">
                        <Link href="/" className="w-16 h-16 flex items-center text-[#111] hover:text-[#707072] transition-colors">
                            {/* SVG logo */}
                        </Link>
                        <div className='flex items-center justify-between text-2xl gap-10'>
                            <Link href="/order" className="relative text-[#111] hover:text-[#707072] transition-colors">
                                <FaClipboardList />
                                <span className="absolute -top-1 -right-2 bg-blue-600 text-white font-bold w-3 h-3 text-sm flex items-center justify-center rounded-full">0</span>
                            </Link>
                            <Link href="/cart" className="relative text-[#111] hover:text-[#707072] transition-colors">
                                <FaShoppingCart />
                                <Badge length={cartLength()} />
                            </Link>
                            <Link href="/auth" className="text-[#111] hover:text-[#707072] transition-colors"><FaUser /></Link>
                            <button onClick={() => setOpen(true)} className="text-[#111] hover:text-[#707072] transition-colors">
                                <FaBars />
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            <Draw open={open} setOpen={setOpen} content={<HeaderContent setOpen={setOpen} />} />
        </>
    )
}
