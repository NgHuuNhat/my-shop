import { ProductType } from "@/modules/products/types/productType";

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