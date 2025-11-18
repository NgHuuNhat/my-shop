'use client'

import Link from 'next/link'
import { FaBars, FaShoppingCart, FaUser } from 'react-icons/fa'
import MenuMobile from './menu/MenuMobile'
import { useEffect, useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)

  // Lock scroll khi mở menu mobile
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open)
    return () => document.body.classList.remove("overflow-hidden")
  }, [open])

  return (
    <>
      <header className="sticky top-0 z-50 h-[40px] bg-white shadow-sm flex items-center">
        <nav className="w-full max-w-7xl mx-auto px-4 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="w-20 h-20 flex items-center text-[#111] hover:text-[#707072] transition-colors">
            <svg
              aria-hidden="true"
              className="w-full h-full ms-[-10px]"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.760-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.200.666.298 1.147.298.386 0 .829-.063 1.316-.190L21 8.719z"
              />
            </svg>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-8">
            <Link href="/" className="font-bold text-[#111] hover:text-[#707072] transition-colors">
              Home
            </Link>
            <Link href="/products" className="font-bold text-[#111] hover:text-[#707072] transition-colors">
              Products
            </Link>
          </div>

          {/* Actions */}
          <div className="flex gap-8 text-xl items-center">

            {/* Cart */}
            <Link href="/cart" className="relative text-[#111] hover:text-[#707072] transition-colors">
              <FaShoppingCart />
              <span className="absolute -top-2 -right-3 bg-red-600 text-white w-4 h-4 text-sm flex items-center justify-center rounded-full">
                1
              </span>
            </Link>

            {/* User */}
            <Link href="/login" className="text-[#111] hover:text-[#707072] transition-colors">
              <FaUser />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-[#111] hover:text-[#707072] transition-colors"
            >
              <FaBars />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <MenuMobile open={open} setOpen={setOpen} />
    </>
  )
}
