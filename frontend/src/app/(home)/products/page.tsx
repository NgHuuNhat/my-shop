import ProductList from "@/modules/product/components/ProductList"
import { ProductPageProps, ProductType } from "@/modules/product/types/productType"
import Pagination from "@/shared/pagination/Pagination"
import Search from "@/shared/search/Search"

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const { page, limit }: any = await searchParams
  const currentPage = Number(page) || 1
  const currentLimit = Number(limit) || 10

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
      <ProductList products={products} />
      <Pagination isTest={isTest} />
    </div>
  )
}
