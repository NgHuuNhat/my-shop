'use client'
import { useRouter, useSearchParams } from "next/navigation"
import React, { useCallback, useMemo } from "react"
import { PaginationProps } from "./paginationType"
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "./paginationConstant"

const Pagination = ({ data = [] }: PaginationProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Lấy page và limit từ searchParams
    const currentPage = useMemo(() => Number(searchParams?.get("page")) || DEFAULT_PAGE, [searchParams])
    const currentLimit = useMemo(() => Number(searchParams?.get("limit")) || DEFAULT_LIMIT, [searchParams])
    // const currentSearch = useMemo(() => searchParams.get("search") || "", [searchParams])

    const isDisabledNext = data.length < currentLimit

    // Callback để tránh tạo hàm mới mỗi lần render
    const handlePageChange = useCallback(
        (newPage: number) => {
            if (newPage < 1) return
            router.push(`/products?page=${newPage}&limit=${currentLimit}`)
            router.refresh()
        },
        [router, currentLimit]
    )

    // const handlePageChange = useCallback(
    //     (newPage: number) => {
    //         if (newPage < 1) return

    //         const params = new URLSearchParams(searchParams.toString())
    //         params.set("page", newPage.toString())
    //         params.set("limit", currentLimit.toString())

    //         // 👇 nếu có từ khóa search thì giữ nguyên
    //         if (currentSearch) {
    //             params.set("search", currentSearch)
    //         } else params.delete("search")

    //         router.push(`/products?${params.toString()}`)
    //         router.refresh()
    //     },
    //     [router, searchParams, currentLimit, currentSearch]
    // )

    return (
        <div className="flex justify-center items-center gap-4 py-10 w-full max-w-7xl mx-auto">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`cursor-pointer px-4 py-2 rounded-2xl bg-gray-200 hover:bg-gray-300 transition ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                &lt;
            </button>

            <span className="px-2 font-medium">{currentPage}</span>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={isDisabledNext}
                className={`cursor-pointer px-4 py-2 rounded-2xl bg-gray-200 hover:bg-gray-300 transition ${isDisabledNext ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                &gt;
            </button>
        </div>
    )
}

// Dùng React.memo để tránh render lại khi props không đổi
export default React.memo(Pagination)