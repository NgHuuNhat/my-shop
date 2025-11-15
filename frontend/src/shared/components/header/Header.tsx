import Link from 'next/link'
import React from 'react'
import { FaShoppingCart, FaUser } from 'react-icons/fa'

export default function Header() {
    return (
        <header className="h-[60px] sticky top-0 z-50 bg-white shadow-sm flex items-center gap-8 px-6 text-xs md:text-base">
            <nav className="flex gap-8 justify-between w-full max-w-7xl mx-auto">
                <Link
                    href="/"
                    className="text-[#111111] font-bold hover:text-[#707072] transition-colors"
                >
                    <svg aria-hidden="true" className="swoosh-svg flex-start w-[40px] h-[40px] md:w-[60px] md:h-[60px]" focusable="false" viewBox="0 0 24 24" role="img" fill="none"><path fill="currentColor" fillRule="evenodd" d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z" clipRule="evenodd"></path></svg>
                </Link>
                <div className='flex gap-8'>
                    <Link
                        href="/"
                        className="text-[#111111] font-bold hover:text-[#707072] transition-colors flex items-center"
                    >
                        Home
                    </Link>
                    <Link
                        href="/products"
                        className="text-[#111111] font-bold hover:text-[#707072] transition-colors flex items-center"
                    >
                        Products
                    </Link>
                    <Link
                        href="#"
                        className="text-[#111111] font-bold hover:text-[#707072] transition-colors flex items-center"
                    >
                        About
                    </Link>
                </div>
                <div className='flex gap-8'>
                    <Link
                        href="/cart"
                        className="relative text-[#111111] font-bold hover:text-[#707072] transition-colors flex items-center"
                    >
                        <FaShoppingCart className="text-lg md:text-2xl" />
                        <span className="absolute top-2 md:top-3 -right-2 bg-red-600 text-white text-xs md:text-xs w-3 h-3 md:w-4 md:h-4 flex items-center justify-center rounded-full">
                            1
                        </span>
                    </Link>

                    <Link
                        href="/login"
                        className="text-[#111111] font-bold hover:text-[#707072] transition-colors flex items-center"
                    >
                        <FaUser className='text-lg md:text-2xl' />
                    </Link>
                </div>
            </nav>
        </header>
    )
}
