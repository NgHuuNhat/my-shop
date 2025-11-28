'use client'

import { useCart } from '@/modules/cart/hooks/useCart';
import { FaCoins, FaShoppingCart } from 'react-icons/fa'
import { ProductType } from '../../types/productType';
import Link from 'next/link';
import React from 'react'

export default function ButtonAddToCart({ product }: { product: ProductType }) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        console.log('click add to cart')
        console.log(product)
        addToCart(product)
    }

    return (
        <div className="flex flex-col lg:flex-row gap-2">
            <button
                onClick={handleAddToCart}
                className="cursor-pointer w-full lg:w-1/2 px-5 py-5 bg-white text-gray-800 border-2 border-gray-300 font-bold rounded-full flex justify-center items-center gap-2 transition hover:border-gray-500"
            >
                Add to Cart <FaShoppingCart className="inline" />
            </button>

            <Link
                href="/cart"
                onClick={handleAddToCart}
                className="w-full lg:w-1/2 px-5 py-5 bg-amber-500 text-white font-bold rounded-full flex justify-center items-center gap-2 transition hover:bg-amber-600"
            >
                Buy Now <FaCoins className="inline" />
            </Link>
        </div>
    )
}

