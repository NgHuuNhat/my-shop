import React from 'react'
import { ProductCardProps } from '../types/productType'
import Link from 'next/link'
import Image from 'next/image'

const ProductCard = React.memo(({ product }: ProductCardProps) => {
    return (
        <Link
            href={`/products/${product.id}`}
            className="group flex flex-col items-start cursor-pointer hover:scale-105 transition-transform duration-200 w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(100%-0.666rem)] lg:w-[calc(100%-0.75rem)]"
        >
            <div className="relative w-full pb-[100%] overflow-hidden rounded-lg">
                <Image
                    src={product.thumbnail}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg transition-transform duration-200 group-hover:scale-110"
                    unoptimized
                />
            </div>
            <h2 className="mt-3 text-sm font-medium text-gray-900 truncate">
                {product.name}
            </h2>
            <p className="mt-1 text-sm text-gray-500">{product.price}₫</p>
        </Link>
    )
})

export default ProductCard;