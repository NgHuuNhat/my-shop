import ProductList from '@/modules/products/components/ProductList'
import { productAPI } from '@/modules/products/services/productApi'
import { searchParams } from '@/modules/products/types/productType'
import Filter from '@/shared/modules/filter/Filter'
import Pagination from '@/shared/modules/pagination/Pagination'
import Search from '@/shared/modules/search/Search'

export default async function ProductsPage({ searchParams }: { searchParams: searchParams }) {
  const { search, price, sort } = await searchParams
  const products = await productAPI.getList({searchParams})

  return (
    <main className="min-h-screen max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row">
        <aside className="hidden lg:block lg:w-1/4">
          <Filter />
        </aside>
        <section className="lg:w-3/4 flex flex-col">
          <Search />
          <aside className='lg:hidden'><Filter /></aside>
          {(search || price || sort) && <p className='px-4 text-xs mt-[-16px]'>Có {products.length} sản phẩm...</p>}
          <ProductList products={products} />
          {(!search && !price && !sort) && <Pagination data={products} />}
        </section>
      </div>
    </main>
  )
}
