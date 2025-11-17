import Link from 'next/link'
import React from 'react'
import { FaBars } from 'react-icons/fa'

export default function MenuMobile({ open, setOpen }: any) {
    return (
        <>
            <div
                className={`bg-white fixed top-0 right-0 h-full w-[80%] max-w-xs z-70 overflow-y-auto shadow-xl transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'} lg:hidden
                `}
            >
                <div className='bg-white sticky top-0 h-[50px] shadow-sm flex items-center justify-between px-4'>
                    <h3 className="font-bold flex items-center justify-center gap-2 text-2xl"><FaBars /><span>Menu</span> </h3>
                    <button
                        onClick={() => setOpen(false)}
                        className="text-2xl font-bold text-gray-950"
                    >
                        X
                    </button>
                </div>

                <div className='flex flex-col py-10 text-l'>
                    <Link
                        onClick={() => setOpen(false)}
                        href="/"
                        className="px-12 p-4 flex items-center font-bold text-[#111111] hover:text-[#707072] transition-colors border-t border-b"
                    >
                        Home
                    </Link>
                    <Link
                        onClick={() => setOpen(false)}
                        href="/products"
                        className="px-12 p-4 flex items-center font-bold text-[#111111] hover:text-[#707072] transition-colors border-b"
                    >
                        Products
                    </Link>
                </div>
            </div>

            {/* overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-60"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    )
}
