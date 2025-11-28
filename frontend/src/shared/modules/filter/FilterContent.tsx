'use client'

import { FaSliders } from 'react-icons/fa6'
import { PRICES, SORTS } from './useFilter'

export default function FilterContent({ sort, price, reset, handleSelect, }: any) {

    return (
        <form className="w-full px-4 text-base">
            {/* Desktop title */}
            <div className="hidden lg:block py-10">
                <h3 className="flex font-bold py-2 items-center justify-between border bg-gray-950 text-white rounded-2xl px-4">
                    <span>Filter</span> <FaSliders />
                </h3>
            </div>

            {/* sort */}
            <div className="mb-6">
                <h3 className="font-bold mb-4 border-b lg:mt-[-25px]">Sort</h3>
                <div className="flex flex-col gap-2">
                    {SORTS.map((s) => (
                        <label key={s} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={sort === s}
                                onChange={() => handleSelect('sort', s)}
                                className="accent-blue-600"
                            />
                            {s}
                        </label>
                    ))}
                </div>
            </div>

            {/* price */}
            <div className="mb-6">
                <h3 className="font-bold mb-4 border-b">Price</h3>
                <div className="flex flex-col gap-2">
                    {PRICES.map((p) => (
                        <label key={p} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={price === p}
                                onChange={() => handleSelect('price', p)}
                                className="accent-blue-600"
                            />
                            {p}k
                        </label>
                    ))}
                </div>
            </div>

            <button
                onClick={(e) => {
                    e.preventDefault()
                    reset()
                }}
                className="border border-gray-200 hover:border-gray-950 w-full py-2 rounded-2xl"
            >
                Xoá bộ lọc
            </button>
        </form>
    )
}
