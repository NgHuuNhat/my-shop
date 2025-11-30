import { API_URL } from "@/shared/services/api"
import { ProductType, searchParams } from "../types/productType"
import { filterByPrice, filterBySort } from "@/shared/modules/filter/libFilter";
import { awaitParams, awaitQueryParams } from "@/shared/services/params";

export const productAPI = {
    getList: async ({ searchParams }: { searchParams?: searchParams } = {}) => {
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
        const product: ProductType = await fetch(`${API_URL}/product/${id}`, {
            next: { revalidate: 60 }
        })
            .then(res => res.ok ? res.json() : null)
            .then(data => data ? data : null)
            .catch(() => null)
        return product;
    },

    add: async () => { },
    update: async () => { },
    delete: async () => { },
}