'use client'
import Link from "next/link"
import { FaBars, FaClipboardList, FaShoppingCart, FaUser } from "react-icons/fa"
import BadgeCart from "./BadgeCart"
import BadgeOrder from "./BadgeOrder"

interface Props {
    cartLength: number
    onOpen: () => void
    ordersLength: number
}

export default function MobileNav({ cartLength, onOpen, ordersLength }: Props) {
    return (
        <main className="lg:hidden w-full max-w-7xl mx-auto flex items-center justify-between text-base">
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

            <div className="flex items-center justify-between text-2xl gap-10">
                <Link href="/order" className="relative text-[#111] hover:text-[#707072] transition-colors">
                    <FaClipboardList />
                    <BadgeOrder value={ordersLength} />
                </Link>

                <Link href="/cart" className="relative text-[#111] hover:text-[#707072] transition-colors">
                    <FaShoppingCart />
                    <BadgeCart value={cartLength} />
                </Link>

                <Link href="/auth" className="text-[#111] hover:text-[#707072] transition-colors">
                    <FaUser />
                </Link>

                <button onClick={onOpen} className="text-[#111] hover:text-[#707072] transition-colors">
                    <FaBars />
                </button>
            </div>
        </main>
    )
}
