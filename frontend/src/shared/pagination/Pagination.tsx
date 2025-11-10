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
            <div className="flex gap-5">
                <p>Tất cả {items.length} sản phẩm</p>
                <div className="flex justify-center">
                    <button onClick={handlePrev} disabled={page === 1} >
                        <span>{`<`}</span>
                    </button>
                    <span> {page}/{totalPages} </span>
                    <button onClick={handleNext} disabled={page === totalPages}   >
                        <span>{`>`}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
