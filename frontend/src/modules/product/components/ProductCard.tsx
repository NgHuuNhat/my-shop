import React from 'react'
import { ProductCardProps } from '../types/productType'
import Link from 'next/link'
import ImageCustom from '@/shared/components/image/ImageCustom'

const ProductCard = (({ product }: ProductCardProps) => {
    return (
        <Link href={`/products/${product.id}`} className="group flex flex-col items-start cursor-pointer overflow-hidden rounded-2xl w-full">
            {/* <div className="relative w-full pb-[130%] overflow-hidden rounded-2xl shadow-lg bg-gray-200 hover:scale-[1.03] transition-transform duration-300">
                <ImageCustom
                    src={product.thumbnail || "/images/no-image.png"}
                    alt={product.name || "Product image"}
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className='text-white absolute bottom-3 left-3'>
                    <h2 className="mt-4 text-base sm:text-lg md:text-xl font-black line-clamp-2">{product.name}</h2>
                    <p className="mt-1 text-base sm:text-lg md:text-xl font-bold">{product.price}₫</p>
                </div>
            </div> */}
            <div className="relative w-full pb-[130%] overflow-hidden rounded-2xl shadow-lg bg-gray-200">

                {/* Chỉ scale phần ảnh */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl hover:scale-[1.03] transition-transform duration-300">
                    <ImageCustom
                        src={product.thumbnail || "/images/no-image.png"}
                        alt={product.name || "Product image"}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Overlay tối – không scale */}
                <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>

                {/* Text – không scale */}
                <div className="text-white absolute bottom-3 left-3">
                    <h2 className="mt-4 text-xs font-black line-clamp-2">
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