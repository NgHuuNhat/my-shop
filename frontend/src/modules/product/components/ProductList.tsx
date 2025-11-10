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
    <div className='flex-1 flex flex-col items-center justify-center'>
      <Pagination items={products} limit={20}>
        {(items: ProductType[]) => (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
            {items.map((product: ProductType) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Pagination>
    </div>
  )
}
