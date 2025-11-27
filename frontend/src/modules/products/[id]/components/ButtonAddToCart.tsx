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
        <>
            <Link href='/cart' onClick={handleAddToCart} className='w-full'>
                <button className="w-full cursor-pointer flex-1 px-5 py-5 bg-gray-950 text-white font-bold rounded-full hover:bg-[#707072] transition">
                    <span className='flex justify-center items-center gap-1 transition-colors'>Buy Now <FaCoins /></span>
                </button>
            </Link>
            <button onClick={handleAddToCart} className="cursor-pointer flex-1 px-5 py-5 bg-white text-black border-2 border-gray-300 font-bold rounded-full hover:border-black transition">
                <span className='flex justify-center items-center gap-1 transition-colors'>Add to Cart <FaShoppingCart /></span>
            </button>
        </>

    )
}

