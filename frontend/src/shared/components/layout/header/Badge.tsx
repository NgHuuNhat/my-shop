'use client'

import { useEffect, useState } from "react"

interface Props {
  value: number
}

export default function Badge({ value }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <span
      className={`absolute -top-2 -right-3 bg-red-600 text-white font-bold 
                w-4 h-4 text-xs flex items-center justify-center rounded-full`}
    >
      {mounted ? value : 0}
    </span>
  )
}
