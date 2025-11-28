import Error from '@/shared/components/feedback/error/Error'
import { ProductType } from '../types/productType'
import ProductCard from './ProductCard'

export default function ProductList({ products }: { products: ProductType[] }) {

  if (!products.length) return <Error />

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 lg:px-4">
        {products.map((product: ProductType) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}