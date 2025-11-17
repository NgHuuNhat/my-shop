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
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden w-full flex items-center gap-2 mx-4 mb-10 px-4 py-2 border rounded-xl"
      >
        <FaFilter /> Filter
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
          <h3 className="font-bold flex items-center justify-center gap-2 text-2xl"><FaFilter /> <span>Filter</span> </h3>
          <button
            onClick={() => setOpen(false)}
            className="text-2xl font-bold text-gray-950"
          >
            X
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
    <div className="flex flex-col py-10 lg:py-0 px-4 lg:px-0">
      <h3 className="hidden lg:flex font-bold mb-6 items-center gap-2"><FaFilter className='text-xl' /><span className='text-2xl'>Filter</span></h3>

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
