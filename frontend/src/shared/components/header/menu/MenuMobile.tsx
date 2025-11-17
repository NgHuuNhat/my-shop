import Link from 'next/link'
import React from 'react'

export default function MenuMobile({ open, setOpen }: any) {
    // ${open ? 'translate-x-0' : 'translate-x-full'}
    return (
        <>
            <div
                className={` bg-blue-100 fixed top-0 right-0 h-screen w-[80%] max-w-xs z-50 overflow-y-auto shadow-xl transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'} lg:hidden
                `}
            >
                <div className='bg-red-100 sticky top-0 h-[50px] shadow-sm flex items-center justify-end px-4'>
                    <button
                        onClick={() => setOpen(false)}
                        className="font-bold text-gray-600 bg-red-500"
                    >
                        Close
                    </button>
                </div>

                <div className='flex flex-col gap-8 p-4'>
                    <Link
                        onClick={() => setOpen(false)}
                        href="/"
                        className="bg-red-100 flex items-center font-bold text-[#111111] hover:text-[#707072] transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        onClick={() => setOpen(false)}
                        href="/products"
                        className="flex items-center font-bold text-[#111111] hover:text-[#707072] transition-colors"
                    >
                        Products
                    </Link>
                </div>
            </div>

            {/* overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    )
}
