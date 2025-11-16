'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { FaFilter } from 'react-icons/fa'

const colors = ['đen', 'trắng', 'xám']
const sizes = ['S', 'M', 'L', 'XL']
const prices = ['0 - 500', '500 - 1000', '1000 - 2000'];

const Filter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPrice = searchParams.get('price') || ''
  const [open, setOpen] = useState(false) // mobile drawer

  const handlePriceClick = (range: string) => {
    const params = new URLSearchParams(searchParams.toString());
    currentPrice === range ? params.delete('price') : params.set('price', range)
    router.push(`?${params.toString()}`)
  }

  return (
    <>
      {/* 🔥 MOBILE BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden w-full flex items-center gap-2 mx-4 mb-10 px-4 py-2 border rounded-xl"
      >
        <FaFilter /> Bộ lọc
      </button>

      {/* 🔥 DESKTOP SIDEBAR */}
      <form className="hidden lg:block w-full md:w-72 flex-shrink-0 px-4">
        <FilterContent
          currentPrice={currentPrice}
          handlePriceClick={handlePriceClick}
        />
      </form>

      {/* 🔥 MOBILE DRAWER OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 🔥 MOBILE DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-xs bg-white z-50 p-6 overflow-y-auto shadow-xl transform transition-transform duration-300
        ${open ? 'translate-x-0' : 'translate-x-full'}
        lg:hidden`}
      >
        <button
          onClick={() => setOpen(false)}
          className="mb-6 font-bold text-gray-600"
        >
          ✕ Đóng
        </button>

        <FilterContent
          currentPrice={currentPrice}
          handlePriceClick={(r) => {
            handlePriceClick(r)
            setOpen(false)
          }}
        />
      </div>
    </>
  )
}

const FilterContent = ({
  currentPrice,
  handlePriceClick,
}: {
  currentPrice: string,
  handlePriceClick: (r: string) => void,
}) => {
  return (
    <>
      {/* Title */}
      {/* <span className="flex h-[40px] items-center gap-2 mb-4">
        <FaFilter />
        <h2 className="text-lg font-bold">Filter products</h2>
      </span> */}

      {/* Price */}
      <div className="mb-6">
        <h3 className="font-bold flex items-end mb-4 border-b">Price</h3>
        <div className="flex flex-col gap-2">
          {prices.map((price, index) => (
            <label key={index} className="cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                checked={currentPrice === price}
                onChange={() => handlePriceClick(price)}
                className="cursor-pointer"
              />
              {price}k
            </label>
          ))}
        </div>
      </div>

      {/* Color */}
      <div className="mb-6">
        <h3 className="font-bold flex items-end mb-4 border-b">Color</h3>
        <div className="flex flex-col gap-2">
          {colors.map((color, index) => (
            <label key={index} className="cursor-pointer flex items-center gap-2">
              <input type="checkbox" className="cursor-pointer" />
              {color}
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mb-6">
        <h3 className="font-bold flex items-end mb-4 border-b">Size</h3>
        <div className="flex flex-col gap-2">
          {sizes.map((size, index) => (
            <label key={index} className="cursor-pointer flex items-center gap-2">
              <input type="checkbox" className="cursor-pointer" />
              {size}
            </label>
          ))}
        </div>
      </div>

      {/* Button apply */}
      <button
        type="button"
        className="font-bold cursor-pointer w-full text-white bg-gray-950 py-3 rounded-2xl transition hover:bg-gray-700"
      >
        <span className='flex justify-center items-center gap-2'><FaFilter /> Filter</span>
      </button>
    </>
  )
}

export default React.memo(Filter)
