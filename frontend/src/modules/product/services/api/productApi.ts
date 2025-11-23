import { API_URL } from "@/shared/services/api"
import { ProductsPageProps, ProductType } from "../../types/productType"
import { awaitParams, awaitQueryParams, filterByPrice, filterBySort } from "../lib/productLib";

export const productAPI = {
    //update
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

    getDetail: async () => { },
    add: async () => { },
    update: async () => { },
    delete: async () => { },
}