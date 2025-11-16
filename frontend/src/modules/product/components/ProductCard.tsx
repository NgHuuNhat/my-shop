import React from 'react'
import { ProductCardProps } from '../types/productType'
import Link from 'next/link'
import ImageCustom from '@/shared/components/image/ImageCustom'
import Image from 'next/image'

const ProductCard = (({ product }: ProductCardProps) => {
    return (
        <Link href={`/products/${product.id}`} className="group flex flex-col items-start cursor-pointer overflow-hidden rounded-2xl w-full">
            <div className="relative w-full pb-[100%] overflow-hidden rounded-2xl shadow-lg bg-gray-200">
                {/* Chỉ scale phần ảnh */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl hover:scale-[1.03] transition-transform duration-300">
                    <Image
                        src={product.thumbnail || "/images/no-image.png"}
                        alt={product.name || "Product image"}
                        className="w-full h-full object-cover"
                        fill
                        sizes="100vw"
                    />
                </div>

                {/* Overlay tối – không scale */}
                <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>

                {/* Text – không scale */}
                <div className="text-white absolute bottom-3 left-3">
                    <h2 className="mt-4 text-sm font-black line-clamp-2">
                        {product.name}
                    </h2>
                    <p className="mt-1 text-m font-bold">
                        {product.price}₫
                    </p>
                </div>
            </div>
        </Link>
    )
})

export default React.memo(ProductCard);