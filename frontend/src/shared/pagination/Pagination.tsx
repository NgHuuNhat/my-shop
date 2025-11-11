'use client'
import { useRouter, useSearchParams } from "next/navigation"
import React, { useCallback, useMemo } from "react"

const Pagination = ({ isTest }: any) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Lấy page và limit từ searchParams
    const currentPage = useMemo(() => Number(searchParams?.get("page")) || 1, [searchParams])
    const currentLimit = useMemo(() => Number(searchParams?.get("limit")) || 10, [searchParams])

    // Callback để tránh tạo hàm mới mỗi lần render
    const handlePageChange = useCallback(
        (newPage: number) => {
            if (newPage < 1) return
            router.push(`/products?page=${newPage}&limit=${currentLimit}`)
            router.refresh()
        },
        [router, currentLimit]
    )

    return (
        <div className="flex justify-center items-center gap-4 my-10">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`cursor-pointer px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                &lt;
            </button>

            <span className="px-2 font-medium">{currentPage}</span>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={isTest}
                className={`cursor-pointer px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition ${isTest ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                &gt;
            </button>
        </div>
    )
}

// Dùng React.memo để tránh render lại khi props không đổi
export default React.memo(Pagination)