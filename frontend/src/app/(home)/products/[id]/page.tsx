'use client'

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function ProductDetail() {
    const params = useParams()
    const { id } = params

    const [product, setProduct] = useState<any>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return
        fetch(`https://691078c77686c0e9c20a6dc4.mockapi.io/api/product/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data)
                console.log(product)
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) {
        return (
            <div className='flex-1 flex flex-col items-center justify-center'>
                <p>Loading...</p>
            </div>
        )
    }

    if (!product) {
        return (
            <div className='flex-1 flex flex-col items-center justify-center'>
                <p>Không tìm thấy sản phẩm.</p>
            </div>
        )
    }

    return (
        <div className='p-4 max-w-4xl mx-auto'>
            <img src={product.thumbnail} alt={product.name} className='w-full h-80 object-cover rounded-lg' />
            <h1 className='mt-4 text-2xl font-bold'>{product.name}</h1>
            <p className='mt-2 text-xl text-gray-700'>{product.price}₫</p>
            {product.description && <p className='mt-4 text-gray-600'>{product.description}</p>}
            <div className='flex gap-2 mt-4'>
                <button className='px-4 py-2 bg-blue-500 text-white rounded'>Thêm vào giỏ hàng</button>
                <button className='px-4 py-2 bg-green-500 text-white rounded'>Mua ngay</button>
            </div>
        </div>
    )
}
