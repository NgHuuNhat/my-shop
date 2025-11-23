export interface ProductType {
    createdAt?: string
    name?: string
    price?: string
    image?: string
    description?: string
    id?: string
}

export interface ProductsPageProps {
    searchParams?: {
        page?: string,
        limit?: string,
        search?: string,
        price?: string,
        sort?: string,
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

export interface SearchParams {
    page?: string,
    limit?: string,
    search?: string,
    price?: string,
}