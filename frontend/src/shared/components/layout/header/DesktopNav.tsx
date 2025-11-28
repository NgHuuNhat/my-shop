'use client'
import Link from "next/link"
import { FaClipboardList, FaShoppingCart, FaUser } from "react-icons/fa"
import Badge from "./Badge"

interface Props {
    cartLength: number
}

export default function DesktopNav({ cartLength }: Props) {
    return (
        <div className="hidden lg:flex gap-8 items-center text-xl">
            <Link href="/order" className="relative text-[#111] hover:text-[#707072] transition-colors">
                <FaClipboardList />
                <span className="absolute -top-2 -right-3 bg-blue-600 text-white font-bold w-4 h-4 text-sm flex items-center justify-center rounded-full">
                    0
                </span>
            </Link>

            <Link href="/cart" className="relative text-[#111] hover:text-[#707072] transition-colors">
                <FaShoppingCart />
                <Badge value={cartLength} />
            </Link>

            <Link href="/auth" className="text-[#111] hover:text-[#707072] transition-colors">
                <FaUser />
            </Link>
        </div>
    )
}
