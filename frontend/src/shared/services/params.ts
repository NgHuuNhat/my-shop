import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../modules/pagination/paginationConstant";

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