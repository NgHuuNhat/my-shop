import { API_URL } from "@/shared/services/api"
import { ProductsPageProps, ProductType } from "../types/productType"
import { awaitParams, awaitQueryParams, filterByPrice, filterBySort } from "./productLib";

export const productAPI = {
    getList: async ({ searchParams }: ProductsPageProps = {}) => {
        let products: ProductType[] = [];
        const params = await awaitParams(searchParams);
        const queryParams = await awaitQueryParams(params);
        products = await fetch(`${API_URL}/product?${queryParams.toString()}`, { next: { revalidate: 60 } })
            .then(res => res.ok ? res.json() : [])
            .then(data => Array.isArray(data) ? data : [])
            .catch(() => []);
        products = filterByPrice(products, params.price);
        products = filterBySort(products, params.sort);
        return products;
    },

    getDetail: async ({ id }: { id: string }) => {
        const product: ProductType = await fetch(`https://691078c77686c0e9c20a6dc4.mockapi.io/api/product/${id}`, {
            next: { revalidate: 60 }
        })
            .then(res => res.ok ? res.json() : null)
            .then(data => data ? data : null)
            .catch(() => null)
    },
    add: async () => { },
    update: async () => { },
    delete: async () => { },
}