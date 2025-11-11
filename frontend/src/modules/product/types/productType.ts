export interface ProductType {
  createdAt: string
  name: string
  thumbnail: string
  price: string
  description: string
  slug: string
  images: any[]
  category: string
  updatedAt: string
  id: string
}

export interface ProductPageProps {
  searchParams?: {
    page?: string,
    limit?: string,
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