'use client'

import Link from 'next/link'
import { FaBars, FaClipboardList, FaHome, FaShoppingBag, FaShoppingCart, FaUser } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import MenuMobile from '@/shared/components/menu/MenuMobile'

export default function Header() {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        document.body.classList.toggle("overflow-hidden", open)
        return () => document.body.classList.remove("overflow-hidden")
    }, [open])

    return (
        <>
            <header className="bg-white sticky top-0 z-50 h-[50px] shadow-sm flex items-center justify-center overflow-hidden">
                <nav className="w-full max-w-7xl mx-auto flex items-center justify-between px-4">

                    {/* Logo */}
                    <div className="hidden lg:flex gap-8 items-center">
                        <Link href="/" className="w-20 h-20 flex items-center text-[#111] hover:text-[#707072] transition-colors">
                            <svg aria-hidden="true" className="w-full h-full lg:-ml-2.5" viewBox="0 0 24 24" fill="none">
                                <path
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.760-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.200.666.298 1.147.298.386 0 .829-.063 1.316-.190L21 8.719z"
                                />
                            </svg>
                        </Link>
                    </div>


                    {/* Desktop Menu */}
                    <div className="hidden lg:flex gap-8 items-center">
                        <Link href="/" className="font-bold text-[#111] hover:text-[#707072] transition-colors flex items-center justify-center gap-1">Home</Link>
                        <Link href="/product" className="font-bold text-[#111] hover:text-[#707072] transition-colors flex items-center justify-center gap-1">Product List</Link>
                    </div>

                    {/* Actions */}
                    <div className="hidden lg:flex gap-8 items-center text-xl">
                        <Link href="/order" className="relative text-[#111] hover:text-[#707072] transition-colors">
                            {/* icon order có thể dùng FaClipboardList hoặc FaListAlt */}
                            <FaClipboardList />
                            <span className="absolute -top-2 -right-3 bg-blue-600 text-white font-bold w-4 h-4 text-sm flex items-center justify-center rounded-full">
                                0
                                {/* {orders.length} nếu bạn truyền số đơn từ context hoặc state */}
                            </span>
                        </Link>
                        <Link href="/cart" className="relative text-[#111] hover:text-[#707072] transition-colors">
                            <FaShoppingCart />
                            <span className="absolute -top-2 -right-3 bg-red-600 text-white font-bold w-4 h-4 text-sm flex items-center justify-center rounded-full">1</span>
                        </Link>
                        <Link href="/auth" className="text-[#111] hover:text-[#707072] transition-colors"><FaUser /></Link>
                    </div>

                    {/* Mobile Menu */}
                    <nav className="lg:hidden w-full max-w-7xl mx-auto flex items-center justify-between  text-base">
                        <Link href="/" className="w-16 h-16 flex items-center text-[#111] hover:text-[#707072] transition-colors">
                            <svg aria-hidden="true" className="w-full h-full" viewBox="0 0 24 24" fill="none">
                                <path
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.760-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.200.666.298 1.147.298.386 0 .829-.063 1.316-.190L21 8.719z"
                                />
                            </svg>
                        </Link>
                        <div className='flex items-center justify-between text-2xl gap-10'>
                            {/* <Link href="/" className="text-[#111] hover:text-[#707072] transition-colors"><FaHome /></Link>
                            <Link href="/product" className="text-[#111] hover:text-[#707072] transition-colors"><FaShoppingBag /></Link> */}
                            <Link href="/order" className="relative text-[#111] hover:text-[#707072] transition-colors">
                                {/* icon order có thể dùng FaClipboardList hoặc FaListAlt */}
                                <FaClipboardList />
                                <span className="absolute -top-1 -right-2 bg-blue-600 text-white font-bold w-3 h-3 text-sm flex items-center justify-center rounded-full">
                                    0
                                    {/* {orders.length} nếu bạn truyền số đơn từ context hoặc state */}
                                </span>
                            </Link>
                            <Link href="/cart" className="relative text-[#111] hover:text-[#707072] transition-colors">
                                <FaShoppingCart />
                                <span className="absolute -top-1 -right-2 bg-red-600 text-white font-bold w-3 h-3 text-sm flex items-center justify-center rounded-full">1</span>
                            </Link>
                            <Link href="/auth" className="text-[#111] hover:text-[#707072] transition-colors"><FaUser /></Link>
                            {/* Mobile menu button */}
                            <button onClick={() => setOpen(true)} className="text-[#111] hover:text-[#707072] transition-colors">
                                <FaBars />
                            </button>
                        </div>
                    </nav>

                </nav>
            </header>

            {/* MenuMobile*/}
            <MenuMobile open={open} setOpen={setOpen} />
        </>
    )
}
