'use client'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { ProductListProps, ProductType } from '../types/productType'
import Error from '@/shared/components/error/Error'
import ProductCard from './ProductCard'
import Loading from '@/shared/components/loading/Loading'

function ProductListContent({ products }: ProductListProps) {
  if (!products.length) return <Error />
  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 px-4 w-full max-w-[1400px] mx-auto">
        {products.map((product: ProductType) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

const ProductListDynamic = dynamic(async () => Promise.resolve(ProductListContent), {
  ssr: false,
  loading: () => <Loading />,
})

export default function ProductList({ products }: ProductListProps) {
  return (
    <Suspense fallback={<Loading />}>
      <ProductListDynamic products={products} />
    </Suspense>
  )
}
