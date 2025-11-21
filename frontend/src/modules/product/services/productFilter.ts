import { ProductType, SearchParams } from "../types/productType";

export const productFilter = async (searchParams: SearchParams, products: ProductType[]) => {
    const { price }: SearchParams = await searchParams
    const currentPrice = price || ''

    if (currentPrice) {
        let [min, max] = currentPrice.split('-').map(Number);
        return products.filter((p: ProductType) => {
            const priceNum = p.price ? parseFloat(p.price) : 0;
            return max ? priceNum >= min && priceNum <= max : priceNum >= min;
        });
    }

    return products;
}