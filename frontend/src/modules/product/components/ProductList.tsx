import { ProductType, ProductListProps } from '../types/productType'
import ProductCard from './ProductCard'
import Error from '@/shared/error/Error'

export default function ProductList({ products }: ProductListProps) {
  if (!products.length) return <Error />

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 w-full max-w-[1400px] mx-auto">
        {products.map((product: ProductType) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}