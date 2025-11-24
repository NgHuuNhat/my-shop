import Link from 'next/link'
import React from 'react'

export default function HeaderContent({ setOpen }: any) {
    return (
        <>
            <Link
                href="/"
                onClick={() => setOpen(false)}
                className="p-4 lg:p-0 font-bold text-[#111] hover:text-[#707072] transition-colors"
            >
                Home
            </Link>

            <Link
                href="/products"
                onClick={() => setOpen(false)}
                className="p-4 lg:p-0 font-bold text-[#111] hover:text-[#707072] transition-colors"
            >
                Products
            </Link>
            {/* <Link href="/" className="font-bold text-[#111] hover:text-[#707072] transition-colors flex items-center justify-center gap-1">Home</Link>
            <Link href="/products" className="font-bold text-[#111] hover:text-[#707072] transition-colors flex items-center justify-center gap-1">Products</Link> */}
        </>
    )
}
