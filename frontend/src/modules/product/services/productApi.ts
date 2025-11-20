import { API_URL } from "@/shared/services/api"
import { ProductPageProps, ProductType } from "../types/productType"
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/shared/components/pagination/paginationConstant"

export const getProducts = async ({ searchParams }: ProductPageProps) => {
    const { page, limit, search, price }: any = await searchParams
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

    const products: ProductType[] = await (
        fetch(`${API_URL}/product?${queryParams.toString()}`, { next: { revalidate: 60 } })
            .then(res => res.ok ? res.json() : null)
            .then(data => Array.isArray(data) ? data : [])
            .catch(() => [])
    );

    if (price) {
        let [min, max] = price.split('-').map(Number);
        return products.filter((p: ProductType) => {
            const priceNum = p.price ? parseFloat(p.price) : 0;
            return max ? priceNum >= min && priceNum <= max : priceNum >= min;
        });
    }

    return products;
}