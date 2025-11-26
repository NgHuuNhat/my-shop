import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/shared/modules/pagination/paginationConstant";
import { ProductType } from "../types/productType";

export const awaitParams = async (searchParams: any) => {
    const { page, limit, search, price, sort } = await searchParams || {};
    return {
        page: Number(page) || DEFAULT_PAGE,
        limit: Number(limit) || DEFAULT_LIMIT,
        search: search || '',
        price: price || '',
        sort: sort || '',
    };
};

export const awaitQueryParams = ({ page, limit, search, price, sort }: { page: number, limit: number, search: string, price: string, sort: string }) => {
    const queryParams = new URLSearchParams();
    queryParams.set('page', page.toString())
    queryParams.set('limit', limit.toString())
    if (search) {
        queryParams.set('search', search)
        queryParams.delete('page')
        queryParams.delete('limit')
    }
    if (price) {
        queryParams.delete('page')
        queryParams.delete('limit')
    }
    if (sort) {
        queryParams.delete('page')
        queryParams.delete('limit')
    }
    return queryParams;
};

export const filterByPrice = (products: ProductType[], price: string) => {
    if (!price) return products;
    const [min, max] = price.split('-').map(Number);
    return products.filter(p => {
        const priceNum = p.price ? parseFloat(p.price) : 0;
        return max ? priceNum >= min && priceNum <= max : priceNum >= min;
    });
};

export const filterBySort = (products: ProductType[], sort: string) => {
    if (!sort) return products;

    switch (sort) {
        case 'Mới nhất':
            return products.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        case 'Cũ nhất':
            return products.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime());
        case 'Giá tăng dần':
            return products.sort((a: any, b: any) => a.price - b.price);
        case 'Giá giảm dần':
            return products.sort((a: any, b: any) => b.price - a.price);
        default:
            return products;
    }
};
