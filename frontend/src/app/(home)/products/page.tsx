import ProductList from '@/modules/product/components/ProductList'
import { getProducts } from '@/modules/product/services/productApi'
import { ProductPageProps } from '@/modules/product/types/productType'
import Filter from '@/shared/components/filter/Filter'
import Pagination from '@/shared/components/pagination/Pagination'
import Search from '@/shared/components/search/Search'

export default async function ProductsPage({ searchParams }: ProductPageProps) {
  const { search, price }: any = await searchParams
  const products = await getProducts({ searchParams })

  return (
    <main className="min-h-screen max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row">
        <aside className="hidden lg:block lg:w-1/4">
          <Filter />
        </aside>
        <section className="lg:w-3/4 flex flex-col">
          <Search />
          <aside className='lg:hidden'><Filter /></aside>
          {(search || price) && (<p className='text-xs px-4 mt-[-16px]'> Có {products.length} sản phẩm...</p>)}
          <ProductList products={products} />
          {(!search || !price) && (<Pagination data={products} />)}
        </section>
      </div>
    </main>
  )
}
