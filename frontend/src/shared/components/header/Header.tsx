'use client'

import Link from 'next/link'
import { FaBars, FaShoppingCart, FaUser } from 'react-icons/fa'
import MenuMobile from './menu/MenuMobile'
import { useEffect, useState } from 'react'

export default function Header() {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (open) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => document.body.classList.remove("overflow-hidden");
    }, [open]);

    return (
        <>
            <header className="h-[50px] sticky top-0 z-50 bg-red-100 shadow-sm flex items-center">
                <nav className="bg-yellow-100 flex items-center justify-between w-full max-w-7xl mx-auto px-4">
                    {/* Logo */}
                    <div className='bg-green-500 flex'>
                        <Link
                            href="/"
                            className="text-[#111111] font-bold hover:text-[#707072] transition-colors"
                        >
                            <svg aria-hidden="true" className="swoosh-svg" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none"><path fill="currentColor" fillRule="evenodd" d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z" clipRule="evenodd"></path></svg>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className='bg-green-500 hidden lg:flex gap-8'>
                        <Link
                            href="/"
                            className="flex items-center font-bold text-[#111111] hover:text-[#707072] transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/products"
                            className="flex items-center font-bold text-[#111111] hover:text-[#707072] transition-colors"
                        >
                            Products
                        </Link>
                    </div>

                    {/* Actions */}
                    <div className='bg-green-500 flex gap-8'>
                        <Link
                            href="/cart"
                            className="relative flex items-center font-bold text-[#111111] hover:text-[#707072] transition-colors"
                        >
                            <FaShoppingCart className="" />
                            <span className="absolute top-0 right-0 bg-red-600 text-white w-4 h-4 flex items-center justify-center rounded-full">
                                1
                            </span>
                        </Link>
                        <Link
                            href="/login"
                            className="flex items-center font-bold text-[#111111] hover:text-[#707072] transition-colors"
                        >
                            <FaUser className='' />
                        </Link>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setOpen(true)}
                            className="lg:hidden flex items-center font-bold text-[#111111] hover:text-[#707072] transition-colors"
                        >
                            <FaBars className='' />
                        </button>
                    </div>
                </nav>
            </header>

            {/* Desktop Menu */}
            <MenuMobile open={open} setOpen={setOpen} />
        </>
    )
}
