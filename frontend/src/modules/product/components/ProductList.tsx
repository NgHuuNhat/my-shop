import Error from '@/shared/ui/error/Error'
import { ProductType, ProductListProps } from '../types/productType'
import ProductCard from './ProductCard'

export default function ProductList({ products }: ProductListProps) {

  if (!products.length) return <Error />

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-1 lg:px-4">
        {products.map((product: ProductType) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}