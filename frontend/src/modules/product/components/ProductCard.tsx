import React from 'react'
import { ProductCardProps } from '../types/productType'
import Link from 'next/link'
import Image from 'next/image'

const ProductCard = React.memo(({ product }: ProductCardProps) => {
    return (
        <Link href={`/products/${product.id}`}>
            <Image src={product.thumbnail} alt={product.name} width={300} height={300} unoptimized className='w-100 h-40 object-cover rounded-lg' />
            <h2>id: {product.id}</h2>
            <h2 className='mt-2 font-medium'>{product.name}</h2>
            <p className='text-gray-600'>{product.price}₫</p>
        </Link>
    )
})

export default ProductCard;