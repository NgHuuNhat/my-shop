'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export const SORTS = ['Mới nhất', 'Cũ nhất', 'Giá tăng dần', 'Giá giảm dần']
export const PRICES = ['0 - 400', '400 - 800', '800 - 1000']

export function useFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [open, setOpen] = useState(false)
    const [sort, setSort] = useState(searchParams.get('sort') || '')
    const [price, setPrice] = useState(searchParams.get('price') || '')

    // Khoá scroll drawer
    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', open)
        return () => document.body.classList.remove('overflow-hidden')
    }, [open])

    // Sync khi URL thay đổi
    useEffect(() => {
        setSort(searchParams.get('sort') || '')
        setPrice(searchParams.get('price') || '')
    }, [searchParams])

    // Update URL param
    const updateUrl = useCallback(
        (key: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())

            value ? params.set(key, value) : params.delete(key)

            params.delete('page')
            params.delete('limit')

            router.replace(`?${params.toString()}`, { scroll: false })
        },
        [searchParams]
    )

    // Reset
    const reset = () => {
        setSort('')
        setPrice('')
        const params = new URLSearchParams(searchParams.toString())
        params.delete('sort')
        params.delete('price')
        params.delete('page')
        params.delete('limit')
        router.replace(`?${params.toString()}`, { scroll: false })
        if (setOpen) setOpen(false)
    }

    //select
    const handleSelect = (type: 'sort' | 'price', value: string) => {
        const setter = type === 'sort' ? setSort : setPrice
        const current = type === 'sort' ? sort : price

        const newVal = current === value ? '' : value
        setter(newVal)
        updateUrl(type, newVal)
        setOpen(false)
    }

    return {
        // States
        open,
        sort,
        price,

        // Setters
        setOpen,
        setSort,
        setPrice,

        // Logic
        updateUrl,
        reset,
        handleSelect,
    }
}
