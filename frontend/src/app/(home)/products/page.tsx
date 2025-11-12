import ProductList from "@/modules/product/components/ProductList"
import { ProductPageProps, ProductType } from "@/modules/product/types/productType"
import Pagination from "@/shared/components/Pagination/Pagination"
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/shared/components/Pagination/paginationConstant"
import Search from "@/shared/components/Search/Search"

export default async function ProductsPage({ searchParams }: ProductPageProps) {
  const { page, limit }: any = await searchParams
  const currentPage = Number(page) || DEFAULT_PAGE
  const currentLimit = Number(limit) || DEFAULT_LIMIT

  const products: ProductType[] = await (
    fetch(`https://691078c77686c0e9c20a6dc4.mockapi.io/api/product?page=${currentPage}&limit=${currentLimit}`, { next: { revalidate: 60 } })
      .then(res => res.ok ? res.json() : null)
      .then(data => Array.isArray(data) ? data : [])
      .catch(() => [])
  );

  return (
    <div className='flex-1 flex flex-col'>
      <Search />
      <ProductList products={products} />
      <Pagination items={products} />
    </div>
  )
}
