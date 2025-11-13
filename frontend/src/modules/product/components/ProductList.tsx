import { ProductType, ProductListProps } from '../types/productType'
import ProductCard from './ProductCard'
import Error from '@/shared/components/error/Error'

export default function ProductList({ products }: ProductListProps) {

  if (!products.length) return <Error />

  return (
    <div className="flex-1 flex flex-col items-center w-full max-w-7xl mx-auto">
      <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4 w-full max-w-[1400px] mx-auto">
        {products.map((product: ProductType) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}