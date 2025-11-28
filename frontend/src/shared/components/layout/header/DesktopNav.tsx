'use client'
import Link from "next/link"
import { FaClipboardList, FaShoppingCart, FaUser } from "react-icons/fa"
import BadgeCart from "./BadgeCart"
import BadgeOrder from "./BadgeOrder"

interface Props {
    cartLength: number
    ordersLength: number
}

export default function DesktopNav({ cartLength, ordersLength }: Props) {
    return (
        <div className="hidden lg:flex gap-8 items-center text-xl">
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
        </div>
    )
}
