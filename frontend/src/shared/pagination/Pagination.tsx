'use client'
import { useCallback, useMemo, useState, useTransition } from "react";
import { PaginationType } from "./paginationType";
import Loading from "../loading/Loading";

export default function Pagination({ items, limit = 10, children }: PaginationType) {
    const [isPending, startTransition] = useTransition()

    const [page, setPage] = useState(1)
    const totalPages = Math.ceil(items.length / limit)

    const itemsRender = useMemo(() => {
        const start = (page - 1) * limit
        const end = start + limit
        return items.slice(start, end)
    }, [page, limit, items])

    const handlePrev = useCallback(() => {
        startTransition(() => setPage(i => Math.max(i - 1, 1)))
    }, [])
    const handleNext = useCallback(() => {
        startTransition(() => setPage(i => Math.min(i + 1, totalPages)))
    }, [totalPages])

    return (
        <div className="flex-1 flex flex-col items-center">
            <div className="flex-1 flex flex-col items-center justify-center">
                {isPending ? <Loading /> : children(itemsRender)}
            </div>
            <div className="flex justify-center items-center gap-4 my-5">
                <button
                    onClick={handlePrev}
                    disabled={page === 1}
                    className={`cursor-pointer px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    &lt;
                </button>

                <span className="text-gray-700 font-medium">{page}/{totalPages}</span>

                <button
                    onClick={handleNext}
                    disabled={page === totalPages}
                    className={`cursor-pointer px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    &gt;
                </button>
            </div>
        </div>
    )
}
