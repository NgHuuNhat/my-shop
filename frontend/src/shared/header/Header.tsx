import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm flex items-center justify-center gap-8 px-6 py-4">
            <nav className="flex gap-8">
                <Link
                    href="/"
                    className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
                >
                    Home
                </Link>
                <Link
                    href="/products"
                    className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
                >
                    Products
                </Link>
                <Link
                    href="/cart"
                    className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
                >
                    Cart
                </Link>
            </nav>
        </header>
    )
}
