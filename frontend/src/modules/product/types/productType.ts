export interface ProductType {
    createdAt?: string
    name?: string
    price?: string
    image?: string
    description?: string
    id?: string
}

export interface ProductPageProps {
    searchParams?: {
        page?: string,
        limit?: string,
        search?: string,
        price?: string,
    }
}

export interface ProductListProps {
    products: ProductType[],
}

export interface ProductCardProps {
    product: ProductType
}

export interface ProductDetailProps {
    params: {
        id: string
    }
}