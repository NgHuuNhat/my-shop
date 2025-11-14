'use client'
import React, { useState } from 'react'

interface FilterSidebarProps {
  className?: string
  // callback để truyền filter ra ngoài, nếu muốn
  onChange?: (filters: { colors: string[]; sizes: string[]; prices: string[] }) => void
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ className = '', onChange }) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedPrices, setSelectedPrices] = useState<string[]>([])

  const colors = ['Đỏ', 'Xanh', 'Đen']
  const sizes = ['S', 'M', 'L', 'XL']
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
    <aside className={`w-full md:w-72 flex-shrink-0 px-4 pb-10 ${className}`}>
      <h2 className="text-lg font-semibold mb-4">Bộ lọc</h2>

      {/* Giá */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Giá</h3>
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
        <h3 className="font-medium mb-2">Màu sắc</h3>
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
        <h3 className="font-medium mb-2">Size</h3>
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
      <button
        onClick={handleApply}
        className="w-full bg-gray-900 text-white py-2 mt-4 rounded hover:bg-gray-800 transition"
      >
        Áp dụng lọc
      </button>
    </aside>
  )
}

export default FilterSidebar
