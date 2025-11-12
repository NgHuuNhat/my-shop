import React from 'react'
import { ProductCardProps } from '../types/productType'
import Link from 'next/link'
import ImageCustom from '@/shared/components/ImageCustom/ImageCustom'

const ProductCard = (({ product }: ProductCardProps) => {
    return (
        <Link href={`/products/${product.id}`} className="group flex flex-col items-start cursor-pointer hover:scale-[1.03] transition-transform duration-300 w-full">
            <div className="relative w-full pb-[100%] overflow-hidden rounded-2xl shadow-lg bg-gray-200">
                <ImageCustom
                    src={product.thumbnail || "/images/no-image.png"}
                    alt={product.name || "Product image"}
                />
            </div>
            <h2 className="mt-4 text-base sm:text-lg md:text-xl font-semibold text-gray-900 line-clamp-2">{product.name}</h2>
            <p className="mt-1 text-base sm:text-lg md:text-xl text-gray-600">{product.price}₫</p>
        </Link>
    )
})

export default React.memo(ProductCard);