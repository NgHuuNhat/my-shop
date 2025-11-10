'use client'
import Pagination from '@/shared/pagination/Pagination'
import { ProductType, ProductListProps } from '../types/productType'
import ProductCard from './ProductCard'
import Error from '@/shared/error/Error'

export default function ProductList({ products }: ProductListProps) {

  if (!products.length) {
    return (
      <Error />
    )
  }

  return (
    <div className="mt-5 flex-1 flex flex-col items-center justify-center w-full">
      <Pagination items={products} limit={20}>
        {(items: ProductType[]) => (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full max-w-[1400px] mx-auto">
            {items.map((product: ProductType) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Pagination>
    </div>
  )
}
