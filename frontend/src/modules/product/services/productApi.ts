import { API_URL } from "@/shared/services/api"
import { ProductPageProps, ProductType, SearchParams } from "../types/productType"
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/shared/components/pagination/paginationConstant"
import { productQueryParams } from "./productQueryParams"
import { productFilter } from "./productFilter"

export const getProducts = async ({ searchParams }: ProductPageProps) => {
    const { page, limit, search, price, sort }: any = await searchParams
    const currentPage = Number(page) || DEFAULT_PAGE
    const currentLimit = Number(limit) || DEFAULT_LIMIT
    const currentSearch = search || ''
    const currentPrice = price || ''
    const currentSort = sort || ''

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
    if (currentSort) {
        queryParams.delete('page')
        queryParams.delete('limit')
    }

    let products: ProductType[] = await (
        fetch(`${API_URL}/product?${queryParams.toString()}`, { next: { revalidate: 60 } })
            .then(res => res.ok ? res.json() : null)
            .then(data => Array.isArray(data) ? data : [])
            .catch(() => [])
    );

    // if (price) {
    //     let [min, max] = price.split('-').map(Number);
    //     return products.filter((p: ProductType) => {
    //         const priceNum = p.price ? parseFloat(p.price) : 0;
    //         return max ? priceNum >= min && priceNum <= max : priceNum >= min;
    //     });
    // }

    // // const sort = searchParams.get('sort')
    // if (sort === 'Mới nhất')
    //     return products.sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // if (sort === 'Cũ nhất')
    //     return products.sort((a:any, b:any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    // if (sort === 'Giá tăng dần')
    //     return products.sort((a:any, b:any) => a.price - b.price);

    // if (sort === 'Giá giảm dần')
    //     return products.sort((a:any, b:any) => b.price - a.price);

    // Step 1: lọc theo Price nếu có
    if (currentPrice) {
        const [min, max] = currentPrice.split('-').map(Number);
        products = products.filter((p: ProductType) => {
            const priceNum = p.price ? parseFloat(p.price) : 0;
            return max ? priceNum >= min && priceNum <= max : priceNum >= min;
        });
    }

    // Step 2: sort nếu có
    if (currentSort) {
        if (currentSort === 'Mới nhất')
            products = products.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        if (currentSort === 'Cũ nhất')
            products = products.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime());
        if (currentSort === 'Giá tăng dần')
            products = products.sort((a: any, b: any) => a.price - b.price);
        if (currentSort === 'Giá giảm dần')
            products = products.sort((a: any, b: any) => b.price - a.price);
    }


    return products;
}

// export const productAPI = {
//     getList: async (searchParams: SearchParams) => {
//         const queryParams = await productQueryParams(searchParams);
//         const products: ProductType[] = await (
//             fetch(`${API_URL}/product?${queryParams.toString()}`, { next: { revalidate: 60 } })
//                 .then(res => res.ok ? res.json() : null)
//                 .then(data => Array.isArray(data) ? data : [])
//                 .catch(() => [])
//         );
//         return products
//     }
// }