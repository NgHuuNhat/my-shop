'use client'
import { useCart } from '@/modules/cart/hooks/useCart';
import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'

export default function ButtonAddToCart({ product }: any) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        console.log('click add to cart')
        console.log(product)
        addToCart(product)
    }

    return (
        <button onClick={handleAddToCart} className="cursor-pointer flex-1 px-5 py-5 bg-white text-black border-2 border-gray-300 font-bold rounded-full hover:border-black transition">
            <span className='flex justify-center items-center gap-1 transition-colors'>Add to Cart <FaShoppingCart /></span>
        </button>
    )
}

