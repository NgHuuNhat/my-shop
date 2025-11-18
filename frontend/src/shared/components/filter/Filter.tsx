'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaFilter } from 'react-icons/fa'

const colors = ['đen', 'trắng', 'xám']
const sizes = ['S', 'M', 'L', 'XL']
const prices = ['0 - 500', '500 - 1000', '1000 - 2000']

const Filter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPrice = searchParams.get('price') || ''
  const [open, setOpen] = useState(false) // mobile drawer

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }
    return () => document.body.classList.remove("overflow-hidden")
  }, [open])

  const handlePriceClick = (range: string) => {
    const params = new URLSearchParams(searchParams.toString())
    currentPrice === range ? params.delete('price') : params.set('price', range)
    router.push(`?${params.toString()}`)
  }

  return (
    <>
      {/* 🔥 MOBILE BUTTON */}
      <div className='lg:hidden w-full max-w-7xl mx-auto px-4 pt-3'>
        <button
          onClick={() => setOpen(true)}
          className="text-gray-400 border-gray-200 w-full flex items-center justify-between py-2 px-4 border rounded-2xl">
          <span>Filter</span><FaFilter className='' />
        </button>
      </div>

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
          className="fixed inset-0 bg-black/40 z-60"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 🔥 MOBILE DRAWER */}
      <div
        className={`bg-white fixed top-0 right-0 h-full w-[80%] max-w-xs z-70 overflow-y-auto shadow-xl transform transition-transform duration-300 lg:hidden ${open ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Header drawer */}
        <div className="bg-white sticky top-0 h-[50px] shadow-sm flex items-center justify-between px-4">
          <h3 className="font-bold flex items-center justify-center gap-2 text-l"><FaFilter /> <span>Filter</span> </h3>
          <button
            onClick={() => setOpen(false)}
            className="ps-4 text-l font-bold text-gray-950"
          >
            x
          </button>
        </div>

        {/* Filter content mobile */}
        <FilterContent
          currentPrice={currentPrice}
          handlePriceClick={(r: string) => {
            handlePriceClick(r)
            setOpen(false) // click price là tự đóng drawer
          }}
          setOpen={setOpen} // chỉ mobile drawer cần
        />
      </div>
    </>
  )
}

// Component con
const FilterContent = ({
  currentPrice,
  handlePriceClick,
  setOpen, // optional
}: any) => {
  return (
    <div className="flex flex-col px-4 py-4 lg:px-0 lg:py-0">
      <h3 className="hidden mt-10 h-[42px] lg:flex font-bold items-center gap-2"><FaFilter /><span>Filter</span></h3>

      {/* Price */}
      <div className="mb-6">
        <h3 className="font-bold flex items-end mb-4 border-b h-[40px]">Price</h3>
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

      {/* Button apply (chỉ mobile) */}
      {/* {setOpen && (
        <button
          onClick={() => setOpen(false)}
          type="button"
          className="font-bold cursor-pointer w-full text-white bg-gray-950 py-3 rounded-2xl transition hover:bg-gray-700"
        >
          <span className="flex justify-center items-center gap-2"><FaFilter />Filter</span>
        </button>
      )} */}
    </div>
  )
}

export default React.memo(Filter)
