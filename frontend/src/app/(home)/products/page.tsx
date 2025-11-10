'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function ProductPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const limit = 20
  const totalPages = Math.ceil(products.length / limit)

  const start = (page - 1) * limit
  const end = start + limit
  const productsPage = products.slice(start, end)

  useEffect(() => {
    fetch('https://691078c77686c0e9c20a6dc4.mockapi.io/api/product')
      .then(res => res.json())
      .then(data => {
        console.log("Dữ liệu API:", data)
        if (Array.isArray(data)) {
          setProducts(data)
        } else {
          console.error("API không trả về mảng:", data)
          setProducts([])
        }
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className='flex-1 flex flex-col items-center justify-center'>
        <p>Loading...</p>
      </div>
    )
  }

  if (products.length == 0) {
    return (
      <div className='flex-1 flex flex-col items-center justify-center'>
        <p>Không tìm thấy sản phẩm.</p>
      </div>
    )
  }

  return (
    <div className='flex-1 flex flex-col items-center justify-center'>

      <p>Tất cả {products.length} sản phẩm</p>
      <div>
        <button onClick={() => setPage(prev => Math.max(prev - 1, 1))}>
          <span>{`<`}</span>
        </button>
        <span> {page}/{totalPages} </span>
        <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}>
          <span>{`>`}</span>
        </button>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
        {productsPage.map((p: any) => (
          <div key={p.id}>
            <Link href={`/products/${p.id}`}>
              <img src={p.thumbnail} alt={p.name} className='w-100 h-40 object-cover rounded-lg' />
              <h2 className='mt-2 font-medium'>{p.name}</h2>
              <p className='text-gray-600'>{p.price}₫</p>
            </Link>
            <div className='flex gap-1'>
              <button className='w-60 mt-2 px-3 py-1 bg-blue-500 text-white rounded'>Thêm vào giỏ hàng</button>
              <button className='w-40 mt-2 px-3 py-1 bg-green-500 text-white rounded'>Mua ngay</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
