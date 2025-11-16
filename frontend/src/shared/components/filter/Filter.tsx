'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo, useState } from 'react'
import { FaFilter } from 'react-icons/fa'

const colors = ['đen', 'trắng', 'xám']
const sizes = ['S', 'M', 'L', 'XL']
const prices = ['0 - 500', '500 - 1000', '1000 - 2000'];

const Filter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Lấy giá hiện tại từ URL
  const currentPrice = searchParams.get('price') || '';

  // Click vào 1 price -> cập nhật URL
  const handlePriceClick = (range: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentPrice === range) {
      params.delete('price'); // click lại -> bỏ filter
    } else {
      params.set('price', range);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className={`hidden lg:block w-full md:w-72 flex-shrink-0 px-4 py-10`}>
      <span className='flex h-[40px] items-center gap-2'>
        <FaFilter />
        <h2 className="text-lg font-bold">Filter products</h2>
      </span>

      {/* Price */}
      <div className="mb-4">
        <h3 className="font-bold h-[42px] flex items-end mb-4 border-b">Price</h3>
        <div className="flex flex-col gap-2">
          {prices.map((price, index) => (
            <li key={index} className='list-none'>
              <label className="cursor-pointer flex items-center gap-2">
                <input
                  type="checkbox"
                  name="price"
                  checked={currentPrice === price}
                  onChange={() => handlePriceClick(price)}
                  className='cursor-pointer'
                />
                {price}k
              </label>
            </li>
          ))}
        </div>
      </div>

      {/* Color */}
      <div className="mb-4">
        <h3 className="font-bold h-[41px] flex items-end mb-4 border-b">Price</h3>
        <div className="flex flex-col gap-2">
          {colors.map((color, index) => (
            <li key={index} className='list-none'>
              <label className="cursor-pointer flex items-center gap-2">
                <input
                  type="checkbox"
                  name="price"
                  className='cursor-pointer'
                />
                {color}
              </label>
            </li>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mb-4">
        <h3 className="font-bold h-[41px] flex items-end mb-4 border-b">Price</h3>
        <div className="flex flex-col gap-2">
          {sizes.map((size, index) => (
            <li key={index} className='list-none'>
              <label className="cursor-pointer flex items-center gap-2">
                <input
                  type="checkbox"
                  name="price"
                  className='cursor-pointer'
                />
                {size}
              </label>
            </li>
          ))}
        </div>
      </div>

      {/* Button áp dụng filter */}
      <button
        type="submit"
        className="font-bold cursor-pointer w-full text-white bg-gray-950 py-3 mt-4 rounded-2xl transition hover:bg-gray-700"
      >
        Áp dụng bộ lọc
      </button>
    </form>
  )
}

// Dùng React.memo để tránh render lại khi props không đổi
export default React.memo(Filter)
