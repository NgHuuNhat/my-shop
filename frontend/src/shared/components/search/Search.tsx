'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { FaCircleXmark } from 'react-icons/fa6'

export default function Search() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get("search") || "")

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())

      if (!value.trim()) params.delete("search")
      else {
        params.set("search", value.trim())
        params.delete("page")
        params.delete("limit")
      }

      router.replace(`?${params.toString()}`, { scroll: false })
    }, 500)

    return () => clearTimeout(timer)
  }, [value])

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-5 lg:py-10">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-2 px-4 border border-gray-200 rounded-2xl 
                   focus-within:border-gray-900 transition-colors"
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Tìm kiếm sản phẩm..."
          className="flex-1 py-2 outline-none text-gray-700 placeholder-gray-400"
        />
        <FaCircleXmark
          onClick={() => setValue('')}
          className={value.trim() ? "block text-gray-400 text-xs cursor-pointer transition-all" : "hidden"}
        />
        <FaSearch
          className={`text-xl ${value.trim() ? "text-gray-900" : "text-gray-400"}`}
        />
      </form>
    </div>
  )
}
