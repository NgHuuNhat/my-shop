export interface ProductType {
    id: string
    name: string
    price: string
    image: string
    createdAt: string
    description: string
}

export interface searchParams {
    page?: string,
    limit?: string,
    search?: string,
    price?: string,
    sort?: string,
}