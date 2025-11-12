import ProductList from "@/modules/product/components/ProductList"
import { ProductPageProps, ProductType } from "@/modules/product/types/productType"
import Pagination from "@/shared/components/pagination/Pagination"
import Search from "@/shared/components/search/Search"
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/shared/constants/constan"

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const { page, limit }: any = await searchParams
  const currentPage = Number(page) || DEFAULT_PAGE
  const currentLimit = Number(limit) || DEFAULT_LIMIT

  const products: ProductType[] = await fetch(`https://691078c77686c0e9c20a6dc4.mockapi.io/api/product?page=${currentPage}&limit=${currentLimit}`, {
    next: { revalidate: 60 },
  })
    .then(res => res.ok ? res.json() : null)
    .then(data => Array.isArray(data) ? data : [])
    .catch(() => [])

  const productsLenth = products.length
  const isTest = productsLenth < currentLimit

  return (
    <div className='flex-1 flex flex-col items-center justify-center'>
      <Search />
      {/* <Pagination isTest={isTest} /> */}
      <ProductList products={products} />
      <Pagination isTest={isTest} />
    </div>
  )
}
