import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/shared/components/pagination/paginationConstant";
import { SearchParams } from "../types/productType";

export const productQueryParams = async (searchParams: SearchParams) => {
    const { page, limit, search, price }: SearchParams = await searchParams
    const currentPage = Number(page) || DEFAULT_PAGE
    const currentLimit = Number(limit) || DEFAULT_LIMIT
    const currentSearch = search || ''
    const currentPrice = price || ''

    const queryParams = new URLSearchParams()
    queryParams.set('page', currentPage.toString())
    queryParams.set('limit', currentLimit.toString())
    if (currentSearch) {
        queryParams.set('search', currentSearch)
        queryParams.delete('page')
        queryParams.delete('limit')
    }
    if (currentPrice) {
        queryParams.delete('page')
        queryParams.delete('limit')
    }

    return queryParams;
}