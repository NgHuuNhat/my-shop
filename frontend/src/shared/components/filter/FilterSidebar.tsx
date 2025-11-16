'use client'
import React, { useState } from 'react'
import { FaFilter } from 'react-icons/fa'

interface FilterSidebarProps {
  className?: string
  // callback để truyền filter ra ngoài, nếu muốn
  onChange?: (filters: { colors: string[]; sizes: string[]; prices: string[] }) => void
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ className = '', onChange }) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedPrices, setSelectedPrices] = useState<string[]>([])

  const colors = ['SPEC', 'SPEC ECO', 'SPEC EKO']
  const sizes = ['Keo chống thấm', 'Keo chà ron', 'Keo dán gạch']
  const prices = ['<1 triệu', '1-5 triệu', '>5 triệu']

  const toggleItem = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item))
    } else {
      setList([...list, item])
    }
  }

  const handleApply = () => {
    if (onChange) {
      onChange({
        colors: selectedColors,
        sizes: selectedSizes,
        prices: selectedPrices
      })
    }
  }

  return (
    <aside className={`hidden lg:block w-full md:w-72 flex-shrink-0 px-4 py-10 ${className}`}>
      <span className='flex h-[40px] items-center gap-2'>
        <FaFilter />
        <h2 className="text-lg font-bold">Lọc sản phẩm</h2>
      </span>

      {/* Giá */}
      <div className="mb-4">
        <h3 className="font-bold h-[41px] flex items-end mb-2 border-b">Giá</h3>
        <div className="flex flex-col gap-2">
          {prices.map(price => (
            <label
              key={price}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={selectedPrices.includes(price)}
                onChange={() => toggleItem(price, selectedPrices, setSelectedPrices)}
              />
              {price}
            </label>
          ))}
        </div>
      </div>

      {/* Màu sắc */}
      <div className="mb-4">
        <h3 className="font-bold mb-2 border-b">Dòng sản phẩm</h3>
        <div className="flex flex-col gap-2">
          {colors.map(color => (
            <label
              key={color}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={selectedColors.includes(color)}
                onChange={() => toggleItem(color, selectedColors, setSelectedColors)}
              />
              {color}
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mb-4">
        <h3 className="font-bold mb-2 border-b">Loại sản phẩm</h3>
        <div className="flex flex-col gap-2">
          {sizes.map(size => (
            <label
              key={size}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={selectedSizes.includes(size)}
                onChange={() => toggleItem(size, selectedSizes, setSelectedSizes)}
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      {/* Button áp dụng filter */}
      <div>
        <button
          onClick={handleApply}
          className="cursor-pointer w-full text-black bg-white border-2 border-gray-300 py-2 mt-4 rounded-2xl transition hover:border-gray-950"
        >
          Xoá bộ lọc
        </button>
        <button
          onClick={handleApply}
          className="cursor-pointer w-full text-white bg-gray-950 py-3 mt-4 rounded-2xl transition hover:bg-gray-700"
        >
          Áp dụng bộ lọc
        </button>
      </div>
    </aside>
  )
}

export default FilterSidebar
