'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaSliders } from 'react-icons/fa6'
import MenuMobile from '../menu/MenuMobile'

const sorts = ['Mới nhất', 'Cũ nhất', 'Giá tăng dần', 'Giá giảm dần']
const prices = ['0 - 500', '500 - 1000', '1000 - 2000']

export default function Filter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [currentSort, setCurrentSort] = useState('Mới nhất')
  const [currentPrice, setCurrentPrice] = useState('')

  // Sync state khi searchParams thay đổi
  useEffect(() => {
    setCurrentSort(searchParams.get('sort') || 'Mới nhất')
    setCurrentPrice(searchParams.get('price') || '')
  }, [searchParams.toString()]) // quan trọng: dùng toString() để lắng nghe thay đổi URL

  const updateUrlParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (!value) params.delete(key)
    else params.set(key, value)

    params.delete('page')
    params.delete('limit')

    router.replace(`?${params.toString()}`, { scroll: false })
    // không cần setState ở đây nữa vì useEffect sẽ sync
  }

  //bat tat menu
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open)
    return () => document.body.classList.remove("overflow-hidden")
  }, [open])

  return (
    <>
      {/* Mobile menu button */}
      <button onClick={() => setOpen(true)} className="lg:hidden w-full border-gray-200 text-gray-400 cursor-pointer border rounded-2xl px-4 flex items-center justify-center gap-2 transition-colors">
        <span>{currentSort} {currentPrice}</span><FaSliders />
      </button>

      {/* Content */}
      <div className='hidden lg:block'>
        <Content currentSort={currentSort} updateUrlParam={updateUrlParam} currentPrice={currentPrice} />
      </div>

      {/* MenuMobile*/}
      <MenuMobile
        open={open}
        setOpen={setOpen}
        content={<Content currentSort={currentSort} updateUrlParam={updateUrlParam} currentPrice={currentPrice} setOpen={setOpen} />}
      />
    </>
  )
}

export const Content = ({ currentSort, updateUrlParam, currentPrice, setOpen }: any) => {
  return (
    <form className="w-full md:w-72 flex-shrink-0 px-4">
      <div className="flex flex-col px-0 py-4 lg:px-0 lg:py-0">

        {/* Name */}
        <h3 className="hidden mt-10 h-[42px] lg:flex font-bold items-center gap-2"><FaSliders /><span>Filter</span></h3>

        {/* Sort */}
        <div className="mb-6">
          <h3 className="font-bold flex items-end mb-4 border-b h-[40px]">Sort</h3>
          <div className="flex flex-col gap-2">
            {sorts.map((sort) => (
              <label key={sort} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sort"
                  checked={currentSort === sort}
                  onChange={() => {
                    updateUrlParam('sort', sort)
                    if (setOpen) setOpen(false)
                  }}
                  className="cursor-pointer accent-blue-600"
                />
                {sort}
              </label>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <h3 className="font-bold flex items-end mb-4 border-b h-[40px]">Price</h3>
          <div className="flex flex-col gap-2">
            {prices.map((price) => (
              <label key={price} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentPrice === price}
                  onChange={() => {
                    updateUrlParam('price', currentPrice === price ? '' : price)
                    if (setOpen) setOpen(false)
                  }}
                  className="cursor-pointer accent-blue-600"
                />
                {price}k
              </label>
            ))}
          </div>
        </div>
      </div>
    </form>
  )
}
